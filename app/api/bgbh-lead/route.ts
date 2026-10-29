import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// BG Beach Homes enquiries: every request is kept as a private JSON file in the site's Blob store
// (bgbh/leads/…) and posted to the team's Telegram chat (BGBH_TG_BOT_TOKEN + BGBH_TG_CHAT_ID).
// The visitor only gets a reference number when the Telegram message went through.
export const runtime = 'nodejs';
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const recent = new Map<string, number[]>();
const FIELDS = ['type', 'key', 'name', 'contact', 'from', 'to', 'people', 'when', 'msg', 'lang', 'page', 'brief', 'top', 'listings', 'nights', 'guests', 'budget', 'town', 'transfer', 'show_11', 'show_13', 'show_15'];

function clean(input: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const k of FIELDS) {
    const v = input[k];
    if (v == null || v === '') continue;
    out[k] = String(v).slice(0, k === 'msg' || k === 'brief' ? 1500 : 300);
  }
  return out;
}

function refCode() {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 5; i++) s += a[Math.floor(Math.random() * a.length)];
  return 'BG-' + s;
}

async function telegram(text: string) {
  const token = process.env.BGBH_TG_BOT_TOKEN, chat = process.env.BGBH_TG_CHAT_ID;
  if (!token || !chat) return false;
  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
  });
  return r.ok;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return reply({ ok: false }, 403);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter(t => t > now - 3600_000);
  if (hits.length >= 12) return reply({ ok: false, error: 'rate' }, 429);
  recent.set(ip, [...hits, now]);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return reply({ ok: false }, 400); }
  const lead = clean(body);
  if (!lead.name || !lead.contact || !lead.type) return reply({ ok: false, error: 'missing' }, 400);
  const ref = refCode();
  const record = { ref, receivedAt: new Date(now).toISOString(), ...lead };

  let stored = false, sent = false;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(`bgbh/leads/${record.receivedAt.slice(0, 10)}/${ref}.json`, JSON.stringify(record, null, 2), {
        access: 'private', contentType: 'application/json', addRandomSuffix: false,
      });
      stored = true;
    } catch { /* fall through to Telegram */ }
  }
  try {
    const lines = [`🏖 New ${lead.type} request ${ref}`, ...Object.entries(lead).filter(([k]) => !['type', 'lang', 'page'].includes(k)).map(([k, v]) => `${k}: ${v}`), `lang: ${lead.lang || '-'}`, `page: ${request.nextUrl.origin}${lead.page || ''}`];
    sent = await telegram(lines.join('\n'));
  } catch { /* ignore */ }

  // Only promise a reply when a person was actually notified; otherwise the page sends the visitor to Telegram.
  if (!sent) return reply({ ok: false, stored, error: 'not-delivered' }, 503);
  return reply({ ok: true, ref, stored });
}
