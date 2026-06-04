"use client";

import type { DirectPageDict } from "../lib/directi18n";
import { CHECKOUT_URL } from "../lib/config";
// PAID: import { PRICE_CURRENT, PRICE_ANCHOR } from "../lib/config"; — restore after June 15

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    clarity?: (method: string, key: string, value?: string) => void;
  }
}

function track(event: string, props: Record<string, string>) {
  window.plausible?.(event, { props });
  window.clarity?.("set", event, Object.values(props).join(" | "));
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function DirectClose({ d }: { d: DirectPageDict }) {
  return (
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6">

        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.close.label}
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-12"
          style={{ fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "50ch" }}
        >
          {d.close.headline}
        </h2>

        <div data-reveal className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start">

          {/* Left — what's included + guarantees */}
          <div>
            <p className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
              {d.close.label}
            </p>
            <ul className="flex flex-col gap-4 mb-8">
              {[d.close.included1, d.close.included2, d.close.included3].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5"><CheckIcon /></span>
                  <span className="font-sora font-light text-fg/65 leading-[1.65]" style={{ fontSize: "14px" }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* COMPLIMENTARY framing — replace with creditLine+guaranteeLine after June 15 */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 flex flex-col gap-3">
              <p className="font-sora font-light text-fg/55 leading-[1.7]" style={{ fontSize: "13px" }}>
                {d.close.compLine}
              </p>
              <p className="font-sora font-light text-fg/40 leading-[1.7]" style={{ fontSize: "13px" }}>
                {d.close.guaranteeLine}
              </p>
            </div>
            {/* PAID: restore creditLine above compLine after June 15
            <p>{d.close.creditLine}</p> */}
          </div>

          {/* Right — complimentary price + CTA */}
          <div className="flex flex-col items-start md:items-end gap-6 md:min-w-[220px]">
            {/* Anchor line — establishes the €1,500 value */}
            <div>
              <p className="font-label text-fg/28 mb-1" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                {d.offer.anchorLabel}
              </p>
              <p className="font-numeral text-fg/22 line-through" style={{ fontSize: "20px", fontWeight: 600, lineHeight: 1 }}>
                {d.offer.anchorValue}
              </p>
            </div>
            {/* Complimentary price block */}
            <div>
              <p className="font-sora font-bold text-accent" style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1 }}>
                {d.offer.compPriceValue}
              </p>
              <p className="font-label text-accent/50 uppercase mt-1" style={{ fontSize: "9px", letterSpacing: "2px" }}>
                {d.close.deadlineChip}
              </p>
            </div>
            {/* PAID phase block — restore after June 15:
            <div>
              <p className="font-numeral font-bold text-accent" style={{ fontSize:"clamp(36px,5vw,52px)", lineHeight:1 }}>{PRICE_CURRENT}</p>
              <p className="font-label text-accent/50 uppercase mt-1">{d.close.deadlineChip}</p>
            </div> */}

            <a
              href={CHECKOUT_URL}
              data-primary-cta
              className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.25)] w-full md:w-auto"
              style={{ fontSize: "15px", padding: "18px 32px", minHeight: "58px", letterSpacing: "-0.01em" }}
              onClick={() => track("direct_cta_book", { location: "close" })}
            >
              {d.finalCta.cta}
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
            </a>

            <p className="font-sora font-light text-fg/28" style={{ fontSize: "11px", maxWidth: "24ch", textAlign: "right" }}>
              {d.guarantee.highlight}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
