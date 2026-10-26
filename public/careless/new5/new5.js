/* care_less /new5 — single readable script, no build step.
   Sections: config · utilities · gate · smooth scroll + settle · stage (film, plate, board) · Scout (encounter, dock, chat, call) · offers · final form. */
(() => {
'use strict';

/* ───────────────────────── Config ───────────────────────── */
const BASE = '/careless/new5/';
const LOOP = { src: '/careless/video/v1/1_loop.mp4' };
const WHATSAPP = '34641935207';
const BOOKING = 'https://zcal.co/carelessmaks/ai-map';
// 'live' = MCB widget transport (+ voice adapter if present) · 'preview' = scripted, labelled demo · 'off' = WhatsApp handoff
const SCOUT_MODE = window.CARELESS_SCOUT_MODE || 'preview';
const LEAD_ENDPOINT = '/api/new5-lead';

/* Each film: scroll map [u (viewport heights of scroll), t (seconds)], caption windows [start, end] in film seconds,
   the Scout hold moment and which side Scout stands on (the card goes on the other side).
   Swap in the final Blender render by replacing media/film-*.mp4 — same camera, same timings. */
const FILMS = {
  cam: {
    src720: BASE + 'media/film-720.mp4', src540: BASE + 'media/film-540.mp4', last: BASE + 'media/film-last.webp',
    duration: 30,
    map: [[0,0],[0.9,1.2],[2.1,3.5],[2.9,4.7],[4.1,7.5],[5.0,9.9],[6.6,13.9],[7.3,16.3],[8.7,20.2],[9.9,23.9],[10.8,26.9],[12.0,29.96],[12.7,29.96]],
    captions: { view:[1.1,3.6], takes:[4.8,7.7], jobs:[10.1,14.1], colony:[16.6,20.4], scout:[20.7,23.9], follow:[24.3,27.0], hq:[27.4,99] },
    hold: 23.85, scoutSide: 'right',
  },
  v4: {
    src720: '/careless/new4/media/film-720-intra.mp4', src540: '/careless/new4/media/film-540-intra.mp4', last: '/careless/video/film-v4/film-last.webp',
    duration: 45.866667,
    map: [[0,0],[0.9,2.2],[2.1,6.8],[2.9,9.6],[4.1,15.0],[5.0,20.6],[6.6,27.2],[7.3,29.3],[8.7,34.8],[9.9,39.7],[10.8,42.9],[12.0,45.8],[12.7,45.8]],
    captions: { view:[2.8,7.1], takes:[10.0,15.2], jobs:[21.3,27.4], colony:[29.4,35.0], scout:[35.4,39.7], follow:[40.1,43.1], hq:[43.4,99] },
    hold: 39.65, scoutSide: 'left',
  },
};
const filmKey = (/[?&]film=v4\b/.test(location.search) || location.hash === '#v4') && window.CARELESS_V4 !== false ? 'v4' : 'cam';
const FILM = FILMS[filmKey];
const FILM_U = FILM.map[FILM.map.length - 1][0];
// Phases after the film, in viewport heights.
const PH = { plateIn: 1.0, plateHold: 0.9, swap: 1.0, chapter: 1.2, chapters: 4, tail: 0.35 };
const P_START = FILM_U, P_SWAP = P_START + PH.plateIn + PH.plateHold, P_CH = P_SWAP + PH.swap;
const STAGE_U = P_CH + PH.chapter * PH.chapters + PH.tail;

/* ───────────────────────── Utilities ───────────────────────── */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = x => { x = clamp(x); return x * x * (3 - 2 * x); };
const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
const easeInOut = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine)');
const root = document.documentElement;
const conn = navigator.connection;
const light = !!(conn && (conn.saveData || /(^|-)2g$|^3g$/.test(conn.effectiveType || '')));
const small = matchMedia('(max-width: 760px)').matches;
const wa = text => 'https://wa.me/' + WHATSAPP + (text ? '?text=' + encodeURIComponent(text) : '');
const store = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch {} } };
function track(name, detail = {}) {
  const event = { event: name, page: 'new5', ...detail };
  (window.dataLayer = window.dataLayer || []).push(event);
  if (navigator.doNotTrack === '1') return;
  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  window.clarity('event', name);
}
function startAnalytics() {
  if (navigator.doNotTrack === '1' || !/maksnedbailo\.site$/.test(location.hostname)) return;
  const s = document.createElement('script'); s.async = true; s.src = 'https://www.clarity.ms/tag/wley84eoj3';
  ('requestIdleCallback' in window ? requestIdleCallback : setTimeout)(() => document.head.append(s), 2000);
}
function lerpMap(map, x, from, to) {
  if (x <= map[0][from]) return map[0][to];
  for (let i = 1; i < map.length; i++) {
    const a = map[i - 1], b = map[i];
    if (x <= b[from]) return b[from] === a[from] ? b[to] : a[to] + (b[to] - a[to]) * (x - a[from]) / (b[from] - a[from]);
  }
  return map[map.length - 1][to];
}
const timeAt = u => lerpMap(FILM.map, u, 0, 1);
const uAt = t => lerpMap(FILM.map, t, 1, 0);
function typeInto(node, text, speed = 26) {
  return new Promise(done => {
    if (motion.matches) { node.textContent = text; return done(); }
    node.classList.add('typing'); let i = 0;
    const step = () => { node.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(step, speed + (/[,.?]/.test(text[i - 1]) ? 160 : 0)); else { node.classList.remove('typing'); done(); } };
    step();
  });
}

