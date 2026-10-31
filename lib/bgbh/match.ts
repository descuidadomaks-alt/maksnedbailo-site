// Server-side copy of the website's matcher (public/bgbh/app.js → scoreAll), used for Telegram alerts.
// Keep the rules in step with the site so an alert never disagrees with what the feed shows.

export type Lang = 'en' | 'uk' | 'ru' | 'bg';
export type Brief = { kind: 'rent' | 'sale'; who: string[]; when: string; budget: number; matters: string[]; town: string };
type Rate = { months?: number[]; month?: number; day?: number; total?: number; long?: boolean; season?: boolean; booked?: boolean };
export type Listing = {
  key: string; id: number; kind: 'rent' | 'sale'; town: string; cx?: string | null; cxl?: string | null; date: string; beds: number | null; house?: boolean;
  f: string[]; sea_m?: number; area?: number; price?: number; from_month?: number; from_day?: number; season_price?: number; rates?: Rate[];
  near?: Record<string, number | string | null>;
};

const LONG = [10, 11, 12, 1, 2, 3, 4];
const QUIET = ['sveti-vlas', 'ravda', 'nessebar', 'aheloy', 'pomorie'];
const YEAR_TOWNS = ['nessebar', 'sveti-vlas', 'ravda', 'pomorie', 'burgas'];
const WHEN_MONTH: Record<string, string> = { summer: '7', winter: 'long', year: 'long', euro: '5' };

const T: Record<Lang, Record<string, string>> = {
  en: { 'sveti-vlas': 'Sveti Vlas', 'sunny-beach': 'Sunny Beach', nessebar: 'Nessebar', ravda: 'Ravda', pomorie: 'Pomorie', aheloy: 'Aheloy', burgas: 'Burgas',
    studio: 'Studio', bed: '{n}-bedroom', house: 'House', month: '/ month', night: '/ night', from: 'from', onReq: 'price on request', season: 'whole season',
    sea: '{m} to the sea', school: 'school {m}', kinder: 'kindergarten {m}', shop: 'shop {m}', pool: 'pool', view: 'sea view', parking: 'parking', quiet: 'quiet town', year: 'lives all year', budget: 'in budget', space: '{n} bedrooms', pets: 'pets OK',
    over: '{p} over budget', no: 'no {f}', notFor: 'not listed for that period', m: 'm', km: 'km' },
  uk: { 'sveti-vlas': 'Святий Влас', 'sunny-beach': 'Сонячний Берег', nessebar: 'Несебр', ravda: 'Равда', pomorie: 'Поморіє', aheloy: 'Ахелой', burgas: 'Бургас',
    studio: 'Студія', bed: '{n} спальн.', house: 'Будинок', month: '/ міс', night: '/ доба', from: 'від', onReq: 'ціна на запит', season: 'весь сезон',
    sea: '{m} до моря', school: 'школа {m}', kinder: 'садок {m}', shop: 'магазин {m}', pool: 'басейн', view: 'вид на море', parking: 'паркінг', quiet: 'тихе місто', year: 'живе цілий рік', budget: 'у бюджеті', space: '{n} спальні', pets: 'можна з тваринами',
    over: '+{p} понад бюджет', no: 'без «{f}»', notFor: 'немає ціни на цей період', m: 'м', km: 'км' },
  ru: { 'sveti-vlas': 'Свети Влас', 'sunny-beach': 'Солнечный Берег', nessebar: 'Несебр', ravda: 'Равда', pomorie: 'Поморие', aheloy: 'Ахелой', burgas: 'Бургас',
    studio: 'Студия', bed: '{n} спальн.', house: 'Дом', month: '/ мес', night: '/ сутки', from: 'от', onReq: 'цена по запросу', season: 'весь сезон',
    sea: '{m} до моря', school: 'школа {m}', kinder: 'садик {m}', shop: 'магазин {m}', pool: 'бассейн', view: 'вид на море', parking: 'парковка', quiet: 'тихий город', year: 'живёт круглый год', budget: 'в бюджете', space: '{n} спальни', pets: 'можно с животными',
    over: '+{p} сверх бюджета', no: 'без «{f}»', notFor: 'нет цены на этот период', m: 'м', km: 'км' },
  bg: { 'sveti-vlas': 'Свети Влас', 'sunny-beach': 'Слънчев бряг', nessebar: 'Несебър', ravda: 'Равда', pomorie: 'Поморие', aheloy: 'Ахелой', burgas: 'Бургас',
    studio: 'Студио', bed: '{n} сп.', house: 'Къща', month: '/ мес', night: '/ нощ', from: 'от', onReq: 'цена при запитване', season: 'целия сезон',
    sea: '{m} до морето', school: 'училище {m}', kinder: 'детска градина {m}', shop: 'магазин {m}', pool: 'басейн', view: 'морска гледка', parking: 'паркинг', quiet: 'тих град', year: 'живее целогодишно', budget: 'в бюджета', space: '{n} спални', pets: 'с домашни любимци',
    over: '+{p} над бюджета', no: 'без „{f}“', notFor: 'няма цена за този период', m: 'м', km: 'км' },
};
export const tr = (lang: Lang, k: string, v: Record<string, string | number> = {}) =>
  Object.entries(v).reduce((s, [a, b]) => s.split(`{${a}}`).join(String(b)), (T[lang] || T.en)[k] ?? T.en[k] ?? k);
