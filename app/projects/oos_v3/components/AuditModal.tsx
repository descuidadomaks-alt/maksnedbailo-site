"use client";

import { useEffect } from "react";
import { useAudit } from "./AuditContext";
import { Dot } from "./Dot";
import { track } from "../lib/track";
import { PAGE_TAG } from "../lib/config";
import { CONSENT_TEXT, TRADES, formatUsPhone, isAuditFormValid } from "../lib/auditForm";

/**
 * Single-step audit-capture modal — the whole point of v3's low friction is
 * one short screen, not a funnel. Reuses the sibling pages' mobile
 * no-scroll modal shell (h-[100dvh] panel, min-h-0 content zone, no
 * overflow-y-auto — see QuizModal.tsx's own comment for why each of those
 * three matters together) since that fix is about viewport sizing, not
 * step count, and still applies here.
 */
export function AuditModal() {
  const { modalOpen, submitted, answers, closeModal, setAnswer, submitAudit, scrollToDemo } = useAudit();

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

  const valid = isAuditFormValid(answers);

  const handleSubmit = () => {
    if (!valid || answers.honeypot) {
      if (answers.honeypot) closeModal(); // silently drop bots, don't tip them off
      return;
    }
    submitAudit();
  };

  const handleWatchDemo = () => {
    closeModal();
    scrollToDemo();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && valid) handleSubmit();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[#171e19]/70 backdrop-blur-sm" onClick={closeModal} aria-hidden />

      <div className="oh-card relative z-10 flex h-[100dvh] w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-h-[92dvh] sm:max-w-lg sm:rounded-3xl">
        <div className="flex flex-none items-center justify-end px-5 pt-3 sm:px-8 sm:pt-5">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#171e19]/50 hover:bg-[#171e19]/5"
          >
            ×
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto px-5 pb-4 pt-1 sm:px-8 sm:pb-6 sm:pt-2">
          {!submitted ? (
            <>
              <h3 className="oh-display text-center text-2xl leading-tight text-[#171e19] sm:text-3xl">
                Free missed-call audit<Dot />
              </h3>
              <p className="mt-2 text-center text-sm leading-snug text-[#171e19]/70">
                Give us your business number. We&apos;ll call it after hours, record what your
                customer hears, and send it to you. No pitch attached — the recording speaks for
                itself.
              </p>

              <div className="mt-5 space-y-2.5">
                <input
                  type="text"
                  inputMode="text"
                  autoComplete="given-name"
                  placeholder="First name"
                  aria-label="First name"
                  value={answers.name}
                  onChange={(e) => setAnswer("name", e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
                />
                <div>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    aria-label="Business phone"
                    value={answers.phone}
                    onChange={(e) => setAnswer("phone", formatUsPhone(e.target.value))}
                    onKeyDown={handleKeyDown}
                    className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
                  />
                  <p className="mt-1 text-xs text-[#171e19]/50">This is the number we&apos;ll call for your audit.</p>
                </div>
                <select
                  aria-label="Trade"
                  value={answers.trade}
                  onChange={(e) => setAnswer("trade", e.target.value)}
                  className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
                >
                  <option value="" disabled>
                    What kind of work do you do?
                  </option>
                  {TRADES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@business.com"
                  aria-label="Email"
                  value={answers.email}
                  onChange={(e) => setAnswer("email", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
                />
              </div>

              <input
                type="text"
                name="_hp"
                value={answers.honeypot}
                onChange={(e) => setAnswer("honeypot", e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <label className="mt-3 flex items-start gap-2.5 text-left text-[11px] leading-snug text-[#171e19]/70">
                <input
                  type="checkbox"
                  checked={answers.consent}
                  onChange={(e) => setAnswer("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-none rounded border-[#171e19]/30"
                />
                <span>
                  {CONSENT_TEXT}{" "}
                  <a href="/projects/oos_v3/privacy" className="underline">
                    Privacy Policy
                  </a>{" "}
                  ·{" "}
                  <a href="/projects/oos_v3/terms" className="underline">
                    Terms
                  </a>
                </span>
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!valid}
                className="oh-display mt-4 min-h-[52px] w-full rounded-lg bg-[#ffe17c] px-8 py-4 text-lg text-[#171e19] shadow-lg disabled:opacity-40"
              >
                Get my free audit →
              </button>
            </>
          ) : (
            <div className="py-2 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe17c] text-3xl">
                ✓
              </div>
              <h3 className="oh-display text-2xl text-[#171e19] sm:text-3xl">
                You&apos;re in<Dot />
              </h3>
              <p className="mt-2 mb-6 text-[#171e19]/70">We&apos;ll call after hours and send your recording.</p>
              <button
                type="button"
                onClick={handleWatchDemo}
                className="oh-display oh-card block w-full rounded-lg bg-[#171e19] px-8 py-4 text-xl text-white shadow-lg hover:scale-[1.02]"
              >
                Watch the demo
              </button>
              <button
                type="button"
                onClick={() => {
                  track("book_click", { location: "confirmation", page: PAGE_TAG });
                  closeModal();
                }}
                className="mt-3 text-sm font-medium text-[#171e19]/60 underline underline-offset-4"
              >
                Or book a 15-minute call instead
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
