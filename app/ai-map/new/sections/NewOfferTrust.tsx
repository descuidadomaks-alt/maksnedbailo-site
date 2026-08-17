"use client";

import type { NewOfferCopy } from "../lib/copy";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(212,255,43,0.75)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="rgba(212,255,43,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Replaces DirectGuarantee's "10k Guarantee" seal — that device only makes
 * sense against a price ("find €10k or it's free"), and the map is already
 * free, permanently. The trust device here is the honesty commitment
 * itself: if there's nothing worth building, we say so. Combined with a
 * compact "what's included" list (DirectClose's included1-3, unchanged —
 * they were never price-dependent).
 */
export default function NewOfferTrust({ d }: { d: NewOfferCopy }) {
  return (
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.trust.label}
        </p>

        <div
          data-reveal
          className="rounded-2xl p-8 md:p-10 mb-10"
          style={{ border: "2px solid rgba(212,255,43,0.35)", background: "rgba(212,255,43,0.04)", boxShadow: "0 4px 48px rgba(212,255,43,0.08)" }}
        >
          <div className="flex items-start gap-5">
            <div className="shrink-0 mt-0.5"><ShieldIcon /></div>
            <div>
              <h2 className="font-playfair font-normal text-fg mb-4" style={{ fontSize: "clamp(20px, 2.8vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                {d.trust.headline}
              </h2>
              <p className="font-sora font-light text-fg/65 leading-[1.85] mb-5" style={{ fontSize: "15px", maxWidth: "58ch" }}>
                {d.trust.body}
              </p>
              <p className="font-playfair text-accent italic" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                {d.trust.highlight}
              </p>
            </div>
          </div>
        </div>

        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
          {d.included.label}
        </p>
        <ul data-reveal className="flex flex-col gap-4">
          {d.included.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5"><CheckIcon /></span>
              <span className="font-sora font-light text-fg/65 leading-[1.65]" style={{ fontSize: "14px" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
