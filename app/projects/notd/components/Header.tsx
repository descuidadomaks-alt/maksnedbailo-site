import { PRIVACY_NOTE, TOOL_SUBTITLE } from "../lib/config";

/**
 * Cinematic-but-calm hero: ink canvas, two ambient orbs, a contained display
 * headline (clamped so the long Ukrainian word never overflows), one readable
 * subhead, and a clear primary CTA into the tool. No cramped micro-copy.
 */
export function Header() {
  return (
    <header className="relative flex min-h-[82svh] flex-col justify-between overflow-hidden bg-[var(--reorder-ink)] px-5 pb-8 pt-8 text-white sm:px-10 sm:pt-12">
      {/* Ambient orbs */}
      <div className="reorder-orb left-[-7rem] top-[-5rem] bg-[var(--reorder-accent)]" />
      <div
        className="reorder-orb bottom-[-9rem] right-[-7rem] bg-[var(--reorder-beige)]"
        style={{ animationDelay: "-3s" }}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between">
        <p className="reorder-display text-sm tracking-[0.3em] text-white">
          {TOOL_SUBTITLE}
        </p>
        <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--reorder-taupe)]">
          KeyCRM · Аналітика запасів
        </p>
      </div>

      {/* Headline block */}
      <div className="relative">
        <h1
          className="reorder-display"
          style={{ fontSize: "clamp(2.5rem, 12vw, 8.5rem)", lineHeight: 0.9 }}
        >
          <span className="block text-white">Прогноз</span>
          <span className="reorder-outline block">дозамовлення</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Завантажте два експорти з KeyCRM — і за секунди отримайте ранжований план:
          що замовити, скільки та наскільки терміново, з поясненням кожної рекомендації.
        </p>
      </div>

      {/* CTA row */}
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#tool"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--reorder-ink)] transition-transform hover:-translate-y-0.5"
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
