"use client";

import Link from "next/link";
import {
  getScore,
  getTier,
  getMonthlyEstimate,
  getTopLeakCategory,
  LEAK_CATEGORY_LABELS,
  LEAK_CATEGORY_COPY,
  LEAK_CATEGORY_TIPS,
  formatEUR,
} from "../lib/quiz";
import { CTA_TARGET, WA_NUMBER } from "@/app/new/lib/config";
import { FOUNDING_RATE, FOUNDING_DEADLINE_EN } from "@/app/new/lib/site.config";
import TierGauge from "./TierGauge";

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** /score — result screen. Shareable via ?a= (decoded answers, see page.tsx). */
export default function ResultScreen({ answers }: { answers: number[] }) {
  const score = getScore(answers);
  const tier = getTier(score);
  const bandIndex = answers[7];
  const estimate = getMonthlyEstimate(score, bandIndex);
  const leakCategory = getTopLeakCategory(answers);
  const leakLabel = LEAK_CATEGORY_LABELS[leakCategory];

  const annualLow = estimate.low * 12;
  const annualHigh = estimate.high * 12;

  const isContained = tier === "Contained";
  const isUnderOneMillion = bandIndex === 0;

  return (
    <div className="quiz-step max-w-xl w-full mx-auto text-center">
      <p
        className="font-label text-accent/70 mb-4"
        style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
      >
        {tier} zone
      </p>

      <TierGauge score={score} tier={tier} />

      <p
        className="font-label text-accent/70 mb-3"
        style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
      >
        Your bottleneck snapshot
      </p>

      <h1
        className="font-numeral font-semibold text-fg mb-2"
        style={{ fontSize: "clamp(36px, 7vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
      >
        {formatEUR(estimate.low)}–{formatEUR(estimate.high)}
        <span className="font-sora font-light text-fg/35" style={{ fontSize: "0.35em" }}>
          /mo
        </span>
      </h1>
      <p className="font-sora font-light text-fg/45 mb-1.5" style={{ fontSize: "15px" }}>
        Estimated monthly cost of the founder bottleneck
      </p>
      <p className="font-numeral text-fg/28 mb-6" style={{ fontSize: "13px" }}>
        (~{formatEUR(annualLow)}–{formatEUR(annualHigh)}/year)
      </p>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 mb-6 text-left">
        <p
          className="font-label text-accent/65 mb-2.5"
          style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}
        >
          #1 leak category: {leakLabel}
        </p>
        <p className="font-sora font-light text-fg/65 leading-[1.65]" style={{ fontSize: "14px" }}>
          {LEAK_CATEGORY_COPY[leakCategory]}
        </p>
      </div>

      <p
        className="font-sora font-light italic text-fg/35 mb-6 mx-auto"
        style={{ fontSize: "13px", lineHeight: 1.6, maxWidth: "44ch" }}
      >
        This is an estimate from 8 questions. The Bottleneck Map makes it exact — 90
        minutes, your real numbers, ROI-ranked.
      </p>

      {/* ── CTA block ───────────────────────────────────────────────────── */}
      {isContained ? (
        <div className="flex flex-col items-center gap-4">
          <p className="font-sora font-light text-fg/55 mx-auto" style={{ fontSize: "14px", lineHeight: 1.6, maxWidth: "40ch" }}>
            Nice — you&apos;re not the bottleneck. Most founders aren&apos;t this far
            ahead. If you ever feel the ceiling, you know where I am.
          </p>
          <a
            href={waLink(`Hi Maks, I just took the Bottleneck Score — I'm in the '${tier}' zone. Can we talk?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80"
            style={{ fontSize: "14px", color: "rgba(74,222,128,0.85)", letterSpacing: "-0.01em" }}
          >
            <WhatsAppIcon />
            WhatsApp me
          </a>
        </div>
      ) : isUnderOneMillion ? (
        <div className="flex flex-col items-center gap-3">
          <p className="font-sora font-light text-fg/55 mx-auto" style={{ fontSize: "13px", lineHeight: 1.6, maxWidth: "44ch" }}>
            At your stage the Map usually isn&apos;t worth the fee yet — here&apos;s the
            one thing to fix first:
          </p>
          <p className="font-sora font-light text-fg/65 leading-[1.6] mx-auto" style={{ fontSize: "13.5px", maxWidth: "44ch" }}>
            {LEAK_CATEGORY_TIPS[leakCategory]}
          </p>
          <a
            href={waLink(`Hi Maks, I just took the Bottleneck Score — I'm in the '${tier}' zone. Can we talk?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80 mt-1"
            style={{ fontSize: "14px", color: "rgba(74,222,128,0.85)", letterSpacing: "-0.01em" }}
          >
            <WhatsAppIcon />
            WhatsApp me the result
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <a
            href={CTA_TARGET}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)] w-full sm:w-auto"
            style={{ fontSize: "15px", padding: "18px 32px", minHeight: "58px", letterSpacing: "-0.01em" }}
          >
            Book the Bottleneck Map — {FOUNDING_RATE} {FOUNDING_DEADLINE_EN}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>
              →
            </span>
          </a>
          <a
            href={waLink(`Hi Maks, I just took the Bottleneck Score — I'm in the '${tier}' zone (${formatEUR(estimate.low)}–${formatEUR(estimate.high)}/mo). Can we talk?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80"
            style={{ fontSize: "14px", color: "rgba(74,222,128,0.85)", letterSpacing: "-0.01em" }}
          >
            <WhatsAppIcon />
            WhatsApp me the result
          </a>
        </div>
      )}

      <Link
        href="/score"
        className="inline-block font-sora font-light text-fg/22 hover:text-fg/45 transition-colors duration-200 mt-8"
        style={{ fontSize: "12px" }}
      >
        Take the score again
      </Link>
    </div>
  );
}
