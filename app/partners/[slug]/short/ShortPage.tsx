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
import SectionBottleneckScore from "./SectionBottleneckScore";
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

  // Genitive form — used in "from {name}'s circle" (із кола {name}) constructions
  const pGen =
    locale === "uk"
      ? (config.partnerNameGenitiveUk ?? config.partnerNameUk ?? config.partnerName)
      : config.partnerName;

  // Accusative form — used after "через" ("reserved through {name}"). For
  // masculine animate names this equals the genitive, so they fall back to it.
  const pAcc =
    locale === "uk"
      ? (config.partnerNameAccusativeUk ?? config.partnerNameGenitiveUk ?? config.partnerNameUk ?? config.partnerName)
      : config.partnerName;

  // Nominative form — used when the partner is the subject ("Vlad sent you here")
  const pNom =
    locale === "uk"
      ? (config.partnerNameUk ?? config.partnerName)
      : config.partnerName;

  return (
    <>
      <StickyShortCTA config={config} d={d} />

      {/* pb-28 on mobile ensures last section never sits flush against browser chrome
          (accounts for sticky CTA bar height + safe area) */}
      <main className="min-h-screen pb-28 md:pb-0" data-short-page>
        <SectionShortHero
          config={config}
          d={d}
          partnerNameForSentences={pGen}
          partnerNameAccusative={pAcc}
          partnerNameDisplay={pNom}
        />
        <SectionOfferGlance
          config={config}
          d={d}
          partnerNameForSentences={pAcc}
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
          partnerNameForSentences={pNom}
        />
        <SectionBottleneckScore d={d} />
        <ShortFooter d={d} />
      </main>
    </>
  );
}
