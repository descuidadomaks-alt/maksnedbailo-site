import type { ProspectData } from "../data";

const DEFAULT_STACK = [
  { label: "Lead Leak Audit",               value: "€547"   },
  { label: "Done-For-You Setup (48hr)",      value: "€1,747" },
  { label: "Monthly Optimisation × 12",      value: "€5,484" },
  { label: "Competitor Response Comparison", value: "€227"   },
  { label: "Medical Safety Guardrails",      value: "€347"   },
  { label: "Staff Handover Script",          value: "€107"   },
];

const DEFAULT_TOTAL = "~€8,000+";

export default function SectionValueStack({ data }: { data: ProspectData }) {
  const stack = data.valueStack?.items ?? DEFAULT_STACK;
  const totalLabel = data.valueStack?.totalLabel ?? DEFAULT_TOTAL;

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">

        {/* Label */}
        <p
          className="font-sora text-fg/30 mb-5"
          style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
        >
          Value
        </p>

        {/* H2 */}
        <h2
          className="font-playfair font-normal text-fg mb-12"
          style={{
            fontSize: "clamp(24px, 3.4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em",
          }}
        >
          What You Get
        </h2>

        {/* Value stack table */}
        <div
          data-reveal
          className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.015] mb-3"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.3)" }}
        >
          {stack.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-7 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.025] transition-colors duration-200"
            >
              <span
                className="font-sora font-light text-fg/60"
                style={{ fontSize: "14px" }}
              >
                {item.label}
              </span>
              <span
                className="font-sora text-fg/35 tabular-nums"
                style={{ fontSize: "14px" }}
              >
                {item.value}
              </span>
            </div>
          ))}

          {/* Total row — muted + strikethrough */}
          <div className="flex items-center justify-between px-7 py-5 bg-white/[0.03] border-t border-white/[0.08]">
            <span
              className="font-sora text-fg/25"
              style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Total Year-1 Value
            </span>
            <span
              className="font-playfair text-fg/30 line-through"
              style={{ fontSize: "clamp(18px, 2.2vw, 24px)", letterSpacing: "-0.02em" }}
            >
              {totalLabel}/yr
            </span>
          </div>
        </div>

        {/* Founding Clinic Offer — visually connected directly below the stack */}
        <div
          data-reveal="d1"
          className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.015] mb-6"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.3)" }}
        >
          {/* Offer label + subheading */}
          <div className="px-7 pt-6 pb-5 border-b border-white/[0.06]">
            <p
              className="font-sora text-fg/30 mb-2"
              style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              Founding Clinic Offer
            </p>
            <p className="font-sora font-light text-fg/45" style={{ fontSize: "14px" }}>
              5 spots — in exchange for a testimonial once you see results.
            </p>
          </div>

          {/* Activation row */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.04]">
            <div>
              <p className="font-sora text-fg/55 mb-0.5" style={{ fontSize: "13px" }}>
                Activation
              </p>
              <p className="font-sora font-light text-fg/30" style={{ fontSize: "11px" }}>
                Done-for-you setup, 48 hrs
              </p>
            </div>
            <span
              className="font-playfair font-bold text-fg"
              style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.02em" }}
            >
              {data.offerSetupPrice}
            </span>
          </div>

          {/* Monthly row — accent highlight */}
          <div
            className="flex items-center justify-between px-7 py-6"
            style={{ background: "rgba(212,255,43,0.09)", borderTop: "1px solid rgba(212,255,43,0.22)" }}
          >
            <div>
              <p className="font-sora font-semibold text-accent mb-0.5" style={{ fontSize: "13px" }}>
                Monthly
              </p>
              <p className="font-sora font-light text-fg/40" style={{ fontSize: "11px" }}>
                Ongoing optimisation &amp; training
              </p>
            </div>
            <span
              className="font-playfair font-bold text-accent"
              style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.02em" }}
            >
              {data.offerMonthlyPrice}
            </span>
          </div>
        </div>

        {/* Guarantee block — prominent with accent border + tint */}
        <div
          data-reveal="d2"
          className="rounded-2xl border p-7 mb-5"
          style={{
            borderColor: "rgba(212,255,43,0.30)",
            background: "rgba(212,255,43,0.06)",
            boxShadow: "0 4px 32px rgba(212,255,43,0.08)",
          }}
        >
          <div className="flex items-start gap-5">
            <div className="shrink-0 mt-0.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke="rgba(212,255,43,0.75)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="rgba(212,255,43,0.75)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p
                className="font-sora text-accent mb-2"
                style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}
              >
                30-Day Guarantee
              </p>
              <p className="font-sora font-light text-fg/65 leading-[1.7]" style={{ fontSize: "14px" }}>
                {data.agentName} books at least 5 qualified consultations in your
                first 30 days — or full refund. You keep everything she generated:
                transcripts, contacts, the lot.
              </p>
            </div>
          </div>
        </div>

        {/* Small note */}
        <p
          data-reveal="d3"
          className="font-sora font-light text-fg/30 text-center leading-relaxed"
          style={{ fontSize: "12px" }}
        >
          Just like a new hire, {data.agentName} gets sharper every week. The difference: she works 24/7 from day one.
        </p>

      </div>
    </section>
  );
}
