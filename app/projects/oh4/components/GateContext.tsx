"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { FORM_WEBHOOK } from "../lib/config";
import { trackPixelEvent } from "./MetaPixel";

/**
 * Booking-capture mechanic for the page.
 *
 * This context runs the booking-modal flow ("book"/"claim" CTAs call
 * openGate() to open the capture modal; "see the demo" CTAs call
 * scrollToDemo() to jump to the video section). The video's own lock/unlock
 * state is separate and local to VideoForm.tsx — submitting either form
 * (this modal or the inline one next to the video) calls the same
 * submitLead() below, which POSTs to the webhook, fires the Meta Pixel Lead
 * event, and flips `unlocked` for the modal's thank-you state.
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

  const openGate = useCallback(() => setModalOpen(true), []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const submitLead = useCallback(async (lead: Lead) => {
    setSubmitting(true);
    try {
      if (FORM_WEBHOOK) {
        await fetch(FORM_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, source: "overtime-hunch-oh4-landing" }),
        }).catch(() => {
          // Never block the visitor on a webhook failure — they still get the demo.
        });
      }
    } finally {
      setSubmitting(false);
      setUnlocked(true);
      trackPixelEvent("Lead");
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
