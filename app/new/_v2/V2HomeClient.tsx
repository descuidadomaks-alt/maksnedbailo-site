"use client";

/**
 * /new V2 — experimental homepage (client component).
 *
 * Composes the tightened, non-founder-bottleneck positioning: hero -> the
 * problem -> what we fix -> proof (+ voice-agent plug-in point) -> human+AI
 * -> how we start -> final CTA -> footer. See docs/NEW-HOMEPAGE-V2-BRIEF.md
 * for the full brief this was built from.
 *
 * Everything specific to V2 lives under app/new/_v2/ (a Next.js private
 * folder — the leading underscore excludes it from routing). The rest of
 * app/new/** (sections, components, lib) is the live "/" homepage's source
 * and is read-only from here.
 */
import { useNewLocale } from "../lib/locale";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getV2Copy } from "./lib/copy";
import { CTA_TARGET, CTA_TARGET_ES } from "./lib/config";

import V2Hero from "./sections/V2Hero";
import V2Problem from "./sections/V2Problem";
import V2Fix from "./sections/V2Fix";
import V2Proof from "./sections/V2Proof";
import VoiceProof from "./sections/VoiceProof";
import V2HumanAi from "./sections/V2HumanAi";
import V2Start from "./sections/V2Start";
import V2FinalCTA from "./sections/V2FinalCTA";
import V2Footer from "./sections/V2Footer";

export default function V2HomeClient() {
  const { locale } = useNewLocale();
  const d = getV2Copy(locale);
  const ctaHref = locale === "es" ? CTA_TARGET_ES : CTA_TARGET;

  return (
    <>
      <main data-short-page>
        <V2Hero d={d} primaryCtaHref={ctaHref} />
        <V2Problem d={d} />
        <V2Fix d={d} />
        <V2Proof d={d} locale={locale} ctaHref={ctaHref} />
        <VoiceProof d={d} />
        <V2HumanAi d={d} />
        <V2Start d={d} ctaHref={ctaHref} />
        <V2FinalCTA d={d} ctaHref={ctaHref} />
      </main>
      <V2Footer d={d} ctaHref={ctaHref} />
      <FloatingWhatsApp />
    </>
  );
}
