/**
 * Lead capture — Care Less UK locksmith missed-call campaign. Same fan-out
 * architecture as app/api/lead/route.ts (Promise.allSettled to a Google
 * Sheet + Telegram, every integration no-ops with a console.warn instead of
 * throwing if its env var isn't set), sized to the 5 Meta Instant Form
 * questions instead of the oh4 quiz fields.
 *
 * Two ways a lead reaches this route:
 *
 * 1. LIVE — Meta's native `leadgen` webhook ping (see SETUP §3). The ping
 *    itself carries no field data, only a `leadgen_id`; we fetch the real
 *    answers from the Graph API before fanning out.
 * 2. TEST — POST a plain JSON body matching NormalizedLead directly (no
 *    `object` key) and it fans out immediately, skipping the Graph API call.
 *    This is how you smoke-test the whole pipe without any live Meta setup:
 *
 *      curl -X POST http://localhost:3000/api/missed-calls-lead \
 *        -H "Content-Type: application/json" \
 *        -d '{"name":"Dave Smith","mobile":"+447700900000","trade":"Locksmith",
 *             "missedCallsPerWeek":"5-10","whoAnswersNow":"Me","jobValueBand":"£100-250",
 *             "utm":{"utm_source":"facebook","utm_campaign":"missed-calls-uk-locksmith"}}'
 *
 * SETUP
 *
 * 1. Google Sheet (GAS_WEBHOOK_URL_MISSED_CALLS) — a SEPARATE sheet from
 *    oh4's, free, no service-account keys
 *    a. Create a Sheet with a tab named "Leads"; copy the Sheet ID out of
 *       its URL (the long string between /d/ and /edit).
 *    b. Extensions → Apps Script. Delete the placeholder code and paste the
 *       doPost() function below (swap in your Sheet ID), then Deploy → New
 *       deployment → type "Web app" → execute as "Me" → who has access
 *       "Anyone".
 *    c. Copy the deployment's web app URL into GAS_WEBHOOK_URL_MISSED_CALLS.
 *
 *    function doPost(e){var d=JSON.parse(e.postData.contents);
 *    SpreadsheetApp.openById('SHEET_ID').getSheetByName('Leads').appendRow(
 *    [new Date(),d.name,d.mobile,d.trade,d.missedCallsPerWeek,d.whoAnswersNow,
 *    d.jobValueBand,(d.utm&&d.utm.utm_source)||'',(d.utm&&d.utm.utm_campaign)||'',
 *    (d.utm&&d.utm.fbclid)||'']);
 *    return ContentService.createTextOutput('ok')}
 *
 * 2. Telegram (TG_BOT_TOKEN, TG_CHAT_ID) — reuses the same bot/chat already
 *    set up for oh4 (see app/api/lead/route.ts SETUP §2 if not done yet).
 *    Nothing new to create here.
 *
 * 3. Meta leadgen webhook (META_PAGE_ACCESS_TOKEN, META_VERIFY_TOKEN) — the
 *    only step that has to happen in Meta's own dashboard, not in code:
 *    a. developers.facebook.com → Create App → type "Business".
 *    b. Add the "Webhooks" product → Page → Subscribe → field "leadgen" →
 *       Callback URL: https://maksnedbailo.site/api/missed-calls-lead →
 *       Verify token: any string you choose, set as META_VERIFY_TOKEN.
 *    c. Generate a Page Access Token for your Page with the `leads_retrieval`
 *       and `pages_manage_metadata` permissions (Graph API Explorer, or a
 *       System User token for something longer-lived) → set as
 *       META_PAGE_ACCESS_TOKEN.
 *    d. Subscribe your Page to the app (Page Settings → Webhooks, or via the
 *       Graph API `/me/subscribed_apps`).
 *    HONESTY NOTE: apps used only for assets you personally administer, in
 *    Development Mode, typically don't need Meta App Review for this — but
 *    Meta's review requirements shift over time. If leads stop arriving,
 *    check the app's Access status in Meta's dashboard first.
 */

import { NextRequest, NextResponse } from "next/server";

