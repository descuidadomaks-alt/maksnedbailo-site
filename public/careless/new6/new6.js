/* care_less /new6 — single readable script, no build step.
   Sections: config · utilities · sound · layout · smooth scroll + settle · stage (film, plate, board) · gate · Scout (encounter, dock, chat, call) · client stories · offers · final. */
(() => {
'use strict';

/* ───────────────────────── Config ───────────────────────── */
const BASE = '/careless/new5/'; // shared film, avatar and fonts
const OWN = '/careless/new6/';
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
function track(name, detail = {}) {
  const event = { event: name, page: 'new6', ...detail };
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
  if (y > stageEnd - H * .5) return;
  for (const r of rests) { const d = Math.abs(r - y); if (d < dist) { dist = d; best = r; } }
  if (best !== null && dist > 3 && dist < H * .3) glideTo(best, 260);
}

/* ───────────────────────── Stage: film, captions, plate, board ───────────────────────── */
let movieReady = false, loopReady = false, primed = false, vTime = 0, frame = 0, tLast = 0, lastU = -1, comicShown = false, chapterIdx = -1, railIdx = -2, duckLevel = 1, holdY = 0, comicAt = 0;
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

  cue.style.setProperty('--cue', (held || modal || u > STAGE_U - .5 || (small && u > P_SWAP) || performance.now() - lastInput < 900) ? '0' : '1');

  // Rail + progress line
  const y = scrollY;
  let ri = -1; RAIL.forEach(([, at], i) => { if (y >= at - H * .35) ri = i; });
  if (ri !== railIdx) { railIdx = ri; railBtns.forEach((b, i) => { b.classList.toggle('on', i === ri); b.classList.toggle('past', i < ri); if (i === ri) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); }); }
  rail.classList.toggle('away', held || modal > 0);
  progress.style.transform = `scaleX(${clamp(y / (maxScroll || 1)).toFixed(4)})`;
  sound.update(u, y, now);
  const level = !call.hidden ? .2 : !storiesEl.hidden && storyFrame.classList.contains('playing') ? .04 : !storiesEl.hidden ? .4 : !offerEl.hidden ? .5 : !chat.hidden ? .55 : 1;
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
function greeting() {
  const d = new Date(), h = d.getHours();
  let seen = false; try { seen = !!localStorage.getItem('cl5-seen'); localStorage.setItem('cl5-seen', '1'); } catch {}
  if (seen) return 'Welcome back. Clearing your schedule…';
  if (h >= 21 || h < 5) return `It's ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}. Still working? Clearing your schedule…`;
  if (h < 8) return 'Early start. Clearing your schedule…';
  if (d.getDay() === 0 || d.getDay() === 6) return `It's ${d.toLocaleDateString('en-GB', { weekday: 'long' })}. Clearing your schedule…`;
  return 'Clearing your schedule…';
}
const pageTitle = document.title;
document.addEventListener('visibilitychange', () => {
  if (!root.classList.contains('begun')) return;
  document.title = !document.hidden ? pageTitle : scoutState === 'pending' ? 'Scout is waiting for you…' : "The colony's still working…";
});
function runGate() {
  root.classList.add('locked');
  gateStatus.textContent = greeting();
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
      gateBtn.disabled = false; gateQuiet.disabled = false; gateStatus.textContent = 'Schedule cleared.'; gateStatus.classList.add('done');
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
// Tapping Scout while his chat is open minimises it; otherwise it opens the call/message menu.
dockBtn.addEventListener('click', () => {
  if (!chat.hidden) { closeChat(); return; }
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
  if (close) { if (close.dataset.close === 'chat') closeChat(); if (close.dataset.close === 'offer') closeOffer(); if (close.dataset.close === 'stories') closeStories(); }
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
      body: JSON.stringify({ offerId, contact, note: note.slice(0, 1900), key: crypto.randomUUID(), startedAt: openedAt, company_fax: '', page: 'new6' }) });
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
        try { await req(`/webhook/sw-widget/${account}/${widget}/${sid()}`, { action: 'my_chat_send', widget_id: widget, session: sid(), payload: { message: text, wp_context: location.origin + '/new6' } }); poll(); }
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
  muteBtn.setAttribute('aria-pressed', 'false'); muteBtn.setAttribute('aria-label', 'Mute microphone');
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
muteBtn.addEventListener('click', () => { const m = muteBtn.getAttribute('aria-pressed') !== 'true'; muteBtn.setAttribute('aria-pressed', String(m)); muteBtn.setAttribute('aria-label', m ? 'Unmute microphone' : 'Mute microphone'); try { session_?.mute(m); } catch {} });
call.addEventListener('keydown', e => { if (e.key === 'Escape') endCall(); });

/* ───────────────────────── Client stories ───────────────────────── */
// Real feedback, ported from /old2: two video testimonials, then the written Upwork reviews, then one closing card.
const UPWORK = 'https://www.upwork.com/freelancers/maksdcoast';
const STORIES = [
  { video: '3Gzbg1rI5Tg', name: 'Garrett Williams', role: 'Econocraft Materials · USA', cap: 'Garrett, in his own words.' },
  { video: 'pVgC-3GciSw', name: 'AJ', role: 'Folkrm · US', cap: 'AJ, in his own words.' },
  { quote: "Wow Maks — this is f***ing awesome!! I need to check properly on my laptop but I am amazed! You're a genius!! Thank you!!", name: 'Corinna C.', role: 'Verified client · UK' },
  { quote: 'Maksym really took the time to understand our business requirements and came up with creative solutions that perfectly matched what we needed. He was very responsive and easy to work with throughout the entire process.', name: 'Sophie M.' },
  { quote: 'Maksym was a fantastic partner on this project. His attention to detail and willingness to iterate until we got it just right made all the difference.', name: 'David W.' },
  { quote: 'You are so great to work with! Thank you so much for all your hard work and for being so patient with all of my changes.', name: 'Michelle K.' },
  { quote: 'Excellent communication and very quick to understand what I was looking for. Delivered high-quality work with great attention to detail.', name: 'Daniel R.' },
  { quote: 'Maksym is very professional, responsive, and attentive to details. He really took the time to understand our brand and vision.', name: 'Tom H.' },
  { quote: 'Maksym delivered exactly what we needed. He was proactive with suggestions and very responsive throughout the project.', name: 'Laura P.' },
  { quote: 'Professional, creative, and great at understanding the business needs behind the design request. Communication was top-notch.', name: 'Sarah L.' },
  { quote: 'Maksym understood the brief quickly and delivered exactly what was needed. Communication was excellent throughout.', name: 'Eleanor K.' },
  { quote: 'Great communication, very responsive, and delivered the work on time with high quality. Would definitely work with him again.', name: 'Rachel T.' },
  { quote: 'Maksym is a great designer who listens carefully to what you need and delivers great results. Very responsive and professional.', name: 'Anna G.' },
  { quote: 'Very easy to work with, excellent communication, and always available for feedback and revisions.', name: 'Chris B.' },
  { quote: 'Maksym was a pleasure to work with and very very talented.', name: 'James T.' },
  { end: true },
];
const storiesEl = $('#stories'), storyFrame = $('#story-frame'), storyBars = $('#story-bars'), storyStage = $('#story-stage'), storyWho = $('#story-who');
const QUOTE_MS = 6500;
let storyIdx = 0, storyRaf = 0, storyLast = 0, storyElapsed = 0, storyPaused = false, storyDown = 0, storyOpener = null;
const thumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
function openStories(i = 0, opener) {
  storyOpener = opener || null;
  storiesEl.hidden = false; storiesEl.classList.remove('leaving'); modal++;
  storyBars.replaceChildren(...STORIES.map(() => el('i')));
  showStory(i); track('stories_open');
  setTimeout(() => $('.story-close', storiesEl).focus({ preventScroll: true }), 60);
}
function closeStories() {
  if (storiesEl.hidden || storiesEl.classList.contains('leaving')) return;
  cancelAnimationFrame(storyRaf); storiesEl.classList.add('leaving'); modal = Math.max(0, modal - 1);
  setTimeout(() => { storiesEl.hidden = true; storyStage.replaceChildren(); storyFrame.classList.remove('playing'); }, 300);
  storyOpener?.focus({ preventScroll: true });
}
function setBars() { [...storyBars.children].forEach((b, i) => b.style.setProperty('--f', i < storyIdx ? 1 : i > storyIdx ? 0 : clamp(storyElapsed / QUOTE_MS).toFixed(3))); }
function showStory(i) {
  cancelAnimationFrame(storyRaf);
  storyIdx = clamp(i, 0, STORIES.length - 1); storyElapsed = 0; storyPaused = false; storyFrame.classList.remove('playing');
  const st = STORIES[storyIdx];
  // Header: who is speaking.
  const av = st.video ? Object.assign(el('img', 'av'), { src: thumb(st.video), alt: '' }) : el('span', 'av', st.end ? '✦' : st.name[0]);
  const who = el('span'); who.append(st.end ? 'care_less' : st.name, el('small', '', st.end ? 'Your turn' : st.role || 'Verified client · Upwork'));
  storyWho.replaceChildren(av, who);
  let node;
  if (st.video) {
    node = el('div', 'story story-video');
    const img = Object.assign(el('img'), { src: thumb(st.video), alt: '' });
    const play = el('button', 'story-play'); play.type = 'button'; play.setAttribute('aria-label', `Play ${st.name}'s video`);
    play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l14 8-14 8z"/></svg>';
    play.addEventListener('click', () => {
      const f = el('iframe'); f.src = `https://www.youtube-nocookie.com/embed/${st.video}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
      f.title = 'Video testimonial from ' + st.name; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
      node.replaceChildren(f); node.classList.add('playing'); storyFrame.classList.add('playing');
      storyElapsed = QUOTE_MS; setBars(); track('stories_video', { who: st.name });
    });
    node.append(img, play, el('p', 'story-cap', st.cap));
  } else if (st.quote) {
    node = el('div', 'story story-quote' + (st.quote.length > 150 ? ' long' : ''));
    node.append(el('div', 'mark', '“'), el('blockquote', '', st.quote), el('p', 'stars', '★★★★★'), el('p', 'src', 'Client review · Upwork'));
  } else {
    node = el('div', 'story story-end');
    const book = Object.assign(el('a', 'btn btn-paper'), { href: BOOKING, target: '_blank', rel: 'noopener noreferrer' }); book.innerHTML = 'Book a call with me <span aria-hidden="true">→</span>';
    const all = Object.assign(el('a', 'story-all'), { href: UPWORK, target: '_blank', rel: 'noopener noreferrer', textContent: 'Read them on Upwork ↗' });
    node.append(el('h3', '', 'Want to be the next one?'), el('p', '', '13 reviews, all five stars. Two founders on camera.'), book, all);
  }
  storyStage.replaceChildren(node); setBars();
  if (st.quote) { storyLast = 0; storyRaf = requestAnimationFrame(runStory); }
}
function runStory(now) {
  const dt = storyLast ? Math.min(64, now - storyLast) : 0; storyLast = now;
  if (!storyPaused && !document.hidden) storyElapsed += dt;
  setBars();
  if (storyElapsed >= QUOTE_MS) return showStory(storyIdx + 1);
  storyRaf = requestAnimationFrame(runStory);
}
const stepStory = d => { if (storyIdx + d < 0) return showStory(0); if (storyIdx + d >= STORIES.length) return closeStories(); showStory(storyIdx + d); };
// Tap the right side for next, the left for back; press and hold anywhere to pause, like a phone story.
[['#story-prev', -1], ['#story-next', 1]].forEach(([sel, d]) => {
  const b = $(sel);
  b.addEventListener('pointerdown', () => { storyDown = performance.now(); storyPaused = true; });
  b.addEventListener('pointerup', () => { storyPaused = false; });
  b.addEventListener('pointerleave', () => { storyPaused = false; });
  b.addEventListener('click', () => { if (performance.now() - storyDown < 320) stepStory(d); });
});
$$('[data-story]').forEach(b => b.addEventListener('click', () => stepStory(+b.dataset.story)));
$('.stories-bg').addEventListener('click', closeStories);
storiesEl.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeStories();
  if (e.key === 'ArrowRight') stepStory(1);
  if (e.key === 'ArrowLeft') stepStory(-1);
});
let storyTouchY = 0;
storyFrame.addEventListener('touchstart', e => { storyTouchY = e.touches[0].clientY; }, { passive: true });
storyFrame.addEventListener('touchend', e => { if (e.changedTouches[0].clientY - storyTouchY > 90) closeStories(); }, { passive: true });
$('#proof-open').addEventListener('click', e => openStories(0, e.currentTarget));

/* ───────────────────────── Offers ───────────────────────── */
const OFFERS = {
  look: ['The 5-second test', "Send your website. We'll show you what a stranger understands in five seconds, and what they miss."],
  leak: ['The missed-enquiry check', "Tell us how enquiries reach you. We'll show who waited, who left, and roughly what they were worth."],
  shopper: ['The mystery-shopper run', "We pose as a new customer, from first enquiry to after the sale, and show you exactly where we'd have walked away."],
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

/* ───────────────────────── Final ───────────────────────── */
// A slow, seamless colony loop behind the last question; it only loads and plays while that screen is in view.
const finalLoop = $('#final-loop');
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && !motion.matches) {
    if (!finalLoop.getAttribute('src')) { finalLoop.src = OWN + ((small || light) ? 'media/final-loop-480.mp4' : 'media/final-loop-624.mp4'); finalLoop.preload = 'auto'; }
    finalLoop.play().catch(() => {});
  } else finalLoop.pause();
}, { rootMargin: '30% 0px' }).observe(finalSec);

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
    chat.hidden = false; chat.classList.remove('leaving'); showDock(); $('#chat-mode').hidden = false; track('scout_chat_open');
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
