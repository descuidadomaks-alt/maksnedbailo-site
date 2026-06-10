"use client";

import type { NewPageDict } from "../lib/i18n";
import { CTA_TARGET } from "../lib/config";

/**
 * Section 1 — HERO.
 *
 * Alt headline (kept as a comment per spec, not used):
 *   "You built a business that only runs when you're in the room."
 */
export default function Hero({ d }: { d: NewPageDict }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "92svh", display: "flex", alignItems: "center" }}
    >
      {/* Ambient glow — subtle parallax via Lenis data-parallax */}
      <div
        aria-hidden
        data-parallax="0.06"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 820px 520px at 50% 38%, rgba(212,255,43,0.05) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        data-parallax="0.1"
        className="hero-orb hidden lg:block absolute rounded-full pointer-events-none"
        style={{
          width: 560,
          height: 560,
          top: "8%",
          right: "-8%",
          background: "radial-gradient(circle, rgba(212,255,43,0.05) 0%, transparent 68%)",
        }}
      />

      <div className="relative w-full max-w-[760px] mx-auto px-6 py-10 text-center">

        {/* Eyebrow */}
        <div
          data-reveal
          className="inline-flex items-center gap-2.5 mb-8"
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
          style={{ fontSize: "clamp(28px, 4.4vw, 50px)", lineHeight: 1.16, letterSpacing: "-0.025em", marginBottom: "clamp(18px, 2.4vw, 28px)" }}
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
          className="font-sora font-light text-fg/45 max-w-[58ch] mx-auto"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.65, marginBottom: "clamp(28px, 3vw, 38px)" }}
        >
          {d.hero.sub}
        </p>

        {/* Primary CTA — CTA_TARGET configured in app/new/lib/config.ts */}
        <a
          data-reveal="d3"
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

        <p className="font-sora font-light text-fg/25 mt-4" style={{ fontSize: "12px" }}>
          {d.hero.microcopy}
        </p>
      </div>
    </section>
  );
}
