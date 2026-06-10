"use client";

import { useEffect, useRef, useState } from "react";
import VoidSection from "@/components/VoidSection";
import type { NewPageDict } from "../lib/i18n";
import { PHASE1_ANCHOR } from "../lib/config";

/**
 * Section 5 — THE BOTTLENECK MAP (mechanism).
 *
 * Intro (what it is + what you walk away with) sits inside VoidSection —
 * same pure-black, parallax-dot treatment as the homepage's AI Map bridge.
 * Below it: the sample-map table, ported from
 * app/partners/[slug]/short/SectionOfferGlance.tsx (COL_TEMPLATE grid,
 * FeasibilityDots, pillar rows, phase-1 footer, cost-of-inaction strip).
 */

const SCROLL_HINT_KEY = "new_map_scroll_hinted";

// Same sample stats as SectionOfferGlance — generic, illustrative numbers.
const PILLARS_BASE = [
  { cost: "€2,400/mo", feasibility: 5, rank: 1 },
  { cost: "8 hrs/wk", feasibility: 4, rank: 3 },
  { cost: "6 hrs/wk", feasibility: 5, rank: 2 },
  { cost: "3 hrs/wk", feasibility: 4, rank: 5 },
  { cost: "€900/mo", feasibility: 5, rank: 3 },
  { cost: "4 hrs/wk", feasibility: 4, rank: 4 },
];

const COL_TEMPLATE = "2.5fr 1fr 1.2fr 0.7fr";

function FeasibilityDots({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className="inline-block rounded-full"
          style={{
            width: "5px",
            height: "5px",
            background: dot <= score ? "rgba(212,255,43,0.75)" : "rgba(240,236,230,0.08)",
          }}
        />
      ))}
    </span>
  );
}

