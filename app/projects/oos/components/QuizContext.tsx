"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocationGeo } from "./LocationContext";
import { trackPixelEvent, trackCustomPixelEvent } from "./MetaPixel";
import { EMPTY_ANSWERS, QUIZ_STEPS, type QuizAnswers } from "../lib/quizSteps";

/**
 * Drives the multi-step quiz modal that replaced the old flat 4-field form.
 * Every CTA on the page calls openQuiz() — there is exactly one modal, one
 * flow, mounted once at the page root. Answers and step position live here
 * (not in the modal component) so closing the modal by accident and
 * reopening it from a different CTA resumes exactly where the visitor left
 * off.
 *
 * stepIndex 0..QUIZ_STEPS.length-1 = the 10 questions; stepIndex ===
 * QUIZ_STEPS.length = the success screen. `unlocked` gates the video in
 * VideoForm.tsx — it's set the instant the quiz completes, independent of
 * whether the modal is still open, so the video is already unlocked behind
 * the success screen before the visitor even taps "Watch the demo".
 */

type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  fbclid?: string;
};

const UTM_KEY = "oos-utm";

function captureUtm(): UtmData {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const fresh: UtmData = {};
  (["utm_source", "utm_medium", "utm_campaign", "fbclid"] as const).forEach((k) => {
    const v = params.get(k);
    if (v) fresh[k] = v;
  });

  if (Object.keys(fresh).length > 0) {
    try {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(fresh));
    } catch {
      // non-fatal
    }
    return fresh;
  }

  try {
    const cached = sessionStorage.getItem(UTM_KEY);
    if (cached) return JSON.parse(cached) as UtmData;
  } catch {
    // non-fatal
  }
  return {};
}

async function postLead(payload: Record<string, unknown>) {
  try {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Never block the visitor's flow on a network failure — they still get the demo.
  }
}

function scrollToDemo() {
  if (typeof document === "undefined") return;
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type QuizValue = {
  modalOpen: boolean;
  stepIndex: number;
  answers: QuizAnswers;
  unlocked: boolean;
  openQuiz: () => void;
  closeModal: () => void;
  goBack: () => void;
  setAnswer: (key: keyof QuizAnswers, value: string) => void;
  selectChoice: (key: keyof QuizAnswers, value: string) => void;
  goNext: () => void;
  scrollToDemo: () => void;
};

const QuizContext = createContext<QuizValue | null>(null);

export function useQuiz(): QuizValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside <QuizProvider>");
  return ctx;
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const [unlocked, setUnlocked] = useState(false);
  const geo = useLocationGeo();
  const utmRef = useRef<UtmData>({});

  useEffect(() => {
    utmRef.current = captureUtm();
  }, []);

  const openQuiz = () => {
    setModalOpen(true);
    trackCustomPixelEvent("QuizOpen", { page: "oos" });
  };
  const closeModal = () => setModalOpen(false);
  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  const setAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const finishQuiz = (finalAnswers: QuizAnswers) => {
    trackPixelEvent("Lead");
    void postLead({
      name: finalAnswers.name,
      email: finalAnswers.email,
      phone: finalAnswers.phone,
      website: finalAnswers.website,
      trade: finalAnswers.trade,
      biggestImpact: finalAnswers.biggestImpact,
      leadsPerMonth: finalAnswers.leadsPerMonth,
      phoneCoverage: finalAnswers.phoneCoverage,
      eliminate: finalAnswers.eliminate,
      timeline: finalAnswers.timeline,
      location: { city: geo.city ?? "", region: geo.region ?? "" },
      utm: utmRef.current,
      page: "oos",
      ts: new Date().toISOString(),
      honeypot: finalAnswers.honeypot,
    });
    setUnlocked(true);
    trackPixelEvent("ViewContent");
    // The modal covers the full viewport either way, so pre-positioning the
    // page now means closing the modal (via any path — the WATCH THE DEMO
    // button, Escape, or the backdrop) reveals the video with no visible jump.
    scrollToDemo();
  };

  // Selecting a choice sets the answer and auto-advances in one action — no
  // separate Next button on choice screens. Choice steps are always steps
  // 1–5 (never the last step), so this never needs to finish the quiz.
  const selectChoice = (key: keyof QuizAnswers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStepIndex((i) => i + 1);
  };

  // Text-step Continue button / Enter key. Validity is checked by the modal
  // before calling this (disabled button / ignored Enter), so this just moves.
  const goNext = () => {
    const isLast = stepIndex === QUIZ_STEPS.length - 1;
    if (isLast) {
      finishQuiz(answers);
      setStepIndex(QUIZ_STEPS.length);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        modalOpen,
        stepIndex,
        answers,
        unlocked,
        openQuiz,
        closeModal,
        goBack,
        setAnswer,
        selectChoice,
        goNext,
        scrollToDemo,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
