import { NextRequest, NextResponse } from 'next/server';
import { updateDoc } from '@/lib/bgbh/store';
import { botReady } from '@/lib/bgbh/telegram';
import { Briefs, loadListings, sendMatches } from '@/lib/bgbh/alerts';

// Alert run: compares the published listings with the last run; every new home is checked against every active brief
// and sent as an exact or near match (max 4 per person per run, the rest point to the feed).
// Called daily by Vercel cron (Authorization: Bearer CRON_SECRET) or by hand: ?key=<BGBH_WEBHOOK_SECRET>.
export const runtime = 'nodejs';
export const maxDuration = 60;
type State = { known: string[]; lastRun?: string; lastSent?: number };

function allowed(request: NextRequest) {
  const cron = process.env.CRON_SECRET, key = process.env.BGBH_WEBHOOK_SECRET;
  if (cron && request.headers.get('authorization') === `Bearer ${cron}`) return true;
  if (key && request.nextUrl.searchParams.get('key') === key) return true;
  // without CRON_SECRET Vercel's scheduler can only be recognised by its user agent; a stray call just runs the same idempotent check
  if (!cron && (request.headers.get('user-agent') || '').startsWith('vercel-cron/')) return true;
  return false;
}

export async function GET(request: NextRequest) {
  if (!allowed(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!botReady()) return NextResponse.json({ ok: false, error: 'bot not configured' }, { status: 503 });
  const site = request.nextUrl.origin;
  const listings = await loadListings(site);
  const keys = listings.map(l => l.key);
  let fresh: string[] = [], first = false;
  await updateDoc<State>('alerts-state.json', { known: [] }, s => {
    first = !s.known.length;
    fresh = first ? [] : keys.filter(k => !s.known.includes(k)); // first run only records what exists, so nobody gets a blast of old homes
    return { ...s, known: Array.from(new Set([...s.known, ...keys])), lastRun: new Date().toISOString() };
  });
  if (!fresh.length) return NextResponse.json({ ok: true, first, newListings: 0, sent: 0 });

  const newOnes = listings.filter(l => fresh.includes(l.key));
  const briefs = Object.values(await updateDoc<Briefs>('briefs.json', {}, b => b));
  let total = 0;
  const sentBy: Record<string, string[]> = {};
  for (const b of briefs) {
    if (!b.active || !b.chatId) continue;
    try { sentBy[b.id] = await sendMatches(site, b, newOnes, 4); total += sentBy[b.id].length; } catch { /* next person */ }
  }
  await updateDoc<Briefs>('briefs.json', {}, all => {
    for (const [id, keysSent] of Object.entries(sentBy)) if (all[id]) all[id].sent = Array.from(new Set([...all[id].sent, ...keysSent]));
    return all;
  });
  await updateDoc<State>('alerts-state.json', { known: [] }, s => ({ ...s, lastSent: total }));
  return NextResponse.json({ ok: true, newListings: fresh.length, people: Object.keys(sentBy).length, sent: total });
}
