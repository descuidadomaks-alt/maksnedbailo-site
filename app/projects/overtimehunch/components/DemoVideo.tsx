"use client";

import { useGate } from "./GateContext";
import { GateForm } from "./GateForm";
import { BOOKING_LINK, VIDEO_EMBED } from "../lib/config";

/**
 * Section 4 — gated centerpiece. Locked = inline 4-field form. Unlocked =
 * 16:9 video (placeholder play button until VIDEO_EMBED is set) + Book Your
 * Call. Shares gate state with every CTA on the page.
 */
export function DemoVideo() {
  const { unlocked } = useGate();

  return (
    <section id="demo" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="oh-display text-4xl text-[#171e19] sm:text-6xl">
          Hear it answer a lead — and book the job.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#171e19]/70">
          This is the real system. A lead calls in, the AI qualifies them, and books the
          appointment — in real time.
        </p>

        <div className="mt-10">
          {!unlocked ? (
            <div className="oh-card mx-auto max-w-lg rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-6 text-left shadow-xl sm:p-8">
              <p className="oh-display mb-1 text-center text-2xl text-[#171e19]">
                Watch it answer a real lead
              </p>
              <p className="mb-5 text-center text-sm text-[#171e19]/60">
                Drop your details and the demo plays right now.
              </p>
              <GateForm ctaLabel="WATCH IT NOW →" compact />
            </div>
          ) : (
            <div>
              <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl border border-[#171e19]/10 bg-[#171e19] shadow-2xl">
                {VIDEO_EMBED ? (
                  <iframe
                    src={VIDEO_EMBED}
                    title="Overtime Hunch demo"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-white/80">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffe17c] text-3xl text-[#171e19] shadow-lg">
                      ▶
                    </span>
                    <p className="text-sm">Demo video — 90 seconds</p>
                  </div>
                )}
              </div>

              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="oh-display oh-card mt-8 inline-block rounded-lg bg-[#171e19] px-8 py-4 text-xl text-white shadow-xl hover:scale-105 min-h-[56px]"
              >
                Book your call
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