type NormalizedLead = {
  name: string;
  mobile: string;
  trade: string;
  missedCallsPerWeek: string;
  whoAnswersNow: string;
  jobValueBand: string;
  utm?: { utm_source?: string; utm_campaign?: string; fbclid?: string };
};

type MetaLeadgenWebhook = {
  object: string;
  entry: Array<{
    changes: Array<{ value: { leadgen_id: string; page_id?: string; form_id?: string } }>;
  }>;
};

function isMetaWebhookPayload(body: unknown): body is MetaLeadgenWebhook {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return b.object === "page" && Array.isArray(b.entry);
}

function isDirectLeadPayload(body: unknown): body is NormalizedLead {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const requiredStrings = ["name", "mobile", "trade"];
  return requiredStrings.every((key) => typeof b[key] === "string" && (b[key] as string).trim() !== "");
}

/** Meta's field_data is an array of {name, values: [value]} pairs — flatten to a lookup. */
function fieldValue(fieldData: Array<{ name: string; values: string[] }>, name: string): string {
  return fieldData.find((f) => f.name === name)?.values?.[0] ?? "";
}

async function fetchLeadFromMeta(leadgenId: string): Promise<NormalizedLead | null> {
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  if (!token) {
    console.warn("[missed-calls-lead] META_PAGE_ACCESS_TOKEN not set — cannot fetch lead detail");
    return null;
  }
  const res = await fetch(
    `https://graph.facebook.com/v21.0/${leadgenId}?access_token=${encodeURIComponent(token)}`
  );
  if (!res.ok) {
    console.warn(`[missed-calls-lead] Graph API fetch failed: ${res.status}`);
    return null;
  }
  const data = (await res.json()) as { field_data?: Array<{ name: string; values: string[] }> };
  const fieldData = data.field_data ?? [];
  return {
    name: fieldValue(fieldData, "full_name") || fieldValue(fieldData, "name"),
    mobile: fieldValue(fieldData, "phone_number"),
    trade: fieldValue(fieldData, "trade"),
    missedCallsPerWeek: fieldValue(fieldData, "missed_calls_per_week"),
    whoAnswersNow: fieldValue(fieldData, "who_answers_now"),
    jobValueBand: fieldValue(fieldData, "job_value_band"),
  };
}

function notificationText(lead: NormalizedLead): string {
  const campaign = lead.utm?.utm_campaign || "";
  return (
    `📞 NEW LEAD — Care Less (UK Locksmiths)\n` +
    `${lead.name} · ${lead.mobile}\n` +
    `Trade: ${lead.trade} · Misses ${lead.missedCallsPerWeek}/wk · ${lead.whoAnswersNow} answers now · Job value ${lead.jobValueBand}` +
    (campaign ? `\n${campaign}` : "")
  );
}

async function sendToSheet(lead: NormalizedLead): Promise<void> {
  const url = process.env.GAS_WEBHOOK_URL_MISSED_CALLS;
  if (!url) {
    console.warn("[missed-calls-lead] GAS_WEBHOOK_URL_MISSED_CALLS not set — skipping Sheet log");
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
}

async function sendToTelegram(lead: NormalizedLead): Promise<void> {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[missed-calls-lead] TG_BOT_TOKEN/TG_CHAT_ID not set — skipping Telegram alert");
    return;
  }
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: notificationText(lead) }),
  });
}

/** Meta's webhook verification handshake — GET with hub.challenge to echo back. */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let lead: NormalizedLead | null = null;

  if (isMetaWebhookPayload(body)) {
    const leadgenId = body.entry?.[0]?.changes?.[0]?.value?.leadgen_id;
    if (!leadgenId) {
      return NextResponse.json({ ok: true }); // not a leadgen change — ack and ignore
    }
    lead = await fetchLeadFromMeta(leadgenId);
  } else if (isDirectLeadPayload(body)) {
    lead = body;
  }

  if (!lead) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await Promise.allSettled([sendToSheet(lead), sendToTelegram(lead)]);

  return NextResponse.json({ ok: true });
}
