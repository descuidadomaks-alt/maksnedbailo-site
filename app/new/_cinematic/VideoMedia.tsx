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

export const ScrubVideo = forwardRef<ScrubHandle, { clip: ScrollClip; onFailure(): void }>(function ScrubVideo({ clip, onFailure }, ref) {
  const video = useRef<HTMLVideoElement>(null);
  const desired = useRef(clip.inPoint);
  const pump = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useImperativeHandle(ref, () => ({ seek(progress) { desired.current = clip.inPoint + clampProgress(progress) * (clip.outPoint - clip.inPoint); pump.current(); } }), [clip.inPoint, clip.outPoint]);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let busy = false;
    let broken = false;
    let disposed = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let slow = 0;
    let started = 0;
    let seeks = 0;
    let sumMs = 0;
    let maxMs = 0;
    setReady(false); setFailed(false);
    // Strict Mode and manifest replacements can reuse this DOM node after cleanup.
    // Restore the source before waiting for loadeddata on the new controller.
    if (element.getAttribute("src") !== clip.src) { element.src = clip.src; element.load(); }
    const fail = () => { if (disposed) return; broken = true; setFailed(true); setReady(false); onFailure(); element.pause(); };
    const present = () => { if (!disposed && element.readyState >= 2) setReady(true); };
    pump.current = () => {
      if (disposed || busy || element.readyState < 2 || broken) return;
      const target = Math.min(desired.current, Math.max(0, element.duration - .025));
      if (!Number.isFinite(target) || Math.abs(element.currentTime - target) < 1 / clip.fps / 2) { present(); return; }
      busy = true; started = performance.now();
      try { element.currentTime = target; } catch { busy = false; fail(); return; }
      timeout = setTimeout(() => { busy = false; if (++slow >= 3) fail(); else pump.current(); }, 1200);
    };
    const complete = () => {
      if (disposed) return;
      clearTimeout(timeout);
      const elapsed = performance.now() - started;
      if (busy) { seeks++; sumMs += elapsed; maxMs = Math.max(maxMs, elapsed); }
      element.dataset.seekCount = String(seeks);
      element.dataset.seekMeanMs = String(seeks ? sumMs / seeks : 0);
      element.dataset.seekMaxMs = String(maxMs);
      busy = false; present(); pump.current();
    };
    const loaded = () => { if (clip.inPoint === 0) present(); pump.current(); };
    element.addEventListener("loadeddata", loaded);
    element.addEventListener("seeked", complete);
    element.addEventListener("error", fail);
    if (element.readyState >= 2) loaded();
    return () => {
      disposed = true; clearTimeout(timeout); pump.current = () => {};
      element.removeEventListener("loadeddata", loaded); element.removeEventListener("seeked", complete); element.removeEventListener("error", fail);
      element.pause(); element.removeAttribute("src"); element.load();
    };
  }, [clip.src, clip.inPoint, clip.fps]);
  return <video ref={video} className={styles.scrubVideo} data-clip={clip.id} data-media-state={failed ? "fallback" : ready ? "ready" : "loading"} src={failed ? undefined : clip.src} muted playsInline preload="auto" poster={clip.poster} aria-hidden="true" onPlay={event => event.currentTarget.pause()} style={{ ...crop(clip), opacity: ready && !failed ? 1 : 0 }} />;
});
