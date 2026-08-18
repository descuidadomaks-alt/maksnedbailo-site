"use client";

import type { V2Copy } from "../lib/copy";

/**
 * Splits a stat value like "88%", "$1.5B", "700" into a large numeral and
 * a smaller, raised prefix/suffix (currency symbol, unit letter, percent
 * sign) — same treatment as the reference bento stat grid.
 */
function StatNumber({ value, accent }: { value: string; accent?: boolean }) {
  const match = value.match(/^(\$)?([\d.,]+)([A-Za-z%]*)$/);
  const [, prefix, number, suffix] = match ?? [null, "", value, ""];
  return (
    <span
      className="font-playfair font-normal"
      style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 0.95, color: accent ? "var(--bg)" : "var(--fg)" }}
    >
      {prefix && (
        <span style={{ fontSize: "0.5em", verticalAlign: "text-top", opacity: 0.8 }}>{prefix}</span>
      )}
      {number}
      {suffix && (
        <span style={{ fontSize: "0.5em", verticalAlign: "text-top", opacity: 0.8 }}>{suffix}</span>
      )}
    </span>
  );
}

/**
 * Section 2 — THE PROBLEM. Band A: one statement + concrete pain examples,
 * no bullet wall. Band B: a bento stat grid of sourced, external facts —
 * no interpretation sentence added. The reader assembles the conclusion
 * (AI adoption is now normal, most of it fails, serious capital is betting
 * on doing it properly) without being told to.
 */
export default function V2Problem({ d }: { d: V2Copy }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 700px 420px at 8% 0%, rgba(212,255,43,0.035) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.problem.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-fg mx-auto mb-14"
          style={{ fontSize: "clamp(24px, 3.4vw, 46px)", lineHeight: 1.12, letterSpacing: "-0.022em", maxWidth: "18ch" }}
        >
          {d.problem.headline}
        </h2>

        <ul className="flex flex-col gap-5 text-left max-w-2xl mx-auto">
          {d.problem.items.map((item, i) => (
            <li
              key={i}
              data-reveal={`d${i % 4}`}
              className="font-sora font-light text-fg/62 leading-[1.7] pl-5"
              style={{ fontSize: "15px", borderLeft: "2px solid rgba(212,255,43,0.18)" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Band B — bento fact grid */}
      <div className="relative max-w-4xl mx-auto px-6 mt-20 md:mt-28">
        <p
          data-reveal
          className="font-label text-fg/40 text-center mb-6"
          style={{ fontSize: "9.5px", letterSpacing: "2.5px", textTransform: "uppercase" }}
        >
          {d.problem.factGridLabel}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {d.problem.factGrid.map((tile, i) => (
            <div
              key={tile.value}
              data-reveal={`d${i % 4}`}
              className={`rounded-2xl p-6 md:p-8 flex flex-col ${i === 0 ? "md:col-span-2" : ""}`}
              style={{
                border: tile.accent ? "1px solid rgba(212,255,43,0.5)" : "1px solid rgba(255,255,255,0.06)",
                background: tile.accent ? "var(--accent)" : "rgba(255,255,255,0.014)",
              }}
            >
              <StatNumber value={tile.value} accent={tile.accent} />
              <p
                className="font-sora font-light leading-[1.6] mt-3"
                style={{ fontSize: "14px", color: tile.accent ? "rgba(6,6,8,0.82)" : "rgba(240,236,230,0.62)", maxWidth: "48ch" }}
              >
                {tile.body}
              </p>
              <p
                className="font-label mt-4"
                style={{ fontSize: "10px", letterSpacing: "1px", color: tile.accent ? "rgba(6,6,8,0.5)" : "rgba(240,236,230,0.35)" }}
              >
                {tile.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
