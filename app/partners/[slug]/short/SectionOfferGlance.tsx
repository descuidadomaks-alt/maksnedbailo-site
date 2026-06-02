"use client";

import { useRef, useState, useEffect } from "react";
import type { ShortPartnerConfig } from "@/content/partners/index";
import type { ShortPageDict } from "../lib/i18n";

/**
 * Offer at a Glance — value anchor + 4-column Strategic AI Map sample
 * + cost-of-inaction summary strip.
 *
 * Desktop table: 4 fr-based columns spanning full width, headers over cells.
 * Mobile: card-reflow per row — no horizontal scroll, no overflow.
 * Math: €4,500 vs #1 leak (€2,400/mo) = under 2 months payback. Consistent.
 */

const SCROLL_HINT_KEY = "offer_map_scroll_hinted";

const PILLARS_BASE = [
  { cost: "€2,400/mo", feasibility: 5, rank: 1 },
  { cost: "8 hrs/wk",  feasibility: 4, rank: 3 },
  { cost: "6 hrs/wk",  feasibility: 5, rank: 2 },
  { cost: "3 hrs/wk",  feasibility: 4, rank: 5 },
  { cost: "€900/mo",   feasibility: 5, rank: 3 },
  { cost: "4 hrs/wk",  feasibility: 4, rank: 4 },
];

// Same grid template used for BOTH headers and data rows → perfect alignment
const COL_TEMPLATE = "2.5fr 1fr 1.2fr 0.7fr";

function FeasibilityDots({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((d) => (
        <span
          key={d}
          className="inline-block rounded-full"
          style={{
            width: "5px", height: "5px",
            background: d <= score ? "rgba(212,255,43,0.75)" : "rgba(240,236,230,0.08)",
          }}
        />
      ))}
    </span>
  );
}

