import type { ProspectData } from "../data";

export default function SectionMath({ data }: { data: ProspectData }) {
  const m = data.metrics;
  const plural = m.locationCount !== 1;

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6">

        {/* Lead metric — large number */}
        <div className="mb-12" data-reveal>
          <div className="flex items-end gap-4 mb-3 flex-wrap">
            <span
              className="font-playfair text-accent"
              style={{
                fontSize: "clamp(56px, 9vw, 100px)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              {m.monthlyLeak}
            </span>
            <div className="flex flex-col pb-1">
              <span
                className="font-sora font-normal text-fg/70"
                style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.2 }}
              >
                per month
              </span>
              <span
                className="font-sora font-light text-fg/45"
                style={{ fontSize: "clamp(12px, 1.1vw, 14px)", letterSpacing: "0.01em" }}
              >
                estimated lost in first bookings alone
              </span>
            </div>
          </div>

          {/* Year figure */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mt-2"
            style={{
              background: "rgba(212,255,43,0.07)",
              border: "1px solid rgba(212,255,43,0.15)",
            }}
          >
            <span
              className="font-playfair text-accent"
              style={{ fontSize: "clamp(18px, 2vw, 22px)", letterSpacing: "-0.025em" }}
            >
              {m.yearlyLeak}
            </span>
            <span className="font-sora font-light text-fg/55" style={{ fontSize: "13px" }}>
              per year when you factor in lifetime value
            </span>
          </div>
        </div>

        {/* Explanation paragraph — use override for non-clinic businesses */}
        <p
          className="font-sora font-light text-fg/75 leading-[1.8] mb-6"
          style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}
          data-reveal
        >
          {data.mathParagraphOverride ?? (
            <>
              Across your{" "}
              <strong className="text-fg font-medium">{m.locationCount}</strong>{" "}
              clinic{plural ? "s" : ""}, at an average treatment value of{" "}
              <strong className="text-fg font-medium">{m.avgTreatmentValue}</strong>{" "}
              and a conservative{" "}
              <strong className="text-fg font-medium">{m.afterHoursGap}</strong>{" "}
              after-hours response gap, {data.businessName} is handing first-mover
              advantage to whoever answers first.
            </>
          )}
        </p>

        {/* ROI callout */}
        <p
          className="font-sora font-normal text-fg/70 border-l-2 pl-5 mb-10 leading-relaxed"
          style={{
            fontSize: "clamp(13px, 1.2vw, 15px)",
            borderColor: "rgba(212,255,43,0.45)",
          }}
          data-reveal
        >
          Even capturing 40% of the gap pays for the service in 2–3 months.
        </p>

        {/* Benchmark footnote — intentionally subtle */}
        <p
          className="font-sora font-light text-fg/30 leading-relaxed"
          style={{ fontSize: "11px", letterSpacing: "0.01em" }}
        >
          {data.mathDisclaimerOverride ?? (
            <>
              Estimates based on {m.benchmarkUrl ? (
                <a
                  href={m.benchmarkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 decoration-white/15 hover:text-fg/45 transition-colors"
                >
                  {m.benchmarkSource}
                </a>
              ) : m.benchmarkSource}
              . Your actual numbers will be confirmed during the free audit.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
