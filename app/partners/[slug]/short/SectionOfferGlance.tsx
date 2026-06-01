"use client";

import { useRef, useState, useEffect } from "react";
import type { ShortPartnerConfig } from "@/content/partners/index";
import type { ShortPageDict } from "../lib/i18n";

/**
 * Offer at a Glance.
 *  1. Value anchor + copy (full-width, editorially laid out)
 *  2. The full Strategic AI Map sample — the actual deliverable, showing
 *     exactly what the prospect walks away with. €4,500 labeled as a
 *     Phase 1 EXAMPLE estimate, never as the price of the session.
 */

const PILLARS = [
  {
    items: [
      { pain: "Lead response delay (>4h avg)", cost: "€2,400/mo", feasibility: 5, roi: "€2,400/mo", rank: 1 },
      { pain: "Manual booking follow-up", cost: "8 hrs/wk", feasibility: 4, roi: "8 hrs/wk", rank: 3 },
    ],
  },
  {
    items: [
      { pain: "Knowledge lives in founder's head", cost: "6 hrs/wk", feasibility: 5, roi: "12 hrs/wk", rank: 2 },
      { pain: "Meeting notes + action tracking", cost: "3 hrs/wk", feasibility: 4, roi: "3 hrs/wk", rank: 5 },
    ],
  },
  {
    items: [
      { pain: "Invoice & document processing", cost: "€900/mo", feasibility: 5, roi: "€900/mo", rank: 3 },
      { pain: "Weekly reporting to stakeholders", cost: "4 hrs/wk", feasibility: 4, roi: "4 hrs/wk", rank: 4 },
    ],
  },
];

const SCROLL_HINT_KEY = "offer_map_scroll_hinted";

