"use client";

/**
 * /new V3 — experimental homepage (client component).
 *
 * Hero (animated lead flow) -> sound familiar (+ two facts) -> what we fix
 * (three compact visuals) -> working systems -> world proof -> human + AI
 * -> [ ElevatorField: cost of not looking -> how we start -> FAQ ] ->
 * final CTA -> footer. See docs/NEW-HOMEPAGE-V3-BRIEF.md.
 *
 * ── The ElevatorField block — copied from how the live "/" homepage does it ──
 *
 * Measured on "/" at 1280x900: sticky canvas, wrapper 2840px (3.16
 * viewports), 1940px of scroll travel, and its three children run
 * SOLID (793px) -> TRANSPARENT (900px) -> SOLID (1147px). Dots are only
 * ever visible through the transparent middle child; the wrapper is tall
 * purely so the sticky canvas has room to move smoothly. That works out
 * to ~0.63 camera units per pixel of scroll, which is the number that
 * makes the motion feel continuous.
 *
 * Two earlier attempts got this wrong:
 *  - `clip` mode (absolute canvas sized to one section) gave a 259px
 *    scroll range for the full camera sweep, i.e. ~4.7 units/px. Progress
 *    clamps at 0 and 1 outside that range, which is precisely the
 *    "static, then a violent rush, then static again" behaviour.
 *  - Making the FAQ transparent turned the neighbours into windows too.
 *
 * So: the wrapper spans all three sections for TRAVEL, but only V2Start is
 * transparent, so only V2Start shows the field. V2FAQ and V2FinalCTA paint
 * solid var(--bg) and must keep doing so. Because the sticky canvas is
 * 100vh and V2Start is 100vh, the field lands exactly on that section.
 *
 * cameraSpan 0.86 over ~1806px of travel gives ~0.58 units/px, within a
 * tenth of the live page's 0.629; cameraOffset 0.07 keeps the sweep
 * (65..1115) inside the floor planes, which span 40..1140. If the section
 * heights change materially, re-measure travel and retune both so the rate
 * stays near 0.6 and the sweep stays inside 40..1140.
 */
import { useNewLocale } from "../lib/locale";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getV2Copy } from "./lib/copy";
import { CTA_TARGET, CTA_TARGET_ES } from "./lib/config";
import ElevatorField from "../components/ElevatorField";

import V2Hero from "./sections/V2Hero";
import V2Problem from "./sections/V2Problem";
import V2Fix from "./sections/V2Fix";
import V2Cases from "./sections/V2Cases";
import V2WorldProof from "./sections/V2WorldProof";
import VoiceProof from "./sections/VoiceProof";
import V2HumanAi from "./sections/V2HumanAi";
import V2Start from "./sections/V2Start";
import V2FAQ from "./sections/V2FAQ";
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
        <V2Cases d={d} />
        <V2WorldProof d={d} />
        <VoiceProof d={d} />
        <V2HumanAi d={d} />

        {/* Read the header comment before changing this. All three sections
            are inside for scroll TRAVEL, but only V2Start is transparent, so
            only V2Start shows the dot field. Do not add `clip` and do not
            make V2FAQ or V2FinalCTA transparent. */}
        <ElevatorField cameraOffset={0.07} cameraSpan={0.86}>
          <V2Start d={d} ctaHref={ctaHref} />
          <V2FAQ d={d} />
          <V2FinalCTA d={d} ctaHref={ctaHref} />
        </ElevatorField>
      </main>
      <V2Footer d={d} ctaHref={ctaHref} />
      <FloatingWhatsApp />
    </>
  );
}
