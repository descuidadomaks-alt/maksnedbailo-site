"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type CSSProperties } from "react";
import type { AmbientClip, ScrollClip } from "./cinema";
import { clampProgress } from "./cinema";
import styles from "./careless.module.css";

const crop = (clip: { position: string; mobilePosition: string }) => ({ objectPosition: clip.position, "--mobile-position": clip.mobilePosition } as CSSProperties);

export function AmbientVideo({ clip, reduced, active = true }: { clip: AmbientClip; reduced: boolean; active?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: "120px" });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const sync = () => {
      if (near && active && !reduced && !document.hidden) element.play().catch(() => setReady(false));
      else element.pause();
    };
    sync(); document.addEventListener("visibilitychange", sync);
    return () => { element.pause(); document.removeEventListener("visibilitychange", sync); };
  }, [near, active, reduced]);
  return <div ref={container} className={styles.ambient} data-ambient-state={failed ? "fallback" : reduced ? "reduced" : ready && active ? "playing" : "poster"}>
    <img src={clip.poster} width="624" height="624" alt="" style={crop(clip)} />
    {!reduced && near && !failed && <video ref={video} src={clip.src} poster={clip.poster} muted playsInline loop preload="auto" aria-hidden="true" style={{ ...crop(clip), opacity: ready ? 1 : 0 }} onLoadedData={() => setReady(true)} onError={() => { setFailed(true); setReady(false); }} />}
  </div>;
}

export type ScrubHandle = { seek(progress: number): void };
type SeekMedia = Pick<ScrollClip, "id" | "src" | "poster" | "inPoint" | "outPoint" | "fps" | "position" | "mobilePosition">;

export const ScrubVideo = forwardRef<ScrubHandle, { clip: SeekMedia; onFailure(): void; onPresented?(time: number): void }>(function ScrubVideo({ clip, onFailure, onPresented }, ref) {
  const video = useRef<HTMLVideoElement>(null);
  const desired = useRef(clip.inPoint);
  const pump = useRef<() => void>(() => {});
  const callbacks = useRef({ onFailure, onPresented });
  callbacks.current = { onFailure, onPresented };
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useImperativeHandle(ref, () => ({ seek(progress) { desired.current = clip.inPoint + clampProgress(progress) * (clip.outPoint - clip.inPoint); pump.current(); } }), [clip.inPoint, clip.outPoint]);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let busy = false, disposed = false, broken = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    let frameRequest = 0, activeTarget = 0, started = 0, seeks = 0, sumMs = 0, maxMs = 0, slow = 0;
    let lastPresented = -1;
    let lastComposited = -1, compositedFrames = 0;
    const frameSamples: number[] = [];
    setReady(false); setFailed(false);
    const supportsFrames = typeof element.requestVideoFrameCallback === "function";
    const cancelFrame = () => { if (frameRequest && element.cancelVideoFrameCallback) element.cancelVideoFrameCallback(frameRequest); frameRequest = 0; };
    const present = (time: number) => {
      if (disposed || broken || element.readyState < 2) return;
      setReady(true);
      element.dataset.presentedTime = time.toFixed(4);
      if (Math.abs(time - lastPresented) > .001) { lastPresented = time; callbacks.current.onPresented?.(time); }
    };
    const fail = () => { if (disposed) return; broken = true; busy = false; cancelFrame(); clearTimeout(timeout); clearTimeout(fallback); setFailed(true); setReady(false); callbacks.current.onFailure(); element.pause(); };
    const complete = (time: number) => {
      if (disposed || broken || !busy) return;
      clearTimeout(timeout); clearTimeout(fallback); cancelFrame();
      const elapsed = performance.now() - started;
      seeks++; sumMs += elapsed; maxMs = Math.max(maxMs, elapsed);
      element.dataset.seekCount = String(seeks);
      element.dataset.seekMeanMs = (sumMs / seeks).toFixed(2);
      element.dataset.seekMaxMs = maxMs.toFixed(2);
      busy = false; present(time); pump.current();
    };
    const waitForFrame = () => {
      frameRequest = element.requestVideoFrameCallback((_, metadata) => {
        frameRequest = 0;
        if (disposed || !busy) return;
        if (Math.abs(metadata.mediaTime - lastComposited) > .001) {
          lastComposited = metadata.mediaTime; compositedFrames++;
          frameSamples.push(Number(metadata.mediaTime.toFixed(4)));
          if (frameSamples.length > 40) frameSamples.shift();
          element.dataset.compositedFrames = String(compositedFrames);
          element.dataset.frameSamples = JSON.stringify(frameSamples);
        }
        if (Math.abs(metadata.mediaTime - activeTarget) <= 1 / clip.fps + .006) complete(metadata.mediaTime);
        else waitForFrame();
      });
    };
    pump.current = () => {
      if (disposed || busy || broken || element.readyState < 2) return;
      const rawTarget = Math.min(desired.current, Math.max(0, element.duration - .025));
      const target = Math.round(rawTarget * clip.fps) / clip.fps;
      if (!Number.isFinite(target)) return;
      if (Math.abs(element.currentTime - target) < .001) { if (!supportsFrames) present(element.currentTime); return; }
      busy = true; started = performance.now(); activeTarget = target;
      if (supportsFrames) waitForFrame();
      try { element.currentTime = target; } catch { fail(); return; }
      timeout = setTimeout(() => { if (++slow >= 3) fail(); else complete(element.currentTime); }, 1200);
    };
    const seeked = () => {
      if (!busy) return;
      // Paused-frame callbacks vary across browsers. Keep a bounded seeked fallback.
      if (supportsFrames) fallback = setTimeout(() => complete(element.currentTime), 100);
      else complete(element.currentTime);
    };
    const loaded = () => { if (Math.abs(desired.current - element.currentTime) < 1 / clip.fps) present(element.currentTime); pump.current(); };
    element.addEventListener("loadeddata", loaded); element.addEventListener("seeked", seeked); element.addEventListener("error", fail);
    // React Strict Mode may reuse a node whose previous controller released its src.
    if (element.getAttribute("src") !== clip.src) { element.src = clip.src; element.load(); }
    if (element.readyState >= 2) loaded();
    return () => {
      disposed = true; clearTimeout(timeout); clearTimeout(fallback); cancelFrame(); pump.current = () => {};
      element.removeEventListener("loadeddata", loaded); element.removeEventListener("seeked", seeked); element.removeEventListener("error", fail);
      element.pause(); element.removeAttribute("src"); element.load();
    };
  }, [clip.src, clip.inPoint, clip.fps]);
  return <video ref={video} className={styles.scrubVideo} data-clip={clip.id} data-media-state={failed ? "fallback" : ready ? "ready" : "loading"} src={failed ? undefined : clip.src} muted playsInline preload="auto" poster={clip.poster} aria-hidden="true" onPlay={event => event.currentTarget.pause()} style={{ ...crop(clip), opacity: ready && !failed ? 1 : 0 }} />;
});
