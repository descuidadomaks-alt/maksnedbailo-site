import { GateProvider } from "./components/GateContext";
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
 * oh3 — restructured variant of /projects/oh2 that front-loads the offer and
 * replaces the gated placeholder demo with a real, self-hosted video. Single-
 * page composition. Order IS the conversion funnel — do not reorder:
 * hero → video+form (open demo, book-a-call) → value stack → old/new way
 * (+ anti-GHL row) → tiers → guarantee close.
 *
 * Removed vs oh2: bento grid, standalone anti-GoHighLevel-template section,
 * "How it works" 3-step section, the old gated demo, and every chat-bubble
 * animation (ChatLoop is gone — the real video does that job now).
 *
 * Testimonials (Section 7) is built (./components/Testimonials.tsx) but NOT
 * rendered: no real reviews exist, and the rule is no fabricated reviews.
 */
export default function Oh3Page() {
  return (
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
  );
}
