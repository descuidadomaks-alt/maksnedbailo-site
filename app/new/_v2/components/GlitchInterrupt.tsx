"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GlitchInterrupt — a signal-loss burst as the visitor leaves the hero.
 *
 * A pattern interrupt: the page appears to drop signal for half a second on
 * the way from screen one to screen two, then recovers. It is deliberately
 * SHORT and SUDDEN. Anything longer reads as a loading failure rather than
 * an effect, and anything that eases reads as a decorative wobble.
 *
 * ── Why the keyframes look repetitive ──
 * Every stop is declared TWICE, at n% and n.01%, so the browser jumps
 * between states instead of interpolating. Interpolated keyframes give a
 * smooth crossfade, which is exactly what a glitch is not. The burst is four
 * uneven hits with clean gaps between them — an even rhythm reads as a
 * pulsing animation, an uneven one reads as something breaking.
 *
 * ── Why it is not scroll-scrubbed ──
 * The dot field (ElevatorField) is scrubbed because it is a continuous
 * camera move. This is a discrete event: it fires once, plays at its own
 * speed, and stops. Tying it to scroll position would let a slow thumb
 * stretch it into a long smear.
 *
 * ── Cost ──
 * `backdrop-filter` is what makes the PAGE look broken rather than an
 * overlay looking animated, but it is the expensive part, so only the four
 * displaced slices use it. The whole overlay is conditionally rendered — it
 * is not in the DOM before the burst or after it — and it never takes
 * pointer events.
 *
 * Skipped entirely under prefers-reduced-motion: a full-screen strobe is
 * precisely what that setting exists to prevent.
 */

/** Total burst length. Tuned by feel: under ~400ms it fails to register, over
 *  ~700ms it stops reading as an accident. */
const DURATION_MS = 560;

/** How far down the viewport the hero's bottom edge is when the burst fires,
 *  as a fraction of viewport height. At 0.65 the hero is still most of the
 *  screen, so the glitch happens ON the hero as it leaves rather than on the
 *  section below it. */
const TRIGGER_AT = 0.65;

/** Set false to run the burst on phones only. Kept on for both because the
 *  effect reads the same at desktop widths and the trigger is identical. */
const RUN_ON_DESKTOP = true;

const MOBILE_BREAKPOINT = 768;

