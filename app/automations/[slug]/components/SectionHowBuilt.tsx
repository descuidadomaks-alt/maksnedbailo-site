import type { ProspectData } from "../data";

const STEPS = [
  { badge: "20 min", label: "Research — public sources only" },
  { badge: "90 min", label: "Agent config + knowledge base" },
  { badge: "Same day", label: "Live on this page" },
];

export default function SectionHowBuilt({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="font-playfair font-normal text-2xl md:text-3xl mb-10">
          How {data.agentName} was built
        </h2>
        <div className="flex flex-col gap-0 divide-y divide-white/[0.05]">
          {STEPS.map((step) => (
            <div key={step.badge} className="flex items-center gap-5 py-4">
              <span
                className="shrink-0 font-mono text-[11px] text-accent/60 bg-accent/[0.06] border border-accent/10 rounded px-2.5 py-1"
                style={{ minWidth: "72px", textAlign: "center" }}
              >
                {step.badge}
              </span>
              <span className="font-sora font-light text-[14px] text-fg/60">
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <p className="font-sora font-light text-[13px] text-fg/35 mt-8 leading-relaxed">
          One line of code to embed her on {data.businessDomain}.{" "}
          <span className="text-fg/20">No Phorest re-platforming.</span>
        </p>
      </div>
    </section>
  );
}
