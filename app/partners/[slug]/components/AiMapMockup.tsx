"use client";

/**
 * Stylised HTML mockup of the Strategic AI Map deliverable.
 * Desktop + mobile: horizontally-scrollable table with snap columns.
 * "← swipe →" hint dismisses on first scroll (localStorage).
 */

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

const SCROLL_HINT_KEY = "ai_map_scroll_hinted";

const PILLARS = [
  {
    label: "Customer-Facing Communication",
    items: [
      { pain: "Lead response delay (>4h avg)", cost: "€2,400/mo", feasibility: 5, roi: "€2,400/mo", rank: 1 },
      { pain: "Manual booking follow-up", cost: "8 hrs/wk", feasibility: 4, roi: "8 hrs/wk", rank: 3 },
    ],
  },
  {
    label: "Internal Knowledge & Ops",
    items: [
      { pain: "Knowledge lives in founder's head", cost: "6 hrs/wk", feasibility: 5, roi: "12 hrs/wk", rank: 2 },
      { pain: "Meeting notes + action tracking", cost: "3 hrs/wk", feasibility: 4, roi: "3 hrs/wk", rank: 5 },
    ],
  },
  {
    label: "Repeatable Execution",
    items: [
      { pain: "Invoice & document processing", cost: "€900/mo", feasibility: 5, roi: "€900/mo", rank: 3 },
      { pain: "Weekly reporting to stakeholders", cost: "4 hrs/wk", feasibility: 4, roi: "4 hrs/wk", rank: 4 },
    ],
  },
];

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

export default function AiMapMockup() {
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
        localStorage.setItem(SCROLL_HINT_KEY, "1");
        window.plausible?.("mobile_table_scroll", { props: { table: "ai_map" } });
        el.removeEventListener("scroll", onScroll);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6">

        <p
          data-reveal
          className="font-sora font-light text-fg/30 text-center mb-6"
          style={{ fontSize: "12px", fontStyle: "italic" }}
        >
          Sample output. Yours will be specific to your business.
        </p>

        {/* Scroll hint — mobile only */}
        {showHint && (
          <p className="md:hidden font-sora text-fg/25 text-center mb-3" style={{ fontSize: "11px" }}>
            ← swipe to see all columns →
          </p>
        )}

        {/* Horizontally scrollable wrapper — overflow-hidden clips rounded corners only */}
        <div
          data-reveal
          className="relative w-full rounded-2xl border border-white/[0.08] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.018)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,255,43,0.06)",
          }}
        >
          {/* Right-edge fade for horizontal scroll hint */}
          <div
            className="md:hidden pointer-events-none absolute top-0 right-0 bottom-0 z-10"
            style={{ width: "48px", background: "linear-gradient(to right, transparent, rgba(6,6,8,0.9))" }}
            aria-hidden
          />

          <div
            ref={scrollRef}
            className="overflow-x-auto"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            <div style={{ minWidth: "560px" }}>

              {/* Document header */}
              <div
                className="px-6 py-5 border-b border-white/[0.06]"
                style={{ background: "rgba(212,255,43,0.06)" }}
              >
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-sora text-accent/70" style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                      Strategic AI Map
                    </p>
                    <p className="font-playfair text-fg mt-0.5" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
                      [Client Business Name]
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-sora text-fg/25" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>90-MIN SESSION OUTPUT</p>
                    <p className="font-sora text-fg/40" style={{ fontSize: "10px" }}>care less AI automation</p>
                  </div>
                </div>
              </div>

              {/* Column header */}
              <div
                className="grid px-6 py-2 border-b border-white/[0.04]"
                style={{ gridTemplateColumns: "1fr 90px 90px 80px 50px", scrollSnapAlign: "start" }}
              >
                {["Pain / bottleneck", "Current cost", "AI feasibility", "Est. ROI", "Rank"].map((h) => (
                  <span key={h} className="font-sora text-fg/20" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Pillar sections */}
              {PILLARS.map((pillar, pi) => (
                <div key={pi} className={pi < PILLARS.length - 1 ? "border-b border-white/[0.06]" : ""}>
                  <div className="px-6 py-3" style={{ background: "rgba(255,255,255,0.012)" }}>
                    <span className="font-sora font-semibold text-accent/60" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                      Pillar {pi + 1} — {pillar.label}
                    </span>
                  </div>
                  {pillar.items.map((item, ii) => (
                    <div key={ii} className="px-6 py-3 border-t border-white/[0.03] hover:bg-white/[0.018] transition-colors duration-150">
                      <div className="grid items-center gap-2" style={{ gridTemplateColumns: "1fr 90px 90px 80px 50px" }}>
                        <p className="font-sora font-light text-fg/65" style={{ fontSize: "13px" }}>{item.pain}</p>
                        <p className="font-sora text-fg/35" style={{ fontSize: "12px" }}>{item.cost}</p>
                        <FeasibilityDots score={item.feasibility} />
                        <p className="font-sora text-accent/70" style={{ fontSize: "12px" }}>{item.roi}</p>
                        <p className="font-sora font-bold text-fg/40 text-center" style={{ fontSize: "13px" }}>#{item.rank}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Phase 1 footer */}
              <div className="px-6 py-5" style={{ background: "rgba(212,255,43,0.07)", borderTop: "1px solid rgba(212,255,43,0.18)" }}>
                <p className="font-sora text-accent/70 mb-2" style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                  Phase 1 Recommended Build
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="font-sora font-light text-fg/65" style={{ fontSize: "13px" }}>
                    #1 — AI Lead Response System · WhatsApp + website · 24/7 coverage
                  </p>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-sora text-fg/35" style={{ fontSize: "11px" }}>Timeline: 2–3 weeks</span>
                    <span className="font-playfair text-accent" style={{ fontSize: "16px", letterSpacing: "-0.02em" }}>€4,500</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
