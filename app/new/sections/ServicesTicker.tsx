"use client";

import Link from "next/link";
import type { NewPageDict } from "../lib/i18n";
import { useCtaTarget } from "../lib/locale";

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
  const ctaTarget = useCtaTarget();
  const doubled = [...d.services.tags, ...d.services.tags];

  // Repeated enough times that even doubled it overflows the widest
  // viewport — keeps the hover track's translateX(-50%) loop seamless.
  const bookTheMap = Array.from({ length: 16 }, () => d.services.hoverCta.toUpperCase());
  const doubledBookTheMap = [...bookTheMap, ...bookTheMap];

  return (
    <div className="section-divider">
      <div className="text-center uppercase py-4 px-6" style={{ background: "#000000" }}>
        <p data-reveal className="font-label text-fg/22 mx-auto" style={{ fontSize: "9px", letterSpacing: "2.5px", maxWidth: "240px" }}>
          {d.services.label}
        </p>
      </div>
      <Link
        href={ctaTarget}
        className="group relative w-full overflow-hidden flex items-center"
        style={{ height: "40px", background: "#000000" }}
      >
        <span className="sr-only">{d.services.hoverCta}</span>
        {/* Services keywords — same animated track keeps running on hover,
            just fades out so the "Book the Map" track shows through. */}
        <div className="services-ticker-track absolute inset-0 flex items-center whitespace-nowrap transition-opacity duration-300 group-hover:opacity-0">
          {doubled.map((service, i) => (
            <span key={i} className="font-sora text-[10px] font-light tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              {service}
              <span style={{ color: "#D4FF2B", margin: "0 20px" }}>·</span>
            </span>
          ))}
        </div>
        {/* "Book the Map" track — mounted (and animating) the whole time so
            the crossfade never restarts or jumps; just hidden until hover. */}
        <div aria-hidden className="services-ticker-track absolute inset-0 flex items-center whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {doubledBookTheMap.map((label, i) => (
            <span key={i} className="font-sora text-[10px] font-semibold tracking-widest" style={{ color: "#D4FF2B" }}>
              {label}
              <span style={{ color: "rgba(255,255,255,0.4)", margin: "0 20px" }}>·</span>
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
