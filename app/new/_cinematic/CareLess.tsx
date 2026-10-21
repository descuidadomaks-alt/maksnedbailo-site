"use client";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowDown, ArrowUpRight, ArrowRight, Check, Heart, X, Plus, Minus } from "lucide-react";
import { fallbackScenes, initialScenes, routes, track, type Scene } from "./config";
import styles from "./careless.module.css";
import CinematicJourney from "./CinematicJourney";
import { AmbientVideo } from "./VideoMedia";
import { initialCinema, readCinema } from "./cinema";
import Lenis from "lenis";
import { gsap } from "gsap";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

function SceneMedia({ scene, progress = 0, eager = false, motion = false }: { scene: Scene; progress?: number; eager?: boolean; motion?: boolean }) {
 const [failed, setFailed] = useState(false);
 const frame = Math.round(clamp(progress) * Math.max(0, (scene.frames?.length || 1) - 1));
 const src = motion && scene.mode === "sequence" && scene.frames?.length ? scene.frames[frame] : scene.image;
 useEffect(() => {
  if (!motion || scene.mode !== "sequence" || !scene.frames?.length) return;
  scene.frames.slice(Math.max(0, frame - 3), frame + 5).forEach(path => { const preload = new Image(); preload.src = path; });
 }, [frame, motion, scene]);
 useEffect(() => setFailed(false), [src]);
 return <picture>{!failed && scene.mobileImage && !(motion && scene.mode === "sequence") && <source media="(max-width: 700px)" srcSet={scene.mobileImage} />}<img src={failed ? fallbackScenes.find(s => s.id === scene.id)?.image || fallbackScenes[0].image : src} alt="" width="1920" height="1080" loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} style={{ objectPosition: scene.position || "center", "--mobile-position": scene.mobilePosition || scene.position || "center" } as CSSProperties} /></picture>;
}
const categories = [
 { title: "Getting customers", subtitle: "Make the first impression count.", text: "From being discovered to being chosen. Make it easier to enquire, have a useful conversation and take the next step.", examples: ["Websites that guide people somewhere", "AI assistants that understand the enquiry", "Thoughtful follow-ups with a human route"], tag: "Discovery / Enquiries / Conversion", nodes: ["Discovered", "Understood", "Connected"] },
 { title: "Taking care of customers", subtitle: "Make every next step feel easy.", text: "Give people clarity before they have to ask. Connect booking, communication and support around the experience they actually need.", examples: ["Booking journeys with fewer loose ends", "Useful answers and clear service updates", "Personal experiences, with people in reach"], tag: "Booking / Service / Support", nodes: ["Booked", "Informed", "Looked after"] },
 { title: "Running the business", subtitle: "Give good people their time back.", text: "Help your team see what matters and move work forward. Connect the tools, information and decisions behind the experience.", examples: ["Internal tools shaped around real work", "Connected data and clearer forecasting", "Automation for repetitive handovers"], tag: "Operations / Tools / Decisions", nodes: ["Connected", "Organised", "Moving"] },
];
export default function CareLess() {
 const [scenes, setScenes] = useState(initialScenes);
 const [cinema, setCinema] = useState(initialCinema);
 const [heroActive, setHeroActive] = useState(true);
 const [simple, setSimple] = useState(true);
 const [dialog, setDialog] = useState<"scout" | "privacy" | null>(null);
 const [active, setActive] = useState(0);
 const [liked, setLiked] = useState(false);
 const [likeMessage, setLikeMessage] = useState("");
 const hq = useRef<HTMLElement>(null);
 const modal = useRef<HTMLDialogElement>(null);
 const focusReturn = useRef<HTMLElement | null>(null);
 const smoothScroll = useRef<Lenis | null>(null);
 const motionChoice = useRef<"full" | "reduced" | null>(null);
 const pendingTarget = useRef<"journey" | "experience" | null>(null);
 useEffect(() => {
  const controller = new AbortController();
  fetch("/careless/media.json", { signal: controller.signal }).then(r => { if (!r.ok) throw Error("manifest"); return r.json(); }).then(data => {
   if (!Array.isArray(data.scenes)) return;
   const nextCinema = readCinema(data.cinema); if (nextCinema) setCinema(nextCinema);
   const safePath = (p: unknown) => typeof p === "string" && p.startsWith("/careless/") && !p.includes("..");
   setScenes(fallbackScenes.map(s => {
    const match = data.scenes.find((v: Scene) => v.id === s.id);
    if (!match || !safePath(match.image)) return s;
    return { ...s, image: match.image, mobileImage: safePath(match.mobileImage) ? match.mobileImage : undefined, position: typeof match.position === "string" ? match.position : "center", mobilePosition: typeof match.mobilePosition === "string" ? match.mobilePosition : undefined, mode: match.mode === "sequence" ? "sequence" : "image", frames: Array.isArray(match.frames) ? match.frames.filter(safePath).slice(0, 180) : undefined };
   }));
  }).catch(() => { /* Complete local storyboard survives manifest failure. */ });
  try { setLiked(localStorage.getItem("careless-appreciated-v1") === "yes"); } catch { /* Optional storage. */ }
  try { const saved = localStorage.getItem("careless-motion-v2"); if (saved === "full" || saved === "reduced") motionChoice.current = saved; } catch { /* Explicit choices still work without storage. */ }
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  const change = () => { const connection = (navigator as Navigator & {connection?: {saveData?: boolean}}).connection; const lowData = !!connection?.saveData; setSimple(motionChoice.current ? motionChoice.current === "reduced" : mq.matches || lowData); };
  change(); mq.addEventListener("change", change);
  return () => { controller.abort(); mq.removeEventListener("change", change); };
 }, []);
 useEffect(() => {
  if (simple) return;
  const lenis = new Lenis({ lerp: .1, smoothWheel: true, syncTouch: false, anchors: false });
  smoothScroll.current = lenis;
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  const anchorClick = (event: globalThis.MouseEvent) => {
   if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
   if (!link || link.hash.length < 2) return;
   const target = document.getElementById(link.hash.slice(1));
   if (!target) return;
   event.preventDefault();
   lenis.scrollTo(target, { offset: -40, duration: .85, lerp: 0, onComplete: () => target.focus({ preventScroll: true }) });
  };
  document.addEventListener("click", anchorClick);
  return () => { document.removeEventListener("click", anchorClick); gsap.ticker.remove(tick); lenis.destroy(); smoothScroll.current = null; };
 }, [simple]);
 useEffect(() => {
  if (!pendingTarget.current) return;
  const target = pendingTarget.current;
  const frame = requestAnimationFrame(() => { pendingTarget.current = null; jumpTo(target); });
  return () => cancelAnimationFrame(frame);
 }, [simple]);
 useEffect(() => {
  let frame = 0;
  const update = () => { frame = 0; if (hq.current) { const rect = hq.current.getBoundingClientRect(); hq.current.style.setProperty("--hq-progress", String(simple ? 1 : clamp((innerHeight - rect.top) / innerHeight))); } };
  const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
  update(); addEventListener("scroll", scroll, {passive:true}); addEventListener("resize", scroll);
  return () => { cancelAnimationFrame(frame); removeEventListener("scroll", scroll); removeEventListener("resize", scroll); };
 }, [simple]);
 useEffect(() => {
  if (dialog && modal.current) { focusReturn.current = document.activeElement as HTMLElement; modal.current.showModal(); }
  else if (modal.current?.open) { modal.current.close(); focusReturn.current?.focus(); }
 }, [dialog]);
 function openScout() { track("scout_open", { state: "paused" }); setDialog("scout"); }
 function jumpTo(target: "top" | "journey" | "experience") {
  const anchor = document.getElementById(target);
  if (!anchor) return;
  const top = target === "top" ? 0 : Math.ceil(anchor.getBoundingClientRect().top + scrollY) + 1;
  if (smoothScroll.current) smoothScroll.current.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
  document.getElementById(target === "top" ? "hero-title" : target === "journey" ? "cinematic-journey" : "experience")?.focus({ preventScroll: true });
 }
 function chooseMotion(full: boolean) {
  motionChoice.current = full ? "full" : "reduced";
  try { localStorage.setItem("careless-motion-v2", motionChoice.current); } catch { /* Optional preference storage. */ }
  pendingTarget.current = full ? "journey" : "experience";
  setSimple(!full);
 }
 function filmAnchor(event: MouseEvent<HTMLAnchorElement>, target: "top" | "journey") {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = document.getElementById(target);
  if (!anchor) return;
  event.preventDefault();
  if (target === "journey" && simple) chooseMotion(true);
  else jumpTo(target);
  if (target === "journey") track("journey_start");
 }
 function appreciate() {
  if (liked) { setLikeMessage("Your appreciation is already saved on this device. Thank you."); return; }
  try { localStorage.setItem("careless-appreciated-v1", "yes"); setLikeMessage("Thank you. Saved on this device, with no follow-up."); }
  catch { setLikeMessage("Thank you. Your appreciation is noted for this visit."); }
  setLiked(true); track("appreciation");
 }
 const Arrow = ArrowUpRight;
 const storyboard = scenes.some(s => s.image.includes("placeholder"));
 return <main className={`${styles.page} ${simple ? styles.simple : ""}`}>
  <noscript><style>{`#experience [hidden]{display:block!important} #cinematic-journey{height:110svh!important}`}</style><p className={styles.noScript}>Scout is currently paused. <a href={routes.booking}>Schedule a human meeting</a> or <a href={routes.whatsapp}>WhatsApp us</a>.</p></noscript>
  <a className={styles.skip} href="#experience">Skip the cinematic introduction</a>
  <header className={styles.header}><a href="#top" onClick={event => filmAnchor(event, "top")} className={styles.brand} aria-label="Care Less, back to top">care less<span>®</span><i /></a><nav aria-label="Main navigation"><a href="#experience">What we do</a><a href="#work">Selected work</a><a href="#approach">Our approach</a></nav><button className={styles.headerCta} onClick={openScout}>Meet Scout <Arrow size={16} /></button></header>
  <div className={styles.filmIntro}>
  <section id="top" className={styles.hero} aria-labelledby="hero-title"><div className={styles.heroMedia}><AmbientVideo clip={cinema.hero} reduced={simple} active={heroActive} /></div><div className={styles.heroShade} /><div className={styles.heroContent}><p className={styles.eyebrow}><span /> EXPERIENCE, BY DESIGN</p><h1 id="hero-title" tabIndex={-1}>Better experiences.<br /><em>Less work</em> behind them.</h1><p className={styles.heroCopy}>We design better customer experiences—and build the AI, software, websites, and business systems that make them work.</p><div className={styles.actions}><a className={styles.primary} href="#journey" onClick={event => filmAnchor(event, "journey")}>{simple ? "Enable cinematic motion" : "Explore the experience"} <ArrowDown size={17} /></a><button className={styles.textButton} onClick={openScout}>Talk to Scout <Arrow size={17} /></button></div>{simple && <p className={styles.motionHint}>Motion is reduced. Enable the film above, or <a href="#experience">continue without animation</a>.</p>}</div><div className={styles.heroBottom}><a href="#journey" onClick={event => filmAnchor(event, "journey")}><span className={styles.scrollLine} /> A DIFFERENT PERSPECTIVE AWAITS</a><span>SCROLL TO DISCOVER ↓</span></div>{storyboard && <span className={styles.placeholder}>CINEMATIC STORYBOARD / FINAL MEDIA TO FOLLOW</span>}</section>
  <CinematicJourney key={simple ? "still" : "film"} cinema={cinema} scenes={scenes} reduced={simple} onReduced={() => chooseMotion(simple)} onHeroActive={setHeroActive} onScout={openScout} />
  </div>
  <section id="headquarters" tabIndex={-1} ref={hq} className={styles.headquarters}><div className={styles.hqMedia}><SceneMedia scene={{...scenes[7], image: cinema.master.endPoster, mobileImage: undefined, position: "center", mobilePosition: "center"}} /></div><div className={styles.hqPanel}><p className={styles.eyebrow}>CARE LESS / HEADQUARTERS</p><span className={styles.systemMark}>✳</span><h2>What feels effortless<br />has something <em>thoughtful</em><br />behind it.</h2><p>A better experience on the surface.<br />Connected systems underneath.</p><a href="#experience" className={styles.textButton}>Step inside <ArrowDown size={17} /></a></div></section>
  <section id="experience" className={styles.experience} tabIndex={-1}><div className={styles.sectionTop}><p className={styles.eyebrow}>01 / WHAT WE MAKE BETTER</p><span>HUMAN EXPERIENCE. WORKING SYSTEMS.</span></div><div className={styles.sectionHeading}><h2>Less friction.<br /><em>More possibility.</em></h2><p>For your customers. Your team. And you.<br /><br />We start with what could feel better, then build what makes it possible.</p></div><div className={styles.categoryList}>{categories.map((item, i) => <article className={`${styles.category} ${active === i ? styles.categoryActive : ""}`} key={item.title}><h3><button onClick={() => { setActive(active === i ? -1 : i); track("category_open", { category: String(i) }); }} aria-expanded={active === i} aria-controls={`category-${i}`}><span className={styles.categoryNo}>0{i + 1}</span><span>{item.title}</span>{active === i ? <Minus size={23} /> : <Plus size={23} />}</button></h3><div id={`category-${i}`} hidden={active !== i} className={styles.categoryBody}><div><h4>{item.subtitle}</h4><p>{item.text}</p><ul>{item.examples.map(example => <li key={example}><Check size={14} />{example}</li>)}</ul><span className={styles.mono}>{item.tag}</span></div><div className={styles.flow} aria-label="Illustrative connected experience"><span className={styles.flowLabel}>A BETTER JOURNEY</span>{item.nodes.map((node, n) => <div key={node}><span>0{n + 1}</span><strong>{node}</strong>{n < 2 && <ArrowDown size={15} />}</div>)}<span className={styles.flowFoot}>CONNECTED BY DESIGN</span></div></div></article>)}</div><p className={styles.categoryNote}>Different problems. One connected approach. We shape the work around your business.</p></section>
  <section className={styles.yourself} aria-labelledby="yourself-title"><div><p className={styles.eyebrow}>02 / EXPERIENCE IT YOURSELF</p><h2 id="yourself-title">Imagine your customers<br />being treated <em>this way.</em></h2><p>Someone thought about where you would look. What you might wonder. And what should happen next.</p><p>That’s the care we bring to your business. The experience you see, and the systems you don’t.</p><button className={styles.primary} onClick={openScout}>Explore your possibilities with Scout <Arrow size={17} /></button></div><div className={styles.scoutCard}><span className={styles.mono}>YOUR GUIDE BELOW THE SURFACE</span><div className={styles.scoutPlaceholder} aria-label={scenes[6].image.includes("placeholder") ? "Scout character image pending approved asset" : "Scout in the amber colony"}>{scenes[6].image.includes("placeholder") ? <><span>SCOUT</span><span>05 / CHARACTER FRAME</span></> : <SceneMedia scene={scenes[6]} />}</div><div className={styles.scoutStatus}><span /> Scout is taking a little pause.</div><p>While our guide gets ready, you can speak directly with Maks.</p><a href={routes.booking} target="_blank" rel="noopener noreferrer" onClick={() => track("booking_click", { source: "scout_card" })}>Schedule a conversation <Arrow size={16} /></a></div></section>
  <section id="work" tabIndex={-1} className={styles.work}><div className={styles.sectionTop}><p className={styles.eyebrow}>03 / SELECTED WORK & EXPLORATIONS</p><span>REAL BUILDS. CLEAR CONTEXT.</span></div><div className={styles.sectionHeading}><h2>A few ways<br /><em>it comes to life.</em></h2><p>A selection from our existing project archive. Demonstrations show the experience; they are not promises of customer results.</p></div><div className={styles.workGrid}><a className={styles.workCard} href="/projects/notd"><div className={styles.workVisual}><span className={styles.mono}>NAILSOFTHEDAY / INVENTORY</span><div className={styles.bars}>{[36, 65, 48, 82, 58, 95, 74, 88].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div><span className={styles.mono}>CLARITY FOR THE NEXT ORDER</span></div><div className={styles.workMeta}><span>WORKING DEMONSTRATION</span><Arrow size={20} /></div><h3>Nailsoftheday reorder tool</h3><p>An inventory planning demonstration built around spreadsheet exports. Explore with example data.</p></a><a className={styles.workCard} href="/projects/parati"><div className={`${styles.workVisual} ${styles.workPhoto}`}><img src="/projects/parati/hero.jpg" alt="Para Ti massage salon website demonstration" width="800" height="600" loading="lazy" /><span>Para Ti</span></div><div className={styles.workMeta}><span>WEBSITE DEMONSTRATION</span><Arrow size={20} /></div><h3>A calmer booking experience</h3><p>A salon website exploration that connects atmosphere, clear information and a simple next step.</p></a><a className={styles.workCard} href="/projects/roman"><div className={`${styles.workVisual} ${styles.workPhoto}`}><img src="/careless/images/roman-preview.webp" alt="Roman Shiglo real estate advisor" width="800" height="600" loading="lazy" /><span className={styles.romanWordmark}>ROMAN SHIGLO</span></div><div className={styles.workMeta}><span>ARCHIVED WEBSITE PROTOTYPE</span><Arrow size={20} /></div><h3>A personal investment perspective</h3><p>An earlier website prototype for real estate advisor Roman Shiglo. Explore the archived design.</p></a></div></section>
  <section id="approach" tabIndex={-1} className={styles.approach}><div><p className={styles.eyebrow}>04 / HOW WE WORK</p><h2>Start with the problem.<br /><em>Build the better way.</em></h2><p>Sometimes the best place to begin is a focused Care Less Fix: one important point of friction, carefully understood and improved.</p><a href={routes.booking} className={styles.textButton} target="_blank" rel="noopener noreferrer" onClick={() => track("booking_click", { source: "approach" })}>Find a place to start <Arrow size={17} /></a></div><ol>{[["Understand the problem", "Listen to the people, follow the work and find where the experience breaks."], ["Design a better experience", "Make the next step clearer, easier and more human."], ["Build the system", "Connect the website, software, AI and operations the experience needs."], ["Test, improve and support", "Try it in the real world. Learn what works. Keep making it better."]].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
  <section id="contact" className={styles.final}><div className={styles.finalMedia}><AmbientVideo clip={cinema.hero} reduced={simple} /></div><div className={styles.finalShade} /><div className={styles.finalContent}><p className={styles.eyebrow}>BACK TO THE SURFACE. A DIFFERENT PERSPECTIVE.</p><h2>What would you<br />like to <em>care less</em> about?</h2><p>Let’s make a little more room for what matters.</p><div className={styles.finalActions}><button className={styles.primary} onClick={openScout}>Talk to Scout <Arrow size={17} /></button><a href={routes.booking} target="_blank" rel="noopener noreferrer" onClick={() => track("booking_click", { source: "final" })}>Schedule a human meeting <Arrow size={16} /></a><a href={routes.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click")}>WhatsApp us <Arrow size={16} /></a></div><button className={styles.like} aria-pressed={liked} onClick={appreciate}><Heart size={17} fill={liked ? "currentColor" : "none"} />{liked ? "Loved. Thank you." : "Loved the experience?"}</button><p className={styles.likeMessage} role="status">{likeMessage || "Just a little appreciation. No sales follow-up."}</p></div><footer><a className={styles.brand} href="#top" onClick={event => filmAnchor(event, "top")}>care less<span>®</span><i /></a><span>Thoughtful experiences. Working systems.</span><button onClick={() => setDialog("privacy")}>Privacy & choices</button><span>© 2026 Care Less</span></footer></section>
  <dialog data-lenis-prevent ref={modal} className={styles.dialog} aria-labelledby="careless-dialog-title" onCancel={() => setDialog(null)} onClick={e => { if (e.target === e.currentTarget) setDialog(null); }}><button className={styles.close} aria-label="Close dialog" onClick={() => setDialog(null)}><X size={22} /></button>{dialog === "privacy" ? <><p className={styles.eyebrow}>PRIVACY & CHOICES</p><h2 id="careless-dialog-title">A little clarity.</h2><p>This preview does not load Scout, collect chat details or send appreciation to a sales system.</p><p>Choosing cinematic or reduced motion saves that choice in this browser. Choosing the heart also saves your appreciation here. No public count is shown. You can clear it below.</p><p>Booking opens zcal; WhatsApp opens WhatsApp. Their own privacy policies apply. Opening either link does not confirm a booking or send a message.</p><button className={styles.primary} onClick={() => { try { localStorage.removeItem("careless-appreciated-v1"); } catch {} setLiked(false); setLikeMessage("Your saved appreciation has been cleared."); setDialog(null); }}>Clear saved appreciation</button></> : <><p className={styles.eyebrow}>MEET SCOUT / CURRENTLY PAUSED</p><h2 id="careless-dialog-title">Our guide is<br /><em>getting ready.</em></h2><p>Scout’s live conversation is paused while we finish the public experience. No chat has started and no details have been sent.</p><p>In the meantime, Maks is a good place to start.</p><a className={styles.primary} href={routes.booking} target="_blank" rel="noopener noreferrer" onClick={() => track("booking_click", { source: "scout_fallback" })}>Schedule a human meeting <Arrow size={17} /></a><a className={styles.dialogLink} href={routes.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { source: "scout_fallback" })}>Continue on WhatsApp <Arrow size={17} /></a><p className={styles.dialogFine}>Booking: existing 90-minute Strategic AI Map, via Google Meet. No voice feature is enabled.</p></>}</dialog>
 </main>;
}
