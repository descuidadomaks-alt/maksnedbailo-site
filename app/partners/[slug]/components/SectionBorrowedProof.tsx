import Link from "next/link";

// TODO:CASES — replace with real partner-funnel case studies after client 3
const CASES = [
  {
    name: "Amira for HC MedSpa",
    description: "Live AI agent for a UK MedSpa. Responds to leads in 9 seconds across WhatsApp and website.",
    href: "/automations/hcmedspa",
    tag: "UK MedSpa · Lead response",
  },
  {
    name: "Cosmetic Suite",
    description: "WhatsApp + Instagram lead capture for an aesthetic clinic. Qualification and booking, automated.",
    href: "/automations/cosmeticsuite",
    tag: "Aesthetic clinic · Lead capture",
  },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function SectionBorrowedProof() {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Proof of Capability
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-5"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          A few systems I&apos;ve built recently
        </h2>

        <p data-reveal className="font-sora font-light text-fg/35 mb-12" style={{ fontSize: "14px" }}>
          Early prototypes. Real software, real clients, real conversations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CASES.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal={`d${i}`}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.018] p-7 flex flex-col gap-4 hover:border-white/[0.12] hover:bg-white/[0.03] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="font-playfair font-normal text-fg"
                  style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.25 }}
                >
                  {c.name}
                </h3>
                <span className="shrink-0 text-fg/25 group-hover:text-fg/50 transition-colors duration-200 mt-0.5">
                  <ArrowIcon />
                </span>
              </div>
              <p className="font-sora font-light text-fg/50 leading-[1.7]" style={{ fontSize: "14px" }}>
                {c.description}
              </p>
              <span
                className="font-sora text-fg/25"
                style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}
              >
                {c.tag}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
