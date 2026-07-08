import { PRICE_PILOT, PRICE_STANDARD, SETUP, TERMS, EXCLUSIVITY, BOOKING_LINK } from "../lib/config";
import { Dot } from "./Dot";

export function Pricing() {
  return (
    <section className="bg-white px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="oh-display text-4xl text-[#171e19] sm:text-6xl">
          The pilot<Dot />
        </h2>

        <div className="oh-card mt-10 rounded-2xl border-2 border-[#ffe17c] bg-[#fffdf5] p-8 shadow-xl">
          <p className="oh-display text-6xl text-[#171e19] sm:text-7xl">{PRICE_PILOT}</p>
          <p className="mt-2 text-sm font-bold text-[#171e19]/60">{SETUP}</p>
          <p className="mt-1 text-sm text-[#171e19]/50">
            {PRICE_STANDARD} standard rate after the pilot
          </p>
          <p className="mt-4 text-sm font-medium text-[#171e19]/70">{TERMS}</p>

          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="oh-display oh-card mt-6 inline-block w-full rounded-lg bg-[#171e19] px-8 py-4 text-xl text-white shadow-lg hover:scale-[1.02] active:scale-100 min-h-[56px]"
          >
            Book my free call
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-md text-sm text-[#171e19]/50">{EXCLUSIVITY}</p>
      </div>
    </section>
  );
}
