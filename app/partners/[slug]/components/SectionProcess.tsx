import type { PartnerData } from "@/content/partners/index";

const STEPS = [
  {
    num: "01",
    title: "Book",
    body: "Pick a 90-minute slot. Answer 4 pre-call questions so I show up prepared, not generic.",
  },
  {
    num: "02",
    title: "Map",
    body: "We go through your business across the 3 pillars. I score it live, in front of you, on a shared screen. You see how I think.",
  },
  {
    num: "03",
    title: "Decide",
    body: "You walk away with the Strategic AI Map. If something's worth building, I'll quote Phase 1 (typically €4,500 + Ukrainian dev capacity, 2–3 weeks). If not, you have the map regardless.",
  },
];

export default function SectionProcess({ data }: { data: PartnerData }) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Process
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-14"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-reveal={`d${i}`}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-8 flex flex-col gap-5 hover:border-accent/20 hover:bg-white/[0.032] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              <span
                className="font-playfair font-bold text-accent"
                style={{ fontSize: "clamp(56px, 6.5vw, 80px)", lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                {step.num}
              </span>
              <h3
                className="font-playfair font-normal text-fg"
                style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.2 }}
              >
                {step.title}
              </h3>
              <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
                {step.body.replace("€4,500", data.pricing.phase1Anchor)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