export const pickLang = (c?: string): Lang => { c = (c || '').toLowerCase(); return c.startsWith('uk') ? 'uk' : c.startsWith('ru') ? 'ru' : c.startsWith('bg') ? 'bg' : 'en'; };

const eur = (n: number) => '€' + Math.round(n).toLocaleString('en-GB');
function dist(lang: Lang, km?: number | string | null) {
  if (km == null || typeof km !== 'number') return '—';
  if (km < 1) return `${50 * Math.max(1, Math.round(km * 20))} ${tr(lang, 'm')}`;
  return `${km < 10 ? Math.round(km * 10) / 10 : Math.round(km)} ${tr(lang, 'km')}`;
}
function rateFor(L: Listing, month: string): Rate | null {
  if (L.kind !== 'rent' || !L.rates) return null;
  if (month === 'long') return L.rates.find(r => !r.booked && (r.long || (r.months || []).some(m => LONG.includes(m)) || (!(r.months || []).length && !r.season && r.month))) || null;
  return L.rates.find(r => !r.booked && (r.months || []).includes(+month)) || null;
}
function monthly(L: Listing, month: string) {
  if (L.kind === 'sale') return L.price ?? null;
  const r = month ? rateFor(L, month) : null;
  if (r) return r.month ?? (r.day ? r.day * 30 : null);
  return L.from_month ?? (L.from_day ? L.from_day * 30 : L.season_price ? Math.round(L.season_price / 4) : null);
}
export function typeLabel(lang: Lang, L: Listing) {
  if (L.house) return tr(lang, 'house');
  if (L.beds === 0) return tr(lang, 'studio');
  return L.beds ? tr(lang, 'bed', { n: L.beds }) : '';
}
export function priceLabel(lang: Lang, L: Listing, month = '') {
  if (L.kind === 'sale') return L.price ? eur(L.price) : tr(lang, 'onReq');
  const r = month ? rateFor(L, month) : null;
  if (r?.month) return `${eur(r.month)} ${tr(lang, 'month')}`;
  if (r?.day) return `${eur(r.day)} ${tr(lang, 'night')}`;
  if (L.from_month) return `${tr(lang, 'from')} ${eur(L.from_month)} ${tr(lang, 'month')}`;
  if (L.from_day) return `${tr(lang, 'from')} ${eur(L.from_day)} ${tr(lang, 'night')}`;
  if (L.season_price) return `${eur(L.season_price)} ${tr(lang, 'season')}`;
  return tr(lang, 'onReq');
}
export const townLabel = (lang: Lang, k: string) => tr(lang, k);
export const briefMonth = (b: Brief) => (b.kind === 'rent' ? WHEN_MONTH[b.when] || '' : '');

