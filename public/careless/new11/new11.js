/* care_less /new11 — single readable script, no build step.
   Sections: config · utilities · sound · layout · smooth scroll + settle · stage (film, plate, board) · gate · Scout (encounter, dock, chat, call) · client stories · offers · final. */
(() => {
'use strict';

/* ───────────────────────── Config ───────────────────────── */
const BASE = '/careless/shared/'; // shared film, avatar and fonts
const MEDIA = '/careless/new7/media/'; // /new11 reuses /new7's media (frozen) instead of a second copy
const LOOP = { src: '/careless/video/v1/1_loop.mp4' };
const WHATSAPP = '34641935207';
const BOOKING = 'https://zcal.co/carelessmaks/ai-map';
// 'live' = MCB widget transport (+ voice adapter if present) · 'preview' = scripted, labelled demo · 'off' = WhatsApp handoff
const SCOUT_MODE = window.CARELESS_SCOUT_MODE || 'preview';
const LEAD_ENDPOINT = '/api/new5-lead';
// The "first AI hire" capacity line (Maks: about 5 new businesses a month). Set `perMonth` to null for the general line.
const CAPACITY = { perMonth: 5 };
// zcal's embed link for the booking pop-up (zcal → the invite's menu → Embed → the https://zcal.co/i/… link in the code).
// Until it's set, every "book a call" link opens zcal in a new tab, as before.
const BOOKING_EMBED = null;

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
    src720: '/careless/shared/media/film-720-light.mp4', src540: '/careless/shared/media/film-540-light.mp4', last: '/careless/video/film-v4/film-last.webp',
    duration: 45.866667,
    map: [[0,0],[0.9,2.2],[2.1,6.8],[2.9,9.6],[4.1,15.0],[5.0,20.6],[6.6,27.2],[7.3,29.3],[8.7,34.8],[9.9,39.7],[10.8,42.9],[12.0,45.8],[12.7,45.8]],
    captions: { view:[2.8,7.1], takes:[10.0,15.2], jobs:[21.3,27.4], colony:[29.4,35.0], scout:[35.4,39.7], follow:[40.1,43.1], hq:[43.4,99] },
    hold: 39.65, scoutSide: 'left',
  },
};
// Default is the rendered film; the Blender camera blockout stays reachable at ?film=cam until its final render lands.
const filmKey = /[?&]film=cam\b/.test(location.search) || location.hash === '#cam' ? 'cam' : 'v4';
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
/* Language: English or Spanish (Spain). ?lang= wins, then the visitor's choice, then the browser.
   Fixed page text swaps from es.js; text this script writes picks its language through L(en, es). */
let lang = (location.search.match(/[?&]lang=(en|es)\b/) || [])[1] || (() => { try { return localStorage.getItem('cl-lang'); } catch { return null; } })() || ((navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en');
if (!window.CL_ES) lang = 'en';
const L = (en, es) => lang === 'es' ? es : en;
function track(name, detail = {}) {
  const event = { event: name, page: 'new11', lang, ...detail };
  (window.dataLayer = window.dataLayer || []).push(event);
  if (navigator.doNotTrack === '1') return;
  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  window.clarity('event', name);
}
function startAnalytics() {
  if (navigator.doNotTrack === '1' || !/maksnedbailo\.site$/.test(location.hostname)) return;
  const s = document.createElement('script'); s.async = true; s.src = 'https://www.clarity.ms/tag/wley84eoj3';
  const add = () => document.head.append(s);
  if ('requestIdleCallback' in window) requestIdleCallback(add, { timeout: 2000 }); else setTimeout(add, 2000);
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
const finalSec = $('#final'), humanSec = $('#human');

/* ───────────────────────── Sound: generated live, no audio files ─────────────────────────
   Sea on the surface, a low hum underground, a warm chord in the colony. Scroll speed adds air;
   Scout arrives with a chime; the sea comes back at the final pool shot. */
const sound = (() => {
  let ctx = null, out = null, on = false, duckTo = 1, lastY = 0, lastT = 0, offTimer = 0;
  const n = {}, btn = $('#sound');
  const pref = { get() { try { return localStorage.getItem('cl5-sound'); } catch { return null; } }, set(v) { try { localStorage.setItem('cl5-sound', v); } catch {} } };
  const gain = (v, to) => { const g = ctx.createGain(); g.gain.value = v; if (to) g.connect(to); return g; };
  const filter = (type, f, q, to) => { const x = ctx.createBiquadFilter(); x.type = type; x.frequency.value = f; if (q) x.Q.value = q; if (to) x.connect(to); return x; };
  const osc = (f, to, type = 'sine') => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.connect(to); o.start(); return o; };
  const lfo = (rate, depth, param) => osc(rate, gain(depth, param));
  function noise(brown) {
    const len = ctx.sampleRate * 6, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; if (brown) { last = (last + .02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w; }
    const s = ctx.createBufferSource(); s.buffer = b; s.loop = true; s.start(); return s;
  }
  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 4; comp.connect(ctx.destination);
    out = gain(0, comp);
    // A little room: one dark feedback delay shared by the chord and the chimes.
    n.space = ctx.createDelay(1); n.space.delayTime.value = .41;
    const fb = gain(.34), dark = filter('lowpass', 2200);
    n.space.connect(dark); dark.connect(fb); fb.connect(n.space); dark.connect(gain(.6, out));
    // Sea: brown noise through a low-pass, swelling on two slow, out-of-step waves.
    n.sea = gain(0, out); n.seaF = filter('lowpass', 900, .4, n.sea);
    const swell = gain(.5, n.seaF); noise(true).connect(swell);
    lfo(.085, .32, swell.gain); lfo(.031, .16, swell.gain);
    // Underground hum: low fifths with a slow beat.
    n.drone = gain(0, out); const droneF = filter('lowpass', 340, .5, n.drone);
    osc(55, gain(.55, droneF)); osc(82.41, gain(.32, droneF)); osc(82.9, gain(.18, droneF)); osc(110, gain(.08, droneF), 'triangle');
    // Phone speakers can't play 55 Hz, so the hum also lives an octave or two up, where they can.
    const upper = filter('lowpass', 900, .4, n.drone); osc(220, gain(small ? .2 : .07, upper), 'triangle'); osc(330.4, gain(small ? .1 : .035, upper), 'triangle');
    // Colony chord (A major 9), each voice breathing on its own.
    n.pad = gain(0, out); const padF = filter('lowpass', 1700, .3, n.pad); padF.connect(gain(.35, n.space));
    [220, 277.18, 329.63, 415.3, 493.88].forEach((f, i) => { const g = gain(.09, padF); osc(f, g); lfo(.07 + i * .037, .06, g.gain); });
    // Air: white noise, band-passed, driven by scroll speed.
    n.air = gain(0, out); n.airF = filter('bandpass', 700, .8, n.air); noise(false).connect(n.airF);
  }
  function chime(freqs, level = .16) {
    if (!on || !ctx) return;
    freqs.forEach((f, i) => {
      const t = ctx.currentTime + i * .13, g = gain(0, out); g.connect(n.space);
      [[f, 1], [f * 2.76, .22], [f * 5.4, .06]].forEach(([fr, a]) => { const o = osc(fr, gain(a, g)); o.stop(t + 3.2); });
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(level, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + 3);
    });
  }
  function tick() { chime([1318.5], .035); }
  function update(u, y, now) {
    if (!on || !ctx) return;
    const dt = Math.max(16, now - lastT), v = lastT ? Math.abs(y - lastY) / dt * 1000 : 0; lastY = y; lastT = now;
    const t = ctx.currentTime, set = (p, val, tau) => p.setTargetAtTime(val, t, tau);
    const down = smooth((u - 1.6) / 2.4), colony = smooth((u - 6.2) / 2.2), after = smooth((u - FILM_U) / 2);
    const fin = clamp(1 - finalSec.getBoundingClientRect().top / innerHeight);
    // The last screen is the colony again, so its chord comes back up there.
    set(n.sea.gain, .5 * (1 - down) + .1 * fin, .5);
    set(n.seaF.frequency, 360 + 900 * (1 - down) + (small ? 500 : 0), .6);
    set(n.drone.gain, .16 * down * (1 - .6 * after) * (1 - .4 * fin), .6);
    set(n.pad.gain, .34 * colony * (1 - .3 * after * (1 - fin)), .7);
    set(n.air.gain, Math.min(.2, v / 10000), .09);
    set(n.airF.frequency, 500 + Math.min(1600, v / 5), .12);
  }
  function setOn(v, save = true) {
    on = v; clearTimeout(offTimer);
    btn.setAttribute('aria-pressed', String(v)); root.classList.toggle('sound-on', v);
    if (save) pref.set(v ? 'on' : 'off');
    if (v) {
      unlockIOS();
      try { if (!ctx) build(); } catch { on = false; root.classList.remove('sound-on'); btn.hidden = true; return; }
      ctx.resume(); lastT = 0; out.gain.setTargetAtTime(.8 * duckTo, ctx.currentTime, .6); wake();
    } else if (ctx) { out.gain.setTargetAtTime(0, ctx.currentTime, .15); offTimer = setTimeout(() => ctx.suspend(), 700); }
  }
  // iPhone: Web Audio is silenced by the ring/silent switch unless the page asks for media playback.
  // Newer Safari has navigator.audioSession; older ones switch when a looping <audio> element plays.
  let unlocked = false;
  function unlockIOS() {
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch {}
    if (unlocked || !/iP(hone|ad|od)|Macintosh/.test(navigator.userAgent) || !('ontouchend' in document)) return;
    unlocked = true;
    const rate = 8000, len = rate / 2, b = new DataView(new ArrayBuffer(44 + len));
    [[0, 'RIFF'], [8, 'WAVE'], [12, 'fmt '], [36, 'data']].forEach(([o, t]) => [...t].forEach((c, i) => b.setUint8(o + i, c.charCodeAt(0))));
    b.setUint32(4, 36 + len, true); b.setUint32(16, 16, true); b.setUint16(20, 1, true); b.setUint16(22, 1, true);
    b.setUint32(24, rate, true); b.setUint32(28, rate, true); b.setUint16(32, 1, true); b.setUint16(34, 8, true); b.setUint32(40, len, true);
    for (let i = 0; i < len; i++) b.setUint8(44 + i, 128);
    const a = new Audio(URL.createObjectURL(new Blob([b], { type: 'audio/wav' }))); a.loop = true; a.setAttribute('playsinline', ''); a.play().catch(() => {});
  }
  // Safari can park the context ("interrupted") after a call or a lock screen; any tap wakes it again.
  addEventListener('touchend', () => { if (on && ctx && ctx.state !== 'running') ctx.resume(); }, { passive: true });
  btn.addEventListener('click', () => { setOn(!on); track('sound', { on }); });
  document.addEventListener('visibilitychange', () => { if (!ctx || !on) return; document.hidden ? ctx.suspend() : ctx.resume(); });
  if (!(window.AudioContext || window.webkitAudioContext)) btn.hidden = true;
  return {
    start(want) { setOn(want && pref.get() !== 'off', false); },
    duck(level) { duckTo = level; if (on && ctx) out.gain.setTargetAtTime(.8 * level, ctx.currentTime, .3); },
    update, chime, tick,
    get on() { return on; },
  };
})();

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
  const hqRest = px(uAt(FILM.captions.hq[0] + .6) + .35);
  rests.push(hqRest);
  rests.push(px(P_START + PH.plateIn + PH.plateHold * .5));
  for (let i = 0; i < PH.chapters; i++) rests.push(px(P_CH + i * PH.chapter + PH.chapter * .3));
  // The settle only works inside the pinned film. "Say it once" and the last screen scroll freely, so they are not rests.
  stageEnd = px(STAGE_U);
  const mid = k => px(uAt((FILM.captions[k][0] + FILM.captions[k][1]) / 2));
  RAIL = [['view', mid('view')], ['takes', mid('takes')], ['colony', mid('colony')], ['scout', px(uAt(FILM.hold))], ['hq', hqRest],
    ['board', px(P_CH + PH.chapter * .3)], ['human', humanSec.getBoundingClientRect().top + scrollY], ['final', Math.min(maxScroll, finalSec.getBoundingClientRect().top + scrollY)]];
}
let stageEnd = Infinity;
let RAIL = [];

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
  maxScroll = document.documentElement.scrollHeight - innerHeight;
  sTarget = clamp(y, 0, maxScroll); sTau = motion.matches ? 1 : tau;
  if (!sRaf) { sCur = scrollY; sLast = 0; sRaf = requestAnimationFrame(animateScroll); }
}
function inScrollable(t) { return t && t.closest && t.closest('.chat-log, textarea, .offer-card'); }
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
  maxScroll = document.documentElement.scrollHeight - innerHeight;
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
let touchY = 0, touchX = 0, swipeX0 = 0, swiping = false;
addEventListener('touchstart', e => { touching = true; touchY = e.touches[0].clientY; touchX = swipeX0 = e.touches[0].clientX; swiping = false; cancelAnimationFrame(sRaf); sRaf = 0; clearTimeout(settleTimer); }, { passive: true });
addEventListener('touchmove', e => {
  if (!root.classList.contains('begun')) { e.preventDefault(); return; }
  const y = e.touches[0].clientY, x = e.touches[0].clientX, dy = touchY - y, dx = touchX - x;
  if (modal && !inScrollable(e.target)) { e.preventDefault(); return; }
  if (held && !inScrollable(e.target)) { e.preventDefault(); if (dy < -24) unhold(); return; }
  // A sideways swipe over the chapters turns exactly one page (on release), however long or fast it is.
  if (!modal && inChapters() && (swiping || Math.abs(dx) > Math.abs(dy) * 1.2) && !inScrollable(e.target)) { e.preventDefault(); swiping = true; }
}, { passive: false });
addEventListener('touchend', e => {
  touching = false; lastInput = performance.now();
  if (swiping) {
    swiping = false;
    const dx = swipeX0 - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 36) return stepChapter(dx > 0 ? 1 : -1);
  }
  scheduleSettle();
}, { passive: true });
function stepChapter(d) {
  const pages = rests.slice(-PH.chapters), u = (scrollY - journeyTop) / H;
  const at = clamp(Math.round((u - P_CH - PH.chapter * .3) / PH.chapter), 0, PH.chapters - 1);
  // Past the last chapter the swipe carries on to "Say it once"; before the first, back to the plate.
  const y = at + d >= PH.chapters ? humanSec.getBoundingClientRect().top + scrollY : at + d < 0 ? rests[rests.length - PH.chapters - 1] : pages[at + d];
  glideTo(y, 240); track('chapter_swipe', { to: at + d });
}
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
  if (y > stageEnd - H * .5) return;
  for (const r of rests) { const d = Math.abs(r - y); if (d < dist) { dist = d; best = r; } }
  if (best !== null && dist > 3 && dist < H * .3) glideTo(best, 260);
}

