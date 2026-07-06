import { GateProvider } from "./components/GateContext";
import { LocationProvider } from "./components/LocationContext";
import { GateModal } from "./components/GateModal";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { VideoForm } from "./components/VideoForm";
import { OfferStack } from "./components/OfferStack";
import { ProblemSolution } from "./components/ProblemSolution";
import { TiersSection } from "./components/TiersSection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

/**
 * oh4 — /projects/oh3 re-gated for the Carter ad campaign. oh3 stays
 * untouched; this is a full copy with three changes layered on top:
 *
 *  1. The demo video (VideoForm) is now locked behind the form instead of
 *     open — see components/VideoForm.tsx.
 *  2. The hardcoded REGION/SPOTS_LEFT scarcity copy is replaced by
 *     IP-derived location text (city → region → "your area") — see
 *     components/LocationContext.tsx, app/api/geo/route.ts, and
 *     lib/config.ts#SCARCITY_LINE / #CAPACITY_LINE.
 *  3. Meta Pixel fires PageView/Lead/ViewContent — see
 *     components/MetaPixel.tsx (no-ops until lib/config.ts#PIXEL_ID is set).
 *
 * Same conversion-funnel order as oh3 — do not reorder:
 * hero → video+form (gated demo, book-a-call) → value stack → old/new way
 * (+ anti-GHL row) → tiers → guarantee close.
 *
 * Testimonials (./components/Testimonials.tsx) is built but NOT rendered:
 * no real reviews exist, and the rule is no fabricated reviews.
 */
export default function Oh4Page() {
  return (
    <LocationProvider>
      <GateProvider>
        <Nav />
        <main>
          <Hero />
          <VideoForm />
          <OfferStack />
          <ProblemSolution />
          <TiersSection />
          <FinalCTA />
        </main>
        <Footer />
        <StickyCTA />
        <GateModal />
      </GateProvider>
    </LocationProvider>
  );
}
