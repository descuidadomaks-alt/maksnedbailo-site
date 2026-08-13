"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { track } from "../lib/track";
import { PAGE_TAG } from "../lib/config";
import { EMPTY_ANSWERS, type AuditAnswers } from "../lib/auditForm";

/**
 * Drives the single-step audit-capture modal — every CTA on the page calls
 * openAudit(). Modeled on the sibling pages' QuizContext.tsx but with the
 * step machinery removed: one screen in, one submit out. Submission posts
 * to /api/oos-lead (the same route + GHL webhook oos_v2/oos_v2_1 use) with
 * page:"oos_v3" and leadType:"audit" so these leads are identifiable in
 * the pipeline — see app/api/oos-lead/route.ts, which already whitelists
 * both fields; no changes needed there.
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
    // Never block the visitor's flow on a network failure — they still get the confirmation state.
  }
}

function scrollToDemo() {
  if (typeof document === "undefined") return;
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type AuditValue = {
  modalOpen: boolean;
  submitted: boolean;
  answers: AuditAnswers;
  openAudit: (source?: string) => void;
  closeModal: () => void;
  setAnswer: (key: keyof AuditAnswers, value: string | boolean) => void;
  submitAudit: () => void;
  scrollToDemo: () => void;
};

const AuditContext = createContext<AuditValue | null>(null);

export function useAudit(): AuditValue {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error("useAudit must be used inside <AuditProvider>");
  return ctx;
}

export function AuditProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<AuditAnswers>(EMPTY_ANSWERS);
  const utmRef = useRef<UtmData>({});
  const utmCaptured = useRef(false);

  const openAudit = (source = "unknown") => {
    if (!utmCaptured.current) {
      utmCaptured.current = true;
      utmRef.current = captureUtm();
    }
    setModalOpen(true);
    track("audit_open", { source, page: PAGE_TAG });
  };

  const closeModal = () => setModalOpen(false);

  const setAnswer = (key: keyof AuditAnswers, value: string | boolean) => {
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const submitAudit = () => {
    track("audit_submit", { trade_type: answers.trade, page: PAGE_TAG });
    void postLead({
      name: answers.name,
      email: answers.email,
      phone: answers.phone,
      website: "",
      trade: answers.trade,
      biggestImpact: "",
      leadsPerMonth: "",
      phoneCoverage: "",
      eliminate: "",
      timeline: "",
      consent: answers.consent,
      utm: utmRef.current,
      page: PAGE_TAG,
      pageUrl: window.location.href,
      honeypot: answers.honeypot,
      leadType: "audit",
    });
    setSubmitted(true);
  };

  return (
    <AuditContext.Provider
      value={{
        modalOpen,
        submitted,
        answers,
        openAudit,
        closeModal,
        setAnswer,
        submitAudit,
        scrollToDemo,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
}
