import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Mulish } from "next/font/google";

/**
 * Para Ti — self-contained demo landing under /projects/parati.
 *
 * This is a PORTFOLIO showcase, not a live business page: all contact data,
 * reviews and photos are placeholders (see lib/content.ts).
 *
 * The subtree is scoped (own fonts + a `.pt-scope` wrapper) so it never
 * touches the rest of the site. Brand design tokens (cream/gold palette,
 * font-display, tracking-label, rounded-soft, …) are additive entries in the
 * shared tailwind.config.ts and are not used anywhere else.
 */

// Soft, warm serif for headings — more readable than the previous Cormorant.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-pt-display",
  display: "swap",
});

// Clean, airy humanist sans for body + labels.
const body = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-pt-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Para Ti — Masajes y Bienestar (Demo) | Maks Nedbailo",
  description:
    "Demo de landing de conversión para un estudio de masaje premium en Santander. Diseño cálido y luminoso, una sola llamada a la acción: reservar por WhatsApp.",
  openGraph: {
    title: "Para Ti — Masajes y Bienestar (Demo)",
    description:
      "Demo de landing de conversión para un estudio de masaje premium. Diseñado y construido por Maks Nedbailo.",
    images: [{ url: "/projects/parati/og-image.jpg", width: 1200, height: 630 }],
  },
  // Demo page — keep it out of the index so it doesn't compete with real pages.
  robots: { index: false, follow: true },
};

export default function ParatiLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`pt-scope ${display.variable} ${body.variable}`}>
      <style>{`
        /* Scope a clean light canvas — overrides the site's dark body bg. */
        .pt-scope { background: #F7F2E9; color: #3A332B; }
        .pt-scope ::selection { background: rgba(194,160,91,0.25); color: #3A332B; }

        /* Thin gold hairline used between footer items */
        .pt-scope .hairline { height: 1px; width: 100%; background: rgba(194,160,91,0.25); }

        /* Hero petal drift — keyframes here so each petal can read its --drift var.
           Travels up and sways gently; fades in/out at the edges. */
        @keyframes pt-drift {
          0%   { transform: translate3d(0,0,0) rotate(0deg); opacity: 0; }
          12%  { opacity: 0.5; }
          50%  { transform: translate3d(var(--drift, 20px), -55vh, 0) rotate(120deg); }
          88%  { opacity: 0.35; }
          100% { transform: translate3d(0, -110vh, 0) rotate(240deg); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pt-scope .animate-bloom { animation: none !important; }
        }
      `}</style>

      {children}
    </div>
  );
}
