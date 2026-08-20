"use client";

import Image from "next/image";
import type { V2Copy } from "../lib/copy";
import { STAGE_PHOTO_SRC } from "../../lib/config";

/**
 * Section 6 — HUMAN + AI. Copy first, then a full-width photo band of a
 * real room full of real people (STAGE_PHOTO_SRC, 1400x450).
 *
 * This section argues that people matter, so the image has to BE people.
 * The previous build used the CRM-dashboard composite here, which argued
 * the opposite of the copy sitting next to it.
 *
 * It is also the leading SOLID child of the ElevatorField wrapper (see
 * V2HomeClient), which is why the background is set explicitly. Inside that
 * wrapper the dot canvas sits behind the children, so a transparent section
 * becomes a window onto the field. This one must not be — its job is to
 * occlude the shaft while the camera spins up, so that the window below it
 * is already in motion when it reaches the viewport.
 */
export default function V2HumanAi({ d }: { d: V2Copy }) {
  return (
    <section
      className="section-divider relative overflow-hidden pt-16 md:pt-24"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.humanAi.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-accent mx-auto mb-7"
          style={{ fontSize: "clamp(24px, 3vw, 42px)", lineHeight: 1.16, letterSpacing: "-0.02em", maxWidth: "24ch" }}
        >
          {d.humanAi.headline}
        </h2>

        <div className="flex flex-col gap-4 mx-auto" style={{ maxWidth: "58ch" }}>
          {d.humanAi.body.map((p, i) => (
            <p key={i} data-reveal={`d${i % 4}`} className="font-sora font-light text-fg/62 leading-[1.8]" style={{ fontSize: "14.5px" }}>
              {p}
            </p>
          ))}
        </div>

        {/* Centred to match everything else in this section — a left rule
            here pulled the quote off the section's axis. */}
        <div data-reveal className="mx-auto mt-9 pt-6 text-center" style={{ maxWidth: "48ch", borderTop: "1px solid rgba(212,255,43,0.16)" }}>
          <p className="font-sora font-light italic text-fg/55 leading-[1.6]" style={{ fontSize: "13.5px" }}>
            &quot;{d.humanAi.quote}&quot;
          </p>
          <p className="font-label mt-2" style={{ fontSize: "10px", letterSpacing: "1px", color: "rgba(240,236,230,0.35)" }}>
            {d.humanAi.quoteAttr}
          </p>
        </div>
      </div>

      {/* Full-bleed photo band — real room, real people.
          The speaker stands at the far LEFT of the 1400x450 frame, so on a
          phone the crop is anchored to the image's own left edge (0%) — at
          22% he was already being shaved off the side. Desktop keeps 34%,
          where the viewport is wide enough to hold him and the room.
          No bottom scrim — the ElevatorField shaft starts immediately after
          this band and should meet the photo edge directly. */}
      <div data-reveal className="relative w-full mt-14 md:mt-20 v3-stage-band" style={{ height: "clamp(200px, 26vw, 340px)" }}>
        <style>{`
          .v3-stage-band img { object-position: 0% 42% !important; }
          @media (min-width: 768px) {
            .v3-stage-band img { object-position: 34% 40% !important; }
          }
        `}</style>
        <Image
          src={STAGE_PHOTO_SRC}
          alt="Maks Nedbailo speaking to a room of business owners"
          fill
          sizes="100vw"
          quality={82}
          style={{ objectFit: "cover" }}
        />
        {/* Feather the top and sides into the page. The side feather is
            asymmetric on mobile: with the crop anchored at 0% the speaker is
            now hard against the left edge, and the old 0.85 scrim over the
            first 24% covered him. Mobile gets a short, light left edge and
            keeps the full right one. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none v3-stage-scrim"
        />
        <style>{`
          .v3-stage-scrim {
            background:
              linear-gradient(180deg, rgba(6,6,8,1) 0%, rgba(6,6,8,0.12) 24%, rgba(6,6,8,0) 100%),
              linear-gradient(90deg, rgba(6,6,8,0.45) 0%, rgba(6,6,8,0) 12%, rgba(6,6,8,0) 78%, rgba(6,6,8,0.85) 100%);
          }
          @media (min-width: 768px) {
            .v3-stage-scrim {
              background:
                linear-gradient(180deg, rgba(6,6,8,1) 0%, rgba(6,6,8,0.12) 24%, rgba(6,6,8,0) 100%),
                linear-gradient(90deg, rgba(6,6,8,0.85) 0%, rgba(6,6,8,0) 24%, rgba(6,6,8,0) 78%, rgba(6,6,8,0.85) 100%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