/* ───────────────────────── Stage: film, captions, plate, board ───────────────────────── */
let movieReady = false, loopReady = false, primed = false, vTime = 0, frame = 0, tLast = 0, lastU = -1, comicShown = false, chapterIdx = -1, dockMini = false, dockAway = false, typing = false, railIdx = -2, duckLevel = 1, holdY = 0, comicAt = 0;
const rail = $('#rail'), railBtns = $$('button', rail), progress = $('#progress');
rail.addEventListener('click', e => {
  const b = e.target.closest('[data-go]'); if (!b) return;
  const at = RAIL.find(r => r[0] === b.dataset.go)[1];
  // Jumping past Scout counts as walking past him: he waits in the corner instead of stopping the glide.
  if (scoutState === 'pending' && at > journeyTop + uAt(FILM.hold) * H + 4) { scoutState = 'passed'; showDock(); }
  if (held) unhold();
  glideTo(at, 420); track('rail_jump', { to: b.dataset.go });
});
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
  // While he's talking, keep the page pinned: a phone's momentum scroll can't carry the visitor past him.
  if (held && Math.abs(scrollY - holdY) > 2) { selfScroll = true; scrollTo(0, holdY); }
  if (!held && scoutState === 'pending' && u > uAt(FILM.hold) + .6) { scoutState = 'passed'; showDock(); }

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

  // Comic: after a declined Scout, once per visit, the moment the visitor reaches HQ going forward,
  // even if a fast swipe jumps straight past it. It stays at least 6 s, then leaves once the plate is up
  // (or right away if they scroll back above Scout).
  const hqU = uAt(FILM.captions.hq[0] + .5);
  if (scoutState === 'declined' && !comicShown && lastU >= 0 && lastU < hqU && u >= hqU) showComic();
  if (comicEl && !comicEl.hidden && ((plateP > .35 && performance.now() - comicAt > 6000) || u < uAt(FILM.hold) - .2)) hideComic();

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
  // Phones: through the four chapters Scout folds into a small solid pill that glides to the bottom centre, low enough to clear the buttons.
  // Tapping it, or leaving the chapters, glides it back into the full avatar in the corner.
  const mini = small && !dock.hidden && swap > .98 && u < STAGE_U - .05 && dockMenu.hidden && chat.hidden && call.hidden && !modal;
  if (mini !== dockMini) {
    dockMini = mini;
    const off = (dock.getBoundingClientRect().right - 32) - innerWidth / 2; // corner avatar centre, measured from the screen centre
    dockPill.style.setProperty('--dx', off.toFixed(1) + 'px'); dockBtn.style.setProperty('--mx', (-off).toFixed(1) + 'px');
    dockBtn.classList.toggle('mini', mini); dockPill.classList.toggle('on', mini);
  }
  // The last screen has its own "Call Scout", so the corner one steps aside there (and while a phone keyboard is up).
  const away = finalSec.getBoundingClientRect().top < H * .4 || typing;
  if (away !== dockAway) { dockAway = away; dock.classList.toggle('away', away); if (away && !dockMenu.hidden) { dockMenu.hidden = true; dockBtn.setAttribute('aria-expanded', 'false'); } }

  cue.style.setProperty('--cue', (held || modal || u > STAGE_U - .5 || (small && u > P_SWAP) || performance.now() - lastInput < 900) ? '0' : '1');

  // Rail + progress line
  const y = scrollY;
  let ri = -1; RAIL.forEach(([, at], i) => { if (y >= at - H * .35) ri = i; });
  if (ri !== railIdx) { railIdx = ri; railBtns.forEach((b, i) => { b.classList.toggle('on', i === ri); b.classList.toggle('past', i < ri); if (i === ri) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); }); }
  rail.classList.toggle('away', held || modal > 0);
  progress.style.transform = `scaleX(${clamp(y / (maxScroll || 1)).toFixed(4)})`;
  sound.update(u, y, now);
  const level = !call.hidden ? .2 : !storiesEl.hidden && storyFrame.classList.contains('loud') ? .04 : !storiesEl.hidden ? .4 : !offerEl.hidden ? .5 : !chat.hidden ? .55 : 1;
  if (level !== duckLevel) { duckLevel = level; sound.duck(level); }

  if (u !== lastU || Math.abs(target - vTime) > .002 || (movieReady && Math.abs(movie.currentTime - vTime) > 1 / 50)) wake();
  lastU = u;
}
function highlight(i) {
  if (i >= 0) sound.tick();
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
const gate = $('#gate'), gateBtn = $('#gate-btn'), gateStatus = $('.gate-status'), gateQuiet = $('#gate-quiet');
function begin(withSound = true) {
  if (root.classList.contains('begun')) return;
  root.classList.add('begun'); root.classList.remove('locked');
  gate.classList.add('out'); setTimeout(() => gate.hidden = true, 1200);
  sound.start(withSound); rail.hidden = false;
  if (scoutState !== 'pending') setTimeout(() => showDock(), 1400); // met him earlier this visit: he waits in the corner
  startLoop(); layout(); wake(); heroType(); startAnalytics();
  track('begin', { film: filmKey, sound: withSound });
}
// The first line notices who's here and when: late nights, early starts, weekends, second visits.
// Returns a function so the line can be said again in the other language.
function greeting() {
  const d = new Date(), h = d.getHours();
  let seen = false; try { seen = !!localStorage.getItem('cl5-seen'); localStorage.setItem('cl5-seen', '1'); } catch {}
  const time = loc => d.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' }), day = loc => d.toLocaleDateString(loc, { weekday: 'long' });
  return () => {
    const tail = L('Clearing your schedule…', 'Despejando tu agenda…');
    if (seen) return L('Welcome back. ', 'Hola de nuevo. ') + tail;
    if (h >= 21 || h < 5) return L(`It's ${time('en-GB')}. Still working? `, `${h === 1 ? 'Es la' : 'Son las'} ${time('es-ES')}. ¿Todavía trabajando? `) + tail;
    if (h < 8) return L('Early start. ', 'Madrugón. ') + tail;
    if (d.getDay() === 0 || d.getDay() === 6) return L(`It's ${day('en-GB')}. `, `Es ${day('es-ES')}. `) + tail;
    return tail;
  };
}
let greet = () => '', gateDone = false;
const pageTitle = document.title;
document.addEventListener('visibilitychange', () => {
  if (!root.classList.contains('begun')) return;
  document.title = !document.hidden ? pageTitle : scoutState === 'pending' ? L('Scout is waiting for you…', 'Scout te está esperando…') : L("The colony's still working…", 'La colonia sigue trabajando…');
});
function runGate() {
  root.classList.add('locked');
  greet = greeting(); gateStatus.textContent = greet();
  gateQuiet.addEventListener('click', () => begin(false));
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
    const readable = performance.now() - t0 > 2400; // let the greeting be read, even when the film is cached
    gateBtn.style.setProperty('--load', (readable ? load : Math.min(load, (performance.now() - t0) / 2400)).toFixed(3));
    if ((readable && (load >= .999 || (movie.readyState >= 3 && p >= 1))) || motion.matches) {
      gateDone = true; gateBtn.disabled = false; gateQuiet.disabled = false; gateStatus.textContent = L('Schedule cleared.', 'Agenda despejada.'); gateStatus.classList.add('done');
      gateBtn.focus({ preventScroll: true });
      return;
    }
    setTimeout(poll, 160);
  };
  poll();
  gateBtn.addEventListener('click', () => begin(true));
}
scrollTo(0, 0);
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Hero typed line: the first phrase holds longest.
function heroType() {
  const phrases = () => L(['One team to make them happen.', 'Brand, website, sales and systems. Handled.', 'So the business stops needing you for everything.'],
    ['Un equipo para hacerlo realidad.', 'Marca, web, ventas y sistemas. Resuelto.', 'Para que tu negocio deje de necesitarte para todo.']);
  if (motion.matches) return;
  let i = 0;
  const cycle = async () => {
    await new Promise(r => setTimeout(r, i === 0 ? 5200 : 3400));
    const t = heroTyped.textContent;
    for (let n = t.length; n >= 0; n--) { heroTyped.textContent = t.slice(0, n); await new Promise(r => setTimeout(r, 18)); }
    i = (i + 1) % 3;
    await new Promise(r => setTimeout(r, 260));
    const next = phrases()[i];
    for (let n = 1; n <= next.length; n++) { heroTyped.textContent = next.slice(0, n); await new Promise(r => setTimeout(r, 38)); }
    cycle();
  };
  cycle();
}

