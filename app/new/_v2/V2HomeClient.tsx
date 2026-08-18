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
 * produced the reported stutter (dots visible mid-section, then a jump,
 * then half a section with no field at all).
 *
 * So the wrapper must span roughly three screens, exactly like the live
 * homepage's <ElevatorField><Belief /><BottleneckMap /></ElevatorField>:
 *
 *   V2Bridge  solid var(--bg)  -> occludes the field, gives travel above
 *   V2Start   TRANSPARENT      -> the one window the dots show through
 *   V2FAQ     solid var(--bg)  -> occludes the field, gives travel below
 *
 * If you add or remove a section here, keep that solid / transparent /
 * solid sandwich and keep the wrapper well over 200vh on both breakpoints,
 * or the scroll-linked camera will break again.
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
import V2Bridge from "./sections/V2Bridge";
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
          <V2Bridge d={d} />
          <V2Start d={d} ctaHref={ctaHref} />
          <V2FAQ d={d} />
        </ElevatorField>

        <V2FinalCTA d={d} ctaHref={ctaHref} />
      </main>
      <V2Footer d={d} ctaHref={ctaHref} />
      <FloatingWhatsApp />
    </>
  );
}
