import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { RitualExplorer } from "./components/RitualExplorer";
import { Bonos } from "./components/Bonos";
import { AvailabilityCue } from "./components/AvailabilityCue";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { PreCta } from "./components/PreCta";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

/**
 * Single-page composition. Order = the felt journey:
 * hero (who / why) → find your ritual (the interactive core) → honest scarcity
 * → Oksana (trust) → real reviews (proof) → micro-yes → where I am → footer.
 */
export default function ParatiPage() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <RitualExplorer />
        <Bonos />
        <AvailabilityCue />
        <About />
        <Reviews />
        <PreCta />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