/* ───────────────────────── Scout ───────────────────────── */
let scoutState = store.get('cl5-scout') || 'pending'; // pending · held · decided · declined · passed
if (scoutState !== 'pending') scoutState = scoutState === 'declined' ? 'declined' : 'passed';
const enc = $('#encounter'), dock = $('#dock'), dockBtn = $('#dock-btn'), dockMenu = $('#dock-menu'), dockPill = $('#dock-pill');
let encTyped = false, comicEl = $('#comic');
function hold() {
  held = true; cancelAnimationFrame(sRaf); sRaf = 0;
  const y = holdY = journeyTop + uAt(FILM.hold) * H; selfScroll = true; scrollTo(0, y); sTarget = sCur = y;
  enc.dataset.side = small ? 'bottom' : (FILM.scoutSide === 'right' ? 'left' : 'right');
  enc.hidden = false; enc.classList.remove('leaving');
  sound.chime([659.25, 987.77]);
  if (navigator.vibrate && !finePointer.matches) try { navigator.vibrate(12); } catch {}
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
dockPill.addEventListener('click', () => dockBtn.click());
dock.addEventListener('animationend', e => { if (e.target === dock) dock.classList.remove('arrive'); });
// Phones: hide the corner Scout while the keyboard is up, so he never sits half under it.
if (small) {
  const field = t => t.matches && t.matches('input:not([type=checkbox]):not([type=radio]), textarea');
  document.addEventListener('focusin', e => { if (field(e.target)) { typing = true; wake(); } });
  document.addEventListener('focusout', e => { if (field(e.target)) { typing = false; wake(); } });
}
// Tapping Scout while his chat is open minimises it; otherwise it opens the call/message menu.
dockBtn.addEventListener('click', () => {
  if (!chat.hidden) { closeChat(); return; }
  const open = dockMenu.hidden; dockMenu.hidden = !open; dockBtn.setAttribute('aria-expanded', String(open)); wake();
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
  if (!e.target.closest('#dock, #dock-pill') && !dockMenu.hidden) { dockMenu.hidden = true; dockBtn.setAttribute('aria-expanded', 'false'); wake(); }
  const close = e.target.closest('[data-close]');
  if (close) { if (close.dataset.close === 'chat') closeChat(); if (close.dataset.close === 'offer') closeOffer(); if (close.dataset.close === 'stories') closeStories(); if (close.dataset.close === 'booking') closeBooking(); }
});
function showComic() {
  comicAt = performance.now();
  comicShown = true; comicEl.hidden = false; comicEl.classList.remove('leaving'); track('comic_shown');
}
function hideComic() { if (comicEl.hidden) return; comicEl.classList.add('leaving'); setTimeout(() => comicEl.hidden = true, 400); }
$('.comic-close', comicEl).addEventListener('click', hideComic);

/* Chat — one interface, three engines (live MCB · labelled preview · WhatsApp handoff). */
const chat = $('#chat'), log = $('#chat-log'), quick = $('#chat-quick'), chatForm = $('#chat-form'), chatInput = $('#chat-input');
let chatStarted = false, busy = false;
const toBottom = () => requestAnimationFrame(() => { log.scrollTop = log.scrollHeight; });
function addMsg(text, who = 'scout') { const p = document.createElement('p'); p.className = 'msg ' + who; p.textContent = text; log.append(p); toBottom(); return p; }
function addLinkMsg(text, href, label) { const p = addMsg(text, 'scout'); const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = ' ' + label; a.style.color = 'var(--scout)'; p.append(a); }
function setQuick(list) { quick.replaceChildren(...list.map(t => { const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.onclick = () => send(t); return b; })); quick.scrollLeft = 0; toBottom(); }
async function scoutSays(text, delay = 700) {
  const t = document.createElement('p'); t.className = 'msg scout typing'; t.innerHTML = '<i></i><i></i><i></i>'; log.append(t); toBottom();
  await new Promise(r => setTimeout(r, motion.matches ? 0 : delay + Math.min(900, text.length * 12)));
  t.remove(); return addMsg(text, 'scout');
}
function openChat(seed) {
  modal = Math.max(modal, 0);
  chat.hidden = false; chat.classList.remove('leaving'); showDock(); track('scout_chat_open');
  $('#chat-mode').hidden = SCOUT_MODE !== 'preview';
  if (!chatStarted) { chatStarted = true; engine.start(); }
  if (seed) send(seed);
  setTimeout(() => chatInput.focus({ preventScroll: true }), 60);
}
function closeChat() {
  if (chat.hidden || chat.classList.contains('leaving')) return;
  if (motion.matches) { chat.hidden = true; return; }
  chat.classList.add('leaving'); setTimeout(() => { chat.hidden = true; chat.classList.remove('leaving'); }, 300);
}
chat.addEventListener('keydown', e => { if (e.key === 'Escape') closeChat(); });
chatForm.addEventListener('submit', e => { e.preventDefault(); const t = chatInput.value.trim(); if (t) send(t); });
function send(text) { if (busy) return; chatInput.value = ''; setQuick([]); addMsg(text, 'user'); engine.reply(text); }

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const phoneOf = v => { const m = v.match(/\+?\d[\d\s().-]{6,18}\d/); return m ? m[0].trim() : ''; };
const emailOf = v => { const m = v.match(/[^\s@]+@[^\s@]+\.[^\s@]{2,}/); return m ? m[0].replace(/[.,;]$/, '') : ''; };
async function submitLead(offerId, contact, note) {
  try {
    const r = await fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ offerId, contact, note: note.slice(0, 1900), key: crypto.randomUUID(), startedAt: openedAt, company_fax: '', page: 'new11' }) });
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
        await scoutSays(L("Hey, I'm Scout. What does your business do, in a line?", 'Hola, soy Scout. ¿A qué se dedica tu negocio, en una frase?'), 300);
        setQuick(L(['We make things', 'We sell a service', 'Agency or studio', 'Just looking around'], ['Fabricamos algo', 'Vendemos un servicio', 'Agencia o estudio', 'Solo estoy mirando'])); busy = false; step = 1;
      },
      async seed(text) { step = 2; return this.reply(text); },
      async reply(text) {
        busy = true; transcript.push('Visitor: ' + text);
        if (step === 1) {
          if (/just looking|around|browsing|mirando|vistazo|cotilleando/i.test(text)) { await scoutSays(L("Fair. Look around, I'll be in the corner. If something makes you think 'we should have that', tap me.", 'Normal. Echa un vistazo, estaré en la esquina. Si algo te hace pensar «esto lo queremos», tócame.')); busy = false; return; }
          business = text;
          await scoutSays(L("Nice. What eats most of your week right now? The thing you'd hand off tomorrow if you could.", '¡Bien! ¿Qué se come la mayor parte de tu semana? Eso que delegarías mañana si pudieras.'));
          setQuick(L(['Answering the same questions', 'Chasing quotes & follow-ups', 'Content and the website', 'Everything goes through me'], ['Responder siempre lo mismo', 'Perseguir presupuestos', 'El contenido y la web', 'Todo pasa por mí'])); step = 2;
        } else if (step === 2) {
          pain = text;
          const said = text.length > 70 ? text.slice(0, 68) + '…' : text;
          await scoutSays(L(`Got it. "${said}" is usually where the quickest hours come back.`, `Entendido. «${said}» suele ser donde antes se recuperan horas.`));
          await scoutSays(L("Our team fixes this with a mix of automation and a few human touches. Not a new tool you have to babysit.", 'El equipo lo resuelve con una mezcla de automatización y algún toque humano. No otra herramienta que tengas que vigilar.'), 500);
          await scoutSays(L("Want someone from the team to look at it properly? Leave an email or phone and I'll read it back to make sure I've got it right.", '¿Quieres que alguien del equipo lo mire con calma? Déjame un email o un teléfono y te lo repito para confirmar que lo tengo bien.'), 400);
          setQuick(L(['Sure', 'Not now'], ['Vale', 'Ahora no'])); step = 3;
        } else if (step === 3 || step === 5) {
          const c = emailOf(text) || phoneOf(text);
          if (!c) {
            if (/not now|no|later|luego|después/i.test(text)) { await scoutSays(L("No problem. I'll be in the corner. You know where to find me.", 'Sin problema. Estaré en la esquina. Ya sabes dónde encontrarme.')); step = 9; }
            else await scoutSays(L("Go ahead and type your email or phone number.", 'Adelante, escribe tu email o tu teléfono.'));
          } else { contact = c; const spelt = c.split('').join(c.includes('@') ? '' : ' ').replace(/\s+/g, ' '); await scoutSays(L(`Just to confirm, that's ${spelt}?`, `Para confirmar: ${spelt}, ¿correcto?`)); setQuick(L(["Yes, that's right", 'Let me fix it'], ['Sí, correcto', 'Lo corrijo'])); step = 4; }
        } else if (step === 4) {
          if (/fix|no|wrong|corrijo|mal/i.test(text)) { await scoutSays(L('Sure, type it again.', 'Claro, escríbelo de nuevo.')); step = 5; }
          else {
            const ok = await submitLead('scout_chat', contact, `Language: ${lang}\nBusiness: ${business}\nWants to care less about: ${pain}\n\n${transcript.join('\n')}`);
            if (ok) { await scoutSays(L("Done. A human from the team will get back to you soon. Meanwhile, keep looking around.", 'Hecho. Una persona del equipo te escribirá pronto. Mientras, sigue mirando.')); track('scout_lead'); }
            else addLinkMsg(L("That didn't go through on my side. Mind sending it on WhatsApp instead?", 'No me ha llegado bien. ¿Te importa enviarlo por WhatsApp?'), wa(L(`Hi Maks, Scout sent me. ${business}. I'd like to care less about: ${pain}. Contact: ${contact}`, `Hola Maks, vengo de parte de Scout. ${business}. Me gustaría preocuparme menos por: ${pain}. Contacto: ${contact}`)), L('Open WhatsApp →', 'Abrir WhatsApp →'));
            step = 9;
          }
        } else {
          await scoutSays(L("I'm a preview right now, so I'll keep it short: book a call or message Maks and you'll get a real answer.", 'Ahora mismo soy una vista previa, así que seré breve: reserva una llamada o escribe a Maks y tendrás una respuesta de verdad.'));
          addLinkMsg('', BOOKING, L('Book a call →', 'Reservar llamada →'));
        }
        busy = false;
      },
    };
  })(),
  off: {
    async start() { await scoutSays(L("Hey, I'm Scout. I'm off duty right now, but type what's on your mind and I'll pass it to Maks on WhatsApp.", 'Hola, soy Scout. Ahora no estoy de guardia, pero escribe lo que tengas en mente y se lo paso a Maks por WhatsApp.'), 200); },
    async reply(text) { addLinkMsg(L('Ready to send.', 'Listo para enviar.'), wa(L("Hi Maks, I'd like to care less about: ", 'Hola Maks, me gustaría preocuparme menos por: ') + text), L('Open WhatsApp →', 'Abrir WhatsApp →')); },
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
      if (waiting && Date.now() > deadline) { waiting = false; busy = false; addLinkMsg(L("I'm slow right now. Message Maks directly?", 'Voy lento ahora mismo. ¿Escribes directamente a Maks?'), wa(), 'WhatsApp →'); }
      timer = setTimeout(poll, waiting ? 1500 : 5000);
    };
    return {
      async start() { await scoutSays(L("Hey, I'm Scout. What does your business do, in a line?", 'Hola, soy Scout. ¿A qué se dedica tu negocio, en una frase?'), 200); poll(); },
      async reply(text) {
        busy = true; waiting = true; deadline = Date.now() + 45000;
        try { await req(`/webhook/sw-widget/${account}/${widget}/${sid()}`, { action: 'my_chat_send', widget_id: widget, session: sid(), payload: { message: text, wp_context: location.origin + '/new10' } }); poll(); }
        catch { waiting = false; busy = false; addLinkMsg(L("I couldn't reach my desk. Message Maks instead?", 'No consigo llegar a mi mesa. ¿Escribes a Maks?'), wa(text), 'WhatsApp →'); }
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
  callState.textContent = L('Connecting…', 'Conectando…'); callCap.textContent = ''; callFoot.textContent = ''; callTime.textContent = '00:00';
  muteBtn.setAttribute('aria-pressed', 'false'); muteBtn.setAttribute('aria-label', L('Mute microphone', 'Silenciar micrófono'));
  setTimeout(() => $('#call-end').focus({ preventScroll: true }), 50);
  const ui = {
    onState: t => callState.textContent = t,
    onLevel: l => callOrb.style.setProperty('--level', clamp(l).toFixed(3)),
    onCaption: (t, who) => { callCap.replaceChildren(); const s = document.createElement('span'); if (who === 'user') s.className = 'you'; s.textContent = t; callCap.append(s); },
  };
  const tickTime = () => { const s = Math.floor((Date.now() - callStart) / 1000); callTime.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  if (SCOUT_MODE === 'live' && window.CarelessVoice) {
    try { session_ = await window.CarelessVoice.start(ui); if (token !== callToken) return session_?.end(); callStart = Date.now(); callTimer = setInterval(tickTime, 500); }
    catch { callState.textContent = L("Couldn't connect", 'No se pudo conectar'); previewFallback(L("The line didn't connect. Want to type instead?", 'La llamada no conectó. ¿Prefieres escribir?')); }
    return;
  }
  // Preview: Scout speaks his opener so the interface can be judged; clearly labelled, no microphone used.
  await new Promise(r => setTimeout(r, 1300)); if (token !== callToken) return;
  callStart = Date.now(); callTimer = setInterval(tickTime, 500); callState.textContent = L('Scout · voice preview', 'Scout · vista previa de voz');
  speaking = true; animateLevel();
  const lines = L(["Hey, Scout here.", "Quick one before the tour: what does your business do?"], ['Hola, aquí Scout.', 'Una rápida antes de la visita: ¿a qué se dedica tu negocio?']);
  for (const l of lines) { if (token !== callToken) return; callCap.textContent = ''; const s = document.createElement('span'); callCap.append(s); await typeInto(s, l, 34); await new Promise(r => setTimeout(r, 600)); }
  speaking = false;
  if (token !== callToken) return;
  previewFallback(L('This is a preview of the call screen. The live voice line switches on before launch.', 'Esto es una vista previa de la pantalla de llamada. La voz en directo se activa antes del lanzamiento.'));
}
function previewFallback(text) {
  callFoot.textContent = text + ' ';
  const b = document.createElement('button'); b.type = 'button'; b.textContent = L('Continue in chat', 'Seguir en el chat'); b.onclick = () => { endCall(true); openChat(); }; callFoot.append(b);
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
muteBtn.addEventListener('click', () => { const m = muteBtn.getAttribute('aria-pressed') !== 'true'; muteBtn.setAttribute('aria-pressed', String(m)); muteBtn.setAttribute('aria-label', m ? L('Unmute microphone', 'Activar micrófono') : L('Mute microphone', 'Silenciar micrófono')); try { session_?.mute(m); } catch {} });
call.addEventListener('keydown', e => { if (e.key === 'Escape') endCall(); });

/* ───────────────────────── Client stories ───────────────────────── */
// Real feedback, ported from /old2: two founders on camera, then written reviews, then one closing card.
// `es` holds the Spanish; written reviews shown in Spanish are labelled as translated.
// It behaves like a phone story: videos start on their own, tap right for next, left for back, hold to pause.
const STORIES = [
  { video: 'garrett', name: 'Garrett Williams', role: 'Econocraft Materials · USA', cap: 'Garrett, in his own words.', fit: true, es: { role: 'Econocraft Materials · EE. UU.', cap: 'Garrett, en sus propias palabras.' } },
  { video: 'aj', name: 'AJ', role: 'Folkrm · USA', cap: 'AJ, in his own words.', es: { role: 'Folkrm · EE. UU.', cap: 'AJ, en sus propias palabras.' } },
  { quote: "Wow Maks — this is f***ing awesome!! I need to check properly on my laptop but I am amazed! You're a genius!! Thank you!!", name: 'Corinna C.', role: 'Edible Health · UK', es: { role: 'Edible Health · Reino Unido', quote: '¡Wow, Maks, esto es j***damente increíble! Tengo que mirarlo bien en el portátil, ¡pero estoy alucinando! ¡Eres un genio! ¡¡Gracias!!' } },
  { quote: 'Maksym really took the time to understand our business requirements and came up with creative solutions that perfectly matched what we needed. He was very responsive and easy to work with throughout the entire process.', name: 'Sophie M.', es: { quote: 'Maksym se tomó el tiempo de entender de verdad lo que necesitaba nuestro negocio y propuso soluciones creativas que encajaban a la perfección. Respondía rápido y fue muy fácil trabajar con él durante todo el proceso.' } },
  { quote: 'Maksym was a fantastic partner on this project. His attention to detail and willingness to iterate until we got it just right made all the difference.', name: 'David W.', es: { quote: 'Maksym fue un gran compañero en este proyecto. Su atención al detalle y sus ganas de iterar hasta dejarlo perfecto marcaron la diferencia.' } },
  { quote: 'You are so great to work with! Thank you so much for all your hard work and for being so patient with all of my changes.', name: 'Michelle K.', es: { quote: '¡Es un placer trabajar contigo! Muchísimas gracias por todo tu trabajo y por tener tanta paciencia con todos mis cambios.' } },
  { quote: 'Excellent communication and very quick to understand what I was looking for. Delivered high-quality work with great attention to detail.', name: 'Daniel R.', es: { quote: 'Comunicación excelente y muy rápido en entender lo que buscaba. Entregó un trabajo de gran calidad, cuidado hasta el detalle.' } },
  { quote: 'Maksym is very professional, responsive, and attentive to details. He really took the time to understand our brand and vision.', name: 'Tom H.', es: { quote: 'Maksym es muy profesional, responde rápido y cuida los detalles. Se tomó el tiempo de entender de verdad nuestra marca y nuestra visión.' } },
  { quote: 'Maksym delivered exactly what we needed. He was proactive with suggestions and very responsive throughout the project.', name: 'Laura P.', es: { quote: 'Maksym entregó justo lo que necesitábamos. Propuso ideas por iniciativa propia y respondió rápido durante todo el proyecto.' } },
  { quote: 'Professional, creative, and great at understanding the business needs behind the design request. Communication was top-notch.', name: 'Sarah L.', es: { quote: 'Profesional, creativo y muy bueno entendiendo lo que necesita el negocio detrás de cada encargo de diseño. Una comunicación de primera.' } },
  { quote: 'Maksym understood the brief quickly and delivered exactly what was needed. Communication was excellent throughout.', name: 'Eleanor K.', es: { quote: 'Maksym entendió el encargo enseguida y entregó exactamente lo que hacía falta. La comunicación fue excelente de principio a fin.' } },
  { quote: 'Great communication, very responsive, and delivered the work on time with high quality. Would definitely work with him again.', name: 'Rachel T.', es: { quote: 'Gran comunicación, responde muy rápido y entregó a tiempo y con mucha calidad. Sin duda volvería a trabajar con él.' } },
  { quote: 'Maksym is a great designer who listens carefully to what you need and delivers great results. Very responsive and professional.', name: 'Anna G.', es: { quote: 'Maksym es un gran diseñador: escucha con atención lo que necesitas y consigue resultados excelentes. Muy rápido y muy profesional.' } },
  { quote: 'Very easy to work with, excellent communication, and always available for feedback and revisions.', name: 'Chris B.', es: { quote: 'Muy fácil trabajar con él, comunicación excelente y siempre disponible para comentarios y cambios.' } },
  { quote: 'Maksym was a pleasure to work with and very very talented.', name: 'James T.', es: { quote: 'Un placer trabajar con Maksym, y con muchísimo talento.' } },
  { end: true },
];
const storiesEl = $('#stories'), storyFrame = $('#story-frame'), storyBars = $('#story-bars'), storyStage = $('#story-stage'), storyWho = $('#story-who'), storyMuteBtn = $('#story-mute');
const QUOTE_MS = 6500;
let storyIdx = 0, storyRaf = 0, storyLast = 0, storyElapsed = 0, storyPaused = false, storyDown = 0, storyHold = 0, storyOpener = null, storyMuted = true, storyMuteChoice = null, storyBlocked = false;
// One video element for every clip: once a tap has let it play with sound, iPhone keeps letting it.
const storyVideo = document.createElement('video');
storyVideo.playsInline = true; storyVideo.setAttribute('playsinline', ''); storyVideo.preload = 'auto'; storyVideo.disablePictureInPicture = true;
const media = name => MEDIA + name;
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
const current = () => STORIES[storyIdx];
const sv = (st, k) => (lang === 'es' && st.es && st.es[k]) || st[k];
function openStories(i = 0, opener) {
  storyOpener = opener || null;
  // Sound follows the site: music on means the founders talk out loud, music off means they start muted.
  storyMuted = storyMuteChoice ?? !sound.on;
  storiesEl.hidden = false; storiesEl.classList.remove('leaving'); modal++;
  storyBars.replaceChildren(...STORIES.map(() => el('i')));
  showStory(i); track('stories_open');
  setTimeout(() => $('.story-close', storiesEl).focus({ preventScroll: true }), 60);
}
function closeStories() {
  if (storiesEl.hidden || storiesEl.classList.contains('leaving')) return;
  cancelAnimationFrame(storyRaf); clearTimeout(storyHold); stopVideo();
  storiesEl.classList.add('leaving'); modal = Math.max(0, modal - 1); wake();
  setTimeout(() => { storiesEl.hidden = true; storyStage.replaceChildren(); }, 300);
  storyOpener?.focus({ preventScroll: true });
}
function stopVideo() {
  storyVideo.pause();
  if (storyVideo.getAttribute('src')) { storyVideo.removeAttribute('src'); storyVideo.load(); }
  storyFrame.classList.remove('loud', 'loading');
}
function syncMute() {
  storyVideo.muted = storyMuted;
  storyMuteBtn.setAttribute('aria-pressed', String(storyMuted));
  storyMuteBtn.setAttribute('aria-label', storyMuted ? L('Unmute', 'Activar sonido') : L('Mute', 'Silenciar'));
  storyFrame.classList.toggle('loud', !!current().video && !storyMuted);
  wake();
}
function playVideo() {
  syncMute();
  storyVideo.play().then(() => { storyBlocked = false; storyFrame.classList.remove('blocked'); }).catch(err => {
    if (err.name !== 'NotAllowedError') return;
    // The browser refused sound without a tap: play muted and let the speaker button bring it back.
    if (!storyVideo.muted) { storyMuted = true; syncMute(); return playVideo(); }
    storyBlocked = true; storyFrame.classList.add('blocked');
  });
}
function setPaused(v) {
  storyPaused = v; storyFrame.classList.toggle('paused', v);
  if (!current().video) return;
  if (v) storyVideo.pause(); else playVideo();
}
function fraction(i) {
  if (i !== storyIdx) return i < storyIdx ? 1 : 0;
  const st = current();
  if (st.video) return storyVideo.duration ? storyVideo.currentTime / storyVideo.duration : 0;
  return st.end ? 1 : clamp(storyElapsed / QUOTE_MS);
}
function setBars() { [...storyBars.children].forEach((b, i) => b.style.setProperty('--f', fraction(i).toFixed(3))); }
function showStory(i) {
  cancelAnimationFrame(storyRaf);
  storyIdx = clamp(i, 0, STORIES.length - 1); storyElapsed = 0; storyLast = 0; storyPaused = false; storyBlocked = false;
  const st = current();
  storyFrame.classList.remove('paused', 'holding', 'blocked');
  storyFrame.classList.toggle('is-video', !!st.video); storyFrame.classList.toggle('is-end', !!st.end);
  storyMuteBtn.hidden = !st.video;
  // Header: who is speaking.
  const av = st.video ? Object.assign(el('img', 'av'), { src: media(`face-${st.video}.webp`), alt: '' }) : el('span', 'av', st.end ? '✦' : st.name[0]);
  const who = el('span'); who.append(st.end ? 'care_less' : st.name, el('small', '', st.end ? L('Your turn', 'Tu turno') : sv(st, 'role') || L('Verified client', 'Cliente verificado')));
  storyWho.replaceChildren(av, who);
  let node;
  if (st.video) {
    node = el('div', 'story story-video' + (st.fit ? ' fit' : ''));
    node.style.setProperty('--poster', `url("${media(`story-${st.video}.webp`)}")`);
    storyVideo.poster = media(`story-${st.video}.webp`);
    storyVideo.src = media(`story-${st.video}.mp4`);
    node.append(storyVideo, el('p', 'story-cap', sv(st, 'cap')), el('i', 'story-spin'), el('i', 'story-glyph'));
    storyStage.replaceChildren(node);
    storyFrame.classList.add('loading'); playVideo(); track('stories_video', { who: st.name, muted: storyMuted });
  } else {
    stopVideo();
    if (st.quote) {
      const q = sv(st, 'quote');
      node = el('div', 'story story-quote' + (q.length > 150 ? ' long' : ''));
      node.append(el('div', 'mark', '“'), el('blockquote', '', q), el('p', 'stars', '★★★★★'));
      if (q !== st.quote) node.append(el('p', 'src', 'Traducido del inglés'));
      node.append(el('i', 'story-glyph'));
    } else {
      node = el('div', 'story story-end');
      const book = Object.assign(el('a', 'btn btn-paper'), { href: BOOKING, target: '_blank', rel: 'noopener noreferrer' }); book.innerHTML = L('Book a call with me', 'Reserva una llamada conmigo') + ' <span aria-hidden="true">→</span>';
      book.addEventListener('click', () => track('book', { from: 'stories' }));
      const again = Object.assign(el('button', 'story-all'), { type: 'button', textContent: L('↺ Watch again', '↺ Ver de nuevo') });
      again.addEventListener('click', () => showStory(0));
      node.append(el('h3', '', L('Want to be the next one?', '¿Hablamos de tu negocio?')), el('p', '', L('These are just a few of them. Every one, five stars.', 'Esto es solo una muestra. Todas, de cinco estrellas.')), book, again);
    }
    storyStage.replaceChildren(node);
  }
  setBars(); wake();
  if (!st.end) storyRaf = requestAnimationFrame(runStory);
}
function runStory(now) {
  const dt = storyLast ? Math.min(64, now - storyLast) : 0; storyLast = now;
  if (current().quote && !storyPaused && !document.hidden) storyElapsed += dt;
  setBars();
  if (current().quote && storyElapsed >= QUOTE_MS) return showStory(storyIdx + 1);
  storyRaf = requestAnimationFrame(runStory);
}
const stepStory = d => { if (storyIdx + d < 0) return showStory(0); if (storyIdx + d >= STORIES.length) return closeStories(); showStory(storyIdx + d); };
storyVideo.addEventListener('ended', () => { if (!storiesEl.hidden && current().video) stepStory(1); });
storyVideo.addEventListener('waiting', () => storyFrame.classList.add('loading'));
storyVideo.addEventListener('playing', () => storyFrame.classList.remove('loading'));
storyMuteBtn.addEventListener('click', () => {
  storyMuted = storyMuteChoice = !storyMuted; syncMute(); track('stories_mute', { muted: storyMuted });
  if (storyBlocked || (storyVideo.paused && !storyPaused)) playVideo();
});
// Tap the right side for next, the left for back. Press and hold anywhere to pause; the header hides while you hold.
[['#story-prev', -1], ['#story-next', 1]].forEach(([sel, d]) => {
  const b = $(sel);
  const release = () => { clearTimeout(storyHold); if (storyPaused && storyFrame.classList.contains('holding')) { storyFrame.classList.remove('holding'); setPaused(false); } };
  b.addEventListener('pointerdown', () => {
    storyDown = performance.now();
    storyHold = setTimeout(() => { storyFrame.classList.add('holding'); setPaused(true); }, 180);
  });
  b.addEventListener('pointerup', release);
  b.addEventListener('pointercancel', release);
  b.addEventListener('pointerleave', release);
  b.addEventListener('contextmenu', e => e.preventDefault());
  b.addEventListener('click', () => {
    if (performance.now() - storyDown > 320) return;
    // A clip the browser wouldn't start: the first tap starts it instead of skipping it.
    if (storyBlocked) return playVideo();
    if (storyPaused) return setPaused(false);
    stepStory(d);
  });
});
$$('[data-story]').forEach(b => b.addEventListener('click', () => stepStory(+b.dataset.story)));
$('.stories-bg').addEventListener('click', closeStories);
storiesEl.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeStories();
  if (e.key === 'ArrowRight') stepStory(1);
  if (e.key === 'ArrowLeft') stepStory(-1);
  if ((e.key === ' ' || e.key === 'k') && !e.target.closest('a,button:not(.story-nav)')) { e.preventDefault(); setPaused(!storyPaused); }
  if (e.key === 'm' && current().video) storyMuteBtn.click();
});
document.addEventListener('visibilitychange', () => { if (!storiesEl.hidden && current().video && document.hidden) setPaused(true); });
let storyTouchY = 0;
storyFrame.addEventListener('touchstart', e => { storyTouchY = e.touches[0].clientY; }, { passive: true });
storyFrame.addEventListener('touchend', e => { if (e.changedTouches[0].clientY - storyTouchY > 90) closeStories(); }, { passive: true });
$('#proof-open').addEventListener('click', e => openStories(0, e.currentTarget));

/* ───────────────────────── Offers ───────────────────────── */
function renderCapacity() {
  const n = CAPACITY.perMonth;
  $('#agent-cap').textContent = n
    ? L(`We onboard ${n} businesses a month, so every one is built, tested and tuned by people, not a template.`, `Incorporamos ${n} negocios al mes, para que a cada uno lo construyan, prueben y ajusten personas, no una plantilla.`)
    : L('We take on a few businesses a month, so every one is built, tested and tuned by people, not a template.', 'Incorporamos unos pocos negocios al mes, para que a cada uno lo construyan, prueben y ajusten personas, no una plantilla.');
}
const OFFERS = {
  look: ['The 5-second test', "Paste your website. In a few seconds you'll see what a stranger meets first, and what's missing.",
    'El test de 5 segundos', 'Pega tu web. En unos segundos verás qué encuentra primero un desconocido, y qué falta.'],
  leak: ['The missed-enquiry check', "Move the sliders for a rough number now. Send it over and we'll find the real one.",
    '¿Cuántas consultas pierdes?', 'Mueve los controles y tendrás una cifra aproximada ya. Envíanosla y buscamos la real.'],
  shopper: ['The mystery-shopper run', "We pose as a new customer, from first enquiry to after the sale, and show you exactly where we'd have walked away.",
    'El cliente misterioso', 'Nos hacemos pasar por un cliente nuevo, de la primera consulta a la posventa, y te enseñamos justo dónde nos habríamos ido.'],
  needs_me: ['The "does it need me?" check', "A few questions, one page back: everything that still can't happen without you, and what it costs you in hours.",
    'El test «¿me necesita?»', 'Unas pocas preguntas y te devolvemos una página: todo lo que aún no puede pasar sin ti y lo que te cuesta en horas.'],
};
const offerText = id => L(OFFERS[id].slice(0, 2), OFFERS[id].slice(2));
const offerEl = $('#offer'), offerForm = $('#offer-form'), offerStatus = $('#offer-status'), offerContact = $('#offer-contact');
let offerId = '', offerOpener = null;
$$('[data-offer]').forEach(b => b.addEventListener('click', () => openOffer(b.dataset.offer, b)));
function openOffer(id, opener) {
  offerId = id; offerOpener = opener; openedAt = Date.now();
  const [title, desc] = offerText(id); $('#offer-title').textContent = title; $('#offer-desc').textContent = desc;
  offerForm.reset(); offerStatus.textContent = ''; offerStatus.className = 'offer-status';
  // The 5-second test runs right here first; the missed-enquiry check shows a live estimate above the form.
  checkForm.hidden = id !== 'look'; calc.hidden = id !== 'leak'; checkOut.replaceChildren(); lastCheck = null; checkForm.reset();
  offerForm.hidden = id === 'look'; skipLine.hidden = id !== 'look';
  skipBtn.textContent = L('Skip the check, just send it to Maks', 'Sáltate la comprobación y envíasela a Maks');
  $('#offer-contact-label').textContent = id === 'look' ? L('Want my full read? Your email or phone', '¿Quieres mi lectura completa? Tu email o teléfono')
    : id === 'leak' ? L('Want the real number? Your email or phone', '¿Quieres la cifra real? Tu email o teléfono')
    : L('Website, email or phone', 'Web, email o teléfono');
  if (id === 'leak') calcUpdate();
  $('#offer-wa').href = wa(L(`Hi Maks, I'd like ${title}.`, `Hola Maks, me interesa: ${title}.`));
  offerEl.hidden = false; modal++; setTimeout(() => (id === 'look' ? checkUrl : id === 'leak' ? $('#calc-enq') : offerContact).focus({ preventScroll: true }), 60);
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
  offerContact.setCustomValidity(ok ? '' : L('Add a website, email or phone number.', 'Añade una web, un email o un teléfono.'));
  if (!offerContact.reportValidity()) return;
  const btn = $('button[type="submit"]', offerForm); btn.disabled = true; offerStatus.textContent = L('Sending…', 'Enviando…');
  const extra = offerId === 'look' && lastCheck ? `\n5-second check: ${lastCheck.url} scored ${lastCheck.score}/${lastCheck.total}; missing: ${lastCheck.checks.filter(c => !c.ok).map(c => c.id).join(', ') || 'nothing'}`
    : offerId === 'leak' ? `\nCalculator: ${calcSummary()}` : '';
  const sent = await submitLead(offerId, v, ($('#offer-note').value.trim() + extra).trim());
  btn.disabled = false;
  if (sent) { offerForm.hidden = true; offerStatus.textContent = L("Got it. We'll be in touch soon.", 'Recibido. Te escribimos pronto.'); offerStatus.className = 'offer-status ok'; track('offer_submit', { offer_id: offerId }); }
  else offerStatus.textContent = L("That didn't send. Try again, or use WhatsApp below.", 'No se ha enviado. Inténtalo de nuevo o usa WhatsApp.');
});
offerContact.addEventListener('input', () => offerContact.setCustomValidity(''));

