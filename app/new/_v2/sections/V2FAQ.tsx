"use client";

import { useState } from "react";
import type { V2Copy } from "../lib/copy";

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
 * Section 8 — FAQ. Objection-handling accordion, no guarantee banner (a
 * guarantee on a free thing is nonsense, and the build terms are already
 * covered in V2Start's "how paying works" block). No JSON-LD — the page
 * is noindexed.
 */
export default function V2FAQ({ d }: { d: V2Copy }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    // Solid var(--bg) on purpose. This section sits AFTER the clipped
    // ElevatorField and must show nothing behind it.
    <section className="section-divider relative overflow-hidden py-16 md:py-24" style={{ background: "var(--bg)" }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 700px 420px at 4% 0%, rgba(212,255,43,0.035) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.faq.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mx-auto" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "20ch" }}>
            {d.faq.headline}
          </h2>
        </div>

        <div data-reveal className="flex flex-col">
          {d.faq.items.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i} className="border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <button className="w-full flex items-center justify-between py-5 text-left gap-6 transition-opacity duration-150 hover:opacity-75" onClick={() => toggle(i)} aria-expanded={isOpen}>
                  <span className="font-sora text-fg/72" style={{ fontSize: "15px", lineHeight: 1.5 }}>{item.q}</span>
                  <span className="text-fg/55 flex-shrink-0"><ChevronIcon open={isOpen} /></span>
                </button>
                <div style={{ maxHeight: isOpen ? "600px" : "0", overflow: "hidden", transition: "max-height 0.38s cubic-bezier(0.16,1,0.3,1)" }}>
                  <div className="pb-6">
                    <p className="font-sora font-light text-fg/62 leading-[1.88]" style={{ fontSize: "14px", maxWidth: "62ch" }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
