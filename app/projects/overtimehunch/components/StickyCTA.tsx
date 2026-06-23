"use client";

import { useGate } from "./GateContext";

/**
 * Mobile-only sticky CTA bar. Always within thumb reach. Opens the gate.
 * Hidden on sm+ (the nav pill + section CTAs cover desktop).
 */
export function StickyCTA() {
  const { openGate } = useGate();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#171e19]/10 bg-white/95 p-3 backdrop-blur sm:hidden">
      <button
        type="button"
        onClick={openGate}
        className="oh-display w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-lg min-h-[52px]"
      >
        Watch the demo
      </button>
    </div>
  );
}
