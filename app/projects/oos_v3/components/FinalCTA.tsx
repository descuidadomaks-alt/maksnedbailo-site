"use client";

import { useAudit } from "./AuditContext";
import { Dot } from "./Dot";
import { track } from "../lib/track";
import { PAGE_TAG } from "../lib/config";

/**
 * Section 6 — the close. Audit offer, guarantee, exclusivity, primary CTA,
 * secondary "book a call" link. Same background-watermark treatment as the
 * sibling pages' FinalCTA.
 *
 * UNCONFIRMED: the guarantee line below is rendered per the brief, but it's
 * flagged here pending Maks's sign-off on deliverability (can we actually
 * detect/enforce "answering every call the way we promised"?) and legal
 * review before this ships as final copy on a live ad page.
 */
const GUARANTEE_UNCONFIRMED =
  "If we don't have your front office answering every call the way we promised, you don't pay.";

const EXCLUSIVITY = "Once you're in, we won't take on your direct competition in your area.";

export function FinalCTA() {
  const { openAudit } = useAudit();

  const handleSecondaryClick = () => {
    track("book_click", { location: "final_cta", page: PAGE_TAG });
    openAudit("final_cta_secondary");
  };

  return (
    <section className="relative overflow-hidden bg-[#ffe17c] py-20 sm:py-28">
      <span
        aria-hidden
        className="oh-display pointer-events-none absolute inset-0 flex items-center justify-center text-[20vw] leading-none text-[#171e19]/10"
      >
        NO PITCH
      </span>

      <div className="relative mx-auto max-w-2xl px-5 text-center">
        <h2 className="oh-display text-4xl text-[#171e19] sm:text-6xl" style={{ lineHeight: 0.95 }}>
          Free missed-call audit<Dot white />
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#171e19]/80 sm:text-xl">
          Give us your business number. We&apos;ll call it after hours, record what your customer
          hears, and send it to you. No pitch attached — the recording speaks for itself.
        </p>

        <p className="mx-auto mt-6 max-w-lg text-sm font-semibold leading-snug text-[#171e19]">
          {GUARANTEE_UNCONFIRMED}
        </p>

        <p className="mx-auto mt-3 max-w-lg text-sm font-medium text-[#171e19]/70">{EXCLUSIVITY}</p>

        <button
          type="button"
          onClick={() => openAudit("final_cta")}
          className="oh-display oh-card mt-9 inline-block w-full rounded-lg bg-[#171e19] px-8 py-5 text-xl text-white shadow-xl hover:scale-105 sm:w-auto sm:text-2xl min-h-[56px]"
        >
          Get my free missed-call audit →
        </button>

        <p className="mt-4">
          <button
            type="button"
            onClick={handleSecondaryClick}
            className="text-sm font-semibold text-[#171e19]/70 underline underline-offset-4 hover:text-[#171e19]"
          >
            Or just book a 15-minute call
          </button>
        </p>
      </div>
    </section>
  );
}
