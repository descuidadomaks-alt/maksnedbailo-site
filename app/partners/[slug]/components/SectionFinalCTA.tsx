"use client";

import type { PartnerData } from "@/content/partners/index";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

function WAIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

export default function SectionFinalCTA({ data }: { data: PartnerData }) {
  const track = (location: string) =>
    window.plausible?.("partner_cta", { props: { slug: data.slug, location } });

  return (
    <section className="section-divider py-24 md:py-40">
      <div className="max-w-xl mx-auto px-6 text-center">

        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(212,255,43,0.06) 0%, transparent 70%)",
            marginTop: "-120px",
          }}
        />

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-4"
          style={{ fontSize: "clamp(26px, 3.8vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.024em" }}
        >
          {data.partner.name} sent you here for a reason.
        </h2>

        <p
          data-reveal
          className="font-playfair text-fg/50 mb-12"
          style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.4, fontStyle: "italic", letterSpacing: "-0.015em" }}
        >
          The session is yours either way.
        </p>

        <div data-reveal="d1" className="flex flex-col items-center gap-4">
          {/* Primary */}
          <a
            href={data.booking.schedulerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_64px_rgba(212,255,43,0.28)] active:scale-[0.99] w-full sm:w-auto"
            style={{ fontSize: "16px", padding: "20px 44px", minHeight: "64px", letterSpacing: "-0.01em" }}
            onClick={() => track("final")}
          >
            {data.hero.cta}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
          </a>

          {/* Secondary — WhatsApp */}
          <a
            href={data.booking.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
            style={{
              fontSize: "15px",
              padding: "18px 36px",
              minHeight: "60px",
              border: "1px solid rgba(74,222,128,0.28)",
              color: "rgba(74,222,128,0.72)",
              background: "rgba(74,222,128,0.03)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(74,222,128,0.5)";
              el.style.color = "rgba(74,222,128,0.95)";
              el.style.background = "rgba(74,222,128,0.06)";
              el.style.boxShadow = "0 0 40px rgba(74,222,128,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(74,222,128,0.28)";
              el.style.color = "rgba(74,222,128,0.72)";
              el.style.background = "rgba(74,222,128,0.03)";
              el.style.boxShadow = "";
            }}
            onClick={() => track("whatsapp_final")}
          >
            <WAIcon />
            Message on WhatsApp first
          </a>
        </div>

      </div>
    </section>
  );
}
