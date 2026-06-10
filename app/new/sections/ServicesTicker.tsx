"use client";

import type { NewPageDict } from "../lib/i18n";

/**
 * Services ticker — restored from components/GotAProblem.tsx (SERVICES list,
 * .ticker-track-services keyframes). Sits between Testimonials and FAQ as a
 * full-bleed black strip; "we've solved this before" breadth signal.
 */
export default function ServicesTicker({ d }: { d: NewPageDict }) {
  const doubled = [...d.services.tags, ...d.services.tags];

  return (
    <div className="section-divider">
      <p data-reveal className="font-label text-fg/22 text-center uppercase py-4" style={{ fontSize: "9px", letterSpacing: "2.5px", background: "#000000" }}>
        {d.services.label}
      </p>
      <div className="w-full overflow-hidden flex items-center" style={{ height: "40px", background: "#000000" }}>
        <div className="ticker-track-services whitespace-nowrap flex">
          {doubled.map((service, i) => (
            <span key={i} className="font-sora text-[10px] font-light tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              {service}
              <span style={{ color: "#D4FF2B", margin: "0 20px" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
