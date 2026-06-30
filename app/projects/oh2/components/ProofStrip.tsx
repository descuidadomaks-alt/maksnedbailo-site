import { CalendarIcon, PhoneIcon, MailIcon } from "./IntegrationIcons";

/**
 * Section 2 — the only hard stat on the page (verified) plus a framed
 * missed-call math example (not a cited stat — clearly "your math", not a
 * second external claim). Dark band. No fake logos.
 */
export function ProofStrip() {
  return (
    <section className="bg-[#171e19] py-14 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="oh-display text-6xl text-[#ffe17c] sm:text-8xl">78%</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85 sm:text-xl">
          78% of customers hire the first business that replies — and the average company
          takes 47 hours. Miss just 5 calls a month at a $2,000 job each, and that&apos;s{" "}
          <span className="font-bold text-[#ffe17c]">$10,000</span> walking straight to your
          competitor.
        </p>

        <div className="mt-10 border-t border-[#b7c6c2]/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Works with the tools you already use
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-sm font-medium text-white/75">
            <span className="inline-flex items-center gap-2.5">
              <PhoneIcon /> Your phone
            </span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span className="inline-flex items-center gap-2.5">
              <CalendarIcon /> Your calendar
            </span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span className="inline-flex items-center gap-2.5">
              <MailIcon /> Your inbox
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
