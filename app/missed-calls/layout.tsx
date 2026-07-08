import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Anton } from "next/font/google";

/**
 * Care Less — UK locksmith missed-call offer. Credibility/privacy-policy
 * destination for the Meta Instant Forms campaign, NOT the lead-capture
 * mechanism itself (that's the Instant Form on the ad — see
 * docs/care-less-uk-locksmith/creative-package.md). Self-contained route,
 * same oh-scope pattern as app/projects/oh4 (Anton display + Satoshi body,
 * scoped CSS so it never touches the rest of the site) but not cross-imported
 * from it — each campaign folder here is its own copy of the pattern.
 */

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-oh-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Care Less — Every missed call becomes a booked locksmith job",
  description:
    "AI answers your missed calls in under 60 seconds, qualifies the job, and books it into your diary — 24/7. UK locksmiths only. £167/mo pilot.",
  robots: { index: false, follow: true },
};

export default function MissedCallsLayout({ children }: { children: ReactNode }) {
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

        .oh-card { transition: transform 300ms cubic-bezier(0.4,0,0.2,1), box-shadow 300ms cubic-bezier(0.4,0,0.2,1); }

        .oh-grid-bg {
          background-image:
            linear-gradient(to right, rgba(183,198,194,0.32) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(183,198,194,0.32) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        @media (prefers-reduced-motion: reduce) {
          .oh-scope .oh-card { transition: none; }
        }
      `,
        }}
      />
      {children}
    </div>
  );
}
