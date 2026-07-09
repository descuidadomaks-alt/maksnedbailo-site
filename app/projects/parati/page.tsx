import fs from "node:fs";
import path from "node:path";
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
import { withZoneOpacity } from "./lib/bodyFigure";

/**
 * Single-page composition. Order = the felt journey:
 * hero (who / why) → find your ritual (the interactive core) → honest scarcity
 * → Oksana (trust) → real reviews (proof) → micro-yes → where I am → footer.
 */
export default function ParatiPage() {
  // Read the body artwork server-side and bake in the default zone's
  // opacity so the first paint is already correct (no flash-then-correct).
  const rawBodySvg = fs.readFileSync(
    path.join(process.cwd(), "public/projects/parati/New_body.svg"),
    "utf8"
  );
  const bodySvgMarkup = withZoneOpacity(rawBodySvg, "cuerpo");

  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <RitualExplorer bodySvgMarkup={bodySvgMarkup} />
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
