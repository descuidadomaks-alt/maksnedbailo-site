"use client";

import { useDirectLocale } from "./lib/locale";
import { getDirectDict } from "./lib/directi18n";
import DirectHero from "./sections/DirectHero";
import DirectProblem from "./sections/DirectProblem";
import DirectOffer from "./sections/DirectOffer";
import DirectGuarantee from "./sections/DirectGuarantee";
import DirectIndustry from "./sections/DirectIndustry";
import ProofSection from "@/app/new/sections/ProofSection";
import { getNewDict } from "@/app/new/lib/i18n";
import DirectClose from "./sections/DirectClose";
import DirectProcess from "./sections/DirectProcess";
import DirectFAQ from "./sections/DirectFAQ";
import DirectFinalCTA from "./sections/DirectFinalCTA";
import DirectStickyCTA from "./sections/DirectStickyCTA";
import NewFooter from "@/app/new/sections/NewFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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
  const newLocale = locale === "es" ? "es" : "en";
  const newD = getNewDict(newLocale);
  const ctaTarget = newLocale === "es" ? "/ai-map?lang=es" : "/ai-map";

  return (
    <>
      <DirectStickyCTA d={d} />

      <main className="min-h-screen pb-28 md:pb-0" data-short-page>
        <DirectHero d={d} />
        <DirectProblem d={d} />
        {/* DirectOffer receives locale for ES pillar pain labels */}
        <DirectOffer d={d} locale={locale} />
        <DirectIndustry d={d} />
        {/* Newer proof section (visual previews + industry strip) shared with
            the homepage — replaces the old text-only DirectProof. */}
        <ProofSection d={newD} />
        <DirectProcess d={d} />
        <DirectGuarantee d={d} />
        <DirectClose d={d} />
        <DirectFAQ d={d} />
        <DirectFinalCTA d={d} />
      </main>

      <NewFooter d={newD} locale={newLocale} ctaTarget={ctaTarget} />
      <FloatingWhatsApp />
    </>
  );
}
