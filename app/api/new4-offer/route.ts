import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';

export const runtime = 'nodejs';
const account = '625cd09c-4f5a-439a-ad55-379f6e056950';
const widget = 'careless-scout-staging';
const offers: Record<string, string> = { '5s_test': 'The 5-second test', 'leak_check': 'The leak check', 'walkthrough': 'The new-customer walkthrough', 'dependency_map': 'The dependency map' };
const attempts = new Map<string, { count: number; until: number }>();
const receipts = new Map<string, number>();
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return reply({ accepted: false }, 403);
  if (!request.headers.get('content-type')?.includes('application/json') || Number(request.headers.get('content-length') || 0) > 10000) return reply({ accepted: false }, 400);
  let data;
  try { data = await request.json(); } catch { return reply({ accepted: false }, 400); }
  const { offerId, contact, note = '', key, startedAt, company_fax } = data || {};
  if (typeof offerId !== 'string' || !Object.hasOwn(offers, offerId) || typeof contact !== 'string' || contact.length > 320 || typeof note !== 'string' || note.length > 2000 || typeof key !== 'string' || !/^[a-f0-9-]{36}$/i.test(key) || typeof startedAt !== 'number' || Date.now() - startedAt < 700 || Date.now() - startedAt > 86400000 || company_fax) return reply({ accepted: false }, 400);
  const value = contact.trim(), email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  let website = false;
  try { const url = new URL(/^https?:\/\//i.test(value) ? value : 'https://' + value); website = /^https?:$/.test(url.protocol) && url.hostname.includes('.') && !value.includes('@') && !/\s/.test(value); } catch { /* Invalid contact is rejected below. */ }
  if (!email && !website) return reply({ accepted: false }, 400);
  const now = Date.now();
  receipts.forEach((time, id) => { if (time < now - 3600000) receipts.delete(id); });
  attempts.forEach((item, id) => { if (item.until < now) attempts.delete(id); });
  const session = createHash('sha256').update(key).digest('hex').slice(0, 30);
  if (receipts.has(session)) return reply({ accepted: true });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  const bucket = attempts.get(ip) || { count: 0, until: now + 600000 };
  if (++bucket.count > 8) return reply({ accepted: false }, 429);
  attempts.set(ip, bucket);
  const message = `Care Less /new4 offer request: ${offers[offerId]}\nContact (website or email): ${value}\nOptional note: ${note.trim() || '—'}\nPlease route to Maks for a reply within an hour. This is a submitted offer request, not a request to start a voice call.`;
  try {
    // Existing public MCB widget channel. Never expose the private MCP credential.
    const response = await fetch(`https://api.mychatbot.app/webhook/sw-widget/${account}/${widget}/${session}`, {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(12000),
      headers: { 'Content-Type': 'application/json', Authorization: account + widget },
      body: JSON.stringify({ action: 'my_chat_send', widget_id: widget, session, payload: { message, wp_context: request.nextUrl.origin + '/new4', offer_id: offerId }, ...(email ? { user_data: { email: value } } : {}) }),
    });
    if (!response.ok) return reply({ accepted: false }, 502);
    const result = await response.json();
    if (!result || result.error || result.success === false || result.accepted === false || result.status === false || /^(error|failed|disabled|inactive|paused|rejected)$/i.test(String(result.status)) || Number(result.status) >= 400) return reply({ accepted: false }, 502);
    receipts.set(session, now);
    return reply({ accepted: true });
  } catch { return reply({ accepted: false }, 503); }
}
