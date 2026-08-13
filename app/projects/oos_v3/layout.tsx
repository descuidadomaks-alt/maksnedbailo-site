import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Anton } from "next/font/google";

/**
 * Overtime OS. — oos_v3 landing-page variant, self-contained under
 * /projects/oos_v3. Same scoped styling (oh-scope wrapper, Anton display
 * font, Satoshi body font via Fontshare) as the sibling pages so this never
 * touches the rest of maksnedbailo.site. No price anywhere in metadata —
 * this variant's whole bet is the opposite of oos_v2/oos_v2_1's price-led
 * framing.
 */

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-oh-display",
  display: "swap",
  preload: true,
});

const OG_TITLE = "Overtime OS — Call your own business right now. See what your customer hears.";
const OG_DESCRIPTION =
  "A free missed-call audit: we call your business line after hours and send you the recording.";
const CANONICAL_URL = "https://maksnedbailo.site/projects/oos_v3";

export const metadata: Metadata = {
  title: "Overtime OS. — Free Missed-Call Audit",
  description:
    "See what your customers hear when they call after hours. Overtime OS answers every call, text, and website lead, qualifies it, and books it straight to your calendar — managed by real people. Get a free missed-call audit.",
  keywords: [],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    type: "website",
    url: CANONICAL_URL,
    siteName: "Overtime OS",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
  // A/B test variant, not the canonical page — keep it out of the index.
  robots: { index: false, follow: true },
};

export default function OosV3Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`oh-scope ${anton.variable}`}>
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .oh-scope {
          --oh-yellow: #ffe17c;
          --oh-charcoal: #171e19;
          --oh-dark: #272727;
          --oh-sage: #b7c6c2;
          --font-oh-body: 'Satoshi', ui-sans-serif, system-ui, sans-serif;
          background: #ffffff;
          color: var(--oh-charcoal);
          font-family: var(--font-oh-body);
          -webkit-font-smoothing: antialiased;
        }
        .oh-scope ::selection { background: rgba(255,225,124,0.5); color: var(--oh-charcoal); }

        .oh-display {
          font-family: var(--font-oh-display), 'Arial Narrow', sans-serif;
          text-transform: uppercase;
          line-height: 1;
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        .oh-grid-bg {
          background-image:
            linear-gradient(to right, rgba(183,198,194,0.32) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(183,198,194,0.32) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .oh-card { transition: transform 300ms cubic-bezier(0.4,0,0.2,1), box-shadow 300ms cubic-bezier(0.4,0,0.2,1); }

        @keyframes oh-blink { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 1; } }
        .oh-dot { animation: oh-blink 1.2s infinite; }

        .oh-marquee-track {
          position: absolute;
          top: 0;
          left: 0;
          animation: oh-marquee 70s linear infinite;
          will-change: transform;
        }
        @keyframes oh-marquee { to { transform: translateX(-50%); } }

        @media (prefers-reduced-motion: reduce) {
          .oh-scope .oh-card { transition: none; }
          .oh-scope .oh-dot { animation: none; }
          .oh-scope .oh-marquee-track {
            animation: none;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `,
        }}
      />

      {children}
    </div>
  );
}
