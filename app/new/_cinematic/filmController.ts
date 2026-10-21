// One decoder, one pending seek. New scroll targets replace queued targets.
// Metadata is enough to start; iOS may withhold loadeddata until a muted play.
export type FilmEvents = { presented(time: number): void; waiting(): void; failed(): void };
export function controlFilm(video: HTMLVideoElement, duration: number, fps: number, events: FilmEvents) {
  let desired = 0, active = 0, shown = -1, busy = false, disposed = false, broken = false;
  let frame = 0, observe = 0, timer: ReturnType<typeof setTimeout>, notice: ReturnType<typeof setTimeout>;
  let started = 0, seeks = 0, totalMs = 0, maxMs = 0;
  const mounted = performance.now();
  const epsilon = .51 / fps;
  const limit = () => Math.max(0, Math.min(duration, Number.isFinite(video.duration) ? video.duration : duration) - 1 / fps);
  const clear = () => { clearTimeout(timer); clearTimeout(notice); };
  const fail = () => {
    if (disposed || broken) return;
    broken = true; busy = false; clear(); video.pause();
    video.dataset.mediaState = "fallback"; events.failed();
  };
  const present = () => {
    if (disposed || broken || video.readyState < 2 || video.seeking) return;
    // A completed old seek must never reveal headquarters after a reset to zero.
    if (desired === 0 && video.currentTime > 1 / fps) return;
    video.dataset.mediaState = "ready";
    if (!video.dataset.firstFrameMs) video.dataset.firstFrameMs = (performance.now() - mounted).toFixed(2);
    video.dataset.presentedTime = video.currentTime.toFixed(4);
    if (Math.abs(shown - video.currentTime) > epsilon) {
      shown = video.currentTime; events.presented(shown);
    }
  };
  const queue = () => { if (!frame && !disposed) frame = requestAnimationFrame(() => { frame = 0; pump(); }); };
  const complete = () => {
    if (!busy || video.seeking || video.readyState < 2 || Math.abs(video.currentTime - active) > 1 / fps) return;
    const elapsed = performance.now() - started;
    seeks++; totalMs += elapsed; maxMs = Math.max(maxMs, elapsed);
    video.dataset.seekCount = String(seeks);
    video.dataset.seekMeanMs = (totalMs / seeks).toFixed(2);
    video.dataset.seekMaxMs = maxMs.toFixed(2);
    busy = false; clear(); present(); queue();
  };
  const pump = () => {
    if (disposed || broken || busy || video.readyState < 1) return;
    const target = Math.min(limit(), Math.round(desired * fps) / fps);
    if (Math.abs(video.currentTime - target) <= epsilon && video.readyState >= 2) { clear(); present(); return; }
    clear(); busy = true; active = target; started = performance.now();
    // loadedmetadata, unlike loadeddata, also arrives on metadata-only Safari loads.
    try { video.currentTime = target; } catch { busy = false; fail(); return; }
    notice = setTimeout(() => { if (busy && !disposed) { video.dataset.mediaState = "buffering"; events.waiting(); } }, 450);
    timer = setTimeout(() => { if (!disposed) { complete(); if (busy) fail(); } }, 8000);
  };
  const warm = () => {
    if (disposed || broken) return;
    if (video.readyState >= 2) { video.pause(); if (busy) complete(); else { present(); queue(); } }
    else {
      // Pause at the first decoded frame, not in the play event before decoding.
      video.play().catch(() => { /* A denied autoplay still permits normal seeks. */ });
      queue();
    }
  };
  const data = () => { video.pause(); if (busy) complete(); else { present(); queue(); } };
  const seeked = () => { video.pause(); complete(); };
  const visibility = () => { if (!document.hidden) queue(); else video.pause(); };
  const observeFrame = () => {
    if (disposed || !video.requestVideoFrameCallback) return;
    observe = video.requestVideoFrameCallback((_, metadata) => {
      video.dataset.compositedTime = metadata.mediaTime.toFixed(4);
      video.dataset.compositedFrames = String(Number(video.dataset.compositedFrames || 0) + 1);
      observeFrame();
    });
  };
  video.addEventListener("loadedmetadata", warm);
  video.addEventListener("loadeddata", data);
  video.addEventListener("seeked", seeked);
  video.addEventListener("error", fail);
  document.addEventListener("visibilitychange", visibility);
  video.dataset.mediaState = "loading";
  timer = setTimeout(fail, 8000); observeFrame(); warm();
  return {
    seek(progress: number) {
      const previous = desired;
      desired = Math.max(0, Math.min(1, progress)) * limit();
      video.dataset.targetTime = desired.toFixed(4);
      if (desired === 0 && previous > 1 / fps) { shown = -1; events.waiting(); }
      queue();
    },
    retry() {
      if (disposed) return;
      broken = false; busy = false; shown = -1; clear(); events.waiting();
      video.load(); timer = setTimeout(fail, 8000); warm();
    },
    dispose() {
      disposed = true; clear(); cancelAnimationFrame(frame);
      if (observe && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(observe);
      video.removeEventListener("loadedmetadata", warm); video.removeEventListener("loadeddata", data);
      video.removeEventListener("seeked", seeked); video.removeEventListener("error", fail);
      document.removeEventListener("visibilitychange", visibility); video.pause();
    }
  };
}
