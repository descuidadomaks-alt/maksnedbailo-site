import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { AvailabilityCue } from "./components/AvailabilityCue";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { Gallery } from "./components/Gallery";
import { PreCta } from "./components/PreCta";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

/**
 * Single-page composition. Order IS the conversion logic — do not reorder:
 * hero → servicios → scarcity → about → proof → gallery → micro-yes →
 * contact → footer, with the floating WhatsApp button always present.
 */
export default function ParatiPage() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Services />
        <AvailabilityCue />
        <About />
        <Reviews />
        <Gallery />
        <PreCta />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
