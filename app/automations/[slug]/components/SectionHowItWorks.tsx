import type { ProspectData } from "../data";

const STEPS = [
  {
    num: "01",
    title: "Deep Research",
    body: "We analyse your public website, treatments, pricing, tone of voice, and competitor responses.",
  },
  {
    num: "02",
    title: "Custom Training",
    body: "Amira learns your exact tone and style while following strict clinical safety guardrails — she hands off all medical questions to your team.",
  },
  {
    num: "03",
    title: "Deploy & Optimise",
    body: "Fully live on WhatsApp + website within 48 hours, with ongoing weekly optimisation based on real conversation data.",
  },
] as const;

export default function SectionHowItWorks({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p
          data-reveal
          className="font-sora text-fg/30 mb-5"
          style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
        >
          Process
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-14"
          style={{
            fontSize: "clamp(24px, 3.4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em",
          }}
        >
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-reveal={`d${i}`}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-8 flex flex-col gap-5 hover:border-accent/20 hover:bg-white/[0.032] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300 group"
            >
              <span
                className="font-playfair text-accent/22 group-hover:text-accent/38 transition-colors duration-300"
                style={{
                  fontSize: "clamp(44px, 5vw, 60px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {step.num}
              </span>

              <h3
                className="font-playfair font-normal text-fg"
                style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.2 }}
              >
                {step.title}
              </h3>

              <p
                className="font-sora font-light text-fg/55 leading-[1.75]"
                style={{ fontSize: "14px" }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
