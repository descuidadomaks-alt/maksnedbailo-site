"use client";

import { useEffect, useRef, useState } from "react";
import type { PartnerData } from "@/content/partners/index";

const STEPS = [
  {
    num: "01",
    title: "Book",
    body: "Pick a 90-minute slot. Answer 4 pre-call questions so I show up prepared, not generic.",
  },
  {
    num: "02",
    title: "Map",
    body: "We go through your business across the 3 pillars. I score it live, in front of you, on a shared screen. You see how I think.",
  },
  {
    num: "03",
    title: "Receive",
    body: "You receive the Strategic AI Map within 48 hours — a proper document, not rough notes. If something's worth building, I'll quote Phase 1 — typically a focused €4,500 build (2–3 weeks) that pays for itself within a couple of months. I won't pitch a build that doesn't. If not, you still have the map.",
  },
];

export default function SectionProcess({ data }: { data: PartnerData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLineVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Process
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-16"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          How It Works
        </h2>

        {/* ── Desktop stepper ─────────────────────────────────────────────── */}
        <div className="hidden md:block" data-reveal>
          {/* Step number row with connecting line */}
          <div className="relative flex justify-between items-center mb-8 px-[calc(33.33%/2-24px)]">
            {/* Background track */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
              style={{ background: "rgba(212,255,43,0.08)" }}
              aria-hidden
            />
            {/* Animated fill */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px"
              style={{
                right: 0,
                background: "rgba(212,255,43,0.35)",
                transformOrigin: "left center",
                transform: `scaleX(${lineVisible ? 1 : 0}) translateY(-50%)`,
                transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
              aria-hidden
            />

            {/* Step circles */}
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="relative z-10 flex flex-col items-center"
                style={{ width: "48px" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(212,255,43,0.08)",
                    border: "1px solid rgba(212,255,43,0.28)",
                    boxShadow: lineVisible ? "0 0 18px rgba(212,255,43,0.12)" : "none",
                    transition: `box-shadow 0.4s ease ${0.3 + i * 0.3}s`,
                  }}
                >
                  <span
                    className="font-playfair font-bold text-accent"
                    style={{ fontSize: "16px", lineHeight: 1, letterSpacing: "-0.03em" }}
                  >
                    {step.num}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                data-reveal={`d${i}`}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-7 flex flex-col gap-4 hover:border-accent/20 hover:bg-white/[0.032] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <h3
                  className="font-playfair font-normal text-fg"
                  style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.2 }}
                >
                  {step.title}
                </h3>
                <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
                  {step.body.replace("€4,500", data.pricing.phase1Anchor)}
                </p>
                {step.num === "03" && (
                  <p className="font-sora font-light text-fg/30 mt-1" style={{ fontSize: "12px", fontStyle: "italic" }}>
                    We do the final analysis after the call. You get a document, not rough notes.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile stepper — vertical connector ─────────────────────────── */}
        <div className="md:hidden flex flex-col">
          {STEPS.map((step, i) => (
            <div key={step.num} data-reveal={`d${i}`} className="flex gap-5">
              {/* Left: circle + vertical line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: "rgba(212,255,43,0.08)",
                    border: "1px solid rgba(212,255,43,0.28)",
                  }}
                >
                  <span className="font-playfair font-bold text-accent" style={{ fontSize: "13px", letterSpacing: "-0.03em" }}>
                    {step.num}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 w-px mt-2 mb-2"
                    style={{
                      background: `linear-gradient(to bottom, rgba(212,255,43,${lineVisible ? 0.3 : 0.06}), rgba(212,255,43,0.06))`,
                      transition: `background 0.8s ease ${0.4 + i * 0.3}s`,
                      minHeight: "32px",
                    }}
                    aria-hidden
                  />
                )}
              </div>

              {/* Right: card */}
              <div
                className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.018] p-6 flex flex-col gap-3 mb-4 hover:border-accent/20 transition-all duration-300"
              >
                <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "20px", lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
                  {step.body.replace("€4,500", data.pricing.phase1Anchor)}
                </p>
                {step.num === "03" && (
                  <p className="font-sora font-light text-fg/30" style={{ fontSize: "12px", fontStyle: "italic" }}>
                    We do the final analysis after the call. You get a document, not rough notes.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
