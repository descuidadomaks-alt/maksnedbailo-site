// TODO:PAIN_VOICE — replace these lines with verbatim phrases from Vlad's clients
const COSTS = [
  "Every key person who leaves takes 6+ months of context with them.",
  "Every customer who waits >24h for a reply silently goes elsewhere.",
  "Every founder who answers WhatsApp at 11pm is one bad week from burning out.",
  "Every spreadsheet that lives in one person's head is a hostage situation.",
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

        <div className="flex flex-col gap-4">
          {COSTS.map((line, i) => (
            <div
              key={i}
              data-reveal={`d${i}`}
              className="flex items-start gap-5 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-7 py-5 hover:border-white/[0.1] hover:bg-white/[0.025] transition-all duration-300"
            >
              <span
                className="shrink-0 mt-[3px]"
                style={{ color: "rgba(212,255,43,0.35)", fontSize: "16px", lineHeight: 1 }}
              >
                —
              </span>
              <p className="font-sora font-light text-fg/60 leading-[1.75]" style={{ fontSize: "15px" }}>
                {line}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
