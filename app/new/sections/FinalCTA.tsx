"use client";

import Link from "next/link";
import type { NewPageDict } from "../lib/i18n";
import { SCORE_TARGET, WA_BOTTLENECK_LINK } from "../lib/config";
import { slotsOpen } from "../lib/site.config";
import { useCtaTarget } from "../lib/locale";

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

// The deadpan punchline ("Or don't — your call.") is styled as an
// accent-coloured aside on the final headline — the accent substring is
// locale-specific, so it lives in the dict (d.cta.headlineAccent).

/**
 * Section 8 — CTA / OFFER.
 * Centered. Dual CTA — Map is primary on desktop, Score is primary on
 * mobile (CSS swap via .cta-map / .cta-score, see globals.css). Founding-
 * rate microcopy sits under the Map CTA. Telegram replaced with a
 * WhatsApp-styled secondary button (channel cleanup pass).
 */
export default function FinalCTA({ d }: { d: NewPageDict }) {
  const ctaTarget = useCtaTarget();
  const headlineParts = d.cta.headline.split(d.cta.headlineAccent);

  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
        style={{ width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(212,255,43,0.05) 0%, transparent 68%)" }}
      />
      <div className="relative max-w-2xl mx-auto px-6 text-center">

        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.cta.label}
        </p>

        <h2 data-reveal className="font-playfair font-normal text-fg mb-4 mx-auto" style={{ fontSize: "clamp(24px, 3.6vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.024em", maxWidth: "20ch" }}>
          {headlineParts.length === 2 ? (
            <>
              {headlineParts[0]}
              <span className="text-accent">{d.cta.headlineAccent}</span>
            </>
          ) : (
            d.cta.headline
          )}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/62 mb-12 mx-auto" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.55, maxWidth: "48ch" }}>
          {d.cta.sub}
        </p>

        <div data-reveal="d1" className="flex flex-col items-center gap-5">
          {/* Dual CTA — Map primary on desktop, Score primary on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link
              href={ctaTarget}
              data-primary-cta
              className="dual-cta cta-map font-sora order-1 sm:order-1"
            >
              {d.cta.primaryCta}
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
            </Link>
            <Link href={SCORE_TARGET} className="dual-cta cta-score font-sora order-2 sm:order-2">
              {d.cta.scoreCta}
              <span className="transition-transform duration-200 inline-block" aria-hidden>→</span>
            </Link>
          </div>

          {/* Capacity line — under the Map CTA, single sitewide source (see ThePath) */}
          <p className="font-sora font-light text-accent/65" style={{ fontSize: "12px" }}>
            {d.path.capacityLine(slotsOpen)}
          </p>

          <p className="font-sora font-light text-fg/55" style={{ fontSize: "12px" }}>
            {d.cta.guarantee}
          </p>

          {/* WhatsApp — replaces the old Telegram "message me first" link */}
          <a
            href={WA_BOTTLENECK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80"
            style={{ fontSize: "14px", color: "rgba(74,222,128,0.85)", letterSpacing: "-0.01em" }}
          >
            <WhatsAppIcon />
            {d.cta.secondaryCta}
          </a>

          <p className="font-sora font-light italic text-fg/55 mt-2 mx-auto" style={{ fontSize: "11px", maxWidth: "40ch" }}>
            {d.cta.closing}
          </p>
        </div>

      </div>
    </section>
  );
}
