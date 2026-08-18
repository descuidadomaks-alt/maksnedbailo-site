"use client";

/**
 * /new V3 — experimental homepage (client component).
 *
 * Hero (animated lead flow) -> sound familiar (+ two facts) -> what we fix
 * (three compact visuals) -> working systems -> world proof -> human + AI
 * -> [ ElevatorField: cost of not looking -> how we start -> FAQ ] ->
 * final CTA -> footer. See docs/NEW-HOMEPAGE-V3-BRIEF.md.
 *
 * ── The ElevatorField block, and why it is shaped like this ──
 * ElevatorField renders a `position: sticky`, 100vh canvas that is pulled
 * out of flow with `margin-bottom: -100vh` (see .elevator-canvas in
 * globals.css). A sticky element only travels while its WRAPPER is taller
 * than the viewport: getCameraY() computes
 *     scrollable = wrapper.height - window.innerHeight
 * and falls back to a degenerate whole-viewport-pass formula when that is
 * <= 0. Wrapping a single 100vh section therefore pinned the camera and
 * produced the stutter (dots visible mid-section, then a jump, then half a
 * section with no field at all).
 *
 * The wrapper must stay well over 200vh on both breakpoints:
 *
 *   V2Start     TRANSPARENT     -> dots drift behind the offer panel
 *   V2FAQ       solid var(--bg) -> occludes the field, adds travel
 *   V2FinalCTA  TRANSPARENT     -> dots still moving under the closing ask
 *
 * V2FinalCTA has to live INSIDE the wrapper. Outside it, the canvas had
 * already stopped updating by the time that section scrolled in, so the
 * dots behind it were frozen.
 *
 * The band above (V2HumanAi's photo) has no bottom scrim, so the shaft
 * opens directly off the edge of the photograph.
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

        {/* Read the header comment before changing what sits in here. */}
        <ElevatorField>
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
