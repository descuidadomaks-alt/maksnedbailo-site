"use client";

import type { ShortPartnerConfig } from "@/content/partners/index";
import { getDict } from "../lib/i18n";
import { usePartnerLocale } from "../lib/partner-locale";
import SectionShortHero from "./SectionShortHero";
import SectionOfferGlance from "./SectionOfferGlance";
import SectionShortIndustry from "./SectionShortIndustry";
import SectionShortProcess from "./SectionShortProcess";
import SectionShortProof from "./SectionShortProof";
import SectionShortCTA from "./SectionShortCTA";
import SectionShortFAQ from "./SectionShortFAQ";
import ShortFooter from "./ShortFooter";
import StickyShortCTA from "./StickyShortCTA";

/**
 * Short-form partner page — ≤ 8 visible sections.
 * All "long-form" substance lives in the FAQ accordion at the bottom.
 *
 * Section order:
 *  1. Hero
 *  2. Offer at a Glance
 *  3. Industry tabs
 *  4. How it works (3 steps)
 *  5. Proof (partner quote + 2 live builds)
 *  6. Final CTA
 *  7. FAQ accordion (everything else)
 *  8. Footer
 */
export default function ShortPage({ config }: { config: ShortPartnerConfig }) {
  const { locale } = usePartnerLocale();
  const d = getDict(locale);

  return (
    <>
      <StickyShortCTA config={config} d={d} />

      <main className="min-h-screen">
        <SectionShortHero config={config} d={d} />
        <SectionOfferGlance config={config} d={d} />
        <SectionShortIndustry d={d} />
        <SectionShortProcess d={d} />
        <SectionShortProof config={config} d={d} />
        <SectionShortCTA config={config} d={d} />
        <SectionShortFAQ config={config} d={d} />
        <ShortFooter d={d} />
      </main>
    </>
  );
}
