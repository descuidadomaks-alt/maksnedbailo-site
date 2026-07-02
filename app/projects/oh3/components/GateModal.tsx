"use client";

import { useEffect } from "react";
import { useGate } from "./GateContext";
import { GateForm } from "./GateForm";
import { BOOKING_LINK } from "../lib/config";

/**
 * The single booking-capture modal opened by the "book"/"claim" CTAs.
 * Locked state = the 4-field form. Submitted state = thank-you + "Book Your
 * Call" (→ calendar) + a jump to the visible demo. Mounted once at the page
 * root inside <GateProvider>.
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
              Let&apos;s get you started.
            </h3>
            <p className="mt-2 mb-5 text-[#171e19]/70">
              Drop your details — we&apos;ll show you the demo and book a free 15-minute call
              to walk you through exactly how it&apos;d run for you.
            </p>
            <GateForm ctaLabel="GET STARTED" compact />
          </>
        ) : (
          <div className="py-2 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe17c] text-3xl">
              ✓
            </div>
            <h3 className="oh-display text-3xl text-[#171e19]">You&apos;re all set.</h3>
            <p className="mt-2 mb-6 text-[#171e19]/70">
              Grab a time on the calendar — then watch the demo while you wait.
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
              See the demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
