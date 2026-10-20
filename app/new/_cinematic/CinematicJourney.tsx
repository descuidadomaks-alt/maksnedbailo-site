"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { clampProgress, locateClip, type Cinema } from "./cinema";
import { ScrubVideo, type ScrubHandle } from "./VideoMedia";
import { track, type Scene } from "./config";
import styles from "./careless.module.css";

export default function CinematicJourney({ cinema, scenes, reduced, onReduced, onHeroActive, onScout }: { cinema: Cinema; scenes: Scene[]; reduced: boolean; onReduced(): void; onHeroActive(active: boolean): void; onScout(): void }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const players = useRef<(ScrubHandle | null)[]>([]);
  const current = useRef(-1);
  const [index, setIndex] = useState(0);
  const [loadWindow, setLoadWindow] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  const [encounteredScout, setEncounteredScout] = useState(false);
  const [failures, setFailures] = useState<Record<string, boolean>>({});
  const total = cinema.journey.reduce((sum, clip) => sum + clip.scrollLength, 0);
  const clip = cinema.journey[index];
  const copy = scenes.find(scene => scene.id === clip.copySceneId) || scenes[0];

  useEffect(() => {
    let scheduled = 0;
    const update = () => {
      scheduled = 0;
      const element = section.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const lead = reduced ? 0 : innerHeight * cinema.introScroll / 100;
      const range = Math.max(1, rect.height - innerHeight - lead);
      const reveal = reduced ? 1 : clampProgress(-rect.top / Math.max(1, lead));
      const progress = clampProgress((-rect.top - lead) / range);
      const at = locateClip(progress, cinema.journey);
      if (current.current !== at.index) { current.current = at.index; setIndex(at.index); }
      const near = rect.bottom > -innerHeight && rect.top < innerHeight * 2;
      setLoadWindow(near && reveal > .04 && !reduced);
      setIntroActive(reveal > .72 || reduced);
      onHeroActive(reveal < .98 && rect.bottom > 0);
      if (at.index >= 6 && at.fraction > .27) setEncounteredScout(true);
      if (stage.current) {
        stage.current.style.opacity = String(reveal);
        stage.current.style.pointerEvents = reveal > .72 ? "auto" : "none";
      }
      if (element.parentElement) {
        element.parentElement.style.setProperty("--intro-reveal", String(reduced ? 0 : reveal));
        element.parentElement.dataset.covered = String(!reduced && reveal > .98);
      }
      element.dataset.currentClip = cinema.journey[at.index].id;
      element.dataset.clipProgress = at.fraction.toFixed(4);
      element.dataset.journeyProgress = progress.toFixed(4);
      layers.current.forEach((layer, i) => {
        if (!layer) return;
        const outgoing = cinema.journey[at.index];
        const blend = outgoing.transition === "cut" || reduced ? 0 : Math.min(.16, outgoing.transitionDuration / (outgoing.outPoint - outgoing.inPoint));
        const incoming = blend > 0 ? clampProgress((at.fraction - (1 - blend)) / blend) : 0;
        layer.style.opacity = i === at.index ? "1" : i === at.index + 1 ? String(incoming) : "0";
      });
      players.current.forEach((player, i) => player?.seek(i === at.index ? at.fraction : i < at.index ? 1 : 0));
    };
    const onScroll = () => { if (!scheduled) scheduled = requestAnimationFrame(update); };
    update(); addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(scheduled); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, [cinema, reduced, index, loadWindow, onHeroActive]);

  function goTo(target: number) {
    const element = section.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const lead = reduced ? 0 : innerHeight * cinema.introScroll / 100;
    const range = Math.max(1, rect.height - innerHeight - lead);
    const before = cinema.journey.slice(0, target).reduce((sum, item) => sum + item.scrollLength, 0);
    const fraction = (before + cinema.journey[target].scrollLength * .18) / total;
    window.scrollTo({ top: Math.ceil(rect.top + scrollY + lead + fraction * range) + 1, behavior: "instant" as ScrollBehavior });
  }

  return <section id="cinematic-journey" ref={section} className={`${styles.journey} ${styles.videoJourney}`} style={{ height: reduced ? "180svh" : `${100 + cinema.introScroll + total}svh` }} aria-label="Scroll journey from the pool to the underground headquarters">
    <span id="journey" className={styles.journeyAnchor} style={{ top: reduced ? 0 : `${cinema.introScroll}svh` }} />
    <div ref={stage} className={styles.stage} style={{ opacity: reduced ? 1 : 0, pointerEvents: reduced ? "auto" : "none" }}>
      <div className={styles.sceneLayers} aria-hidden="true">{cinema.journey.map((item, i) => {
        const nearby = Math.abs(i - index) <= 1;
        const fallback = scenes.find(scene => scene.id === item.copySceneId)?.image || scenes[0].image;
        return <div key={item.id} ref={node => { layers.current[i] = node; }} className={styles.sceneLayer}>
          {nearby && <>
            <img className={styles.videoPoster} src={item.poster} alt="" width="624" height="624" loading="eager" decoding="async" style={{ objectPosition: item.position, "--mobile-position": item.mobilePosition } as CSSProperties} onError={event => { if (!event.currentTarget.dataset.fallback) { event.currentTarget.dataset.fallback = "yes"; event.currentTarget.src = fallback; } }} />
            {loadWindow && !reduced && <ScrubVideo ref={handle => { players.current[i] = handle; }} clip={item} onFailure={() => setFailures(old => old[item.id] ? old : { ...old, [item.id]: true })} />}
          </>}
        </div>;
      })}</div>
      <div className={styles.stageShade} />
      <div className={styles.journeyTools} style={{ visibility: introActive ? "visible" : "hidden" }}><span>THE WORLD BENEATH</span><div><button aria-pressed={reduced} onClick={onReduced}>{reduced ? "Enable motion" : "Reduce motion"}</button><a href="#experience" onClick={() => track("journey_skip")}>Skip intro <ArrowRight size={14} /></a></div></div>
      <div className={styles.sceneCopy} style={{ visibility: introActive ? "visible" : "hidden" }}><p className={styles.eyebrow}>{copy.label}</p><h2>{copy.title}</h2><p>{copy.note}</p>
        <div className={styles.scoutEncounter} hidden={!encounteredScout && !reduced}><p>Want a closer look?</p><button className={styles.primary} onClick={onScout}>Talk to Scout <ArrowUpRight size={16} /></button><a href="#headquarters">Keep exploring <ArrowDown size={16} /></a></div>
        {failures[clip.id] && <p className={styles.mediaNotice} role="status">Using a still image for this scene. You can keep exploring.</p>}
      </div>
      <div className={styles.sceneRail} aria-label="Journey chapters" style={{ visibility: introActive ? "visible" : "hidden" }}>{cinema.journey.map((item, i) => {
        const chapter = scenes.find(scene => scene.id === item.copySceneId) || scenes[0];
        return <button key={item.id} aria-label={`Go to ${chapter.label}`} aria-current={index === i ? "step" : undefined} onClick={() => goTo(i)}><span />{String(i + 1).padStart(2, "0")}</button>;
      })}</div>
      <span className={styles.placeholder} style={{ visibility: introActive ? "visible" : "hidden" }}>SCROLL BACK TO REVERSE</span>
    </div>
  </section>;
}
