"use client";

import type { V2Copy } from "../lib/copy";

const DAYS = ["M", "T", "W", "T", "F"];
const ROWS = 8;
const ADMIN_BLOCKS = 19;

/**
 * Operate-tier visual, compact — one working week as a 5x8 block grid.
 * Deliberately small (blocks are a fixed 7px, not aspect-ratio driven) so
 * the whole "What we fix" section still fits a single screen; at this size
 * the shaded mass reads instantly without needing to count anything.
 */
export default function WeekGrid({ d }: { d: V2Copy["fix"]["weekGrid"] }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-1 items-start">
        <div className="flex gap-1">
          {DAYS.map((day, i) => (
            <span
              key={i}
              className="font-label text-fg/35 text-center"
              style={{ fontSize: "8px", letterSpacing: "0.5px", width: "22px" }}
            >
              {day}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          {DAYS.map((_, col) => (
            <div key={col} className="flex flex-col gap-1" style={{ width: "22px" }}>
              {Array.from({ length: ROWS }, (_, row) => {
                const index = col * ROWS + row;
                return (
                  <span
                    key={row}
                    style={{
                      height: "7px",
                      borderRadius: "2px",
                      background: index < ADMIN_BLOCKS ? "rgba(240,236,230,0.15)" : "rgba(212,255,43,0.6)",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="shrink-0 rounded-sm" style={{ width: "8px", height: "8px", background: "rgba(240,236,230,0.15)" }} />
          <span className="font-sora font-light text-fg/55" style={{ fontSize: "11.5px" }}>{d.adminLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 rounded-sm" style={{ width: "8px", height: "8px", background: "rgba(212,255,43,0.6)" }} />
          <span className="font-sora font-light text-accent" style={{ fontSize: "11.5px" }}>{d.earnLabel}</span>
        </div>
      </div>
    </div>
  );
}