/* ───────────────────────── Elements ───────────────────────── */
const journey = $('#journey'), stage = $('#stage');
const poster = $('#poster'), loop = $('#loop'), movie = $('#movie'), filmBox = $('.film');
const hero = $('#hero'), heroTyped = $('#hero-typed');
const caps = $$('.cap').map(el => ({ el, key: el.dataset.cap, win: FILM.captions[el.dataset.cap] }));
const plate = $('#plate'), plateCard = $('#plate-card');
const board = $('#board'), org = $('#org'), track_ = $('#chapter-track'), chapters = $$('.chapter'), dots = $$('.chapter-dots i');
const cue = $('#cue');

/* ───────────────────────── Layout ───────────────────────── */
let H = innerHeight, journeyTop = 0, maxScroll = 0, rests = [];
function layout() {
  H = stage.offsetHeight || innerHeight;
  journey.style.setProperty('--journey-h', Math.round((STAGE_U + 1) * H) + 'px');
  journeyTop = journey.getBoundingClientRect().top + scrollY;
  maxScroll = document.documentElement.scrollHeight - innerHeight;
  const px = u => journeyTop + u * H;
  rests = [px(0)];
  for (const c of caps) if (c.win[1] < 90) rests.push(px(uAt((c.win[0] + c.win[1]) / 2)));
  rests.push(px(uAt(FILM.captions.hq[0] + .6) + .35));
  rests.push(px(P_START + PH.plateIn + PH.plateHold * .5));
  for (let i = 0; i < PH.chapters; i++) rests.push(px(P_CH + i * PH.chapter + PH.chapter * .3));
  rests.push($('#human').getBoundingClientRect().top + scrollY);
  rests.push(Math.min(maxScroll, $('#final').getBoundingClientRect().top + scrollY));
}

/* ───────────────────────── Smooth wheel + settle ───────────────────────── */
let sTarget = scrollY, sCur = scrollY, sRaf = 0, sLast = 0, sTau = 120, selfScroll = false, lastInput = 0, touching = false, settleTimer = 0;
let held = false, modal = 0; // modal > 0 while chat/call/offer is capturing attention
function animateScroll(now) {
  sRaf = 0;
  const dt = sLast ? Math.min(48, now - sLast) : 16; sLast = now;
  sCur += (sTarget - sCur) * (1 - Math.exp(-dt / sTau));
  if (Math.abs(sTarget - sCur) < .4) sCur = sTarget;
  selfScroll = true; scrollTo(0, sCur);
  if (sCur !== sTarget) sRaf = requestAnimationFrame(animateScroll); else { sLast = 0; scheduleSettle(); }
}
function glideTo(y, tau = 120) {
  sTarget = clamp(y, 0, maxScroll); sTau = motion.matches ? 1 : tau;
  if (!sRaf) { sCur = scrollY; sLast = 0; sRaf = requestAnimationFrame(animateScroll); }
}
function inScrollable(t) { return t && t.closest && t.closest('.chat-log, textarea'); }
function inChapters() { const u = (scrollY - journeyTop) / H; return u > P_SWAP && u < STAGE_U; }
addEventListener('wheel', e => {
  if (e.ctrlKey || !root.classList.contains('begun')) { if (!root.classList.contains('begun')) e.preventDefault(); return; }
  if (inScrollable(e.target)) return;
  if (modal) { e.preventDefault(); return; }
  let dy = e.deltaY, dx = e.deltaX;
  const unit = e.deltaMode === 1 ? 36 : e.deltaMode === 2 ? H : 1; dy *= unit; dx *= unit;
  if (Math.abs(dx) > Math.abs(dy) && inChapters()) dy = dx;
  if (held) { e.preventDefault(); if (dy < -2) unhold(); else nudgeEncounter(); return; }
  if (motion.matches) return;
  e.preventDefault();
  lastInput = performance.now(); clearTimeout(settleTimer);
  if (!sRaf) sTarget = scrollY;
  sTarget = clamp(sTarget + clamp(dy, -260, 260), 0, maxScroll);
  glideTo(sTarget, Math.abs(e.deltaY) < 40 && e.deltaMode === 0 ? 90 : 130);
}, { passive: false });
addEventListener('scroll', () => {
  const y = scrollY;
  if (sRaf && Math.abs(y - sCur) > 3) { cancelAnimationFrame(sRaf); sRaf = 0; sLast = 0; } // someone else scrolled (keys, scrollbar, anchor)
  if (selfScroll && sRaf) { selfScroll = false; return; }
  selfScroll = false;
  if (!sRaf) { sTarget = sCur = y; lastInput = performance.now(); scheduleSettle(); }
}, { passive: true });
let touchY = 0, touchX = 0;
addEventListener('touchstart', e => { touching = true; touchY = e.touches[0].clientY; touchX = e.touches[0].clientX; cancelAnimationFrame(sRaf); sRaf = 0; clearTimeout(settleTimer); }, { passive: true });
addEventListener('touchmove', e => {
  if (!root.classList.contains('begun')) { e.preventDefault(); return; }
  const y = e.touches[0].clientY, x = e.touches[0].clientX, dy = touchY - y, dx = touchX - x;
  if (modal && !inScrollable(e.target)) { e.preventDefault(); return; }
  if (held && !inScrollable(e.target)) { e.preventDefault(); if (dy < -24) unhold(); return; }
  if (!modal && inChapters() && Math.abs(dx) > Math.abs(dy) * 1.2 && !inScrollable(e.target)) {
    e.preventDefault(); selfScroll = true; scrollTo(0, clamp(scrollY + dx * 2.2, 0, maxScroll)); touchX = x; touchY = y;
  }
}, { passive: false });
addEventListener('touchend', () => { touching = false; lastInput = performance.now(); scheduleSettle(); }, { passive: true });
addEventListener('keydown', e => {
  if (!held || /INPUT|TEXTAREA/.test(document.activeElement?.tagName || '')) return;
  if (['ArrowDown', 'PageDown', ' ', 'End'].includes(e.key)) { e.preventDefault(); nudgeEncounter(); }
  if (['ArrowUp', 'PageUp', 'Home'].includes(e.key)) unhold();
});
function scheduleSettle() {
  clearTimeout(settleTimer);
  if (motion.matches) return;
  settleTimer = setTimeout(settle, touching ? 400 : 260);
}
function settle() {
  if (held || modal || touching || sRaf || performance.now() - lastInput < 200) return;
  const y = scrollY; let best = null, dist = Infinity;
  for (const r of rests) { const d = Math.abs(r - y); if (d < dist) { dist = d; best = r; } }
  if (best !== null && dist > 3 && dist < H * .3) glideTo(best, 260);
}

