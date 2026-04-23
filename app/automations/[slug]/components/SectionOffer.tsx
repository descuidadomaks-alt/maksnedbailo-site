import type { ProspectData } from "../data";

function Card({
  label,
  price,
  body,
  highlight,
}: {
  label: string;
  price?: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-7 flex flex-col gap-3 border ${
        highlight
          ? "border-accent/20 bg-accent/[0.04]"
          : "border-white/[0.05] bg-white/[0.02]"
      }`}
    >
      <p className={`font-sora text-[10px] uppercase tracking-[2.5px] ${highlight ? "text-accent/60" : "text-fg/30"}`}>
        {label}
      </p>
      {price && (
        <p className="font-playfair text-[32px] font-normal leading-none text-fg">
          {price}
        </p>
      )}
      <p className="font-sora font-light text-[13px] text-fg/45 leading-relaxed">
        {body}
      </p>
    </div>
  );
}

export default function SectionOffer({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-playfair font-normal text-2xl md:text-3xl mb-10 text-center">
          What you get
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            label="Free Audit"
            body={data.offerAuditBody}
          />
          <Card
            label="Setup"
            price={data.offerSetupPrice}
            body={`${data.agentName} fully trained. Deployed on WhatsApp + website. Live in 48h.`}
            highlight
          />
          <Card
            label="Monthly"
            price={data.offerMonthlyPrice}
            body="Ongoing optimisation. Prompt tuning. Monthly transcript review."
          />
          <Card
            label="30-Day Guarantee"
            body={data.offerGuarantee}
          />
        </div>
      </div>
    </section>
  );
}
