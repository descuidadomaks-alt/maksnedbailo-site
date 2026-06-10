"use client";

import Link from "next/link";
import type { NewPageDict } from "../lib/i18n";
import { CTA_TARGET, SCORE_TARGET, STAGE_PHOTO_SRC } from "../lib/config";

/**
 * Section 1 — HERO v2.
 *
 * Two layouts are implemented; HERO_LAYOUT picks which one renders.
 *  - "background": full-bleed stage photo with a bottom-up dark gradient,
 *    copy anchored to the bottom-left (current).
 *  - "band": copy block on top, wide stage-photo band underneath.
 *
 * Both use the same dict + CTAs — flip the flag to A/B the treatment.
 */
const HERO_LAYOUT: "background" | "band" = "background";

export default function Hero({ d }: { d: NewPageDict }) {
  return HERO_LAYOUT === "background" ? <HeroBackground d={d} /> : <HeroBand d={d} />;
}

/** Dual CTA — Score (primary, accent fill) + Map (secondary, ghost). Shared by both layouts. */
function HeroCTAs({ d }: { d: NewPageDict }) {
  return (
    <div data-reveal="d3" className="flex flex-col items-start gap-4">
      <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
        <Link
          href={SCORE_TARGET}
          data-primary-cta
          className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
          style={{ fontSize: "15px", padding: "18px 32px", minHeight: "60px", letterSpacing: "-0.01em" }}
        >
          {d.hero.primaryCta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
        </Link>

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
      </div>

      {/* Guarantee — directly under the CTAs, never more than one CTA away */}
      <p className="font-sora font-light text-fg/45 -mt-1" style={{ fontSize: "12px" }}>
        {d.hero.guarantee}
      </p>
    </div>
  );
}

/** ── Layout A (live) — full-bleed stage photo + bottom-up gradient ── */
function HeroBackground({ d }: { d: NewPageDict }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "92svh", display: "flex", alignItems: "flex-end" }}>
      {/* Full-bleed stage photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={STAGE_PHOTO_SRC}
        alt="Maks Nedbailo speaking on stage"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "50% 35%", filter: "grayscale(0.1) contrast(1.05)" }}
      />

      {/* Bottom-up dark gradient — ~70% opacity at the text, fading toward the top */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,6,8,0.94) 0%, rgba(6,6,8,0.78) 32%, rgba(6,6,8,0.32) 62%, rgba(6,6,8,0.05) 100%)",
        }}
      />

      {/* Ambient accent glow */}
      <div
        aria-hidden
        data-parallax="0.06"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 900px 600px at 78% 100%, rgba(212,255,43,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative w-full max-w-[1240px] mx-auto px-6 pt-32 pb-14 lg:pb-20">
        <div className="max-w-2xl text-left">

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

          {/* Headline — Option A live (B/C kept as comments in lib/i18n.ts) */}
          <h1
            data-reveal="d1"
            className="font-playfair font-normal text-fg"
            style={{ fontSize: "clamp(32px, 6vw, 64px)", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "clamp(18px, 2.4vw, 28px)" }}
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
            style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.65, marginBottom: "clamp(26px, 3vw, 34px)", maxWidth: "52ch" }}
          >
            {d.hero.sub}
          </p>

          <HeroCTAs d={d} />

          {/* Mini-proof strip — proof above the fold */}
          <p data-reveal="d3" className="font-label text-fg/40 mt-8" style={{ fontSize: "10.5px", letterSpacing: "2px", textTransform: "uppercase" }}>
            {d.hero.proofStrip}
          </p>

          <p className="font-sora font-light text-fg/35 mt-3" style={{ fontSize: "12px" }}>
            {d.hero.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}

/** ── Layout B (alternate) — copy on top, wide stage-photo band below ── */
function HeroBand({ d }: { d: NewPageDict }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "92svh", display: "flex", alignItems: "center" }}>
      <div
        aria-hidden
        data-parallax="0.06"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 900px 600px at 78% 32%, rgba(212,255,43,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative w-full max-w-[1100px] mx-auto px-6 py-16 lg:py-10">
        <div className="text-left mb-10 lg:mb-14">

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

          <h1
            data-reveal="d1"
            className="font-playfair font-normal text-fg"
            style={{ fontSize: "clamp(28px, 4.6vw, 52px)", lineHeight: 1.16, letterSpacing: "-0.025em", marginBottom: "clamp(18px, 2.4vw, 28px)", maxWidth: "20ch" }}
          >
            {d.hero.headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p
            data-reveal="d2"
            className="font-sora font-light text-fg/45"
            style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.65, marginBottom: "clamp(26px, 3vw, 34px)", maxWidth: "52ch" }}
          >
            {d.hero.sub}
          </p>

          <HeroCTAs d={d} />

          <p data-reveal="d3" className="font-label text-fg/25 mt-8" style={{ fontSize: "10.5px", letterSpacing: "2px", textTransform: "uppercase" }}>
            {d.hero.proofStrip}
          </p>
          <p className="font-sora font-light text-fg/25 mt-3" style={{ fontSize: "12px" }}>
            {d.hero.microcopy}
          </p>
        </div>

        {/* Wide stage-photo band */}
        <div data-reveal className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4 / 1", border: "1px solid rgba(212,255,43,0.14)", boxShadow: "0 24px 70px rgba(0,0,0,0.45)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STAGE_PHOTO_SRC}
            alt="Maks Nedbailo speaking on stage"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "grayscale(0.15) contrast(1.05)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(6,6,8,0.05) 0%, rgba(6,6,8,0.25) 100%)" }}
          />
        </div>
      </div>
    </section>
  );
}
