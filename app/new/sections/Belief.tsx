"use client";

import type { NewPageDict } from "../lib/i18n";
import { HERO_PHOTO_SRC } from "../lib/config";

/**
 * Section 4 — THE BELIEF + WHO I AM (Sinek "Why" + founder story).
 * Trimmed ~40% (see lib/i18n.ts belief.body) to keep only: the prison line
 * (headline), "scales the mess", "learned it the hard way", and the offer of
 * the safest first move. Two-column: copy left, founder portrait right —
 * the stage photo is used in the hero, so this section uses the portrait
 * (never the same image twice on one page).
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
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center">

          {/* ── Copy column ── */}
          <div className="order-2 lg:order-1">
            <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
              {d.belief.label}
            </p>

            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-6"
              style={{ fontSize: "clamp(22px, 3vw, 38px)", lineHeight: 1.25, letterSpacing: "-0.02em", maxWidth: "20ch" }}
            >
              {d.belief.headline}
            </h2>

            <p data-reveal className="font-sora font-light text-fg/55 leading-[1.9] mb-8" style={{ fontSize: "15px", maxWidth: "52ch" }}>
              {d.belief.body}
            </p>

            <div data-reveal className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-playfair italic text-fg/70" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                {d.belief.roleLine}
              </p>
              <p className="font-label text-fg/25 mt-1" style={{ fontSize: "11px", letterSpacing: "1.5px" }}>
                {d.belief.signature}
              </p>
            </div>
          </div>

          {/* ── Founder portrait ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div data-reveal className="hero-photo-frame">
              <span className="hero-photo-glow" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO_PHOTO_SRC} alt="Maks Nedbailo, founder of Care Less" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
