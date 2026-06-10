"use client";

import type { NewPageDict } from "../lib/i18n";
import { CTA_TARGET, TELEGRAM_URL } from "../lib/config";

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

/**
 * Section 8 — CTA / OFFER.
 * "Book the Bottleneck Map" -> CTA_TARGET, with one-line guarantee mention.
 */
export default function FinalCTA({ d }: { d: NewPageDict }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="absolute left-0 top-0 pointer-events-none"
        style={{ width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(212,255,43,0.055) 0%, transparent 68%)" }}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">

        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.cta.label}
        </p>

        <h2 data-reveal className="font-playfair font-normal text-fg mb-4" style={{ fontSize: "clamp(24px, 3.6vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.024em" }}>
          {d.cta.headline}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/45 mb-12" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.55 }}>
          {d.cta.sub}
        </p>

        <div data-reveal="d1" className="flex flex-col items-start gap-4">
          <a
            href={CTA_TARGET}
            target="_blank"
            rel="noopener noreferrer"
            data-primary-cta
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_64px_rgba(212,255,43,0.28)] active:scale-[0.99] w-full sm:w-auto"
            style={{ fontSize: "15px", padding: "18px 40px", minHeight: "60px", letterSpacing: "-0.01em" }}
          >
            {d.cta.primaryCta}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
          </a>

          <p className="font-sora font-light text-fg/28" style={{ fontSize: "12px" }}>
            {d.cta.guarantee}
          </p>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80"
            style={{ fontSize: "14px", color: "rgba(34,158,217,0.75)", letterSpacing: "-0.01em" }}
          >
            <TelegramIcon />
            {d.cta.secondaryCta}
          </a>

          <p className="font-sora font-light italic text-fg/22 mt-2" style={{ fontSize: "12px", maxWidth: "40ch" }}>
            {d.cta.closing}
          </p>
        </div>

        </div>
      </div>
    </section>
  );
}
