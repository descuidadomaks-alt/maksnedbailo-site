"use client";

import type { V2Copy } from "../lib/copy";
import { FUNDER_LOCKUPS } from "../components/BrandLockups";

/**
 * One icon per pain, drawn to match the moment described rather than a
 * generic "chat bubble" set: a clock at night, a ringing phone going to
 * voicemail, a document sinking into a stack, a loop of repeated replies.
 */
const PAIN_ICONS = [
  // Friday night lead — moon + clock
  <svg key="a" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="13" r="7.2" />
    <path d="M12 9.6V13l2.4 1.6" />
    <path d="M17.6 3.4a3.4 3.4 0 1 0 3.1 4.8" />
  </svg>,
  // Missed call — phone with slash
  <svg key="b" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6.5 3.5 9 8l-2 1.6a12 12 0 0 0 5.9 5.9L14.5 13l4.5 2.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3.5 7.7 2 2 0 0 1 5.5 5.5z" />
    <path d="M3 3l18 18" />
  </svg>,
  // Lost quote — document sinking into lines
  <svg key="c" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M8 2.8h5.5L18 7.3v6.4" />
    <path d="M13 2.8v4.6h4.6" />
    <path d="M8 2.8H6.4a1.4 1.4 0 0 0-1.4 1.4v9.5" />
    <path d="M3 17.4h18M3 20.8h18" />
  </svg>,
  // Same questions — repeat loop
  <svg key="d" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(212,255,43,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3.8 9.6a8.4 8.4 0 0 1 14-3.3l2.4 2.2" />
    <path d="M20.2 14.4a8.4 8.4 0 0 1-14 3.3l-2.4-2.2" />
    <path d="M20.6 3.6v4.9h-4.9M3.4 20.4v-4.9h4.9" />
  </svg>,
];

/** Big stat numeral. Rendered as one solid unit — no superscript tricks. */
function StatNumber({ value, accent }: { value: string; accent?: boolean }) {
  return (
    <span
      className="font-playfair font-normal block"
      style={{
        fontSize: "clamp(46px, 6.4vw, 82px)",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        color: accent ? "var(--bg)" : "var(--fg)",
      }}
    >
      {value}
    </span>
  );
}

/**
 * Section 2 — SOUND FAMILIAR. Four recognisable moments, each with its own
 * icon so the section is scannable without reading, then two facts. Only
 * two: one about what the customer does (speed decides the sale) and one
 * about where serious money is going. No interpretation line under them —
 * the reader draws the conclusion, which is the only version they cannot
 * argue with.
 */
export default function V2Problem({ d }: { d: V2Copy }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 700px 420px at 8% 0%, rgba(212,255,43,0.035) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.problem.label}
          </p>
          <h2
            data-reveal
            className="font-playfair font-normal text-fg mx-auto mb-14"
            style={{ fontSize: "clamp(24px, 3.4vw, 44px)", lineHeight: 1.14, letterSpacing: "-0.022em", maxWidth: "20ch" }}
          >
            {d.problem.headline}
          </h2>
        </div>

        {/* Four pains, icon-led */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {d.problem.items.map((item, i) => (
            <div
              key={item.title}
              data-reveal={`d${i % 4}`}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.012] p-6 flex items-start gap-4 hover:border-white/[0.09] transition-colors duration-300"
            >
              <span
                className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ border: "1px solid rgba(212,255,43,0.2)", background: "rgba(212,255,43,0.05)" }}
              >
                {PAIN_ICONS[i]}
              </span>
              <div>
                <h3 className="font-playfair font-normal text-fg mb-1.5" style={{ fontSize: "16px", lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p className="font-sora font-light text-fg/60 leading-[1.65]" style={{ fontSize: "13.5px" }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Two facts */}
        <div className="mt-20 md:mt-24">
          <p
            data-reveal
            className="font-label text-fg/40 text-center mb-6"
            style={{ fontSize: "9.5px", letterSpacing: "2.5px", textTransform: "uppercase" }}
          >
            {d.problem.factGridLabel}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {d.problem.factGrid.map((tile, i) => (
              <div
                key={tile.value}
                data-reveal={`d${i}`}
                className="relative rounded-2xl overflow-hidden flex flex-col justify-between"
                style={{
                  minHeight: "270px",
                  border: tile.accent ? "1px solid rgba(212,255,43,0.5)" : "1px solid rgba(255,255,255,0.07)",
                  // Accent tile: flat brand green. Dark tile: a soft mesh so
                  // it reads as a designed surface rather than an empty box
                  // even before a photograph is dropped in.
                  background: tile.accent
                    ? "var(--accent)"
                    : "radial-gradient(ellipse 90% 120% at 12% 0%, rgba(34,158,217,0.11) 0%, transparent 62%), radial-gradient(ellipse 80% 100% at 100% 100%, rgba(212,255,43,0.07) 0%, transparent 60%), rgba(255,255,255,0.016)",
                }}
              >
                {/* Optional photograph, under a heavy scrim so the numerals
                    and body copy keep their contrast. */}
                {/* Photo at full strength, hidden behind a LEFT-TO-RIGHT
                    scrim: near-solid over the numerals and body copy on the
                    left, clearing toward the right so the image is actually
                    visible there. A flat overlay across the whole tile just
                    made the photo look like a printing fault. */}
                {tile.image && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tile.image}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "cover", objectPosition: "70% 50%" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: tile.accent
                          ? "linear-gradient(90deg, var(--accent) 0%, var(--accent) 34%, rgba(212,255,43,0.94) 52%, rgba(212,255,43,0.66) 78%, rgba(212,255,43,0.42) 100%)"
                          : "linear-gradient(90deg, rgba(6,6,8,0.98) 0%, rgba(6,6,8,0.96) 34%, rgba(6,6,8,0.86) 55%, rgba(6,6,8,0.6) 80%, rgba(6,6,8,0.4) 100%)",
                      }}
                    />
                  </>
                )}

                <div className="relative p-7 md:p-9 flex flex-col justify-between h-full">
                  <StatNumber value={tile.value} accent={tile.accent} />

                  <div className="mt-5">
                    <p
                      className="font-sora font-light leading-[1.55]"
                      style={{
                        fontSize: tile.accent ? "17px" : "14px",
                        color: tile.accent ? "rgba(6,6,8,0.85)" : "rgba(240,236,230,0.68)",
                      }}
                    >
                      {tile.body}
                    </p>

                    {/* Funder credit line, laid out 2-up rather than 4-up.
                        The row is only ~406px wide and these four marks have
                        very different proportions (Anthropic's wordmark is
                        8.9:1, Goldman's is a 2.6:1 two-line stack), so a
                        single row either overflowed or forced every mark
                        down to ~10px tall. Two columns give each mark its
                        natural optical size and read as a deliberate block.
                        Sizing itself lives in BrandLockups. */}
                    {tile.funders && (
                      <div
                        className="grid grid-cols-2 gap-x-6 gap-y-4 items-center mt-5 pt-4"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        {tile.funders.map((f) => {
                          const Lockup = FUNDER_LOCKUPS[f];
                          return Lockup ? (
                            <Lockup key={f} />
                          ) : (
                            <span key={f} className="font-label" style={{ fontSize: "10px", color: "#fff", opacity: 0.75 }}>{f}</span>
                          );
                        })}
                      </div>
                    )}

                    <p
                      className="font-label mt-3"
                      style={{ fontSize: "10px", letterSpacing: "1px", color: tile.accent ? "rgba(6,6,8,0.5)" : "rgba(240,236,230,0.32)" }}
                    >
                      {tile.source}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
