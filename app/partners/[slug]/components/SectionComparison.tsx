const ROWS = [
  {
    label: "Cost",
    consultancy: "€8k–€30k",
    chatgpt: "Free",
    map: "Complimentary through Vlad",
  },
  {
    label: "You walk away with",
    consultancy: "A 40-slide presentation",
    chatgpt: "A demo and vague excitement",
    map: "A scored, ranked, ROI'd map of your operation",
  },
  {
    label: "Time to value",
    consultancy: "6–8 weeks",
    chatgpt: "Hours later",
    map: "90 minutes",
  },
  {
    label: "Next step is clear?",
    consultancy: "Maybe",
    chatgpt: "No",
    map: "Yes — Phase 1 quoted or you walk",
  },
];

export default function SectionComparison() {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Positioning
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-4"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          Three Roads to AI — Why This One
        </h2>

        <p data-reveal className="font-sora font-light text-fg/35 mb-12" style={{ fontSize: "14px", lineHeight: 1.7 }}>
          What you could be sold, what you&apos;d actually use, and what&apos;s on the table here.
        </p>

        {/* Horizontal scroll container — NO negative margins (root cause of page overflow was -mx-2 here) */}
        <div data-reveal className="w-full overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
          <div style={{ minWidth: "520px" }}>

            {/* Column headers — 3 equal content columns */}
            <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: "100px 1fr 1fr 1fr" }}>
              <div />
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-sora text-fg/30" style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1.4 }}>
                  Consultancy deck
                </p>
              </div>
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-sora text-fg/30" style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1.4 }}>
                  ChatGPT walkthrough
                </p>
              </div>
              {/* Highlighted column — visual only, same 1fr width */}
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: "rgba(212,255,43,0.07)", border: "1px solid rgba(212,255,43,0.22)" }}
              >
                <p className="font-sora font-semibold text-accent" style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1.4 }}>
                  Strategic AI Map
                </p>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-2">
              {ROWS.map((row, i) => (
                <div
                  key={i}
                  data-reveal={`d${Math.min(i, 3)}`}
                  className="grid gap-2 items-stretch"
                  style={{ gridTemplateColumns: "100px 1fr 1fr 1fr" }}
                >
                  {/* Row label */}
                  <div className="flex items-center">
                    <span className="font-sora text-fg/35" style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                      {row.label}
                    </span>
                  </div>

                  {/* Consultancy */}
                  <div
                    className="rounded-xl px-4 py-4 flex items-center"
                    style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <p className="font-sora font-light text-fg/40 leading-[1.55]" style={{ fontSize: "13px" }}>
                      {row.consultancy}
                    </p>
                  </div>

                  {/* ChatGPT */}
                  <div
                    className="rounded-xl px-4 py-4 flex items-center"
                    style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <p className="font-sora font-light text-fg/40 leading-[1.55]" style={{ fontSize: "13px" }}>
                      {row.chatgpt}
                    </p>
                  </div>

                  {/* AI Map — highlighted, same padding as others */}
                  <div
                    className="rounded-xl px-4 py-4 flex items-center"
                    style={{ background: "rgba(212,255,43,0.06)", border: "1px solid rgba(212,255,43,0.18)" }}
                  >
                    <p className="font-sora font-light text-fg/80 leading-[1.55]" style={{ fontSize: "13px" }}>
                      {row.map}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
