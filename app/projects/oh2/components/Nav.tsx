"use client";

import { BRAND } from "../lib/config";
import { useGate } from "./GateContext";

/**
 * Fixed nav, h-20, white/90 blur. Wordmark left (yellow period), one pill CTA
 * right that opens the gate. No other links on mobile — keep the thumb on one
 * job.
 */
export function Nav() {
  const { scrollToDemo } = useGate();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-[#171e19]/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className="oh-display text-2xl tracking-tight text-[#171e19] sm:text-3xl"
        >
          {BRAND.replace(/\.$/, "")}
          <span className="text-[#ffe17c]">.</span>
        </a>

        <button
          type="button"
          onClick={scrollToDemo}
          className="oh-card rounded-full bg-[#171e19] px-5 py-2.5 text-sm font-medium text-white hover:scale-105 sm:px-6 sm:text-base min-h-[44px]"
        >
          See The Demo
        </button>
      </div>
    </header>
  );
}
