import type { ReactNode } from 'react'
import { Cormorant_Garamond, IBM_Plex_Sans } from 'next/font/google'
import type { Metadata } from 'next'

/**
 * Client demo, same as every other page under /projects. noindex to match
 * them: it was the only one missing a robots field, so it was the only one
 * Google could index.
 *
 * It matters more here than for the other demos. This page is a
 * Russian-language Phuket real-estate site for a different person, so an
 * indexed copy under maksnedbailo.site tells Google the domain is partly
 * about overseas property, which works directly against the AI-automation
 * terms the homepage and /ai-map are trying to rank for.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Roman Shiglo — Инвестиции в недвижимость Пхукета',
  description: 'Независимый советник по инвестициям в недвижимость. Пхукет · Дубай. Проверенные off-plan объекты, юридическая защита, полное сопровождение.',
}

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--rs-display',
  display: 'swap',
})

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--rs-body',
  display: 'swap',
})

export default function RomanLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        /* ── Design tokens ─────────────────────────────────── */
        .rs-root {
          --rs-bg:       #0E0E0F;
          --rs-bg2:      #15151A;
          --rs-cream:    #F5F1EA;
          --rs-mute:     #9A9389;
          --rs-gold:     #C9A961;
          --rs-line:     #2A2722;
          --rs-sand:     #D9CBB8;
          --rs-sand-bg:  #E8DFD0;   /* warm cream-sand — light section bg */
          --rs-text-dark:#1A1714;   /* body text on light sections */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .rs-root ::selection { background: #C9A961; color: #0E0E0F; }
        .rs-root ::-webkit-scrollbar { width: 3px; }
        .rs-root ::-webkit-scrollbar-track { background: #0E0E0F; }
        .rs-root ::-webkit-scrollbar-thumb { background: #2A2722; }

        /* ── Scroll reveal ─────────────────────────────────── */
        .rs-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 800ms ease-out, transform 800ms ease-out;
        }
        .rs-reveal.rs-visible { opacity: 1; transform: translateY(0); }

        /* ── Hero animations ───────────────────────────────── */
        @keyframes rsFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rsScrollLine {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50%       { opacity: 0.35; transform: scaleY(0.5); }
        }
        .rs-a0 { animation: rsFadeUp .7s .45s ease-out both; }
        .rs-a1 { animation: rsFadeUp .8s .7s  ease-out both; }
        .rs-a2 { animation: rsFadeUp .8s .95s ease-out both; }
        .rs-a3 { animation: rsFadeUp .7s 1.15s ease-out both; }
        .rs-a4 { animation: rsFadeUp .7s 1.35s ease-out both; }
        .rs-a5 { animation: rsFadeUp .7s 1.55s ease-out both; }
        .rs-a6 { animation: rsFadeUp .6s 1.75s ease-out both; }
        .rs-scroll-line { animation: rsScrollLine 2.2s ease-in-out infinite; }

        /* ── Nav ───────────────────────────────────────────── */
        .rs-nav { transition: background 350ms, border-color 350ms, backdrop-filter 350ms; }
        .rs-nav-solid {
          background: rgba(14,14,15,0.93) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom-color: #2A2722 !important;
        }

        /* ── Mobile menu ───────────────────────────────────── */
        .rs-menu {
          position: fixed; inset: 0; z-index: 120;
          background: #0E0E0F;
          transform: translateX(100%);
          transition: transform 350ms cubic-bezier(.4,0,.2,1);
        }
        .rs-menu.rs-open { transform: translateX(0); }

        /* ── Buttons ───────────────────────────────────────── */
        .rs-btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          background: #C9A961; color: #0E0E0F;
          font-weight: 500; font-size: 11px; letter-spacing: .14em;
          text-transform: uppercase; padding: 1.05rem 2.2rem;
          text-decoration: none; white-space: nowrap;
          transition: opacity 250ms;
          border-radius: 0;
        }
        .rs-btn-primary:hover { opacity: .82; }

        .rs-btn-ghost {
          display: inline-flex; align-items: center; justify-content: center; gap: .45rem;
          border: 1px solid rgba(201,169,97,.32); color: #F5F1EA;
          font-size: .78rem; letter-spacing: .06em;
          padding: .75rem 1.35rem; text-decoration: none; white-space: nowrap;
          transition: border-color 250ms, color 250ms;
          border-radius: 0;
        }
        .rs-btn-ghost:hover { border-color: #C9A961; color: #C9A961; }

        /* ── Property cards ────────────────────────────────── */
        .rs-card {
          background: #fff;
          border: 1px solid rgba(26,23,20,0.12);
          overflow: hidden;
          transition: border-color 300ms, transform 300ms, box-shadow 300ms;
        }
        .rs-card:hover {
          border-color: rgba(201,169,97,.5);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        .rs-card-img { position: relative; overflow: hidden; aspect-ratio: 16/9; }
        .rs-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 600ms ease; }
        .rs-card:hover .rs-card-img img { transform: scale(1.04); }

        /* ── FAQ ───────────────────────────────────────────── */
        .rs-faq-body {
          max-height: 0; overflow: hidden;
          transition: max-height 420ms cubic-bezier(.4,0,.2,1);
        }
        .rs-faq-body.rs-open { max-height: 600px; }
        .rs-faq-icon { transition: transform 300ms ease; display: inline-block; }
        .rs-faq-icon.rs-rotated { transform: rotate(45deg); }

        /* ── Process hover image ───────────────────────────── */
        .rs-step-img {
          opacity: 0;
          transform: translateX(12px);
          transition: opacity 350ms ease, transform 350ms ease;
          pointer-events: none;
        }
        .rs-step-img.rs-step-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Grain overlay ─────────────────────────────────── */
        .rs-grain::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: .035; pointer-events: none; z-index: 15;
        }

        /* ── Carousel ──────────────────────────────────────── */
        .rs-carousel-track {
          display: flex;
          will-change: transform;
          align-items: stretch;
        }

        @media (prefers-reduced-motion: reduce) {
          .rs-reveal { opacity: 1; transform: none; transition: none; }
          .rs-a0,.rs-a1,.rs-a2,.rs-a3,.rs-a4,.rs-a5,.rs-a6 { animation: none !important; opacity: 1; }
          .rs-step-img { transition: none; }
        }
      `}</style>

      <div className={`rs-root ${cormorant.variable} ${ibmPlex.variable}`}>
        {children}
      </div>
    </>
  )
}
