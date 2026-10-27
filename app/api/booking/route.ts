import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

// care_less booking: free slots from Maks's Google Calendar, and booking one as a real event with a Meet link.
// Google sends the visitor the invite (that's the confirmation and the reminders). Until the three GOOGLE_* env vars
// are set, GET answers { configured: false } and the page falls back to zcal.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// When people can book, in Maks's local time. Change these; nothing else needs to move.
const TZ = 'Europe/Madrid';
const DURATION = 30; // minutes per call
const STEP = 30; // a new slot every N minutes
const NOTICE_H = 12; // earliest booking, in hours from now
const HORIZON_D = 21; // how many days ahead
const HOURS: Record<number, [number, number][]> = { 1: [[10, 18]], 2: [[10, 18]], 3: [[10, 18]], 4: [[10, 18]], 5: [[10, 18]] }; // weekday (1 = Mon) → [from, to) hours
const CALENDAR = process.env.BOOKING_CALENDAR_ID || 'primary';

const creds = () => ({ id: process.env.GOOGLE_CLIENT_ID, secret: process.env.GOOGLE_CLIENT_SECRET, refresh: process.env.GOOGLE_REFRESH_TOKEN });
// Local UI testing only: sample free slots, nothing written anywhere. Never active in production.
const mock = process.env.BOOKING_MOCK === '1' && process.env.NODE_ENV !== 'production';
const configured = () => mock || !!(creds().id && creds().secret && creds().refresh);
const reply = (body: object, status = 200, cache = 'no-store') => NextResponse.json(body, { status, headers: { 'Cache-Control': cache } });
const attempts = new Map<string, { count: number; until: number }>();

let token: { value: string; until: number } | null = null;
async function accessToken() {
  if (token && token.until > Date.now() + 60000) return token.value;
  const { id, secret, refresh } = creds();
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(8000),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: id!, client_secret: secret!, refresh_token: refresh!, grant_type: 'refresh_token' }),
  });
  if (!r.ok) throw new Error('token ' + r.status);
  const j = await r.json();
  token = { value: j.access_token, until: Date.now() + j.expires_in * 1000 };
  return token.value;
}
async function calendar(path: string, body: object) {
  const r = await fetch('https://www.googleapis.com/calendar/v3' + path, {
    method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(10000),
    headers: { Authorization: 'Bearer ' + await accessToken(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error('calendar ' + r.status + ' ' + (await r.text()).slice(0, 300));
  return r.json();
}

// TZ's offset from UTC at an instant, then a wall-clock time in TZ as a UTC timestamp (DST-safe).
function offset(at: number) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    .formatToParts(at).map(x => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(at / 1000) * 1000;
}
const zoned = (y: number, m: number, d: number, h: number) => { const guess = Date.UTC(y, m, d, h); return guess - offset(guess - offset(guess)); };

// Every slot inside working hours, after the notice period.
function candidates(now = Date.now()) {
  const today = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now).map(x => [x.type, x.value]));
  const out: number[] = [];
  for (let i = 0; i <= HORIZON_D; i++) {
    const day = new Date(Date.UTC(+today.year, +today.month - 1, +today.day + i));
    for (const [from, to] of HOURS[day.getUTCDay()] || []) {
      const start = zoned(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), from), end = zoned(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), to);
      for (let t = start; t + DURATION * 60000 <= end; t += STEP * 60000) if (t >= now + NOTICE_H * 3600000) out.push(t);
    }
  }
  return out;
}
async function freeSlots() {
  const all = candidates();
  if (!all.length) return [];
  if (mock) return all.filter((t, i) => i % 3 !== 1); // some taken, so the picker looks real while testing
  const fb = await calendar('/freeBusy', { timeMin: new Date(all[0]).toISOString(), timeMax: new Date(all[all.length - 1] + DURATION * 60000).toISOString(), timeZone: TZ, items: [{ id: CALENDAR }] });
  const busy = ((fb.calendars?.[CALENDAR]?.busy || []) as { start: string; end: string }[]).map(b => [Date.parse(b.start), Date.parse(b.end)]);
  return all.filter(t => !busy.some(([s, e]) => t < e && t + DURATION * 60000 > s));
}

export async function GET() {
  if (!configured()) return reply({ configured: false });
  try {
    const slots = await freeSlots();
    return reply({ configured: true, tz: TZ, duration: DURATION, slots: slots.map(t => new Date(t).toISOString()) }, 200, 'public, s-maxage=30, stale-while-revalidate=60');
  } catch { return reply({ configured: true, error: 'unavailable' }, 503); }
}

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[<>]/g, '').trim().slice(0, max) : '');

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return reply({ ok: false }, 403);
  if (!configured()) return reply({ ok: false, error: 'off' }, 503);
  if (Number(request.headers.get('content-length') || 0) > 8000) return reply({ ok: false }, 400);
  let d;
  try { d = await request.json(); } catch { return reply({ ok: false }, 400); }
  const name = clean(d?.name, 80), email = clean(d?.email, 320), site = clean(d?.site, 200), care = clean(d?.care, 600), enquiries = clean(d?.enquiries, 40), lang = d?.lang === 'es' ? 'es' : 'en';
  const start = Date.parse(d?.start);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !Number.isFinite(start) || d?.company_fax || typeof d?.startedAt !== 'number' || Date.now() - d.startedAt < 3000) return reply({ ok: false, error: 'invalid' }, 400);

  const now = Date.now(), ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  attempts.forEach((a, k) => { if (a.until < now) attempts.delete(k); });
  const bucket = attempts.get(ip) || { count: 0, until: now + 3600000 };
  if (++bucket.count > 4) return reply({ ok: false, error: 'busy' }, 429);
  attempts.set(ip, bucket);

  try {
    // Re-check against the live calendar, so two people can't take the same slot.
    if (!(await freeSlots()).includes(start)) return reply({ ok: false, error: 'taken' }, 409);
    const end = start + DURATION * 60000;
    if (mock) return reply({ ok: true, start: new Date(start).toISOString(), end: new Date(end).toISOString(), meet: null });
    const description = [
      `Booked on maksnedbailo.site (${lang.toUpperCase()}).`, '',
      `Website: ${site || '—'}`,
      `Wants to care less about: ${care || '—'}`,
      `Enquiries a week: ${enquiries || '—'}`,
    ].join('\n');
    const event = await calendar(`/calendars/${encodeURIComponent(CALENDAR)}/events?conferenceDataVersion=1&sendUpdates=all`, {
      summary: `Call with Maks · ${name}`,
      description,
      start: { dateTime: new Date(start).toISOString(), timeZone: TZ },
      end: { dateTime: new Date(end).toISOString(), timeZone: TZ },
      attendees: [{ email, displayName: name }],
      conferenceData: { createRequest: { requestId: randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
      reminders: { useDefault: true },
    });
    return reply({ ok: true, start: new Date(start).toISOString(), end: new Date(end).toISOString(), meet: event.hangoutLink || null });
  } catch { return reply({ ok: false, error: 'unavailable' }, 503); }
}
