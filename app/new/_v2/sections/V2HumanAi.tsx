"use client";

import Image from "next/image";
import type { V2Copy } from "../lib/copy";
import { CRM_SCREENSHOT_SRC } from "../../lib/config";

/**
 * Section 6 — HUMAN + AI. Two-column on desktop (photo left, copy right),
 * stacked on mobile with the photo first. The photo is a person breaking
 * out of a CRM dashboard full of overdue tasks — it must never let the
 * (AI-garbled) dashboard UI text become legible, so it's cropped tight to
 * the figure, biased toward the upper-middle of the frame to cut the top
 * nav bar and the bottom deal list, then scrimmed hard at every edge.
 */
export default function V2HumanAi({ d }: { d: V2Copy }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full md:w-[42%] shrink-0" data-reveal>
            <div
              className="relative mx-auto rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                maxWidth: "380px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "var(--bg)",
              }}
            >
              <Image
                src={CRM_SCREENSHOT_SRC}
                alt=""
                fill
                sizes="(max-width: 768px) 80vw, 380px"
                quality={82}
                style={{ objectFit: "cover", objectPosition: "50% 32%" }}
              />
              {/* Radial scrim — fades the surrounding dashboard UI into the
                  page background so no label is ever readable. */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 58% 52% at 50% 42%, rgba(6,6,8,0) 0%, rgba(6,6,8,0.5) 58%, rgba(6,6,8,0.95) 100%)",
                }}
              />
              {/* Edge scrim — belt and braces on top/bottom/sides. */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,6,8,0.9) 0%, rgba(6,6,8,0) 26%, rgba(6,6,8,0) 66%, rgba(6,6,8,0.92) 100%), linear-gradient(90deg, rgba(6,6,8,0.75) 0%, rgba(6,6,8,0) 18%, rgba(6,6,8,0) 82%, rgba(6,6,8,0.75) 100%)",
                }}
              />
            </div>
          </div>

          <div className="w-full md:flex-1 text-center md:text-left">
            <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
              {d.humanAi.label}
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-accent mx-auto md:mx-0 mb-6"
              style={{ fontSize: "clamp(24px, 3vw, 42px)", lineHeight: 1.16, letterSpacing: "-0.02em", maxWidth: "14ch" }}
            >
              {d.humanAi.headline}
            </h2>
            <div className="flex flex-col gap-4 mx-auto md:mx-0" style={{ maxWidth: "52ch" }}>
              {d.humanAi.body.map((p, i) => (
                <p key={i} data-reveal={`d${i % 4}`} className="font-sora font-light text-fg/62 leading-[1.8]" style={{ fontSize: "14.5px" }}>
                  {p}
                </p>
              ))}
            </div>

            <div
              data-reveal
              className="mx-auto md:mx-0 mt-7 pl-4"
              style={{ maxWidth: "52ch", borderLeft: "2px solid rgba(212,255,43,0.18)" }}
            >
              <p className="font-sora font-light italic text-fg/50 leading-[1.6]" style={{ fontSize: "13px" }}>
                &ldquo;{d.humanAi.quote}&rdquo;
              </p>
              <p className="font-label mt-1.5" style={{ fontSize: "10px", letterSpacing: "1px", color: "rgba(240,236,230,0.35)" }}>
                {d.humanAi.quoteAttr}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
