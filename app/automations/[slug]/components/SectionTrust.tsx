import type { ProspectData } from "../data";

function SafetyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(212,255,43,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="rgba(212,255,43,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="rgba(212,255,43,0.6)" strokeWidth="1.5" />
      <path d="M12 6v6l4 2" stroke="rgba(212,255,43,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2C12 2 7 6 7 12v3l-2 2v2h10v-2l-2-2v-3c0-6-3-10-3-10z" stroke="rgba(212,255,43,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 19c0 1.66 1.34 3 3 3s3-1.34 3-3" stroke="rgba(212,255,43,0.6)" strokeWidth="1.5" />
      <path d="M5 12H4M20 12h-1M12 4V3" stroke="rgba(212,255,43,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function SectionTrust({ data }: { data: ProspectData }) {
  const POINTS = [
    {
      icon: <SafetyIcon />,
      title: "Clinical Safety First",
      body: `${data.agentName} never gives medical advice and always hands off to your team on clinical topics. Hard guardrails. No exceptions.`,
    },
    {
      icon: <ClockIcon />,
      title: "24/7 Availability",
      body: "Instant replies on WhatsApp and your website — after hours, weekends, bank holidays. No missed enquiry, ever.",
    },
    {
      icon: <RocketIcon />,
      title: "Lightning Fast Setup",
      body: `Fully customised and live in 48 hours. No complex integrations. One line of code on ${data.businessDomain}.`,
    },
  ];

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p
          data-reveal
          className="font-sora text-fg/30 mb-5"
          style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
        >
          Built for Clinics
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
          Why Clinics Choose Amira
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {POINTS.map((pt, i) => (
            <div
              key={i}
              data-reveal={`d${i}`}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-8 flex flex-col gap-5 hover:border-accent/18 hover:bg-white/[0.032] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              <div>{pt.icon}</div>
              <h3
                className="font-playfair font-normal text-fg"
                style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.25 }}
              >
                {pt.title}
              </h3>
              <p
                className="font-sora font-light text-fg/55 leading-[1.7]"
                style={{ fontSize: "14px" }}
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
