"use client";

import { useEffect, useRef, useState } from "react";
import type { NewPageDict } from "../lib/i18n";
import GlassButton from "../components/GlassButton";
import { CTA_TARGET, SCORE_TARGET, STAGE_PHOTO_SRC } from "../lib/config";

// Photo is rendered at 125% width — this is how far (in % of its own width)
// it pans across the full scroll-through of the hero.
const PAN_MAX_PERCENT = 22;

/**
 * Scroll-linked horizontal pan for the hero photo. Progress runs 0 -> 1 as
 * the section scrolls from fully in view to fully scrolled past, driving a
 * translateX of up to PAN_MAX_PERCENT — Maks is visible at progress 0, the
 * crowd is revealed as the user scrolls. Disabled under
 * prefers-reduced-motion (CSS also forces transform: none as a backstop).
 */
function useHeroPan(ref: React.RefObject<HTMLElement | null>) {
  const [pan, setPan] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      setPan(progress * PAN_MAX_PERCENT);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return pan;
}

/**
 * Dual CTA stack — Score (primary, liquid-glass) + Map (secondary, ghost),
 * each with its own microcopy directly below it.
 */
function HeroCTAs({ d }: { d: NewPageDict }) {
  return (
    <div data-reveal="d3" className="flex flex-col items-start gap-5">
      <div>
        <GlassButton href={SCORE_TARGET} style={{ whiteSpace: "nowrap" }}>
          {d.hero.primaryCta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
        </GlassButton>
        <p className="font-sora font-light text-fg/45 mt-2.5" style={{ fontSize: "12px" }}>
          {d.hero.primaryMicrocopy}
        </p>
      </div>

      <div>
        <a
          href={CTA_TARGET}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2.5 font-sora font-semibold rounded-xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04]"
          style={{
            fontSize: "15px",
            padding: "17px 32px",
            minHeight: "60px",
            letterSpacing: "-0.01em",
            border: "1px solid rgba(255,255,255,0.16)",
            color: "rgba(240,236,230,0.85)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {d.hero.secondaryCta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
        </a>
        <p className="font-sora font-light text-fg/45 mt-2.5" style={{ fontSize: "12px" }}>
          {d.hero.guarantee}
        </p>
      </div>
    </div>
  );
}

/**
 * Section 1 — HERO.
 *
 * Mobile: stage photo full-bleed behind the whole hero, dark gradient
 * overlay, copy stacked at the bottom.
 * Desktop (≥768px): photo becomes a ~50vh band under the header with a
 * fade-out at its base; copy sits below in a 2-col grid (headline+sub left
 * ~55%, CTA stack right ~45%, vertically centered).
 * Both breakpoints share one <img>, panned horizontally on scroll via
 * useHeroPan — see .new-hero-* in globals.css.
 */
export default function Hero({ d }: { d: NewPageDict }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pan = useHeroPan(sectionRef);

  return (
    <section ref={sectionRef} className="new-hero-section">
      {/* Stage photo — scroll-linked horizontal pan */}
      <div className="new-hero-photo-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STAGE_PHOTO_SRC}
          alt="Maks Nedbailo speaking on stage"
          className="new-hero-photo"
          style={{ transform: `translateX(-${pan}%)`, objectPosition: "28% 38%", filter: "grayscale(0.1) contrast(1.05)" }}
        />
        <div className="new-hero-overlay-mobile" aria-hidden />
        <div className="new-hero-fade-desktop" aria-hidden />

        {/* Ambient accent glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 900px 600px at 78% 100%, rgba(212,255,43,0.10) 0%, transparent 65%)" }}
        />
      </div>

      {/* Copy + CTAs */}
      <div className="new-hero-content">
        <div className="new-hero-content-inner">

          <div>
            {/* Eyebrow */}
            <div
              data-reveal
              className="inline-flex items-center gap-2.5 mb-7"
              style={{
                fontFamily: "var(--font-roboto-mono)",
                fontSize: "9.5px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(212,255,43,0.6)",
                border: "1px solid rgba(212,255,43,0.2)",
                borderRadius: "999px",
                padding: "5px 14px",
                background: "rgba(6,6,8,0.4)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: "rgba(212,255,43,0.7)" }} />
              {d.hero.eyebrow}
            </div>

            {/* Headline */}
            <h1
              data-reveal="d1"
              className="font-playfair font-normal text-fg"
              style={{ fontSize: "clamp(32px, 5vw, 58px)", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "clamp(18px, 2.4vw, 28px)" }}
            >
              {d.hero.headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p
              data-reveal="d2"
              className="font-sora font-light text-fg/60"
              style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.65, maxWidth: "52ch" }}
            >
              {d.hero.sub}
            </p>
          </div>

          <HeroCTAs d={d} />

          {/* Bottom strip — proof + microcopy, spans full width on desktop */}
          <div className="new-hero-bottom-strip">
            <p data-reveal="d3" className="font-label text-fg/40" style={{ fontSize: "10.5px", letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1.6 }}>
              {d.hero.proofStrip}
            </p>
            <p className="font-sora font-light text-fg/35 mt-3" style={{ fontSize: "12px", lineHeight: 1.6, maxWidth: "46ch" }}>
              {d.hero.microcopy}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
