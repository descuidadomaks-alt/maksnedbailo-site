"use client";

import { useEffect } from "react";
import { useQuiz } from "./QuizContext";
import { Dot } from "./Dot";
import { Highlight } from "./Highlight";
import {
  QUIZ_STEPS,
  QUIZ_HEADER_STEPS,
  QUIZ_HEADER_TEXT,
  QUIZ_HEADER_PRICE,
  CONSENT_TEXT,
  formatUsPhone,
  isContactStepValid,
} from "../lib/quizSteps";

/**
 * The single quiz modal every CTA on the page opens. Rebuilt for a rock-
 * solid mobile no-scroll layout — the previous version sized the panel
 * with `h-full` inside a `fixed inset-0` wrapper (no `dvh`, so mobile
 * browser chrome miscounted the real viewport) and centered its content
 * with `justify-center` inside a flex-1 zone that had no `min-h-0` — a
 * flex child's default `min-height: auto` refuses to shrink below its own
 * content, so the box grew taller than the visible viewport and
 * `overflow-y-auto` kicked in: dead space, a clipped title, and scroll.
 *
 * Fix is three things together: `h-[100dvh]` on the panel, `min-h-0` on
 * the flex-1 content zone, and no `overflow-y-auto` (nothing left to
 * scroll once sizing is correct). Verified at 390x740 and 360x640 — see
 * this component's own layout, not a CSS patch on the old one.
 *
 * Quiz cut from 10 steps to 3 (trade, biggestImpact, contact) — see
 * lib/quizSteps.ts. Choice-step option buttons are now always compact
 * (both remaining choice steps have 8 options, so the old
 * `options.length > 6` conditional was pointless — just always compact).
 */
