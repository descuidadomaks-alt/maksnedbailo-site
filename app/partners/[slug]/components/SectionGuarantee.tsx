export default function SectionGuarantee() {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Guarantee
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-10"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          The Promise
        </h2>

        <div
          data-reveal
          className="rounded-2xl border p-8 md:p-10"
          style={{
            borderColor: "rgba(212,255,43,0.28)",
            background: "rgba(212,255,43,0.05)",
            boxShadow: "0 4px 32px rgba(212,255,43,0.07)",
          }}
        >
          <div className="flex items-start gap-5">
            <div className="shrink-0 mt-0.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(212,255,43,0.75)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="rgba(212,255,43,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-sora font-light text-fg/65 leading-[1.85]" style={{ fontSize: "15px" }}>
              If we don&apos;t identify at least one AI use case with measurable ROI inside 90 minutes, you keep the map, you keep my number, and we both walk. No pitch, no follow-up sequence, no awkward &ldquo;let me send you a proposal.&rdquo; This works or it doesn&apos;t.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