/* ───────────────────────── Stage: film, captions, plate, board ───────────────────────── */
let movieReady = false, loopReady = false, primed = false, vTime = 0, frame = 0, tLast = 0, lastU = -1, comicShown = false, chapterIdx = -1;
const filmSrc = () => (light || small) ? FILM.src540 : FILM.src720;
function primeMovie() {
  if (primed) return; primed = true;
  movie.src = filmSrc(); movie.preload = 'auto'; movie.load();
}
movie.addEventListener('loadeddata', () => { movieReady = true; wake(); });
movie.addEventListener('seeked', wake);
movie.addEventListener('error', () => {
  if (movie.src.includes(FILM.src720.split('/').pop()) && FILM.src540) { movie.src = FILM.src540; movie.load(); }
});
function startLoop() {
  if (loop.getAttribute('src')) return;
  loop.src = LOOP.src; loop.preload = 'auto'; loop.load();
  loop.addEventListener('playing', () => { loopReady = true; wake(); }, { once: true });
  loop.play().catch(() => {});
}
function wake() { if (!frame) frame = requestAnimationFrame(tick); }
function tick(now) {
  frame = 0;
  const dt = tLast ? Math.min(64, now - tLast) : 16.7; tLast = now;
  const u = (scrollY - journeyTop) / H;
  const target = timeAt(clamp(u, 0, FILM_U));
  vTime += (target - vTime) * (motion.matches ? 1 : 1 - Math.exp(-dt / 110));
  if (Math.abs(target - vTime) < .002) vTime = target;

  // Scout hold: crossing the hold moment going forward stops the journey until the visitor chooses.
  if (!held && scoutState === 'pending' && target >= FILM.hold && lastU >= 0 && lastU < u && u < FILM_U) hold();
  if (scoutState === 'pending' && u > uAt(FILM.hold) + .6) { scoutState = 'passed'; showDock(); }

  // Film layers
  const atSurface = u < .015;
  if (!atSurface) primeMovie();
  if (movieReady && !movie.seeking && Math.abs(movie.currentTime - vTime) > 1 / 50) movie.currentTime = Math.min(FILM.duration - .04, vTime);
  movie.classList.toggle('on', !atSurface && movieReady);
  loop.classList.toggle('on', loopReady && (atSurface || !movieReady));
  if (atSurface && loopReady && loop.paused && !document.hidden) loop.play().catch(() => {});
  if (!atSurface && !loop.paused) loop.pause();

  // Hero + captions
  const heroA = 1 - clamp(u / .75);
  hero.style.setProperty('--hero', heroA.toFixed(3)); hero.style.visibility = heroA > .002 ? 'visible' : 'hidden';
  const plateP = clamp((u - P_START) / PH.plateIn);
  for (const c of caps) {
    const [s, e] = c.win;
    let a = Math.min(clamp((vTime - s) / .45), clamp((e - vTime) / .45));
    if (c.key === 'hq') a *= 1 - clamp(plateP * 1.6);
    if (held && c.key === 'scout') a *= .0;
    c.el.style.setProperty('--a', a.toFixed(3));
    c.el.style.setProperty('--p', clamp((vTime - s) / Math.max(.1, Math.min(e, FILM.duration) - s)).toFixed(3));
    c.el.classList.toggle('vis', a > .003);
  }

  // Comic: after a declined Scout, once, while the HQ shot is on screen.
  if (scoutState === 'declined' && !comicShown && vTime >= FILM.captions.hq[0] + .8 && plateP < .2) showComic();
  if (comicEl && !comicEl.hidden && plateP > .35) hideComic();

  // Plate rises over the dimming film, then slides left as the board arrives.
  const rise = easeOut(plateP), swap = easeInOut((u - P_SWAP) / PH.swap);
  filmBox.style.setProperty('--film-bright', (1 - .5 * rise - .2 * swap).toFixed(3));
  filmBox.style.setProperty('--film-scale', (1 + .05 * rise).toFixed(4));
  plate.classList.toggle('vis', plateP > 0 && swap < 1);
  plateCard.style.setProperty('--py', ((1 - rise) * 1.12 * H).toFixed(1) + 'px');
  plateCard.style.setProperty('--px', (-swap * 1.15 * innerWidth).toFixed(1) + 'px');
  board.classList.toggle('vis', swap > 0);
  board.style.setProperty('--bx', ((1 - swap) * innerWidth).toFixed(1) + 'px');

  // Chapters: holds on each chapter, then a continuous glide to the next — scroll-driven, never a slider jump.
  const c = clamp((u - P_CH) / PH.chapter, 0, PH.chapters);
  let pos = 0;
  for (let i = 0; i < PH.chapters - 1; i++) pos += smooth((c - i - .55) / .45);
  track_.style.setProperty('--tx', (-pos * 25).toFixed(3) + '%');
  chapters.forEach((ch, i) => ch.style.setProperty('--o', (1 - clamp(Math.abs(pos - i) * 1.6)).toFixed(3)));
  dots.forEach((d, i) => d.style.setProperty('--f', clamp(c - i).toFixed(3)));
  const idx = swap < .7 ? -2 : u < P_CH + .12 ? -1 : Math.round(pos);
  if (idx !== chapterIdx) { chapterIdx = idx; highlight(idx); }

  cue.style.setProperty('--cue', (held || modal || u > STAGE_U - .5 || (small && u > P_SWAP) || performance.now() - lastInput < 900) ? '0' : '1');

  if (u !== lastU || Math.abs(target - vTime) > .002 || (movieReady && Math.abs(movie.currentTime - vTime) > 1 / 50)) wake();
  lastU = u;
}
function highlight(i) {
  const cols = $$('[data-col]', org), teams = $$('[data-team]', org);
  cols.forEach(n => n.classList.remove('on')); teams.forEach(n => n.classList.remove('on'));
  org.classList.toggle('has-focus', i >= -1);
  if (i === -1) { $('[data-col="you"]', org).classList.add('on'); return; }
  if (i < 0) return;
  const ch = chapters[i];
  ch.dataset.cols.split(' ').forEach(k => $(`[data-col="${k}"]`, org)?.classList.add('on'));
  ch.dataset.teams.split(' ').forEach(k => $(`[data-team="${k}"]`, org)?.classList.add('on'));
}
addEventListener('scroll', wake, { passive: true });
addEventListener('resize', () => { layout(); wake(); }, { passive: true });
document.addEventListener('visibilitychange', () => { if (document.hidden) loop.pause(); else { tLast = 0; wake(); } });

