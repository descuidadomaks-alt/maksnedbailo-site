"use client";

import type { V2Copy } from "../lib/copy";

/**
 * Serve-tier visual, compact — a real tapering funnel (centred trapezoid
 * bands) rather than four left-aligned bars, so the shape itself reads as
 * "leaking" before any label is read.
 */
export default function LeakFunnel({ d }: { d: V2Copy["fix"]["leakFunnel"] }) {
  const steps = d.steps;
  const max = steps[0]?.count || 100;

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        {steps.map((step, i) => {
          const pct = (step.count / max) * 100;
          const isLast = i === steps.length - 1;
          return (
            <div key={step.label} className="flex items-center gap-3">
              <span
                className="font-sora font-light text-fg/55 shrink-0 text-right"
                style={{ fontSize: "11px", width: "76px" }}
              >
                {step.label}
              </span>
              <div className="flex-1 flex justify-center">
                <span
                  style={{
                    display: "block",
                    width: `${pct}%`,
                    height: "17px",
                    borderRadius: "3px",
                    background: isLast ? "var(--accent)" : `rgba(240,236,230,${0.2 - i * 0.035})`,
                    border: isLast ? "none" : "1px solid rgba(255,255,255,0.07)",
                  }}
                />
              </div>
              <span
                className="font-label shrink-0 text-right"
                style={{ fontSize: "11px", width: "26px", color: isLast ? "var(--accent)" : "rgba(240,236,230,0.5)" }}
              >
                {step.count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Punchline — identical structure across all three Fix visuals:
          numeral at 22px, label at 16px, one line. */}
      <p className="font-sora leading-[1.35] mt-1" style={{ fontSize: "16px", fontWeight: 500, color: "rgba(248,113,113,0.9)" }}>
        <span className="font-playfair" style={{ fontSize: "22px" }}>{d.lostValue}</span> {d.lostLabel}
      </p>
    </div>
  );
}
