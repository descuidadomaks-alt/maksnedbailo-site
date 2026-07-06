import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { MetaPixel } from "./components/MetaPixel";

/**
 * Overtime Hunch. — oh4 variant, self-contained paid-ad landing under
 * /projects/oh4. Full copy of /projects/oh3 (left untouched) re-gated for
 * the Carter campaign: locked demo video, IP-derived location copy, and
 * Meta Pixel. Self-hosted video lives at public/projects/oh4/demo.mp4.
 *
 * PORTFOLIO / campaign demo. Any dashboard-style numbers elsewhere in the
 * component tree are generic sample data — verify none render on this page.
 *
 * The subtree is scoped (`.oh-scope` wrapper + own fonts) so it never touches
 * the rest of the dark site. Display font is Anton (Google). Body font is
 * Satoshi, loaded from Fontshare via @import inside the scoped <style> below.
 */

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-oh-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Overtime Hunch. — Every lead answered, qualified & booked in under 60 seconds",
  description:
    "Done-for-you AI front desk for home-service pros. Your AI receptionist answers every call, text, and form in seconds, qualifies the job, and books it on your calendar. $499/mo, $0 setup.",
  openGraph: {
    title: "Overtime Hunch. — Every lead answered, qualified & booked",
    description:
      "Your AI receptionist picks up every call, text, and form in seconds — qualifies the job and books it straight onto your calendar. 24/7.",
  },
  // Campaign/demo page — keep it out of the index.
  robots: { index: false, follow: true },
};

export default function Oh4Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`oh-scope ${anton.variable}`}>
      {/* Satoshi (Fontshare) — not on next/font/google, loaded as a stylesheet. */}
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
      />
      {/* dangerouslySetInnerHTML so React skips the <style> text hydration diff. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Clean light canvas — overrides the site's dark body bg. */
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

        /* Anton display helper — uppercase, tight line-height per spec. */
        .oh-display {
          font-family: var(--font-oh-display), 'Arial Narrow', sans-serif;
          text-transform: uppercase;
          line-height: 0.9;
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        /* 40px grid pattern for the hero. */
        .oh-grid-bg {
          background-image:
            linear-gradient(to right, rgba(183,198,194,0.32) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(183,198,194,0.32) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Card micro-interaction timing from the spec. */
        .oh-card { transition: transform 300ms cubic-bezier(0.4,0,0.2,1), box-shadow 300ms cubic-bezier(0.4,0,0.2,1); }

        /* Chat "typing" dots. */
        @keyframes oh-blink { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 1; } }
        .oh-dot { animation: oh-blink 1.2s infinite; }

        /* Voice-call equalizer bars. */
        @keyframes oh-eq { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
        .oh-eq-bar { transform-origin: bottom; animation: oh-eq 0.9s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .oh-scope .oh-card { transition: none; }
          .oh-scope .oh-dot, .oh-scope .oh-eq-bar { animation: none; }
        }
      `,
        }}
      />

      <MetaPixel />
      {children}
    </div>
  );
}
