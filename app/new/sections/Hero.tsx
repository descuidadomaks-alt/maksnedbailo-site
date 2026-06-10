"use client";

import type { NewPageDict } from "../lib/i18n";
import { CTA_TARGET, HERO_PHOTO_SRC } from "../lib/config";

/**
 * Section 1 — HERO. Editorial split: left-aligned copy (~55%) + framed
 * founder photo as the visual anchor (~45%, HERO_PHOTO_SRC in lib/config.ts
 * — swap that one value for a better photo later). Mobile stacks the photo
 * on top, text below — never centered text in empty space.
 *
 * Alt headline (kept as a comment per spec, not used):
 *   "You built a business that only runs when you're in the room."
 */
export default function Hero({ d }: { d: NewPageDict }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "92svh", display: "flex", alignItems: "center" }}>
      {/* Ambient glow — subtle parallax via Lenis data-parallax */}
      <div
        aria-hidden
        data-parallax="0.06"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 600px at 78% 32%, rgba(212,255,43,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        data-parallax="0.1"
        className="hero-orb hidden lg:block absolute rounded-full pointer-events-none"
        style={{
          width: 560,
          height: 560,
          top: "6%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(212,255,43,0.04) 0%, transparent 68%)",
        }}
      />

      <div className="relative w-full max-w-[1240px] mx-auto px-6 py-16 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center">

          {/* ── Visual anchor — founder photo (mobile: on top) ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div data-reveal className="hero-photo-frame">
              <span className="hero-photo-glow" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO_PHOTO_SRC} alt="Maks Nedbailo, founder of Care Less" />
            </div>
          </div>

          {/* ── Copy column — left-aligned ── */}
          <div className="order-2 lg:order-1 text-left">

            {/* Eyebrow */}
            <div
              data-reveal
              className="inline-flex items-center gap-2.5 mb-7"
              style={{
                fontFamily: "var(--font-roboto-mono)",
                fontSize: "9.5px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(212,255,43,0.55)",
                border: "1px solid rgba(212,255,43,0.16)",
                borderRadius: "999px",
                padding: "5px 14px",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: "rgba(212,255,43,0.7)" }} />
              {d.hero.eyebrow}
            </div>

            {/* Headline — one block per line for the hook's rhythm */}
            <h1
              data-reveal="d1"
              className="font-playfair font-normal text-fg"
              style={{ fontSize: "clamp(28px, 4.6vw, 52px)", lineHeight: 1.16, letterSpacing: "-0.025em", marginBottom: "clamp(18px, 2.4vw, 28px)" }}
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
              className="font-sora font-light text-fg/45"
              style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.65, marginBottom: "clamp(26px, 3vw, 34px)", maxWidth: "52ch" }}
            >
              {d.hero.sub}
            </p>

            {/* Primary CTA — CTA_TARGET configured in app/new/lib/config.ts */}
            <div data-reveal="d3" className="flex flex-col items-start">
              <a
                href={CTA_TARGET}
                target="_blank"
                rel="noopener noreferrer"
                data-primary-cta
                className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
                style={{ fontSize: "15px", padding: "18px 40px", minHeight: "60px", letterSpacing: "-0.01em" }}
              >
                {d.hero.primaryCta}
                <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
              </a>

              {/* Guarantee — directly under the CTA, never more than one CTA away */}
              <p className="font-sora font-light text-fg/35 mt-3" style={{ fontSize: "12px" }}>
                {d.hero.guarantee}
              </p>
            </div>

            {/* Mini-proof strip — proof above the fold */}
            <p data-reveal="d3" className="font-label text-fg/25 mt-8" style={{ fontSize: "10.5px", letterSpacing: "2px", textTransform: "uppercase" }}>
              {d.hero.proofStrip}
            </p>

            <p className="font-sora font-light text-fg/25 mt-3" style={{ fontSize: "12px" }}>
              {d.hero.microcopy}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
