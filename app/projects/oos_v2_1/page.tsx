import { QuizProvider } from "./components/QuizContext";
import { LocationProvider } from "./components/LocationContext";
import { QuizModal } from "./components/QuizModal";
import { ExitIntentPopup } from "./components/ExitIntentPopup";
import { TradesBar } from "./components/TradesBar";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { PricingCard } from "./components/PricingCard";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

/**
 * oos_v2_1 — single-tier variant, forked from oos_v2. Deliberate
 * deviations from that base, per the brief:
 *
 *  1. Single offer, not three tiers — PricingCard (not PricingTiers)
 *     renders one centered card: the same value-stack items + bonus block
 *     oos_v2's Tier 1 uses, same price ($499/mo), no badges.
 *  2. Hero headline/subhead replaced with more concrete copy; the vague
 *     eyebrow line above the headline is gone.
 *  3. DeliverablesRow drops the add-on icon row — with no upper tiers,
 *     there's nothing to upsell to.
 *  4. Geo-derived scarcity line (LocationProvider/LocationContext/
 *     GeoPin/lib/geoScarcity.ts) — same mechanism and placement (hero,
 *     pricing card, guarantee section) as the live overtimeos.com page.
 *     Was briefly removed in an earlier pass; restored here.
 *
 * Hero + demo video merge, and the AppComparison/ProblemSolution
 * removal, are unchanged from oos_v2 — see that page's own comment for
 * why.
 *
 * Leads POST to /api/oos-lead (tagged page:"oos_v2_1"), which forwards to
 * the same GoHighLevel webhook the live overtimeos.com page uses — see
 * that route for the field mapping. Quiz (3 steps, no-scroll modal) is
 * unchanged from oos_v2's current build.
 */
export default function OosV2_1Page() {
  return (
    <LocationProvider>
      <QuizProvider>
        <TradesBar />
        <Nav />
        <main>
          <Hero />
          <PricingCard />
          <FinalCTA />
        </main>
        <Footer />
        <StickyCTA />
        <QuizModal />
        <ExitIntentPopup />
      </QuizProvider>
    </LocationProvider>
  );
}
