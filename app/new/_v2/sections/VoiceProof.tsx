"use client";

import type { V2Copy } from "../lib/copy";
import { VOICE_AGENT_ENABLED } from "../lib/config";
import { VOICE_DEMO_ANCHOR } from "../../lib/config";

/**
 * Section — VOICE AGENT PROOF (plug-in point).
 *
 * Not built yet. This is the architecture: a real, isolated section with a
 * stable anchor id (matches VOICE_DEMO_ANCHOR, "#voice-demo" — the same id
 * the existing proof cards on / and /ai-map already link to) and a single
 * flag gating whether it renders.
 *
 * To wire in the real agent later:
 *   1. Flip VOICE_AGENT_ENABLED to true in app/new/_v2/lib/config.ts
 *   2. Drop the widget/embed into the marked mount point below — no other
 *      changes needed, headline/sub/cta already pull from the copy dict.
 *
 * Placed directly after the Proof section (V2Proof.tsx) — the most natural
 * home for "don't take our word for it, talk to one" once it's live. Off
 * for now: an empty placeholder card would read as unfinished, so this
 * renders nothing until there's something real to show.
 */
export default function VoiceProof({ d }: { d: V2Copy }) {
  if (!VOICE_AGENT_ENABLED) return null;

  const anchorId = VOICE_DEMO_ANCHOR.replace("#", "");

  return (
    <section id={anchorId} className="section-divider relative overflow-hidden py-16 md:py-24">
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.voice.eyebrow}
        </p>
        <h2 data-reveal className="font-playfair font-normal text-fg mx-auto mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "18ch" }}>
          {d.voice.headline}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/55 mx-auto mb-10" style={{ fontSize: "14px", maxWidth: "48ch" }}>
          {d.voice.sub}
        </p>

        {/* Mount point for the real voice widget/embed. */}
        <div
          data-reveal
          className="rounded-2xl border border-white/[0.06] bg-white/[0.012] flex items-center justify-center"
          style={{ minHeight: "180px" }}
        >
          <button
            type="button"
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03]"
            style={{ fontSize: "15px", padding: "18px 32px", minHeight: "60px", letterSpacing: "-0.01em" }}
          >
            {d.voice.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
