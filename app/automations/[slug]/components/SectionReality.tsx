import type { ProspectData } from "../data";

export default function SectionReality({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">

        <p
          data-reveal
          className="font-sora text-fg/30 mb-5"
          style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
        >
          The Reality
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-10"
          style={{
            fontSize: "clamp(24px, 3.4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em",
          }}
        >
          Why Most Clinics Quit AI Too Early
        </h2>

        {/* Pull quote */}
        <div
          data-reveal="d1"
          className="rounded-2xl border border-white/[0.06] bg-white/[0.018] px-8 py-7 mb-8"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.25)" }}
        >
          <p
            className="font-playfair font-normal text-fg/85 leading-[1.45]"
            style={{
              fontSize: "clamp(19px, 2vw, 26px)",
              letterSpacing: "-0.018em",
            }}
          >
            &ldquo;An AI employee needs onboarding — just like a human hire
            takes 3–6 months to ramp.&rdquo;
          </p>
        </div>

        {/* Body copy */}
        <div
          data-reveal="d2"
          className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 flex flex-col gap-5"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
        >
          <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
            Most clinics try ChatGPT once, see it get something wrong, and quit.
          </p>
          <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
            {data.agentName}&apos;s V1 is trained on public data only. She&apos;ll get some
            things wrong in week one. The {data.offerMonthlyPrice} isn&apos;t maintenance
            — it&apos;s training. Every week we review her transcripts, fix gaps,
            teach her your nuances.
          </p>
          <p className="font-sora font-light text-fg/55 leading-[1.75]" style={{ fontSize: "14px" }}>
            By month 3: she handles first-touch enquiries better than your best
            receptionist. And she doesn&apos;t sleep.
          </p>
        </div>

      </div>
    </section>
  );
}
