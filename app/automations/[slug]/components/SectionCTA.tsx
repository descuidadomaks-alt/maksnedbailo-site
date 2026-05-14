"use client";

import type { ProspectData } from "../data";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

export default function SectionCTA({ data }: { data: ProspectData }) {
  const track = (event: string, location: string) =>
    window.plausible?.(event, { props: { slug: data.slug, location } });

  return (
    <section className="section-divider py-24 md:py-32">
      <div className="max-w-xl mx-auto px-6 text-center">

        <h2
          className="font-playfair font-normal text-fg mb-4"
          style={{
            fontSize: "clamp(26px, 3.6vw, 50px)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em",
          }}
        >
          Ready to see the numbers?
        </h2>

        <p
          className="font-sora font-light text-fg/35 leading-relaxed mb-10"
          style={{ fontSize: "14px" }}
        >
          15 minutes. Free. No sales pressure — just your data.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <a
            href={data.ctaCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_56px_rgba(212,255,43,0.22)] w-full sm:w-auto"
            style={{ fontSize: "15px", padding: "18px 36px", minHeight: "60px" }}
            onClick={() => track("cta_booked", "final")}
          >
            Book a 15-Min Call
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
          </a>

          <a
            href={data.ctaWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 border rounded-xl transition-all duration-200 w-full sm:w-auto"
            style={{
              fontSize: "14px",
              padding: "18px 28px",
              minHeight: "60px",
              border: "1px solid rgba(74,222,128,0.22)",
              color: "rgba(74,222,128,0.65)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.45)";
              (e.currentTarget as HTMLElement).style.color = "rgba(74,222,128,0.9)";
              (e.currentTarget as HTMLElement).style.background = "rgba(74,222,128,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.22)";
              (e.currentTarget as HTMLElement).style.color = "rgba(74,222,128,0.65)";
              (e.currentTarget as HTMLElement).style.background = "";
            }}
            onClick={() => track("cta_whatsapp", "final")}
          >
            <WAIcon />
            WhatsApp
          </a>
        </div>

        {!data.slotExpired && (
          <a
            href="#get-audit"
            className="font-sora text-fg/20 hover:text-fg/45 transition-colors underline underline-offset-4 decoration-white/10"
            style={{ fontSize: "12px" }}
          >
            Or fill in the quick audit form above ↑
          </a>
        )}
      </div>
    </section>
  );
}
