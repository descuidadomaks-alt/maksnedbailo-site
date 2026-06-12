"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { NewPageDict } from "../lib/i18n";
import { CTA_TARGET, SCORE_TARGET, STAGE_PHOTO_SRC } from "../lib/config";

// How far the photo pans on scroll, in % of its own width. The image is
// rendered wider than its clipping band (115% desktop / 220% mobile — see
// .new-hero-photo in globals.css), so this must stay below the overflow
// (15/115 ≈ 13%) or the right edge of the image slides into view.
const PAN_MAX_PERCENT = 8;

/**
 * Scroll-linked horizontal pan for the hero photo band. Progress runs 0 -> 1
 * as the section scrolls from fully in view to fully scrolled past. Writes
 * the transform straight to the <img> inside rAF — no React state, so
 * scrolling never re-renders the section. Disabled under
 * prefers-reduced-motion (CSS also forces transform: none as a backstop).
 */
function useHeroPan(sectionRef: React.RefObject<HTMLElement | null>, imgRef: React.RefObject<HTMLImageElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      const img = imgRef.current;
      if (!el || !img) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      img.style.transform = `translateX(-${(progress * PAN_MAX_PERCENT).toFixed(3)}%)`;
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
  }, [sectionRef, imgRef]);
}

/**
 * Dual CTA stack — Score (primary, solid accent) + Map (secondary, ghost
 * outline), each with its own microcopy directly below it.
 */
function HeroCTAs({ d }: { d: NewPageDict }) {
  return (
    <div data-reveal="d3" className="flex flex-col items-start gap-5">
      <div>
        <Link
          href={SCORE_TARGET}
          className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
          style={{ fontSize: "15px", padding: "18px 32px", minHeight: "60px", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
        >
          {d.hero.primaryCta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
        </Link>
        <p className="font-sora font-light text-fg/45 mt-2.5" style={{ fontSize: "12px" }}>
          {d.hero.primaryMicrocopy}
        </p>
      </div>

      <div>
        {/* Liquid-glass secondary — the photo band rises behind it on mobile,
            so the button has to read as glass over the image. */}
        <Link
          href={CTA_TARGET}
          className="btn-glass-dark group inline-flex items-center justify-center gap-2.5 font-sora font-semibold rounded-xl"
          style={{ fontSize: "15px", padding: "17px 32px", minHeight: "60px", letterSpacing: "-0.01em" }}
        >
          {d.hero.secondaryCta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
        </Link>
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
 * Both breakpoints: kicker -> headline -> sub -> CTA stack on the page
 * background, with a wide photo band at the bottom of the section. The band
 * image is panned horizontally on scroll via useHeroPan — see
 * .new-hero-* in globals.css.
 */
export default function Hero({ d }: { d: NewPageDict }) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  useHeroPan(sectionRef, photoRef);

  return (
    <section ref={sectionRef} className="new-hero-section">
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
              style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.65, maxWidth: "52ch", marginBottom: "clamp(28px, 3.2vw, 40px)" }}
            >
              {d.hero.sub}
            </p>
          </div>

          <HeroCTAs d={d} />

        </div>
      </div>

      {/* Stage photo band — scroll-linked horizontal pan */}
      <div className="new-hero-photo-band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={photoRef}
          src={STAGE_PHOTO_SRC}
          alt="Maks Nedbailo speaking on stage"
          className="new-hero-photo"
          style={{ filter: "grayscale(0.3) contrast(1.02) brightness(0.92)", opacity: 0.82 }}
        />
        <div className="new-hero-photo-fade" aria-hidden />
      </div>
    </section>
  );
}
