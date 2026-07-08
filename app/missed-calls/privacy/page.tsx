import type { Metadata } from "next";
import { BRAND } from "../lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy — Care Less",
  robots: { index: false, follow: true },
};

/**
 * Privacy-policy stub for Meta ad review. Unlike the oh4 version this page
 * links from, THIS page carries no form of its own — data is collected via
 * the Meta Instant Form on the ad, not on this website. Said explicitly
 * below so the policy matches reality.
 */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24">
      <h1 className="oh-display text-4xl text-[#171e19] sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-[#171e19]/50">Last updated: July 8, 2026</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-[#171e19]/80">
        <p>
          {BRAND} (&quot;we&quot;, &quot;us&quot;) operates this page as the landing destination
          for our missed-call recovery service aimed at UK locksmiths. This page itself does not
          contain a form — this policy explains what information our Meta (Facebook/Instagram)
          Instant Form ad collects and how we use it.
        </p>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">What we collect</h2>
          <p className="mt-2">
            When you submit the Instant Form on one of our Meta ads, we collect your name, mobile
            number, trade, how many calls you typically miss per week, who currently answers your
            phone, and your average job value band. We don&apos;t collect any other personal
            information through this page or the ad.
          </p>
        </section>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">How we use it</h2>
          <p className="mt-2">
            We use this information to text and call you about the service and to show you how it
            would run for your business. We don&apos;t sell your information, and we don&apos;t
            share it with third parties for their own marketing.
          </p>
        </section>

        <section>
          <h2 className="oh-display text-xl text-[#171e19]">Advertising &amp; analytics</h2>
          <p className="mt-2">
            Meta&apos;s Instant Form product handles the initial data capture on their platform
            under their own advertising terms. Once a lead reaches us, we use it only as described
            above — to follow up about the service.
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
