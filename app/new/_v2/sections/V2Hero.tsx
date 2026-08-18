"use client";

import Link from "next/link";
import type { V2Copy } from "../lib/copy";
import FlowDiagram from "../components/FlowDiagram";

/**
 * Section 1 — HERO. Eyebrow -> headline -> sub -> dual CTA -> flow diagram.
 * The diagram answers "what do you actually do" in three seconds for a
 * cold, non-technical visitor: same inputs, two outcomes (today vs with
 * the system). Auto height on mobile so the CTA stays above the fold —
 * only min-height on desktop, where there's room for both.
 */
export default function V2Hero({
  d,
  primaryCtaHref,
}: {
  d: V2Copy;
  primaryCtaHref: string;
}) {
  return (
    <section className="relative overflow-hidden" style={{ display: "flex", alignItems: "center" }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 900px 560px at 50% 20%, rgba(212,255,43,0.05) 0%, transparent 68%)" }}
      />

      <div className="relative w-full max-w-4xl mx-auto px-6 pt-10 pb-14 md:pt-16 md:pb-20 text-center">
        <div
          data-reveal
          className="inline-flex items-center gap-2.5 mb-7 md:mb-8"
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

        <h1
          data-reveal="d1"
          className="font-playfair font-normal text-fg mx-auto"
          style={{ fontSize: "clamp(30px, 5vw, 58px)", lineHeight: 1.1, letterSpacing: "-0.026em", maxWidth: "17ch", marginBottom: "clamp(16px, 2.2vw, 24px)" }}
        >
          {d.hero.headline}
        </h1>

        <p
          data-reveal="d2"
          className="font-sora font-light text-fg/60 mx-auto"
          style={{ fontSize: "clamp(14px, 1.6vw, 18px)", lineHeight: 1.6, maxWidth: "54ch", marginBottom: "clamp(26px, 3vw, 36px)" }}
        >
          {d.hero.sub}
        </p>

        <div data-reveal="d3" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16">
          <div>
            <Link
              href={primaryCtaHref}
              data-primary-cta
              className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
              style={{ fontSize: "15px", padding: "18px 32px", minHeight: "60px", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
            >
              {d.hero.primaryCta}
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
            </Link>
            <p className="font-sora font-light text-fg/55 mt-2.5" style={{ fontSize: "12px" }}>
              {d.hero.primaryMicrocopy}
            </p>
          </div>

          <a
            href="#systems"
            className="btn-glass-dark group inline-flex items-center justify-center gap-2.5 font-sora font-semibold rounded-xl"
            style={{ fontSize: "15px", padding: "17px 32px", minHeight: "60px", letterSpacing: "-0.01em" }}
          >
            {d.hero.secondaryCta}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
          </a>
        </div>

        <div data-reveal="d3">
          <FlowDiagram d={d.hero.diagram} />
        </div>
      </div>
    </section>
  );
}
