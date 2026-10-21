"use client";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clampProgress, cueAt, type Cinema } from "./cinema";
import { ScrubVideo, type ScrubHandle } from "./VideoMedia";
import { track, type Scene } from "./config";
import styles from "./careless.module.css";

export default function CinematicJourney({ cinema, scenes, reduced, onReduced, onHeroActive, onScout }: { cinema: Cinema; scenes: Scene[]; reduced: boolean; onReduced(): void; onHeroActive(active: boolean): void; onScout(): void }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLSpanElement>(null);
  const captionLayers = useRef<(HTMLDivElement | null)[]>([]);
  const mediaLayer = useRef<HTMLDivElement>(null);
  const posterLayer = useRef<HTMLImageElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const player = useRef<ScrubHandle | null>(null);
  const targetTime = useRef(0);
  const shownTime = useRef(0);
  const failed = useRef(false);
  const [armed, setArmed] = useState(false);
  const [near, setNear] = useState(true);
  const [introActive, setIntroActive] = useState(reduced);
  const [mediaReady, setMediaReady] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const film = cinema.master;
  const total = film.shots.reduce((sum, shot) => sum + shot.scrollLength, 0);
  const seekClip = useMemo(() => ({ ...film, inPoint: 0, outPoint: film.duration - 1 / film.fps }), [film]);

  const presentFrame = useCallback((time: number) => {
    shownTime.current = time;
    const root = section.current;
    if (!root) return;
    root.dataset.filmTime = time.toFixed(4);
    const shot = film.shots.find(item => time < item.end) || film.shots[film.shots.length - 1];
    root.dataset.currentClip = shot.id;
    const poster = time > film.duration - .25 ? film.endPoster : shot.poster;
    if (posterLayer.current && !posterLayer.current.dataset.fallback && posterLayer.current.getAttribute("src") !== poster) posterLayer.current.src = poster;
    if (progressBar.current) {
      const progress = clampProgress(time / film.duration);
      progressBar.current.style.setProperty("--film-progress", String(progress));
      progressBar.current.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    }
    // Follow the opening turn's focal point continuously instead of recropping at a cut.
    const turn = film.shots.find(item => item.id === "clip-2a") || film.shots[0];
    const cropProgress = clampProgress((time - turn.start) / Math.max(1, turn.end - turn.start));
    if (mediaLayer.current) {
      mediaLayer.current.style.setProperty("--film-crop", `center ${45 + cropProgress * 5}%`);
      mediaLayer.current.style.setProperty("--film-mobile-crop", `${30 + cropProgress * 20}% center`);
    }
    captionLayers.current.forEach((layer, index) => {
      if (!layer) return;
      const cue = cinema.cues[index];
      const at = cueAt(time, cue);
      const focused = layer.contains(document.activeElement);
      const visible = at.opacity > .015 || focused;
      layer.style.opacity = String(focused ? 1 : at.opacity);
      layer.style.transform = `translateY(${focused ? 0 : at.y}px)`;
      layer.style.visibility = visible ? "visible" : "hidden";
      layer.style.pointerEvents = visible && at.opacity > .6 || focused ? "auto" : "none";
      layer.setAttribute("aria-hidden", String(!visible));
      layer.dataset.visible = String(visible);
      const actions = layer.querySelector<HTMLElement>("[data-film-actions]");
      if (actions) {
        const actionAlpha = clampProgress((time - cue.start - .2) / .35);
        const hasFocus = actions.contains(document.activeElement);
        actions.style.opacity = String(hasFocus ? 1 : actionAlpha);
        actions.style.visibility = visible && actionAlpha > .02 || hasFocus ? "visible" : "hidden";
      }
    });
  }, [film, cinema.cues]);

  useEffect(() => {
    if (reduced || !stage.current) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: "300px" });
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const element = section.current;
    if (!element || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const lead = () => anchor.current?.offsetTop || 1;
    const travel = () => Math.max(1, element.offsetHeight - (stage.current?.offsetHeight || innerHeight) - lead());
    const reveal = (progress: number) => {
      setIntroActive(progress > .72);
      if (progress > .025) setArmed(true);
      onHeroActive(progress < .98 && element.getBoundingClientRect().bottom > 0);
      if (stage.current) { stage.current.style.opacity = String(progress); stage.current.style.pointerEvents = progress > .72 ? "auto" : "none"; }
      if (element.parentElement) { element.parentElement.style.setProperty("--intro-reveal", String(progress)); element.parentElement.dataset.covered = String(progress > .98); }
    };
    const clock = { time: 0 };
    const ctx = gsap.context(() => {
      const intro = ScrollTrigger.create({ trigger: element, start: "top top", end: () => `+=${lead()}`, onUpdate: self => reveal(self.progress), onRefresh: self => reveal(self.progress) });
      reveal(intro.progress);
      const timeline = gsap.timeline({ paused: true, onUpdate: () => {
        targetTime.current = clock.time;
        element.dataset.targetTime = clock.time.toFixed(4);
        player.current?.seek(clock.time / seekClip.outPoint);
        if (failed.current) {
          presentFrame(clock.time);
        }
      }});
      film.shots.forEach(shot => timeline.to(clock, { time: shot.end, duration: shot.scrollLength, ease: "none" }));
      const stops = cinema.cues.filter(cue => cue.actions).map(cue => {
        const time = cue.start + 1;
        const shotIndex = film.shots.findIndex(shot => time < shot.end);
        const shot = film.shots[Math.max(0, shotIndex)];
        const before = film.shots.slice(0, Math.max(0, shotIndex)).reduce((sum, item) => sum + item.scrollLength, 0);
        return (before + clampProgress((time - shot.start) / (shot.end - shot.start)) * shot.scrollLength) / total;
      });
      ScrollTrigger.create({ animation: timeline, trigger: element, start: () => `top+=${lead()} top`, end: () => `+=${travel()}`, scrub: true, invalidateOnRefresh: true,
        ...(film.settle ? { snap: { snapTo: (value: number) => { const closest = stops.reduce((a, b) => Math.abs(b - value) < Math.abs(a - value) ? b : a, value + 1); return Math.abs(closest - value) < .009 ? closest : value; }, delay: .7, duration: .35, inertia: false, directional: false } } : {})
      });
    }, element);
    const releaseFocus = () => requestAnimationFrame(() => presentFrame(shownTime.current));
    element.addEventListener("focusout", releaseFocus);
    return () => { element.removeEventListener("focusout", releaseFocus); ctx.revert(); };
  }, [cinema, film, total, reduced, presentFrame, onHeroActive, seekClip.outPoint]);

  if (reduced) return <section id="cinematic-journey" ref={section} tabIndex={-1} className={`${styles.journey} ${styles.staticJourney}`} aria-label="Cinematic journey, motion reduced">
    <span id="journey" className={styles.journeyAnchor} />
    <div className={styles.stage}>
      <img className={styles.videoPoster} src={scenes[5].image} alt="" style={{ objectPosition: "center" }} />
      <div className={styles.stageShade} />
      <div className={styles.sceneCopy}><p className={styles.eyebrow}>THE WORLD BENEATH</p><h2>Everything working together.</h2><p>Motion is reduced. You can choose the full cinematic journey or continue straight to the website.</p><div className={styles.scoutEncounter}><button className={styles.primary} onClick={onReduced}>Enable cinematic motion <ArrowRight size={16} /></button><a href="#experience">Continue without motion <ArrowDown size={16} /></a></div></div>
    </div>
  </section>;

  return <section id="cinematic-journey" ref={section} tabIndex={-1} className={`${styles.journey} ${styles.videoJourney} ${styles.filmJourney}`} style={{ height: `${100 + cinema.introScroll + total}svh` }} aria-label="Continuous cinematic journey from the pool to headquarters">
    <span id="journey" ref={anchor} className={styles.journeyAnchor} style={{ top: `${cinema.introScroll}svh` }} />
    <div ref={stage} className={styles.stage} style={{ opacity: 0, pointerEvents: "none" }}>
      <div ref={mediaLayer} className={styles.filmMedia} aria-hidden="true">
        <img ref={posterLayer} className={styles.videoPoster} src={film.poster} alt="" width="624" height="624" onError={event => { if (!event.currentTarget.dataset.fallback) { event.currentTarget.dataset.fallback = "true"; event.currentTarget.src = scenes[5].image; } }} />
        {near && armed && <ScrubVideo ref={handle => { player.current = handle; handle?.seek(targetTime.current / seekClip.outPoint); }} clip={seekClip} onPresented={time => { setMediaReady(true); presentFrame(time); }} onFailure={() => { failed.current = true; setMediaFailed(true); presentFrame(targetTime.current); }} />}
      </div>
      <div className={styles.stageShade} />
      <div className={`${styles.journeyTools} ${styles.filmTools}`} style={{ visibility: introActive ? "visible" : "hidden" }}><span>THE WORLD BENEATH</span><div><button onClick={onReduced}>Continue without motion</button><a href="#experience" onClick={() => track("journey_skip")}>Skip intro <ArrowRight size={14} /></a></div></div>
      {cinema.cues.map((cue, index) => {
        const copy = scenes.find(scene => scene.id === cue.scene) || scenes[0];
        return <div key={cue.id} ref={layer => { captionLayers.current[index] = layer; }} className={`${styles.sceneCopy} ${styles.filmCaption}`} data-cue={cue.id} aria-hidden="true" style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}><p className={styles.eyebrow}>{copy.label}</p><h2>{copy.title}</h2><p>{copy.note}</p>{cue.actions && <div className={styles.scoutEncounter} data-film-actions style={{ opacity: 0, visibility: "hidden" }}><p>Want a closer look?</p><button className={styles.primary} onClick={onScout}>Talk to Scout <ArrowUpRight size={16} /></button><a href="#headquarters">Keep exploring <ArrowDown size={16} /></a></div>}</div>;
      })}
      <div ref={progressBar} className={styles.filmProgress} role="progressbar" aria-label="Cinematic journey progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} style={{ visibility: introActive ? "visible" : "hidden" }}><span /><div><span>SCROLL TO EXPLORE</span><span>SCROLL BACK TO RETURN</span></div></div>
      {armed && !mediaReady && !mediaFailed && <p className={styles.filmNotice} role="status">Loading the film. You can skip ahead at any time.</p>}
      {mediaFailed && <p className={styles.filmNotice} role="status">The film is unavailable. Still images and the website remain accessible.</p>}
    </div>
  </section>;
}
