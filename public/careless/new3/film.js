const SCOUT_ENABLED = false;
(() => {
  'use strict';
  const section = document.querySelector('.film-section');
  const stage = document.querySelector('.film-stage');
  const poster = document.querySelector('#poster');
  const sunset = document.querySelector('#sunset');
  const movie = document.querySelector('#movie');
  const opening = document.querySelector('#opening');
  const cue = document.querySelector('#scroll-cue');
  const captions = [...document.querySelectorAll('.film-caption')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const light = connection?.saveData || /(^|-)2g$|^3g$/.test(connection?.effectiveType || '') || (connection?.downlink > 0 && connection.downlink < 1.5);
  const sources = {
    loop: '/careless/video/v1/1_loop.mp4',
    film: light || matchMedia('(max-width: 700px)').matches ? '/careless/video/film-v4/film-540.mp4' : '/careless/video/film-v4/film-720.mp4',
    end: '/careless/video/film-v4/film-last.webp',
  };
  const clamp = value => Math.max(0, Math.min(1, value));
  let target = 0, current = 0, frame = 0, lastTick = 0, duration = 45.866667;
  let start = 0, distance = 1, primed = false, visible = true, endLoaded = false;
  let movieReady = false, sunsetReady = false;
  let begun = false, held = false;
  const seekSamples = [];
  let seekStarted = 0, lastSeek = -1;

  function measure() {
    start = section.getBoundingClientRect().top + scrollY;
    distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
    readScroll();
  }
  function readScroll() {
    if (held) return;
    target = clamp((scrollY - start) / distance);
    wake();
  }
  function wake() {
    if (!frame && begun && !held && !motion.matches && !document.hidden && visible) frame = requestAnimationFrame(tick);
  }
  function presentCopy(time) {
    const first = 1 - clamp(time / 3.8);
    opening.style.opacity = String(first);
    opening.style.visibility = first > .001 ? 'visible' : 'hidden';
    cue.style.opacity = String((1 - clamp(time / 2)) * .85);
    captions.forEach(caption => {
      const from = Number(caption.dataset.start), to = Number(caption.dataset.end);
      const alpha = Math.min(clamp((time - from) / .7), clamp((to - time) / .7));
      caption.style.opacity = alpha.toFixed(3);
      caption.style.visibility = alpha > 0 ? 'visible' : 'hidden';
    });
  }
  function tick(now) {
    frame = 0;
    const elapsed = lastTick ? Math.min(64, now - lastTick) : 16.667;
    lastTick = now;
    // The single exponential easing is refresh-rate independent.
    current += (target - current) * (1 - Math.exp(-elapsed / 95));
    if (Math.abs(target - current) < .00008) current = target;
    const time = Math.min(duration - 1 / 30, current * duration);
    const atSurface = current < .001;
    if (atSurface) {
      movie.dataset.ready = 'false';
      sunset.dataset.ready = String(sunsetReady);
      if (sunsetReady && sunset.paused) sunset.play().catch(() => {});
      presentCopy(0);
    } else {
      sunset.pause();
      // Let the native decoder finish a seek; the next RAF uses the latest
      // eased scroll time. No frame strips, skipping, or playback-rate tricks.
      if (movieReady && !movie.seeking && Math.abs(movie.currentTime - time) > 1 / 60) {
        seekStarted = performance.now();
        lastSeek = time;
        movie.currentTime = time;
      }
      presentCopy(movieReady ? movie.currentTime : time);
      if (movieReady && !movie.seeking) movie.dataset.ready = 'true';
      if (current > .88 && !endLoaded) {
        endLoaded = true;
        const end = new Image(); end.src = sources.end;
      }
    }
    section.dataset.progress = current.toFixed(4);
    dispatchEvent(new CustomEvent('careless:film', { detail: { time: movieReady ? movie.currentTime : time } }));
    if (Math.abs(target - current) > .00008 || (movieReady && Math.abs(movie.currentTime - time) > 1 / 30)) wake();
  }
  function primeFilm() {
    if (primed || motion.matches) return;
    primed = true;
    movie.src = sources.film;
    movie.preload = 'auto';
    movie.load();
  }
  function loadMedia() {
    if (motion.matches) return;
    primeFilm();
    if (!begun || sunset.getAttribute('src')) return;
    sunset.src = sources.loop;
    sunset.preload = 'auto';
    sunset.load();
    sunset.play().catch(() => {});
    sunset.addEventListener('playing', () => {
      sunsetReady = true;
      sunset.dataset.ready = 'true';
    }, { once: true });
  }
  movie.addEventListener('loadedmetadata', () => {
    duration = movie.duration || duration;
    movie.currentTime = Math.min(duration - 1 / 30, current * duration);
  });
  movie.addEventListener('loadeddata', () => { movieReady = true; wake(); });
  movie.addEventListener('seeked', () => {
    if (seekStarted) {
      seekSamples.push(Math.round(performance.now() - seekStarted));
      if (seekSamples.length > 120) seekSamples.shift();
      const sorted = [...seekSamples].sort((a,b) => a-b);
      section.dataset.seekP95Ms = String(sorted[Math.floor((sorted.length - 1) * .95)]);
      section.dataset.seekCount = String(seekSamples.length);
    }
    if (lastSeek >= 0 && current > .001) movie.dataset.ready = 'true';
    wake();
  });
  movie.addEventListener('error', () => { movieReady = false; movie.dataset.ready = 'false'; });
  const onScroll = () => { readScroll(); if (target > 0) primeFilm(); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', measure, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { sunset.pause(); cancelAnimationFrame(frame); frame = 0; }
    else { lastTick = 0; wake(); }
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) { sunset.pause(); cancelAnimationFrame(frame); frame = 0; }
    else { lastTick = 0; wake(); }
  }).observe(section);
  motion.addEventListener('change', () => {
    cancelAnimationFrame(frame); frame = 0;
    if (motion.matches) {
      sunset.pause(); movie.pause();
      [sunset,movie].forEach(v => { v.removeAttribute('src'); v.load(); });
      primed = false; movieReady = false; sunsetReady = false;
      opening.style.removeProperty('visibility');
    } else { loadMedia(); wake(); }
    measure();
  });
  window.careLessFilm = {
    preload() { primeFilm(); },
    lighter() {
      const lower = '/careless/video/film-v4/film-540.mp4';
      if (sources.film === lower || motion.matches) return;
      sources.film = lower; primed = false; movieReady = false; primeFilm();
    },
    buffer() {
      let end = 0;
      for (let i=0;i<movie.buffered.length;i++) if (movie.buffered.start(i) <= .1) end = movie.buffered.end(i);
      return { ready: motion.matches || (movie.readyState >= 3 && end >= Math.min(12,duration)), progress: motion.matches ? 1 : clamp(end/Math.min(12,duration)), end, state: movie.readyState };
    },
    begin() { begun = true; loadMedia(); measure(); wake(); },
    hold(time) {
      held = true; cancelAnimationFrame(frame); frame = 0;
      current = target = time/duration;
      if (movieReady) movie.currentTime = time;
      presentCopy(time); scrollTo(0,start+distance*target);
      section.dataset.progress = current.toFixed(4);
    },
    release() { held = false; lastTick = 0; readScroll(); },
  };
  measure();
  if (poster.complete && poster.naturalWidth) loadMedia();
  else poster.addEventListener('load', loadMedia, { once: true });
})();