// Plate tilt: eased pointer tilt on desktop, a slow idle sway elsewhere.
(() => {
  let tx = 0, ty = 0, cx = 0, cy = 0, lastMove = 0, raf = 0;
  const run = now => {
    raf = 0;
    if (!plate.classList.contains('vis') || motion.matches) { plateCard.style.setProperty('--rx', '0deg'); plateCard.style.setProperty('--ry', '0deg'); return; }
    if (now - lastMove > 2500) { tx = Math.sin(now / 2600) * .35; ty = Math.cos(now / 3100) * .3; }
    cx += (tx - cx) * .07; cy += (ty - cy) * .07;
    plateCard.style.setProperty('--rx', (-cy * 7).toFixed(2) + 'deg');
    plateCard.style.setProperty('--ry', (cx * 9).toFixed(2) + 'deg');
    plateCard.style.setProperty('--gx-pos', (50 + cx * 50).toFixed(1) + '%');
    plateCard.style.setProperty('--gy-pos', (40 + cy * 50).toFixed(1) + '%');
    raf = requestAnimationFrame(run);
  };
  addEventListener('pointermove', e => {
    if (!finePointer.matches) return;
    tx = (e.clientX / innerWidth - .5) * 2; ty = (e.clientY / innerHeight - .5) * 2; lastMove = performance.now();
  }, { passive: true });
  new MutationObserver(() => { if (plate.classList.contains('vis') && !raf) raf = requestAnimationFrame(run); }).observe(plate, { attributes: true, attributeFilter: ['class'] });
})();

/* ───────────────────────── Gate ───────────────────────── */
const gate = $('#gate'), gateBtn = $('#gate-btn'), gateStatus = $('.gate-status');
function begin() {
  if (root.classList.contains('begun')) return;
  root.classList.add('begun'); root.classList.remove('locked');
  gate.classList.add('out'); setTimeout(() => gate.hidden = true, 1200);
  startLoop(); layout(); wake(); heroType(); startAnalytics();
  track('begin', { film: filmKey });
}
function runGate() {
  root.classList.add('locked');
  const t0 = performance.now();
  primeMovie();
  const poll = () => {
    if (root.classList.contains('begun')) return;
    let p = 0;
    if (movie.duration) {
      for (let i = 0; i < movie.buffered.length; i++) if (movie.buffered.start(i) <= .2) p = movie.buffered.end(i) / Math.min(12, movie.duration);
    }
    const elapsed = (performance.now() - t0) / 8000;
    const load = clamp(Math.max(p, elapsed * .9, movie.readyState >= 3 ? .35 : 0));
    gateBtn.style.setProperty('--load', load.toFixed(3));
    if (load >= .999 || (movie.readyState >= 3 && p >= 1) || motion.matches) {
      gateBtn.disabled = false; gateStatus.textContent = 'Schedule cleared.'; gateStatus.classList.add('done');
      gateBtn.focus({ preventScroll: true });
      return;
    }
    setTimeout(poll, 160);
  };
  poll();
  gateBtn.addEventListener('click', begin);
}
scrollTo(0, 0);
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Hero typed line: the first phrase holds longest.
function heroType() {
  const phrases = ['One team to make them happen.', 'Brand, website, sales and systems. Handled.', 'So the business stops needing you for everything.'];
  if (motion.matches) return;
  let i = 0;
  const cycle = async () => {
    await new Promise(r => setTimeout(r, i === 0 ? 5200 : 3400));
    const t = heroTyped.textContent;
    for (let n = t.length; n >= 0; n--) { heroTyped.textContent = t.slice(0, n); await new Promise(r => setTimeout(r, 18)); }
    i = (i + 1) % phrases.length;
    await new Promise(r => setTimeout(r, 260));
    for (let n = 1; n <= phrases[i].length; n++) { heroTyped.textContent = phrases[i].slice(0, n); await new Promise(r => setTimeout(r, 38)); }
    cycle();
  };
  cycle();
}

