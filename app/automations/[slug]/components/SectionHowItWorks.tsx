import type { ProspectData } from "../data";

const STEPS = [
  {
    num: "01",
    title: "Deep Research",
    body: "We analyse your treatments, tone, FAQs, competitor response times, and pricing — using only public sources. Zero access required.",
  },
  {
    num: "02",
    title: "Custom Training",
    body: "The agent learns your exact voice, clinic protocols, and clinical safety guardrails — so it never oversteps or gives medical advice.",
  },
  {
    num: "03",
    title: "Deploy & Optimise",
    body: "Live on WhatsApp + your website in 48 hours. One line of code. No staff retraining. Refined weekly from real conversation transcripts.",
  },
] as const;

export default function SectionHowItWorks({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Label */}
        <p
          className="font-sora text-fg/30 mb-5"
          style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
        >
          Process
        </p>

        {/* H2 */}
        <h2
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
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-8 flex flex-col gap-5 hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300 group"
            >
              {/* Large step number */}
              <span
                className="font-playfair text-accent/25 group-hover:text-accent/35 transition-colors duration-300"
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
                className="font-sora font-light text-fg/45 leading-[1.7]"
                style={{ fontSize: "13px" }}
              >
                {step.body.replace("{businessDomain}", data.businessDomain)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
