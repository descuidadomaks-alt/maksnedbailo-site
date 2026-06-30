"use client";

import { useState } from "react";
import { GateForm } from "./GateForm";
import { BOOKING_LINK, VIDEO_EMBED } from "../lib/config";

/**
 * Demo section — UN-gated. The video is always visible (it shows motion the
 * moment a real file is set in VIDEO_EMBED), and the form is a book-a-call
 * capture rather than a gate. Order: headline → sub → form → video.
 *
 * On submit we post the lead and route the visitor to BOOKING_LINK (new tab),
 * then swap the form for a thank-you state with a booking-link fallback in
 * case the tab was blocked.
 */
export function DemoVideo() {
  const [booked, setBooked] = useState(false);

  const goToBooking = () => {
    if (typeof window !== "undefined") {
      window.open(BOOKING_LINK, "_blank", "noopener,noreferrer");
    }
    setBooked(true);
  };

  return (
    <section id="demo" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="oh-display text-4xl text-[#171e19] sm:text-6xl">
          Hear it answer a lead — and book the job.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#171e19]/70">
          A lead calls, the AI qualifies them, sorts the real job from the time-waster, and
          books the appointment — in real time.
        </p>

        {/* Book-a-call capture */}
        <div className="mx-auto mt-10 max-w-lg">
          {!booked ? (
            <div className="oh-card rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-6 text-left shadow-xl sm:p-8">
              <p className="oh-display mb-1 text-center text-2xl text-[#171e19]">
                See it working for your business
              </p>
              <p className="mb-5 text-center text-sm text-[#171e19]/60">
                Book a free 15-minute call — we&apos;ll show you exactly how it&apos;d run
                for you.
              </p>
              <GateForm ctaLabel="BOOK MY FREE CALL" compact onSubmitted={goToBooking} />
            </div>
          ) : (
            <div className="oh-card rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-8 text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe17c] text-3xl">
                ✓
              </div>
              <p className="oh-display text-2xl text-[#171e19]">You&apos;re all set.</p>
              <p className="mt-2 text-sm text-[#171e19]/60">
                We opened the calendar in a new tab. Didn&apos;t see it? Tap below.
              </p>
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="oh-display oh-card mt-5 inline-block rounded-lg bg-[#171e19] px-8 py-4 text-lg text-white shadow-lg hover:scale-105 min-h-[52px]"
              >
                Pick your time
              </a>
            </div>
          )}
        </div>

        {/* Video — always visible, autoplays on loop once a real file is set */}
        <div className="relative mx-auto mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-[#171e19]/10 bg-[#171e19] shadow-2xl">
          {VIDEO_EMBED ? (
            <video
              className="h-full w-full object-cover"
              src={VIDEO_EMBED}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-white/80">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffe17c] text-3xl text-[#171e19] shadow-lg">
                ▶
              </span>
              <p className="text-sm">Demo video — coming soon</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
