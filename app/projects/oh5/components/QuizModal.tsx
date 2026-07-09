"use client";

import { useEffect, useRef } from "react";
import { useQuiz } from "./QuizContext";
import { Dot } from "./Dot";
import { trackCustomPixelEvent } from "./MetaPixel";
import {
  QUIZ_STEPS,
  QUIZ_HEADER_STEPS,
  QUIZ_HEADER_TEXT,
  QUIZ_HEADER_PRICE,
  formatUsPhone,
  isStepValid,
} from "../lib/quizSteps";
import { BOOKING_LINK } from "../lib/config";

/**
 * The single quiz modal every CTA on the page opens (see QuizContext.openQuiz).
 * One question per screen; choice steps auto-advance on tap, text steps
 * advance on Continue/Enter. Centered card on sm+, true full-screen sheet on
 * mobile. State lives in QuizContext, so closing this and reopening from a
 * different CTA resumes mid-flow.
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

  // Step-drop funnel — one QuizStep custom event per step number, fired once
  // per session even if the visitor closes/reopens the modal or goes Back
  // and forward again over the same step.
  const firedStepsRef = useRef<Set<number>>(new Set());
  useEffect(() => {
    if (!modalOpen || stepIndex >= QUIZ_STEPS.length) return;
    const stepNumber = stepIndex + 1;
    if (firedStepsRef.current.has(stepNumber)) return;
    firedStepsRef.current.add(stepNumber);
    trackCustomPixelEvent("QuizStep", { step: stepNumber, page: "oh5" });
  }, [modalOpen, stepIndex]);

  if (!modalOpen) return null;

  const isSuccess = stepIndex >= QUIZ_STEPS.length;
  const step = isSuccess ? null : QUIZ_STEPS[stepIndex];
  const progress = isSuccess ? 100 : step!.progress;
  const showHeader = !isSuccess && stepIndex < QUIZ_HEADER_STEPS;
  const showBack = stepIndex > 0 && !isSuccess;
  const compact = !isSuccess && step!.type === "choice" && step!.options.length > 6;

  const handleWatchDemo = () => {
    closeModal();
    scrollToDemo();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[#171e19]/70 backdrop-blur-sm" onClick={closeModal} aria-hidden />

      <div className="oh-card relative z-10 flex h-full w-full flex-col bg-white p-6 shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-lg sm:rounded-3xl sm:p-8">
        <div className="flex items-center justify-between">
          {showBack ? (
            <button
              type="button"
              onClick={goBack}
              className="text-sm font-medium text-[#171e19]/60 hover:text-[#171e19]"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#171e19]/50 hover:bg-[#171e19]/5"
          >
            ×
          </button>
        </div>

        {showHeader && (
          <p className="mt-2 text-center text-base font-medium leading-snug text-[#171e19]/80 sm:text-lg">
            {QUIZ_HEADER_TEXT}{" "}
            <span className="whitespace-nowrap rounded bg-[#ffe17c] px-1.5 py-0.5 font-bold text-[#171e19]">
              {QUIZ_HEADER_PRICE}
            </span>
          </p>
        )}

        <div className="mt-4 h-7 w-full overflow-hidden rounded-full bg-[#171e19]/10 sm:h-8">
          <div
            className="oh-quiz-progress-fill flex h-full items-center justify-end rounded-full pr-3 sm:pr-4"
            style={{ width: `${progress}%` }}
          >
            <span
              className="oh-display text-xs tabular-nums text-white sm:text-sm"
              style={{
                textShadow:
                  "-1px -1px 0 rgba(23,30,25,0.55), 1px -1px 0 rgba(23,30,25,0.55), -1px 1px 0 rgba(23,30,25,0.55), 1px 1px 0 rgba(23,30,25,0.55)",
              }}
            >
              {progress}%
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-center overflow-y-auto">
          {!isSuccess && step!.type === "choice" && (
            <>
              <h3 className="oh-display text-center text-2xl text-[#171e19] sm:text-3xl">{step!.question}</h3>
              <div className={compact ? "mt-4 space-y-2" : "mt-6 space-y-3"}>
                {step!.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => selectChoice(step!.key, opt)}
                    className={
                      compact
                        ? "min-h-[44px] w-full rounded-lg border border-[#171e19]/15 bg-white px-4 py-2.5 text-left text-sm font-medium text-[#171e19] transition hover:border-[#171e19] hover:bg-[#f8f9fa] active:scale-[0.99]"
                        : "min-h-[52px] w-full rounded-lg border border-[#171e19]/15 bg-white px-5 py-3 text-left text-base font-medium text-[#171e19] transition hover:border-[#171e19] hover:bg-[#f8f9fa] active:scale-[0.99]"
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

          {!isSuccess && step!.type === "text" && (
            <TextStepScreen
              key={step!.key}
              stepKey={step!.key}
              question={step!.question}
              inputType={step!.inputType}
              placeholder={step!.placeholder}
              cta={step!.cta}
              big={step!.big}
              value={answers[step!.key]}
              honeypot={answers.honeypot}
              onChange={(v) => setAnswer(step!.key, v)}
              onHoneypotChange={(v) => setAnswer("honeypot", v)}
              onAdvance={goNext}
              valid={isStepValid(step!, answers)}
              skippable={step!.skippable}
              skipLabel={step!.skipLabel}
              onSkip={() => {
                setAnswer(step!.key, "");
                goNext();
              }}
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
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="mt-4 inline-block text-sm font-medium text-[#171e19]/60 underline underline-offset-4 hover:text-[#171e19]"
              >
                Skip ahead — book your free call
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextStepScreen({
  stepKey,
  question,
  inputType,
  placeholder,
  cta,
  big,
  value,
  honeypot,
  onChange,
  onHoneypotChange,
  onAdvance,
  valid,
  skippable,
  skipLabel,
  onSkip,
}: {
  stepKey: "name" | "email" | "website" | "phone";
  question: string;
  inputType: "text" | "email" | "url" | "tel";
  placeholder: string;
  cta: string;
  big?: boolean;
  value: string;
  honeypot: string;
  onChange: (v: string) => void;
  onHoneypotChange: (v: string) => void;
  onAdvance: () => void;
  valid: boolean;
  skippable?: boolean;
  skipLabel?: string;
  onSkip?: () => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(stepKey === "phone" ? formatUsPhone(e.target.value) : e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && valid) onAdvance();
  };

  const autoComplete =
    stepKey === "name" ? "name" : stepKey === "email" ? "email" : stepKey === "website" ? "url" : "tel";
  const inputMode = inputType === "tel" ? "tel" : inputType === "email" ? "email" : inputType === "url" ? "url" : "text";

  return (
    <>
      <h3 className="oh-display text-center text-2xl text-[#171e19] sm:text-3xl">{question}</h3>
      <input
        type={inputType}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-label={question}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        className="mt-6 min-h-[56px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-lg text-[#171e19] outline-none focus:border-[#171e19]"
      />

      {stepKey === "phone" && (
        <input
          type="text"
          name="hp_website"
          value={honeypot}
          onChange={(e) => onHoneypotChange(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
      )}

      <button
        type="button"
        onClick={onAdvance}
        disabled={!valid}
        className={`mt-4 min-h-[52px] w-full rounded-lg px-8 py-4 shadow-lg disabled:opacity-40 ${
          big ? "oh-display bg-[#ffe17c] text-xl text-[#171e19]" : "oh-display bg-[#171e19] text-lg text-white"
        }`}
      >
        {cta}
      </button>

      {skippable && (
        <button
          type="button"
          onClick={onSkip}
          className="mt-3 block w-full text-center text-sm font-medium text-[#171e19]/50 underline underline-offset-4 hover:text-[#171e19]"
        >
          {skipLabel}
        </button>
      )}
    </>
  );
}
