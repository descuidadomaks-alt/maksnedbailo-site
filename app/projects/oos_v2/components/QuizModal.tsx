"use client";

import { useEffect, useRef } from "react";
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
  isStepValid,
} from "../lib/quizSteps";

/**
 * The single quiz modal every CTA on the page opens. Forked from
 * app/projects/oos/components/QuizModal.tsx — one question per screen,
 * choice steps auto-advance, text steps advance on Continue/Enter. Adds the
 * live page's optional SMS/call consent checkbox on the phone step (absent
 * from the original oos build) and drops the Calendly "book a call" link
 * from the success screen since this variant has no real booking link wired.
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
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#171e19]/50 hover:bg-[#171e19]/5"
          >
            ×
          </button>
        </div>

        {showHeader && (
          <div className="mt-6 text-center">
            <p className="text-[15px] font-medium leading-snug text-[#171e19]/70 sm:text-base">{QUIZ_HEADER_TEXT}</p>
            <p className="oh-display mt-1.5 text-2xl text-[#171e19]">
              for <Highlight rotate={-2}>{QUIZ_HEADER_PRICE}</Highlight>
            </p>
          </div>
        )}

        <div className="mt-4">
          <p className="text-right text-xs font-medium tabular-nums text-[#171e19]/50">{progress}%</p>
          <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-[#171e19]/[0.08]">
            <div className="oh-quiz-progress-fill h-full rounded-full" style={{ width: `${progress}%` }} />
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
              showConsent={step!.showConsent}
              value={answers[step!.key]}
              consent={answers.consent}
              honeypot={answers.honeypot}
              onChange={(v) => setAnswer(step!.key, v)}
              onConsentChange={(v) => setAnswer("consent", v)}
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
  showConsent,
  value,
  consent,
  honeypot,
  onChange,
  onConsentChange,
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
  showConsent?: boolean;
  value: string;
  consent: boolean;
  honeypot: string;
  onChange: (v: string) => void;
  onConsentChange: (v: boolean) => void;
  onHoneypotChange: (v: string) => void;
  onAdvance: () => void;
  valid: boolean;
  skippable?: boolean;
  skipLabel?: string;
  onSkip?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

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
        ref={inputRef}
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
          name="_hp"
          value={honeypot}
          onChange={(e) => onHoneypotChange(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
      )}

      {showConsent && (
        <label className="mt-4 flex items-start gap-2.5 text-left text-xs leading-snug text-[#171e19]/70">
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
