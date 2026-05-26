"use client";

import { useState } from "react";
import type { PartnerData } from "@/content/partners/index";

function getFAQs(data: PartnerData) {
  return [
    {
      q: "Is this a sales call disguised as something else?",
      a: "No. The Strategic AI Map is a real deliverable. If you don't want to work with me after, you still have it. That's the whole point of the gift framing — " + data.partner.name + " wouldn't share it otherwise.",
    },
    {
      q: "What if my business is too unique for AI?",
      a: "Every founder thinks this. After the 90 minutes you'll know specifically which parts of your business AI can touch and which it can't. Sometimes the answer is \"almost none of it\" — and that's a useful answer.",
    },
    {
      q: "How is this different from hiring a consultant?",
      a: "Consultants write decks. I build systems. The 90-minute map exists so we can decide together whether building is worth it.",
    },
    {
      q: "What does Phase 1 typically look like?",
      a: "A working prototype of the highest-ROI use case from your map. Usually " + data.pricing.phase1Anchor + ". 2–3 weeks. Real software you can use Monday morning, not a strategy document.",
    },
    {
      q: "Why is " + data.partner.name + " giving this away?",
      a: "Because I built him an internal system he uses weekly and he wants his people to have the same edge. He gets a small thank-you if you eventually decide to work with me. No pressure either way — he's not selling, he's sharing.",
    },
    {
      q: "In what language can we run the session?",
      a: "Ukrainian, Russian, English, or my Spanish if you're feeling generous.",
    },
  ];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function SectionFAQ({ data }: { data: PartnerData }) {
  const faqs = getFAQs(data);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          FAQ
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-12"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          Honest answers
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              data-reveal={`d${Math.min(i, 3)}`}
              className="rounded-2xl border border-white/[0.06] overflow-hidden"
              style={{ background: open === i ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.018)" }}
            >
              <button
                className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-white/[0.015] transition-colors duration-200 gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-sora text-fg/75" style={{ fontSize: "15px", lineHeight: 1.5 }}>
                  {faq.q}
                </span>
                <span className="shrink-0 text-fg/30">
                  <ChevronIcon open={open === i} />
                </span>
              </button>

              {open === i && (
                <div className="px-7 pb-6 border-t border-white/[0.04]">
                  <p className="font-sora font-light text-fg/50 leading-[1.8] pt-5" style={{ fontSize: "14px" }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
