import type { ProspectData } from "../data";

const DEFAULT_TOTAL = "~£12,000+";

export default function SectionValueStack({ data }: { data: ProspectData }) {
  const totalLabel = data.valueStack?.totalLabel ?? DEFAULT_TOTAL;
  // Strip leading "~" for the anchor line: "~£12,000+" → "£12,000+/yr"
  const anchorPrice = totalLabel.replace(/^~/, "");

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
          data-reveal
          className="font-playfair font-normal text-fg mb-4"
          style={{
            fontSize: "clamp(24px, 3.4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em",
          }}
        >
          Founding Clinic Offer
        </h2>

        {/* Subheading */}
        <p
          data-reveal
          className="font-sora font-light text-fg/45 leading-relaxed mb-10"
          style={{ fontSize: "15px" }}
        >
          5 spots — in exchange for a testimonial once you see results.
        </p>

        {/* Pricing card */}
        <div
          data-reveal
          className="rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.015] mb-6"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.3)" }}
        >
          {/* Anchor / strikethrough */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.06]">
            <span
              className="font-sora text-fg/30"
              style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Normally
            </span>
            <span
              className="font-playfair text-fg/30 line-through"
              style={{ fontSize: "clamp(18px, 2.2vw, 24px)", letterSpacing: "-0.02em" }}
            >
              {anchorPrice}/yr
            </span>
          </div>

          {/* Activation price */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.06]">
            <div>
              <p
                className="font-sora text-fg/40 mb-1"
                style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Activation
              </p>
              <p className="font-sora font-light text-fg/35" style={{ fontSize: "12px" }}>
                Done-for-you setup, 48 hrs
              </p>
            </div>
            <span
              className="font-playfair font-bold text-fg"
              style={{ fontSize: "clamp(22px, 2.5vw, 30px)", letterSpacing: "-0.02em" }}
            >
              {data.offerSetupPrice}
            </span>
          </div>

          {/* Monthly price — accent row */}
          <div
            className="flex items-center justify-between px-7 py-6"
            style={{ background: "rgba(212,255,43,0.09)", borderTop: "1px solid rgba(212,255,43,0.22)" }}
          >
            <div>
              <p
                className="font-sora font-semibold text-accent"
                style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Monthly
              </p>
              <p className="font-sora font-light text-fg/40" style={{ fontSize: "12px" }}>
                Ongoing optimisation &amp; training
              </p>
            </div>
            <span
              className="font-playfair font-bold text-accent"
              style={{ fontSize: "clamp(22px, 2.5vw, 30px)", letterSpacing: "-0.02em" }}
            >
              {data.offerMonthlyPrice}
            </span>
          </div>
        </div>

        {/* Guarantee box — more prominent with accent border + tint */}
        <div
          data-reveal="d1"
          className="rounded-2xl border p-7 mb-6"
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
          data-reveal="d2"
          className="font-sora font-light text-fg/30 text-center mb-8 leading-relaxed"
          style={{ fontSize: "12px" }}
        >
          Just like a new hire — we take the performance risk, not you.
        </p>

        {/* CTA button */}
        <div data-reveal="d3">
          <a
            href={data.ctaCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-accent text-bg font-semibold rounded-xl text-center transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_0_56px_rgba(212,255,43,0.25)] active:scale-[0.99]"
            style={{ fontSize: "15px", padding: "20px", letterSpacing: "-0.01em" }}
          >
            Book Free 30-Min Setup Call →
          </a>
        </div>

      </div>
    </section>
  );
}
