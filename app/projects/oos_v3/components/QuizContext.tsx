"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "../lib/track";
import { PAGE_TAG } from "../lib/config";
import { EMPTY_ANSWERS, QUIZ_STEPS, type QuizAnswers } from "../lib/quizSteps";

/**
 * Drives the multi-step quiz modal — every CTA on the page calls openQuiz().
 * Forked from app/projects/oos/components/QuizContext.tsx; the funnel logic
 * (one modal, answers persist across close/reopen, choice steps auto-advance)
 * is unchanged. What's different: submission posts to /api/oos-lead (which
 * forwards to the real GHL webhook) instead of the legacy /api/lead
 * Sheet/Telegram pipeline, and tracking fires quiz_open/quiz_step/quiz_submit
 * via lib/track.ts instead of the Meta-Pixel-only helper.
 */

type UtmData = Record<string, string>;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
const UTM_STORAGE_KEY = "oos_v3-utm";

function captureUtm(): UtmData {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const fresh: UtmData = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) fresh[k] = v;
  });

  if (Object.keys(fresh).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // non-fatal
    }
    return fresh;
  }

  try {
    const cached = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (cached) return JSON.parse(cached) as UtmData;
  } catch {
    // non-fatal
  }
  return {};
}

async function postLead(payload: Record<string, unknown>) {
  try {
    await fetch("/api/oos-lead", {
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
  openQuiz: (source?: string) => void;
  closeModal: () => void;
  goBack: () => void;
  setAnswer: (key: keyof QuizAnswers, value: string | boolean) => void;
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
  const utmRef = useRef<UtmData>({});
  const firedStepsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    utmRef.current = captureUtm();
  }, []);

  const openQuiz = (source = "unknown") => {
    setModalOpen(true);
    track("quiz_open", { source, page: PAGE_TAG });
  };
  const closeModal = () => setModalOpen(false);
  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  const setAnswer = (key: keyof QuizAnswers, value: string | boolean) => {
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const finishQuiz = (finalAnswers: QuizAnswers) => {
    track("quiz_submit", { step: QUIZ_STEPS.length, trade_type: finalAnswers.trade, page: PAGE_TAG });
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
      consent: finalAnswers.consent,
      utm: utmRef.current,
      page: PAGE_TAG,
      pageUrl: window.location.href,
      honeypot: finalAnswers.honeypot,
    });
    setUnlocked(true);
    scrollToDemo();
  };

  // Selecting a choice sets the answer and auto-advances in one action.
  // Choice steps are always steps 1–6 (never the last step).
  const selectChoice = (key: keyof QuizAnswers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    const next = stepIndex + 1;
    setStepIndex(next);
    if (!firedStepsRef.current.has(next)) {
      firedStepsRef.current.add(next);
      track("quiz_step", { step: next + 1, page: PAGE_TAG });
    }
  };

  // Text-step Continue button / Enter key. Validity is checked by the modal
  // before calling this (disabled button / ignored Enter), so this just moves.
  const goNext = () => {
    const isLast = stepIndex === QUIZ_STEPS.length - 1;
    if (isLast) {
      finishQuiz(answers);
      setStepIndex(QUIZ_STEPS.length);
    } else {
      const next = stepIndex + 1;
      setStepIndex(next);
      if (!firedStepsRef.current.has(next)) {
        firedStepsRef.current.add(next);
        track("quiz_step", { step: next + 1, page: PAGE_TAG });
      }
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
