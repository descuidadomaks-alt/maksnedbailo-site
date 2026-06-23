/**
 * Section 2 — the only hard stat on the page (verified). Dark band.
 * Integration line names real tools the owner already uses. No fake logos.
 */
export function ProofStrip() {
  return (
    <section className="bg-[#171e19] py-14 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="oh-display text-6xl text-[#ffe17c] sm:text-8xl">78%</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85 sm:text-xl">
          78% of customers hire the first business that replies. The average company takes
          47 hours. Your competitors are slow. That&apos;s your opening.
        </p>

        <div className="mt-10 border-t border-[#b7c6c2]/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Works with the tools you already use
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/75">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>📅</span> Google Calendar
            </span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>📞</span> Your phone
            </span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>🗂️</span> Your CRM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
