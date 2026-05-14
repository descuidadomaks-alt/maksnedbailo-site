import type { ProspectData } from "../data";

const STACK = [
  { label: "Lead Leak Audit",                value: "£497"   },
  { label: "Done-For-You Setup (48hr)",       value: "£1,497" },
  { label: "Monthly Optimisation × 12",       value: "£4,764" },
  { label: "Competitor Response Comparison",  value: "£197"   },
  { label: "Medical Safety Guardrails",       value: "£297"   },
  { label: "Staff Handover Script",           value: "£97"    },
] as const;

export default function SectionValueStack({ data }: { data: ProspectData }) {
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

        {/* Stack table */}
        <div
          data-reveal
          className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.015] mb-6"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.3)" }}
        >
          {STACK.map((item, i) => (
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

          {/* Total row */}
          <div className="flex items-center justify-between px-7 py-5 bg-white/[0.03] border-t border-white/[0.08]">
            <span
              className="font-sora text-fg/40"
              style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Total Year-1 Value
            </span>
            <span
              className="font-playfair text-fg"
              style={{ fontSize: "clamp(18px, 2.2vw, 24px)", letterSpacing: "-0.02em" }}
            >
              ~£12,000+
            </span>
          </div>

          {/* Price row */}
          <div
            className="flex items-center justify-between px-7 py-5 border-t"
            style={{ background: "rgba(212,255,43,0.055)", borderColor: "rgba(212,255,43,0.14)" }}
          >
            <span
              className="font-sora font-semibold text-accent/80"
              style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Your Price
            </span>
            <span
              className="font-playfair text-accent"
              style={{ fontSize: "clamp(18px, 2.2vw, 24px)", letterSpacing: "-0.02em" }}
            >
              {data.offerSetupPrice} + {data.offerMonthlyPrice}
            </span>
          </div>
        </div>

        {/* Guarantee box */}
        <div
          data-reveal="d1"
          className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
        >
          <div className="flex items-start gap-5">
            <div className="shrink-0 mt-0.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke="rgba(212,255,43,0.55)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="rgba(212,255,43,0.55)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p
                className="font-sora text-accent/60 mb-2"
                style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}
              >
                30-Day Guarantee
              </p>
              <p className="font-sora font-light text-fg/55 leading-[1.7]" style={{ fontSize: "14px" }}>
                20+ qualified enquiries handled in 30 days, or full refund. You keep
                everything {data.agentName} generated — the transcripts, the contacts, all of it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
