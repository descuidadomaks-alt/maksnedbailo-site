import type { DirectPageDict } from "../lib/directi18n";

export default function DirectGuarantee({ d }: { d: DirectPageDict }) {
  return (
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6">

        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.guarantee.label}
        </p>

        {/* Guarantee seal card */}
        <div
          data-reveal
          className="rounded-2xl p-8 md:p-10"
          style={{
            border: "2px solid rgba(212,255,43,0.35)",
            background: "rgba(212,255,43,0.04)",
            boxShadow: "0 4px 48px rgba(212,255,43,0.08)",
          }}
        >
          <div className="flex items-start gap-5">
            {/* Shield icon */}
            <div className="shrink-0 mt-0.5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(212,255,43,0.75)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="rgba(212,255,43,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div>
              <h2
                className="font-playfair font-normal text-fg mb-4"
                style={{ fontSize: "clamp(20px, 2.8vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                {d.guarantee.headline}
              </h2>
              {/* guarantee.body updated per spec 3.5 — no "you pay nothing" phrasing */}
              <p className="font-sora font-light text-fg/65 leading-[1.85] mb-5" style={{ fontSize: "15px", maxWidth: "58ch" }}>
                {d.guarantee.body}
              </p>
              <p
                className="font-playfair text-accent italic"
                style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.4, letterSpacing: "-0.01em" }}
              >
                {d.guarantee.highlight}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
