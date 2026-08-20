"use client";

import type { NewOfferCopy } from "../lib/copy";
import { CHECKOUT_URL } from "../../lib/config";
import { WA_LINK } from "@/lib/content";

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

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

export default function NewOfferFinalCTA({ d }: { d: NewOfferCopy }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-28">
      <div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(212,255,43,0.055) 0%, transparent 68%)" }} />
      <div className="relative max-w-lg mx-auto px-6 text-center">

        <h2 data-reveal className="font-playfair font-normal text-fg mb-4" style={{ fontSize: "clamp(24px, 3.6vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.024em" }}>
          {d.finalCta.headline}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/55 mb-12" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.55 }}>
          {d.finalCta.sub}
        </p>

        <div data-reveal="d1" className="flex flex-col items-center gap-4">
          <a
            href={CHECKOUT_URL}
            data-primary-cta
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_64px_rgba(212,255,43,0.28)] active:scale-[0.99] w-full sm:w-auto"
            style={{ fontSize: "15px", padding: "18px 40px", minHeight: "60px", letterSpacing: "-0.01em" }}
            onClick={() => track("direct_cta_book", { location: "final_v2" })}
          >
            {d.finalCta.cta}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h13M12 5l7 7-7 7" /></svg></span>
          </a>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80"
            style={{ fontSize: "14px", color: "rgba(74,222,128,0.8)", letterSpacing: "-0.01em" }}
            onClick={() => track("direct_whatsapp_click", { location: "final_v2" })}
          >
            <WhatsAppIcon />
            {d.finalCta.messengerLabel}
          </a>
        </div>

      </div>
    </section>
  );
}
