"use client";

import ElevatorField from "@/app/new/components/ElevatorField";
import type { NewOfferCopy } from "../lib/copy";

/**
 * Same tunnel-depth ElevatorField treatment as DirectProblem.tsx
 * (app/ai-map/sections/DirectProblem.tsx) — read-only reuse of the shared
 * component, fresh copy.
 */
export default function NewOfferProblem({ d }: { d: NewOfferCopy }) {
  return (
    <ElevatorField className="section-divider" clip cameraSpan={0.35} cameraOffset={0.32}>
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div data-reveal className="map-content-panel w-full flex flex-col items-center text-center">
          <p className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.problem.label}
          </p>
          <h2 className="font-playfair font-normal text-fg mb-6" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "22ch" }}>
            {d.problem.headline}
          </h2>
          <p className="font-sora font-light text-fg/62 leading-[1.9]" style={{ fontSize: "15px", maxWidth: "58ch" }}>
            {d.problem.body}
          </p>
        </div>
      </div>
    </ElevatorField>
  );
}
