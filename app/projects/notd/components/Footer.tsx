import { FOOTER_CREDIT, FOOTER_LINK, TOOL_SUBTITLE } from "../lib/config";

/** Editorial footer: ink canvas, massive hollow wordmark, 1px hairline bottom row. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--reorder-ink)] px-5 pb-8 pt-16 sm:px-10">
      <div
        className="reorder-orb left-1/2 top-[-10rem] bg-[var(--reorder-accent)]"
        style={{ animationDelay: "-2s" }}
      />
      <p className="reorder-display reorder-outline relative text-center text-[13vw] leading-none sm:text-[9vw]">
        {TOOL_SUBTITLE}
      </p>
      <div className="relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
        <a
          href={FOOTER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] uppercase tracking-[0.18em] text-[var(--reorder-taupe)] transition-colors hover:text-[var(--reorder-accent)]"
        >
          {FOOTER_CREDIT}
        </a>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/30">
          Дані обробляються локально
        </p>
      </div>
    </footer>
  );
}
