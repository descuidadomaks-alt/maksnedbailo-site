"use client";

import type { NewPageDict } from "../lib/i18n";

/**
 * Section 4 — THE BELIEF + WHO I AM (Sinek "Why" + founder story).
 * This is where Maks's story lives — explicitly NOT a case card.
 * Small founder photo + signature-style note.
 */
export default function Belief({ d }: { d: NewPageDict }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      {/* Soft section gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 760px 460px at 96% 0%, rgba(34,158,217,0.04) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">

        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.belief.label}
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-8"
          style={{ fontSize: "clamp(22px, 3vw, 38px)", lineHeight: 1.25, letterSpacing: "-0.02em", maxWidth: "24ch" }}
        >
          {d.belief.headline}
        </h2>

        <p data-reveal className="font-sora font-light text-fg/55 leading-[1.9] mb-10" style={{ fontSize: "15px", maxWidth: "62ch" }}>
          {d.belief.body}
        </p>

        {/* Founder photo + signature-style note */}
        <div data-reveal className="flex items-center gap-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/maks-photo.png"
            alt="Maks Nedbailo"
            className="rounded-full object-cover shrink-0"
            style={{ width: "52px", height: "52px", border: "1px solid rgba(212,255,43,0.2)" }}
          />
          <div>
            <p className="font-playfair italic text-fg/70" style={{ fontSize: "14px", lineHeight: 1.5 }}>
              {d.belief.roleLine}
            </p>
            <p className="font-label text-fg/25 mt-1" style={{ fontSize: "11px", letterSpacing: "1.5px" }}>
              {d.belief.signature}
            </p>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
