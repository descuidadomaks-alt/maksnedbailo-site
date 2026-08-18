"use client";

import type { V2Copy } from "../lib/copy";

/**
 * Section 7a — THE COST OF NOT LOOKING. First section inside the shared
 * ElevatorField shaft.
 *
 * Structural role matters as much as the copy: this paints a SOLID
 * var(--bg) (exactly like app/new/sections/Belief.tsx on the live
 * homepage) so the dot field is occluded here and only becomes visible
 * when the transparent V2Start panel below scrolls in. It also gives the
 * ElevatorField wrapper the height it needs above the panel for the
 * sticky canvas to have real scroll travel — see V2HomeClient.
 */
export default function V2Bridge({ d }: { d: V2Copy }) {
  return (
    <section
      className="section-divider relative overflow-hidden py-20 md:py-28"
      style={{ background: "var(--bg)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 760px 460px at 96% 0%, rgba(34,158,217,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          <div>
            <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
              {d.bridge.label}
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-6"
              style={{ fontSize: "clamp(24px, 3.2vw, 42px)", lineHeight: 1.16, letterSpacing: "-0.022em", maxWidth: "22ch" }}
            >
              {d.bridge.headline}
            </h2>
            <div className="flex flex-col gap-4" style={{ maxWidth: "56ch" }}>
              {d.bridge.body.map((p, i) => (
                <p key={i} data-reveal={`d${i}`} className="font-sora font-light text-fg/60 leading-[1.85]" style={{ fontSize: "14.5px" }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div data-reveal="d2" className="flex lg:justify-end">
            <div
              className="rounded-2xl p-8 w-full"
              style={{ border: "1px solid rgba(212,255,43,0.22)", background: "rgba(212,255,43,0.04)", maxWidth: "360px" }}
            >
              <span
                className="font-playfair font-normal text-accent block"
                style={{ fontSize: "clamp(52px, 7vw, 78px)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {d.bridge.statValue}
              </span>
              <p className="font-sora font-light text-fg/70 leading-[1.6] mt-4" style={{ fontSize: "14px" }}>
                {d.bridge.statLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