// The 5-second test, run live: /api/site-check fetches the homepage and checks what a stranger meets first.
const checkForm = $('#sitecheck'), checkUrl = $('#sitecheck-url'), checkOut = $('#sitecheck-out');
const skipLine = el('p', 'offer-skip'), skipBtn = el('button', '', '');
skipBtn.type = 'button'; skipLine.append(skipBtn); checkForm.after(skipLine);
skipBtn.addEventListener('click', () => { offerForm.hidden = false; skipLine.hidden = true; offerContact.focus(); });
let lastCheck = null;
const secs = ms => (ms / 1000).toFixed(1);
const CHECKS = {
  https: [['Secure connection (https)', 'Conexión segura (https)'], ['Not secure (no https)', 'No es segura (sin https)']],
  speed: [[ms => `Opens fast (${secs(ms)} s)`, ms => `Abre rápido (${secs(ms).replace('.', ',')} s)`], [ms => `Slow to open (${secs(ms)} s)`, ms => `Tarda en abrir (${secs(ms).replace('.', ',')} s)`]],
  title: [['A clear page title', 'Un título de página claro'], ['Page title missing, too short or too long', 'Título de página ausente, muy corto o muy largo']],
  headline: [['One clear main headline', 'Un titular principal claro'], ['No clear main headline', 'Sin un titular principal claro']],
  description: [['Says what you do in Google results', 'Dice qué haces en los resultados de Google'], ['No description for Google results', 'Sin descripción para los resultados de Google']],
  mobile: [['Set up for phones', 'Preparada para móviles'], ['Not set up for phones', 'No está preparada para móviles']],
  contact: [['Easy to contact (phone, email, WhatsApp or a form)', 'Fácil de contactar (teléfono, email, WhatsApp o formulario)'], ['No quick way to contact you', 'Sin una forma rápida de contactarte']],
  action: [['A clear next step (book, call, quote…)', 'Un siguiente paso claro (reservar, llamar, presupuesto…)'], ['No clear next step for the visitor', 'Sin un siguiente paso claro para el visitante']],
  preview: [['Looks good when shared (preview image)', 'Se ve bien al compartirla (imagen de vista previa)'], ['No preview image when shared', 'Sin imagen de vista previa al compartirla']],
  structured: [['Readable by Google and AI assistants', 'Legible para Google y los asistentes de IA'], ['Not marked up for Google and AI assistants', 'Sin datos estructurados para Google y la IA']],
};
const checkLabel = c => { const t = CHECKS[c.id]?.[c.ok ? 0 : 1]; if (!t) return c.id; const x = L(t[0], t[1]); return typeof x === 'function' ? x(c.detail) : x; };
checkForm.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = $('button', checkForm); btn.disabled = true;
  checkOut.replaceChildren(el('p', 'sc-wait', L('Looking at it like a stranger would…', 'Mirándola como lo haría un desconocido…')));
  let j = null;
  try {
    const r = await fetch('/api/site-check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: checkUrl.value.trim() }), signal: AbortSignal.timeout(20000) });
    j = await r.json();
  } catch {}
  btn.disabled = false;
  if (!j?.ok) {
    checkOut.replaceChildren(el('p', 'sc-error', j?.error === 'url' ? L("That doesn't look like a website address.", 'Eso no parece la dirección de una web.')
      : j?.error === 'busy' ? L('Too many checks for now. Try again in a few minutes.', 'Demasiadas comprobaciones por ahora. Prueba en unos minutos.')
      : L("We couldn't open that site. Check the address, or just send it to Maks below.", 'No hemos podido abrir esa web. Revisa la dirección o envíasela a Maks abajo.')));
    offerForm.hidden = false; skipLine.hidden = true; track('site_check', { ok: false, error: j?.error || 'network' });
    return;
  }
  lastCheck = j;
  const seen = (j.checks.find(c => c.id === 'headline' && c.detail)?.detail || j.checks.find(c => c.id === 'title')?.detail || '').slice(0, 120);
  const score = el('p', 'sc-score'); score.append(el('b', '', `${j.score}/${j.total}`), L(' basics in place', ' básicos en orden'));
  const list = el('ul', 'sc-list');
  [...j.checks].sort((a, b) => a.ok - b.ok).forEach(c => list.append(el('li', c.ok ? 'ok' : 'no', checkLabel(c))));
  const nodes = [score];
  if (seen) { const p = el('p', 'sc-seen', L('A stranger reads first: ', 'Lo primero que lee un desconocido: ')); p.append(el('q', '', seen)); nodes.push(p); }
  nodes.push(list);
  checkOut.replaceChildren(...nodes);
  offerForm.hidden = false; skipLine.hidden = true;
  track('site_check', { ok: true, score: j.score });
});

