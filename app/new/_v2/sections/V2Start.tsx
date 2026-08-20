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

          {/* Process — a numbered ladder with a real explanation per step.
              The previous version was four bare pills in a row, which said
              nothing and looked like placeholder chrome. */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-9 text-left">
            {d.start.steps.map((step, i) => (
              <div key={step} className="flex items-start gap-3.5">
                <span
                  className="shrink-0 font-playfair"
                  style={{
                    fontSize: "26px",
                    lineHeight: 1,
                    color: "rgba(212,255,43,0.32)",
                    minWidth: "30px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p
                    className="font-label mb-1"
                    style={{ fontSize: "10.5px", letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(240,236,230,0.9)" }}
                  >
                    {step}
                  </p>
                  <p className="font-sora font-light text-fg/55 leading-[1.5]" style={{ fontSize: "12.5px" }}>
                    {d.start.stepDetails[i]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* How paying works */}
          {/* The risk-reversal block. Headed as a promise ("you only pay
              once it works"), not as a mechanic, and the steps are a
              connected timeline with a visible spine rather than four dim
              numerals nobody reads. */}
          <div
            className="w-full rounded-xl mb-8 text-left"
            style={{ border: "1px solid rgba(212,255,43,0.22)", background: "rgba(212,255,43,0.035)", padding: "22px 24px" }}
          >
            <p
              className="font-playfair text-accent mb-5"
              style={{ fontSize: "clamp(16px, 1.7vw, 20px)", lineHeight: 1.2, letterSpacing: "-0.015em" }}
            >
              {d.start.paymentLabel}
            </p>

            <ol className="flex flex-col">
              {d.start.paymentSteps.map((step, i) => {
                const last = i === d.start.paymentSteps.length - 1;
                return (
                  <li key={i} className="flex items-start gap-3.5 relative" style={{ paddingBottom: last ? 0 : "16px" }}>
                    {/* connecting spine */}
                    {!last && (
                      <span
                        aria-hidden
                        className="absolute"
                        style={{ left: "9px", top: "20px", bottom: "0", width: "1px", background: "rgba(212,255,43,0.22)" }}
                      />
                    )}
                    <span
                      className="shrink-0 flex items-center justify-center rounded-full font-label relative"
                      style={{
                        width: "19px",
                        height: "19px",
                        fontSize: "9.5px",
                        marginTop: "1px",
                        color: last ? "rgba(6,6,8,0.92)" : "rgba(212,255,43,0.95)",
                        background: last ? "var(--accent)" : "rgba(212,255,43,0.1)",
                        border: last ? "none" : "1px solid rgba(212,255,43,0.45)",
                        zIndex: 1,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="font-sora leading-[1.55]"
                      style={{
                        fontSize: "13px",
                        color: last ? "rgba(240,236,230,0.92)" : "rgba(240,236,230,0.7)",
                        fontWeight: last ? 500 : 300,
                      }}
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
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
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h13M12 5l7 7-7 7" /></svg></span>
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
