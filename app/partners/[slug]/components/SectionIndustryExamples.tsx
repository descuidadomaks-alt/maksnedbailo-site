"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

const INDUSTRIES = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    pain: "Equipment goes down, nobody knows until orders are late.",
    useCase: "Predictive maintenance + supplier comms automation",
    roi: "20% downtime reduction",
    source: "IEEE",
    // TODO: drop PNG at /public/partners/vlad/assets/industry-manufacturing.png
    imagePath: "/partners/vlad/assets/industry-manufacturing.png",
  },
  {
    id: "professional-services",
    label: "Professional Services",
    pain: "I'm the only person who knows where anything is.",
    useCase: "Internal knowledge AI + meeting intelligence",
    roi: "12 hrs/week founder time recovered",
    source: "McKinsey 2024",
    // TODO: drop PNG at /public/partners/vlad/assets/industry-professional-services.png
    imagePath: "/partners/vlad/assets/industry-professional-services.png",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    pain: "Customers ghost us after one slow reply.",
    useCase: "First-response AI + personalised follow-up",
    roi: "12% sales uplift",
    source: "industry avg",
    // TODO: drop PNG at /public/partners/vlad/assets/industry-ecommerce.png
    imagePath: "/partners/vlad/assets/industry-ecommerce.png",
  },
  {
    id: "investor-operators",
    label: "Investor-Operators",
    pain: "I want oversight of 5 ventures without doing 5 jobs.",
    useCase: "Cross-venture dashboards + AI ops summaries",
    roi: "60% less manual reporting",
    source: "client baseline",
    // TODO: drop PNG at /public/partners/vlad/assets/industry-investor-operators.png
    imagePath: "/partners/vlad/assets/industry-investor-operators.png",
  },
];

export default function SectionIndustryExamples() {
  const [activeId, setActiveId] = useState("professional-services");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const active = INDUSTRIES.find((r) => r.id === activeId) ?? INDUSTRIES[1];

  const openLightbox = (src: string, id: string) => {
    setLightboxSrc(src);
    window.plausible?.("lightbox_open", { props: { which_table: `industry_${id}` } });
  };

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

        <p data-reveal className="font-sora font-light text-fg/35 mb-10" style={{ fontSize: "14px", lineHeight: 1.7 }}>
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

        {/* Desktop table row — hidden on mobile */}
        <div data-reveal className="hidden md:block">
          <div
            className="rounded-2xl border border-white/[0.06] bg-white/[0.018] overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
          >
            {/* Column headers */}
            <div
              className="grid px-8 py-3 border-b border-white/[0.04]"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 140px" }}
            >
              {["The pain", "AI use case", "Typical ROI", "Source"].map((h) => (
                <span key={h} className="font-sora text-fg/25" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Active row */}
            <div
              className="grid items-start px-8 py-6 gap-6"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 140px" }}
            >
              <div>
                <p className="font-sora font-light text-fg/60 leading-[1.6]" style={{ fontSize: "14px", fontStyle: "italic" }}>
                  &ldquo;{active.pain}&rdquo;
                </p>
              </div>
              <div>
                <p className="font-sora font-light text-fg/65 leading-[1.6]" style={{ fontSize: "14px" }}>
                  {active.useCase}
                </p>
              </div>
              <div>
                <p
                  className="font-playfair text-accent"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.2, letterSpacing: "-0.015em" }}
                >
                  {active.roi}
                </p>
              </div>
              <div>
                <p className="font-sora text-fg/25" style={{ fontSize: "11px" }}>
                  {active.source}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — show "View as image" button */}
        <div data-reveal className="md:hidden">
          <div
            className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-6"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
          >
            <p className="font-sora font-semibold text-accent/80 mb-3" style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {active.label}
            </p>
            <p className="font-sora font-light text-fg/60 leading-[1.6] mb-2" style={{ fontSize: "14px", fontStyle: "italic" }}>
              &ldquo;{active.pain}&rdquo;
            </p>
            <p className="font-sora font-light text-fg/65 leading-[1.6] mb-4" style={{ fontSize: "14px" }}>
              {active.useCase}
            </p>
            <div className="flex items-center justify-between">
              <p className="font-playfair text-accent" style={{ fontSize: "16px", letterSpacing: "-0.015em" }}>
                {active.roi}
              </p>
              <button
                onClick={() => openLightbox(active.imagePath, active.id)}
                className="font-sora text-fg/40 hover:text-fg/70 transition-colors duration-200 flex items-center gap-1.5"
                style={{ fontSize: "12px", letterSpacing: "0.5px" }}
              >
                View as image
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Source footnote */}
        <p data-reveal className="font-sora font-light text-fg/20 mt-8 text-center leading-relaxed" style={{ fontSize: "11px" }}>
          Sources: IEEE Predictive Maintenance Report · McKinsey The State of AI 2024 · Industry conversion benchmarks · Client-reported baselines.
          ROI figures are directional averages, not guarantees.
        </p>

      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={`${active.label} industry example`}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </section>
  );
}
