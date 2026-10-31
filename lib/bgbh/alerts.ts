import { Brief, Lang, Listing, classify, priceLabel, townLabel, typeLabel, briefMonth } from './match';
import { esc, tg } from './telegram';

export const SITE_PATH = '/projects/bg-beach-homes';
export type SavedBrief = {
  id: string; brief: Brief; lang: Lang; created: string; updated: string; active: boolean;
  chatId?: number; user?: { first_name?: string; username?: string }; sent: string[];
};
export type Briefs = Record<string, SavedBrief>;

const TXT: Record<Lang, Record<string, string>> = {
  en: { exact: '🔔 New home that fits your request', near: '🔔 Almost what you asked for', differs: 'What differs', fits: 'Why it fits', open: 'Open', ask: 'Ask the owner',
    welcome: 'Hi! I am the BG Beach Homes helper. Tell me what you need in the app — I will show the homes that fit and write to you when a new one appears, even if it is only almost right.', app: 'Open BG Beach Homes',
    watching: 'Done — I am watching for you. Exact matches and near matches (I will always say what differs) will come here. /stop to pause.', today: 'What fits today:', none: 'Nothing fits right now — you will be the first to know.',
    stopped: 'Paused. No more alerts. Send /start to turn them back on.', asked: 'Sent to the team — a person will reply in this chat, usually the same day.', human: 'Thanks! A person from our team will answer here soon.', more: 'and {n} more in the app' },
  uk: { exact: '🔔 Новий варіант під ваш запит', near: '🔔 Майже те, що ви шукали', differs: 'Що відрізняється', fits: 'Чому підходить', open: 'Відкрити', ask: 'Запитати власника',
    welcome: 'Вітаю! Я помічник BG Beach Homes. Розкажіть у застосунку, що вам потрібно, — покажу, що підходить, і напишу, щойно з’явиться новий варіант, навіть якщо він майже підходить.', app: 'Відкрити BG Beach Homes',
    watching: 'Готово — стежу за вас. Точні збіги й майже збіги (завжди скажу, що відрізняється) прийдуть сюди. /stop — пауза.', today: 'Що підходить сьогодні:', none: 'Зараз нічого не підходить — ви дізнаєтеся першими.',
    stopped: 'Пауза. Сповіщень більше не буде. Надішліть /start, щоб увімкнути знову.', asked: 'Надіслано команді — людина відповість у цьому чаті, зазвичай того ж дня.', human: 'Дякую! Людина з нашої команди скоро відповість тут.', more: 'і ще {n} у застосунку' },
  ru: { exact: '🔔 Новый вариант под ваш запрос', near: '🔔 Почти то, что вы искали', differs: 'Что отличается', fits: 'Почему подходит', open: 'Открыть', ask: 'Спросить владельца',
    welcome: 'Здравствуйте! Я помощник BG Beach Homes. Расскажите в приложении, что вам нужно, — покажу, что подходит, и напишу, как только появится новый вариант, даже если он подходит почти.', app: 'Открыть BG Beach Homes',
    watching: 'Готово — слежу за вас. Точные совпадения и почти совпадения (всегда скажу, что отличается) придут сюда. /stop — пауза.', today: 'Что подходит сегодня:', none: 'Сейчас ничего не подходит — вы узнаете первыми.',
    stopped: 'Пауза. Уведомлений больше не будет. Отправьте /start, чтобы включить снова.', asked: 'Отправлено команде — человек ответит в этом чате, обычно в тот же день.', human: 'Спасибо! Человек из нашей команды скоро ответит здесь.', more: 'и ещё {n} в приложении' },
  bg: { exact: '🔔 Нов имот според запитването ви', near: '🔔 Почти това, което търсите', differs: 'Какво е различно', fits: 'Защо пасва', open: 'Отвори', ask: 'Попитай собственика',
    welcome: 'Здравейте! Аз съм помощникът на BG Beach Homes. Кажете в приложението какво ви трябва — ще покажа подходящото и ще ви пиша, щом се появи нов имот, дори ако е почти подходящ.', app: 'Отвори BG Beach Homes',
    watching: 'Готово — следя вместо вас. Точните и почти точните съвпадения (винаги казвам какво е различно) ще идват тук. /stop — пауза.', today: 'Какво пасва днес:', none: 'В момента нищо не пасва — ще научите първи.',
    stopped: 'Пауза. Няма да има повече известия. Изпратете /start, за да ги включите.', asked: 'Изпратено на екипа — човек ще отговори в този чат, обикновено същия ден.', human: 'Благодаря! Човек от екипа ни ще отговори тук скоро.', more: 'и още {n} в приложението' },
};
export const bt = (lang: Lang, k: string, n?: number) => (TXT[lang] || TXT.en)[k].replace('{n}', String(n ?? ''));

