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
 *
 * Name grammar handling:
 *  - Ukrainian has grammatical cases; different sentence positions need different forms.
 *  - pGen (genitive):  "через Влада", "зарезервовано через Влада" — used in offer/hero sentences
 *  - pNom (nominative): "Влад відправив вас сюди" — used in CTA headline, bylines
 *  - Config provides: partnerNameGenitiveUk, partnerNameUk; falls back to partnerName if absent.
 */
export default function ShortPage({ config }: { config: ShortPartnerConfig }) {
  const { locale } = usePartnerLocale();
  const d = getDict(locale);

  // Genitive form — used in "through {name}", "reserved via {name}" constructions
  const pGen =
    locale === "uk"
      ? (config.partnerNameGenitiveUk ?? config.partnerNameUk ?? config.partnerName)
      : config.partnerName;

  // Nominative form — used when the partner is the subject ("Vlad sent you here")
  const pNom =
    locale === "uk"
      ? (config.partnerNameUk ?? config.partnerName)
      : config.partnerName;

  return (
    <>
      <StickyShortCTA config={config} d={d} />

      <main className="min-h-screen" data-short-page>
        <SectionShortHero
          config={config}
          d={d}
          partnerNameForSentences={pGen}
          partnerNameDisplay={pNom}
        />
        <SectionOfferGlance
          config={config}
          d={d}
          partnerNameForSentences={pGen}
        />
        <SectionShortIndustry d={d} />
        <SectionShortProcess d={d} />
        <SectionShortProof config={config} d={d} />
        <SectionShortCTA
          config={config}
          d={d}
          partnerNameDisplay={pNom}
        />
        <SectionShortFAQ
          config={config}
          d={d}
          partnerNameForSentences={pGen}
        />
        <ShortFooter d={d} />
      </main>
    </>
  );
}
