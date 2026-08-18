"use client";

import Link from "next/link";
import type { V2Copy } from "../lib/copy";
import LeadFlowAnimation from "../components/LeadFlowAnimation";

/**
 * Section 1 — HERO. One CTA only (a second, weaker CTA next to the primary
 * splits attention and this page has exactly one action). The lead-flow
 * animation is part of the hero itself, not a block below it — it carries
 * the entire proposition without the visitor reading anything.
 */
export default function V2Hero({
  d,
  primaryCtaHref,
}: {
  d: V2Copy;
  primaryCtaHref: string;
}) {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "calc(100svh - 76px)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 900px 560px at 50% 24%, rgba(212,255,43,0.055) 0%, transparent 68%)" }}
      />

      <div className="relative w-full max-w-4xl mx-auto px-6 py-8 md:py-10 text-center">
        <div
          data-reveal
          className="inline-flex items-center gap-2.5 mb-5 md:mb-6"
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
          style={{
            fontSize: "clamp(27px, 4.4vw, 52px)",
            lineHeight: 1.12,
            letterSpacing: "-0.026em",
            maxWidth: "19ch",
            marginBottom: "clamp(14px, 1.8vw, 20px)",
          }}
        >
          {d.hero.headline}
        </h1>

        <p
          data-reveal="d2"
          className="font-sora font-light text-fg/60 mx-auto"
          style={{
            fontSize: "clamp(13.5px, 1.5vw, 17px)",
            lineHeight: 1.6,
            maxWidth: "56ch",
            marginBottom: "clamp(20px, 2.4vw, 30px)",
          }}
        >
          {d.hero.sub}
        </p>

        <div data-reveal="d3" className="flex flex-col items-center mb-8 md:mb-11">
          <Link
            href={primaryCtaHref}
            data-primary-cta
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
            style={{ fontSize: "15px", padding: "18px 34px", minHeight: "60px", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
          >
            {d.hero.primaryCta}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
          </Link>
          <p className="font-sora font-light text-fg/55 mt-2.5" style={{ fontSize: "12px" }}>
            {d.hero.primaryMicrocopy}
          </p>
        </div>

        <div data-reveal="d3">
          <LeadFlowAnimation d={d.hero.anim} />
        </div>
      </div>
    </section>
  );
}
