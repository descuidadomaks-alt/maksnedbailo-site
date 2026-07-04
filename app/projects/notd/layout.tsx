import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Oswald, IBM_Plex_Sans } from "next/font/google";

/**
 * Inventory reorder forecast tool — self-contained client-side demo under
 * /projects/notd, built for a nail-supply e-commerce client (Nailsoftheday)
 * whose partner Eldar needs to test it with real KeyCRM exports via a link.
 *
 * 100% client-side: .xlsx parsing (SheetJS) and all forecasting math run in
 * the browser, nothing is ever uploaded to a server. Ported 1:1 from a
 * verified local Python MVP — see app/projects/notd/lib/.
 *
 * Aesthetic: editorial/cinematic (massive condensed display type, ink-dark
 * hero + footer, ambient blurred orbs, 1px borders) on the Nailsoftheday
 * nude/rose palette. Display font is Oswald, NOT Anton: the page is
 * Ukrainian and Anton has no Cyrillic glyphs — Oswald is the closest
 * condensed-uppercase Google font with full Cyrillic coverage.
 *
 * Scoped subtree (`.reorder-scope` wrapper + own fonts), matching the
 * /projects/oh3 pattern, so it never touches the rest of the dark site.
 */

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-reorder-display",
  display: "swap",
  preload: true,
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-reorder-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Прогноз дозамовлення — Nailsoftheday",
  description:
    "Клієнтський інструмент прогнозу дозамовлення товару на основі експортів KeyCRM. Дані обробляються локально у браузері.",
  robots: { index: false, follow: true },
};

export default function ReorderLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`reorder-scope ${oswald.variable} ${plexSans.variable}`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .reorder-scope {
          /* Nailsoftheday nude/rose palette + editorial ink/taupe/beige support colors. */
          --reorder-ink: #1E1715;
          --reorder-charcoal: #302B2F;
          --reorder-bg: #FFFBF9;
          --reorder-surface: #FFFFFF;
          --reorder-accent-soft: #F5E6E0;
          --reorder-accent: #D9A5A0;
          --reorder-accent-deep: #B97F79;
          --reorder-taupe: #9F8D8B;
          --reorder-beige: #D7C5B2;
          --reorder-fg: #2B2320;
          --reorder-fg-muted: #766158;
          --reorder-border: #EFE0DA;
          --font-reorder-display-stack: var(--font-reorder-display), 'Arial Narrow', sans-serif;
          --font-reorder-body-stack: var(--font-reorder-body), ui-sans-serif, system-ui, sans-serif;
          background: var(--reorder-bg);
          color: var(--reorder-fg);
          font-family: var(--font-reorder-body-stack);
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }
        .reorder-scope ::selection { background: var(--reorder-accent-soft); color: var(--reorder-fg); }

        /* Condensed editorial display type (Oswald standing in for Anton — Cyrillic). */
        .reorder-display {
          font-family: var(--font-reorder-display-stack);
          text-transform: uppercase;
          font-weight: 500;
          line-height: 0.92;
          letter-spacing: 0.005em;
        }

        /* Hollow display line — 1px rose stroke, transparent fill. */
        .reorder-outline {
          color: transparent;
          -webkit-text-stroke: 1.5px var(--reorder-accent);
        }

        /* Ambient floating orbs: large blurred circles, slow vertical drift. */
        @keyframes reorder-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .reorder-orb {
          position: absolute;
          width: 24rem;
          height: 24rem;
          border-radius: 9999px;
          filter: blur(120px);
          opacity: 0.2;
          pointer-events: none;
          animation: reorder-float 6s ease-in-out infinite;
        }

        /* Bouncing scroll cue. */
        @keyframes reorder-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .reorder-bounce { animation: reorder-bounce 1.6s ease-in-out infinite; }

        .reorder-scope input:focus-visible,
        .reorder-scope button:focus-visible,
        .reorder-scope textarea:focus-visible {
          outline: 2px solid var(--reorder-accent-deep);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .reorder-scope .reorder-orb, .reorder-scope .reorder-bounce { animation: none; }
        }
      `,
        }}
      />
      {children}
    </div>
  );
}
