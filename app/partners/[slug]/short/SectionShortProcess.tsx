"use client";

import { useEffect, useRef, useState } from "react";
import type { ShortPageDict } from "../lib/i18n";

export default function SectionShortProcess({ d }: { d: ShortPageDict }) {
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
          {d.process.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-14"
          style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          {d.process.headline}
        </h2>

        {/* ── Desktop horizontal stepper ── */}
        <div className="hidden md:block" data-reveal>
          {/* Circle row + animated connector */}
          <div className="relative flex justify-between items-center mb-8" style={{ paddingLeft: "calc(16.66% - 24px)", paddingRight: "calc(16.66% - 24px)" }}>
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px" style={{ background: "rgba(212,255,43,0.08)" }} aria-hidden />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px"
              style={{
                right: 0,
                background: "rgba(212,255,43,0.32)",
                transformOrigin: "left center",
                transform: `scaleX(${lineVisible ? 1 : 0}) translateY(-50%)`,
                transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s",
              }}
              aria-hidden
            />
            {d.process.steps.map((step, i) => (
              <div
                key={step.num}
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(212,255,43,0.07)",
                  border: "1px solid rgba(212,255,43,0.26)",
                  transition: `box-shadow 0.4s ease ${0.3 + i * 0.25}s`,
                  boxShadow: lineVisible ? "0 0 16px rgba(212,255,43,0.1)" : "none",
                }}
              >
                <span className="font-playfair font-bold text-accent" style={{ fontSize: "15px", letterSpacing: "-0.03em" }}>
                  {step.num}
                </span>
              </div>
            ))}
          </div>

          {/* Card row */}
          <div className="grid grid-cols-3 gap-5">
            {d.process.steps.map((step, i) => (
              <div
                key={step.num}
                data-reveal={`d${i}`}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.016] p-7 flex flex-col gap-3 hover:border-accent/18 hover:bg-white/[0.028] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300"
              >
                <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
                  {step.body}
                </p>
                {step.trust && (
                  <p className="font-sora font-light text-fg/28 mt-1" style={{ fontSize: "12px", fontStyle: "italic" }}>
                    {step.trust}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile vertical stepper ── */}
        <div className="md:hidden flex flex-col">
          {d.process.steps.map((step, i) => (
            <div key={step.num} data-reveal={`d${i}`} className="flex gap-4">
              {/* Left: circle + vertical connector */}
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(212,255,43,0.07)", border: "1px solid rgba(212,255,43,0.26)" }}
                >
                  <span className="font-playfair font-bold text-accent" style={{ fontSize: "12px" }}>{step.num}</span>
                </div>
                {i < d.process.steps.length - 1 && (
                  <div
                    className="flex-1 w-px mt-2 mb-2"
                    style={{
                      background: `linear-gradient(to bottom, rgba(212,255,43,${lineVisible ? 0.28 : 0.06}), rgba(212,255,43,0.06))`,
                      transition: `background 0.8s ease ${0.3 + i * 0.3}s`,
                      minHeight: "28px",
                    }}
                    aria-hidden
                  />
                )}
              </div>
              {/* Right: card */}
              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.016] p-6 flex flex-col gap-3 mb-4 transition-all duration-300">
                <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "20px", lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
                  {step.body}
                </p>
                {step.trust && (
                  <p className="font-sora font-light text-fg/28" style={{ fontSize: "12px", fontStyle: "italic" }}>{step.trust}</p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
