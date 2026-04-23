"use client";

import type { ProspectData } from "../data";

function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

export default function SectionCTA({ data }: { data: ProspectData }) {
  const w = typeof window !== "undefined" ? window : null;
  const track = (event: string, location: string) =>
    (w as typeof window)?.plausible?.(event, { props: { slug: data.slug, location } });

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="font-playfair font-normal text-2xl md:text-3xl mb-3">
          Ready to see the numbers?
        </h2>
        <p className="font-sora font-light text-[14px] text-fg/35 mb-10 leading-relaxed">
          15 minutes. Free. No sales pressure — just the data.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a
            href={data.ctaCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-bg font-semibold px-8 py-4 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200 w-full sm:w-auto text-center"
            onClick={() => track("cta_booked", "final")}
          >
            Book a 15-minute call →
          </a>
          <a
            href={data.ctaWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-green-500/30 text-green-400 px-7 py-4 rounded-lg text-sm hover:border-green-500/55 hover:bg-green-500/5 transition-all duration-200 w-full sm:w-auto"
            onClick={() => track("cta_whatsapp", "final")}
          >
            <WAIcon />
            Message me on WhatsApp →
          </a>
        </div>
        {!data.slotExpired && (
          <a
            href="#connecto-widget-container"
            className="font-sora text-[12px] text-fg/25 hover:text-fg/50 transition-colors underline underline-offset-4 decoration-white/10"
          >
            Or just keep chatting with {data.agentName} ↑
          </a>
        )}
      </div>
    </section>
  );
}
