import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Mulish } from "next/font/google";
import { site } from "./lib/content";
import { PHONE_DISPLAY, RATING, REVIEW_COUNT } from "./lib/config";

/**
 * Para Ti — self-contained demo landing under /projects/parati.
 *
 * This is a PORTFOLIO showcase, not a live business page: still noindex.
 * All contact data/reviews are the real business's; photos are a mix of
 * real Instagram shots and placeholders (see lib/content.ts).
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

/** LocalBusiness JSON-LD — telephone + aggregateRating sourced from config.ts. */
function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: site.business,
    description: "Masajes y rituales de bienestar en Santander, Cantabria.",
    telephone: PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C. Isabel la Católica, 10",
      addressLocality: "Santander",
      addressRegion: "Cantabria",
      postalCode: "39007",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: parseFloat(RATING.replace(",", ".")),
      reviewCount: REVIEW_COUNT,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ParatiLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`pt-scope ${display.variable} ${body.variable}`}>
      <JsonLd />
      <style>{`
        /* Scope a clean light canvas — overrides the dark body background used elsewhere on the site. */
        .pt-scope { background: #F7F2E9; color: #3A332B; }
        .pt-scope ::selection { background: rgba(194,160,91,0.25); color: #3A332B; }

        /* Thin gold hairline used between footer items */
        .pt-scope .hairline { height: 1px; width: 100%; background: rgba(194,160,91,0.25); }

        /* Google Maps embed, tinted toward the cream/gold palette. Hover eases
           back to full colour so it stays usable (and keeps their Google map). */
        .pt-scope .pt-map {
          filter: sepia(0.38) saturate(0.82) hue-rotate(-10deg) brightness(1.04) contrast(0.92);
          transition: filter 550ms ease;
        }
        .pt-scope .pt-map:hover {
          filter: sepia(0.06) saturate(1) hue-rotate(0deg) brightness(1) contrast(1);
        }

        /* Floating WhatsApp button — clears the iOS home-indicator safe area. */
        .pt-scope .pt-fab {
          bottom: calc(1.25rem + env(safe-area-inset-bottom));
          right: calc(1.25rem + env(safe-area-inset-right));
        }
        @media (min-width: 640px) {
          .pt-scope .pt-fab {
            bottom: calc(1.75rem + env(safe-area-inset-bottom));
            right: calc(1.75rem + env(safe-area-inset-right));
          }
        }

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
          .pt-scope .pt-map { transition: none; }
        }
      `}</style>

      {children}
    </div>
  );
}
