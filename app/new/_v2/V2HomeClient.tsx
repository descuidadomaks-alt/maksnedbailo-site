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
 * The live page's wrapper holds three children in this order:
 *   SOLID 697px  ->  TRANSPARENT 805px  ->  SOLID 1144px
 * and the dots are only ever visible through the transparent middle child.
 * The leading SOLID child is the part that matters and the part two earlier
 * attempts here missed.
 *
 * getCameraY derives progress from `-rect.top / (wrapperHeight - vh)` and
 * CLAMPS it to 0 while the wrapper's top is still below the viewport top.
 * So for the first viewport-height of the wrapper's approach the camera does
 * not move at all. On the live page that clamped stretch is spent behind the
 * leading solid section, and by the time the transparent window crosses the
 * viewport bottom the wrapper is already pinned and the camera is already
 * sweeping — you see motion the instant the window opens.
 *
 * When the transparent section was the FIRST child here, that same clamped
 * stretch landed on the window itself. Measured at 1280x720: 720px of scroll
 * with progress pinned at 0, and the first ~320px of the window rendering
 * ZERO dots — the reported "big gap of black before anything happens".
 *
 * Fix: V2HumanAi moves inside the wrapper as the leading SOLID child, which
 * reproduces the live page's shape exactly:
 *   V2HumanAi SOLID  ->  V2Start TRANSPARENT  ->  V2FAQ SOLID
 * V2FinalCTA stays outside; leaving it in stretched the wrapper to 3591px
 * and dropped the camera rate to 0.43 units per scroll pixel against the
 * live page's 0.633. With it outside, travel is 2127px and the rate is
 * 0.574 — and cameraOffset/cameraSpan go back to the live page's plain
 * defaults (0 and 1) instead of tuned constants.
 *
 * Measured after the change, against "/" as the reference: at the first 80px
 * of the window being visible the live page draws 259 dots and this page
 * draws 228, and the dot-density curve tracks it the whole way down.
 *
 * If the section heights change materially, re-measure. The invariants are:
 * a full-height SOLID child must come first, exactly one child may be
 * transparent, and the camera sweep must stay inside the floor planes at
 * 40..1140.
 */
import { useNewLocale } from "../lib/locale";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getV2Copy } from "./lib/copy";
import { CTA_TARGET, CTA_TARGET_ES } from "./lib/config";
import ElevatorField from "../components/ElevatorField";
import GlitchInterrupt from "./components/GlitchInterrupt";

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

        {/* Fires once, at the hero/section-two seam. Renders a zero-height
            sentinel here and nothing else until it triggers. */}
        <GlitchInterrupt />

        <V2Problem d={d} />
        <V2Fix d={d} />
        <V2Cases d={d} />
        <V2WorldProof d={d} />
        <VoiceProof d={d} />
        {/* Read the header comment before changing this.
            V2HumanAi is the SOLID lead-in and must stay the first child —
            it is what stops the camera being frozen while the window
            scrolls into view. Only V2Start is transparent. Do not add
            `clip`, do not make V2FAQ transparent, and do not move
            V2FinalCTA back inside. */}
        <ElevatorField>
          <V2HumanAi d={d} />
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
