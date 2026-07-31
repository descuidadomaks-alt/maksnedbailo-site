import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Anton } from "next/font/google";

/**
 * Overtime OS. — oos_v2 landing-page variant, self-contained under
 * /projects/oos_v2. Forked from app/projects/oos/layout.tsx: same scoped
 * styling (oh-scope wrapper, Anton display font, Satoshi body font via
 * Fontshare) so this never touches the rest of the dark maksnedbailo.site.
 * No Meta Pixel here (unlike oos/) — this variant only needs the guarded
 * gtag/clarity/fbq calls in lib/track.ts, not a real pixel base snippet.
 */

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-oh-display",
  display: "swap",
  preload: true,
});

const OG_TITLE = "Overtime OS — Your custom AI front office, answers every call, books every job";
const OG_DESCRIPTION = "Every lead answered, booked, and followed up. $499/mo, $0 setup.";
const CANONICAL_URL = "https://maksnedbailo.site/projects/oos_v2";

export const metadata: Metadata = {
  title: "Overtime OS. — Your custom AI front office, 24/7",
  description:
    "The AI operating system that runs your entire business. One system that answers every call, text, and form in seconds, qualifies the job, and books it on your calendar. $499/mo, $0 setup.",
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

export default function OosV2Layout({ children }: { children: ReactNode }) {
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
          line-height: 0.9;
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

        @keyframes oh-eq { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
        .oh-eq-bar { transform-origin: bottom; animation: oh-eq 0.9s ease-in-out infinite; }

        .oh-quiz-progress-fill {
          position: relative;
          overflow: hidden;
          background: #ffe17c;
          transition: width 400ms ease-out;
        }
        .oh-quiz-progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: translateX(-100%);
          animation: oh-quiz-shimmer 2.5s ease-in-out infinite;
        }
        @keyframes oh-quiz-shimmer { to { transform: translateX(100%); } }

        .oh-marquee-track {
          position: absolute;
          top: 0;
          left: 0;
          animation: oh-marquee 40s linear infinite;
          will-change: transform;
        }
        @keyframes oh-marquee { to { transform: translateX(-50%); } }

        @media (prefers-reduced-motion: reduce) {
          .oh-scope .oh-card { transition: none; }
          .oh-scope .oh-dot, .oh-scope .oh-eq-bar { animation: none; }
          .oh-scope .oh-quiz-progress-fill { transition: none; }
          .oh-scope .oh-quiz-progress-fill::after { animation: none; }
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
