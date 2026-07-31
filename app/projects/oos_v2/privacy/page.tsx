import type { Metadata } from "next";
import { BRAND } from "../lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy — Overtime OS.",
  robots: { index: false, follow: true },
};

/** Minimal privacy stub, forked from app/projects/oos/privacy/page.tsx. */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24">
      <h1 className="oh-display text-4xl text-[#171e19] sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-[#171e19]/50">Last updated: August 1, 2026</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-[#171e19]/80">
        <p>
          {BRAND} (&quot;we&quot;, &quot;us&quot;) operates this page as a landing page for our AI
          operating system for home-service businesses. This policy explains what information the
          quiz on this page collects and how we use it.
        </p>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">What we collect</h2>
          <p className="mt-2">
            When you complete the quiz on this page, we collect your name, email address, phone
            number, business website (if provided), and your answers about your business and how
            you handle leads today. We don&apos;t collect any other personal information through
            this page.
          </p>
        </section>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">How we use it</h2>
          <p className="mt-2">
            We use this information to contact you about booking a call and to show you how the
            service would run for your business. We don&apos;t sell your information, and we
            don&apos;t share it with third parties for their own marketing.
          </p>
        </section>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">Texts and calls</h2>
          <p className="mt-2">
            If you check the consent box on the phone step, we may contact you by text or call —
            including automated texts and calls using an AI-generated voice — about your enquiry.
            This is never a condition of purchase. Message and data rates may apply. Reply STOP to
            opt out of texts at any time.
          </p>
        </section>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">Contact</h2>
          <p className="mt-2">
            Questions about this policy or your data? Email{" "}
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
