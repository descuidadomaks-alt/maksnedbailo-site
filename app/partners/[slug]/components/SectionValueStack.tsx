import type { PartnerData } from "@/content/partners/index";

const STACK = [
  { label: "Operational Discovery (3 pillars, 40 questions)", value: "€600" },
  { label: "Live ROI calculation for your top 3 AI opportunities", value: "€700" },
  { label: "One-page Strategic AI Map (ranked by impact)", value: "€1,470" },
  { label: "Phase 1 Implementation Roadmap (only if it's worth doing)", value: "€400" },
];

export default function SectionValueStack({ data }: { data: PartnerData }) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          The Gift
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-4"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          The 90-Minute Strategic AI Map
        </h2>

        <p data-reveal className="font-sora font-light text-fg/40 mb-12" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          What you receive within 48 hours of the call. Whether or not we ever work together again.
        </p>

        {/* Value table */}
        <div
          data-reveal
          className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.015] mb-3"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.3)" }}
        >
          {STACK.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-7 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.025] transition-colors duration-200"
            >
              <span className="font-sora font-light text-fg/60" style={{ fontSize: "14px" }}>
                {item.label}
              </span>
              <span className="font-sora text-fg/35 tabular-nums ml-8 shrink-0" style={{ fontSize: "14px" }}>
                {item.value}
              </span>
            </div>
          ))}

          {/* Subtotal */}
          <div
            data-reveal="d1"
            className="flex items-center justify-between px-7 py-5 border-t border-white/[0.08]"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <span className="font-sora text-fg/25" style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
              Total Value
            </span>
            <span className="font-playfair text-fg/30 line-through" style={{ fontSize: "clamp(18px, 2.2vw, 24px)", letterSpacing: "-0.02em" }}>
              {data.pricing.totalValueAnchor}
            </span>
          </div>

          {/* Your investment — accent */}
          <div
            data-reveal="d2"
            className="flex items-center justify-between px-7 py-6"
            style={{ background: "rgba(212,255,43,0.07)", borderTop: "1px solid rgba(212,255,43,0.2)" }}
          >
            <div>
              <p className="font-sora font-semibold text-accent mb-0.5" style={{ fontSize: "13px" }}>
                Your investment through {data.partner.name}&apos;s circle
              </p>
              <p className="font-sora font-light text-fg/35" style={{ fontSize: "11px" }}>
                Normally {data.pricing.workshopValueAnchor} · Gifted to you
              </p>
            </div>
            <span
              className="font-playfair font-bold text-accent"
              style={{ fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.02em" }}
            >
              Complimentary
            </span>
          </div>
        </div>

        <p data-reveal className="font-sora font-light text-fg/25 text-center leading-relaxed mt-6" style={{ fontSize: "12px" }}>
          The map is yours regardless. No follow-up sequence. No proposal unless you ask for one.
        </p>

      </div>
    </section>
  );
}