export default function GlitchInterrupt() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!RUN_ON_DESKTOP && window.innerWidth >= MOBILE_BREAKPOINT) return;

    // Don't arm if the page is ALREADY past the seam on mount. A browser
    // restoring scroll position after a refresh, or a visitor arriving on an
    // anchor deep in the page, would otherwise get an IntersectionObserver
    // callback immediately and a signal-loss burst on a screen they never
    // scrolled through. The burst only makes sense as a transition.
    if (sentinel.getBoundingClientRect().top <= window.innerHeight * TRIGGER_AT) return;

    // Pulling the root's BOTTOM edge up to TRIGGER_AT means the sentinel —
    // which travels up the screen as the page scrolls down — first
    // intersects at that line, not the moment it appears at the bottom of
    // the viewport. Fires once and then stops observing: a burst that
    // repeated every time you scrolled past would be an irritation rather
    // than an interrupt.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        setActive(true);
        timerRef.current = window.setTimeout(() => setActive(false), DURATION_MS);
      },
      { rootMargin: `0px 0px -${Math.round((1 - TRIGGER_AT) * 100)}% 0px` }
    );
    io.observe(sentinel);

    return () => {
      io.disconnect();
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {/* Marks the hero / section-two seam. Zero height so it cannot affect
          layout or the surrounding sections' backgrounds. */}
      <div ref={sentinelRef} aria-hidden style={{ height: 0 }} />

      {active && (
        <div className="v3-glitch" aria-hidden>
          <style>{`
            .v3-glitch {
              position: fixed;
              inset: 0;
              z-index: 9998;          /* header and floating CTA are z-50 */
              pointer-events: none;
              overflow: hidden;
            }
            .v3-glitch > div {
              position: absolute;
              inset: 0;
              will-change: opacity, transform;
            }

            /* ── Displaced slices: the page itself, inverted and shoved
                  sideways. These carry the effect; the rest is seasoning. ── */
            .v3-glitch-slice {
              -webkit-backdrop-filter: invert(1) hue-rotate(150deg) saturate(1.6);
              backdrop-filter: invert(1) hue-rotate(150deg) saturate(1.6);
              inset: auto 0 auto 0;
              opacity: 0;
            }
            .v3-glitch-slice.s1 { top: 7%;  height: 9%;  animation: v3-gl-s1 ${DURATION_MS}ms linear forwards; }
            .v3-glitch-slice.s2 { top: 29%; height: 6%;  animation: v3-gl-s2 ${DURATION_MS}ms linear forwards; }
            .v3-glitch-slice.s3 { top: 47%; height: 14%; animation: v3-gl-s3 ${DURATION_MS}ms linear forwards; }
            .v3-glitch-slice.s4 { top: 74%; height: 8%;  animation: v3-gl-s4 ${DURATION_MS}ms linear forwards; }

            @keyframes v3-gl-s1 {
              0%,11%      { opacity: 1; transform: translate3d(-8%,0,0); }
              11.01%,22%  { opacity: 0; transform: translate3d(0,0,0); }
              22.01%,31%  { opacity: 1; transform: translate3d(6%,0,0); }
              31.01%,45%  { opacity: 0; transform: translate3d(0,0,0); }
              45.01%,56%  { opacity: 1; transform: translate3d(-13%,0,0); }
              56.01%,67%  { opacity: 1; transform: translate3d(4%,0,0); }
              67.01%,100% { opacity: 0; transform: translate3d(0,0,0); }
            }
            @keyframes v3-gl-s2 {
              0%,11%      { opacity: 1; transform: translate3d(11%,0,0); }
              11.01%,45%  { opacity: 0; transform: translate3d(0,0,0); }
              45.01%,52%  { opacity: 1; transform: translate3d(7%,0,0); }
              52.01%,67%  { opacity: 1; transform: translate3d(-5%,0,0); }
              67.01%,76%  { opacity: 0; transform: translate3d(0,0,0); }
              76.01%,84%  { opacity: 1; transform: translate3d(3%,0,0); }
              84.01%,100% { opacity: 0; transform: translate3d(0,0,0); }
            }
            @keyframes v3-gl-s3 {
              0%,6%       { opacity: 1; transform: translate3d(5%,0,0); }
              6.01%,23%   { opacity: 0; transform: translate3d(0,0,0); }
              23.01%,31%  { opacity: 1; transform: translate3d(-9%,0,0); }
              31.01%,45%  { opacity: 0; transform: translate3d(0,0,0); }
              45.01%,61%  { opacity: 1; transform: translate3d(14%,0,0); }
              61.01%,67%  { opacity: 1; transform: translate3d(-6%,0,0); }
              67.01%,100% { opacity: 0; transform: translate3d(0,0,0); }
            }
            @keyframes v3-gl-s4 {
              0%,11%      { opacity: 1; transform: translate3d(-5%,0,0); }
              11.01%,45%  { opacity: 0; transform: translate3d(0,0,0); }
              45.01%,67%  { opacity: 1; transform: translate3d(9%,0,0); }
              67.01%,76%  { opacity: 0; transform: translate3d(0,0,0); }
              76.01%,84%  { opacity: 1; transform: translate3d(-4%,0,0); }
              84.01%,100% { opacity: 0; transform: translate3d(0,0,0); }
            }

            /* ── Chromatic fringe: two tinted layers pulled apart. A cheap
                  stand-in for a real channel split — at this speed the eye
                  reads it the same way. ── */
            .v3-glitch-rgb { mix-blend-mode: screen; opacity: 0; }
            .v3-glitch-rgb.r { background: rgba(255,0,72,0.20);  animation: v3-gl-rgbr ${DURATION_MS}ms linear forwards; }
            .v3-glitch-rgb.c { background: rgba(0,236,255,0.17); animation: v3-gl-rgbc ${DURATION_MS}ms linear forwards; }
            @keyframes v3-gl-rgbr {
              0%,11%      { opacity: 1; transform: translate3d(-5px,0,0); }
              11.01%,23%  { opacity: 0; transform: none; }
              23.01%,31%  { opacity: 1; transform: translate3d(3px,0,0); }
              31.01%,45%  { opacity: 0; transform: none; }
              45.01%,67%  { opacity: 1; transform: translate3d(-7px,2px,0); }
              67.01%,76%  { opacity: 0; transform: none; }
              76.01%,84%  { opacity: 1; transform: translate3d(2px,0,0); }
              84.01%,100% { opacity: 0; transform: none; }
            }
            @keyframes v3-gl-rgbc {
              0%,11%      { opacity: 1; transform: translate3d(5px,0,0); }
              11.01%,23%  { opacity: 0; transform: none; }
              23.01%,31%  { opacity: 1; transform: translate3d(-3px,0,0); }
              31.01%,45%  { opacity: 0; transform: none; }
              45.01%,67%  { opacity: 1; transform: translate3d(7px,-2px,0); }
              67.01%,76%  { opacity: 0; transform: none; }
              76.01%,84%  { opacity: 1; transform: translate3d(-2px,0,0); }
              84.01%,100% { opacity: 0; transform: none; }
            }

            /* ── Scanlines + roll. The roll is the only thing here that moves
                  continuously; it is what says "a display", not "a filter". ── */
            .v3-glitch-scan {
              background: repeating-linear-gradient(
                0deg,
                rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px,
                rgba(0,0,0,0) 1px, rgba(0,0,0,0) 3px
              );
              opacity: 0;
              animation: v3-gl-scan ${DURATION_MS}ms linear forwards;
            }
            @keyframes v3-gl-scan {
              0%,11%      { opacity: 0.9; transform: translate3d(0,0,0); }
              11.01%,23%  { opacity: 0; }
              23.01%,31%  { opacity: 0.7; }
              31.01%,45%  { opacity: 0; }
              45.01%,67%  { opacity: 1; transform: translate3d(0,-14px,0); }
              67.01%,100% { opacity: 0; }
            }

            /* ── Static. feTurbulence rendered once into a small tile. ── */
            .v3-glitch-noise {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
              mix-blend-mode: overlay;
              opacity: 0;
              animation: v3-gl-noise ${DURATION_MS}ms steps(1,end) forwards;
            }
            @keyframes v3-gl-noise {
              0%,11%      { opacity: 0.55; background-position: 0 0; }
              11.01%,23%  { opacity: 0; }
              23.01%,31%  { opacity: 0.4;  background-position: 37px 12px; }
              31.01%,45%  { opacity: 0; }
              45.01%,67%  { opacity: 0.65; background-position: -22px 41px; }
              67.01%,76%  { opacity: 0; }
              76.01%,84%  { opacity: 0.25; background-position: 15px -30px; }
              84.01%,100% { opacity: 0; }
            }

            /* ── Signal drop, plus a single accent tear. The lime is the brand
                  colour, so even the break still looks like it belongs. ── */
            .v3-glitch-drop {
              background: #060608;
              opacity: 0;
              animation: v3-gl-drop ${DURATION_MS}ms steps(1,end) forwards;
            }
            @keyframes v3-gl-drop {
              0%,4%       { opacity: 0.85; }
              4.01%,45%   { opacity: 0; }
              45.01%,50%  { opacity: 0.7; }
              50.01%,100% { opacity: 0; }
            }
            .v3-glitch-tear {
              background: rgba(212,255,43,0.9);
              inset: auto 0 auto 0;
              height: 2px;
              opacity: 0;
              animation: v3-gl-tear ${DURATION_MS}ms steps(1,end) forwards;
            }
            @keyframes v3-gl-tear {
              0%,7%       { opacity: 1; top: 22%; }
              7.01%,23%   { opacity: 0; }
              23.01%,29%  { opacity: 1; top: 61%; }
              29.01%,45%  { opacity: 0; }
              45.01%,53%  { opacity: 1; top: 38%; }
              53.01%,60%  { opacity: 1; top: 79%; }
              60.01%,100% { opacity: 0; }
            }
          `}</style>

          <div className="v3-glitch-drop" />
          <div className="v3-glitch-slice s1" />
          <div className="v3-glitch-slice s2" />
          <div className="v3-glitch-slice s3" />
          <div className="v3-glitch-slice s4" />
          <div className="v3-glitch-rgb r" />
          <div className="v3-glitch-rgb c" />
          <div className="v3-glitch-noise" />
          <div className="v3-glitch-scan" />
          <div className="v3-glitch-tear" />
        </div>
      )}
    </>
  );
}
