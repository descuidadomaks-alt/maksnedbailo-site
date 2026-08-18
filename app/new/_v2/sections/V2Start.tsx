"use client";

import Link from "next/link";
import type { V2Copy } from "../lib/copy";
import ElevatorField from "../../components/ElevatorField";

function StartPanel({ d, ctaHref }: { d: V2Copy; ctaHref: string }) {
  return (
    <section
      className="section-divider relative"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      <div className="w-full px-6 py-16 md:py-24">
        <div data-reveal className="map-content-panel w-full max-w-2xl mx-auto flex flex-col items-start text-left">
          <p className="font-label text-fg/50 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.start.label}
          </p>
          <h2
            className="font-playfair font-normal text-fg mb-6"
            style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "24ch" }}
          >
            {d.start.headline}
          </h2>

          <div className="flex flex-col gap-3 mb-10" style={{ maxWidth: "58ch" }}>
            {d.start.body.map((p, i) => (
              <p key={i} className="font-sora font-light text-fg/82 leading-[1.85]" style={{ fontSize: "15px" }}>
                {p}
              </p>
            ))}
          </div>

          {/* Process — Understand -> Find -> Rank -> Build */}
          <div className="flex items-center gap-1.5 xs:gap-3 mb-10 flex-wrap">
            {d.start.steps.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5 xs:gap-3">
                <span
                  className="font-label"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "rgba(240,236,230,0.72)",
                    border: "1px solid rgba(212,255,43,0.22)",
                    borderRadius: "999px",
                    padding: "8px 16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step}
                </span>
                {i < d.start.steps.length - 1 && (
                  <span className="text-accent/40" aria-hidden>→</span>
                )}
              </div>
            ))}
          </div>

          {/* How paying works */}
          <div
            className="w-full rounded-xl mb-10"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.014)", padding: "22px 24px" }}
          >
            <p className="font-label text-accent/70 mb-4" style={{ fontSize: "9.5px", letterSpacing: "2px", textTransform: "uppercase" }}>
              {d.start.paymentLabel}
            </p>
            <ol className="flex flex-col gap-3">
              {d.start.paymentSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 font-label flex items-center justify-center rounded-full"
                    style={{
                      width: "18px",
                      height: "18px",
                      fontSize: "9px",
                      color: "rgba(6,6,8,0.9)",
                      background: "rgba(212,255,43,0.75)",
                      marginTop: "1px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-sora font-light text-fg/75 leading-[1.6]" style={{ fontSize: "13px" }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col items-start gap-4">
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
            <p className="font-sora font-light italic text-fg/55" style={{ fontSize: "13px", maxWidth: "42ch" }}>
              {d.start.trustLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Section 7 — HOW WE START / FREE AI MAP. Wrapped in the shared
 * ElevatorField parallax canvas (same treatment as the live homepage's
 * Belief -> Mechanism sections) with the content sitting inside
 * .map-content-panel, the framed glass card from the live homepage.
 * Carries the "how paying works" terms — the likelihood-of-achievement
 * engine for the whole page.
 */
export default function V2Start({ d, ctaHref }: { d: V2Copy; ctaHref: string }) {
  return (
    <ElevatorField>
      <StartPanel d={d} ctaHref={ctaHref} />
    </ElevatorField>
  );
}
