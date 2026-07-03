"use client";

import { useState } from "react";
import { GateForm } from "./GateForm";
import { Dot } from "./Dot";
import { BOOKING_LINK, VIDEO_SRC, VIDEO_POSTER, REGION, SPOTS_LEFT } from "../lib/config";

/**
 * Video + form — the new centerpiece, directly under the hero. The demo is
 * OPEN (no gate): a real, self-hosted video (native <video controls>, no
 * iframe/YouTube branding) sits above the 4-field book-a-call form. On
 * submit we post the lead, open BOOKING_LINK in a new tab, and swap the
 * form for a thank-you state.
 */
export function VideoForm() {
  const [booked, setBooked] = useState(false);

  const goToBooking = () => {
    if (typeof window !== "undefined") {
      window.open(BOOKING_LINK, "_blank", "noopener,noreferrer");
    }
    setBooked(true);
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

        <video
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          controls
          playsInline
          preload="metadata"
          width={1280}
          height={720}
          className="mt-8 aspect-video w-full rounded-2xl border border-[#171e19]/10 shadow-2xl"
        />

        <div id="book-call-form" className="mx-auto mt-8 max-w-lg scroll-mt-24 text-left">
          {!booked ? (
            <div className="oh-card rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-6 shadow-xl sm:p-8">
              <p className="oh-display mb-1 text-center text-2xl text-[#171e19]">
                See it working for your business
              </p>
              <p className="mb-3 text-center text-sm text-[#171e19]/60">
                Drop your details and we&apos;ll show you how it&apos;d run for your business.
              </p>
              <p className="mb-5 flex items-center justify-center gap-1.5 text-center text-xs font-bold text-[#171e19]">
                <span aria-hidden className="h-1.5 w-1.5 flex-none rounded-full bg-[#ffe17c]" />
                {SPOTS_LEFT} onboarding spots left in {REGION}
              </p>
              <GateForm ctaLabel="BOOK MY FREE CALL" compact onSubmitted={goToBooking} />
            </div>
          ) : (
            <div className="oh-card rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-8 text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe17c] text-3xl">
                ✓
              </div>
              <p className="oh-display text-2xl text-[#171e19]">You&apos;re all set<Dot /></p>
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
    </section>
  );
}
