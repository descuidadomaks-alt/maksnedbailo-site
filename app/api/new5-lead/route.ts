import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';

// /new5 lead intake: offers, Scout chat confirmations and the final question.
// Forwards to the existing MCB public widget channel (same as /api/new4-offer). Never reports success without an upstream ack.
export const runtime = 'nodejs';
const account = '625cd09c-4f5a-439a-ad55-379f6e056950';
const widget = process.env.CARELESS_SCOUT_WIDGET || 'careless-scout-staging';
const offers: Record<string, string> = {
  look: 'The 5-second test',
  leak: 'The missed-enquiry check',
  shopper: 'The mystery-shopper run',
  needs_me: 'The "does it need me?" check',
  scout_chat: 'Scout chat — confirmed contact',
  final_note: 'Final question — what they want to care less about',
  letter: 'Email list — one thing to care less about',
};
const attempts = new Map<string, { count: number; until: number }>();
const receipts = new Map<string, number>();
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

function kindOf(value: string): 'email' | 'phone' | 'website' | null {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'email';
  if (/^\+?[\d\s().-]{7,22}$/.test(value) && value.replace(/\D/g, '').length >= 7) return 'phone';
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : 'https://' + value);
    if (/^https?:$/.test(url.protocol) && url.hostname.includes('.') && !value.includes('@') && !/\s/.test(value)) return 'website';
  } catch { /* not a URL */ }
  return null;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return reply({ accepted: false }, 403);
  if (!request.headers.get('content-type')?.includes('application/json') || Number(request.headers.get('content-length') || 0) > 12000) return reply({ accepted: false }, 400);
  let data;
  try { data = await request.json(); } catch { return reply({ accepted: false }, 400); }
  const { offerId, contact, note = '', key, startedAt, company_fax, page: rawPage } = data || {};
  const page = ['new7', 'new8', 'new9', 'new10'].includes(rawPage) ? rawPage : 'new5'; // the care_less pages share this intake
  if (typeof offerId !== 'string' || !Object.hasOwn(offers, offerId) || typeof contact !== 'string' || contact.length > 320 || typeof note !== 'string' || note.length > 2000 || typeof key !== 'string' || !/^[a-f0-9-]{36}$/i.test(key) || typeof startedAt !== 'number' || Date.now() - startedAt < 700 || Date.now() - startedAt > 86400000 || company_fax) return reply({ accepted: false }, 400);
  const value = contact.trim();
  const kind = kindOf(value);
  if (!kind) return reply({ accepted: false }, 400);
  const now = Date.now();
  receipts.forEach((time, id) => { if (time < now - 3600000) receipts.delete(id); });
  attempts.forEach((item, id) => { if (item.until < now) attempts.delete(id); });
  const session = createHash('sha256').update(key).digest('hex').slice(0, 30);
  if (receipts.has(session)) return reply({ accepted: true });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  const bucket = attempts.get(ip) || { count: 0, until: now + 600000 };
  if (++bucket.count > 8) return reply({ accepted: false }, 429);
  attempts.set(ip, bucket);
  const message = `Care Less /${page} lead: ${offers[offerId]}\nContact (${kind}): ${value}\nNote:\n${note.trim() || '—'}\nPlease route to Maks. Do not start a voice call.`;
  try {
    const response = await fetch(`https://api.mychatbot.app/webhook/sw-widget/${account}/${widget}/${session}`, {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(12000),
      headers: { 'Content-Type': 'application/json', Authorization: account + widget },
      body: JSON.stringify({ action: 'my_chat_send', widget_id: widget, session, payload: { message, wp_context: request.nextUrl.origin + '/' + page, offer_id: offerId }, ...(kind === 'email' ? { user_data: { email: value } } : kind === 'phone' ? { user_data: { phone: value } } : {}) }),
    });
    if (!response.ok) return reply({ accepted: false }, 502);
    const result = await response.json();
    if (!result || result.error || result.success === false || result.accepted === false || result.status === false || /^(error|failed|disabled|inactive|paused|rejected)$/i.test(String(result.status)) || Number(result.status) >= 400) return reply({ accepted: false }, 502);
    receipts.set(session, now);
    return reply({ accepted: true });
  } catch { return reply({ accepted: false }, 503); }
}
