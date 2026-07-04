// The "improve accuracy" survey: question definitions + how answers feed the
// forecast. lead time, service level and season change the math directly;
// the rest are captured to inform future refinements.
import type { ForecastConfig, SurveyAnswers } from "./types";

export const LEAD_TIME_OPTIONS = [
  { value: 7, label: "≈ тиждень" },
  { value: 14, label: "≈ 2 тижні" },
  { value: 30, label: "≈ місяць" },
  { value: 45, label: "≈ 1.5 місяця" },
  { value: 60, label: "≈ 2 місяці" },
] as const;

export const SERVICE_LEVEL_OPTIONS = [
  { value: "economical", label: "Ощадливо", hint: "мінімум запасу, менше замороженого капіталу" },
  { value: "balanced", label: "Збалансовано", hint: "розумний буфер (рекомендовано)" },
  { value: "max", label: "Ніколи не втрачати продаж", hint: "великий буфер, вищий запас" },
] as const;

export const SEASON_OPTIONS = [
  { value: "low", label: "Спад / міжсезоння", hint: "попит нижчий за звичайний" },
  { value: "normal", label: "Як зазвичай", hint: "стабільний попит" },
  { value: "up", label: "Зростання", hint: "попит росте" },
  { value: "peak", label: "Піковий сезон", hint: "свята, акції, ажіотаж" },
] as const;

const SERVICE_TO_SAFETY: Record<SurveyAnswers["serviceLevel"], number> = {
  economical: 7,
  balanced: 14,
  max: 30,
};

const SEASON_TO_MULTIPLIER: Record<SurveyAnswers["season"], number> = {
  low: 0.75,
  normal: 1,
  up: 1.3,
  peak: 1.6,
};

/** Fold the wired answers into the forecast config. */
export function applySurvey(config: ForecastConfig, answers: SurveyAnswers): ForecastConfig {
  return {
    ...config,
    lead_time_days: answers.leadTimeDays,
    safety_days: SERVICE_TO_SAFETY[answers.serviceLevel],
    demand_multiplier: SEASON_TO_MULTIPLIER[answers.season],
  };
}

/** Human summary of what the survey changed, for the confirmation line. */
export function summarizeSurvey(answers: SurveyAnswers): string {
  const season = SEASON_TO_MULTIPLIER[answers.season];
  const seasonTxt =
    season === 1 ? "звичайний попит" : `сезонний коефіцієнт ×${season}`;
  const captured = [answers.moq, answers.promo, answers.discontinuing, answers.budget].filter(
    (x) => x && x.trim(),
  ).length;
  const capturedTxt = captured > 0 ? ` Ще ${captured} ${captured === 1 ? "відповідь збережено" : "відповідей збережено"} для майбутніх уточнень.` : "";
  return `Оновлено прогноз: термін постачання ${answers.leadTimeDays} дн., рівень запасу «${answers.serviceLevel === "economical" ? "ощадливо" : answers.serviceLevel === "max" ? "максимальний" : "збалансовано"}», ${seasonTxt}.${capturedTxt}`;
}
