"use client";

import type { V2Copy } from "../lib/copy";

/**
 * Section 2 — THE PROBLEM. One statement + 3-4 concrete examples, no bullet
 * wall. Each line tied to money/time/output, never to "AI" itself.
 */
export default function V2Problem({ d }: { d: V2Copy }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 700px 420px at 8% 0%, rgba(212,255,43,0.035) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.problem.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-fg mx-auto mb-14"
          style={{ fontSize: "clamp(24px, 3.4vw, 46px)", lineHeight: 1.12, letterSpacing: "-0.022em", maxWidth: "18ch" }}
        >
          {d.problem.headline}
        </h2>

        <ul className="flex flex-col gap-5 text-left max-w-2xl mx-auto">
          {d.problem.items.map((item, i) => (
            <li
              key={i}
              data-reveal={`d${i % 4}`}
              className="font-sora font-light text-fg/62 leading-[1.7] pl-5"
              style={{ fontSize: "15px", borderLeft: "2px solid rgba(212,255,43,0.18)" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
