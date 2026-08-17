"use client";

import ProofSection from "../../sections/ProofSection";
import { getNewDict } from "../../lib/i18n";
import type { NewLocale } from "../../lib/locale";
import type { V2Copy } from "../lib/copy";

/**
 * Section 4 — WORKING SYSTEMS / PROOF. Reuses the shared ProofSection
 * component (app/new/sections/ProofSection.tsx) — already used by /, /ai-map
 * and /partners/* — with its real, non-fabricated case content (Amira for
 * HC MedSpa, Elena Hotel & SPA, Voice AI on Site). Only the label/headline/
 * sub/CTA copy is swapped for V2's own (the live dict's proof.ctaLabel talks
 * about the Bottleneck Score, which V2 doesn't use). id="systems" is the
 * hero's "See what we've built" scroll target.
 */
export default function V2Proof({ d, locale, ctaHref }: { d: V2Copy; locale: NewLocale; ctaHref: string }) {
  const liveProof = getNewDict(locale).proof;
  const proof = {
    ...liveProof,
    label: d.proof.label,
    headline: d.proof.headline,
    sub: d.proof.sub,
    ctaLabel: d.proof.ctaLabel,
  };
  return (
    <div id="systems">
      <ProofSection proof={proof} scoreHref={ctaHref} />
    </div>
  );
}
