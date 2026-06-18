"use client";

import Link from "next/link";
import type { NewPageDict } from "../lib/i18n";
import { SCORE_TARGET } from "../lib/config";

/**
 * Section 2 — SOUND FAMILIAR? (the pain, in their words)
 * 3-4 VoC lines + the bus-test punch line.
 */
export default function SoundFamiliar({ d }: { d: NewPageDict }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      {/* Soft section gradient — ties this section into the page-wide depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 700px 420px at 8% 0%, rgba(212,255,43,0.035) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.45fr_1fr] gap-12 lg:gap-16 items-start">

          {/* Quotes — ~55% on desktop */}
          <div>
            <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
              {d.pain.label}
            </p>
            <h2 data-reveal className="font-playfair font-normal text-fg mb-12" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "20ch" }}>
              {d.pain.headline}
            </h2>

            {/* VoC lines */}
            <ul className="flex flex-col gap-5">
              {d.pain.lines.map((line, i) => (
                <li
                  key={i}
                  data-reveal={`d${i % 4}`}
                  className="font-sora font-light text-fg/55 leading-[1.7] pl-5"
                  style={{ fontSize: "15px", borderLeft: "2px solid rgba(212,255,43,0.18)" }}
                >
                  &ldquo;{line}&rdquo;
                </li>
              ))}
            </ul>
          </div>

          {/* Bus-test card — ~38% on desktop, Score CTA underneath */}
          <div className="md:pt-2">
            <div
              data-reveal
              className="rounded-2xl text-center"
              style={{ border: "1px solid rgba(212,255,43,0.18)", background: "rgba(212,255,43,0.04)", padding: "clamp(24px, 4vw, 40px)" }}
            >
              <p
                className="font-playfair font-normal text-accent"
                style={{ fontSize: "clamp(18px, 2.4vw, 28px)", lineHeight: 1.35, letterSpacing: "-0.015em" }}
              >
                {d.pain.punch}
              </p>
            </div>

            {/* CTA — low-friction, routes to the Bottleneck Score */}
            <div data-reveal className="text-center mt-6">
              <Link
                href={SCORE_TARGET}
                className="group inline-flex flex-col items-center sm:flex-row sm:items-center gap-x-1.5 font-sora font-light text-fg/62 transition-colors duration-200 hover:text-accent text-center"
                style={{ fontSize: "13px" }}
              >
                <span>{d.pain.ctaLabel.split(" — ")[0]} —</span>
                <span className="inline-flex items-center gap-1.5">
                  {d.pain.ctaLabel.split(" — ")[1]}
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
                </span>
              </Link>
            </div>
          </div>

        </div>

        <p data-reveal className="font-sora font-light italic text-fg/55 text-center mt-12" style={{ fontSize: "13px" }}>
          {d.pain.closingLine}
        </p>
      </div>
    </section>
  );
}
