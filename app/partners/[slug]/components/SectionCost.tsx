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