export default function SectionOfferGlance({
  config,
  d,
  partnerNameForSentences,
}: {
  config: ShortPartnerConfig;
  d: ShortPageDict;
  partnerNameForSentences?: string;
}) {
  const p = partnerNameForSentences ?? config.partnerName;
  const sm = d.sampleMap;
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
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Value anchor + copy ── */}
        <p data-reveal className="font-label text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.offer.label}
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-6"
          style={{ fontSize: "clamp(22px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "52ch" }}
        >
          {d.offer.headline(p)}
        </h2>

        {/* Price anchor — numerals in IBM Plex Sans with tnum */}
        <div data-reveal className="flex items-baseline gap-4 mb-2">
          <span className="font-sora text-fg/22" style={{ fontSize: "11px", letterSpacing: "1px" }}>
            {d.offer.normallyLabel}
          </span>
          <span
            className="font-numeral text-fg/28 line-through"
            style={{ fontSize: "clamp(24px, 2.6vw, 36px)", lineHeight: 1, fontWeight: 600 }}
          >
            {d.offer.normallyValue}
          </span>
        </div>
        <p data-reveal className="font-sora font-semibold text-accent mb-7" style={{ fontSize: "13px" }}>
          {d.offer.giftedLine(p)}
        </p>

        <p data-reveal className="font-sora font-light text-fg/55 leading-[1.85] mb-8" style={{ fontSize: "15px", maxWidth: "62ch" }}>
          {d.offer.body}
        </p>

        {/* Deliverable list — numbers in IBM Plex Sans, large, accent */}
        <div data-reveal className="mb-12">
          <p className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
            {d.offer.deliverableHeading}
          </p>
          <ul className="flex flex-col gap-4">
            {[d.offer.del1, d.offer.del2, d.offer.del3].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="font-numeral shrink-0 text-accent"
                  style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.3, minWidth: "32px" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sora font-light text-fg/60 leading-[1.65]" style={{ fontSize: "14px", paddingTop: "2px" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Strategic AI Map sample ── */}
        <div data-reveal>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="font-label text-fg/30 uppercase" style={{ fontSize: "10px", letterSpacing: "3px" }}>
              {sm.docTitle}
            </p>
            {showHint && (
              <p className="md:hidden font-sora text-fg/22 italic" style={{ fontSize: "10px" }}>
                ← swipe →
              </p>
            )}
          </div>

          {/* ── Doc frame ── */}
          <div
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

            {/* ── DESKTOP TABLE — full-width fr grid, never scrolls ── */}
            <div className="hidden md:block">
              {/* Column headers — same COL_TEMPLATE as rows */}
              <div className="grid px-6 py-2.5 border-b border-white/[0.04]" style={{ gridTemplateColumns: COL_TEMPLATE }}>
                <span className="font-label text-fg/38" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{sm.colPain}</span>
                <span className="font-label text-fg/38" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{sm.colLosingNow}</span>
                <span className="font-label text-fg/38" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{sm.colFeasibility}</span>
                <span className="font-label text-fg/38 text-right" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{sm.colPriority}</span>
              </div>

              {/* Pillars */}
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

              {/* Phase 1 footer — clean two-part layout */}
              <div className="px-6 py-4" style={{ background: "rgba(212,255,43,0.065)", borderTop: "1px solid rgba(212,255,43,0.16)" }}>
                <p className="font-label text-accent/65 mb-2" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                  {sm.phase1Heading}
                </p>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-sora font-light text-fg/62 flex-1" style={{ fontSize: "12px" }}>{sm.phase1Rec}</p>
                  <div className="text-right shrink-0">
                    <p className="font-sora text-fg/35" style={{ fontSize: "10px" }}>{sm.phase1Timeline}</p>
                    <p className="font-numeral font-bold text-accent" style={{ fontSize: "17px", lineHeight: 1.2 }}>{config.phase1Anchor}</p>
                    <p className="font-sora text-fg/22" style={{ fontSize: "9px" }}>{sm.phase1IfProceed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── MOBILE CARD REFLOW — no table, no overflow ── */}
            <div className="md:hidden">
              {pillars.map((pillar, pi) => (
                <div key={pi} className={pi < pillars.length - 1 ? "border-b border-white/[0.06]" : ""}>
                  {/* Group header */}
                  <div className="px-5 py-2.5" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <span className="font-label text-accent/55" style={{ fontSize: "9px", letterSpacing: "1.8px", textTransform: "uppercase" }}>
                      {sm.pillarPrefix(pi + 1, pillar.label)}
                    </span>
                  </div>
                  {/* Item cards */}
                  {pillar.items.map((item, ii) => (
                    <div
                      key={ii}
                      className="border-t border-white/[0.03] px-5 py-4"
                    >
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

              {/* Phase 1 card on mobile */}
              <div className="px-5 py-4" style={{ background: "rgba(212,255,43,0.065)", borderTop: "1px solid rgba(212,255,43,0.16)" }}>
                <p className="font-label text-accent/65 mb-2" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                  {sm.phase1Heading}
                </p>
                <p className="font-sora font-light text-fg/62 mb-3" style={{ fontSize: "12px" }}>{sm.phase1Rec}</p>
                <div className="flex items-center justify-between">
                  <span className="font-sora text-fg/35" style={{ fontSize: "11px" }}>{sm.phase1Timeline}</span>
                  <div className="text-right">
                    <span className="font-numeral font-bold text-accent" style={{ fontSize: "16px" }}>{config.phase1Anchor}</span>
                    <p className="font-sora text-fg/22" style={{ fontSize: "9px" }}>{sm.phase1IfProceed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Cost-of-inaction summary ── */}
          <div
            className="mt-4 rounded-2xl border border-white/[0.06] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.012)" }}
          >
            <div className="px-6 py-5 flex flex-col sm:flex-row gap-5 sm:items-center">
              {/* Bleed — large, muted fg (the problem) */}
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

              {/* Phase 1 — accent (the solution) */}
              <div className="shrink-0">
                <p className="font-label text-accent/50 uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "2px" }}>
                  {sm.bleedPhase1Label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeral font-bold text-accent" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1 }}>
                    {config.phase1Anchor}
                  </span>
                  <span className="font-sora text-accent/55" style={{ fontSize: "12px" }}>{sm.bleedPayback}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-sora font-light text-fg/38 leading-[1.75]" style={{ fontSize: "13px" }}>
                {sm.bleedDesc(config.phase1Anchor)}
              </p>
            </div>
          </div>

          <p className="font-sora text-fg/[0.14] mt-4 text-center italic" style={{ fontSize: "10px" }}>{sm.note}</p>
        </div>

      </div>
    </section>
  );
}
