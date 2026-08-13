import type { Metadata } from "next";
import { BRAND } from "../lib/config";

export const metadata: Metadata = {
  title: "Terms — Overtime OS.",
  robots: { index: false, follow: true },
};

/**
 * Minimal terms stub — the footer needs a Terms link but neither the live
 * page's full terms text nor the sibling pages gave us real terms copy to
 * reuse. This is a plain-language stub covering only what's true of this
 * page itself, not a substitute for real legal terms of service — flagged
 * for the user to replace with real terms before this runs as a paid-ad
 * destination.
 */
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24">
      <h1 className="oh-display text-4xl text-[#171e19] sm:text-5xl">Terms</h1>
      <p className="mt-4 text-sm text-[#171e19]/50">Last updated: August 1, 2026</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-[#171e19]/80">
        <p>
          This page is a demo landing page for {BRAND}, a done-for-you AI front office for
          home-service businesses. Requesting the free missed-call audit on this page does not
          create a contract or purchase — it books a call to your business line for the audit and,
          if you&apos;re interested, a follow-up conversation about the service.
        </p>
        <p>The demo video and any figures shown on this page are for illustration.</p>
        <section>
          <h2 className="oh-display text-xl text-[#171e19]">Contact</h2>
          <p className="mt-2">
            Questions about these terms? Email{" "}
            <a href="mailto:carelessmaks@gmail.com" className="underline">
              carelessmaks@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
