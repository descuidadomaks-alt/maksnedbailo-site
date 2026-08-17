"use client";

import type { V2Copy } from "../lib/copy";

const ICONS = [
  // Sell — arrow into target
  <svg key="sell" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.75)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 12l7-7" />
  </svg>,
  // Serve — chat/headset
  <svg key="serve" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.75)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 12a8 8 0 0 1 16 0" />
    <path d="M4 12v4a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1z" />
    <path d="M20 12v4a2 2 0 0 1-2 2h-1v-6h1a1 1 0 0 1 2 1z" />
    <path d="M15 18a3 3 0 0 1-3 2" />
  </svg>,
  // Operate — connected nodes
  <svg key="operate" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.75)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="5" cy="6" r="2.2" />
    <circle cx="19" cy="6" r="2.2" />
    <circle cx="12" cy="18" r="2.2" />
    <path d="M6.9 7.2L11 16" />
    <path d="M17.1 7.2L13 16" />
    <path d="M7.2 6h9.6" />
  </svg>,
];

/**
 * Section 3 — WHAT WE FIX. Three business outcomes (Sell/Serve/Operate),
 * not a generic services grid. Deliberately just three concise cards.
 */
export default function V2Fix({ d }: { d: V2Copy }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.fix.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mb-4 mx-auto" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "20ch" }}>
            {d.fix.headline}
          </h2>
          <p data-reveal className="font-sora font-light text-fg/55" style={{ fontSize: "14px" }}>
            {d.fix.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {d.fix.cards.map((card, i) => (
            <div
              key={card.title}
              data-reveal={`d${i}`}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.012] p-7 flex flex-col gap-4 hover:border-white/[0.1] hover:bg-white/[0.022] transition-all duration-300"
            >
              <span
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ border: "1px solid rgba(212,255,43,0.22)", background: "rgba(212,255,43,0.05)" }}
                aria-hidden
              >
                {ICONS[i]}
              </span>
              <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "clamp(18px, 1.8vw, 22px)", lineHeight: 1.2 }}>
                {card.title}
              </h3>
              <p className="font-sora font-light text-fg/62 leading-[1.65]" style={{ fontSize: "14px" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
