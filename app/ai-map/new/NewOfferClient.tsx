"use client";

/**
 * /ai-map - free, permanent AI Map offer page (client component).
 *
 * Renders inside the existing /ai-map segment chrome (app/ai-map/layout.tsx
 * -> DirectLocaleWrapper -> shared NewHeader + GlobalTicker, analytics,
 * ScrollReveal), so it brings no header or locale provider of its own.
 *
 * ── Proof sections are shared with the homepage, on purpose ──
 * The middle of this page used to render app/new/sections/ProofSection and
 * app/new/sections/NewFooter, both of which belong to the ARCHIVED
 * Bottleneck Map homepage and are driven by app/new/lib/i18n.ts. That file
 * is now archive-only copy, and it still carries ~180 em dashes, en dashes
 * and curly quotes. Pulling it into a page we want indexed would have
 * undone the copy pass and shown a visitor a different proof treatment on
 * the two pages they see back to back.
 *
 * So this page now renders the homepage's own V2Cases and V2WorldProof,
 * fed from app/new/_v2/lib/copy.ts - the same components, the same copy
 * source, the same lockups. One place to edit a case, both pages update,
 * and no duplicate-but-slightly-different proof text for a crawler to
 * weigh against itself.
 *
 * V2Cases, V2WorldProof and V2Footer all take the copy dict as a plain
 * prop and use no locale hook, which is what makes them reusable here
 * under DirectLocaleProvider instead of NewLocaleProvider.
 */
import { useDirectLocale } from "../lib/locale";
import { PHASE1_ANCHOR } from "../lib/config";
import { getNewOfferCopy } from "./lib/copy";

import { getV2Copy } from "@/app/new/_v2/lib/copy";
import V2Cases from "@/app/new/_v2/sections/V2Cases";
import V2WorldProof from "@/app/new/_v2/sections/V2WorldProof";
import V2Footer from "@/app/new/_v2/sections/V2Footer";
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
  const v2 = getV2Copy(locale2);

  // Footer nav points at this page itself, which is the AI Map page after
  // the promotion. The booking CTAs import CHECKOUT_URL themselves.
  const footerCtaTarget = locale2 === "es" ? "/ai-map?lang=es" : "/ai-map";

  return (
    <>
      <main className="min-h-screen pb-28 md:pb-0" data-short-page>
        <NewOfferHero d={d} />
        <NewOfferProblem d={d} />
        <NewOfferProcess d={d} />

        {/* Same proof pair, same order, as the homepage: our own live
            systems first, then the same pattern at company scale. */}
        <V2Cases d={v2} />
        <V2WorldProof d={v2} />

        <NewOfferTrust d={d} />
        <NewOfferFAQ d={d} />
        <NewOfferFinalCTA d={d} />
      </main>

      <V2Footer d={v2} ctaHref={footerCtaTarget} />
      <FloatingWhatsApp />
    </>
  );
}
