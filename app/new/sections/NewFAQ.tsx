"use client";

import { useState } from "react";
import type { NewPageDict } from "../lib/i18n";
import { WA_BOTTLENECK_LINK } from "../lib/config";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4FF2B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      <path d="M12 2.5l7.5 3v5c0 4.6-3.1 8.7-7.5 9.9-4.4-1.2-7.5-5.3-7.5-9.9v-5l7.5-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

/**
 * Section 9 — FAQ (light, accordion).
 * Pattern ported from app/ai-map/sections/DirectFAQ.tsx + JSON-LD from components/FAQ.tsx.
 */
export default function NewFAQ({ d }: { d: NewPageDict }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      {/* Soft section gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 700px 420px at 4% 0%, rgba(212,255,43,0.035) 0%, transparent 70%)" }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.faq.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mx-auto" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "20ch" }}>
            {d.faq.headline}
          </h2>
        </div>

        {/* Guarantee — banner card, not a pill */}
        <div
          data-reveal
          className="flex items-center gap-4 mb-12 mx-auto rounded-2xl text-left"
          style={{ background: "rgba(212,255,43,0.05)", border: "1px solid rgba(212,255,43,0.18)", padding: "20px 24px", maxWidth: "640px" }}
        >
          <ShieldIcon />
          <p className="font-sora font-light text-fg/75 leading-[1.6]" style={{ fontSize: "13.5px" }}>
            {d.faq.guarantee}
          </p>
        </div>

        <div data-reveal className="flex flex-col">
          {d.faq.items.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i} className="border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <button className="w-full flex items-center justify-between py-5 text-left gap-6 transition-opacity duration-150 hover:opacity-75" onClick={() => toggle(i)} aria-expanded={isOpen}>
                  <span className="font-sora text-fg/72" style={{ fontSize: "15px", lineHeight: 1.5 }}>{item.q}</span>
                  <span className="text-fg/28 flex-shrink-0"><ChevronIcon open={isOpen} /></span>
                </button>
                <div style={{ maxHeight: isOpen ? "600px" : "0", overflow: "hidden", transition: "max-height 0.38s cubic-bezier(0.16,1,0.3,1)" }}>
                  <div className="pb-6">
                    <p className="font-sora font-light text-fg/48 leading-[1.88]" style={{ fontSize: "14px", maxWidth: "62ch" }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing WhatsApp line */}
        <div data-reveal className="text-center mt-10">
          <a
            href={WA_BOTTLENECK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80"
            style={{ fontSize: "14px", color: "rgba(74,222,128,0.85)", letterSpacing: "-0.01em" }}
          >
            <WhatsAppIcon />
            {d.faq.closingCta}
          </a>
        </div>

        </div>
      </div>
    </section>
  );
}
