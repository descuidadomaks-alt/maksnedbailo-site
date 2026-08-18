"use client";

import type { V2Copy } from "../lib/copy";
import { PROOF_LOCKUPS } from "../components/BrandLockups";

/**
 * Section 4b — WORLD PROOF. Sits directly under the cases (V2Cases), no
 * divider between them, so the page never reads as three small projects
 * standing alone.
 *
 * Every case here has the same shape on purpose: they automated a big
 * chunk of the repetitive work AND customer satisfaction went UP. That is
 * the exact objection this page has to answer ("will this make my service
 * worse"), so cases that ended in a public walk-back are deliberately not
 * used, however famous they are.
 *
 * No brand logos. The previous version paired a coloured wordmark chip
 * with the company name and rendered both, which read as clip art and
 * duplicated the text. The numbers carry the section instead.
 */
export default function V2WorldProof({ d }: { d: V2Copy }) {
  return (
    <div className="relative" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10">
          <p
            data-reveal
            className="font-label text-fg/45 mb-4"
            style={{ fontSize: "9.5px", letterSpacing: "2.5px", textTransform: "uppercase" }}
          >
            {d.worldProof.label}
          </p>
          <h3
            data-reveal
            className="font-playfair font-normal text-fg"
            style={{ fontSize: "clamp(19px, 2.2vw, 28px)", lineHeight: 1.3, letterSpacing: "-0.02em", maxWidth: "30ch" }}
          >
            {d.worldProof.headline}
          </h3>
        </div>

        <div className="flex flex-col">
          {d.worldProof.items.map((item, i) => (
            <div
              key={item.name}
              data-reveal={`d${i}`}
              className="py-7 md:py-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-10">
                <div className="shrink-0 md:w-44" style={{ color: "rgba(240,236,230,0.8)" }}>
                  {(() => {
                    const Lockup = PROOF_LOCKUPS[item.name];
                    return Lockup ? (
                      <Lockup style={{ height: "20px", width: "auto" }} />
                    ) : (
                      <h4 className="font-playfair font-normal text-fg" style={{ fontSize: "22px" }}>{item.name}</h4>
                    );
                  })()}
                </div>

                <div className="flex-1">
                  {/* One lead stat, then supporting ones at half the weight.
                      Three equal-sized accent numbers gave the row no entry
                      point and nothing to read first. */}
                  <div className="flex flex-wrap items-end gap-x-8 gap-y-4 mb-5">
                    {item.stats.map((s, si) => (
                      <div key={s.label}>
                        <span
                          className="font-playfair font-normal block"
                          style={{
                            fontSize: si === 0 ? "clamp(28px, 3.2vw, 40px)" : "clamp(17px, 1.8vw, 22px)",
                            lineHeight: 1.05,
                            letterSpacing: "-0.025em",
                            color: si === 0 ? "var(--accent)" : "rgba(240,236,230,0.82)",
                          }}
                        >
                          {s.value}
                        </span>
                        <span
                          className="font-sora font-light block mt-1.5"
                          style={{
                            fontSize: "11px",
                            lineHeight: 1.35,
                            maxWidth: "20ch",
                            color: si === 0 ? "rgba(212,255,43,0.6)" : "rgba(240,236,230,0.4)",
                          }}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="font-sora font-light text-fg/60 leading-[1.7]" style={{ fontSize: "13.5px", maxWidth: "64ch" }}>
                    {item.line}
                  </p>
                  <p className="font-label mt-2.5" style={{ fontSize: "10px", letterSpacing: "1px", color: "rgba(240,236,230,0.3)" }}>
                    {item.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
