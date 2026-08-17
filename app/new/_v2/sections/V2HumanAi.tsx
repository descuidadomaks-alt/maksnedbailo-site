"use client";

import type { V2Copy } from "../lib/copy";

/**
 * Section 5 — HUMAN + AI. Deliberately the shortest section on the page:
 * headline + one short paragraph. Not "replace your employees with 50 AI
 * workers" — pragmatic, humans-stay-human framing.
 */
export default function V2HumanAi({ d }: { d: V2Copy }) {
  return (
    <section className="section-divider relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.humanAi.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-accent mx-auto mb-6"
          style={{ fontSize: "clamp(22px, 2.8vw, 38px)", lineHeight: 1.2, letterSpacing: "-0.02em", maxWidth: "18ch" }}
        >
          {d.humanAi.headline}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/62 leading-[1.85] mx-auto" style={{ fontSize: "15px", maxWidth: "56ch" }}>
          {d.humanAi.body}
        </p>
      </div>
    </section>
  );
}
