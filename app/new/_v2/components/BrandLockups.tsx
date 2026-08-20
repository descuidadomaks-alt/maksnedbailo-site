"use client";

/**
 * Brand marks, referenced nominatively to identify the companies in the
 * proof row and the funder credit line.
 *
 * ── The SVGs ──
 * The files under /public/logos are NOT the vendor originals. Each one was
 * reduced to its wordmark: background panels removed, every fill forced to
 * #fff, and the viewBox re-cut to the tight bounding box of the letterforms.
 * That was necessary because the originals are knockout logos —
 *   IKEA      = blue panel + yellow ellipse + blue letters
 *   Goldman   = blue square + white stacked "Goldman / Sachs"
 *   Blackstone= full-bleed black rectangle + white wordmark
 * — so the earlier `brightness(0) invert(1)` filter turned three of them
 * into solid white rectangles, and dropping the filter left two of them
 * black-on-black. Recolouring at the source fixes both failure modes and
 * keeps the counters (the hole in "O", "a", "e") intact.
 *
 * The page background is always var(--bg) #060608, so a baked-in white fill
 * is correct here; opacity is what tunes each row's weight.
 *
 * ── Sizing ──
 * These marks have wildly different proportions — 8.9:1 for Anthropic's
 * wordmark against 2.6:1 for Goldman's two-line stack. Rendering them at a
 * common HEIGHT makes Anthropic enormous and Goldman tiny; at a common
 * WIDTH it is the other way round. Neither is what the eye reads as "the
 * same size".
 *
 * So each mark is scaled to a constant optical mass instead:
 *
 *     scale = MASS / sqrt(width x opticalHeight)
 *
 * `opticalHeight` is the mark's cap-height, not its box height, which is
 * what separates the three tricky cases from the simple ones:
 *  - Octopus' box is 64 tall but its capitals are only 37.8 — the rest is
 *    the descenders of "p", "g" and "y". Measuring the box would render the
 *    wordmark ~40% too small.
 *  - Goldman is two stacked lines, so its per-line cap-height is roughly
 *    half the block. 15 is the effective single-line metric that puts its
 *    cap-height alongside the one-line marks in the same row.
 *  - Vodafone's height is set by the speech-mark roundel, not the lowercase.
 *
 * All boxes below were measured with getBBox() on the cleaned files; if a
 * file is ever re-cut, re-measure rather than guessing.
 */

interface Mark {
  src: string;
  alt: string;
  /** viewBox width of the cleaned file. */
  w: number;
  /** viewBox height of the cleaned file. */
  h: number;
  /** Cap-height used for optical scaling. See the header note. */
  optical: number;
}

const MARKS = {
  anthropic:  { src: "/logos/anthropic.svg",  alt: "Anthropic",     w: 1024.2, h: 115,  optical: 115 },
  blackstone: { src: "/logos/blackstone.svg", alt: "Blackstone",    w: 444.7,  h: 70.7, optical: 70.7 },
  goldman:    { src: "/logos/goldman.svg",    alt: "Goldman Sachs", w: 57.4,   h: 21.9, optical: 15 },
  ikea:       { src: "/logos/ikea.svg",       alt: "IKEA",          w: 81.5,   h: 15.3, optical: 15.3 },
  octopus:    { src: "/logos/octopus.svg",    alt: "Octopus Energy", w: 467.3, h: 64,   optical: 37.8 },
  vodafone:   { src: "/logos/vodafone.svg",   alt: "Vodafone",      w: 140.8,  h: 34.9, optical: 34.9 },
} satisfies Record<string, Mark>;

/**
 * Optical mass per row. Chosen so the widest mark in each row still fits
 * its container, both measured in the browser rather than guessed:
 *  - proof column is 176px wide -> Octopus, the longest wordmark, lands at
 *    162px and everything else is narrower.
 *  - funder tile is 406px wide and laid out 2-up, so each cell is ~191px ->
 *    Anthropic, the longest, lands at 113px.
 */
const PROOF_MASS = 46;
const FUNDER_MASS = 38;

function sized(m: Mark, mass: number) {
  const scale = mass / Math.sqrt(m.w * m.optical);
  return { height: m.h * scale, width: m.w * scale };
}

function Lockup({ mark, mass, opacity }: { mark: Mark; mass: number; opacity: number }) {
  const { height, width } = sized(mark, mass);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mark.src}
      alt={mark.alt}
      width={Math.round(width)}
      height={Math.round(height)}
      loading="lazy"
      decoding="async"
      style={{
        // Width drives the size and height follows the viewBox, so a
        // container narrower than the computed width shrinks the mark
        // instead of squashing it.
        width: `${width.toFixed(1)}px`,
        height: "auto",
        maxWidth: "100%",
        display: "block",
        opacity,
      }}
    />
  );
}

/**
 * Hellman & Friedman have no public SVG wordmark. Their real mark is a
 * plain letterspaced wordmark, so setting it as type is a fair likeness
 * rather than a placeholder — but it has to sit on the same cap-height as
 * the drawn marks next to it or the row reads as "three logos and some
 * text". FUNDER_MASS / sqrt(...) puts the single-line marks at ~13-15px
 * tall; 12px type with the label font's cap-height matches that. It scales
 * down on narrow viewports because the funder cell is only ~123px there and
 * this is the longest string in the row.
 */
function TextLockup({ text, opacity }: { text: string; opacity: number }) {
  return (
    <span
      className="font-label"
      style={{
        // Measured: at 12px this string is exactly as wide as its 191px
        // grid cell, with nothing left for a font fallback. 11px leaves ~16px.
        fontSize: "clamp(9px, 2.2vw, 11px)",
        lineHeight: 1,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        color: "#fff",
        opacity,
      }}
    >
      {text}
    </span>
  );
}

const PROOF_OPACITY = 0.9;
const FUNDER_OPACITY = 0.75;

/** Proof-row marks, keyed by the company name used in copy.ts. */
export const PROOF_LOCKUPS: Record<string, () => JSX.Element> = {
  IKEA: () => <Lockup mark={MARKS.ikea} mass={PROOF_MASS} opacity={PROOF_OPACITY} />,
  "Octopus Energy": () => <Lockup mark={MARKS.octopus} mass={PROOF_MASS} opacity={PROOF_OPACITY} />,
  Vodafone: () => <Lockup mark={MARKS.vodafone} mass={PROOF_MASS} opacity={PROOF_OPACITY} />,
};

/** Funder marks for the $1.5B tile, keyed by the string in copy.ts. */
export const FUNDER_LOCKUPS: Record<string, () => JSX.Element> = {
  Anthropic: () => <Lockup mark={MARKS.anthropic} mass={FUNDER_MASS} opacity={FUNDER_OPACITY} />,
  Blackstone: () => <Lockup mark={MARKS.blackstone} mass={FUNDER_MASS} opacity={FUNDER_OPACITY} />,
  "Goldman Sachs": () => <Lockup mark={MARKS.goldman} mass={FUNDER_MASS} opacity={FUNDER_OPACITY} />,
  "Hellman & Friedman": () => <TextLockup text="HELLMAN &amp; FRIEDMAN" opacity={FUNDER_OPACITY} />,
};
