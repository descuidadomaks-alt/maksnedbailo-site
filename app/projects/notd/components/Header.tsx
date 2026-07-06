import { PRIVACY_NOTE, TOOL_SUBTITLE } from "../lib/config";

/**
 * Centered hero on an ink canvas with two soft ambient orbs. Content is one
 * balanced centered stack (eyebrow → title → subhead → CTA) rather than a tall
 * justify-between layout, so there are no empty voids on wide screens.
 */
export function Header() {
  return (
    <header className="relative flex min-h-[68svh] flex-col items-center justify-center overflow-hidden bg-[var(--reorder-ink)] px-5 py-20 text-center text-white sm:py-24">
      {/* Ambient orbs */}
      <div className="reorder-orb left-[-8rem] top-[-6rem] bg-[var(--reorder-accent)]" />
      <div
        className="reorder-orb bottom-[-8rem] right-[-8rem] bg-[var(--reorder-beige)]"
        style={{ animationDelay: "-3s" }}
      />

      <div className="relative flex max-w-3xl flex-col items-center">
        <p className="reorder-display text-xs tracking-[0.32em] text-[var(--reorder-accent)] sm:text-sm">
          {TOOL_SUBTITLE} · KeyCRM
        </p>

        <h1
          className="reorder-display mt-6"
          style={{ fontSize: "clamp(2.25rem, 6.5vw, 4.75rem)", lineHeight: 0.98 }}
        >
          <span className="block text-white">Прогноз</span>
          <span className="reorder-outline block">дозамовлення</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Завантажте два експорти з KeyCRM — і за секунди отримайте ранжований план:
          що замовити, скільки та наскільки терміново, з поясненням кожної рекомендації.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href="#tool"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--reorder-ink)] transition-transform hover:-translate-y-0.5"
          >
            Почати <span className="reorder-bounce">↓</span>
          </a>
          <span className="text-[11px] leading-relaxed text-[var(--reorder-accent)]">
            {PRIVACY_NOTE}
          </span>
        </div>
      </div>
    </header>
  );
}
