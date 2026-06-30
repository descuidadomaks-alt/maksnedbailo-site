"use client";

import { useEffect } from "react";
import { useGate } from "./GateContext";
import { GateForm } from "./GateForm";
import { BOOKING_LINK } from "../lib/config";

/**
 * The single modal reused by every CTA. Locked state = the 4-field form.
 * Unlocked state = thank-you + "Book Your Call" + a jump to the live demo.
 * Mounted once at the page root inside <GateProvider>.
 */
export function GateModal() {
  const { modalOpen, unlocked, closeModal, scrollToDemo } = useGate();

  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen, closeModal]);

  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#171e19]/70 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden
      />

      <div className="oh-card relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#171e19]/50 hover:bg-[#171e19]/5"
        >
          ×
        </button>

        {!unlocked ? (
          <>
            <h3 className="oh-display pr-8 text-3xl text-[#171e19]">
              See it answer &amp; book a real lead.
            </h3>
            <p className="mt-2 mb-5 text-[#171e19]/70">
              Tell us where to send it. You&apos;ll watch the 90-second demo next — then
              you can grab a call.
            </p>
            <GateForm ctaLabel="WATCH THE DEMO" compact />
          </>
        ) : (
          <div className="py-2 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe17c] text-3xl">
              ✓
            </div>
            <h3 className="oh-display text-3xl text-[#171e19]">You&apos;re in.</h3>
            <p className="mt-2 mb-6 text-[#171e19]/70">
              The demo is unlocked below. Watch it, then book your call.
            </p>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oh-display oh-card block w-full rounded-lg bg-[#171e19] px-8 py-4 text-xl text-white shadow-lg hover:scale-[1.02]"
            >
              BOOK YOUR CALL
            </a>
            <button
              type="button"
              onClick={() => {
                closeModal();
                scrollToDemo();
              }}
              className="mt-3 w-full rounded-lg px-8 py-3 text-base font-medium text-[#171e19] underline underline-offset-4"
            >
              Watch the demo first
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
