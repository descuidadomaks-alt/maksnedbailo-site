"use client";

import Link from "next/link";
import type { NewPageDict } from "../lib/i18n";
import GlassButton from "../components/GlassButton";
import { SCORE_TARGET } from "../lib/config";
import { foundingSlotsLeft, FOUNDING_RATE, FOUNDING_RATE_ES, STANDARD_RATE, slotsOpen } from "../lib/site.config";
import { useCtaTarget, useNewLocale } from "../lib/locale";

/**
 * Section 7 — THE PATH (offer ladder).
 * Three steps from the free Score to a paid build. Step 2 (the Map) is the
 * primary offer — accent border + GlassButton. Step 3 has no CTA, it's
 * unlocked by the Map. The capacity line below the cards is the single
 * sitewide source for "X of 5 founding slots" copy.
 */
export default function ThePath({ d }: { d: NewPageDict }) {
  const [score, map, build] = d.path.steps;
  const ctaTarget = useCtaTarget();
  const { locale } = useNewLocale();
  const foundingRate = locale === "es" ? FOUNDING_RATE_ES : FOUNDING_RATE;

  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div className="relative max-w-6xl mx-auto px-6">

        <div className="max-w-2xl mx-auto mb-12 text-center">
          <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.path.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mx-auto" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "20ch" }}>
            {d.path.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-8">

          {/* Step 1 — Bottleneck Score */}
          <div data-reveal="d0" className="rounded-2xl border border-white/[0.05] bg-white/[0.012] p-6 flex flex-col gap-4">
            <span className="font-label text-fg/55" style={{ fontSize: "28px", letterSpacing: "1px" }}>{score.number}</span>
            <div>
              <h3 className="font-playfair font-normal text-fg/85 mb-1.5" style={{ fontSize: "17px", lineHeight: 1.3 }}>{score.title}</h3>
              <span className="font-label text-accent/65" style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}>{score.badge}</span>
            </div>
            <p className="font-sora font-light text-fg/62 leading-[1.65] flex-1" style={{ fontSize: "13px" }}>{score.desc}</p>
            <Link
              href={SCORE_TARGET}
              className="group inline-flex items-center gap-1.5 font-sora font-semibold text-fg/75 hover:text-accent transition-colors duration-200"
              style={{ fontSize: "13px" }}
            >
              {score.ctaLabel}
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
            </Link>
          </div>

          {/* Step 2 — Bottleneck Map (primary) */}
          <div data-reveal="d1" className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-6 flex flex-col gap-4">
            <span className="font-label text-accent/30" style={{ fontSize: "28px", letterSpacing: "1px" }}>{map.number}</span>
            <div>
              <h3 className="font-playfair font-normal text-fg mb-1.5" style={{ fontSize: "17px", lineHeight: 1.3 }}>{map.title}</h3>
              <span className="font-numeral" style={{ fontSize: "13px" }}>
                {foundingSlotsLeft > 0 ? (
                  <>
                    <span className="text-fg/55 line-through mr-2">{STANDARD_RATE}</span>
                    <span className="text-accent font-semibold">{foundingRate} {d.path.foundingLabel}</span>
                  </>
                ) : (
                  <span className="text-fg/75 font-semibold">{STANDARD_RATE}</span>
                )}
              </span>
            </div>
            <p className="font-sora font-light text-fg/62 leading-[1.65] flex-1" style={{ fontSize: "13px" }}>{map.desc}</p>
            <GlassButton href={ctaTarget} className="self-start" style={{ fontSize: "13px", padding: "12px 24px", minHeight: "44px" }}>
              {map.ctaLabel}
              <span aria-hidden>→</span>
            </GlassButton>
            <p className="font-sora font-light text-fg/55 leading-[1.5]" style={{ fontSize: "11.5px" }}>{map.microcopy}</p>
          </div>

          {/* Step 3 — First build (no CTA, unlocked by the Map) */}
          <div data-reveal="d2" className="rounded-2xl border border-white/[0.05] bg-white/[0.012] p-6 flex flex-col gap-4">
            <span className="font-label text-fg/55" style={{ fontSize: "28px", letterSpacing: "1px" }}>{build.number}</span>
            <div>
              <h3 className="font-playfair font-normal text-fg/85 mb-1.5" style={{ fontSize: "17px", lineHeight: 1.3 }}>{build.title}</h3>
              <span className="font-label text-fg/55" style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}>{build.badge}</span>
            </div>
            <p className="font-sora font-light text-fg/62 leading-[1.65] flex-1" style={{ fontSize: "13px" }}>{build.desc}</p>
            <p className="font-sora font-light italic text-fg/55" style={{ fontSize: "12px" }}>{build.note}</p>
          </div>

        </div>

        {/* Capacity line — single sitewide source for "X of 5 slots" copy */}
        <p data-reveal className="font-sora font-light text-accent/65 text-center" style={{ fontSize: "12px" }}>
          {d.path.capacityLine(slotsOpen)}
        </p>

      </div>
    </section>
  );
}