/* ───────────────────────── Scout ───────────────────────── */
let scoutState = store.get('cl5-scout') || 'pending'; // pending · held · decided · declined · passed
if (scoutState !== 'pending') scoutState = scoutState === 'declined' ? 'declined' : 'passed';
const enc = $('#encounter'), dock = $('#dock'), dockBtn = $('#dock-btn'), dockMenu = $('#dock-menu');
let encTyped = false, comicEl = $('#comic');
function hold() {
  held = true; cancelAnimationFrame(sRaf); sRaf = 0;
  const y = journeyTop + uAt(FILM.hold) * H; selfScroll = true; scrollTo(0, y); sTarget = sCur = y;
  enc.dataset.side = small ? 'bottom' : (FILM.scoutSide === 'right' ? 'left' : 'right');
  enc.hidden = false; enc.classList.remove('leaving');
  if (!encTyped) {
    encTyped = true;
    const lines = $$('.enc-line', enc);
    (async () => { await new Promise(r => setTimeout(r, 450)); for (const l of lines) await typeInto(l, l.dataset.type, 24); enc.classList.add('ready'); })();
  }
  track('scout_encounter');
}
function unhold() {
  if (!held) return; held = false;
  enc.classList.add('leaving'); setTimeout(() => { if (!held) enc.hidden = true; }, 500);
}
function nudgeEncounter() {
  const skip = $('.enc-skip', enc);
  skip.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
  if (!enc.classList.contains('ready')) { $$('.enc-line', enc).forEach(l => l.textContent = l.dataset.type); enc.classList.add('ready'); }
}
function decide(choice) {
  const from = $('#enc-avatar').getBoundingClientRect();
  held = false; scoutState = choice === 'skip' ? 'declined' : 'decided'; store.set('cl5-scout', scoutState);
  enc.classList.add('leaving'); setTimeout(() => enc.hidden = true, 520);
  showDock(from);
  track('scout_choice', { choice });
  if (choice === 'call') startCall();
  if (choice === 'chat') openChat();
  if (choice === 'skip') glideTo(scrollY + H * .45, 220);
}
function showDock(fromRect) {
  if (!dock.hidden) return;
  dock.hidden = false;
  if (!fromRect || motion.matches) { dock.classList.add('arrive'); return; }
  const to = dockBtn.getBoundingClientRect();
  dock.style.opacity = '0';
  const fly = document.createElement('img'); fly.src = BASE + 'media/scout-avatar.webp'; fly.className = 'fly'; fly.alt = '';
  Object.assign(fly.style, { left: to.left + 'px', top: to.top + 'px', width: to.width + 'px', height: to.height + 'px' });
  const from = fromRect, s = from.width / to.width;
  fly.style.transform = `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${s})`;
  fly.style.transformOrigin = '0 0';
  document.body.append(fly);
  requestAnimationFrame(() => requestAnimationFrame(() => { fly.style.transform = 'none'; }));
  setTimeout(() => { dock.style.opacity = ''; fly.remove(); }, 880);
}
dockBtn.addEventListener('click', () => {
  const open = dockMenu.hidden; dockMenu.hidden = !open; dockBtn.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-scout]');
  if (b) {
    const v = b.dataset.scout; dockMenu.hidden = true; dockBtn.setAttribute('aria-expanded', 'false');
    if (b.closest('#encounter')) return decide(v);
    if (v === 'call') { closeChat(); startCall(); }
    if (v === 'chat') { endCall(true); openChat(); }
    return;
  }
  if (!e.target.closest('#dock')) { dockMenu.hidden = true; dockBtn.setAttribute('aria-expanded', 'false'); }
  const close = e.target.closest('[data-close]');
  if (close) { if (close.dataset.close === 'chat') closeChat(); if (close.dataset.close === 'offer') closeOffer(); }
});
function showComic() {
  comicShown = true; comicEl.hidden = false; comicEl.classList.remove('leaving'); track('comic_shown');
}
function hideComic() { if (comicEl.hidden) return; comicEl.classList.add('leaving'); setTimeout(() => comicEl.hidden = true, 400); }
$('.comic-close', comicEl).addEventListener('click', hideComic);

