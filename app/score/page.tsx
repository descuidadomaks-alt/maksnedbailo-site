/**
 * /score — The Bottleneck Score quiz.
 *
 * Self-contained lead magnet, no external quiz SaaS. Same design system as
 * /new (data-short-page → Roboto Mono titles/labels + IBM Plex Sans body).
 *
 * Flow: Intro → Q1–Q8 (progress bar, keyboard 1–4 + tap) → soft gate
 * (name + email/WhatsApp via Web3Forms) → result.
 *
 * Shareable results: completing the gate encodes answers into ?a=XXXXXXXX
 * (8 digits, 0–3) via history.replaceState. Loading /score?a=... with a
 * valid code jumps straight to the result screen, gate-free.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { QUESTIONS, encodeAnswers, decodeAnswers } from "./lib/quiz";
import QuizProgress from "./components/QuizProgress";
import Intro from "./components/Intro";
import QuestionScreen from "./components/QuestionScreen";
import SoftGate from "./components/SoftGate";
import Computing from "./components/Computing";
import ResultScreen from "./components/ResultScreen";

type Step = "intro" | number | "gate" | "computing" | "result";

export default function ScorePage() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<number[]>(() => Array(QUESTIONS.length).fill(-1));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get("a");
    const decoded = a ? decodeAnswers(a) : null;
    if (decoded) {
      setAnswers(decoded);
      setStep("result");
    }
  }, []);

  const selectAnswer = useCallback((value: number) => {
    setStep((current) => {
      if (typeof current !== "number") return current;
      setAnswers((prev) => {
        const next = [...prev];
        next[current] = value;
        return next;
      });
      return current < QUESTIONS.length - 1 ? current + 1 : "gate";
    });
  }, []);

  const goBack = useCallback(() => {
    setStep((current) => {
      if (typeof current === "number" && current > 0) return current - 1;
      if (current === "gate") return QUESTIONS.length - 1;
      return current;
    });
  }, []);

  function handleGateSuccess() {
    const encoded = encodeAnswers(answers);
    window.history.replaceState(null, "", `/score?a=${encoded}`);
    setStep("computing");
  }

  return (
    <main data-short-page className="flex flex-col bg-bg" style={{ minHeight: "100dvh" }}>
      {typeof step === "number" && (
        <QuizProgress current={step} total={QUESTIONS.length} />
      )}
      <div className="flex-1 flex items-center justify-center px-6 py-12 md:py-24">
        {step === "intro" && <Intro onStart={() => setStep(0)} />}
        {typeof step === "number" && (
          <QuestionScreen key={step} index={step} onSelect={selectAnswer} onBack={goBack} />
        )}
        {step === "gate" && <SoftGate key="gate" answers={answers} onSuccess={handleGateSuccess} />}
        {step === "computing" && <Computing key="computing" onDone={() => setStep("result")} />}
        {step === "result" && <ResultScreen key="result" answers={answers} />}
      </div>
    </main>
  );
}
