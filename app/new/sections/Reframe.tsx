"use client";

import type { NewPageDict } from "../lib/i18n";

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * Section 3 — THE REFRAME (anti-hype enemy).
 * "You don't need another AI tool" + position against gurus / deck consultants / tool bloat.
 */
export default function Reframe({ d }: { d: NewPageDict }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      {/* Soft section gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 760px 460px at 92% 100%, rgba(34,158,217,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        <div className="max-w-2xl mb-12">
          <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.reframe.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mb-6" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "20ch" }}>
            {d.reframe.headline}
          </h2>
          <p data-reveal className="font-sora font-light text-fg/55 leading-[1.85]" style={{ fontSize: "15px", maxWidth: "62ch" }}>
            {d.reframe.body}
          </p>
        </div>

        {/* The three enemies */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {d.reframe.enemies.map((enemy, i) => (
            <div
              key={i}
              data-reveal={`d${i}`}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.012] p-6 flex flex-col gap-3"
            >
              <span
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-fg/30"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                aria-hidden
              >
                <XIcon />
              </span>
              <h3 className="font-playfair font-normal text-fg/75" style={{ fontSize: "16px", lineHeight: 1.3 }}>
                {enemy.title}
              </h3>
              <p className="font-sora font-light text-fg/40 leading-[1.65]" style={{ fontSize: "13px" }}>
                {enemy.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
