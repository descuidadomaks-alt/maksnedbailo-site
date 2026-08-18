"use client";

import type { V2Copy } from "../lib/copy";
import CapacityGap from "../components/CapacityGap";
import LeakFunnel from "../components/LeakFunnel";
import WeekGrid from "../components/WeekGrid";

const ICONS = [
  // Sell — arrow into target
  <svg key="sell" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 12l7-7" />
  </svg>,
  // Serve — headset
  <svg key="serve" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 12a8 8 0 0 1 16 0" />
    <path d="M4 12v4a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1z" />
    <path d="M20 12v4a2 2 0 0 1-2 2h-1v-6h1a1 1 0 0 1 2 1z" />
    <path d="M15 18a3 3 0 0 1-3 2" />
  </svg>,
  // Operate — connected nodes
  <svg key="operate" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="5" cy="6" r="2.2" />
    <circle cx="19" cy="6" r="2.2" />
    <circle cx="12" cy="18" r="2.2" />
    <path d="M6.9 7.2L11 16" />
    <path d="M17.1 7.2L13 16" />
    <path d="M7.2 6h9.6" />
  </svg>,
];

/**
 * Section 3 — WHAT WE FIX. Three compact cards, sized so the whole section
 * lands inside one desktop screen: each is icon, name, one line, and a
 * small data visual. The "these numbers are an average" caption appears
 * ONCE for the section instead of under every card.
 */
export default function V2Fix({ d }: { d: V2Copy }) {
  const visuals = [
    <CapacityGap key="c" d={d.fix.capacityGap} />,
    <LeakFunnel key="l" d={d.fix.leakFunnel} />,
    <WeekGrid key="w" d={d.fix.weekGrid} />,
  ];

  return (
    <section className="section-divider relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mb-10 text-center mx-auto">
          <p data-reveal className="font-label text-fg/55 mb-4" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.fix.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mb-3 mx-auto" style={{ fontSize: "clamp(23px, 3vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.022em", maxWidth: "20ch" }}>
            {d.fix.headline}
          </h2>
          <p data-reveal className="font-sora font-light text-fg/55" style={{ fontSize: "13.5px" }}>
            {d.fix.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {d.fix.rows.map((row, i) => (
            <div
              key={row.title}
              data-reveal={`d${i}`}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.012] p-6 flex flex-col gap-4 hover:border-white/[0.09] transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <span
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid rgba(212,255,43,0.22)", background: "rgba(212,255,43,0.05)" }}
                >
                  {ICONS[i]}
                </span>
                <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "20px", lineHeight: 1.2 }}>
                  {row.title}
                </h3>
              </div>

              <p className="font-sora font-light text-fg/60 leading-[1.6]" style={{ fontSize: "13px", minHeight: "62px" }}>
                {row.body}
              </p>

              <div className="pt-4 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {visuals[i]}
              </div>
            </div>
          ))}
        </div>

        <p
          data-reveal
          className="font-label text-fg/32 text-center mt-6"
          style={{ fontSize: "10px", letterSpacing: "0.5px" }}
        >
          {d.fix.basisCaption}
        </p>
      </div>
    </section>
  );
}