function FeasibilityDots({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((d) => (
        <span
          key={d}
          className="inline-block rounded-full"
          style={{
            width: "5px",
            height: "5px",
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

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Value anchor + copy ── */}
        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.offer.label}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-start mb-16">

          {/* Left — copy */}
          <div>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-6"
              style={{ fontSize: "clamp(22px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
            >
              {d.offer.headline(p)}
            </h2>

            {/* Price anchor */}
            <div data-reveal className="flex items-baseline gap-4 mb-2">
              <span className="font-sora text-fg/22" style={{ fontSize: "11px", letterSpacing: "1px" }}>
                {d.offer.normallyLabel}
              </span>
              <span
                className="font-playfair text-fg/28 line-through"
                style={{ fontSize: "clamp(26px, 2.8vw, 38px)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {d.offer.normallyValue}
              </span>
            </div>
            <p data-reveal className="font-sora font-semibold text-accent mb-8" style={{ fontSize: "13px" }}>
              {d.offer.giftedLine(p)}
            </p>

            <p data-reveal className="font-sora font-light text-fg/55 leading-[1.85] mb-10" style={{ fontSize: "15px", maxWidth: "58ch" }}>
              {d.offer.body}
            </p>

            {/* Deliverable list — numbered, no icons */}
            <div data-reveal>
              <p className="font-sora text-fg/28 mb-4" style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                {d.offer.deliverableHeading}
              </p>
              <ul className="flex flex-col gap-3">
                {[d.offer.del1, d.offer.del2, d.offer.del3].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 font-playfair text-accent"
                      style={{ fontSize: "16px", lineHeight: 1.5, letterSpacing: "-0.02em" }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sora font-light text-fg/60 leading-[1.65]" style={{ fontSize: "14px" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — compact stats (above the full map) */}
          <div data-reveal className="md:sticky md:top-8">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.014)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "3px solid rgba(212,255,43,0.32)",
                boxShadow: "0 12px 48px rgba(0,0,0,0.28)",
              }}
            >
              <div className="px-5 py-4 border-b border-white/[0.05]" style={{ background: "rgba(212,255,43,0.04)" }}>
                <p className="font-sora text-accent/60" style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                  {sm.docTitle}
                </p>
                <p className="font-playfair text-fg/45 mt-0.5 italic" style={{ fontSize: "14px" }}>{sm.clientLabel}</p>
              </div>
              <div className="grid grid-cols-3 divide-x divide-white/[0.05]">
                {[
                  { v: "3", l: d.offer.del1.split(" ").slice(0, 2).join(" ") },
                  { v: "6", l: d.offer.del2.split(" ").slice(0, 3).join(" ") },
                  { v: config.phase1Anchor, l: sm.phase1Timeline.replace("Timeline:", "").replace("Термін:", "").trim() },
                ].map((s, i) => (
                  <div key={i} className="px-4 py-4 text-center">
                    <p className="font-playfair text-accent" style={{ fontSize: i === 2 ? "15px" : "clamp(20px, 2.2vw, 26px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                      {s.v}
                    </p>
                    <p className="font-sora text-fg/28 mt-1.5 leading-[1.4]" style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-white/[0.04]">
                <p className="font-sora text-fg/18 text-center italic" style={{ fontSize: "10px" }}>{sm.note}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Full Strategic AI Map sample ── */}
        <div data-reveal>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="font-sora text-fg/30 uppercase" style={{ fontSize: "10px", letterSpacing: "3px" }}>
              {sm.docTitle}
            </p>
            {showHint && (
              <p className="md:hidden font-sora text-fg/22 italic" style={{ fontSize: "10px" }}>
                ← swipe →
              </p>
            )}
          </div>

          {/* Horizontally-scrollable document frame */}
          <div
            className="relative w-full rounded-2xl border border-white/[0.08] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.016)", boxShadow: "0 16px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,255,43,0.05)" }}
          >
            {/* Right-edge fade */}
            <div
              className="md:hidden pointer-events-none absolute top-0 right-0 bottom-0 z-10"
              style={{ width: "48px", background: "linear-gradient(to right, transparent, rgba(6,6,8,0.92))" }}
              aria-hidden
            />

            <div
              ref={scrollRef}
              className="overflow-x-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div style={{ minWidth: "540px" }}>

                {/* Doc header */}
                <div className="px-6 py-5 border-b border-white/[0.06]" style={{ background: "rgba(212,255,43,0.055)" }}>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-sora text-accent/65" style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>{sm.docTitle}</p>
                      <p className="font-playfair text-fg mt-0.5" style={{ fontSize: "17px", letterSpacing: "-0.02em" }}>{sm.clientLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-sora text-fg/22" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>{sm.sessionLabel}</p>
                      <p className="font-sora text-fg/35" style={{ fontSize: "10px" }}>{sm.studioName}</p>
                    </div>
                  </div>
                </div>

                {/* Column headers */}
                <div className="grid px-6 py-2 border-b border-white/[0.04]" style={{ gridTemplateColumns: "1fr 90px 90px 80px 48px" }}>
                  {[sm.colPain, sm.colCost, sm.colFeasibility, sm.colRoi, sm.colRank].map((h) => (
                    <span key={h} className="font-sora text-fg/20" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>{h}</span>
                  ))}
                </div>

                {/* Pillars */}
                {PILLARS.map((pillar, pi) => (
                  <div key={pi} className={pi < PILLARS.length - 1 ? "border-b border-white/[0.05]" : ""}>
                    <div className="px-6 py-2.5" style={{ background: "rgba(255,255,255,0.01)" }}>
                      <span className="font-sora font-semibold text-accent/55" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                        {sm.pillarPrefix(pi + 1, sm.pillarLabels[pi])}
                      </span>
                    </div>
                    {pillar.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="grid px-6 py-3 border-t border-white/[0.03] hover:bg-white/[0.015] transition-colors duration-150 items-center gap-2"
                        style={{ gridTemplateColumns: "1fr 90px 90px 80px 48px" }}
                      >
                        <p className="font-sora font-light text-fg/62" style={{ fontSize: "12px" }}>{item.pain}</p>
                        <p className="font-sora text-fg/32" style={{ fontSize: "11px" }}>{item.cost}</p>
                        <FeasibilityDots score={item.feasibility} />
                        <p className="font-sora text-accent/65" style={{ fontSize: "11px" }}>{item.roi}</p>
                        <p className="font-sora font-semibold text-fg/35 text-center" style={{ fontSize: "12px" }}>#{item.rank}</p>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Phase 1 footer — labeled as example estimate */}
                <div className="px-6 py-5" style={{ background: "rgba(212,255,43,0.065)", borderTop: "1px solid rgba(212,255,43,0.16)" }}>
                  <p className="font-sora text-accent/65 mb-2" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    {sm.phase1Heading}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="font-sora font-light text-fg/62" style={{ fontSize: "12px" }}>{sm.phase1Rec}</p>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-sora text-fg/30" style={{ fontSize: "11px" }}>{sm.phase1Timeline}</span>
                      <div className="text-right">
                        <p className="font-playfair text-accent" style={{ fontSize: "15px", letterSpacing: "-0.02em" }}>
                          {config.phase1Anchor}
                        </p>
                        <p className="font-sora text-fg/22" style={{ fontSize: "9px" }}>if you choose to proceed</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
