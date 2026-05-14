import type { ProspectData } from "../data";

export default function SectionMath({ data }: { data: ProspectData }) {
  const m = data.metrics;
  const plural = m.locationCount !== 1;

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6">

        {/* Lead metric — large number */}
        <div className="mb-10">
          <div className="flex items-baseline gap-3 mb-1">
            <span
              className="font-playfair text-accent"
              style={{
                fontSize: "clamp(52px, 8vw, 96px)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
              }}
            >
              {m.monthlyLeak}
            </span>
            <span className="font-sora font-light text-fg/35" style={{ fontSize: "14px" }}>
              /month
            </span>
          </div>
          <p className="font-sora font-light text-fg/25" style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
            estimated lead leak
          </p>
        </div>

        {/* Explanation paragraph */}
        <p
          className="font-sora font-light text-fg/60 leading-[1.8] mb-6"
          style={{ fontSize: "clamp(14px, 1.4vw, 16px)" }}
        >
          Across your{" "}
          <strong className="text-fg/85 font-medium">{m.locationCount}</strong>{" "}
          clinic{plural ? "s" : ""}, at an average treatment value of{" "}
          <strong className="text-fg/85 font-medium">{m.avgTreatmentValue}</strong>{" "}
          and a conservative{" "}
          <strong className="text-fg/85 font-medium">{m.afterHoursGap}</strong>{" "}
          after-hours response gap,{" "}
          <strong className="text-fg/85 font-medium">{data.businessName}</strong>{" "}
          is losing an estimated{" "}
          <strong className="font-medium" style={{ color: "#D4FF2B" }}>{m.monthlyLeak}/month</strong>{" "}
          in first bookings alone. Factor in the lifetime value of a laser or
          injectable client and the figure crosses{" "}
          <strong className="font-medium" style={{ color: "#D4FF2B" }}>{m.yearlyLeak}/year</strong>.
        </p>

        {/* ROI callout */}
        <p
          className="font-sora text-fg/50 border-l-2 pl-5 mb-7 leading-relaxed"
          style={{
            fontSize: "13px",
            borderColor: "rgba(212,255,43,0.35)",
          }}
        >
          Even capturing 40% of the gap pays for the service in 2–3 months.
        </p>

        {/* Benchmark footnote */}
        <p className="font-sora text-fg/22 leading-relaxed" style={{ fontSize: "11px" }}>
          * Estimates based on{" "}
          {m.benchmarkUrl ? (
            <a
              href={m.benchmarkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-white/15 hover:text-fg/40 transition-colors"
            >
              {m.benchmarkSource}
            </a>
          ) : (
            m.benchmarkSource
          )}
          . Exact figures confirmed during the complimentary audit.
        </p>
      </div>
    </section>
  );
}
