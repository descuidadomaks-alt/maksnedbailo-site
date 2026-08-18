"use client";

/**
 * /new V3 — experimental homepage (client component).
 *
 * Hero (animated lead flow) -> sound familiar (+ two facts) -> what we fix
 * (three compact visuals) -> working systems -> world proof -> human + AI
 * -> [ ElevatorField: cost of not looking -> how we start -> FAQ ] ->
 * final CTA -> footer. See docs/NEW-HOMEPAGE-V3-BRIEF.md.
 *
 * ── The ElevatorField block ──
 * EXACTLY ONE section gets the dot field: V2Start. V2FAQ and V2FinalCTA
 * paint their own solid var(--bg) and must keep doing so, so nothing shows
 * through behind them.
 *
 * `clip` is the key prop. ElevatorField has two modes:
 *
 *   default  a `position: sticky` 100vh canvas pulled out of flow with
 *            margin-bottom:-100vh. It only travels while the WRAPPER is
 *            much taller than the viewport, so it needs several stacked
 *            sections. Used by the live homepage.
 *   clip     an `position: absolute; inset: 0` canvas that fills the
 *            wrapper and is clipped to it. The field's vanishing point is
 *            the canvas centre, so it lands on THIS SECTION's own centre,
 *            and no dots leak into the neighbours.
 *
 * clip is the correct mode for a single section and is what the /ai-map
 * Problem section already uses. It also changes how progress is computed:
 * with a wrapper shorter than the scrollable range, getCameraY falls back
 * to progress across the section's pass through the viewport, which is
 * exactly the wanted behaviour — dots are already drifting the moment the
 * section's top edge appears, keep moving all the way through, and are
 * gone with the section.
 *
 * cameraOffset/cameraSpan keep the sweep inside the floor planes
 * (PLANES_Y spans 40..1140 in world units; the default 0/1 sweep runs
 * -20..1200 and so starts and ends in empty space, which was the blank
 * stretch). 0.3/0.5 confines it to roughly 346..956.
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

        {/* Read the header comment before changing this. ONLY V2Start goes
            inside, and `clip` is required — see above. */}
        <ElevatorField clip cameraOffset={0.3} cameraSpan={0.5}>
          <V2Start d={d} ctaHref={ctaHref} />
        </ElevatorField>

        <V2FAQ d={d} />
        <V2FinalCTA d={d} ctaHref={ctaHref} />
      </main>
      <V2Footer d={d} ctaHref={ctaHref} />
      <FloatingWhatsApp />
    </>
  );
}
