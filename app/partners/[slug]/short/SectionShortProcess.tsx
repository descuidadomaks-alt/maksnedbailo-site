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
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-divider py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
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
          {/*
           * Circle row:
           * - Line STARTS at the center of circle 01 (left: 24px = circle radius)
           * - Line EXTENDS past circle 03 by 40px (width: calc(100% + 16px))
           * - Circles have a solid-bg halo (box-shadow) that obscures the line
           *   behind them, creating a soft-blur-under effect without masks
           * - scaleX(0→1) animates left-to-right on scroll entry
           */}
          <div
            className="relative flex justify-between"
            style={{ height: "48px", marginBottom: "28px", overflow: "visible" }}
          >
            {/* Background track */}
            <div
              className="absolute z-0"
              style={{
                height: "1px",
                top: "23px",
                left: "24px",                       // starts at centre of O1
                width: "calc(100% + 16px)",          // extends 40px past O3
                background: "rgba(212,255,43,0.07)",
              }}
              aria-hidden
            />
            {/* Animated fill — scaleX 0→1 from left, then fades at the right tail */}
            <div
              className="absolute z-0"
              style={{
                height: "1px",
                top: "23px",
                left: "24px",
                width: "calc(100% + 16px)",
                transformOrigin: "left center",
                transform: `scaleX(${lineVisible ? 1 : 0})`,
                transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
                background:
                  "linear-gradient(to right, rgba(212,255,43,0.32) 0%, rgba(212,255,43,0.32) 88%, transparent 100%)",
              }}
              aria-hidden
            />

            {/* Circles — solid bg halo erases the line behind each circle */}
            {d.process.steps.map((step, i) => (
              <div
                key={step.num}
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(6,6,8,1)",           // solid bg colour
                  border: "1px solid rgba(212,255,43,0.28)",
                  // layered shadow: outer soft fade + inner hard halo matching bg
                  boxShadow: `0 0 14px 8px rgba(6,6,8,0.96), 0 0 0 10px rgba(6,6,8,1)`,
                  transition: `border-color 0.4s ease ${0.3 + i * 0.25}s`,
                  borderColor: lineVisible ? "rgba(212,255,43,0.42)" : "rgba(212,255,43,0.22)",
                }}
              >
                <span
                  className="font-label text-accent"
                  style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}
                >
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
                className="rounded-2xl border border-white/[0.06] bg-white/[0.014] p-7 flex flex-col gap-3 hover:border-accent/18 hover:bg-white/[0.024] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300"
              >
                <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
                  {step.body}
                </p>
                {step.trust && (
                  <p className="font-sora font-light text-fg/28 mt-1 italic" style={{ fontSize: "12px" }}>
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
              <div className="flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(6,6,8,1)", border: "1px solid rgba(212,255,43,0.28)" }}
                >
                  <span className="font-label text-accent" style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1 }}>{step.num}</span>
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
              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.014] p-6 flex flex-col gap-3 mb-4 transition-all duration-300">
                <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "20px", lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
                  {step.body}
                </p>
                {step.trust && (
                  <p className="font-sora font-light text-fg/28 italic" style={{ fontSize: "12px" }}>{step.trust}</p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