/* Chat — one interface, three engines (live MCB · labelled preview · WhatsApp handoff). */
const chat = $('#chat'), log = $('#chat-log'), quick = $('#chat-quick'), chatForm = $('#chat-form'), chatInput = $('#chat-input');
let chatStarted = false, busy = false;
function addMsg(text, who = 'scout') { const p = document.createElement('p'); p.className = 'msg ' + who; p.textContent = text; log.append(p); log.scrollTop = log.scrollHeight; return p; }
function addLinkMsg(text, href, label) { const p = addMsg(text, 'scout'); const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = ' ' + label; a.style.color = 'var(--scout)'; p.append(a); }
function setQuick(list) { quick.replaceChildren(...list.map(t => { const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.onclick = () => send(t); return b; })); }
async function scoutSays(text, delay = 700) {
  const t = document.createElement('p'); t.className = 'msg scout typing'; t.innerHTML = '<i></i><i></i><i></i>'; log.append(t); log.scrollTop = log.scrollHeight;
  await new Promise(r => setTimeout(r, motion.matches ? 0 : delay + Math.min(900, text.length * 12)));
  t.remove(); return addMsg(text, 'scout');
}
function openChat(seed) {
  modal = Math.max(modal, 0);
  chat.hidden = false; showDock(); track('scout_chat_open');
  $('#chat-mode').hidden = SCOUT_MODE !== 'preview';
  if (!chatStarted) { chatStarted = true; engine.start(); }
  if (seed) send(seed);
  setTimeout(() => chatInput.focus({ preventScroll: true }), 60);
}
function closeChat() { if (chat.hidden) return; chat.hidden = true; }
chat.addEventListener('keydown', e => { if (e.key === 'Escape') closeChat(); });
chatForm.addEventListener('submit', e => { e.preventDefault(); const t = chatInput.value.trim(); if (t) send(t); });
function send(text) { if (busy) return; chatInput.value = ''; setQuick([]); addMsg(text, 'user'); engine.reply(text); }

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const phoneOf = v => { const m = v.match(/\+?\d[\d\s().-]{6,18}\d/); return m ? m[0].trim() : ''; };
const emailOf = v => { const m = v.match(/[^\s@]+@[^\s@]+\.[^\s@]{2,}/); return m ? m[0].replace(/[.,;]$/, '') : ''; };
async function submitLead(offerId, contact, note) {
  try {
    const r = await fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ offerId, contact, note: note.slice(0, 1900), key: crypto.randomUUID(), startedAt: openedAt, company_fax: '' }) });
    const j = await r.json(); return r.ok && j.accepted === true;
  } catch { return false; }
}
let openedAt = Date.now() - 5000;

