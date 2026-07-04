import { KEYCRM_HINT } from "../lib/config";

const STEPS = [
  {
    n: "1",
    title: "Вивантажте два файли з KeyCRM",
    body: "Історія замовлень (продажі) і список товарів із поточними залишками — обидва у форматі .xlsx.",
  },
  {
    n: "2",
    title: "Завантажте їх сюди",
    body: "Перетягніть файли або вставте посилання на публічну Google Таблицю — система сама визначить, де замовлення, а де товари.",
  },
  {
    n: "3",
    title: "Отримайте план дозамовлення",
    body: "Ранжований список: що замовити зараз, скільки і на яку суму ризикує зупинка продажів.",
  },
];

export function OnboardingSteps() {
  return (
    <div className="mx-auto mt-10 max-w-3xl px-5">
      <div className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl border border-[var(--reorder-border)] bg-[var(--reorder-surface)] p-5"
          >
            <div className="reorder-display text-4xl text-[var(--reorder-accent)]">{s.n}</div>
            <h3 className="mt-3 text-sm font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--reorder-fg-muted)]">{s.body}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-lg text-center text-xs text-[var(--reorder-fg-muted)]">
        {KEYCRM_HINT}
      </p>
    </div>
  );
}
