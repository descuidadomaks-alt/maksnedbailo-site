"use client";

import Link from "next/link";
import type { V2Copy } from "../lib/copy";

/**
 * Section 7b — HOW WE START. The main conversion section.
 *
 * IMPORTANT (layout): this section is TRANSPARENT and must stay that way.
 * It is the only window through the shared ElevatorField dot shaft — the
 * sections above (V2Bridge) and below (V2FAQ) both paint solid var(--bg)
 * and occlude it. This mirrors exactly how the live homepage stacks
 * Belief (solid) -> BottleneckMap intro (transparent) -> sample table
 * (solid) inside one ElevatorField.
 *
 * The ElevatorField wrapper itself lives in V2HomeClient, NOT here: the
 * canvas is `position: sticky` and only gets scroll travel when its
 * wrapper is much taller than the viewport. Wrapping this single 100vh
 * section alone left `rect.height - windowH ≈ 0`, which pinned the camera
 * and produced the stutter-then-blank behaviour.
 *
 * Keep `minHeight: 100vh` here so the panel gets one full screen of dot
 * field behind it on both desktop and mobile.
 */
export default function V2Start({ d, ctaHref }: { d: V2Copy; ctaHref: string }) {
  return (
    <section
      className="section-divider relative"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      <div className="w-full px-6 py-16 md:py-20">
        {/* Centred throughout — every other section on the page is centred,
            and on mobile the left-aligned CTA and its microcopy read as a
            layout bug next to them. */}
        <div data-reveal className="map-content-panel w-full max-w-2xl mx-auto flex flex-col items-center text-center">
          <p className="font-label text-fg/50 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.start.label}
          </p>
          <h2
            className="font-playfair font-normal text-fg mb-5 mx-auto"
            style={{ fontSize: "clamp(23px, 3vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.022em", maxWidth: "22ch" }}
          >
            {d.start.headline}
          </h2>

          <div className="flex flex-col gap-3 mb-8 mx-auto" style={{ maxWidth: "58ch" }}>
            {d.start.body.map((p, i) => (
              <p key={i} className="font-sora font-light text-fg/82 leading-[1.8]" style={{ fontSize: "14.5px" }}>
                {p}
              </p>
            ))}
          </div>

          {/* Process — Understand -> Find -> Rank -> Build */}
          <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 mb-8 flex-wrap">
            {d.start.steps.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5 xs:gap-2.5">
                <span
                  className="font-label"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: "rgba(240,236,230,0.72)",
                    border: "1px solid rgba(212,255,43,0.22)",
                    borderRadius: "999px",
                    padding: "7px 14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step}
                </span>
                {i < d.start.steps.length - 1 && <span className="text-accent/40" aria-hidden>→</span>}
              </div>
            ))}
          </div>

          {/* How paying works */}
          <div
            className="w-full rounded-xl mb-8"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "20px 22px" }}
          >
            <p className="font-label text-accent/70 mb-4" style={{ fontSize: "9.5px", letterSpacing: "2px", textTransform: "uppercase" }}>
              {d.start.paymentLabel}
            </p>
            {/* The numbered steps stay left-aligned inside the centred panel:
                a centred ragged list of four sentences is unreadable. */}
            <ol className="flex flex-col gap-2.5 text-left">
              {d.start.paymentSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 font-label flex items-center justify-center rounded-full"
                    style={{
                      width: "17px",
                      height: "17px",
                      fontSize: "9px",
                      color: "rgba(6,6,8,0.9)",
                      background: "rgba(212,255,43,0.78)",
                      marginTop: "2px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-sora font-light text-fg/75 leading-[1.55]" style={{ fontSize: "12.5px" }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Link
              href={ctaHref}
              data-primary-cta
              className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
              style={{ fontSize: "15px", padding: "18px 32px", minHeight: "60px", letterSpacing: "-0.01em" }}
            >
              {d.start.cta}
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
            </Link>
            <p className="font-sora font-light text-fg/55" style={{ fontSize: "12px" }}>
              {d.start.ctaMicrocopy}
            </p>
            <p className="font-sora font-light italic text-fg/55 mx-auto" style={{ fontSize: "12.5px", maxWidth: "44ch" }}>
              {d.start.trustLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