const transcript = [];
const engines = {
  preview: (() => {
    let step = 0, business = '', pain = '', contact = '';
    return {
      async start() {
        busy = true;
        await scoutSays("Hey, I'm Scout. What does your business do, in a line?", 300);
        setQuick(['We make things', 'We sell a service', 'Agency or studio', 'Just looking around']); busy = false; step = 1;
      },
      async seed(text) { step = 2; return this.reply(text); },
      async reply(text) {
        busy = true; transcript.push('Visitor: ' + text);
        if (step === 1) {
          if (/just looking|around|browsing/i.test(text)) { await scoutSays("Fair. Look around, I'll be in the corner. If something makes you think 'we should have that', tap me."); busy = false; return; }
          business = text;
          await scoutSays("Nice. What eats most of your week right now? The thing you'd hand off tomorrow if you could.");
          setQuick(['Answering the same questions', 'Chasing quotes & follow-ups', 'Content and the website', 'Everything goes through me']); step = 2;
        } else if (step === 2) {
          pain = text;
          await scoutSays(`Got it. "${text.length > 70 ? text.slice(0, 68) + '…' : text}" is usually where the quickest hours come back.`);
          await scoutSays("Our team fixes this with a mix of automation and a few human touches. Not a new tool you have to babysit.", 500);
          await scoutSays("Want someone from the team to look at it properly? Leave an email or phone and I'll read it back to make sure I've got it right.", 400);
          setQuick(['Sure', 'Not now']); step = 3;
        } else if (step === 3 || step === 5) {
          const c = emailOf(text) || phoneOf(text);
          if (!c) {
            if (/not now|no|later/i.test(text)) { await scoutSays("No problem. I'll be in the corner. You know where to find me."); step = 9; }
            else await scoutSays("Go ahead and type your email or phone number.");
          } else { contact = c; await scoutSays(`Just to confirm, that's ${c.split('').join(c.includes('@') ? '' : ' ').replace(/\s+/g, ' ')}?`); setQuick(["Yes, that's right", 'Let me fix it']); step = 4; }
        } else if (step === 4) {
          if (/fix|no|wrong/i.test(text)) { await scoutSays('Sure, type it again.'); step = 5; }
          else {
            const ok = await submitLead('scout_chat', contact, `Business: ${business}\nWants to care less about: ${pain}\n\n${transcript.join('\n')}`);
            if (ok) { await scoutSays("Done. A human from the team will get back to you soon. Meanwhile, keep looking around."); track('scout_lead'); }
            else addLinkMsg("That didn't go through on my side. Mind sending it on WhatsApp instead?", wa(`Hi Maks, Scout sent me. ${business}. I'd like to care less about: ${pain}. Contact: ${contact}`), 'Open WhatsApp →');
            step = 9;
          }
        } else {
          await scoutSays("I'm a preview right now, so I'll keep it short: book a call or message Maks and you'll get a real answer.");
          addLinkMsg('', BOOKING, 'Book a call →');
        }
        busy = false;
      },
    };
  })(),
  off: {
    async start() { await scoutSays("Hey, I'm Scout. I'm off duty right now, but type what's on your mind and I'll pass it to Maks on WhatsApp.", 200); },
    async reply(text) { addLinkMsg('Ready to send.', wa("Hi Maks, I'd like to care less about: " + text), 'Open WhatsApp →'); },
  },
  live: (() => {
    // Existing public MCB widget identifiers (not an admin credential). Mirrors the provider's widget: send, then poll replies.
    const account = '625cd09c-4f5a-439a-ad55-379f6e056950', widget = window.CARELESS_SCOUT_WIDGET || 'careless-scout-staging', api = 'https://api.mychatbot.app';
    let session = store.get('cl5-scout-session') || '', timer = 0, waiting = false, deadline = 0;
    const sid = () => { if (!session) { session = [...crypto.getRandomValues(new Uint8Array(15))].map(n => n.toString(16).padStart(2, '0')).join(''); store.set('cl5-scout-session', session); } return session; };
    const req = async (path, body) => {
      const r = await fetch(api + path, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', Authorization: account + widget }, credentials: 'omit', cache: 'no-store', signal: AbortSignal.timeout(12000), ...(body ? { body: JSON.stringify(body) } : {}) });
      if (!r.ok) throw Error('transport'); return r.json();
    };
    const poll = async () => {
      clearTimeout(timer); if (chat.hidden && !waiting) return;
      try { const r = await req(`/sw-replies/${account}/${widget}/${sid()}`); if (typeof r.message === 'string' && r.message.trim()) { const tmp = document.createElement('template'); tmp.innerHTML = r.message; addMsg(tmp.content.textContent.trim()); waiting = false; busy = false; } } catch {}
      if (waiting && Date.now() > deadline) { waiting = false; busy = false; addLinkMsg("I'm slow right now. Message Maks directly?", wa(), 'WhatsApp →'); }
      timer = setTimeout(poll, waiting ? 1500 : 5000);
    };
    return {
      async start() { await scoutSays("Hey, I'm Scout. What does your business do, in a line?", 200); poll(); },
      async reply(text) {
        busy = true; waiting = true; deadline = Date.now() + 45000;
        try { await req(`/webhook/sw-widget/${account}/${widget}/${sid()}`, { action: 'my_chat_send', widget_id: widget, session: sid(), payload: { message: text, wp_context: location.origin + '/new5' } }); poll(); }
        catch { waiting = false; busy = false; addLinkMsg("I couldn't reach my desk. Message Maks instead?", wa(text), 'WhatsApp →'); }
      },
    };
  })(),
};
const engine = engines[SCOUT_MODE] || engines.preview;

/* Call — the interface changes completely. Voice provider plugs in via window.CarelessVoice:
   CarelessVoice.start({ onState(text), onLevel(0..1), onCaption(text, who) }) → Promise<{ mute(bool), end() }> */
const call = $('#call'), callState = $('#call-state'), callCap = $('#call-caption'), callTime = $('#call-time'), callOrb = $('#call-orb'), callFoot = $('#call-foot'), muteBtn = $('#call-mute');
let session_ = null, callTimer = 0, levelRaf = 0, callStart = 0, speaking = false, callToken = 0;
async function startCall() {
  if (!call.hidden) return;
  const token = ++callToken;
  modal++; call.hidden = false; call.classList.remove('leaving'); showDock(); track('scout_call_start');
  callState.textContent = 'Connecting…'; callCap.textContent = ''; callFoot.textContent = ''; callTime.textContent = '00:00';
  muteBtn.setAttribute('aria-pressed', 'false');
  setTimeout(() => $('#call-end').focus({ preventScroll: true }), 50);
  const ui = {
    onState: t => callState.textContent = t,
    onLevel: l => callOrb.style.setProperty('--level', clamp(l).toFixed(3)),
    onCaption: (t, who) => { callCap.replaceChildren(); const s = document.createElement('span'); if (who === 'user') s.className = 'you'; s.textContent = t; callCap.append(s); },
  };
  const tickTime = () => { const s = Math.floor((Date.now() - callStart) / 1000); callTime.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  if (SCOUT_MODE === 'live' && window.CarelessVoice) {
    try { session_ = await window.CarelessVoice.start(ui); if (token !== callToken) return session_?.end(); callStart = Date.now(); callTimer = setInterval(tickTime, 500); }
    catch { callState.textContent = "Couldn't connect"; previewFallback("The line didn't connect. Want to type instead?"); }
    return;
  }
  // Preview: Scout speaks his opener so the interface can be judged; clearly labelled, no microphone used.
  await new Promise(r => setTimeout(r, 1300)); if (token !== callToken) return;
  callStart = Date.now(); callTimer = setInterval(tickTime, 500); callState.textContent = 'Scout · voice preview';
  speaking = true; animateLevel();
  const lines = ["Hey, Scout here.", "Quick one before the tour: what does your business do?"];
  for (const l of lines) { if (token !== callToken) return; callCap.textContent = ''; const s = document.createElement('span'); callCap.append(s); await typeInto(s, l, 34); await new Promise(r => setTimeout(r, 600)); }
  speaking = false;
  if (token !== callToken) return;
  previewFallback('This is a preview of the call screen. The live voice line switches on before launch.');
}
function previewFallback(text) {
  callFoot.textContent = text + ' ';
  const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Continue in chat'; b.onclick = () => { endCall(true); openChat(); }; callFoot.append(b);
}
function animateLevel() {
  cancelAnimationFrame(levelRaf);
  const run = now => { const l = speaking ? .35 + .3 * Math.sin(now / 90) * Math.sin(now / 230) + Math.random() * .25 : Math.max(0, parseFloat(callOrb.style.getPropertyValue('--level') || 0) * .85); callOrb.style.setProperty('--level', clamp(l).toFixed(3)); if (speaking || l > .01) levelRaf = requestAnimationFrame(run); };
  levelRaf = requestAnimationFrame(run);
}
function endCall(silent) {
  if (call.hidden) return;
  callToken++; speaking = false; clearInterval(callTimer); cancelAnimationFrame(levelRaf);
  try { session_?.end(); } catch {} session_ = null;
  call.classList.add('leaving'); setTimeout(() => { call.hidden = true; call.classList.remove('leaving'); }, 450);
  modal = Math.max(0, modal - 1);
  if (!silent) track('scout_call_end');
}
$('#call-end').addEventListener('click', () => endCall());
muteBtn.addEventListener('click', () => { const m = muteBtn.getAttribute('aria-pressed') !== 'true'; muteBtn.setAttribute('aria-pressed', String(m)); try { session_?.mute(m); } catch {} });
call.addEventListener('keydown', e => { if (e.key === 'Escape') endCall(); });

/* ───────────────────────── Offers ───────────────────────── */
const OFFERS = {
  look: ['The 5-second test', "Send your website. We'll show you what a stranger understands in five seconds, and what they miss."],
  leak: ['The missed-enquiry check', "Tell us how enquiries reach you. We'll show who waited, who left, and roughly what they were worth."],
  shopper: ['The mystery-shopper run', "We buy from you like a stranger and send back every moment we nearly gave up."],
  needs_me: ['The "does it need me?" check', "A few questions, one page back: everything that still can't happen without you, and what it costs you in hours."],
};
const offerEl = $('#offer'), offerForm = $('#offer-form'), offerStatus = $('#offer-status'), offerContact = $('#offer-contact');
let offerId = '', offerOpener = null;
$$('[data-offer]').forEach(b => b.addEventListener('click', () => openOffer(b.dataset.offer, b)));
function openOffer(id, opener) {
  offerId = id; offerOpener = opener; openedAt = Date.now();
  $('#offer-title').textContent = OFFERS[id][0]; $('#offer-desc').textContent = OFFERS[id][1];
  offerForm.reset(); offerForm.hidden = false; offerStatus.textContent = ''; offerStatus.className = 'offer-status';
  $('#offer-wa').href = wa(`Hi Maks, I'd like ${OFFERS[id][0]}.`);
  offerEl.hidden = false; modal++; setTimeout(() => offerContact.focus({ preventScroll: true }), 60);
  track('offer_open', { offer_id: id });
}
function closeOffer() { if (offerEl.hidden) return; offerEl.hidden = true; modal = Math.max(0, modal - 1); offerOpener?.focus({ preventScroll: true }); }
offerEl.addEventListener('click', e => { if (e.target === offerEl) closeOffer(); });
offerEl.addEventListener('keydown', e => { if (e.key === 'Escape') closeOffer(); });
offerForm.addEventListener('submit', async e => {
  e.preventDefault();
  const v = offerContact.value.trim();
  let site = false; try { const u = new URL(/^https?:\/\//i.test(v) ? v : 'https://' + v); site = u.hostname.includes('.') && !v.includes('@') && !/\s/.test(v); } catch {}
  const ok = isEmail(v) || site || phoneOf(v);
  offerContact.setCustomValidity(ok ? '' : 'Add a website, email or phone number.');
  if (!offerContact.reportValidity()) return;
  const btn = $('button[type="submit"]', offerForm); btn.disabled = true; offerStatus.textContent = 'Sending…';
  const sent = await submitLead(offerId, v, $('#offer-note').value.trim());
  btn.disabled = false;
  if (sent) { offerForm.hidden = true; offerStatus.textContent = "Got it. We'll be in touch soon."; offerStatus.className = 'offer-status ok'; track('offer_submit', { offer_id: offerId }); }
  else offerStatus.textContent = "That didn't send. Try again, or use WhatsApp below.";
});
offerContact.addEventListener('input', () => offerContact.setCustomValidity(''));

/* ───────────────────────── Final form ───────────────────────── */
const finalInput = $('#final-input'), finalTalk = $('#final-talk');
let talkTimer = 0;
// Rotating placeholder: short enough for one line on a phone.
(() => {
  const ideas = ['repeating myself…', 'chasing quotes…', 'answering the same emails…', 'being the bottleneck…', 'posting on social…'];
  let i = 0;
  setInterval(() => { if (document.activeElement === finalInput || finalInput.value || motion.matches) return; i = (i + 1) % ideas.length; finalInput.placeholder = ideas[i]; }, 2600);
})();
finalInput.addEventListener('focus', () => { clearTimeout(talkTimer); talkTimer = setTimeout(() => finalTalk.hidden = false, 1000); });
finalInput.addEventListener('input', () => { finalInput.style.height = 'auto'; finalInput.style.height = Math.min(160, finalInput.scrollHeight) + 'px'; });
finalInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#final-form').requestSubmit(); } });
finalTalk.addEventListener('click', () => { track('final_talk'); startCall(); });
$('#final-form').addEventListener('submit', e => {
  e.preventDefault(); const t = finalInput.value.trim(); if (!t) { finalInput.focus(); return; }
  track('final_submit');
  if (SCOUT_MODE === 'off') { window.open(wa("Hi Maks, I'd like to care less about: " + t), '_blank', 'noopener'); return; }
  finalInput.value = '';
  if (SCOUT_MODE === 'preview') {
    chatStarted = true; log.replaceChildren(); setQuick([]);
    chat.hidden = false; showDock(); $('#chat-mode').hidden = false; track('scout_chat_open');
    addMsg("Hey, I'm Scout. You'd like to care less about…", 'scout'); addMsg(t, 'user');
    engines.preview.seed(t);
  } else openChat(t);
});

/* ───────────────────────── Boot ───────────────────────── */
layout();
runGate();
addEventListener('load', () => { layout(); wake(); });
setInterval(() => { if (!document.hidden && root.classList.contains('begun')) wake(); }, 450);
if (document.fonts) document.fonts.ready.then(layout);
window.CL5 = { film: filmKey, rests: () => rests, layout, hold, decide, startCall, openChat, openOffer, state: () => ({ scoutState, held, modal, u: (scrollY - journeyTop) / H, t: vTime }) };
})();
