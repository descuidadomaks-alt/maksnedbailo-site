/**
 * Lead capture — oh4 quiz funnel. POST { name, email, phone, trade,
 * phoneCoverage, missedCalls, timeline, revenue, location, utm, page, ts,
 * honeypot } → scores HOT/WARM/COLD → fans out to a Google Sheet, Telegram,
 * and email via Promise.allSettled, so a failing notification never blocks
 * the response (the visitor already has the demo by the time this runs).
 * Every integration below no-ops with a console.warn if its env var isn't
 * set — nothing throws just because a service isn't configured yet.
 *
 * SETUP
 *
 * 1. Google Sheet (GAS_WEBHOOK_URL) — free, no service-account keys
 *    a. Create a Sheet with a tab named "Leads"; copy the Sheet ID out of
 *       its URL (the long string between /d/ and /edit).
 *    b. In the Sheet: Extensions → Apps Script. Delete the placeholder code
 *       and paste the doPost() function below (swap in your Sheet ID), then
 *       Deploy → New deployment → type "Web app" → execute as "Me" → who
 *       has access "Anyone".
 *    c. Copy the deployment's web app URL into GAS_WEBHOOK_URL.
 *
 *    function doPost(e){var d=JSON.parse(e.postData.contents);
 *    SpreadsheetApp.openById('SHEET_ID').getSheetByName('Leads').appendRow(
 *    [new Date(),d.score,d.name,d.phone,d.email,d.trade,d.missedCalls,d.phoneCoverage,
 *    d.timeline,d.revenue,(d.location&&d.location.city)||'',(d.location&&d.location.region)||'',
 *    (d.utm&&d.utm.utm_source)||'',(d.utm&&d.utm.utm_campaign)||'',(d.utm&&d.utm.fbclid)||'']);
 *    return ContentService.createTextOutput('ok')}
 *
 * 2. Telegram (TG_BOT_TOKEN, TG_CHAT_ID) — instant alert for Maks
 *    a. Message @BotFather on Telegram → /newbot → follow the prompts →
 *       copy the token it gives you into TG_BOT_TOKEN.
 *    b. Send your new bot any message (so it can see your chat), then open
 *       https://api.telegram.org/bot<token>/getUpdates in a browser and
 *       read "chat":{"id": ...} — that number is TG_CHAT_ID.
 *    c. Set both env vars. Redeploy.
 *
 * 3. Email (RESEND_API_KEY, NOTIFY_EMAILS) — for Carter + backup
 *    a. Sign up at resend.com → API Keys → Create API Key.
 *    b. (Recommended) verify a sending domain under Domains — until then
 *       this route sends from onboarding@resend.dev, which Resend only
 *       delivers to the account's own verified email, not arbitrary
 *       recipients.
 *    c. Set RESEND_API_KEY and NOTIFY_EMAILS (comma-separated addresses).
 */

import { NextRequest, NextResponse } from "next/server";

type Score = "HOT" | "WARM" | "COLD";

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  trade: string;
  phoneCoverage: string;
  missedCalls: string;
  timeline: string;
  revenue: string;
  location: { city: string; region: string };
  utm: { utm_source?: string; utm_medium?: string; utm_campaign?: string; fbclid?: string };
  page: string;
  ts: string;
  honeypot?: string;
};

type EnrichedLead = LeadPayload & { score: Score };

const NOT_HOME_SERVICE = "I'm not a home-service business";

function isValidLeadPayload(body: unknown): body is LeadPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const requiredStrings = ["name", "email", "phone", "trade", "timeline", "revenue"];
  for (const key of requiredStrings) {
    if (typeof b[key] !== "string" || (b[key] as string).trim() === "") return false;
  }
  return true;
}

function scoreLead(trade: string, timeline: string, revenue: string): Score {
  const notHomeService = trade === NOT_HOME_SERVICE;
  if (timeline === "Just researching" || notHomeService) return "COLD";
  const revenueAtLeast10k = revenue !== "Under $10k";
  if (timeline === "ASAP — right now" && revenueAtLeast10k) return "HOT";
  return "WARM";
}

function scoreEmoji(score: Score): string {
  return score === "HOT" ? "🔥" : score === "WARM" ? "👍" : "🧊";
}

function notificationText(lead: EnrichedLead): string {
  const emoji = scoreEmoji(lead.score);
  const city = lead.location?.city || "";
  const region = lead.location?.region || "";
  const campaign = lead.utm?.utm_campaign || "";
  return (
    `${emoji} ${lead.score} LEAD — Overtime Hunch\n` +
    `${lead.name} · ${lead.trade} · ${city}, ${region}\n` +
    `📞 ${lead.phone}  ✉️ ${lead.email}\n` +
    `Misses ${lead.missedCalls}/wk · ${lead.phoneCoverage} answers · wants it ${lead.timeline} · ${lead.revenue}/mo` +
    (campaign ? `\n${campaign}` : "")
  );
}

async function sendToSheet(lead: EnrichedLead): Promise<void> {
  const url = process.env.GAS_WEBHOOK_URL;
  if (!url) {
    console.warn("[lead] GAS_WEBHOOK_URL not set — skipping Sheet log");
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
}

async function sendToTelegram(lead: EnrichedLead): Promise<void> {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[lead] TG_BOT_TOKEN/TG_CHAT_ID not set — skipping Telegram alert");
    return;
  }
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: notificationText(lead) }),
  });
}

async function sendToEmail(lead: EnrichedLead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAILS;
  if (!apiKey || !to) {
    console.warn("[lead] RESEND_API_KEY/NOTIFY_EMAILS not set — skipping email");
    return;
  }
  const emoji = scoreEmoji(lead.score);
  const html = notificationText(lead)
    .split("\n")
    .map((line) => `<p>${line}</p>`)
    .join("");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // TODO: swap for a verified sending domain in Resend — onboarding@resend.dev
      // only delivers to the account owner's own address.
      from: "Overtime Hunch <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      subject: `${emoji} ${lead.score} lead: ${lead.name} — ${lead.trade} (${lead.location?.city || "unknown city"})`,
      html,
    }),
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidLeadPayload(body)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot — bots that auto-fill every input trip this hidden field.
  // Respond as if everything's fine (don't tip them off) but do nothing.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const score = scoreLead(body.trade, body.timeline, body.revenue);
  const lead: EnrichedLead = { ...body, score };

  await Promise.allSettled([sendToSheet(lead), sendToTelegram(lead), sendToEmail(lead)]);

  return NextResponse.json({ ok: true, score });
}