export function QuizModal() {
  const { modalOpen, stepIndex, answers, closeModal, goBack, setAnswer, selectChoice, goNext, scrollToDemo } =
    useQuiz();

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

  const isSuccess = stepIndex >= QUIZ_STEPS.length;
  const step = isSuccess ? null : QUIZ_STEPS[stepIndex];
  const progress = isSuccess ? 100 : step!.progress;
  const showHeader = !isSuccess && stepIndex < QUIZ_HEADER_STEPS;
  const showBack = stepIndex > 0 && !isSuccess;

  const handleWatchDemo = () => {
    closeModal();
    scrollToDemo();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[#171e19]/70 backdrop-blur-sm" onClick={closeModal} aria-hidden />

      <div className="oh-card relative z-10 flex h-[100dvh] w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-h-[92dvh] sm:max-w-lg sm:rounded-3xl">
        {/* Top bar — flex-none, compact */}
        <div className="flex flex-none items-center justify-between px-5 pt-3 sm:px-8 sm:pt-5">
          {showBack ? (
            <button type="button" onClick={goBack} className="text-sm font-medium text-[#171e19]/60 hover:text-[#171e19]">
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#171e19]/50 hover:bg-[#171e19]/5"
          >
            ×
          </button>
        </div>

        {/* Header — flex-none, steps 1–2 only, compact single block */}
        {showHeader && (
          <div className="flex-none px-5 pb-1 text-center sm:px-8">
            <p className="text-xs leading-tight text-[#171e19]/70 sm:text-sm">
              {QUIZ_HEADER_TEXT} for <Highlight rotate={-2}>{QUIZ_HEADER_PRICE}</Highlight>
            </p>
          </div>
        )}

        {/* Progress — flex-none */}
        <div className="flex-none px-5 pt-2 sm:px-8">
          <p className="text-right text-[11px] font-medium tabular-nums text-[#171e19]/50">{progress}%</p>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#171e19]/[0.08]">
            <div className="oh-quiz-progress-fill h-full rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Content — flex-1, min-h-0 is what actually lets this shrink to fit. No overflow. */}
        <div className="flex min-h-0 flex-1 flex-col justify-center px-5 pb-4 pt-3 sm:px-8 sm:pb-6 sm:pt-4">
          {!isSuccess && step!.type === "choice" && (
            <>
              <h3 className="oh-display text-center text-xl leading-tight text-[#171e19] sm:text-3xl">
                {step!.question}
              </h3>
              <div className="mt-3 space-y-2">
                {step!.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => selectChoice(step!.key, opt)}
                    className="min-h-[44px] w-full rounded-lg border border-[#171e19]/15 bg-white px-4 py-2 text-left text-sm font-medium text-[#171e19] transition hover:border-[#171e19] hover:bg-[#f8f9fa] active:scale-[0.99]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

          {!isSuccess && step!.type === "contact" && (
            <ContactStepScreen
              question={step!.question}
              cta={step!.cta}
              name={answers.name}
              phone={answers.phone}
              email={answers.email}
              consent={answers.consent}
              honeypot={answers.honeypot}
              onChangeName={(v) => setAnswer("name", v)}
              onChangePhone={(v) => setAnswer("phone", v)}
              onChangeEmail={(v) => setAnswer("email", v)}
              onConsentChange={(v) => setAnswer("consent", v)}
              onHoneypotChange={(v) => setAnswer("honeypot", v)}
              onAdvance={goNext}
              valid={isContactStepValid(answers)}
            />
          )}

          {isSuccess && (
            <div className="py-2 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe17c] text-3xl">
                ✓
              </div>
              <h3 className="oh-display text-3xl text-[#171e19]">
                You&apos;re in<Dot />
              </h3>
              <p className="mt-2 mb-6 text-[#171e19]/70">The demo&apos;s unlocked below — watch it now.</p>
              <button
                type="button"
                onClick={handleWatchDemo}
                className="oh-display oh-card block w-full rounded-lg bg-[#171e19] px-8 py-4 text-xl text-white shadow-lg hover:scale-[1.02]"
              >
                WATCH THE DEMO
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactStepScreen({
  question,
  cta,
  name,
  phone,
  email,
  consent,
  honeypot,
  onChangeName,
  onChangePhone,
  onChangeEmail,
  onConsentChange,
  onHoneypotChange,
  onAdvance,
  valid,
}: {
  question: string;
  cta: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  honeypot: string;
  onChangeName: (v: string) => void;
  onChangePhone: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onConsentChange: (v: boolean) => void;
  onHoneypotChange: (v: string) => void;
  onAdvance: () => void;
  valid: boolean;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && valid) onAdvance();
  };

  return (
    <>
      <h3 className="oh-display text-center text-xl leading-tight text-[#171e19] sm:text-3xl">{question}</h3>

      <div className="mt-3 space-y-2.5">
        <input
          type="text"
          inputMode="text"
          autoComplete="given-name"
          placeholder="First name"
          aria-label="First name"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
        />
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(555) 123-4567"
          aria-label="Phone"
          value={phone}
          onChange={(e) => onChangePhone(formatUsPhone(e.target.value))}
          onKeyDown={handleKeyDown}
          className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
        />
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@business.com"
          aria-label="Email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
        />
      </div>

      <input
        type="text"
        name="_hp"
        value={honeypot}
        onChange={(e) => onHoneypotChange(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <label className="mt-3 flex items-start gap-2.5 text-left text-[11px] leading-snug text-[#171e19]/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-none rounded border-[#171e19]/30"
        />
        <span>
          {CONSENT_TEXT}{" "}
          <a href="/projects/oos_v2/privacy" className="underline">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="/projects/oos_v2/terms" className="underline">
            Terms
          </a>
        </span>
      </label>

      <button
        type="button"
        onClick={onAdvance}
        disabled={!valid}
        className="oh-display mt-3 min-h-[52px] w-full rounded-lg bg-[#ffe17c] px-8 py-4 text-xl text-[#171e19] shadow-lg disabled:opacity-40"
      >
        {cta}
      </button>
    </>
  );
}
