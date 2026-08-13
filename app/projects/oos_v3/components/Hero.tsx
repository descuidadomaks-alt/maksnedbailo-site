"use client";

import { useEffect, useRef, useState } from "react";
import { useAudit } from "./AuditContext";
import { Dot } from "./Dot";
import { VIDEO_SRC, VIDEO_POSTER } from "../lib/config";
import { track } from "../lib/track";

/**
 * Hero + demo video, merged into one section so headline, subhead, video,
 * and the primary CTA all sit above the fold on a 390px phone with no
 * scrolling — verified in-browser at 390x740 and 360x640.
 *
 * Unlike the sibling pages' Hero (video gated behind the lead quiz — the
 * play button there opens the modal instead of actually playing), this
 * video plays freely: muted autoplay attempted on mount, a large
 * play/unmute overlay covers the two cases where that isn't enough
 * (autoplay blocked entirely, or it played muted and needs one tap for
 * sound). v3's whole pitch is "the demo proves it, not a testimonial" — the
 * video has to be watchable with zero friction, so the audit CTA below it
 * stays a separate, honest ask instead of a paywall.
 */

// Exact copy from the brief, kept as clearly-marked constants for an easy swap.
const HEADLINE = "Call your own business right now. See what your customer hears.";
const SUBHEAD =
  "Most home-service calls after 5pm go to voicemail — and the next guy books the job. Overtime OS answers every call, text, and website lead, qualifies it, and books it straight to your calendar. Managed by real people. Nothing to learn. Nobody to hire.";
const PRIMARY_CTA = "Get my free missed-call audit →";

export function Hero() {
  const { openAudit } = useAudit();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFiredPlay = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay blocked — the overlay's play button covers this case.
      });
  }, []);

  const showOverlay = !isPlaying || isMuted;

  const handleOverlayClick = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    setIsMuted(false);
    if (!isPlaying) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Still blocked — native controls (shown once unmuted) let them try again.
        });
    }
  };

  return (
    <section id="top" className="oh-grid-bg relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-5 pb-8 pt-4 text-center sm:gap-5 sm:pb-16 sm:pt-10">
        <h1 className="oh-display max-w-2xl text-[26px] leading-[1.05] text-[#171e19] sm:text-5xl sm:leading-[1.02]">
          {HEADLINE.replace(/\.$/, "")}
          <Dot />
        </h1>

        <p className="max-w-xl text-xs leading-snug text-[#171e19]/80 sm:text-base sm:leading-normal">
          {SUBHEAD}
        </p>

        <div
          id="demo"
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#171e19]/10 bg-[#171e19] shadow-2xl"
          style={{ aspectRatio: "16 / 9" }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            controls={!showOverlay}
            muted={isMuted}
            playsInline
            preload="metadata"
            onPlay={() => {
              if (hasFiredPlay.current) return;
              hasFiredPlay.current = true;
              track("demo_play", {});
            }}
            className="h-full w-full object-cover"
          />

          {showOverlay && (
            <button
              type="button"
              onClick={handleOverlayClick}
              aria-label={!isPlaying ? "Play the demo" : "Unmute the demo"}
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="absolute inset-0 bg-[#171e19]/25 transition-colors group-hover:bg-[#171e19]/15" />
              <span className="relative flex flex-col items-center gap-2">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                  {!isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="#171e19" aria-hidden className="ml-1 h-7 w-7 sm:h-8 sm:w-8">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="#171e19" aria-hidden className="h-7 w-7 sm:h-8 sm:w-8">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L18.73 21 20 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  )}
                </span>
                {isPlaying && (
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#171e19] shadow-lg">
                    Tap for sound
                  </span>
                )}
              </span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => openAudit("hero_primary")}
          className="oh-display oh-card mt-1 inline-block w-full rounded-lg bg-[#ffe17c] px-6 py-3.5 text-base text-[#171e19] shadow-xl hover:scale-[1.02] min-h-[52px] sm:w-auto sm:px-8 sm:py-3 sm:text-xl"
        >
          {PRIMARY_CTA}
        </button>
      </div>
    </section>
  );
}
