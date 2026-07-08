import type { Metadata } from "next";
import { BRAND } from "../lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy — Overtime Hunch.",
  robots: { index: false, follow: true },
};

/**
 * Minimal privacy-policy stub for Facebook ad review — links from the oh5
 * footer. Scoped under /projects/oh5 so it inherits the oh-scope styling
 * from ../layout.tsx.
 */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24">
      <h1 className="oh-display text-4xl text-[#171e19] sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-[#171e19]/50">Last updated: July 6, 2026</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-[#171e19]/80">
        <p>
          {BRAND} (&quot;we&quot;, &quot;us&quot;) operates this page as a landing page for
          our done-for-you AI front-desk service. This policy explains what information
          the form on this page collects and how we use it.
        </p>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">What we collect</h2>
          <p className="mt-2">
            When you submit the form on this page, we collect your name, business name,
            email address, and phone number. We don&apos;t collect any other personal
            information through this page.
          </p>
        </section>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">How we use it</h2>
          <p className="mt-2">
            We use this information to contact you about booking a call and to show you
            how the service would run for your business. We don&apos;t sell your
            information, and we don&apos;t share it with third parties for their own
            marketing.
          </p>
        </section>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">Advertising &amp; analytics</h2>
          <p className="mt-2">
            This page uses the Meta Pixel to measure ad performance (for example, whether a
            visitor who came from an ad went on to submit the form). This is standard
            ad-platform analytics and doesn&apos;t add to the personal information described
            above.
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