export const listingUrl = (origin: string, L: Listing) => `${origin}${SITE_PATH}/${L.kind === 'rent' ? 'rent' : 'buy'}/${L.key}`;
export const appButton = (origin: string, lang: Lang, path = '') => ({ text: bt(lang, 'app'), web_app: { url: `${origin}${SITE_PATH}${path}` } });

export function cardMessage(origin: string, lang: Lang, L: Listing, brief: Brief, m: { kind: 'exact' | 'near'; why: string[]; miss: string[] }) {
  const title = [typeLabel(lang, L), townLabel(lang, L.town)].filter(Boolean).join(' · ');
  const lines = [
    `<b>${esc(m.kind === 'exact' ? bt(lang, 'exact') : bt(lang, 'near'))}</b>`,
    '',
    `<b>${esc(priceLabel(lang, L, briefMonth(brief)))}</b>`,
    `${esc(title)}${L.cx ? ` — ${esc(lang === 'en' && L.cxl ? L.cxl : L.cx)}` : ''}`,
  ];
  if (m.miss.length) lines.push('', `⚠️ ${esc(bt(lang, 'differs'))}: ${esc(m.miss.join(', '))}`);
  if (m.why.length) lines.push(`✅ ${esc(bt(lang, 'fits'))}: ${esc(m.why.join(', '))}`);
  lines.push('', `ID ${L.id}`);
  return {
    photo: `${origin}/bgbh/p/${L.key}/card.jpg`,
    caption: lines.join('\n'),
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: [[{ text: bt(lang, 'open'), web_app: { url: listingUrl(origin, L) } }, { text: bt(lang, 'ask'), callback_data: `ask:${L.key}` }]] },
  };
}

/** Sends up to `limit` matching homes to a saved brief; returns the keys that were sent. */
export async function sendMatches(origin: string, b: SavedBrief, listings: Listing[], limit = 4) {
  if (!b.chatId) return [];
  const found = listings
    .filter(L => !b.sent.includes(L.key))
    .map(L => ({ L, m: classify(b.brief, L, b.lang) }))
    .filter((x): x is { L: Listing; m: NonNullable<ReturnType<typeof classify>> } => !!x.m)
    .sort((a, c) => (a.m.kind === c.m.kind ? c.m.score - a.m.score : a.m.kind === 'exact' ? -1 : 1));
  const sent: string[] = [];
  for (const { L, m } of found.slice(0, limit)) {
    const r = await tg('sendPhoto', { chat_id: b.chatId, ...cardMessage(origin, b.lang, L, b.brief, m) });
    if (!r.ok) {
      // photo refused (size/format): fall back to text so the alert still arrives
      const msg = cardMessage(origin, b.lang, L, b.brief, m);
      const t = await tg('sendMessage', { chat_id: b.chatId, text: msg.caption, parse_mode: 'HTML', reply_markup: msg.reply_markup });
      if (!t.ok) break; // blocked or chat gone: stop for this person
    }
    sent.push(L.key);
  }
  if (found.length > limit) {
    await tg('sendMessage', { chat_id: b.chatId, text: bt(b.lang, 'more', found.length - limit), reply_markup: { inline_keyboard: [[appButton(origin, b.lang, '/feed')]] } });
    sent.push(...found.slice(limit).map(x => x.L.key)); // counted as offered: they are in the feed
  }
  return sent;
}

export async function loadListings(origin: string): Promise<Listing[]> {
  const r = await fetch(`${origin}/bgbh/data/listings.json`, { cache: 'no-store' });
  if (!r.ok) throw new Error('listings ' + r.status);
  return r.json();
}
