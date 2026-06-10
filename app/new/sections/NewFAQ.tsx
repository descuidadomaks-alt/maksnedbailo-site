"use client";

import { useState } from "react";
import type { NewPageDict } from "../lib/i18n";

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

        <div className="text-center mb-12">
          <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.faq.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mx-auto mb-5" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}>
            {d.faq.headline}
          </h2>
          <p
            data-reveal
            className="font-sora font-light text-accent/65 inline-block"
            style={{ fontSize: "13px", border: "1px solid rgba(212,255,43,0.18)", borderRadius: "999px", padding: "8px 18px" }}
          >
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

        </div>
      </div>
    </section>
  );
}
