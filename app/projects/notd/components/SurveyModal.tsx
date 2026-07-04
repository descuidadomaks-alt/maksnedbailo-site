"use client";

import { useState } from "react";
import {
  LEAD_TIME_OPTIONS,
  SERVICE_LEVEL_OPTIONS,
  SEASON_OPTIONS,
} from "../lib/survey";
import type { SurveyAnswers } from "../lib/types";

/**
 * "Improve accuracy" survey. Lead time / service level / season feed the
 * forecast math immediately; the free-text answers are captured to refine
 * future logic. Deliberately quiz-like — pick a card, not fill a form.
 */
export function SurveyModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial?: Partial<SurveyAnswers>;
  onClose: () => void;
  onSubmit: (answers: SurveyAnswers) => void;
}) {
  const [leadTimeDays, setLeadTimeDays] = useState<number>(initial?.leadTimeDays ?? 30);
  const [serviceLevel, setServiceLevel] = useState<SurveyAnswers["serviceLevel"]>(
    initial?.serviceLevel ?? "balanced",
  );
  const [season, setSeason] = useState<SurveyAnswers["season"]>(initial?.season ?? "normal");
  const [moq, setMoq] = useState(initial?.moq ?? "");
  const [promo, setPromo] = useState(initial?.promo ?? "");
  const [discontinuing, setDiscontinuing] = useState(initial?.discontinuing ?? "");
  const [budget, setBudget] = useState(initial?.budget ?? "");

  function submit() {
    onSubmit({ leadTimeDays, serviceLevel, season, moq, promo, discontinuing, budget });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-[var(--reorder-bg)] p-6 sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="reorder-display text-2xl sm:text-3xl">Покращити точність</p>
            <p className="mt-1 text-sm text-[var(--reorder-fg-muted)]">
              Кілька питань про ваш бізнес — і прогноз стане точнішим саме для вас.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-2xl leading-none text-[var(--reorder-fg-muted)] hover:text-[var(--reorder-fg)]"
            aria-label="Закрити"
          >
            ×
          </button>
        </div>

        {/* Q1 — lead time (wired) */}
        <Question n="1" title="Скільки в середньому чекаєте на постачання?" wired>
          <div className="flex flex-wrap gap-2">
            {LEAD_TIME_OPTIONS.map((o) => (
              <Choice key={o.value} active={leadTimeDays === o.value} onClick={() => setLeadTimeDays(o.value)}>
                {o.label}
              </Choice>
            ))}
          </div>
        </Question>

        {/* Q2 — service level (wired) */}
        <Question n="2" title="Наскільки важливо ніколи не залишатися без товару?" wired>
          <div className="grid gap-2 sm:grid-cols-3">
            {SERVICE_LEVEL_OPTIONS.map((o) => (
              <Choice
                key={o.value}
                active={serviceLevel === o.value}
                onClick={() => setServiceLevel(o.value)}
                block
                hint={o.hint}
              >
                {o.label}
              </Choice>
            ))}
          </div>
        </Question>

        {/* Q3 — season (wired) */}
        <Question n="3" title="Що очікується з попитом найближчі 30 днів?" wired>
          <div className="grid gap-2 sm:grid-cols-2">
            {SEASON_OPTIONS.map((o) => (
              <Choice
                key={o.value}
                active={season === o.value}
                onClick={() => setSeason(o.value)}
                block
                hint={o.hint}
              >
                {o.label}
              </Choice>
            ))}
          </div>
        </Question>

        {/* Q4-7 — captured for future refinement */}
        <Question n="4" title="Мінімальна партія / сума замовлення у постачальника?">
          <TextInput value={moq} onChange={setMoq} placeholder="напр. від 5 000 грн або 50 шт" />
        </Question>
        <Question n="5" title="Плануєте акції чи запуск нових товарів?">
          <TextInput value={promo} onChange={setPromo} placeholder="напр. розпродаж баз у березні" />
        </Question>
        <Question n="6" title="Є товари, які виводите з асортименту?">
          <TextInput value={discontinuing} onChange={setDiscontinuing} placeholder="напр. стара лінійка топів" />
        </Question>
        <Question n="7" title="Орієнтовний бюджет на закупівлю цього місяця?">
          <TextInput value={budget} onChange={setBudget} placeholder="напр. 40 000 грн" />
        </Question>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--reorder-fg-muted)] hover:text-[var(--reorder-fg)]"
          >
            Скасувати
          </button>
          <button
            type="button"
            onClick={submit}
            className="rounded-full bg-[var(--reorder-ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85"
          >
            Застосувати до прогнозу
          </button>
        </div>
      </div>
    </div>
  );
}

function Question({
  n,
  title,
  wired,
  children,
}: {
  n: string;
  title: string;
  wired?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 border-t border-[var(--reorder-border)] pt-5">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="reorder-display text-lg text-[var(--reorder-accent)]">{n}</span>
        <div>
          <p className="text-sm font-semibold leading-snug">{title}</p>
          {wired && (
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--reorder-accent-deep)]">
              впливає на розрахунок
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
  block,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  block?: boolean;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
        block ? "w-full" : ""
      } ${
        active
          ? "border-[var(--reorder-ink)] bg-[var(--reorder-ink)] text-white"
          : "border-[var(--reorder-border)] bg-[var(--reorder-surface)] hover:border-[var(--reorder-accent)]"
      }`}
    >
      <span className="font-medium">{children}</span>
      {hint && (
        <span className={`mt-0.5 block text-[11px] ${active ? "text-white/70" : "text-[var(--reorder-fg-muted)]"}`}>
          {hint}
        </span>
      )}
    </button>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[var(--reorder-border)] bg-[var(--reorder-surface)] px-3 py-2.5 text-sm"
    />
  );
}
