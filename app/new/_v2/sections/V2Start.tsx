"use client";

import Link from "next/link";
import type { V2Copy } from "../lib/copy";

/**
 * Section 6 — FREE AI MAP / HOW WE START. Compact process visual
 * (Understand -> Find -> Rank -> Build) instead of a consulting-style
 * deliverables list. The "we'll say so" trust line is the point — it's
 * what makes the free offer credible instead of a bait-and-switch.
 */
export default function V2Start({ d, ctaHref }: { d: V2Copy; ctaHref: string }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 760px 460px at 92% 100%, rgba(34,158,217,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.start.label}
        </p>
        <h2 data-reveal className="font-playfair font-normal text-fg mx-auto mb-6" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "18ch" }}>
          {d.start.headline}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/55 leading-[1.85] mx-auto mb-12" style={{ fontSize: "15px", maxWidth: "56ch" }}>
          {d.start.body}
        </p>

        {/* Process — Understand -> Find -> Rank -> Build */}
        <div data-reveal className="flex items-center justify-center gap-1.5 xs:gap-3 mb-12 flex-wrap">
          {d.start.steps.map((step, i) => (
            <div key={step} className="flex items-center gap-1.5 xs:gap-3">
              <span
                className="font-label"
                style={{
                  fontSize: "11px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "rgba(240,236,230,0.72)",
                  border: "1px solid rgba(212,255,43,0.22)",
                  borderRadius: "999px",
                  padding: "8px 16px",
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
              {i < d.start.steps.length - 1 && (
                <span className="text-accent/40" aria-hidden>→</span>
              )}
            </div>
          ))}
        </div>

        <div data-reveal className="flex flex-col items-center gap-4">
          <Link
            href={ctaHref}
            data-primary-cta
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
            style={{ fontSize: "15px", padding: "18px 32px", minHeight: "60px", letterSpacing: "-0.01em" }}
          >
            {d.start.cta}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
          </Link>
          <p className="font-sora font-light italic text-fg/55" style={{ fontSize: "13px", maxWidth: "42ch" }}>
            {d.start.trustLine}
          </p>
        </div>
      </div>
    </section>
  );
}
