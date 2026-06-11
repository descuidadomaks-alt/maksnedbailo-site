"use client";

import Link from "next/link";
import type { NewPageDict } from "../lib/i18n";
import { CTA_TARGET } from "../lib/config";

/**
 * Services ticker — restored from components/GotAProblem.tsx (SERVICES list,
 * .ticker-track-services keyframes). Sits between Testimonials and FAQ as a
 * full-bleed black strip; "we've solved this before" breadth signal.
 *
 * The whole strip links to CTA_TARGET (Bottleneck Map) — hovering fades the
 * ticker and reveals a "Book the Map" chip, turning the breadth signal into
 * a low-key CTA.
 */
export default function ServicesTicker({ d }: { d: NewPageDict }) {
  const doubled = [...d.services.tags, ...d.services.tags];

  return (
    <div className="section-divider">
      <div className="text-center uppercase py-4 px-6" style={{ background: "#000000" }}>
        <p data-reveal className="font-label text-fg/22 mx-auto" style={{ fontSize: "9px", letterSpacing: "2.5px", maxWidth: "240px" }}>
          {d.services.label}
        </p>
      </div>
      <Link
        href={CTA_TARGET}
        aria-label={d.services.hoverCta}
        className="group relative w-full overflow-hidden flex items-center"
        style={{ height: "40px", background: "#000000" }}
      >
        <div className="ticker-track-services whitespace-nowrap flex transition-opacity duration-300 group-hover:opacity-10">
          {doubled.map((service, i) => (
            <span key={i} className="font-sora text-[10px] font-light tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              {service}
              <span style={{ color: "#D4FF2B", margin: "0 20px" }}>·</span>
            </span>
          ))}
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-sora font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ fontSize: "11px", letterSpacing: "2px", color: "#D4FF2B" }}
        >
          → {d.services.hoverCta}
        </span>
      </Link>
    </div>
  );
}
