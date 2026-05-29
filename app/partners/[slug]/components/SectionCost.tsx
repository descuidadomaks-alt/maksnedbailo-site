// TODO:PAIN_VOICE — replace these lines with verbatim phrases from Vlad's clients

const COSTS = [
  {
    text: "Every key person who leaves takes 6+ months of context with them.",
    icon: (
      // Clock — time lost
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    text: "Every customer who waits >24h for a reply silently goes elsewhere.",
    icon: (
      // Departing person — customer leaving
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
  },
  {
    text: "Every founder who answers WhatsApp at 11pm is one bad week from burning out.",
    icon: (
      // Flame — burnout
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c.69 0 1.31-.28 1.77-.73C13.66 15.4 14 14.26 14 13c0-2-1-4-3-6 0 0-.83 1.5-1.5 3C8.5 12 8 13 8.5 14.5Z" />
        <path d="M12 22c3.31 0 6-2.69 6-6 0-4-3-8-6-10-3 2-6 6-6 10 0 3.31 2.69 6 6 6Z" />
      </svg>
    ),
  },
  {
    text: "Every spreadsheet that lives in one person's head is a hostage situation.",
    icon: (
      // Lock — information trapped
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

function ResponseTimeChart() {
  // Bar widths proportional: 19h avg vs <1h expected out of max ~21h
  const MAX_H = 21;
  const PCT_AVG = (19 / MAX_H) * 100;     // ~90.5%
  const PCT_EXP = (1 / MAX_H) * 100;      // ~4.8%

  return (
    <div
      data-reveal
      className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-7 mb-10"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
    >
      {/* Bars */}
      <div className="flex flex-col gap-5 mb-8">
        {/* Bar A — average reply */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-sora text-fg/40" style={{ fontSize: "11px", letterSpacing: "1px" }}>
              Average reply time (B2B)
            </span>
            <span className="font-sora font-semibold text-fg/50" style={{ fontSize: "12px" }}>19 hrs</span>
          </div>
          <div className="relative h-6 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${PCT_AVG}%`,
                background: "rgba(240,236,230,0.12)",
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>
        </div>

        {/* Bar B — buyer expectation */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-sora text-fg/40" style={{ fontSize: "11px", letterSpacing: "1px" }}>
              What buyers expect
            </span>
            <span className="font-sora font-semibold text-accent/80" style={{ fontSize: "12px" }}>&lt;1 hr</span>
          </div>
          <div className="relative h-6 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${PCT_EXP}%`,
                background: "rgba(212,255,43,0.65)",
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            />
          </div>
        </div>
      </div>

      {/* Stat callout */}
      <div className="flex items-baseline gap-4 flex-wrap">
        <span
          className="font-playfair text-accent"
          style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1, letterSpacing: "-0.04em" }}
        >
          73%
        </span>
        <p className="font-sora font-light text-fg/50 max-w-[280px] leading-[1.6]" style={{ fontSize: "14px" }}>
          of mid-market deals lost when the first reply takes more than 24 hours.
        </p>
      </div>

      <p className="font-sora text-fg/20 mt-4" style={{ fontSize: "11px", fontStyle: "italic" }}>
        Industry-typical benchmarks. Your numbers will be specific to your business.
      </p>
    </div>
  );
}

export default function SectionCost() {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          The Real Cost
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-12"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          What This Costs You Every Month You Don&apos;t Move
        </h2>

        {/* Response-time visualization */}
        <ResponseTimeChart />

        {/* Icon cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COSTS.map((item, i) => (
            <div
              key={i}
              data-reveal={`d${i}`}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-7 py-6 hover:border-white/[0.1] hover:bg-white/[0.025] transition-all duration-300"
            >
              <span className="text-accent/40">{item.icon}</span>
              <p className="font-sora font-light text-fg/60 leading-[1.75]" style={{ fontSize: "15px" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
