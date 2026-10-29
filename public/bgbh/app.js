/* BG Beach Homes v1 — buildless single-page app. Data: /bgbh/data/listings.json (built from the Telegram channels). */
(() => {
  'use strict';
  const BASE = '/projects/bg-beach-homes';
  const IMG = '/bgbh/p/';
  const TG_TEAM = 'https://t.me/bgbeachhomes';
  const TG_BOT = 'https://t.me/FairBrokerBot';
  const PHONE = '+380939393940';
  const CH = { rent: 'https://t.me/bgbeachhomes_rent', sale: 'https://t.me/bgbeachhomes_sale' };
  const TOWNS = ['sveti-vlas', 'sunny-beach', 'nessebar', 'ravda', 'aheloy', 'pomorie', 'burgas'];
  const CENTRE = { 'sveti-vlas': [42.7135, 27.7590], 'sunny-beach': [42.6950, 27.7110], nessebar: [42.6600, 27.7230], ravda: [42.6425, 27.6780], aheloy: [42.6490, 27.6480], pomorie: [42.5560, 27.6420], burgas: [42.5048, 27.4626] };
  const ARENA = [42.5226, 27.4520], AIRPORT = [42.5696, 27.5152];
  const COVER = { 'sveti-vlas': 'r576', 'sunny-beach': 'r343', nessebar: 's733', ravda: 'r578' };
  const QUIET = ['sveti-vlas', 'ravda', 'nessebar', 'aheloy', 'pomorie'];
  const YEAR_TOWNS = ['nessebar', 'sveti-vlas', 'ravda', 'pomorie', 'burgas'];
  const EURO = [{ d: 11, k: 'euro.semi1' }, { d: 13, k: 'euro.semi2' }, { d: 15, k: 'euro.final' }];
  const PAGE = 24;
  const NOW = new Date();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const main = $('#main');
  const store = {
    get(k, d) { try { const v = localStorage.getItem('bgbh.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('bgbh.' + k, JSON.stringify(v)); } catch { /* private mode */ } }
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- language ---------- */
  let lang = store.get('lang', null) || ((navigator.language || 'en').startsWith('uk') ? 'uk' : (navigator.language || '').startsWith('ru') ? 'ru' : 'en');
  const D = () => window.BG_I18N[lang] || window.BG_I18N.en;
  function t(k, v) {
    let s = D()[k] ?? window.BG_I18N.en[k] ?? k;
    if (v) for (const [a, b] of Object.entries(v)) s = s.replaceAll('{' + a + '}', b);
    return s;
  }
  const locale = () => ({ en: 'en-GB', uk: 'uk-UA', ru: 'ru-RU' }[lang]);
  const eur = n => new Intl.NumberFormat(locale(), { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  const num = n => new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 }).format(n);
  function dist(km) {
    if (km == null) return '—';
    const m = lang === 'en' ? ['m', 'km'] : ['м', 'км'];
    if (km < 1) return (km < 0.1 ? 50 * Math.max(1, Math.round(km * 20)) : 50 * Math.round(km * 20)) + ' ' + m[0];
    return num(km < 10 ? Math.round(km * 10) / 10 : Math.round(km)) + ' ' + m[1];
  }
  const seaTxt = L => L.sea_m != null ? dist(L.sea_m / 1000) : null;
  const monthYear = iso => { const d = new Date(iso); return D().mon[d.getMonth()] + ' ' + d.getFullYear(); };
  function age(iso) { const d = new Date(iso); return (NOW.getFullYear() - d.getFullYear()) * 12 + NOW.getMonth() - d.getMonth(); }
  const freshness = L => { const a = age(L.date); return a <= 6 ? 'fresh' : a <= 12 ? 'old' : 'stale'; };
  const townName = k => t('town.' + k);
  const hasCyr = s => /[а-яё]/i.test(s || '');
  const cxName = L => !L.cx ? '' : (lang === 'en' && hasCyr(L.cx) ? L.cxl : L.cx);
  function typeLabel(L) {
    if (L.house) return t('card.house');
    if (L.beds === 0) return t('card.studio');
    if (L.beds) return t('card.bed', { n: L.beds });
    return '';
  }
  const slug = L => [L.town, L.beds === 0 ? 'studio' : L.beds ? L.beds + 'bed' : '', (L.cxl || '').toLowerCase()].filter(Boolean).join('-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const urlOf = L => `${BASE}/${L.kind === 'rent' ? 'rent' : 'buy'}/${L.key}-${slug(L)}`;
  const img = (L, i = 0) => `${IMG}${L.key}/${i}.webp`;
  const card = L => `${IMG}${L.key}/card.webp`;
  function km(a, b) {
    const R = Math.PI / 180, dLa = (b[0] - a[0]) * R, dLo = (b[1] - a[1]) * R;
    const h = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * R) * Math.cos(b[0] * R) * Math.sin(dLo / 2) ** 2;
    return 12742 * Math.asin(Math.sqrt(h));
  }

  /* ---------- prices ---------- */
  const LONG = [10, 11, 12, 1, 2, 3, 4];
  function rateFor(L, month) {
    if (L.kind !== 'rent' || !L.rates) return null;
    if (month === 'long') return L.rates.find(r => !r.booked && (r.long || (r.months || []).some(m => LONG.includes(m)) || (!(r.months || []).length && !r.season && r.month))) || null;
    return L.rates.find(r => !r.booked && (r.months || []).includes(+month)) || null;
  }
  function monthly(L, month) { // monthly equivalent, for budgets and sorting
    if (L.kind === 'sale') return L.price ?? null;
    const r = month ? rateFor(L, month) : null;
    if (r) return r.month ?? (r.day ? r.day * 30 : null);
    return L.from_month ?? (L.from_day ? L.from_day * 30 : L.season_price ? Math.round(L.season_price / 4) : null);
  }
  function priceHTML(L, month) {
    if (L.kind === 'sale') return L.price ? eur(L.price) : t('card.onReq');
    const r = month ? rateFor(L, month) : null;
    if (r && r.month) return `${eur(r.month)} <small>${t('card.month')}</small>`;
    if (r && r.day) return `${eur(r.day)} <small>${t('card.night')}</small>`;
    if (L.from_month) return `<small>${t('card.from')}</small> ${eur(L.from_month)} <small>${t('card.month')}</small>`;
    if (L.from_day) return `<small>${t('card.from')}</small> ${eur(L.from_day)} <small>${t('card.night')}</small>`;
    if (L.season_price) return `${eur(L.season_price)} <small>${t('card.season')}</small>`;
    return t('card.onReq');
  }
  const priceText = (L, m) => priceHTML(L, m).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

  /* ---------- state ---------- */
  let DATA = [], BYKEY = new Map(), COAST = null;
  let saved = new Set(store.get('saved', []));
  const isSaved = k => saved.has(k);
  function toggleSave(k) {
    if (saved.has(k)) { saved.delete(k); toast(t('toast.removed')); } else { saved.add(k); toast(t('toast.saved')); }
    store.set('saved', [...saved]);
    paintSaved();
  }
  function paintSaved() {
    $$('.saved-count').forEach(b => { b.textContent = saved.size; b.hidden = !saved.size; });
    $$('[data-save]').forEach(b => { const on = isSaved(b.dataset.save); b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? t('card.saved') : t('card.save')); });
  }
  let toastT;
  function toast(msg) {
    $('.toast')?.remove(); clearTimeout(toastT);
    const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = msg;
    document.body.append(el); toastT = setTimeout(() => el.remove(), 2400);
  }

  /* ---------- viewport lock (in-app browsers) ---------- */
  let lastW = 0;
  function lockVh(force) {
    if (!force && innerWidth === lastW) return;
    lastW = innerWidth;
    document.documentElement.style.setProperty('--vh', (innerHeight * 0.01) + 'px');
  }
  lockVh(true);
  addEventListener('resize', () => lockVh(false));
  addEventListener('orientationchange', () => setTimeout(() => lockVh(true), 250));

  /* ---------- icons ---------- */
  const I = {
    wave: '<svg viewBox="0 0 24 24"><path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><circle cx="12" cy="7" r="3"/></svg>',
    bed: '<svg viewBox="0 0 24 24"><path d="M3 18v-7h18v7M3 14h18M6 11V8h5v3"/></svg>',
    area: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4zM4 9h5V4"/></svg>',
    school: '<svg viewBox="0 0 24 24"><path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5"/></svg>',
    kindergarten: '<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="2.5"/><path d="M7 21v-5l-2-4 7-2 7 2-2 4v5M9.5 21v-4h5v4"/></svg>',
    supermarket: '<svg viewBox="0 0 24 24"><path d="M3 4h2l2.4 11h11l2-8H6.3"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></svg>',
    pharmacy: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/></svg>',
    medical: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10zM9 11h6M12 8v6"/></svg>',
    airport: '<svg viewBox="0 0 24 24"><path d="M10.5 3.5c0-1 3-1 3 0V9l7 4v2l-7-2v4l2 1.5V20l-3.5-1-3.5 1v-1.5l2-1.5v-4l-7 2v-2l7-4z"/></svg>',
    arena: '<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z"/></svg>',
    filter: '<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    tg: '<svg viewBox="0 0 24 24"><path d="M21.5 4.3 2.9 11.4c-1.3.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.5zM8.9 14.1l9.3-5.9c.4-.3.8-.1.5.2l-7.7 7-.3 3.2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.6 3.5 9 3l2 4.6-1.9 1.5a11 11 0 0 0 5.8 5.8l1.5-1.9L21 15l-.5 2.4c-.2 1-1.1 1.7-2.1 1.6C10.6 18.5 5.5 13.4 5 5.6c-.1-1 .6-1.9 1.6-2.1z"/></svg>'
  };

  /* ---------- router ---------- */
  const routes = [
    [/^\/?$/, home],
    [/^\/rent\/?$/, () => results('rent')],
    [/^\/buy\/?$/, () => results('sale')],
    [/^\/(?:rent|buy)\/([rs]\d+)[^/]*\/?$/, m => listing(m[1])],
    [/^\/match\/?$/, matcher],
    [/^\/saved\/?$/, savedPage],
    [/^\/eurovision-2027\/?$/, euroPage],
    [/^\/journal\/?$/, journalPage],
    [/^\/journal\/([\w-]+)\/?$/, m => article(m[1])]
  ];
  let cleanup = [];
  function onLeave(fn) { cleanup.push(fn); }
  function render(restore) {
    cleanup.forEach(f => { try { f(); } catch { /* ignore */ } }); cleanup = [];
    document.body.classList.remove('has-mcta');
    $('#top').classList.remove('on-film');
    const path = location.pathname.replace(BASE, '') || '/';
    let done = false;
    for (const [re, fn] of routes) {
      const m = path.match(re);
      if (m) { fn(m); done = true; break; }
    }
    if (!done) notFound();
    paintNav(); paintSaved(); applyI18n(); reveal();
    if (restore != null) requestAnimationFrame(() => scrollTo(0, restore));
    else if (!location.hash) scrollTo(0, 0);
  }
  function go(href, replace) {
    const st = { y: scrollY };
    history.replaceState({ ...(history.state || {}), y: scrollY }, '');
    history[replace ? 'replaceState' : 'pushState'](null, '', href);
    render();
    return st;
  }
  addEventListener('popstate', e => render(e.state?.y ?? 0));
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || !u.pathname.startsWith(BASE)) return;
    e.preventDefault();
    go(u.pathname + u.search);
  });
  function paintNav() {
    const p = location.pathname;
    $$('.nav a, .tabbar a').forEach(a => {
      const h = new URL(a.href).pathname;
      const on = h === p || (h !== BASE && p.startsWith(h + '/')) || (h.endsWith('/rent') && p.startsWith(BASE + '/rent')) || (h.endsWith('/buy') && p.startsWith(BASE + '/buy'));
      a.toggleAttribute('aria-current', false);
      if (on) a.setAttribute('aria-current', 'page');
    });
  }
  function applyI18n() {
    document.documentElement.lang = lang === 'uk' ? 'uk' : lang;
    $$('[data-i]').forEach(el => { el.textContent = t(el.dataset.i); });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('lang', lang); footer(); render(scrollY); }));
  addEventListener('scroll', () => $('#top').classList.toggle('scrolled', scrollY > 8), { passive: true });

  let io;
  function reveal() {
    io?.disconnect();
    if (reduced || !('IntersectionObserver' in window)) { $$('.reveal').forEach(e => e.classList.add('in')); return; }
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(e => io.observe(e));
  }

  /* ---------- cards ---------- */
  function cardHTML(L, o = {}) {
    const f = freshness(L);
    const meta = [];
    if (L.sea_m != null) meta.push(`<span>${I.wave}${esc(t('card.sea', { m: seaTxt(L) }))}</span>`);
    if (L.area) meta.push(`<span>${I.area}${num(L.area)} m²</span>`);
    if (L.near?.school != null && o.school) meta.push(`<span>${I.school}${esc(t('card.school', { m: dist(L.near.school) }))}</span>`);
    const badges = [];
    if (L.f.includes('pool')) badges.push(`<span class="tag">${t('feat.pool')}</span>`);
    if (L.f.includes('seaview')) badges.push(`<span class="tag">${t('feat.seaview')}</span>`);
    const why = o.why ? `<div class="why">${o.why.map(w => `<span class="tag grey">${esc(w)}</span>`).join('')}</div>` : '';
    return `<a class="card" href="${urlOf(L)}">
      <div class="card-media">
        <img src="${card(L)}" alt="${esc(typeLabel(L) + ', ' + townName(L.town))}" loading="lazy" decoding="async" width="640" height="480">
        <div class="card-badges">${badges.join('')}</div>
        <span class="card-count">${t('card.photos', { n: L.n })}</span>
        ${o.score != null ? `<span class="match-score">${t('m.fit', { n: o.score })}</span>` : ''}
      </div>
      <div class="card-body">
        <div class="card-price">${priceHTML(L, o.month)}</div>
        <div class="card-title">${esc([typeLabel(L), townName(L.town)].filter(Boolean).join(' · '))}</div>
        ${cxName(L) ? `<div class="tiny">${esc(cxName(L))}</div>` : ''}
        <div class="card-meta">${meta.join('')}</div>
        ${why}
        <div class="card-foot"><span><i class="fresh-dot ${f === 'fresh' ? '' : f}"></i>${f === 'fresh' ? t('fresh.label') : esc(t('fresh.old', { d: monthYear(L.date) }))}</span><span>ID ${L.id}</span></div>
      </div>
    </a>`;
  }
  // the save button sits outside the <a> so it never triggers navigation
  function cardWrap(L, o) {
    return `<div class="reveal" style="position:relative">${cardHTML(L, o)}<button type="button" class="card-save" data-save="${L.key}" aria-pressed="${isSaved(L.key)}" aria-label="${t('card.save')}">${I.heart}</button></div>`;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-save]');
    if (b) { e.preventDefault(); toggleSave(b.dataset.save); }
    if (e.target.closest('[data-open-chat]')) { e.preventDefault(); chatSheet(); }
  });

  /* ---------- home ---------- */
  function home() {
    document.title = 'BG Beach Homes — rent or buy on the Bulgarian Black Sea coast';
    const rent = DATA.filter(l => l.kind === 'rent'), sale = DATA.filter(l => l.kind === 'sale');
    const last = DATA.reduce((a, l) => l.date > a ? l.date : a, '');
    const fresh = rent.filter(l => freshness(l) === 'fresh').sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
    const towns = ['sveti-vlas', 'sunny-beach', 'nessebar', 'ravda'];
    main.innerHTML = `
    <section class="hero"><div class="wrap hero-grid">
      <div>
        <p class="eyebrow">Sveti Vlas · Sunny Beach · Nessebar · Ravda</p>
        <h1 style="margin-top:14px">${t('hero.h1')}</h1>
        <p class="lede">${esc(t('hero.lede'))}</p>
        <form class="ask" id="ask">
          <p class="ask-line">${esc(t('ask.i'))} <span class="pick"><select name="kind" aria-label="rent or buy"><option value="rent">${esc(t('ask.rent'))}</option><option value="sale">${esc(t('ask.buy'))}</option></select></span>
          ${esc(t('ask.in'))} <span class="pick"><select name="town" aria-label="${esc(t('f.town'))}"><option value="">${esc(t('ask.any'))}</option>${towns.map(k => `<option value="${k}">${esc(townName(k))}</option>`).join('')}</select></span>
          ${esc(t('ask.with'))} <span class="pick"><select name="beds" aria-label="${esc(t('f.beds'))}"><option value="">${esc(t('ask.anyBeds'))}</option><option value="0">${esc(t('ask.studio'))}</option><option value="1">${esc(t('ask.b1'))}</option><option value="2">${esc(t('ask.b2'))}</option><option value="3">${esc(t('ask.b3'))}</option></select></span><span class="ask-when">
          ${esc(t('ask.when'))} <span class="pick"><select name="month" aria-label="${esc(t('f.month'))}"><option value="">${esc(t('ask.anyTime'))}</option><option value="long">${esc(t('ask.longterm'))}</option><option value="7">${esc(t('ask.summer'))}</option><option value="5">${esc(t('ask.mayEuro'))}</option></select></span></span></p>
          <div class="ask-go"><button class="btn btn-sun" type="submit" id="ask-btn"></button><a class="btn btn-ghost" href="${BASE}/match">${esc(t('ask.match'))}</a></div>
          <p class="tiny" style="margin-top:12px"><span class="pulse"></span>${esc(t('live', { d: new Date(last).toLocaleDateString(locale(), { day: 'numeric', month: 'long', year: 'numeric' }) }))}</p>
        </form>
      </div>
      <div class="coast reveal" id="coast" aria-label="Map of the coast"></div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="sec-head reveal"><div><h2>${esc(t('fresh.h'))}</h2><p class="muted">${esc(t('fresh.p'))}</p></div><a class="btn btn-line btn-sm" href="${BASE}/rent">${esc(t('fresh.all'))} →</a></div>
      <div class="rail">${fresh.map(l => cardWrap(l)).join('')}</div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="sec-head reveal"><div><h2>${esc(t('how.h'))}</h2><p class="muted">${esc(t('how.p'))}</p></div></div>
      <div class="steps">${[1, 2, 3].map(i => `<div class="step reveal"><b>${i}</b><h3>${esc(t('how.' + i + 'h'))}</h3><p>${esc(t('how.' + i + 'p'))}</p></div>`).join('')}</div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="sec-head reveal"><div><h2>${esc(t('towns.h'))}</h2><p class="muted">${esc(t('towns.p'))}</p></div></div>
      <div class="towns">${towns.map(k => {
        const r = rent.filter(l => l.town === k), s = sale.filter(l => l.town === k);
        const lm = r.map(l => monthly(l, 'long')).filter(Boolean).sort((a, b) => a - b);
        return `<a class="town-card reveal" href="${BASE}/${r.length ? 'rent' : 'buy'}?town=${k}">
          <img src="${IMG}${COVER[k]}/0.webp" alt="" loading="lazy">
          <h3>${esc(townName(k))}</h3><p>${esc(t('tp.' + k))}</p>
          <div class="tc-stats">${r.length ? `<span>${t('tc.rent', { n: r.length })}</span>` : ''}${s.length ? `<span>${t('tc.buy', { n: s.length })}</span>` : ''}${lm.length ? `<span>${esc(t('tc.from', { p: lm[0] }))}</span>` : ''}</div>
        </a>`;
      }).join('')}</div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="band band-match reveal">
        <div><p class="eyebrow">${esc(t('matchb.eyebrow'))}</p><h2 style="margin-top:12px">${esc(t('matchb.h'))}</h2><p style="margin-top:14px;opacity:.85">${esc(t('matchb.p'))}</p></div>
        <div><a class="btn btn-sun" href="${BASE}/match">${esc(t('matchb.cta'))} →</a></div>
      </div>
    </div></section>

    <section class="section"><div class="wrap">${euroBand()}</div></section>

    <section class="section"><div class="wrap">
      <div class="sec-head reveal"><div><h2>${esc(t('journal.h'))}</h2></div><a class="btn btn-line btn-sm" href="${BASE}/journal">${esc(t('journal.all'))} →</a></div>
      <div class="posts">${window.BG_JOURNAL.slice(0, 3).map(postCard).join('')}</div>
    </div></section>`;

    const f = $('#ask'), btn = $('#ask-btn');
    const count = () => {
      const q = Object.fromEntries(new FormData(f));
      $('.ask-when', f).hidden = q.kind === 'sale';
      const n = filterList({ kind: q.kind, town: q.town ? [q.town] : [], beds: q.beds !== '' ? [q.beds] : [], month: q.kind === 'rent' ? q.month : '' }).length;
      btn.textContent = t('ask.show', { n });
      return q;
    };
    f.addEventListener('change', count); count();
    f.addEventListener('submit', e => {
      e.preventDefault(); const q = count();
      const p = new URLSearchParams();
      if (q.town) p.set('town', q.town); if (q.beds !== '') p.set('beds', q.beds); if (q.kind === 'rent' && q.month) p.set('month', q.month);
      go(`${BASE}/${q.kind === 'rent' ? 'rent' : 'buy'}${p.toString() ? '?' + p : ''}`);
    });
    drawCoast($('#coast'));
  }

  function euroBand() {
    return `<div class="band band-euro reveal">
      <div><p class="eyebrow">${esc(t('euro.eyebrow'))}</p><h2 style="margin-top:12px">${esc(t('euro.h'))}</h2><p style="margin-top:14px">${esc(t('euro.p'))}</p>
      <a class="btn btn-sun" style="margin-top:22px;background:#fff;color:#3B1E8C" href="${BASE}/eurovision-2027">${esc(t('euro.cta'))} →</a></div>
      <div class="dates">${EURO.map(e => `<div class="date"><b>${e.d}</b><span>${esc(t('euro.may'))} · ${esc(t(e.k))}</span></div>`).join('')}</div>
    </div>`;
  }

  /* ---------- coastline ---------- */
  function drawCoast(el) {
    if (!el || !COAST) return;
    const P = (la, lo) => [(lo - COAST.W) * COAST.k * COAST.s, (COAST.N - la) * COAST.s];
    const VB = [40, 150, 660, 600];
    el.style.aspectRatio = VB[2] + ' / ' + VB[3];
    const counts = {};
    DATA.forEach(l => { counts[l.town] = (counts[l.town] || 0) + 1; });
    const label = { 'sveti-vlas': ['end', -18, -10], 'sunny-beach': ['end', -18, 6], nessebar: ['start', 18, 6], ravda: ['end', -18, 18], pomorie: ['start', 16, 6], aheloy: ['end', -14, -12], burgas: ['start', 16, -10] };
    const towns = ['sveti-vlas', 'sunny-beach', 'nessebar', 'ravda', 'pomorie', 'burgas'].map(k => {
      const [x, y] = P(...CENTRE[k]); const n = counts[k] || 0; const [a, dx, dy] = label[k];
      const link = n ? `${BASE}/${DATA.some(l => l.town === k && l.kind === 'rent') ? 'rent' : 'buy'}?town=${k}` : null;
      const g = `<g class="town${n ? '' : ' dim'}" ${link ? `tabindex="0" role="link" data-href="${link}"` : ''} aria-label="${esc(townName(k))}">
        <circle class="halo" cx="${x}" cy="${y}" r="${n ? 10 + Math.sqrt(n) * 3.2 : 0}"/>
        <circle class="dot" cx="${x}" cy="${y}" r="7"/>
        <text x="${x + dx}" y="${y + dy}" text-anchor="${a}">${esc(townName(k))}</text>
        ${n ? ` <text class="cnt" x="${x + dx}" y="${y + dy + 21}" text-anchor="${a}">${esc(t('coast.homes', { n }))}</text>` : ''}
      </g>`;
      return g;
    }).join('');
    const [ax, ay] = P(...ARENA), [px, py] = P(...AIRPORT);
    el.innerHTML = `<svg viewBox="${VB.join(' ')}" role="img" aria-label="Burgas Bay">
      <defs><linearGradient id="seaG" x1="0" x2="1" y1="0" y2="0"><stop offset=".35" stop-color="#E1EEEC" stop-opacity="0"/><stop offset="1" stop-color="#CFE6E3"/></linearGradient></defs>
      <rect x="${VB[0]}" y="${VB[1]}" width="${VB[2]}" height="${VB[3]}" fill="url(#seaG)"/>
      ${[18, 34, 52].map((d, i) => `<g transform="translate(${d},${d * .12})">${COAST.d.slice(0, 1).map(p => `<path class="ripple" d="${p}" style="opacity:${.16 - i * .045}"/>`).join('')}</g>`).join('')}
      ${COAST.d.map((p, i) => `<path class="shore${i ? ' isle' : ''}" d="${p}"/>`).join('')}
      <g class="poi euro"><rect class="mk" x="${ax - 6}" y="${ay - 6}" width="12" height="12" rx="3" transform="rotate(45 ${ax} ${ay})"/><text x="${ax + 14}" y="${ay + 26}">${esc(t('coast.arena'))}</text></g>
      <g class="poi"><path class="mk" transform="translate(${px - 9} ${py - 9}) scale(.75)" d="${'M10.5 3.5c0-1 3-1 3 0V9l7 4v2l-7-2v4l2 1.5V20l-3.5-1-3.5 1v-1.5l2-1.5v-4l-7 2v-2l7-4z'}"/><text x="${px + 12}" y="${py + 4}">BOJ</text></g>
      ${towns}
    </svg><p class="coast-note">${esc(t('coast.note'))}</p>`;
    $$('.town[data-href]', el).forEach(g => {
      const nav = () => go(g.dataset.href);
      g.addEventListener('click', nav);
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav(); } });
    });
    if (!reduced) {
      $$('.shore', el).forEach(p => { const len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; p.getBoundingClientRect(); p.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(.4,.1,.2,1)'; requestAnimationFrame(() => { p.style.strokeDashoffset = 0; }); });
    }
  }

  /* ---------- filtering ---------- */
  const NEAR = { school: ['school', 1], kinder: ['kindergarten', 1], shop: ['supermarket', .5], pharmacy: ['pharmacy', .5] };
  function readQuery(kind) {
    const p = new URLSearchParams(location.search);
    const list = k => (p.get(k) || '').split(',').filter(Boolean);
    return { kind, town: list('town'), beds: list('beds'), min: +p.get('min') || 0, max: +p.get('max') || 0, sea: +p.get('sea') || 0, feat: list('f'), near: list('near'),
      month: p.get('month') || (p.get('long') ? 'long' : ''), older: p.get('older') === '1', sort: p.get('sort') || 'new', view: p.get('view') || 'list' };
  }
  function writeQuery(q) {
    const p = new URLSearchParams();
    if (q.town.length) p.set('town', q.town.join(','));
    if (q.beds.length) p.set('beds', q.beds.join(','));
    if (q.min) p.set('min', q.min); if (q.max) p.set('max', q.max); if (q.sea) p.set('sea', q.sea);
    if (q.feat.length) p.set('f', q.feat.join(',')); if (q.near.length) p.set('near', q.near.join(','));
    if (q.month) p.set('month', q.month); if (q.older) p.set('older', '1');
    if (q.sort !== 'new') p.set('sort', q.sort); if (q.view !== 'list') p.set('view', q.view);
    const s = p.toString();
    history.replaceState(history.state, '', location.pathname + (s ? '?' + s : ''));
  }
  function filterList(q) {
    return DATA.filter(L => {
      if (L.kind !== q.kind) return false;
      if (q.town?.length && !q.town.includes(L.town)) return false;
      if (q.beds?.length && !q.beds.some(b => b === '3' ? (L.beds >= 3 || L.house) : String(L.beds) === b)) return false;
      if (q.month && q.kind === 'rent' && !rateFor(L, q.month)) return false;
      const p = monthly(L, q.month);
      if (q.min && (p == null || p < q.min)) return false;
      if (q.max && (p == null || p > q.max)) return false;
      if (q.sea && (L.sea_m == null || L.sea_m > q.sea)) return false;
      for (const f of q.feat || []) {
        if (f === 'act16' ? !L.act16 : !L.f.includes(f)) return false;
      }
      for (const n of q.near || []) { const [k, lim] = NEAR[n] || []; if (!k || L.near?.[k] == null || L.near[k] > lim) return false; }
      return true;
    });
  }
  function sortList(list, q) {
    const s = q.sort, pr = L => monthly(L, q.month) ?? Infinity;
    const by = {
      new: (a, b) => b.date.localeCompare(a.date),
      low: (a, b) => pr(a) - pr(b),
      high: (a, b) => (monthly(b, q.month) ?? -1) - (monthly(a, q.month) ?? -1),
      sea: (a, b) => (a.sea_m ?? 9e9) - (b.sea_m ?? 9e9),
      school: (a, b) => (a.near?.school ?? 99) - (b.near?.school ?? 99)
    }[s] || ((a, b) => b.date.localeCompare(a.date));
    return list.slice().sort(by);
  }
  const activeCount = q => q.town.length + q.beds.length + (q.min ? 1 : 0) + (q.max ? 1 : 0) + (q.sea ? 1 : 0) + q.feat.length + q.near.length + (q.month ? 1 : 0) + (q.older ? 1 : 0);

  /* ---------- results ---------- */
  function results(kind) {
    const q = readQuery(kind);
    const isRent = kind === 'rent';
    document.title = (isRent ? t('rent.h') : t('buy.h')) + ' — BG Beach Homes';
    let shown = PAGE, map = null;
    main.innerHTML = `
      <div class="wrap"><div class="results-head"><div><h1>${esc(isRent ? t('rent.h') : t('buy.h'))}</h1><p class="muted" style="margin-top:8px">${esc(isRent ? t('rent.sub') : t('buy.sub'))}</p></div></div></div>
      <div class="filters"><div class="wrap"><div class="filters-row" id="frow"></div></div></div>
      <div class="wrap">
        <div class="res-bar"><span class="count" id="rcount"></span>
          <div style="display:flex;gap:10px;align-items:center">
            <select class="sort" id="rsort" aria-label="Sort">${['new', 'low', 'high', 'sea', 'school'].map(s => `<option value="${s}">${esc(t('sort.' + s))}</option>`).join('')}</select>
            <div class="view-toggle" role="group"><button type="button" data-view="list">${esc(t('res.list'))}</button><button type="button" data-view="map">${esc(t('res.map'))}</button></div>
          </div>
        </div>
        <div id="rbody"></div>
      </div>`;
    const frow = $('#frow');
    function chips() {
      const n = activeCount(q);
      const towns = [...new Set(DATA.filter(l => l.kind === kind).map(l => l.town))];
      frow.innerHTML = `<button type="button" class="chip filter-btn" id="fopen">${I.filter}${esc(t('f.filters'))}${n ? `<span class="badge">${n}</span>` : ''}</button><span class="sep"></span>
        ${isRent ? `<button type="button" class="chip" data-q="month" data-v="long" aria-pressed="${q.month === 'long'}">${esc(t('f.long'))}</button>` : ''}
        ${towns.map(k => `<button type="button" class="chip" data-q="town" data-v="${k}" aria-pressed="${q.town.includes(k)}">${esc(townName(k))} <span class="n">${DATA.filter(l => l.kind === kind && l.town === k).length}</span></button>`).join('')}
        <span class="sep"></span>
        ${['0', '1', '2', '3'].map(b => `<button type="button" class="chip" data-q="beds" data-v="${b}" aria-pressed="${q.beds.includes(b)}">${esc(b === '0' ? t('f.studio') : b === '3' ? '3+' : b)}${b !== '0' ? ' ' + (lang === 'en' ? 'bed' : lang === 'uk' ? 'сп.' : 'сп.') : ''}</button>`).join('')}
        <span class="sep"></span>
        <button type="button" class="chip" data-q="near" data-v="school" aria-pressed="${q.near.includes('school')}">${esc(t('f.school'))}</button>
        <button type="button" class="chip" data-q="f" data-v="pool" aria-pressed="${q.feat.includes('pool')}">${esc(t('feat.pool'))}</button>
        <button type="button" class="chip" data-q="f" data-v="seaview" aria-pressed="${q.feat.includes('seaview')}">${esc(t('feat.seaview'))}</button>`;
      $('#fopen').onclick = () => filterSheet(q, kind, apply);
      $$('[data-q]', frow).forEach(b => b.onclick = () => {
        const k = b.dataset.q, v = b.dataset.v;
        if (k === 'month') q.month = q.month === v ? '' : v;
        else { const arr = q[k === 'f' ? 'feat' : k]; const i = arr.indexOf(v); i < 0 ? arr.push(v) : arr.splice(i, 1); }
        apply();
      });
    }
    function body() {
      const list = sortList(filterList(q), q);
      $('#rcount').textContent = t('res.count', { n: list.length });
      $('#rsort').value = q.sort;
      $$('[data-view]').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === q.view));
      const rb = $('#rbody');
      if (map) { map.remove(); map = null; }
      if (!list.length) {
        rb.innerHTML = `<div class="empty"><h3>${esc(t('res.empty'))}</h3><p class="muted">${esc(t('res.emptyP'))}</p><div style="display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap"><button class="btn btn-line btn-sm" id="freset" type="button">${esc(t('f.reset'))}</button><button class="btn btn-sun btn-sm" type="button" data-open-chat>${esc(t('res.ask'))}</button></div></div>`;
        $('#freset').onclick = () => { Object.assign(q, readQuery(kind), { town: [], beds: [], min: 0, max: 0, sea: 0, feat: [], near: [], month: '', older: false }); apply(); };
        return;
      }
      if (q.view === 'map') {
        rb.innerHTML = `<div class="map-box" id="rmap"></div><p class="tiny" style="margin-top:8px">${esc(t('map.approx'))}</p>`;
        map = listMap($('#rmap'), list, q.month);
        return;
      }
      rb.innerHTML = `<div class="grid" id="rgrid">${list.slice(0, shown).map(l => cardWrap(l, { month: q.month, school: q.near.includes('school') || q.sort === 'school' })).join('')}</div>
        ${list.length > shown ? `<div class="load-more"><button class="btn btn-line" id="rmore" type="button">${esc(t('res.more'))} (${list.length - shown})</button></div>` : ''}`;
      $('#rmore')?.addEventListener('click', () => { shown += PAGE; body(); paintSaved(); reveal(); });
      paintSaved(); reveal();
    }
    function apply() { shown = PAGE; writeQuery(q); chips(); body(); }
    $('#rsort').onchange = e => { q.sort = e.target.value; apply(); };
    $$('[data-view]').forEach(b => b.onclick = () => { q.view = b.dataset.view; apply(); });
    chips(); body();
    onLeave(() => { if (map) map.remove(); });
  }

  function filterSheet(q, kind, apply) {
    const isRent = kind === 'rent';
    const draft = JSON.parse(JSON.stringify(q));
    const towns = [...new Set(DATA.filter(l => l.kind === kind).map(l => l.town))];
    const feats = isRent ? ['pool', 'seaview', 'parking', 'pets', 'kids', 'yearround', 'security', 'furnished'] : ['act16', 'pool', 'seaview', 'parking', 'kids', 'yearround', 'security', 'furnished'];
    const months = [5, 6, 7, 8, 9];
    const opt = (k, v, label, on) => `<button type="button" class="chip" data-k="${k}" data-v="${v}" aria-pressed="${on}">${esc(label)}</button>`;
    sheet(`<h2 id="sheet-title" style="font-size:26px">${esc(t('f.filters'))}</h2>
      ${isRent ? `<div class="fgroup"><h3>${esc(t('f.month'))}</h3><div class="opts">${opt('month', '', t('f.any'), !draft.month)}${opt('month', 'long', t('f.long'), draft.month === 'long')}${months.map(m => opt('month', String(m), D().mon[m - 1], draft.month === String(m))).join('')}</div></div>` : ''}
      <div class="fgroup"><h3>${esc(t('f.town'))}</h3><div class="opts">${towns.map(k => opt('town', k, townName(k), draft.town.includes(k))).join('')}</div></div>
      <div class="fgroup"><h3>${esc(t('f.beds'))}</h3><div class="opts">${['0', '1', '2', '3'].map(b => opt('beds', b, b === '0' ? t('f.studio') : b === '3' ? '3+' : b, draft.beds.includes(b))).join('')}</div></div>
      <div class="fgroup"><h3>${esc(isRent ? t('f.priceMonth') : t('f.price'))}</h3><div class="range-row">
        <label class="field"><span>${esc(t('f.min'))}</span><input class="input" type="number" inputmode="numeric" min="0" step="${isRent ? 50 : 5000}" id="fmin" value="${draft.min || ''}"></label>
        <label class="field"><span>${esc(t('f.max'))}</span><input class="input" type="number" inputmode="numeric" min="0" step="${isRent ? 50 : 5000}" id="fmax" value="${draft.max || ''}"></label></div></div>
      <div class="fgroup"><h3>${esc(t('f.sea'))}</h3><div class="opts">${[0, 200, 500, 1000].map(m => opt('sea', String(m), m ? '≤ ' + dist(m / 1000) : t('f.any'), (draft.sea || 0) === m)).join('')}</div></div>
      <div class="fgroup"><h3>${esc(t('f.near'))}</h3><div class="opts">${Object.keys(NEAR).map(n => opt('near', n, t('f.' + n), draft.near.includes(n))).join('')}</div><p class="tiny" style="margin-top:8px">OpenStreetMap · ${esc(t('n.straight'))}</p></div>
      <div class="fgroup"><h3>${esc(t('f.features'))}</h3><div class="opts">${feats.map(f => opt('feat', f, t('feat.' + f), draft.feat.includes(f))).join('')}</div></div>
      <div class="sheet-actions"><button type="button" class="btn btn-line" id="freset">${esc(t('f.reset'))}</button><button type="button" class="btn btn-sun" id="fapply"></button></div>`);
    const body = $('#sheet .sheet-body');
    const cnt = () => { $('#fapply').textContent = t('f.apply', { n: filterList(draft).length }); };
    body.addEventListener('click', e => {
      const b = e.target.closest('[data-k]'); if (!b) return;
      const k = b.dataset.k, v = b.dataset.v;
      if (k === 'month') draft.month = v;
      else if (k === 'sea') draft.sea = +v;
      else { const arr = draft[k]; const i = arr.indexOf(v); i < 0 ? arr.push(v) : arr.splice(i, 1); }
      $$(`[data-k="${k}"]`, body).forEach(x => x.setAttribute('aria-pressed', k === 'month' ? x.dataset.v === draft.month : k === 'sea' ? +x.dataset.v === draft.sea : draft[k].includes(x.dataset.v)));
      cnt();
    });
    body.addEventListener('input', () => { draft.min = +$('#fmin').value || 0; draft.max = +$('#fmax').value || 0; if ($('#folder')) draft.older = $('#folder').checked; cnt(); });
    $('#freset').onclick = () => { Object.assign(draft, { town: [], beds: [], min: 0, max: 0, sea: 0, feat: [], near: [], month: '', older: false }); closeSheet(); Object.assign(q, draft); apply(); };
    $('#fapply').onclick = () => { closeSheet(); Object.assign(q, draft); apply(); };
    cnt();
  }

  /* ---------- maps ---------- */
  function jitter(L) {
    if (L.geo !== 'town') return [L.lat, L.lon];
    let h = 0; for (const c of L.key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const a = (h % 360) * Math.PI / 180, r = .0012 + (h % 7) * .0006;
    return [L.lat + Math.sin(a) * r, L.lon + Math.cos(a) * r * 1.35];
  }
  function baseMap(el, opt = {}) {
    if (!window.L) return null;
    const m = window.L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true, ...opt });
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(m);
    return m;
  }
  function shortPrice(L, month) {
    const p = L.kind === 'sale' ? L.price : (rateFor(L, month)?.month || L.from_month);
    if (p) return p >= 1000 ? '€' + (p >= 100000 ? Math.round(p / 1000) : Math.round(p / 100) / 10) + 'k' : '€' + p;
    const d = rateFor(L, month)?.day || L.from_day;
    return d ? '€' + d + (lang === 'en' ? '/n' : '/д') : '•';
  }
  function listMap(el, list, month) {
    const m = baseMap(el); if (!m) return null;
    const pts = [];
    list.forEach(L => {
      const p = jitter(L); pts.push(p);
      const icon = window.L.divIcon({ className: '', html: `<div class="pin${L.geo === 'town' ? ' approx' : ''}">${shortPrice(L, month)}</div>`, iconSize: [0, 0] });
      window.L.marker(p, { icon }).addTo(m).bindPopup(`<div class="pop"><img src="${card(L)}" alt=""><div><b>${esc(priceText(L, month))}</b>${esc([typeLabel(L), townName(L.town)].filter(Boolean).join(' · '))}<br><a href="${urlOf(L)}">${esc(t('l.skip'))} →</a></div></div>`);
    });
    m.fitBounds(pts, { padding: [30, 30], maxZoom: 15 });
    return m;
  }

  /* ---------- listing ---------- */
  function listing(key) {
    const L = BYKEY.get(key);
    if (!L) return notFound();
    const isRent = L.kind === 'rent';
    const title = [typeLabel(L), townName(L.town)].filter(Boolean).join(' · ');
    document.title = `${title}${cxName(L) ? ' · ' + cxName(L) : ''} — BG Beach Homes`;
    const n = L.n;
    const nearRows = [['school', 'school'], ['kindergarten', 'kindergarten'], ['supermarket', 'supermarket'], ['pharmacy', 'pharmacy'], ['medical', 'medical'], ['airport', 'airport'], ['arena', 'arena']];
    const approx = L.geo === 'town';
    const feats = [...L.f.filter(f => ['pool', 'seaview', 'parking', 'pets', 'kids', 'yearround', 'security', 'furnished', 'verified', 'longterm'].includes(f))];
    const facts = [
      [t('l.type'), title || '—'],
      cxName(L) && [t('l.complex'), cxName(L)],
      L.sea_m != null && [t('l.sea'), seaTxt(L)],
      L.area && [t('l.area'), num(L.area) + ' m²'],
      L.floor && [t('l.floor'), L.floor + (L.floors ? ' / ' + L.floors : '')],
      !isRent && (L.act16 || L.offplan) && [t('l.status'), L.act16 ? t('l.act16') : t('l.offplan')],
      !isRent && L.fee != null && (L.fee_unit !== 'm2' || L.fee <= 20) && [t('l.fee'), L.fee === 0 ? t('l.fee0') : L.fee_unit === 'm2' ? t('l.feeM', { n: num(L.fee) }) : t('l.feeY', { n: num(L.fee) })],
      [t('l.id'), String(L.id)]
    ].filter(Boolean);
    const film = n >= 3 && !reduced;
    main.innerHTML = `
      ${film ? `<section class="film" id="film" style="height:calc(var(--vh) * ${Math.round(n * 85 + 40)})"><div class="film-stage">
        ${Array.from({ length: n }, (_, i) => `<div class="film-frame" data-n="${i}"><div class="bg" data-bg="${img(L, i)}"></div><img data-src="${img(L, i)}" alt=""></div>`).join('')}
        <div class="film-shade"></div>
        <div class="film-progress">${Array.from({ length: n }, () => '<i><b></b></i>').join('')}</div>
        <button type="button" class="film-skip" id="fskip">${esc(t('l.skip'))} ↓</button>
        <div id="caps"></div>
        <div class="film-hint">${esc(t('l.walk'))}</div>
      </div></section>` : ''}
      <div class="wrap"><div class="detail" id="details">
        <div>
          <nav class="crumbs"><a href="${BASE}/${isRent ? 'rent' : 'buy'}">${esc(isRent ? t('rent.h') : t('buy.h'))}</a><span>/</span><a href="${BASE}/${isRent ? 'rent' : 'buy'}?town=${L.town}">${esc(townName(L.town))}</a></nav>
          <h1>${esc(title)}${cxName(L) ? `<span class="muted" style="display:block;font-size:.55em;margin-top:8px">${esc(cxName(L))}</span>` : ''}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:16px">${feats.map(f => `<span class="tag">${esc(t('feat.' + f))}</span>`).join('')}<span class="tag ${freshness(L) === 'fresh' ? '' : 'grey'}">${esc(t('card.posted', { d: monthYear(L.date) }))}</span></div>
          ${!film ? `<div class="gallery" style="margin-top:22px">${Array.from({ length: n }, (_, i) => `<button type="button" data-lb="${i}"><img src="${img(L, i)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
          <div class="block"><h2>${esc(t('l.facts'))}</h2><div class="facts">${facts.map(([a, b]) => `<div class="fact"><span>${esc(a)}</span><b>${esc(b)}</b></div>`).join('')}</div></div>
          ${isRent && L.rates?.length ? `<div class="block"><h2>${esc(t('l.prices'))}</h2>${ratesTable(L)}<p class="tiny" style="margin-top:8px">${esc(t('l.check', { d: new Date(L.date).toLocaleDateString(locale(), { day: 'numeric', month: 'long', year: 'numeric' }) }))}</p></div>` : ''}
          <div class="block"><h2>${esc(t('l.near'))}</h2><div class="near">${nearRows.filter(([k]) => L.near?.[k] != null).map(([k, ic]) => `<div>${I[ic]}<span><b>${esc(t('n.' + k))} · ${dist(L.near[k])}</b><small>${esc([L.near[k + '_name'], approx ? t('n.approx') : t('n.straight')].filter(Boolean).join(' · '))}</small></span></div>`).join('')}</div><p class="tiny" style="margin-top:8px">${esc(t('n.src'))}</p></div>
          <div class="block"><h2>${esc(t('l.map'))}</h2><p class="muted small">${esc(approx ? t('l.mapApprox') : t('l.mapCx'))}</p><div class="mini-map" id="lmap"></div></div>
          ${L.desc || L.unit ? `<div class="block"><h2>${esc(t('l.orig'))}</h2><p class="tiny" style="margin-bottom:10px">${esc(t('l.origNote'))} <a href="${L.tg}" target="_blank" rel="noopener">t.me ↗</a></p><div class="orig" lang="ru">${esc([L.unit, L.desc].filter(Boolean).join('\n\n'))}</div></div>` : ''}
          ${film ? `<div class="block"><h2>${esc(t('l.photos'))}</h2><div class="gallery">${Array.from({ length: n }, (_, i) => `<button type="button" data-lb="${i}"><img src="${img(L, i)}" alt="" loading="lazy"></button>`).join('')}</div></div>` : ''}
        </div>
        <aside class="side" id="enquire">${enquiryPanel(L)}</aside>
      </div>
      ${similar(L)}
      </div>
      <div class="mobile-cta"><div class="p">${priceHTML(L)}</div><a class="btn btn-sun btn-sm" href="#enquire" id="mcta">${esc(isRent ? t('e.send') : t('e.sendBuy'))}</a></div>`;
    document.body.classList.add('has-mcta');
    $('#mcta').onclick = e => { e.preventDefault(); $('#enquire').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); setTimeout(() => $('#enquire input')?.focus({ preventScroll: true }), 500); };
    $$('[data-lb]').forEach(b => b.onclick = () => lightbox(L, +b.dataset.lb));
    wireEnquiry($('#enquire'), L);
    const tryMap = () => {
      const el = $('#lmap'); if (!el || !window.L) return;
      const m = baseMap(el, { zoomControl: true }); const p = [L.lat, L.lon];
      m.setView(p, approx ? 13 : 15);
      if (approx) window.L.circle(p, { radius: 900, color: '#0B6E79', weight: 1.5, fillOpacity: .08 }).addTo(m);
      else window.L.circleMarker(p, { radius: 9, color: '#fff', weight: 3, fillColor: '#FF5A36', fillOpacity: 1 }).addTo(m);
      onLeave(() => m.remove());
    };
    window.L ? tryMap() : addEventListener('load', tryMap, { once: true });
    if (film) runFilm(L);
  }

  function ratesTable(L) {
    const mons = D().mon;
    const label = r => {
      if (r.long) return t('l.longterm');
      if (r.season) return t('l.season');
      const ms = r.months || [];
      if (!ms.length) return t('l.anyMonth');
      if (ms.length > 2 && ms.join() === LONG.join()) return t('l.longterm');
      return ms.map(m => mons[m - 1]).join(', ');
    };
    return `<table class="rates"><thead><tr><th>${esc(t('l.period'))}</th><th>${esc(t('l.monthly'))}</th><th>${esc(t('l.nightly'))}</th></tr></thead><tbody>
      ${L.rates.map(r => `<tr class="${r.booked ? 'booked' : ''}"><td>${esc(label(r))}</td><td>${r.booked && !r.month ? esc(t('l.booked')) : r.month ? eur(r.month) : '—'}</td><td>${r.day ? eur(r.day) : '—'}</td></tr>`).join('')}
    </tbody></table>`;
  }

  function similar(L) {
    const list = DATA.filter(x => x.key !== L.key && x.kind === L.kind && x.town === L.town).sort((a, b) => Math.abs((a.beds ?? 1) - (L.beds ?? 1)) - Math.abs((b.beds ?? 1) - (L.beds ?? 1)) || b.date.localeCompare(a.date)).slice(0, 8);
    if (!list.length) return '';
    return `<section class="section"><div class="sec-head"><h2>${esc(townName(L.town))}</h2><a class="btn btn-line btn-sm" href="${BASE}/${L.kind === 'rent' ? 'rent' : 'buy'}?town=${L.town}">${esc(t('res.count', { n: DATA.filter(x => x.kind === L.kind && x.town === L.town).length }))} →</a></div><div class="rail">${list.map(x => cardWrap(x)).join('')}</div></section>`;
  }

  function runFilm(L) {
    const film = $('#film'), frames = $$('.film-frame', film), bars = $$('.film-progress b', film), caps = $('#caps');
    const n = frames.length;
    const chapters = buildChapters(L);
    // spread chapters across frames: first and last fixed, the rest evenly
    const capAt = new Array(n).fill(null);
    chapters.forEach((c, i) => { const f = i === chapters.length - 1 ? n - 1 : Math.min(n - 2, Math.round(i * (n - 1) / Math.max(1, chapters.length - 1))); if (capAt[f] == null) capAt[f] = i; else capAt[Math.min(n - 1, f + 1)] ??= i; });
    caps.innerHTML = chapters.map((c, i) => `<div class="cap" data-c="${i}">${c}</div>`).join('');
    const capEls = $$('.cap', caps);
    const loaded = new Set();
    const load = i => {
      if (i < 0 || i >= n || loaded.has(i)) return; loaded.add(i);
      const f = frames[i], im = $('img', f), bg = $('.bg', f);
      im.onload = () => { if (im.naturalWidth / im.naturalHeight > 1.2) im.classList.add('wide'); };
      im.src = im.dataset.src; bg.style.backgroundImage = `url(${bg.dataset.bg})`;
    };
    load(0); load(1);
    const top = $('#top');
    let raf = 0, cur = -1;
    function frame() {
      raf = 0;
      const r = film.getBoundingClientRect(), vh = innerHeight;
      const total = r.height - vh;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      const pos = p * (n - 1);
      top.classList.toggle('on-film', r.bottom > 70);
      frames.forEach((f, i) => {
        const d = Math.abs(pos - i);
        const o = Math.max(0, 1 - d * 1.6);
        f.style.opacity = o;
        if (o > 0) { const local = pos - i + .5; $('img', f).style.transform = `scale(${1.06 - local * .05}) translateY(${local * -1.2}%)`; }
      });
      const fi = Math.round(pos);
      load(fi + 1); load(fi + 2);
      bars.forEach((b, i) => { b.style.transform = `scaleX(${Math.min(1, Math.max(0, pos - i + 1))})`; });
      let c = -1; for (let i = 0; i <= fi; i++) if (capAt[i] != null) c = capAt[i];
      if (c !== cur) { cur = c; capEls.forEach((e, i) => e.classList.toggle('on', i === c)); }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onLeave(() => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); top.classList.remove('on-film'); });
    $('#fskip').onclick = () => $('#details').scrollIntoView();
    frame();
  }

  function buildChapters(L) {
    const isRent = L.kind === 'rent';
    const out = [];
    out.push(`<p class="eyebrow">${esc((isRent ? t('nav.rent') : t('nav.buy')) + ' · ' + townName(L.town))}</p><h1>${esc([typeLabel(L), cxName(L)].filter(Boolean).join(' · ') || townName(L.town))}</h1><div class="price-big">${priceHTML(L)}</div>`);
    if (L.sea_m != null) out.push(`<h2>${esc(t('card.sea', { m: seaTxt(L) }))}</h2><p>${esc(t('tp.' + L.town))}</p>`);
    const sz = [typeLabel(L), L.area && num(L.area) + ' m²', L.floor && (t('l.floor') + ' ' + L.floor + (L.floors ? '/' + L.floors : ''))].filter(Boolean).join(' · ');
    if (sz) out.push(`<h2>${esc(sz)}</h2>`);
    const fs = L.f.filter(f => ['pool', 'seaview', 'parking', 'kids', 'security', 'yearround', 'pets'].includes(f)).map(f => t('feat.' + f));
    if (fs.length) out.push(`<h2>${esc(fs.slice(0, 4).join(' · '))}</h2>`);
    const nr = ['school', 'kindergarten', 'supermarket'].filter(k => L.near?.[k] != null && L.near[k] < 3).map(k => t('n.' + k) + ' ' + dist(L.near[k]));
    if (nr.length) out.push(`<h2>${esc(nr.join(' · '))}</h2><p>${esc(L.geo === 'town' ? t('n.approx') : t('n.straight'))}</p>`);
    out.push(`<h2>${esc(isRent ? t('e.send') : t('e.sendBuy'))}</h2><p>${esc(t('how.2p'))}</p><a class="btn btn-sun" style="margin-top:16px" href="#enquire" onclick="event.preventDefault();document.getElementById('enquire').scrollIntoView()">${esc(t('e.h'))} ↓</a>`);
    return out;
  }

  function lightbox(L, i) {
    const el = document.createElement('div'); el.className = 'lightbox'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    const show = () => { el.innerHTML = `<img src="${img(L, i)}" alt=""><button class="lb-x" aria-label="Close">×</button><button class="lb-p" aria-label="Previous">‹</button><button class="lb-n" aria-label="Next">›</button><span class="lb-i">${i + 1} / ${L.n}</span>`; };
    show();
    el.addEventListener('click', e => {
      if (e.target.closest('.lb-x') || e.target === el) return close();
      if (e.target.closest('.lb-p')) { i = (i - 1 + L.n) % L.n; show(); }
      if (e.target.closest('.lb-n')) { i = (i + 1) % L.n; show(); }
    });
    const key = e => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') { i = (i + 1) % L.n; show(); } if (e.key === 'ArrowLeft') { i = (i - 1 + L.n) % L.n; show(); } };
    let sx = 0; el.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) { i = (i + (dx < 0 ? 1 : -1) + L.n) % L.n; show(); } });
    function close() { el.remove(); removeEventListener('keydown', key); }
    addEventListener('keydown', key);
    document.body.append(el);
    onLeave(close);
  }

  /* ---------- enquiries ---------- */
  function contactButtons(start) {
    return `<div class="or">${esc(t('e.or'))}</div>
      <div class="contact-row"><a class="btn btn-tg btn-sm" href="${TG_TEAM}" target="_blank" rel="noopener">${I.tg}${esc(t('e.tg'))}</a><a class="btn btn-ghost btn-sm" href="${TG_BOT}${start ? '?start=' + start : ''}" target="_blank" rel="noopener">${esc(t('e.bot'))}</a></div>
      <a class="btn btn-ghost btn-sm" style="width:100%;margin-top:8px" href="tel:${PHONE}">${I.phone}${esc(t('e.call'))} ${PHONE.replace(/(\+380)(\d\d)(\d{3})(\d{4})/, '$1 $2 $3 $4')}</a>`;
  }
  function enquiryPanel(L) {
    const isRent = L.kind === 'rent';
    return `<div class="panel">
      <div class="p-price">${priceHTML(L)}</div>
      <div class="check-note">${I.shield}<span>${esc(t('l.check', { d: monthYear(L.date) }))}</span></div>
      <form novalidate data-type="listing">
        <h3 style="font-size:18px;margin-top:4px">${esc(t('e.h'))}</h3>
        <label class="field"><span>${esc(t('e.name'))}</span><input class="input" name="name" autocomplete="name" required></label>
        <label class="field"><span>${esc(t('e.contact'))}</span><input class="input" name="contact" autocomplete="tel" required placeholder="@username / +49…"></label>
        ${isRent ? `<div class="row2"><label class="field"><span>${esc(t('e.from'))}</span><input class="input" type="date" name="from"></label><label class="field"><span>${esc(t('e.to'))}</span><input class="input" type="date" name="to"></label></div>
        <label class="field"><span>${esc(t('e.people'))}</span><input class="input" type="number" inputmode="numeric" min="1" max="20" name="people" value="2"></label>`
        : `<label class="field"><span>${esc(t('e.when'))}</span><select class="input" name="when"><option>0–3 months</option><option>3–6 months</option><option>6–12 months</option><option>Just exploring</option></select></label>`}
        <label class="field"><span>${esc(t('e.msg'))}</span><textarea class="input" name="msg" placeholder="${esc(t('e.msgPh'))}"></textarea></label>
        <button class="btn btn-sun" type="submit">${esc(isRent ? t('e.send') : t('e.sendBuy'))}</button>
        <p class="tiny">${esc(t('e.priv'))}</p>
      </form>
      ${contactButtons((isRent ? 'rent_' : 'sale_') + L.id)}
    </div>`;
  }
  function leadText(data, L) {
    const lines = [`BG Beach Homes — ${data.type}`];
    if (L) lines.push(`${L.kind === 'rent' ? 'Rent' : 'Buy'} ID ${L.id} · ${townName(L.town)}${L.cx ? ' · ' + L.cx : ''}`, location.origin + urlOf(L));
    for (const [k, v] of Object.entries(data)) if (v && !['type', 'key', 'page', 'lang'].includes(k)) lines.push(`${k}: ${v}`);
    return lines.join('\n');
  }
  function wireEnquiry(root, L, extra) {
    const form = $('form', root); if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(form));
      if (!fd.name?.trim() || !fd.contact?.trim()) { toast(t('e.need')); (fd.name?.trim() ? form.contact : form.name).focus(); return; }
      const data = { type: form.dataset.type, key: L?.key, ...(typeof extra === 'function' ? extra() : extra), ...fd, lang, page: location.pathname + location.search };
      const btn = $('button[type=submit]', form), label = btn.textContent;
      btn.disabled = true; btn.textContent = t('e.sending');
      let ref = null;
      try {
        const r = await fetch('/api/bgbh-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const j = await r.json().catch(() => ({}));
        if (r.ok && j.ok) ref = j.ref;
      } catch { /* offline */ }
      if (ref) {
        form.outerHTML = `<div class="receipt" role="status"><div class="ok">${I.check}</div><h3>${esc(t('e.okH'))}</h3><div class="ref">${esc(ref)}</div><p class="muted small">${esc(t('e.okP'))}</p></div>`;
      } else {
        btn.disabled = false; btn.textContent = label;
        const txt = leadText(data, L);
        let copied = false;
        try { await navigator.clipboard.writeText(txt); copied = true; } catch { /* in-app browsers may block it */ }
        $('.lead-fallback', root)?.remove();
        form.insertAdjacentHTML('afterend', `<div class="lead-fallback check-note" style="display:grid;gap:10px"><span>${esc(t('e.fail'))}</span>
          <textarea class="input" readonly rows="5" style="font-size:13px">${esc(txt)}</textarea>
          <a class="btn btn-tg btn-sm" href="${TG_TEAM}" target="_blank" rel="noopener">${I.tg}${esc(t('e.tg'))}</a></div>`);
        if (!copied) $('.lead-fallback textarea', root)?.select();
      }
    });
  }

  /* ---------- sheet + chat ---------- */
  let lastFocus = null;
  function sheet(html) {
    const s = $('#sheet'); lastFocus = document.activeElement;
    $('.sheet-body', s).innerHTML = html; s.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => $('.sheet-x', s).focus(), 50);
  }
  function closeSheet() { const s = $('#sheet'); s.hidden = true; $('.sheet-body', s).innerHTML = ''; document.documentElement.style.overflow = ''; lastFocus?.focus?.(); }
  $('#sheet').addEventListener('click', e => { if (e.target.closest('[data-close]')) closeSheet(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#sheet').hidden) closeSheet(); });
  function chatSheet() {
    sheet(`<h2 id="sheet-title" style="font-size:26px">${esc(t('chat.h'))}</h2><p class="muted" style="margin:10px 0 20px">${esc(t('chat.p'))}</p>
      <div style="display:grid;gap:10px"><a class="btn btn-tg" href="${TG_BOT}" target="_blank" rel="noopener">${I.tg}${esc(t('chat.bot'))}</a><a class="btn btn-ink" href="${TG_TEAM}" target="_blank" rel="noopener">${esc(t('chat.human'))}</a><a class="btn btn-line" href="tel:${PHONE}">${I.phone}${esc(t('chat.call'))}</a></div>`);
  }

  /* ---------- matcher ---------- */
  function matcher() {
    document.title = t('nav.match') + ' — BG Beach Homes';
    const A = Object.assign({ kind: '', who: [], when: '', budget: 0, matters: [], town: '' }, JSON.parse(sessionStorage.getItem('bgbh.match') || '{}'));
    let step = +(new URLSearchParams(location.search).get('step') || 0);
    const save = () => sessionStorage.setItem('bgbh.match', JSON.stringify(A));
    const steps = () => A.kind === 'sale' ? ['kind', 'who', 'budget', 'matters', 'town', 'results'] : ['kind', 'who', 'when', 'budget', 'matters', 'town', 'results'];
    function opts(field, list, multi, max) {
      return `<div class="m-opts">${list.map(([v, ic, label]) => `<button type="button" class="m-opt" data-f="${field}" data-v="${v}" aria-pressed="${multi ? A[field].includes(v) : A[field] === v}"><span class="ic" aria-hidden="true">${ic}</span>${esc(label)}</button>`).join('')}</div>`;
    }
    function draw() {
      const S = steps(); step = Math.min(step, S.length - 1);
      const s = S[step];
      if (s === 'results') return matchResults(A, () => { step = 0; Object.assign(A, { kind: '', who: [], when: '', budget: 0, matters: [], town: '' }); save(); draw(); });
      let q = '';
      if (s === 'kind') q = `<h1>${esc(t('m.q1'))}</h1>${opts('kind', [['rent', '🏖', t('m.rent')], ['sale', '🔑', t('m.buy')]])}`;
      if (s === 'who') q = `<h1>${esc(t('m.q2'))}</h1><p class="muted">${esc(t('m.q2p'))}</p>${opts('who', (A.kind === 'sale' ? [['live', '🏡', t('m.live')], ['invest', '📈', t('m.invest')]] : []).concat([['solo', '🙋', t('m.solo')], ['couple', '💑', t('m.couple')], ['kids', '👨‍👩‍👧', t('m.kids')], ['friends', '👯', t('m.friends')], ['remote', '💻', t('m.remote')], ['pet', '🐕', t('m.pet')]]), true)}`;
      if (s === 'when') q = `<h1>${esc(t('m.q3'))}</h1>${opts('when', [['summer', '☀️', t('m.summer')], ['winter', '🍂', t('m.winter')], ['year', '📅', t('m.year')], ['euro', '🎤', t('m.euro')], ['flex', '🤷', t('m.flex')]])}`;
      if (s === 'budget') {
        const rent = A.kind !== 'sale';
        const max = rent ? 2500 : 300000, stepv = rent ? 50 : 5000;
        if (!A.budget) A.budget = rent ? (A.when === 'winter' || A.when === 'year' ? 500 : 1200) : 90000;
        q = `<h1>${esc(rent ? t('m.q4') : t('m.q3b'))}</h1><div class="m-budget"><output id="bout"></output><input type="range" id="brange" min="${stepv * (rent ? 4 : 5)}" max="${max}" step="${stepv}" value="${A.budget}" aria-label="${esc(t('f.price'))}"><p class="tiny" id="bcount"></p></div>`;
      }
      if (s === 'matters') q = `<h1>${esc(t('m.q5'))}</h1><p class="muted">${esc(t('m.q5p'))}</p>${opts('matters', [['walkSea', '🌊', t('m.walkSea')], ['school', '🎒', t('m.school')], ['kinder', '🧸', t('m.kinder')], ['shop', '🛒', t('m.shop')], ['pool', '🏊', t('m.pool')], ['view', '🌅', t('m.view')], ['quiet', '🌿', t('m.quiet')], ['yearround', '❄️', t('m.yearround')], ['parking', '🚗', t('m.parking')], ['space', '🛏', t('m.space')]], true)}`;
      if (s === 'town') q = `<h1>${esc(t('m.q6'))}</h1>${opts('town', [['', '✨', t('m.anyTown')], ...['sveti-vlas', 'sunny-beach', 'nessebar', 'ravda'].map(k => [k, '📍', townName(k)])])}`;
      const canNext = s === 'kind' ? !!A.kind : s === 'when' ? !!A.when : true;
      main.innerHTML = `<div class="wrap"><div class="matcher">
        <div class="m-progress"><b style="width:${(step / (S.length - 1)) * 100}%"></b></div>
        <div class="m-q">${q}</div>
        <div class="m-nav">${step ? `<button type="button" class="btn btn-line" id="mback">← ${esc(t('m.back'))}</button>` : '<span></span>'}<button type="button" class="btn btn-sun" id="mnext" ${canNext ? '' : 'disabled style="opacity:.4"'}>${esc(S[step + 1] === 'results' ? t('m.show') : t('m.next'))} →</button></div>
      </div></div>`;
      $$('.m-opt').forEach(b => b.onclick = () => {
        const f = b.dataset.f, v = b.dataset.v;
        if (Array.isArray(A[f])) { const i = A[f].indexOf(v); if (i < 0) { if (f === 'matters' && A[f].length >= 5) return toast('5 max'); A[f].push(v); } else A[f].splice(i, 1); }
        else { A[f] = v; if (f === 'kind') { A.budget = 0; A.who = []; } }
        save();
        if (!Array.isArray(A[f])) { step++; draw(); } else draw();
      });
      const r = $('#brange');
      if (r) {
        const upd = () => { A.budget = +r.value; save(); $('#bout').textContent = eur(A.budget) + (A.kind !== 'sale' ? ' ' + t('card.month') : ''); $('#bcount').textContent = t('res.count', { n: scoreAll(A).filter(x => x.inBudget).length }); };
        r.oninput = upd; upd();
      }
      $('#mnext').onclick = () => { if (!canNext) return; step++; draw(); scrollTo(0, 0); };
      $('#mback') && ($('#mback').onclick = () => { step--; draw(); });
    }
    draw();
  }
  function whenMonth(A) { return { summer: '7', winter: 'long', year: 'long', euro: '5' }[A.when] || ''; }
  function scoreAll(A) {
    const kind = A.kind || 'rent', month = kind === 'rent' ? whenMonth(A) : '';
    const wants = new Set(A.matters);
    if (A.who.includes('kids')) { wants.add('kids-area'); }
    if (A.who.includes('friends') || A.who.includes('kids')) wants.add('space');
    if (A.who.includes('remote') || A.when === 'winter' || A.when === 'year') wants.add('yearround');
    return DATA.filter(L => L.kind === kind && (!A.town || L.town === A.town) && true).map(L => {
      let got = 0, total = 0; const why = [];
      const add = (w, ok, label) => { total += w; if (ok) { got += w; if (label) why.push(label); } };
      const p = monthly(L, month);
      const inBudget = !A.budget || (p != null && p <= A.budget * 1.1);
      add(3, inBudget && p != null, p != null && p <= A.budget ? t('why.budget') : null);
      if (month) add(2, !!rateFor(L, month), null);
      if (wants.has('walkSea')) add(2, L.sea_m != null && L.sea_m <= 400, L.sea_m != null && L.sea_m <= 400 ? t('why.sea', { m: seaTxt(L) }) : null);
      if (wants.has('school')) add(2, L.near?.school <= 1.2, L.near?.school <= 1.2 ? t('why.school', { m: dist(L.near.school) }) : null);
      if (wants.has('kinder')) add(2, L.near?.kindergarten <= 1, L.near?.kindergarten <= 1 ? t('why.kinder', { m: dist(L.near.kindergarten) }) : null);
      if (wants.has('shop')) add(1, L.near?.supermarket <= .5, L.near?.supermarket <= .5 ? t('why.shop', { m: dist(L.near.supermarket) }) : null);
      if (wants.has('pool')) add(1.5, L.f.includes('pool'), t('why.pool'));
      if (wants.has('view')) add(1.5, L.f.includes('seaview'), t('why.view'));
      if (wants.has('quiet')) add(1, QUIET.includes(L.town), t('why.quiet'));
      if (wants.has('yearround')) add(1, YEAR_TOWNS.includes(L.town) || L.f.includes('yearround'), t('why.year'));
      if (wants.has('parking')) add(1, L.f.includes('parking'), t('why.parking'));
      if (wants.has('space')) add(1.5, (L.beds || 0) >= 2, (L.beds || 0) >= 2 ? t('why.space', { n: L.beds }) : null);
      if (wants.has('kids-area')) add(.5, L.f.includes('kids'), null);
      if (A.who.includes('pet')) add(1, L.f.includes('pets'), t('why.pets'));
      add(1, freshness(L) === 'fresh', kind === 'rent' && freshness(L) === 'fresh' ? t('why.fresh') : null);
      return { L, score: Math.round(got / total * 100), why: why.slice(0, 4), inBudget };
    }).filter(x => x.inBudget).sort((a, b) => b.score - a.score || b.L.date.localeCompare(a.L.date));
  }
  function matchResults(A, restart) {
    const res = scoreAll(A).slice(0, 18);
    const month = A.kind === 'rent' ? whenMonth(A) : '';
    const brief = [A.kind === 'sale' ? t('m.buy') : t('m.rent'), ...A.who.map(w => t('m.' + w)), A.when && t('m.' + A.when), A.budget && eur(A.budget), ...A.matters.map(m => t('m.' + m)), A.town ? townName(A.town) : ''].filter(Boolean);
    main.innerHTML = `<div class="wrap"><div class="page-hero"><p class="eyebrow">${esc(t('matchb.eyebrow'))}</p><h1 style="margin-top:12px">${esc(t('m.results'))}</h1><p class="lede">${esc(t('m.resultsP'))}</p></div>
      <div class="brief">${brief.map(b => `<span class="tag grey">${esc(b)}</span>`).join('')}<button type="button" class="btn btn-ghost btn-sm" id="mrestart" style="margin-left:auto">${esc(t('m.restart'))}</button></div>
      ${res.length ? `<div class="grid">${res.map(x => cardWrap(x.L, { score: x.score, why: x.why, month })).join('')}</div>` : `<div class="empty"><h3>${esc(t('res.empty'))}</h3><p class="muted">${esc(t('res.emptyP'))}</p></div>`}
      <div class="section"><div class="form-card" id="mbrief" style="max-width:640px">
        <h2 style="font-size:26px">${esc(t('m.sendBrief'))}</h2>
        <form novalidate data-type="match" style="display:grid;gap:12px">
          <div class="row2"><label class="field"><span>${esc(t('e.name'))}</span><input class="input" name="name" required></label><label class="field"><span>${esc(t('e.contact'))}</span><input class="input" name="contact" required></label></div>
          <label class="field"><span>${esc(t('e.msg'))}</span><textarea class="input" name="msg" placeholder="${esc(t('e.msgPh'))}"></textarea></label>
          <button class="btn btn-sun" type="submit">${esc(t('m.sendBrief'))}</button><p class="tiny">${esc(t('e.priv'))}</p>
        </form>${contactButtons('match')}
      </div></div></div>`;
    $('#mrestart').onclick = restart;
    wireEnquiry($('#mbrief'), null, () => ({ brief: brief.join(' · '), top: res.slice(0, 6).map(x => `${x.L.kind}:${x.L.id}(${x.score}%)`).join(', ') }));
  }

  /* ---------- saved ---------- */
  function savedPage() {
    document.title = t('saved.h') + ' — BG Beach Homes';
    const list = [...saved].map(k => BYKEY.get(k)).filter(Boolean);
    main.innerHTML = `<div class="wrap"><div class="page-hero"><h1>${esc(t('saved.h'))}</h1><p class="lede">${esc(t('saved.p'))}</p></div>
      ${!list.length ? `<div class="empty"><p>${esc(t('saved.empty'))}</p><a class="btn btn-sun" style="margin-top:16px" href="${BASE}/rent">${esc(t('nav.rent'))}</a></div>` : `
      <div class="grid">${list.map(l => cardWrap(l)).join('')}</div>
      ${list.length > 1 ? `<div class="section"><h2 style="margin-bottom:16px">${esc(t('saved.compare'))}</h2><div class="compare"><table><tbody>
        <tr><th></th>${list.map(l => `<td><a href="${urlOf(l)}"><img src="${card(l)}" alt=""></a></td>`).join('')}</tr>
        <tr><th>${esc(t('f.price'))}</th>${list.map(l => `<td><b>${esc(priceText(l))}</b></td>`).join('')}</tr>
        <tr><th>${esc(t('f.town'))}</th>${list.map(l => `<td>${esc(townName(l.town))}${cxName(l) ? '<br><span class="tiny">' + esc(cxName(l)) + '</span>' : ''}</td>`).join('')}</tr>
        <tr><th>${esc(t('l.type'))}</th>${list.map(l => `<td>${esc(typeLabel(l))}${l.area ? ' · ' + num(l.area) + ' m²' : ''}</td>`).join('')}</tr>
        <tr><th>${esc(t('l.sea'))}</th>${list.map(l => `<td>${esc(seaTxt(l) || '—')}</td>`).join('')}</tr>
        <tr><th>${esc(t('n.school'))}</th>${list.map(l => `<td>${esc(dist(l.near?.school))}</td>`).join('')}</tr>
        <tr><th>${esc(t('n.supermarket'))}</th>${list.map(l => `<td>${esc(dist(l.near?.supermarket))}</td>`).join('')}</tr>
        <tr><th>${esc(t('f.features'))}</th>${list.map(l => `<td>${esc(l.f.filter(f => ['pool', 'seaview', 'parking', 'kids', 'security'].includes(f)).map(f => t('feat.' + f)).join(', ') || '—')}</td>`).join('')}</tr>
      </tbody></table></div></div>` : ''}
      <div class="section"><div class="form-card" id="sbrief" style="max-width:640px"><h2 style="font-size:26px">${esc(t('saved.send', { n: list.length }))}</h2>
        <form novalidate data-type="shortlist" style="display:grid;gap:12px">
          <div class="row2"><label class="field"><span>${esc(t('e.name'))}</span><input class="input" name="name" required></label><label class="field"><span>${esc(t('e.contact'))}</span><input class="input" name="contact" required></label></div>
          <div class="row2"><label class="field"><span>${esc(t('e.from'))}</span><input class="input" type="date" name="from"></label><label class="field"><span>${esc(t('e.to'))}</span><input class="input" type="date" name="to"></label></div>
          <label class="field"><span>${esc(t('e.msg'))}</span><textarea class="input" name="msg" placeholder="${esc(t('e.msgPh'))}"></textarea></label>
          <button class="btn btn-sun" type="submit">${esc(t('saved.send', { n: list.length }))}</button><p class="tiny">${esc(t('e.priv'))}</p>
        </form>${contactButtons('shortlist')}</div></div>`}
    </div>`;
    if (list.length) wireEnquiry($('#sbrief'), null, () => ({ listings: list.map(l => `${l.kind}:${l.id}`).join(', ') }));
  }

  /* ---------- Eurovision ---------- */
  function euroPage() {
    document.title = 'Eurovision 2027 — where to stay on the coast — BG Beach Homes';
    const towns = ['pomorie', 'aheloy', 'ravda', 'nessebar', 'sunny-beach', 'sveti-vlas'];
    const near = DATA.filter(l => l.kind === 'rent' && rateFor(l, '5')).sort((a, b) => (a.near?.arena ?? 99) - (b.near?.arena ?? 99)).slice(0, 8);
    main.innerHTML = `<div class="wrap">
      <div class="page-hero"><p class="eyebrow">${esc(t('euro.eyebrow'))}</p><h1 style="margin-top:12px">${esc(t('eu.h'))}</h1><p class="lede">${esc(t('eu.lede'))}</p></div>
      <div class="band band-euro reveal" style="margin-top:20px"><div><h2>${esc(t('eu.shows'))}</h2><p style="margin-top:10px">Arena Burgas</p></div><div class="dates">${EURO.map(e => `<div class="date"><b>${e.d}</b><span>${esc(t('euro.may'))} 2027 · ${esc(t(e.k))}</span></div>`).join('')}</div></div>
      <div class="section"><h2 style="margin-bottom:18px">${esc(t('eu.towns'))}</h2><div class="euro-towns">${towns.map(k => `<div class="euro-town reveal"><span class="eyebrow">${esc(townName(k))}</span><b>≈ ${Math.round(km(CENTRE[k], ARENA))} ${lang === 'en' ? 'km' : 'км'}</b><span class="tiny">${esc(t('n.straight'))}</span></div>`).join('')}</div></div>
      <div class="section" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:28px;align-items:start">
        <div><h2 style="margin-bottom:16px">${esc(t('eu.honest'))}</h2><div style="display:grid;gap:10px">${['eu.h1', 'eu.h2', 'eu.h3'].map(k => `<div class="check-note" style="margin:0">${I.check}<span>${esc(t(k))}</span></div>`).join('')}</div><p class="tiny" style="margin-top:14px">${esc(t('eu.source'))}</p></div>
        <div class="form-card" id="eform"><h2 style="font-size:26px">${esc(t('eu.form'))}</h2>
          <form novalidate data-type="eurovision" style="display:grid;gap:12px">
            <fieldset style="border:0;padding:0;margin:0"><legend class="small" style="font-weight:600;color:var(--ink-2);margin-bottom:8px">${esc(t('eu.shows?'))}</legend><div style="display:flex;gap:8px;flex-wrap:wrap">${EURO.map(e => `<label class="chip"><input type="checkbox" name="show_${e.d}" value="1"> ${e.d} · ${esc(t(e.k))}</label>`).join('')}</div></fieldset>
            <div class="row2"><label class="field"><span>${esc(t('eu.nights'))}</span><input class="input" type="number" min="1" max="30" name="nights" value="4"></label><label class="field"><span>${esc(t('eu.guests'))}</span><input class="input" type="number" min="1" max="20" name="guests" value="2"></label></div>
            <div class="row2"><label class="field"><span>${esc(t('eu.budgetN'))}</span><input class="input" type="number" min="0" step="10" name="budget"></label><label class="field"><span>${esc(t('f.town'))}</span><select class="input" name="town"><option value="">${esc(t('f.any'))}</option>${towns.map(k => `<option value="${k}">${esc(townName(k))}</option>`).join('')}</select></label></div>
            <label style="display:flex;gap:10px;align-items:center"><input type="checkbox" name="transfer" value="yes" style="width:20px;height:20px"> ${esc(t('eu.transfer'))}</label>
            <div class="row2"><label class="field"><span>${esc(t('e.name'))}</span><input class="input" name="name" required></label><label class="field"><span>${esc(t('e.contact'))}</span><input class="input" name="contact" required></label></div>
            <button class="btn btn-sun" type="submit">${esc(t('eu.send'))}</button><p class="tiny">${esc(t('e.priv'))}</p>
          </form>${contactButtons('eurovision')}</div>
      </div>
      <div class="section"><div class="sec-head"><h2>${esc(t('fresh.h'))}</h2><a class="btn btn-line btn-sm" href="${BASE}/rent?month=5">${esc(t('fresh.all'))} →</a></div><div class="rail">${near.map(l => cardWrap(l)).join('')}</div></div>
      <div class="section"><a class="post-card" href="${BASE}/journal/eurovision-2027-where-to-stay" style="max-width:520px">${postInner(window.BG_JOURNAL[0])}</a></div>
    </div>`;
    wireEnquiry($('#eform'), null);
  }

  /* ---------- journal ---------- */
  const postInner = p => `<img src="${IMG}${p.cover}" alt="" loading="lazy"><div><span class="tiny">${esc(new Date(p.date).toLocaleDateString(locale(), { day: 'numeric', month: 'long', year: 'numeric' }))} · ${esc(t('j.read', { n: p.mins }))}</span><h3>${esc(p.title)}</h3><p class="muted small">${esc(p.dek)}</p></div>`;
  const postCard = p => `<a class="post-card reveal" href="${BASE}/journal/${p.slug}">${postInner(p)}</a>`;
  function journalPage() {
    document.title = t('j.h') + ' — BG Beach Homes';
    main.innerHTML = `<div class="wrap"><div class="page-hero"><h1>${esc(t('j.h'))}</h1><p class="lede">${esc(t('j.lede'))}</p>${lang !== 'en' ? `<p class="tiny" style="margin-top:8px">${esc(t('j.lang'))}</p>` : ''}</div><div class="posts" style="margin-top:24px">${window.BG_JOURNAL.map(postCard).join('')}</div></div>`;
  }
  function article(s) {
    const p = window.BG_JOURNAL.find(x => x.slug === s);
    if (!p) return notFound();
    document.title = p.title + ' — BG Beach Homes';
    main.innerHTML = `<div class="wrap"><article class="article" lang="en">
      <a class="tiny" href="${BASE}/journal" style="font-weight:600;color:var(--sea);text-decoration:none">← ${esc(t('j.back'))}</a>
      <h1>${esc(p.title)}</h1>
      <p class="meta">${esc(new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))} · ${esc(t('j.read', { n: p.mins }))} · BG Beach Homes</p>
      <img class="cover" src="${IMG}${p.cover}" alt="">
      <div class="prose">${p.body}</div>
    </article>
    <div class="section"><div class="sec-head"><h2>${esc(t('journal.h'))}</h2></div><div class="posts">${window.BG_JOURNAL.filter(x => x.slug !== s).map(postCard).join('')}</div></div></div>`;
  }

  function notFound() {
    document.title = 'Not found — BG Beach Homes';
    main.innerHTML = `<div class="wrap"><div class="page-hero" style="text-align:center;padding:80px 0"><h1>${esc(t('nf.h'))}</h1><p class="lede" style="margin:16px auto 0">${esc(t('nf.p'))}</p><a class="btn btn-sun" style="margin-top:24px" href="${BASE}/rent">${esc(t('nf.cta'))}</a></div></div>`;
  }

  function footer() {
    $('#foot').innerHTML = `<div class="wrap"><div class="foot-grid">
      <div><a class="brand" href="${BASE}" style="color:#fff"><svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="17" r="8" fill="#FF5A36"/><path d="M3 27c4 0 4-3 8.5-3S16 27 20 27s4-3 8.5-3S33 27 37 27" fill="none" stroke="#7FD0D6" stroke-width="3" stroke-linecap="round"/></svg><span class="brand-name">BG Beach Homes</span></a><p style="margin-top:14px;font-size:14.5px;color:#AFC2C6;max-width:30em">${esc(t('foot.about'))}</p></div>
      <div><h3>${esc(t('foot.find'))}</h3><a href="${BASE}/rent">${esc(t('nav.rent'))}</a><a href="${BASE}/buy">${esc(t('nav.buy'))}</a><a href="${BASE}/match">${esc(t('nav.match'))}</a><a href="${BASE}/eurovision-2027">${esc(t('nav.euro'))}</a><a href="${BASE}/journal">${esc(t('nav.journal'))}</a></div>
      <div><h3>${esc(t('foot.channels'))}</h3><a href="${CH.rent}" target="_blank" rel="noopener">${esc(t('foot.rentCh'))} ↗</a><a href="${CH.sale}" target="_blank" rel="noopener">${esc(t('foot.saleCh'))} ↗</a><a href="https://www.instagram.com/bg.beachhomes" target="_blank" rel="noopener">Instagram ↗</a></div>
      <div><h3>${esc(t('foot.contact'))}</h3><a href="${TG_TEAM}" target="_blank" rel="noopener">Telegram ↗</a><a href="${TG_BOT}" target="_blank" rel="noopener">${esc(t('foot.bot'))} ↗</a><a href="tel:${PHONE}">${PHONE}</a></div>
    </div><div class="fine"><span>${esc(t('foot.fine1'))}</span><span>© ${NOW.getFullYear()} BG Beach Homes · ${esc(t('foot.fine2'))}</span></div></div>`;
  }

  /* ---------- boot ---------- */
  Promise.all([fetch('/bgbh/data/listings.json').then(r => r.json()), fetch('/bgbh/data/coast.json').then(r => r.json()).catch(() => null)]).then(([d, c]) => {
    DATA = d; COAST = c; BYKEY = new Map(d.map(l => [l.key, l]));
    footer(); render();
  }).catch(() => { main.innerHTML = '<div class="wrap"><p style="padding:60px 0">Could not load listings. Please refresh.</p></div>'; });
})();
