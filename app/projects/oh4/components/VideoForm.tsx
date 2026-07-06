"use client";

import { useEffect, useRef } from "react";
import { Dot } from "./Dot";
import { useQuiz } from "./QuizContext";
import { BOOKING_LINK, VIDEO_SRC, VIDEO_POSTER } from "../lib/config";

/**
 * Video — the centerpiece, directly under the hero. The video renders from
 * first paint (so its aspect-video box is reserved and unlocking never
 * shifts layout) but sits under a dimmed/blurred poster with a lock icon
 * until the quiz (QuizContext) completes. `unlocked` is shared page-wide
 * state — the quiz can be opened and finished from ANY CTA on the page, not
 * just this section, so this component just reacts to it.
 */
export function VideoForm() {
  const { unlocked, openQuiz } = useQuiz();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAutoplayed = useRef(false);

  useEffect(() => {
    if (!unlocked || hasAutoplayed.current) return;
    hasAutoplayed.current = true;
    // This fires off the quiz's final-step click (the same user gesture),
    // so browsers allow the resulting play() unmuted.
    videoRef.current?.play().catch(() => {
      // Autoplay can still be blocked in some conditions — native controls
      // are visible once unlocked, so the visitor can just press play.
    });
  }, [unlocked]);

  return (
    <section id="demo" className="scroll-mt-24 bg-white pt-6 pb-16 sm:pt-10 sm:pb-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="oh-display text-4xl text-[#171e19] sm:text-6xl">
          Watch it book a real job<Dot />
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#171e19]/70">
          A real call, answered, qualified, and booked — while the owner keeps working.
        </p>

        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-[#171e19]/10 bg-[#171e19] shadow-2xl">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            controls={unlocked}
            playsInline
            preload="metadata"
            width={1280}
            height={720}
            className="h-full w-full object-cover"
          />

          {!unlocked && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${VIDEO_POSTER})` }}
            >
              <div className="absolute inset-0 bg-[#171e19]/60 backdrop-blur-sm" />
              <button type="button" onClick={openQuiz} className="relative flex flex-col items-center gap-3 px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe17c] shadow-xl">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-7 w-7">
                    <rect x="5" y="10.5" width="14" height="9.5" rx="2" fill="#171e19" />
                    <path
                      d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
                      stroke="#171e19"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="oh-display max-w-[16ch] text-lg text-white sm:text-xl">
                  Drop your details — the demo plays right now.
                </span>
                <span className="oh-card mt-1 inline-block rounded-lg bg-[#ffe17c] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#171e19] shadow-lg hover:scale-105">
                  Unlock the demo
                </span>
              </button>
            </div>
          )}
        </div>

        {unlocked && (
          <div className="mx-auto mt-8 max-w-lg">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oh-display oh-card inline-block w-full rounded-lg bg-[#171e19] px-8 py-4 text-lg text-white shadow-lg hover:scale-105 min-h-[52px]"
            >
              BOOK YOUR CALL
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
