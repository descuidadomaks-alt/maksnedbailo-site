"use client";

import { useRef, useState } from "react";
import { GateForm } from "./GateForm";
import { Dot } from "./Dot";
import { GeoPin } from "./GeoPin";
import { useLocation } from "./LocationContext";
import { trackPixelEvent } from "./MetaPixel";
import { BOOKING_LINK, VIDEO_SRC, VIDEO_POSTER, SCARCITY_LINE } from "../lib/config";

/**
 * Video + form — the centerpiece, directly under the hero. The demo is now
 * GATED: the video renders from first paint (so its aspect-video box is
 * reserved and unlocking never shifts layout) but sits under a dimmed/
 * blurred poster with a lock icon until the 4-field form is submitted.
 * Submitting fires the Lead pixel (GateContext.submitLead), unlocks +
 * autoplays the video, fires ViewContent, and reveals a "Book Your Call"
 * button beneath it — no page reload, no redirect.
 */
export function VideoForm() {
  const location = useLocation();
  const [unlocked, setUnlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUnlock = () => {
    setUnlocked(true);
    trackPixelEvent("ViewContent");
    // This runs synchronously off the form-submit click, so browsers treat
    // the resulting play() as user-initiated and allow it unmuted.
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        // Autoplay can still be blocked in some conditions — native controls
        // are visible once unlocked, so the visitor can just press play.
      });
    });
  };

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
              <div className="relative flex flex-col items-center gap-3 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe17c] shadow-xl">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-7 w-7">
                    <rect x="5" y="10.5" width="14" height="9.5" rx="2" fill="#171e19" />
                    <path
                      d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
                      stroke="#171e19"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M11 14.5l2 1.3-2 1.3v-2.6z" fill="#ffe17c" />
                  </svg>
                </div>
                <p className="oh-display max-w-[16ch] text-lg text-white sm:text-xl">
                  Drop your details — the demo plays right now.
                </p>
              </div>
            </div>
          )}
        </div>

        <div id="book-call-form" className="mx-auto mt-8 max-w-lg scroll-mt-24 text-left">
          {!unlocked ? (
            <div className="oh-card rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-6 shadow-xl sm:p-8">
              <p className="oh-display mb-1 text-center text-2xl text-[#171e19]">
                See it working for your business
              </p>
              <p className="mb-3 text-center text-sm text-[#171e19]/60">
                Drop your details and we&apos;ll show you how it&apos;d run for your business.
              </p>
              <p className="mb-5 flex items-center justify-center gap-1.5 text-center text-xs font-bold text-[#171e19]">
                <GeoPin />
                {SCARCITY_LINE(location)}
              </p>
              <GateForm ctaLabel="UNLOCK THE DEMO" compact onSubmitted={handleUnlock} />
            </div>
          ) : (
            <div className="oh-card rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-8 text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe17c] text-3xl">
                ✓
              </div>
              <p className="oh-display text-2xl text-[#171e19]">Demo unlocked<Dot /></p>
              <p className="mt-2 text-sm text-[#171e19]/60">
                Watch it above, then grab a time on the calendar.
              </p>
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="oh-display oh-card mt-5 inline-block rounded-lg bg-[#171e19] px-8 py-4 text-lg text-white shadow-lg hover:scale-105 min-h-[52px]"
              >
                BOOK YOUR CALL
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
