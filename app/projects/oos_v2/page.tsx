import { QuizProvider } from "./components/QuizContext";
import { LocationProvider } from "./components/LocationContext";
import { QuizModal } from "./components/QuizModal";
import { ExitIntentPopup } from "./components/ExitIntentPopup";
import { TradesBar } from "./components/TradesBar";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { PricingTiers } from "./components/PricingTiers";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

/**
 * oos_v2 — Overtime OS A/B variant "value stack morphs into pricing".
 * Forked from app/projects/oos/page.tsx (untouched). Two deliberate
 * deviations from that base, per the brief:
 *
 *  1. Hero + demo video are merged into one component (Hero.tsx) so
 *     headline, one supporting line, the video, and the primary CTA all
 *     sit above the fold on a 390px phone — the original oos build never
 *     needs to fit a video in the first viewport, since Hero and VideoForm
 *     are two separate near-full-viewport sections there.
 *  2. AppComparison ("don't confuse us with an app") and ProblemSolution
 *     ("the old way" / "the Overtime OS way") are dropped to shorten the
 *     page — everything else keeps its live-page order and copy.
 *
 * PricingTiers replaces OfferStack + TiersSection: the value stack lives
 * as Tier 1's static card content (no scroll animation — see that
 * component's own comment), alongside Tier 2/3 in the same equal-height
 * grid, with escalating struck-through total-value anchors per tier.
 *
 * Leads POST to /api/oos-lead (tagged page:"oos_v2"), which forwards to
 * the same GoHighLevel webhook the live overtimeos.com page uses — see
 * that route for the field mapping.
 */
export default function OosV2Page() {
  return (
    <LocationProvider>
      <QuizProvider>
        <TradesBar />
        <Nav />
        <main>
          <Hero />
          <PricingTiers />
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
