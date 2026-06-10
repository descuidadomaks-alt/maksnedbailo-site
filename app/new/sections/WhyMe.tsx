"use client";

import type { NewPageDict } from "../lib/i18n";

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * Section 7 — WHY ME (differentiation, compact table).
 */
export default function WhyMe({ d }: { d: NewPageDict }) {
  return (
    <section className="section-divider py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">

        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.whyMe.label}
        </p>
        <h2 data-reveal className="font-playfair font-normal text-fg mb-12" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "22ch" }}>
          {d.whyMe.headline}
        </h2>

        {/* Column headers — desktop only */}
        <div className="hidden sm:grid mb-3" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <span className="font-label text-fg/25 uppercase" style={{ fontSize: "9px", letterSpacing: "2.5px" }}>{d.whyMe.colThem}</span>
          <span className="font-label text-accent/55 uppercase" style={{ fontSize: "9px", letterSpacing: "2.5px" }}>{d.whyMe.colMe}</span>
        </div>

        <div className="flex flex-col">
          {d.whyMe.rows.map(([them, me], i) => (
            <div
              key={i}
              data-reveal={`d${i % 4}`}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 py-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start gap-3">
                <span className="text-fg/25 mt-0.5"><XIcon /></span>
                <p className="font-sora font-light text-fg/35 leading-[1.6]" style={{ fontSize: "14px" }}>{them}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent/70 mt-0.5"><CheckIcon /></span>
                <p className="font-sora font-light text-fg/70 leading-[1.6]" style={{ fontSize: "14px" }}>{me}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
