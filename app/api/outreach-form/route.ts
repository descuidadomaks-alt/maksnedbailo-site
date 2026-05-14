/**
 * Outreach enquiry form — webhook stub.
 *
 * The SectionEnquiryForm component POSTs directly to `data.formWebhookUrl`
 * (n8n / make.com / Zapier) from the browser. This server-side route exists
 * as a fallback / logging layer if you want to proxy through your own domain.
 *
 * Usage: set formWebhookUrl in the prospect data file to either:
 *   – Your n8n/make.com webhook URL (direct browser POST)
 *   – "/api/outreach-form" (routes through here, then forwards)
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { webhookUrl, ...payload } = body as {
    webhookUrl?: string;
    [key: string]: unknown;
  };

  // If a downstream webhook URL is supplied, forward the payload
  if (webhookUrl && typeof webhookUrl === "string") {
    try {
      const upstream = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!upstream.ok) {
        console.error("[outreach-form] upstream webhook failed:", upstream.status);
        return NextResponse.json({ error: "Webhook forwarding failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("[outreach-form] fetch error:", err);
      return NextResponse.json({ error: "Network error" }, { status: 502 });
    }
  } else {
    // No webhook configured — just log and succeed (dev / testing mode)
    console.log("[outreach-form] submission received (no webhook configured):", payload);
  }

  return NextResponse.json({ ok: true });
}