export default function BottleneckMap({ d }: { d: NewPageDict }) {
  const sm = d.map.sample;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined" && !localStorage.getItem(SCROLL_HINT_KEY)) {
      setShowHint(true);
    }
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft > 10) {
        setShowHint(false);
        if (typeof localStorage !== "undefined") localStorage.setItem(SCROLL_HINT_KEY, "1");
        el.removeEventListener("scroll", onScroll);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const pillars = [
    {
      label: sm.pillarLabels[0],
      items: [
        { pain: sm.pillarPains[0][0], ...PILLARS_BASE[0] },
        { pain: sm.pillarPains[0][1], ...PILLARS_BASE[1] },
      ],
    },
    {
      label: sm.pillarLabels[1],
      items: [
        { pain: sm.pillarPains[1][0], ...PILLARS_BASE[2] },
        { pain: sm.pillarPains[1][1], ...PILLARS_BASE[3] },
      ],
    },
    {
      label: sm.pillarLabels[2],
      items: [
        { pain: sm.pillarPains[2][0], ...PILLARS_BASE[4] },
        { pain: sm.pillarPains[2][1], ...PILLARS_BASE[5] },
      ],
    },
  ];

  return (
    <>
      {/* ── Mechanism intro — VoidSection (pure black, parallax dots) ── */}
      <VoidSection className="section-divider">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.map.label}
          </p>
          <h2
            data-reveal
            className="font-playfair font-normal text-fg mb-6"
            style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "24ch" }}
          >
            {d.map.headline}
          </h2>
          <p data-reveal className="font-sora font-light text-fg/55 leading-[1.85] mb-10" style={{ fontSize: "15px", maxWidth: "60ch" }}>
            {d.map.body}
          </p>

          <ul data-reveal className="flex flex-col gap-3 text-left mb-8 mx-auto" style={{ maxWidth: "52ch" }}>
            {d.map.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 font-sora font-light text-fg/55 leading-[1.6]" style={{ fontSize: "14px" }}>
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(212,255,43,0.6)" }} aria-hidden />
                {bullet}
              </li>
            ))}
          </ul>

          <p data-reveal className="font-sora font-light italic text-fg/30 leading-[1.7]" style={{ fontSize: "13px", maxWidth: "52ch" }}>
            {d.map.note}
          </p>
        </div>
      </VoidSection>

      {/* ── Sample map table — ported from SectionOfferGlance ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p data-reveal className="font-label text-fg/30 uppercase" style={{ fontSize: "10px", letterSpacing: "3px" }}>
              {sm.docTitle}
            </p>
            {showHint && (
              <p className="md:hidden font-sora text-fg/22 italic" style={{ fontSize: "10px" }}>
                ← swipe →
              </p>
            )}
          </div>

          {/* Doc frame */}
          <div
            data-reveal
            className="w-full rounded-2xl border border-white/[0.08] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.016)", boxShadow: "0 12px 48px rgba(0,0,0,0.36), 0 0 0 1px rgba(212,255,43,0.05)" }}
          >
            {/* Doc header */}
            <div className="px-6 py-4 border-b border-white/[0.06]" style={{ background: "rgba(212,255,43,0.055)" }}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-label text-accent/65" style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>{sm.docTitle}</p>
                  <p className="font-label text-fg font-medium mt-0.5" style={{ fontSize: "15px" }}>{sm.clientLabel}</p>
                </div>
                <div className="text-right">
                  <p className="font-label text-fg/22 uppercase" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>{sm.sessionLabel}</p>
                  <p className="font-sora text-fg/35" style={{ fontSize: "9px" }}>{sm.studioName}</p>
                </div>
              </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
              <div className="grid px-6 py-2.5 border-b border-white/[0.04]" style={{ gridTemplateColumns: COL_TEMPLATE }}>
                <span className="font-label text-fg/38" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{sm.colPain}</span>
                <span className="font-label text-fg/38" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{sm.colLosingNow}</span>
                <span className="font-label text-fg/38" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{sm.colFeasibility}</span>
                <span className="font-label text-fg/38 text-right" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{sm.colPriority}</span>
              </div>

              {pillars.map((pillar, pi) => (
                <div key={pi} className={pi < pillars.length - 1 ? "border-b border-white/[0.05]" : ""}>
                  <div className="px-6 py-2" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <span className="font-label text-accent/55" style={{ fontSize: "9px", letterSpacing: "1.8px", textTransform: "uppercase" }}>
                      {sm.pillarPrefix(pi + 1, pillar.label)}
                    </span>
                  </div>
                  {pillar.items.map((item, ii) => (
                    <div
                      key={ii}
                      className="grid px-6 py-3 border-t border-white/[0.03] hover:bg-white/[0.015] transition-colors duration-150 items-center"
                      style={{ gridTemplateColumns: COL_TEMPLATE, gap: "0.75rem" }}
                    >
                      <p className="font-sora font-light text-fg/62" style={{ fontSize: "12px" }}>{item.pain}</p>
                      <p className="font-numeral text-fg/55" style={{ fontSize: "12px" }}>{item.cost}</p>
                      <FeasibilityDots score={item.feasibility} />
                      <p className="font-numeral text-fg/38 text-right" style={{ fontSize: "12px" }}>#{item.rank}</p>
                    </div>
                  ))}
                </div>
              ))}

              {/* Phase 1 footer */}
              <div className="px-6 py-4" style={{ background: "rgba(212,255,43,0.065)", borderTop: "1px solid rgba(212,255,43,0.16)" }}>
                <p className="font-label text-accent/65 mb-2" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                  {sm.phase1Heading}
                </p>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-sora font-light text-fg/62 flex-1" style={{ fontSize: "12px" }}>{sm.phase1Rec}</p>
                  <div className="text-right shrink-0">
                    <p className="font-sora text-fg/35" style={{ fontSize: "10px" }}>{sm.phase1Timeline}</p>
                    <p className="font-numeral font-bold text-accent" style={{ fontSize: "17px", lineHeight: 1.2 }}>{PHASE1_ANCHOR}</p>
                    <p className="font-sora text-fg/22" style={{ fontSize: "9px" }}>{sm.phase1IfProceed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE CARD REFLOW */}
            <div className="md:hidden">
              {pillars.map((pillar, pi) => (
                <div key={pi} className={pi < pillars.length - 1 ? "border-b border-white/[0.06]" : ""}>
                  <div className="px-5 py-2.5" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <span className="font-label text-accent/55" style={{ fontSize: "9px", letterSpacing: "1.8px", textTransform: "uppercase" }}>
                      {sm.pillarPrefix(pi + 1, pillar.label)}
                    </span>
                  </div>
                  {pillar.items.map((item, ii) => (
                    <div key={ii} className="border-t border-white/[0.03] px-5 py-4">
                      <p className="font-sora font-light text-fg/65 mb-2.5 leading-[1.5]" style={{ fontSize: "13px" }}>
                        {item.pain}
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="font-numeral text-fg/50" style={{ fontSize: "12px" }}>{item.cost}</span>
                        <FeasibilityDots score={item.feasibility} />
                        <span className="font-numeral text-fg/35" style={{ fontSize: "11px" }}>#{item.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Phase 1 card */}
              <div className="px-5 py-4" style={{ background: "rgba(212,255,43,0.065)", borderTop: "1px solid rgba(212,255,43,0.16)" }}>
                <p className="font-label text-accent/65 mb-2" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                  {sm.phase1Heading}
                </p>
                <p className="font-sora font-light text-fg/62 mb-3" style={{ fontSize: "12px" }}>{sm.phase1Rec}</p>
                <div className="flex items-center justify-between">
                  <span className="font-sora text-fg/35" style={{ fontSize: "11px" }}>{sm.phase1Timeline}</span>
                  <div className="text-right">
                    <span className="font-numeral font-bold text-accent" style={{ fontSize: "16px" }}>{PHASE1_ANCHOR}</span>
                    <p className="font-sora text-fg/22" style={{ fontSize: "9px" }}>{sm.phase1IfProceed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost-of-inaction summary */}
          <div data-reveal className="mt-4 rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.012)" }}>
            <div className="px-6 py-5 flex flex-col sm:flex-row gap-5 sm:items-center">
              <div className="shrink-0">
                <p className="font-label text-fg/22 uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "2px" }}>
                  {sm.bleedLabel}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeral font-bold text-fg/55" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1 }}>
                    {sm.bleedStat}
                  </span>
                  <span className="font-sora text-fg/28" style={{ fontSize: "12px" }}>{sm.bleedAnnual}</span>
                </div>
              </div>

              <div className="hidden sm:block w-px self-stretch bg-white/[0.06]" aria-hidden />

              <div className="shrink-0">
                <p className="font-label text-accent/50 uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "2px" }}>
                  {sm.bleedPhase1Label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeral font-bold text-accent" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1 }}>
                    {PHASE1_ANCHOR}
                  </span>
                  <span className="font-sora text-accent/55" style={{ fontSize: "12px" }}>{sm.bleedPayback}</span>
                </div>
              </div>

              <p className="font-sora font-light text-fg/38 leading-[1.75]" style={{ fontSize: "13px" }}>
                {sm.bleedDesc(PHASE1_ANCHOR)}
              </p>
            </div>
          </div>

          <p className="font-sora text-fg/[0.14] mt-4 text-center italic" style={{ fontSize: "10px" }}>{sm.note}</p>
        </div>
      </section>
    </>
  );
}
