"use client";

import { useState } from "react";
import { GateForm } from "./GateForm";
import { ChatLoop } from "./ChatLoop";
import { BOOKING_LINK, VIDEO_EMBED } from "../lib/config";

/**
 * Demo section — un-gated. Same treatment as the hero: a looping demo plays
 * blurred BEHIND the form as a background (the real video once VIDEO_EMBED is
 * set, otherwise the looping chat). The book-a-call form sits on top; on submit
 * it posts the lead, opens BOOKING_LINK, and shows a thank-you state.
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

        {/* Dark frame: looping demo blurred behind, form on top */}
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-[#171e19] p-5 shadow-2xl sm:p-10">
          {/* blurred looping background */}
          <div className="pointer-events-none absolute inset-0 scale-110 p-6 opacity-90 blur-[6px]">
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
              <ChatLoop />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#171e19] via-[#171e19]/70 to-[#171e19]/60" />

          {/* form on top */}
          <div className="relative mx-auto max-w-lg text-left">
            {!booked ? (
              <div className="oh-card rounded-2xl border border-[#171e19]/10 bg-white p-6 shadow-xl sm:p-8">
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
              <div className="oh-card rounded-2xl border border-[#171e19]/10 bg-white p-8 text-center shadow-xl">
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
        </div>
      </div>
    </section>
  );
}
