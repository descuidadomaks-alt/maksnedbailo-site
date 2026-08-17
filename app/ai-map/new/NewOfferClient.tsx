"use client";

/**
 * /ai-map/new — free, permanent AI Map offer page (client component).
 *
 * Reuses the existing /ai-map segment chrome (app/ai-map/layout.tsx →
 * DirectLocaleWrapper → shared NewHeader, CTA already pointed at
 * CHECKOUT_URL) and the DirectLocaleProvider locale context — no new
 * locale system needed. Also reuses the shared ProofSection and NewFooter
 * components (both already used by / and /ai-map) for real, non-fabricated
 * proof content and consistent footer chrome.
 */
import { useDirectLocale } from "../lib/locale";
import { PHASE1_ANCHOR } from "../lib/config";
import { getNewOfferCopy } from "./lib/copy";
import { CHECKOUT_URL } from "../lib/config";

import ProofSection from "@/app/new/sections/ProofSection";
import NewFooter from "@/app/new/sections/NewFooter";
import { getNewDict } from "@/app/new/lib/i18n";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import NewOfferHero from "./sections/NewOfferHero";
import NewOfferProblem from "./sections/NewOfferProblem";
import NewOfferProcess from "./sections/NewOfferProcess";
import NewOfferTrust from "./sections/NewOfferTrust";
import NewOfferFAQ from "./sections/NewOfferFAQ";
import NewOfferFinalCTA from "./sections/NewOfferFinalCTA";

export default function NewOfferClient() {
  const { locale } = useDirectLocale();
  const locale2 = locale === "es" ? "es" : "en";
  const d = getNewOfferCopy(locale2, PHASE1_ANCHOR);

  const newD = getNewDict(locale2);
  const proof = {
    ...newD.proof,
    ctaLabel: locale2 === "es" ? "Reserva tu AI Map gratis" : "Book your free AI Map",
  };

  const footerCtaTarget = locale2 === "es" ? "/ai-map/new?lang=es" : "/ai-map/new";

  return (
    <>
      <main className="min-h-screen pb-28 md:pb-0" data-short-page>
        <NewOfferHero d={d} />
        <NewOfferProblem d={d} />
        <NewOfferProcess d={d} />
        <ProofSection proof={proof} scoreHref={CHECKOUT_URL} />
        <NewOfferTrust d={d} />
        <NewOfferFAQ d={d} />
        <NewOfferFinalCTA d={d} />
      </main>

      <NewFooter d={newD} locale={locale2} ctaTarget={footerCtaTarget} />
      <FloatingWhatsApp />
    </>
  );
}
