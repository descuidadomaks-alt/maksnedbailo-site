const FOR_YOU = [
  // TODO: pending separate math sign-off
  "You run a business doing €50k–€200k+ per month",
  "You've lost team members and the replacements aren't coming",
  "You suspect AI could help but don't want hype — you want numbers",
  "You can decide and act inside 30 days, not 6 months",
];

const NOT_FOR_YOU = [
  "You're looking for free consulting with no intention of investing in your business",
  "You want me to teach you how to use ChatGPT (different conversation)",
  // TODO: pending separate math sign-off
  "Your business is under €30k/month — the math doesn't work yet",
  "You need to convince 5 stakeholders before any decision (we'll talk again when you can decide)",
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,230,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function SectionFit() {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Fit
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-14"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          Who This Is For — And Who It Isn&apos;t
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* For you */}
          <div
            data-reveal="d0"
            className="rounded-2xl border p-8 flex flex-col gap-5"
            style={{ borderColor: "rgba(212,255,43,0.2)", background: "rgba(212,255,43,0.04)" }}
          >
            <p className="font-sora text-accent" style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
              This is for you if
            </p>
            <ul className="flex flex-col gap-4">
              {FOR_YOU.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-[2px]"><CheckIcon /></span>
                  <span className="font-sora font-light text-fg/65 leading-[1.65]" style={{ fontSize: "14px" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not for you */}
          <div
            data-reveal="d1"
            className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-8 flex flex-col gap-5"
          >
            <p className="font-sora text-fg/25" style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
              This is not for you if
            </p>
            <ul className="flex flex-col gap-4">
              {NOT_FOR_YOU.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-[2px]"><XIcon /></span>
                  <span className="font-sora font-light text-fg/40 leading-[1.65]" style={{ fontSize: "14px" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
