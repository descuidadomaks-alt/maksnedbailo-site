"use client";

import { BRAND } from "../lib/config";
import { useAudit } from "./AuditContext";
import { ClockMark } from "./ClockMark";

/**
 * Sticky nav — same shell as the sibling pages' Nav.tsx, wired to
 * AuditContext instead of QuizContext. Logo scrolls to #top only, never
 * opens the audit modal.
 */
export function Nav() {
  const { openAudit } = useAudit();

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-20 border-b border-[#171e19]/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <a href="#top" className="inline-flex items-center gap-2">
          <ClockMark className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="oh-display text-2xl tracking-tight text-[#171e19] sm:text-3xl">
            {BRAND.replace(/\.$/, "")}
            <span className="text-[#ffe17c]">.</span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => openAudit("nav")}
          className="oh-card rounded-full bg-[#171e19] px-5 py-2.5 text-sm font-medium text-white hover:scale-105 sm:px-6 sm:text-base min-h-[44px]"
        >
          Free Audit
        </button>
      </div>
    </header>
  );
}
