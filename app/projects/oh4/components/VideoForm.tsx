"use client";

import { useEffect, useRef, useState } from "react";
import { Dot } from "./Dot";
import { useQuiz } from "./QuizContext";
import { BOOKING_LINK, VIDEO_SRC, VIDEO_POSTER } from "../lib/config";

/**
 * Video — the centerpiece, directly under the hero. The video renders from
 * first paint (so its aspect-video box is reserved and unlocking never
 * shifts layout). Before the quiz completes it shows the poster with a plain
 * PLAY button — no lock, no gate copy — so the visitor expects to just watch
 * (clicking it opens the quiz; a "locked" look kills the click). `unlocked`
 * is shared page-wide state, set the instant the quiz completes from ANY CTA,
 * so this component just reacts to it: swaps the poster for the real controls,
 * autoplays, and reveals the book / "we'll call you" choice beneath it.
 */
export function VideoForm() {
  const { unlocked, openQuiz } = useQuiz();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAutoplayed = useRef(false);
  const [waiting, setWaiting] = useState(false);

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
            <button
              type="button"
              onClick={openQuiz}
              aria-label="Play the demo"
              className="group absolute inset-0 flex items-center justify-center"
            >
              {/* light dim only for play-button contrast — reads as "not
                  playing yet", not "locked" */}
              <span className="absolute inset-0 bg-[#171e19]/25 transition-colors group-hover:bg-[#171e19]/15" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110 sm:h-24 sm:w-24">
                <svg viewBox="0 0 24 24" fill="#171e19" aria-hidden className="ml-1 h-9 w-9 sm:h-10 sm:w-10">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {unlocked && (
          <div className="mx-auto mt-8 max-w-lg">
            {!waiting ? (
              <div className="flex flex-col gap-3">
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oh-display oh-card block w-full rounded-lg bg-[#171e19] px-8 py-4 text-lg text-white shadow-lg hover:scale-[1.02] min-h-[52px]"
                >
                  BOOK YOUR CALL NOW
                </a>
                <button
                  type="button"
                  onClick={() => setWaiting(true)}
                  className="w-full rounded-lg border border-[#171e19]/20 px-8 py-3 text-base font-medium text-[#171e19]/70 hover:bg-[#f8f9fa] min-h-[48px]"
                >
                  I&apos;ll wait for your call
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#171e19]/10 bg-[#ffe17c]/20 px-6 py-5 text-center">
                <p className="oh-display text-2xl text-[#171e19]">You&apos;re on the list<Dot /></p>
                <p className="mt-2 text-sm text-[#171e19]/70">
                  We&apos;ve got your details — we&apos;ll reach out shortly. Want to skip the wait?
                </p>
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-bold text-[#171e19] underline underline-offset-4 hover:no-underline"
                >
                  Grab a time now
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