// The missed-enquiry calculator: a rough monthly figure from four inputs, before anyone sends anything.
const calc = $('#calc'), calcIn = id => Math.max(0, Number($('#calc-' + id).value) || 0);
const euros = n => new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const calcMonthly = () => Math.round(calcIn('enq') * 52 / 12 * calcIn('miss') / 100 * calcIn('win') / 100 * calcIn('value'));
const calcSummary = () => `${calcIn('enq')} enquiries/week, ${calcIn('miss')}% late or missed, €${calcIn('value')} average sale, ${calcIn('win')}% normally won → about ${euros(calcMonthly())}/month`;
function calcUpdate() {
  $('#calc-miss-out').textContent = calcIn('miss') + '%'; $('#calc-win-out').textContent = calcIn('win') + '%';
  $('#calc-total').textContent = euros(calcMonthly());
}
calc.addEventListener('input', calcUpdate);

/* ───────────────────────── Booking ───────────────────────── */
// zcal inside our own frame. zcal refuses to be framed from the personal links (zcal.co/name/…), only from its
// embed links, so this stays off until BOOKING_EMBED is set.
const bookingEl = $('#booking'), bookingFrame = $('#booking-frame');
let bookingOpener = null;
function openBooking(opener) {
  bookingOpener = opener;
  if (!bookingFrame.firstChild) {
    const f = document.createElement('iframe');
    f.title = L('Pick a time with Maks', 'Elige una hora con Maks');
    f.src = BOOKING_EMBED + (BOOKING_EMBED.includes('?') ? '&' : '?') + 'embed=1&embedType=inline&embedVersion=1.0.2&embedDomain=' + location.hostname;
    bookingFrame.append(f);
  }
  bookingEl.hidden = false; modal++; setTimeout(() => $('.booking-close', bookingEl).focus({ preventScroll: true }), 60);
  track('booking_open');
}
function closeBooking() { if (bookingEl.hidden) return; bookingEl.hidden = true; modal = Math.max(0, modal - 1); bookingOpener?.focus({ preventScroll: true }); }
bookingEl.addEventListener('click', e => { if (e.target === bookingEl) closeBooking(); });
bookingEl.addEventListener('keydown', e => { if (e.key === 'Escape') closeBooking(); });
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="https://zcal.co/"]');
  if (!a || a.closest('#booking')) return;
  track('booking_click');
  if (!BOOKING_EMBED || e.metaKey || e.ctrlKey || e.shiftKey) return; // no embed yet, or they asked for a new tab
  e.preventDefault(); openBooking(a);
});

