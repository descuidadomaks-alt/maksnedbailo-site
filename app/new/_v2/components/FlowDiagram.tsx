"use client";

import type { V2Copy } from "../lib/copy";

/**
 * Hero flow diagram — "what do you do" answered in three seconds, for
 * someone who knows nothing about us. Real HTML text (selectable,
 * crawlable, reflows on mobile) with a small SVG fork connector between
 * the inputs strip and the two comparison lanes.
 *
 * Structure: one input strip (calls, WhatsApp, forms...) feeds two lanes —
 * "Today" (things queue, some die, lost revenue) and "With the system"
 * (answered fast, followed up, won work). Same input, two outcomes.
 */
export default function FlowDiagram({ d }: { d: V2Copy["hero"]["diagram"] }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Inputs strip */}
      <div className="flex flex-col items-center">
        <p
          className="font-label text-fg/45 mb-3"
          style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}
        >
          {d.inputsLabel}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
          {d.inputs.map((item) => (
            <span
              key={item}
              className="font-sora font-light text-fg/62 rounded-full"
              style={{
                fontSize: "12px",
                padding: "6px 14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Fork connector */}
      <div className="flex justify-center py-3" aria-hidden>
        <svg width="120" height="28" viewBox="0 0 120 28" fill="none">
          <path
            d="M60 0 V10 M60 10 L18 10 L18 26 M60 10 L102 10 L102 26"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.4"
          />
          <path d="M18 26 l-4 -7 h8 z" fill="rgba(248,113,113,0.35)" />
          <path d="M102 26 l-4 -7 h8 z" fill="rgba(212,255,43,0.4)" />
        </svg>
      </div>

      {/* Two lanes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Today — the loss lane */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
        >
          <div className="px-4 pt-4 pb-3">
            <p
              className="font-label text-fg/45 mb-3"
              style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              {d.todayLabel}
            </p>
            <ul className="flex flex-col gap-1.5">
              {d.todayItems.map((item) => (
                <li key={item} className="font-sora font-light text-fg/50 leading-[1.5]" style={{ fontSize: "12.5px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="px-4 py-2.5"
            style={{ background: "rgba(248,113,113,0.07)", borderTop: "1px solid rgba(248,113,113,0.14)" }}
          >
            <p
              className="font-label"
              style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(248,113,113,0.75)" }}
            >
              {d.todayResult}
            </p>
          </div>
        </div>

        {/* With the system — the win lane */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(212,255,43,0.16)", background: "rgba(212,255,43,0.025)" }}
        >
          <div className="px-4 pt-4 pb-3">
            <p
              className="font-label text-accent/60 mb-3"
              style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              {d.systemLabel}
            </p>
            <ul className="flex flex-col gap-1.5">
              {d.systemItems.map((item) => (
                <li key={item} className="font-sora font-light text-fg/75 leading-[1.5]" style={{ fontSize: "12.5px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="px-4 py-2.5"
            style={{ background: "rgba(212,255,43,0.09)", borderTop: "1px solid rgba(212,255,43,0.18)" }}
          >
            <p
              className="font-label text-accent"
              style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase" }}
            >
              {d.systemResult}
            </p>
          </div>
        </div>
      </div>

      {/* Sourced line */}
      <p className="text-center mt-5 font-sora font-light text-fg/45 leading-[1.6]" style={{ fontSize: "12px" }}>
        {d.sourceLine}{" "}
        <span className="font-label" style={{ fontSize: "10px", color: "rgba(240,236,230,0.35)" }}>
          {d.sourceAttr}
        </span>
      </p>
    </div>
  );
}
