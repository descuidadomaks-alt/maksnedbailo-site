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
 */
export default function V2HumanAi({ d }: { d: V2Copy }) {
  return (
    <section className="section-divider relative overflow-hidden pt-16 md:pt-24">
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.humanAi.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-accent mx-auto mb-7"
          style={{ fontSize: "clamp(24px, 3vw, 42px)", lineHeight: 1.16, letterSpacing: "-0.02em", maxWidth: "14ch" }}
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

        <div
          data-reveal
          className="mx-auto mt-8 pl-4 text-left"
          style={{ maxWidth: "46ch", borderLeft: "2px solid rgba(212,255,43,0.2)" }}
        >
          <p className="font-sora font-light italic text-fg/55 leading-[1.6]" style={{ fontSize: "13px" }}>
            &ldquo;{d.humanAi.quote}&rdquo;
          </p>
          <p className="font-label mt-1.5" style={{ fontSize: "10px", letterSpacing: "1px", color: "rgba(240,236,230,0.35)" }}>
            {d.humanAi.quoteAttr}
          </p>
        </div>
      </div>

      {/* Full-bleed photo band — real room, real people. */}
      <div data-reveal className="relative w-full mt-14 md:mt-20" style={{ height: "clamp(190px, 26vw, 340px)" }}>
        <Image
          src={STAGE_PHOTO_SRC}
          alt="Maks Nedbailo speaking to a room of business owners"
          fill
          sizes="100vw"
          quality={82}
          style={{ objectFit: "cover", objectPosition: "center 42%" }}
        />
        {/* Feather the band into the page on all four edges. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,6,8,1) 0%, rgba(6,6,8,0.15) 26%, rgba(6,6,8,0.2) 70%, rgba(6,6,8,1) 100%), linear-gradient(90deg, rgba(6,6,8,0.9) 0%, rgba(6,6,8,0) 22%, rgba(6,6,8,0) 78%, rgba(6,6,8,0.9) 100%)",
          }}
        />
      </div>
    </section>
  );
}