/* The "first AI hire": an email for the details, then nurture. Not a sale on the spot. */
const hire = $('#hire'), hireEmail = $('#hire-email'), hireStatus = $('#hire-status');
hireEmail.addEventListener('focus', () => { openedAt = Math.min(openedAt, Date.now() - 1000); }, { once: true });
hireEmail.addEventListener('input', () => hireEmail.setCustomValidity(''));
hire.addEventListener('submit', async e => {
  e.preventDefault();
  const v = hireEmail.value.trim();
  hireEmail.setCustomValidity(isEmail(v) ? '' : L('Add your email.', 'Añade tu email.'));
  if (!hireEmail.reportValidity()) return;
  const btn = $('button', hire); btn.disabled = true; hireStatus.className = 'hire-status'; hireStatus.textContent = L('Sending…', 'Enviando…');
  const sent = await submitLead('agent', v, `Wants the details: first AI hire, 14 days free. Language: ${lang}`);
  btn.disabled = false;
  if (sent) { $('.hire-row', hire).hidden = true; hireStatus.className = 'hire-status ok'; hireStatus.textContent = L(`Got it. We'll send the details to ${v}.`, `Recibido. Te enviaremos los detalles a ${v}.`); track('hire_submit'); }
  else hireStatus.textContent = L("That didn't go through. Try again in a moment.", 'No ha funcionado. Prueba otra vez en un momento.');
});

