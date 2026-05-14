import type { ProspectData } from "../data";

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(212,255,43,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="rgba(212,255,43,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="rgba(212,255,43,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" stroke="rgba(212,255,43,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 12l10 5 10-5" stroke="rgba(212,255,43,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="rgba(212,255,43,0.55)" strokeWidth="1.5" />
      <path d="M12 6v6l4 2" stroke="rgba(212,255,43,0.55)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function SectionTrust({ data }: { data: ProspectData }) {
  const POINTS = [
    {
      icon: <LayersIcon />,
      title: "Built on TheConnecto.ai",
      body: "Enterprise-grade conversation infrastructure. 99.9% uptime SLA. All client data stays in the EU — full GDPR compliance.",
    },
    {
      icon: <ShieldIcon />,
      title: "Zero Clinical Risk",
      body: `${data.agentName} is trained to hand off on any medical question. Hard guardrails baked in — no diagnosis, no dosage advice, ever.`,
    },
    {
      icon: <ClockIcon />,
      title: "Live in 48 Hours",
      body: `One line of code on ${data.businessDomain}. No Phorest re-platforming. No staff retraining. No downtime.`,
    },
  ];

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Label */}
        <p
          className="font-sora text-fg/30 mb-14"
          style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
        >
          Infrastructure
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {POINTS.map((pt, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-8 flex flex-col gap-5 hover:border-white/[0.1] hover:bg-white/[0.028] transition-all duration-300"
            >
              <div>{pt.icon}</div>
              <h3
                className="font-playfair font-normal text-fg"
                style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.25 }}
              >
                {pt.title}
              </h3>
              <p
                className="font-sora font-light text-fg/45 leading-[1.65]"
                style={{ fontSize: "13px" }}
              >
                {pt.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
