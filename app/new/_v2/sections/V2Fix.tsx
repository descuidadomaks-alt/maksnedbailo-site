"use client";

import type { V2Copy } from "../lib/copy";
import CapacityGap from "../components/CapacityGap";
import LeakFunnel from "../components/LeakFunnel";
import WeekGrid from "../components/WeekGrid";

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
 * each a full row with its own data visual instead of a generic services
 * grid: capacity gap, service funnel leakage, and the admin-vs-earning
 * week. Rows alternate sides on desktop, stack (text, then visual) on
 * mobile.
 */
export default function V2Fix({ d }: { d: V2Copy }) {
  const rows = [
    { copy: d.fix.rows[0], visual: <CapacityGap d={d.fix.capacityGap} /> },
    { copy: d.fix.rows[1], visual: <LeakFunnel d={d.fix.leakFunnel} /> },
    { copy: d.fix.rows[2], visual: <WeekGrid d={d.fix.weekGrid} /> },
  ];

  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mb-16 text-center mx-auto">
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

        <div className="flex flex-col gap-14 md:gap-20">
          {rows.map((row, i) => (
            <div
              key={row.copy.title}
              data-reveal
              className={`flex flex-col gap-8 md:gap-14 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              <div className="w-full md:w-[38%] shrink-0">
                <span
                  className="inline-flex shrink-0 w-10 h-10 rounded-full items-center justify-center mb-5"
                  style={{ border: "1px solid rgba(212,255,43,0.22)", background: "rgba(212,255,43,0.05)" }}
                  aria-hidden
                >
                  {ICONS[i]}
                </span>
                <h3 className="font-playfair font-normal text-fg mb-3" style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.2 }}>
                  {row.copy.title}
                </h3>
                <p className="font-sora font-light text-fg/62 leading-[1.65]" style={{ fontSize: "14.5px" }}>
                  {row.copy.body}
                </p>
              </div>

              <div className="w-full md:flex-1">
                <div
                  className="rounded-2xl border border-white/[0.05] bg-white/[0.012] p-6 md:p-8"
                >
                  {row.visual}
                </div>
                <p
                  className="font-label text-fg/40 mt-3"
                  style={{ fontSize: "10px", letterSpacing: "0.5px" }}
                >
                  {d.fix.illustrativeCaption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