/* ───────────────────────── Final ───────────────────────── */
// A slow, seamless colony loop behind the last question; it only loads and plays while that screen is in view.
const finalLoop = $('#final-loop');
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && !motion.matches) {
    if (!finalLoop.getAttribute('src')) { finalLoop.src = MEDIA + ((small || light) ? 'final-loop-480.mp4' : 'final-loop-624.mp4'); finalLoop.preload = 'auto'; }
    finalLoop.play().catch(() => {});
  } else finalLoop.pause();
}, { rootMargin: '30% 0px' }).observe(finalSec);

const finalInput = $('#final-input'), finalTalk = $('#final-talk');
// Rotating placeholder: short enough for one line on a phone.
(() => {
  const ideas = () => L(['repeating myself…', 'chasing quotes…', 'answering the same emails…', 'being the bottleneck…', 'posting on social…'],
    ['repetirme…', 'perseguir presupuestos…', 'responder los mismos emails…', 'ser el cuello de botella…', 'publicar en redes…']);
  let i = 0;
  setInterval(() => { if (document.activeElement === finalInput || finalInput.value || motion.matches) return; i = (i + 1) % 5; finalInput.placeholder = ideas()[i]; }, 2600);
})();
finalInput.addEventListener('input', () => { finalInput.style.height = 'auto'; finalInput.style.height = Math.min(160, finalInput.scrollHeight) + 'px'; });
finalInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#final-form').requestSubmit(); } });
finalTalk.addEventListener('click', () => { track('final_talk'); startCall(); });

