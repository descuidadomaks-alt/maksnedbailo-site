"use client";

import Link from "next/link";
import type { V2Copy } from "../lib/copy";
import { WA_BOTTLENECK_LINK } from "../../lib/config";

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

/**
 * Section 9 — FINAL CTA. Deliberately quiet. The closing line under the
 * button is the whole point of the section: it names the cost of doing
 * nothing without ever telling the reader what to conclude from it.
 *
 * Opaque. The dot field belongs to V2Start alone and is clipped to it, so
 * nothing shows through here.
 */
export default function V2FinalCTA({ d, ctaHref }: { d: V2Copy; ctaHref: string }) {
  return (
    // Solid var(--bg) — this section sits AFTER the clipped ElevatorField
    // and shows nothing behind it. Just the hero's subtle accent glow.
    <section className="section-divider relative overflow-hidden py-20 md:py-32" style={{ background: "var(--bg)" }}>
      <div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(212,255,43,0.055) 0%, transparent 68%)" }} />
      <div className="relative max-w-lg mx-auto px-6 text-center">
        <h2 data-reveal className="font-playfair font-normal text-fg mb-6" style={{ fontSize: "clamp(24px, 3.6vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.024em" }}>
          {d.finalCta.headline}
        </h2>
        <div className="flex flex-col gap-2.5 mb-12">
          {d.finalCta.sub.map((p, i) => (
            <p
              key={i}
              data-reveal={`d${i}`}
              className="font-sora font-light leading-[1.55]"
              style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: i === 0 ? "rgba(240,236,230,0.62)" : "rgba(240,236,230,0.45)" }}
            >
              {p}
            </p>
          ))}
        </div>

        <div data-reveal="d1" className="flex flex-col items-center gap-4">
          <Link
            href={ctaHref}
            data-primary-cta
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_64px_rgba(212,255,43,0.28)] active:scale-[0.99] w-full sm:w-auto"
            style={{ fontSize: "15px", padding: "18px 40px", minHeight: "60px", letterSpacing: "-0.01em" }}
          >
            {d.finalCta.primaryCta}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h13M12 5l7 7-7 7" /></svg></span>
          </Link>
          <p className="font-sora font-light text-fg/55" style={{ fontSize: "12px" }}>
            {d.finalCta.microcopy}
          </p>

          <a
            href={WA_BOTTLENECK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80 mt-2"
            style={{ fontSize: "14px", color: "rgba(74,222,128,0.8)", letterSpacing: "-0.01em" }}
          >
            <WhatsAppIcon />
            {d.finalCta.whatsapp}
          </a>
        </div>

        <p data-reveal className="font-sora font-light text-fg/40 mt-10" style={{ fontSize: "13px" }}>
          {d.finalCta.closingLine}
        </p>
      </div>
    </section>
  );
}
