const PILLARS = [
  {
    num: "1",
    title: "Customer-facing communication",
    body: "Lead capture, sales follow-up, booking, support, qualification. Where you lose revenue because nobody answers in time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Internal communication & knowledge",
    body: "Meetings, documents, training, the things that live in your head and nowhere else. What happens when you're not there.",
    icon: (
      // Brain icon
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Repeatable execution",
    body: "Anything done by a human more than 5 times a month. The work that bores your best people into quitting.",
    icon: (
      // Gear icon
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
];

export default function SectionPillars() {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Scope
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-14"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          What We&apos;ll Look At in 90 Minutes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              data-reveal={`d${i}`}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-8 flex flex-col gap-5 hover:border-accent/20 hover:bg-white/[0.032] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-playfair font-bold text-accent"
                  style={{ fontSize: "clamp(40px, 5vw, 60px)", lineHeight: 1, letterSpacing: "-0.04em" }}
                >
                  {p.num}
                </span>
                <span className="text-accent/40">{p.icon}</span>
              </div>

              <h3
                className="font-playfair font-normal text-fg"
                style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.25 }}
              >
                {p.title}
              </h3>

              <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
