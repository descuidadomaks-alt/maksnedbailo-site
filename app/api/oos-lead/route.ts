/**
 * Lead capture for oos_v2 / oos_v3 (the two Overtime OS A/B landing variants
 * under /projects/oos_v2 and /projects/oos_v3). Separate from
 * app/api/lead/route.ts on purpose — that route's Sheet/Telegram/email
 * pipeline is shared by oh4/oh5/oh6/oos and speaks a different (camelCase,
 * non-GHL) payload shape. These two pages instead feed the SAME
 * GoHighLevel inbound webhook the live overtimeos.com page uses, so leads
 * from either variant land in the real Overtime OS CRM pipeline.
 *
 * The client posts the quiz's camelCase answers; this route does the
 * server-side work that can't happen in the browser — mapping to the exact
 * snake_case field names GHL expects, and stamping consent_ip/
 * consent_timestamp_utc from the request itself (never trust a client-sent
 * IP or timestamp for a consent record).
 *
 * Field-name mapping was NOT recoverable from overtimeos.com's client JS
 * (it posts to its own same-origin /api/lead, whose server-side GHL mapping
 * lives in that separate repo). These snake_case names come directly from
 * the product owner's own account of the GHL contract.
 */

import { NextRequest, NextResponse } from "next/server";

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/a0emJM3sdFNJJWds9Fxb/webhook-trigger/3c6c3387-375d-40e9-aca4-71f7e34b85c2";

type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
};

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  website: string;
  trade: string;
  biggestImpact: string;
  leadsPerMonth: string;
  phoneCoverage: string;
  eliminate: string;
  timeline: string;
  consent: boolean;
  utm: UtmData;
  page: "oos_v2" | "oos_v3";
  pageUrl: string;
  honeypot?: string;
  // Set only by the exit-intent popup ("exit_phone") so this can be
  // filtered/flagged in GHL — absent (undefined) for normal quiz
  // submissions. Optional and additive; nothing else about this route
  // changes based on it.
  leadType?: string;
};

const VALID_PAGES = new Set(["oos_v2", "oos_v3"]);

// The quiz was cut from 10 steps to 3 (trade, biggestImpact, contact) —
// leadsPerMonth/phoneCoverage/eliminate/timeline/website are no longer
// asked and arrive here as "". The exit-intent popup collects only phone
// (+ optional name) — trade/biggestImpact/email arrive as "" from that
// source. `phone` is the one field every real lead source actually
// populates, so it's the only one still required non-empty; everything
// else just has to be the right TYPE (never trust unvalidated shapes into
// the GHL payload below).
function isValidPayload(b: Record<string, unknown>): b is LeadPayload {
  if (!VALID_PAGES.has(b.page as string)) return false;
  const stringFields = [
    "name",
    "email",
    "phone",
    "website",
    "trade",
    "biggestImpact",
    "leadsPerMonth",
    "phoneCoverage",
    "eliminate",
    "timeline",
  ];
  if (!stringFields.every((key) => typeof b[key] === "string")) return false;
  if (typeof b.consent !== "boolean") return false;
  if (b.leadType !== undefined && typeof b.leadType !== "string") return false;
  return (b.phone as string).trim() !== "";
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "";
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "";
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !isValidPayload(body as Record<string, unknown>)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const lead = body as LeadPayload;

  // Honeypot — bots that auto-fill every input trip this hidden field.
  // Respond as if everything's fine (don't tip them off) but do nothing.
  if (lead.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const consentedAt = lead.consent ? new Date().toISOString() : "";
  const consentIp = lead.consent ? clientIp(request) : "";

  const ghlPayload: Record<string, string> = {
    first_name: firstName(lead.name),
    phone: lead.phone,
    email: lead.email,
    trade_type: lead.trade,
    monthly_lead_volume: lead.leadsPerMonth,
    who_answers_phones: lead.phoneCoverage,
    eliminate_one_thing: lead.eliminate,
    timeline: lead.timeline,
    biggest_impact_feature: lead.biggestImpact,
    business_website: lead.website ?? "",
    sms_consent: lead.consent ? "yes_consented" : "",
    call_consent: lead.consent ? "yes_consented" : "",
    consent_timestamp_utc: consentedAt,
    consent_ip: consentIp,
    page: lead.page,
    page_url: lead.pageUrl ?? "",
    ...(lead.leadType ? { lead_type: lead.leadType } : {}),
    ...Object.fromEntries(Object.entries(lead.utm ?? {}).filter(([, v]) => typeof v === "string" && v)),
  };

  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ghlPayload),
    });
    if (!res.ok) {
      console.warn("[oos-lead] GHL webhook responded", res.status);
      return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
    }
  } catch (err) {
    console.warn("[oos-lead] GHL webhook request failed", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