/** why = what fits, miss = what the person asked for and this home doesn't have (named, so near matches can be offered honestly). */
export function score(b: Brief, L: Listing, lang: Lang) {
  const month = briefMonth(b), wants = new Set(b.matters);
  if (b.who.includes('kids')) wants.add('kids-area');
  if (b.who.includes('friends') || b.who.includes('kids')) wants.add('space');
  if (b.who.includes('remote') || b.when === 'winter' || b.when === 'year') wants.add('yearround');
  let got = 0, total = 0; const why: string[] = [], miss: string[] = [];
  const add = (w: number, ok: boolean, label: string | null, missLabel: string | null, hard = true) => {
    total += w; if (ok) { got += w; if (label) why.push(label); } else if (hard && missLabel) miss.push(missLabel);
  };
  const p = monthly(L, month);
  add(3, p != null && (!b.budget || p <= b.budget), p != null && p <= b.budget ? tr(lang, 'budget') : null, p == null ? tr(lang, 'onReq') : tr(lang, 'over', { p: eur(p - b.budget) }));
  if (month) add(2, !!rateFor(L, month), null, tr(lang, 'notFor'));
  const n = L.near || {};
  const num = (k: string) => (typeof n[k] === 'number' ? (n[k] as number) : undefined);
  if (wants.has('walkSea')) add(2, L.sea_m != null && L.sea_m <= 400, L.sea_m != null && L.sea_m <= 400 ? tr(lang, 'sea', { m: dist(lang, L.sea_m / 1000) }) : null, L.sea_m != null ? tr(lang, 'sea', { m: dist(lang, L.sea_m / 1000) }) : null);
  if (wants.has('school')) add(2, (num('school') ?? 99) <= 1.2, tr(lang, 'school', { m: dist(lang, num('school')) }), tr(lang, 'school', { m: dist(lang, num('school')) }));
  if (wants.has('kinder')) add(2, (num('kindergarten') ?? 99) <= 1, tr(lang, 'kinder', { m: dist(lang, num('kindergarten')) }), tr(lang, 'kinder', { m: dist(lang, num('kindergarten')) }));
  if (wants.has('shop')) add(1, (num('supermarket') ?? 99) <= .5, tr(lang, 'shop', { m: dist(lang, num('supermarket')) }), tr(lang, 'shop', { m: dist(lang, num('supermarket')) }));
  if (wants.has('pool')) add(1.5, L.f.includes('pool'), tr(lang, 'pool'), tr(lang, 'no', { f: tr(lang, 'pool') }));
  if (wants.has('view')) add(1.5, L.f.includes('seaview'), tr(lang, 'view'), tr(lang, 'no', { f: tr(lang, 'view') }));
  if (wants.has('quiet')) add(1, QUIET.includes(L.town), tr(lang, 'quiet'), tr(lang, L.town));
  if (wants.has('yearround')) add(1, YEAR_TOWNS.includes(L.town) || L.f.includes('yearround'), tr(lang, 'year'), tr(lang, L.town), b.matters.includes('yearround'));
  if (wants.has('parking')) add(1, L.f.includes('parking'), tr(lang, 'parking'), tr(lang, 'no', { f: tr(lang, 'parking') }));
  if (wants.has('space')) add(1.5, (L.beds || 0) >= 2, (L.beds || 0) >= 2 ? tr(lang, 'space', { n: L.beds || 0 }) : null, typeLabel(lang, L), b.matters.includes('space'));
  if (wants.has('kids-area')) add(.5, L.f.includes('kids'), null, null, false);
  if (b.who.includes('pet')) add(1, L.f.includes('pets'), tr(lang, 'pets'), null, false);
  return { score: Math.round((got / total) * 100), why: why.slice(0, 4), miss, over: p != null && b.budget ? p / b.budget : 9 };
}

/** Exact = nothing missing; near = at most 2 differences and not more than 25% over budget. */
export function classify(b: Brief, L: Listing, lang: Lang) {
  if (L.kind !== b.kind || (b.town && L.town !== b.town)) return null;
  const s = score(b, L, lang);
  if (!s.miss.length) return { ...s, kind: 'exact' as const };
  if (s.miss.length <= 2 && s.over <= 1.25) return { ...s, kind: 'near' as const };
  return null;
}
