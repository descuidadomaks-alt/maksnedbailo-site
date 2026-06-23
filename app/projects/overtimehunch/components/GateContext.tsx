"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { FORM_WEBHOOK } from "../lib/config";

/**
 * The gate mechanic for the whole page.
 *
 * Every primary CTA calls openGate(). If the visitor has NOT filled the form
 * yet, the modal form opens. On submit we POST to the webhook, flip `unlocked`
 * to true, and the demo video + booking step appear everywhere at once (modal
 * thank-you state + the inline demo section). Once unlocked, openGate() just
 * jumps the visitor to the demo instead of re-asking.
 */

export type Lead = {
  name: string;
  business: string;
  email: string;
  phone: string;
};

type GateValue = {
  unlocked: boolean;
  modalOpen: boolean;
  submitting: boolean;
  openGate: () => void;
  closeModal: () => void;
  submitLead: (lead: Lead) => Promise<void>;
  scrollToDemo: () => void;
};

const GateContext = createContext<GateValue | null>(null);

export function useGate(): GateValue {
  const ctx = useContext(GateContext);
  if (!ctx) throw new Error("useGate must be used inside <GateProvider>");
  return ctx;
}

function scrollToDemo() {
  if (typeof document === "undefined") return;
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function GateProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const openGate = useCallback(() => {
    if (unlocked) {
      scrollToDemo();
      return;
    }
    setModalOpen(true);
  }, [unlocked]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const submitLead = useCallback(async (lead: Lead) => {
    setSubmitting(true);
    try {
      if (FORM_WEBHOOK) {
        await fetch(FORM_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, source: "overtime-hunch-landing" }),
        }).catch(() => {
          // Never block the visitor on a webhook failure — they still get the demo.
        });
      }
    } finally {
      setSubmitting(false);
      setUnlocked(true);
    }
  }, []);

  return (
    <GateContext.Provider
      value={{ unlocked, modalOpen, submitting, openGate, closeModal, submitLead, scrollToDemo }}
    >
      {children}
    </GateContext.Provider>
  );
}
