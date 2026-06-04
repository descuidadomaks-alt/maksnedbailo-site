"use client";

import { useDirectLocale } from "./lib/locale";
import { getDirectDict } from "./lib/directi18n";
import DirectHero from "./sections/DirectHero";
import DirectProblem from "./sections/DirectProblem";
import DirectOffer from "./sections/DirectOffer";
import DirectGuarantee from "./sections/DirectGuarantee";
import DirectIndustry from "./sections/DirectIndustry";
import DirectProof from "./sections/DirectProof";
import DirectClose from "./sections/DirectClose";
import DirectProcess from "./sections/DirectProcess";
import DirectFAQ from "./sections/DirectFAQ";
import DirectFinalCTA from "./sections/DirectFinalCTA";
import DirectStickyCTA from "./sections/DirectStickyCTA";

/**
 * Direct sales page — /ai-map
 * Locales: EN (default) · ES · УК
 *
 * Complimentary phase (active until June 15):
 *  - CHECKOUT_URL → zcal booking (no payment)
 *  - Price block shows "Complimentary until June 15" (paid block commented out)
 *  - FAQ merged: "It's free — what's the catch?" replaces the two paid-price questions
 *  - Guarantee: no "pay nothing" phrasing — honest "yours either way"
 *
 * To restore paid phase after June 15:
 *  1. Update CHECKOUT_URL in lib/config.ts to Stripe Payment Link
 *  2. Uncomment PAID sections in DirectHero, DirectOffer, DirectClose, DirectFAQ
 *  3. Swap compChip/compPriceLabel → priceChip/currentPriceLabel in hero
 */
export default function DirectPage() {
  const { locale } = useDirectLocale();
  const d = getDirectDict(locale);

  return (
    <>
      <DirectStickyCTA d={d} />

      <main className="min-h-screen pb-28 md:pb-0" data-short-page>
        <DirectHero d={d} />
        <DirectProblem d={d} />
        {/* DirectOffer receives locale for ES pillar pain labels */}
        <DirectOffer d={d} locale={locale} />
        <DirectIndustry d={d} />
        <DirectProof d={d} />
        <DirectProcess d={d} />
        <DirectGuarantee d={d} />
        <DirectClose d={d} />
        <DirectFAQ d={d} />
        <DirectFinalCTA d={d} />

        <footer className="border-t px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt={d.footer.credit} style={{ height: "20px", opacity: 0.35 }} />
          <p className="font-sora font-light text-fg/20" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
            {d.footer.credit} · {d.footer.location}
          </p>
        </footer>
      </main>
    </>
  );
}
