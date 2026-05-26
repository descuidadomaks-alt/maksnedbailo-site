const INDUSTRIES = [
  {
    industry: "Manufacturing & production",
    pain: "Equipment goes down, nobody knows until orders are late.",
    useCase: "Predictive maintenance + supplier comms automation",
    roi: "20% downtime reduction",
    source: "IEEE",
  },
  {
    industry: "Professional services",
    pain: "I'm the only person who knows where anything is.",
    useCase: "Internal knowledge AI + meeting intelligence",
    roi: "12 hrs/week founder time recovered",
    source: "McKinsey 2024",
  },
  {
    industry: "E-commerce & retail",
    pain: "Customers ghost us after one slow reply.",
    useCase: "First-response AI + personalised follow-up",
    roi: "12% sales uplift",
    source: "industry avg",
  },
  {
    industry: "Investor-operators",
    pain: "I want oversight of 5 ventures without doing 5 jobs.",
    useCase: "Cross-venture dashboards + AI ops summaries",
    roi: "60% less manual reporting time",
    source: "client baseline",
  },
];

export default function SectionIndustryExamples() {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Industry
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-5"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          What This Looks Like in Your Industry
        </h2>

        <p data-reveal className="font-sora font-light text-fg/35 mb-12" style={{ fontSize: "14px", lineHeight: 1.7 }}>
          See yourself on the page. These are the exact patterns we map in the first 30 minutes.
        </p>

        <div className="flex flex-col gap-4">
          {INDUSTRIES.map((row, i) => (
            <div
              key={i}
              data-reveal={`d${Math.min(i, 3)}`}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-6 md:p-8 hover:border-accent/20 hover:bg-white/[0.028] transition-all duration-300"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr_auto] gap-4 md:gap-6 items-start md:items-center">

                {/* Industry label */}
                <div>
                  <span
                    className="font-sora font-semibold text-accent/80"
                    style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" }}
                  >
                    {row.industry}
                  </span>
                </div>

                {/* Pain — operator voice */}
                <div>
                  <p className="font-sora font-light text-fg/30 mb-1" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    The pain
                  </p>
                  <p className="font-sora font-light text-fg/60 leading-[1.6]" style={{ fontSize: "14px", fontStyle: "italic" }}>
                    &ldquo;{row.pain}&rdquo;
                  </p>
                </div>

                {/* AI use case */}
                <div>
                  <p className="font-sora font-light text-fg/30 mb-1" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    AI use case
                  </p>
                  <p className="font-sora font-light text-fg/65 leading-[1.6]" style={{ fontSize: "14px" }}>
                    {row.useCase}
                  </p>
                </div>

                {/* ROI */}
                <div className="md:text-right">
                  <p className="font-sora font-light text-fg/30 mb-1" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    Typical ROI
                  </p>
                  <p
                    className="font-playfair text-accent"
                    style={{ fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.2, letterSpacing: "-0.015em" }}
                  >
                    {row.roi}
                  </p>
                  <p className="font-sora text-fg/20 mt-0.5" style={{ fontSize: "10px" }}>
                    {row.source}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Source footnote */}
        <p data-reveal className="font-sora font-light text-fg/20 mt-8 text-center leading-relaxed" style={{ fontSize: "11px" }}>
          Sources: IEEE Predictive Maintenance Report · McKinsey The State of AI 2024 · Industry conversion benchmarks · Client-reported baselines.
          ROI figures are directional averages, not guarantees.
        </p>

      </div>
    </section>
  );
}
