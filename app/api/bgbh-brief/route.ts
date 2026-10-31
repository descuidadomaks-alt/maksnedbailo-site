import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateDoc } from '@/lib/bgbh/store';
import { botReady, botUsername, tg, verifyInitData } from '@/lib/bgbh/telegram';
import { Brief, pickLang } from '@/lib/bgbh/match';
import { Briefs, bt, loadListings, sendMatches } from '@/lib/bgbh/alerts';

// "Watch for me": saves the visitor's brief and returns a t.me link that connects it to their Telegram chat.
// Inside the Mini App (valid initData) the chat is connected straight away.
export const runtime = 'nodejs';
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const recent = new Map<string, number[]>();

function cleanBrief(x: Record<string, unknown>): Brief | null {
  const list = (v: unknown) => (Array.isArray(v) ? v.map(String).filter(s => /^[a-z-]{2,20}$/.test(s)).slice(0, 12) : []);
  const kind = x.kind === 'sale' ? 'sale' : x.kind === 'rent' ? 'rent' : null;
  if (!kind) return null;
  return {
    kind, who: list(x.who), matters: list(x.matters),
    when: /^[a-z]{0,10}$/.test(String(x.when || '')) ? String(x.when || '') : '',
    budget: Math.max(0, Math.min(5_000_000, Number(x.budget) || 0)),
    town: /^[a-z-]{0,20}$/.test(String(x.town || '')) ? String(x.town || '') : '',
  };
}

export async function GET() {
  return reply({ ready: botReady(), bot: botUsername() || null });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return reply({ ok: false }, 403);
  if (!botReady()) return reply({ ok: false, error: 'not-ready' }, 503);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter(t => t > now - 3600_000);
  if (hits.length >= 20) return reply({ ok: false, error: 'rate' }, 429);
  recent.set(ip, [...hits, now]);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return reply({ ok: false }, 400); }
  const brief = cleanBrief((body.brief || {}) as Record<string, unknown>);
  if (!brief) return reply({ ok: false, error: 'brief' }, 400);
  const user = verifyInitData(String(body.initData || ''));
  const lang = pickLang(String(body.lang || user?.language_code || ''));
  const site = request.nextUrl.origin;

  // one brief per Telegram user (updated in place); anonymous visitors get a fresh id until they connect
  let id = String(body.id || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
  const briefs = await updateDoc<Briefs>('briefs.json', {}, all => {
    if (user) id = Object.values(all).find(b => b.chatId === user.id)?.id || id;
    if (!id || !all[id]) id = crypto.randomBytes(6).toString('hex');
    const prev = all[id];
    all[id] = {
      id, brief, lang, active: true, sent: prev?.sent || [],
      created: prev?.created || new Date(now).toISOString(), updated: new Date(now).toISOString(),
      chatId: user?.id ?? prev?.chatId, user: user ? { first_name: user.first_name, username: user.username } : prev?.user,
    };
    return all;
  });
  const saved = briefs[id];
  let connected = false;
  if (saved.chatId) {
    // the person may never have pressed Start on the bot: then Telegram refuses and we fall back to the link
    const r = await tg('sendMessage', { chat_id: saved.chatId, text: bt(lang, 'watching') });
    connected = r.ok;
    if (connected) {
      try {
        const sent = await sendMatches(site, saved, await loadListings(site), 3);
        if (!sent.length) await tg('sendMessage', { chat_id: saved.chatId, text: bt(lang, 'none') });
        await updateDoc<Briefs>('briefs.json', {}, all => { if (all[id]) all[id].sent = Array.from(new Set([...all[id].sent, ...sent])); return all; });
      } catch { /* alerts will catch up on the next run */ }
    }
  }
  return reply({ ok: true, id, connected, link: `https://t.me/${botUsername()}?start=w_${id}` });
}
