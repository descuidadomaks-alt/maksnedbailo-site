"use client";

import type { V2Copy } from "../lib/copy";

const DAYS = ["M", "T", "W", "T", "F"];
const TOTAL_BLOCKS = 40;
const ADMIN_BLOCKS = 19;

/**
 * Operate-tier visual — a 5x8 grid of hour blocks standing in for one
 * working week: repetitive admin vs the work that actually earns.
 * Illustrative split — see the caption rendered by the parent row. The
 * 28%/19% line beneath it is the one sourced fact in this component and
 * carries its own attribution, kept visually distinct from the grid.
 */
export default function WeekGrid({ d }: { d: V2Copy["fix"]["weekGrid"] }) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <div className="grid grid-cols-5 gap-1.5 mb-1.5">
          {DAYS.map((day, i) => (
            <span key={i} className="font-label text-fg/40 text-center" style={{ fontSize: "9px", letterSpacing: "1px" }}>
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: TOTAL_BLOCKS }, (_, i) => (
            <span
              key={i}
              className="rounded-md"
              style={{
                aspectRatio: "1 / 1",
                background: i < ADMIN_BLOCKS ? "rgba(240,236,230,0.16)" : "rgba(212,255,43,0.55)",
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1.5 mt-3">
          <div className="flex items-center gap-2">
            <span className="shrink-0 rounded-sm" style={{ width: "9px", height: "9px", background: "rgba(240,236,230,0.16)" }} />
            <span className="font-sora font-light text-fg/55" style={{ fontSize: "12px" }}>{d.adminLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 rounded-sm" style={{ width: "9px", height: "9px", background: "rgba(212,255,43,0.55)" }} />
            <span className="font-sora font-light text-fg/75" style={{ fontSize: "12px" }}>{d.earnLabel}</span>
          </div>
        </div>
      </div>

      <div className="pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="font-sora font-light text-fg/62 leading-[1.6] mt-3" style={{ fontSize: "13px" }}>
          {d.sourceLine}{" "}
          <span className="font-label" style={{ fontSize: "10px", color: "rgba(240,236,230,0.35)" }}>
            {d.sourceAttr}
          </span>
        </p>
        <p className="font-sora font-light text-fg/62 leading-[1.6] mt-2" style={{ fontSize: "13px" }}>
          {d.note}
        </p>
      </div>
    </div>
  );
}
