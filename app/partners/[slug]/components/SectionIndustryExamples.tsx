"use client";

import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

const SCROLL_HINT_KEY = "industry_table_scroll_hinted";

const INDUSTRIES = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    pain: "Equipment goes down, nobody knows until orders are late.",
    roi: "20% downtime reduction",
    source: "IEEE",
    useCases: [
      {
        title: "Quote-to-invoice acceleration",
        desc: "RFQ intake → spec parsing → quote draft in under 2 hours. Sales reviews and sends.",
      },
      {
        title: "Production scheduling assistant",
        desc: "Daily schedule draft from inventory + open orders + capacity. Foreman approves in 10 minutes.",
      },
      {
        title: "After-sale ticket routing",
        desc: "Warranty/repair requests parsed, routed to the right technician with parts pre-checked.",
      },
    ],
  },
  {
    id: "professional-services",
    label: "Professional Services",
    pain: "I'm the only person who knows where anything is.",
    roi: "12 hrs/week founder time recovered",
    source: "McKinsey 2024",
    useCases: [
      {
        title: "Client intake & conflict check",
        desc: "Intake form fills AI summary of matter, checks against client list, drafts engagement letter.",
      },
      {
        title: "Billable-time capture",
        desc: "Calendar + email + docs → AI proposes time entries → 5 min/day of approval per fee earner.",
      },
      {
        title: "Document first-pass review",
        desc: "Contracts and filings pre-flagged for standard risks before partner sees them.",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    pain: "Customers ghost us after one slow reply.",
    roi: "12% sales uplift",
    source: "industry avg",
    useCases: [
      {
        title: "Tier-1 support automation",
        desc: "Chat + email handle 60–80% of order/refund/size questions; escalates the rest with full context.",
      },
      {
        title: "Returns / RMA processing",
        desc: "Photo + reason in → triage decision draft out (refund / replace / repair).",
      },
      {
        title: "SKU launch copy",
        desc: "Specs in → on-brand product descriptions in multiple languages, ready for review.",
      },
    ],
  },
  {
    id: "investor-operators",
    label: "Investor-Operators",
    pain: "I want oversight of 5 ventures without doing 5 jobs.",
    roi: "60% less manual reporting",
    source: "client baseline",
    useCases: [
      {
        title: "Portfolio dashboard digest",
        desc: "Financial + ops KPIs from multiple companies condensed weekly, anomalies flagged.",
      },
      {
        title: "Inbox + calendar triage",
        desc: "Cross-company first-pass for chairs and founders managing 3+ ventures.",
      },
      {
        title: "Diligence pre-screen",
        desc: "Incoming pitch decks → structured summary against stated thesis, flagged for human review.",
      },
    ],
  },
];

export default function SectionIndustryExamples() {
  const [activeId, setActiveId] = useState("professional-services");
  const [showHint, setShowHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = INDUSTRIES.find((r) => r.id === activeId) ?? INDUSTRIES[1];

  useEffect(() => {
    if (typeof localStorage !== "undefined" && !localStorage.getItem(SCROLL_HINT_KEY)) {
      setShowHint(true);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft > 10) {
        setShowHint(false);
        if (typeof localStorage !== "undefined") localStorage.setItem(SCROLL_HINT_KEY, "1");
        window.plausible?.("mobile_table_scroll", { props: { table: "industry_examples" } });
        el.removeEventListener("scroll", onScroll);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Industry
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-5"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          What This Looks Like in Your Industry
        </h2>

        <p data-reveal className="font-sora font-light text-fg/35 mb-8" style={{ fontSize: "14px", lineHeight: 1.7 }}>
          See yourself on the page. These are the exact patterns we map in the first 30 minutes.
        </p>

        {/* Tab chips */}
        <div data-reveal className="flex flex-wrap gap-2 mb-8">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveId(ind.id)}
              className="font-sora transition-all duration-200 rounded-full px-4 py-2"
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                background: activeId === ind.id ? "rgba(212,255,43,0.12)" : "rgba(255,255,255,0.04)",
                border: activeId === ind.id ? "1px solid rgba(212,255,43,0.35)" : "1px solid rgba(255,255,255,0.07)",
                color: activeId === ind.id ? "rgba(212,255,43,0.85)" : "rgba(240,236,230,0.35)",
              }}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Swipe hint — mobile only */}
        {showHint && (
          <p className="md:hidden font-sora text-fg/25 mb-2" style={{ fontSize: "11px" }}>
            ← swipe to see all columns →
          </p>
        )}

        {/* Table with horizontal scroll on mobile */}
        <div
          data-reveal
          className="relative rounded-2xl border border-white/[0.06] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.015)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
        >
          {/* Right-edge fade */}
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
            <div style={{ minWidth: "620px" }}>

              {/* Column header row */}
              <div
                className="grid px-7 py-3 border-b border-white/[0.06]"
                style={{ gridTemplateColumns: "1fr 1fr 1fr 120px" }}
              >
                {["Use case", "What it does", "Pain it fixes", "Typical result"].map((h) => (
                  <span key={h} className="font-sora text-fg/25" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Use case rows */}
              {active.useCases.map((uc, i) => (
                <div
                  key={i}
                  className="grid px-7 py-5 border-t border-white/[0.04] hover:bg-white/[0.018] transition-colors duration-150 items-start gap-4"
                  style={{ gridTemplateColumns: "1fr 1fr 1fr 120px" }}
                >
                  <p className="font-sora font-semibold text-fg/75 leading-[1.5]" style={{ fontSize: "13px" }}>
                    {uc.title}
                  </p>
                  <p className="font-sora font-light text-fg/55 leading-[1.6]" style={{ fontSize: "13px" }}>
                    {uc.desc}
                  </p>
                  <p className="font-sora font-light text-fg/45 leading-[1.6]" style={{ fontSize: "13px", fontStyle: "italic" }}>
                    &ldquo;{active.pain}&rdquo;
                  </p>
                  {i === 0 ? (
                    <div>
                      <p className="font-playfair text-accent" style={{ fontSize: "clamp(14px, 1.3vw, 17px)", lineHeight: 1.2, letterSpacing: "-0.015em" }}>
                        {active.roi}
                      </p>
                      <p className="font-sora text-fg/20 mt-1" style={{ fontSize: "10px" }}>{active.source}</p>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Source footnote */}
        <p data-reveal className="font-sora font-light text-fg/20 mt-8 text-center leading-relaxed" style={{ fontSize: "11px" }}>
          Sources: IEEE · McKinsey The State of AI 2024 · Industry conversion benchmarks · Client-reported baselines.
          ROI figures are directional averages, not guarantees.
        </p>

      </div>
    </section>
  );
}
