import { QuizProvider } from "./components/QuizContext";
import { LocationProvider } from "./components/LocationContext";
import { QuizModal } from "./components/QuizModal";
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
 * oh4 — /projects/oh3 re-gated for the Carter ad campaign, since rebuilt
 * around a multi-step quiz funnel. oh3 stays untouched. Layered on top of
 * the oh3 base:
 *
 *  1. Every CTA on the page opens the SAME multi-step quiz modal (see
 *     components/QuizContext.tsx + QuizModal.tsx) instead of a flat 4-field
 *     form. The demo video (VideoForm) stays locked until the quiz
 *     completes.
 *  2. The hardcoded REGION/SPOTS_LEFT scarcity copy is IP-derived, tiered by
 *     location confidence (exact spot count for a known city, a claimed/
 *     total count for a known state, generic fallback otherwise) — see
 *     components/LocationContext.tsx#useScarcityLine and app/api/geo/route.ts.
 *  3. Meta Pixel fires PageView/Lead/ViewContent — see
 *     components/MetaPixel.tsx (no-ops until lib/config.ts#PIXEL_ID is set).
 *  4. Quiz answers POST to app/api/lead/route.ts, which scores the lead
 *     HOT/WARM/COLD and fans out to a Google Sheet, Telegram, and email.
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
      <QuizProvider>
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
        <QuizModal />
      </QuizProvider>
    </LocationProvider>
  );
}
