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
    source: "IEEE",
    useCases: [
      {
        title: "Quote-to-invoice acceleration",
        pain: "Quotes take days; we lose jobs to whoever replies first.",
        result: "Quote turnaround: 3–5 days → under 2 hours",
      },
      {
        title: "Production scheduling assistant",
        pain: "Scheduling lives in one person's head and breaks when they're out.",
        result: "~8–10 hrs/week planning time recovered",
      },
      {
        title: "After-sale ticket routing",
        pain: "Service requests sit in an inbox; the wrong tech gets dispatched.",
        result: "First-response time down ~60%",
      },
    ],
  },
  {
    id: "professional-services",
    label: "Professional Services",
    source: "McKinsey 2024",
    useCases: [
      {
        title: "Client intake & conflict check",
        pain: "Onboarding a client eats half a day of partner time.",
        result: "Intake → engagement letter in minutes, not days",
      },
      {
        title: "Billable-time capture",
        pain: "We under-bill because nobody logs time accurately.",
        result: "5–8% billable-hour recovery",
      },
      {
        title: "Document first-pass review",
        pain: "Partners read every draft from scratch.",
        result: "First-pass review time down ~40%",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    source: "industry avg",
    useCases: [
      {
        title: "Tier-1 support automation",
        pain: "Support drowns in 'where's my order' tickets.",
        result: "60–80% of tier-1 tickets auto-resolved",
      },
      {
        title: "Returns / RMA processing",
        pain: "Returns are manual and slow; customers churn.",
        result: "Return decisions in minutes; faster-resolution CSAT lift",
      },
      {
        title: "SKU launch copy",
        pain: "Listing copy bottlenecks every product launch.",
        result: "Launch copy in N languages in hours, not weeks",
      },
    ],
  },
  {
    id: "investor-operators",
    label: "Investor-Operators",
    source: "client baseline",
    useCases: [
      {
        title: "Portfolio dashboard digest",
        pain: "I can't see across my companies without chasing each one.",
        result: "Weekly cross-portfolio digest, anomalies auto-flagged",
      },
      {
        title: "Inbox + calendar triage",
        pain: "Three companies, one inbox, no signal.",
        result: "~6–10 hrs/week triage time recovered",
      },
      {
        title: "Diligence pre-screen",
        pain: "Pitch decks pile up; good ones get missed.",
        result: "Every deck summarised against thesis within the hour",
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
        <div data-reveal className="flex flex-wrap gap-2 mb-6">
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

        {/* Table — horizontal scroll on mobile, bounded container */}
        <div
          data-reveal
          className="relative w-full rounded-2xl border border-white/[0.06] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.015)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
        >
          {/* Right-edge fade — visual cue that content continues */}
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
            {/* min-width keeps columns readable; scroll container handles the rest */}
            <div style={{ minWidth: "600px" }}>

              {/* Column headers */}
              <div
                className="grid px-6 py-3 border-b border-white/[0.06]"
                style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
              >
                {["Use case", "Pain it fixes", "Typical result"].map((h) => (
                  <span key={h} className="font-sora text-fg/25" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* One row per use case — all fields populated */}
              {active.useCases.map((uc, i) => (
                <div
                  key={i}
                  className="grid px-6 py-4 border-t border-white/[0.04] hover:bg-white/[0.018] transition-colors duration-150 items-start gap-4"
                  style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
                >
                  <p className="font-sora font-semibold text-fg/75 leading-[1.5]" style={{ fontSize: "13px" }}>
                    {uc.title}
                  </p>
                  <p className="font-sora font-light text-fg/50 leading-[1.6]" style={{ fontSize: "13px", fontStyle: "italic" }}>
                    &ldquo;{uc.pain}&rdquo;
                  </p>
                  <p className="font-sora font-light text-accent/70 leading-[1.6]" style={{ fontSize: "13px" }}>
                    {uc.result}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Source footnote */}
        <p data-reveal className="font-sora font-light text-fg/20 mt-6 text-center leading-relaxed" style={{ fontSize: "11px" }}>
          Sources: IEEE · McKinsey The State of AI 2024 · industry conversion benchmarks · client-reported baselines.
          ROI figures are directional averages, not guarantees.
        </p>

      </div>
    </section>
  );
}
