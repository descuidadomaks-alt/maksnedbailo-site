import { NextRequest, NextResponse } from 'next/server';
import { readOnly, updateDoc } from '@/lib/bgbh/store';
import { botReady, esc, teamChat, tg, TgUser, userLabel } from '@/lib/bgbh/telegram';
import { Listing, pickLang, priceLabel, townLabel, typeLabel } from '@/lib/bgbh/match';
import { Briefs, SITE_PATH, appButton, bt, listingUrl, loadListings, sendMatches } from '@/lib/bgbh/alerts';

// Telegram webhook for the BG Beach Homes bot.
//   /start w_<id>  connect a saved brief from the site → confirmation + what fits today
//   /start         welcome + "Open BG Beach Homes" (Mini App)
//   /stop          pause alerts
//   "Ask the owner" button → request to the team chat, confirmation to the person
//   anything else  forwarded to the team chat (a person answers; the AI brain comes later)
// One-time setup: GET /api/bgbh-bot?setup=<BGBH_WEBHOOK_SECRET> sets the webhook, commands and the menu button.
export const runtime = 'nodejs';
const ok = () => NextResponse.json({ ok: true });
const secret = () => process.env.BGBH_WEBHOOK_SECRET || '';

type Update = {
  message?: { chat: { id: number; type: string }; from?: TgUser; text?: string };
  callback_query?: { id: string; from: TgUser; data?: string; message?: { chat: { id: number } } };
};

async function toTeam(text: string) {
  if (teamChat()) await tg('sendMessage', { chat_id: teamChat(), text, parse_mode: 'HTML', link_preview_options: { is_disabled: true } });
}

export async function POST(request: NextRequest) {
  if (!botReady() || !secret() || request.headers.get('x-telegram-bot-api-secret-token') !== secret()) return NextResponse.json({ ok: false }, { status: 401 });
  const site = request.nextUrl.origin;
  let u: Update;
  try { u = await request.json(); } catch { return ok(); }

  if (u.callback_query) {
    const q = u.callback_query, lang = pickLang(q.from.language_code);
    const [action, key] = String(q.data || '').split(':');
    if (action === 'ask' && /^[rs]\d+$/.test(key)) {
      let L: Listing | undefined;
      try { L = (await loadListings(site)).find(x => x.key === key); } catch { /* still forward the id */ }
      await toTeam([
        `🏖 <b>Request from Telegram</b>`,
        `${esc(userLabel(q.from))}`,
        L ? `${esc(L.kind === 'rent' ? 'Rent' : 'Buy')} ID ${L.id} · ${esc(townLabel('en', L.town))} · ${esc(typeLabel('en', L))} · ${esc(priceLabel('en', L))}` : `Listing ${esc(key)}`,
        L ? listingUrl(site, L) : '',
        q.from.username ? `Reply: https://t.me/${q.from.username}` : 'No @username: reply through the bot chat',
      ].filter(Boolean).join('\n'));
      await tg('answerCallbackQuery', { callback_query_id: q.id, text: bt(lang, 'asked') });
      if (q.message) await tg('sendMessage', { chat_id: q.message.chat.id, text: bt(lang, 'asked') });
    } else {
      await tg('answerCallbackQuery', { callback_query_id: q.id });
    }
    return ok();
  }

  const m = u.message;
  if (!m || m.chat.type !== 'private' || !m.from) return ok();
  const lang = pickLang(m.from.language_code), text = (m.text || '').trim(), chatId = m.chat.id;

  const link = text.match(/^\/start\s+w_([a-f0-9]{6,16})$/);
  if (link) {
    const id = link[1];
    const all = await updateDoc<Briefs>('briefs.json', {}, b => {
      if (!b[id]) return b;
      for (const other of Object.values(b)) if (other.chatId === chatId && other.id !== id) other.active = false; // newest brief wins
      b[id].chatId = chatId; b[id].active = true; b[id].user = { first_name: m.from!.first_name, username: m.from!.username };
      return b;
    });
    const saved = all[id];
    if (!saved) {
      await tg('sendMessage', { chat_id: chatId, text: bt(lang, 'welcome'), reply_markup: { inline_keyboard: [[appButton(site, lang, '/match')]] } });
      return ok();
    }
    await tg('sendMessage', { chat_id: chatId, text: `${bt(saved.lang, 'watching')}\n\n${bt(saved.lang, 'today')}` });
    try {
      const sent = await sendMatches(site, saved, await loadListings(site), 3);
      if (!sent.length) await tg('sendMessage', { chat_id: chatId, text: bt(saved.lang, 'none'), reply_markup: { inline_keyboard: [[appButton(site, saved.lang, '/feed')]] } });
      await updateDoc<Briefs>('briefs.json', {}, b => { if (b[id]) b[id].sent = Array.from(new Set([...b[id].sent, ...sent])); return b; });
    } catch { /* next alert run catches up */ }
    await toTeam(`🔔 New watcher: ${esc(userLabel(m.from))}\n${esc(JSON.stringify(saved.brief))}`);
    return ok();
  }

  if (/^\/start\b/.test(text)) {
    const b = Object.values(await readOnly<Briefs>('briefs.json', {})).find(x => x.chatId === chatId);
    if (b && !b.active) await updateDoc<Briefs>('briefs.json', {}, all => { if (all[b.id]) all[b.id].active = true; return all; });
    await tg('sendMessage', { chat_id: chatId, text: bt(lang, b ? 'watching' : 'welcome'), reply_markup: { inline_keyboard: [[appButton(site, lang, b ? '/feed' : '/match')]] } });
    return ok();
  }
  if (/^\/stop\b/.test(text)) {
    await updateDoc<Briefs>('briefs.json', {}, all => { for (const b of Object.values(all)) if (b.chatId === chatId) b.active = false; return all; });
    await tg('sendMessage', { chat_id: chatId, text: bt(lang, 'stopped') });
    return ok();
  }
  if (text) {
    await toTeam(`💬 <b>Message to the bot</b>\n${esc(userLabel(m.from))}\n\n${esc(text.slice(0, 1500))}${m.from.username ? `\n\nReply: https://t.me/${m.from.username}` : ''}`);
    await tg('sendMessage', { chat_id: chatId, text: bt(lang, 'human') });
  }
  return ok();
}

export async function GET(request: NextRequest) {
  if (!botReady() || !secret() || request.nextUrl.searchParams.get('setup') !== secret()) return NextResponse.json({ ok: false }, { status: 401 });
  const site = request.nextUrl.origin;
  const results: Record<string, unknown> = {};
  results.webhook = await tg('setWebhook', { url: `${site}/api/bgbh-bot`, secret_token: secret(), allowed_updates: ['message', 'callback_query'], drop_pending_updates: true });
  for (const lang of ['en', 'uk', 'ru', 'bg'] as const) {
    results['commands_' + lang] = await tg('setMyCommands', {
      commands: [{ command: 'start', description: bt(lang, 'app') }, { command: 'stop', description: '⏸' }],
      ...(lang === 'en' ? {} : { language_code: lang }),
    });
  }
  results.menu = await tg('setChatMenuButton', { menu_button: { type: 'web_app', text: 'BG Beach Homes', web_app: { url: `${site}${SITE_PATH}` } } });
  return NextResponse.json({ ok: true, results });
}
