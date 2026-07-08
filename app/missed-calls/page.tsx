import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Guarantee } from "./components/Guarantee";
import { Pricing } from "./components/Pricing";
import { BonusStack } from "./components/BonusStack";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

/**
 * Credibility page + privacy-policy destination for the Meta Instant Forms
 * campaign (see docs/care-less-uk-locksmith/campaign-setup.md). NOT the
 * conversion mechanism — the ad's Instant Form is. Every CTA here routes to
 * the booking calendar (lib/config.ts#BOOKING_LINK).
 */
export default function MissedCallsPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Guarantee />
      <Pricing />
      <BonusStack />
      <FAQ />
      <Footer />
    </main>
  );
}
