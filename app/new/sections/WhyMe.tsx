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
 * Section 7 — WHY ME (differentiation).
 * Centered heading; comparison rendered as two visually-contrasting
 * columns — "Them" muted/strikethrough, "Care Less" highlighted with an
 * accent border + glow. The verdict, not a spreadsheet.
 */
export default function WhyMe({ d }: { d: NewPageDict }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      {/* Soft section gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 700px 420px at 50% 100%, rgba(212,255,43,0.035) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6">

        <div className="max-w-2xl mx-auto mb-12 text-center">
          <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.whyMe.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mx-auto" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "22ch" }}>
            {d.whyMe.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {/* Them — muted, strikethrough */}
          <div data-reveal="d0" className="rounded-2xl border border-white/[0.05] bg-white/[0.012] p-6 md:p-8">
            <p className="font-label text-fg/25 uppercase mb-6" style={{ fontSize: "9px", letterSpacing: "2.5px" }}>{d.whyMe.colThem}</p>
            <ul className="flex flex-col gap-4">
              {d.whyMe.rows.map(([them], i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-fg/22 mt-0.5"><XIcon /></span>
                  <p className="font-sora font-light text-fg/32 line-through decoration-fg/45 leading-[1.6]" style={{ fontSize: "14px" }}>{them}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Care Less — highlighted, accent border + glow */}
          <div
            data-reveal="d1"
            className="rounded-2xl p-6 md:p-8"
            style={{
              border: "1px solid rgba(212,255,43,0.22)",
              background: "rgba(212,255,43,0.045)",
              boxShadow: "0 0 70px rgba(212,255,43,0.06)",
            }}
          >
            <p className="font-label text-accent/65 uppercase mb-6" style={{ fontSize: "9px", letterSpacing: "2.5px" }}>{d.whyMe.colMe}</p>
            <ul className="flex flex-col gap-4">
              {d.whyMe.rows.map(([, me], i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent/75 mt-0.5"><CheckIcon /></span>
                  <p className="font-sora font-light text-fg/75 leading-[1.6]" style={{ fontSize: "14px" }}>{me}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
