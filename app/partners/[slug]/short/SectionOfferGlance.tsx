import type { ShortPartnerConfig } from "@/content/partners/index";
import type { ShortPageDict } from "../lib/i18n";

/**
 * Offer at a Glance — asymmetric 2-col editorial layout.
 * Left (≈55%): value anchor + copy.  Right (≈45%): sample stats card.
 * Mobile: stacked, card below copy.
 */
export default function SectionOfferGlance({
  config,
  d,
}: {
  config: ShortPartnerConfig;
  d: ShortPageDict;
}) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.offer.label}
        </p>

        {/* Asymmetric two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-start">

          {/* ── LEFT: copy ── */}
          <div>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-6"
              style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
            >
              {d.offer.headline(config.partnerName)}
            </h2>

            {/* Price anchor — large strikethrough */}
            <div data-reveal className="flex items-baseline gap-4 mb-3">
              <span className="font-sora text-fg/20" style={{ fontSize: "12px", letterSpacing: "1px" }}>
                {d.offer.normallyLabel}
              </span>
              <span
                className="font-playfair text-fg/30 line-through"
                style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {d.offer.normallyValue}
              </span>
            </div>

            <p
              data-reveal
              className="font-sora font-semibold text-accent mb-8"
              style={{ fontSize: "13px", letterSpacing: "0.5px" }}
            >
              {d.offer.giftedLine(config.partnerName)}
            </p>

            <p
              data-reveal
              className="font-sora font-light text-fg/55 leading-[1.85] mb-10"
              style={{ fontSize: "15px", maxWidth: "60ch" }}
            >
              {d.offer.body}
            </p>

            {/* Deliverable list — text-only, no icons */}
            <div data-reveal>
              <p className="font-sora text-fg/30 mb-4" style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                {d.offer.deliverableHeading}
              </p>
              <ul className="flex flex-col gap-3">
                {[d.offer.del1, d.offer.del2, d.offer.del3].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 font-playfair text-accent"
                      style={{ fontSize: "18px", lineHeight: 1.4, letterSpacing: "-0.02em" }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sora font-light text-fg/60 leading-[1.65]" style={{ fontSize: "14px" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT: sample output card ── */}
          <div data-reveal className="md:sticky md:top-8">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.016)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: "3px solid rgba(212,255,43,0.35)",
                boxShadow: "0 12px 48px rgba(0,0,0,0.3)",
              }}
            >
              {/* Card header */}
              <div
                className="px-5 py-4 border-b border-white/[0.06]"
                style={{ background: "rgba(212,255,43,0.05)" }}
              >
                <p className="font-sora text-accent/60" style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                  Strategic AI Map
                </p>
                <p className="font-playfair text-fg/50 mt-0.5 italic" style={{ fontSize: "14px", letterSpacing: "-0.01em" }}>
                  [Your business name]
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.05]">
                {[
                  { value: d.offer.stat1Value, label: d.offer.stat1Label },
                  { value: d.offer.stat2Value, label: d.offer.stat2Label },
                  { value: config.phase1Anchor, label: d.offer.stat3Label("Phase 1") },
                ].map((stat, i) => (
                  <div key={i} className="px-4 py-5 text-center">
                    <p
                      className="font-playfair text-accent"
                      style={{ fontSize: i === 2 ? "16px" : "clamp(22px, 2.5vw, 28px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                    >
                      {stat.value}
                    </p>
                    <p className="font-sora text-fg/30 mt-1.5 leading-[1.4]" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sample note */}
              <div className="px-5 py-3 border-t border-white/[0.04]">
                <p className="font-sora text-fg/20 text-center" style={{ fontSize: "10px", fontStyle: "italic" }}>
                  {d.offer.sampleNote}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