// "One thing to care less about": a short email every two weeks, through the same lead intake.
const letter = $('#letter'), letterEmail = $('#letter-email'), letterStatus = $('#letter-status'), letterOpen = $('#letter-open');
letterEmail.addEventListener('focus', () => { openedAt = Math.min(openedAt, Date.now() - 1000); }, { once: true });
letterOpen.addEventListener('click', () => {
  letterOpen.hidden = true; letterOpen.setAttribute('aria-expanded', 'true'); $('#letter-row').hidden = false;
  letterEmail.focus({ preventScroll: true }); track('letter_open');
});
letter.addEventListener('submit', async e => {
  e.preventDefault();
  const v = letterEmail.value.trim();
  letterEmail.setCustomValidity(isEmail(v) ? '' : L('Add your email.', 'Añade tu email.'));
  if (!letterEmail.reportValidity()) return;
  const btn = $('button', letter); btn.disabled = true; letterStatus.className = 'letter-status'; letterStatus.textContent = L('Sending…', 'Enviando…');
  const sent = await submitLead('letter', v, `Language: ${lang}`);
  btn.disabled = false;
  if (sent) { $('#letter-row').hidden = true; letterStatus.className = 'letter-status ok'; letterStatus.textContent = L("You're in. First one soon.", 'Dentro. El primero llega pronto.'); track('letter_join'); }
  else letterStatus.textContent = L("That didn't go through. Try again in a moment.", 'No ha funcionado. Prueba otra vez en un momento.');
});
letterEmail.addEventListener('input', () => letterEmail.setCustomValidity(''));

// Like button: the real count, always shown next to the heart. A tap fills the heart and bursts a few small ones.
const likeBtn = $('#like'), likeCount = $('#like-count'), likeLabelEl = $('#like-label');
// The chip carries its own words: an invitation before the tap, a thank-you right after, then just the heart and count.
let labelTimer = 0;
function likeWords(state) {
  likeLabelEl.textContent = state === 'ask' ? L('Liked the ride?', '¿Te ha gustado?') : state === 'thanks' ? L('Thank you!', '¡Gracias!') : '';
  likeBtn.classList.toggle('worded', state !== 'none');
}
let likes = null;
const showLikes = n => { if (typeof n !== 'number') return; likes = n; likeCount.textContent = n.toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB'); likeLabel(); };
const likeLabel = () => {
  const n = typeof likes === 'number' ? likes : null;
  const a = liked() ? L('You liked this site. Thank you', 'Te ha gustado esta web. Gracias') : L('Like this site', 'Me gusta esta web');
  likeBtn.setAttribute('aria-label', n === null ? a : a + L(`. ${n} likes so far`, `. ${n} hasta ahora`)); likeBtn.title = a;
};
function likeBurst() {
  if (motion.matches) return;
  const heart = $('.like-heart', likeBtn);
  for (let i = 0; i < 9; i++) {
    const p = el('i', 'like-spark'); const a = (i / 9) * Math.PI * 2 + Math.random() * .4, r = 17 + Math.random() * 11;
    p.style.setProperty('--x', (Math.cos(a) * r).toFixed(1) + 'px'); p.style.setProperty('--y', (Math.sin(a) * r - 4).toFixed(1) + 'px');
    p.style.setProperty('--s', (.5 + Math.random() * .6).toFixed(2)); p.style.animationDelay = (Math.random() * 60).toFixed(0) + 'ms';
    heart.append(p); setTimeout(() => p.remove(), 900);
  }
}
const liked = () => { try { return localStorage.getItem('cl-liked') === '1'; } catch { return false; } };
if (liked()) likeBtn.setAttribute('aria-pressed', 'true');
likeLabel(); likeWords(liked() ? 'none' : 'ask');
new IntersectionObserver(([e], obs) => {
  if (!e.isIntersecting) return; obs.disconnect();
  fetch('/api/likes').then(r => r.json()).then(j => showLikes(j.count)).catch(() => {});
}).observe(likeBtn);
likeBtn.addEventListener('click', async () => {
  if (liked()) return;
  likeBtn.setAttribute('aria-pressed', 'true'); likeBtn.classList.remove('pop'); void likeBtn.offsetWidth; likeBtn.classList.add('pop'); likeBurst();
  if (typeof likes === 'number') showLikes(likes + 1);
  try { localStorage.setItem('cl-liked', '1'); } catch {}
  likeLabel(); likeWords('thanks');
  clearTimeout(labelTimer); labelTimer = setTimeout(() => likeWords('none'), 2600);
  track('like');
  try { const j = await (await fetch('/api/likes', { method: 'POST' })).json(); if (typeof j.count === 'number' && j.count > (likes || 0)) showLikes(j.count); } catch {}
});
$('#final-form').addEventListener('submit', e => {
  e.preventDefault(); const t = finalInput.value.trim(); if (!t) { finalInput.focus(); return; }
  track('final_submit');
  if (SCOUT_MODE === 'off') { window.open(wa(L("Hi Maks, I'd like to care less about: ", 'Hola Maks, me gustaría preocuparme menos por: ') + t), '_blank', 'noopener'); return; }
  finalInput.value = '';
  if (SCOUT_MODE === 'preview') {
    chatStarted = true; log.replaceChildren(); setQuick([]);
    chat.hidden = false; chat.classList.remove('leaving'); showDock(); $('#chat-mode').hidden = false; track('scout_chat_open');
    addMsg(L("Hey, I'm Scout. You'd like to care less about…", 'Hola, soy Scout. Te gustaría preocuparte menos por…'), 'scout'); addMsg(t, 'user');
    engines.preview.seed(t);
  } else openChat(t);
});

/* ───────────────────────── Language switch ───────────────────────── */
// Swaps every fixed text in place (originals are kept, so it switches back), then re-says the few live lines.
const langBtn = $('#lang'), origHTML = new Map(), origText = new Map(), origAttr = new Map();
const textNode = n => [...n.childNodes].find(c => c.nodeType === 3 && c.textContent.trim());
function applyLang() {
  const es = lang === 'es', T = window.CL_ES;
  root.lang = lang;
  if (T) {
    for (const [sel, html] of Object.entries(T.html)) $$(sel).forEach(n => { if (!origHTML.has(n)) origHTML.set(n, n.innerHTML); n.innerHTML = es ? html : origHTML.get(n); });
    for (const [sel, text] of Object.entries(T.text)) $$(sel).forEach(n => { const t = textNode(n); if (!t) return; if (!origText.has(n)) origText.set(n, t.textContent); t.textContent = es ? text : origText.get(n); });
    for (const [sel, a, v] of T.attr) $$(sel).forEach(n => { const m = origAttr.get(n) || {}; origAttr.set(n, m); if (!(a in m)) m[a] = n.getAttribute(a); n.setAttribute(a, es ? v : m[a]); });
  }
  langBtn.textContent = es ? 'EN' : 'ES'; langBtn.lang = es ? 'en' : 'es';
  langBtn.setAttribute('aria-label', es ? 'View in English' : 'Ver en español');
  if (!root.classList.contains('begun')) gateStatus.textContent = gateDone ? L('Schedule cleared.', 'Agenda despejada.') : greet();
  if (encTyped) $$('.enc-line', enc).forEach(l => l.textContent = l.dataset.type);
  root.classList.remove('i18n-wait');
  likeLabel(); renderCapacity(); if (!liked()) likeWords('ask');
  layout(); wake();
}
langBtn.addEventListener('click', () => {
  lang = lang === 'es' ? 'en' : 'es';
  try { localStorage.setItem('cl-lang', lang); } catch {}
  if (/[?&]lang=/.test(location.search)) history.replaceState(null, '', location.pathname + location.search.replace(/([?&]lang=)(en|es)/, '$1' + lang) + location.hash);
  applyLang(); track('lang', { to: lang });
});

/* ───────────────────────── Boot ───────────────────────── */
layout();
runGate();
applyLang();
addEventListener('load', () => { layout(); wake(); });
setInterval(() => { if (!document.hidden && root.classList.contains('begun')) wake(); }, 450);
if (document.fonts) document.fonts.ready.then(layout);
window.CL5 = { film: filmKey, rests: () => rests, layout, hold, decide, startCall, openChat, openOffer, state: () => ({ scoutState, held, modal, u: (scrollY - journeyTop) / H, t: vTime }) };
})();
