"use client";

import type { V2Copy } from "../lib/copy";

const COUNTS = [100, 68, 41, 18, 11];

/**
 * Serve-tier visual — five stacked, shrinking bars forming a funnel.
 * Left-aligned so the loss shows on the right, each drop annotated in
 * red. Illustrative numbers — see the caption rendered by the parent row.
 */
export default function LeakFunnel({ d }: { d: V2Copy["fix"]["leakFunnel"] }) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {d.steps.map((step, i) => (
          <div key={step.label}>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="font-sora font-light text-fg/70" style={{ fontSize: "12.5px" }}>
                {step.label}
              </span>
              <span className="font-label text-fg/55" style={{ fontSize: "12px" }}>{COUNTS[i]}</span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: "9px", background: "rgba(255,255,255,0.05)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${COUNTS[i]}%`,
                  background: i === d.steps.length - 1 ? "var(--accent)" : "rgba(255,255,255,0.18)",
                }}
              />
            </div>
            {step.dropNote && (
              <p className="mt-1.5 text-right font-sora font-light" style={{ fontSize: "11px", color: "rgba(248,113,113,0.65)" }}>
                {step.dropNote}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="font-sora font-light text-fg/62 leading-[1.6]" style={{ fontSize: "13px" }}>
        {d.note}
      </p>
    </div>
  );
}
