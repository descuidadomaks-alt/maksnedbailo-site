"use client";

import type { PartnerData } from "@/content/partners/index";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    clarity?: (method: string, key: string, value?: string) => void;
  }
}

function track(event: string, props: Record<string, string>) {
  window.plausible?.(event, { props });
  window.clarity?.("set", event, Object.values(props).join(" | "));
}

function TelegramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
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
  const isTelegram = data.booking.messengerChannel === "telegram";
  const messengerUrl = isTelegram
    ? (data.booking.telegram ?? "#")
    : (data.booking.whatsapp ?? "#");
  const messengerLabel = isTelegram ? "Message on Telegram first" : "Message on WhatsApp first";
  const messengerEvent = isTelegram ? "telegram_click" : "whatsapp_click";

  return (
    <section className="section-divider relative overflow-hidden py-24 md:py-40">
      {/* Ambient glow — clipped by overflow-hidden on section */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(212,255,43,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-xl mx-auto px-6 text-center">

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
          {/* Primary CTA — Tier 1: neon fill */}
          <a
            href={data.booking.schedulerUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-primary-cta
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_64px_rgba(212,255,43,0.28)] active:scale-[0.99] w-full sm:w-auto"
            style={{ fontSize: "16px", padding: "20px 44px", minHeight: "64px", letterSpacing: "-0.01em" }}
            onClick={() => track("cta_book_click", { slug: data.slug, location: "final" })}
          >
            {data.hero.cta}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
          </a>

          {/* Tertiary messenger — Tier 3: icon + text, no border */}
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-all duration-200 hover:opacity-80"
            style={{
              fontSize: "14px",
              color: isTelegram ? "rgba(34,158,217,0.75)" : "rgba(74,222,128,0.72)",
              letterSpacing: "-0.01em",
            }}
            onClick={() => track(messengerEvent, { slug: data.slug, location: "final" })}
          >
            {isTelegram ? <TelegramIcon /> : <WAIcon />}
            {messengerLabel}
          </a>
        </div>

      </div>
    </section>
  );
}
