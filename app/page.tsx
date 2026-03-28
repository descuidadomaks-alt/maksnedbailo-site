import Hero from "@/components/Hero";
import TheShift from "@/components/TheShift";
import TheProblem from "@/components/TheProblem";
import TheSolution from "@/components/TheSolution";
import Proof from "@/components/Proof";
import TheOffer from "@/components/TheOffer";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <TheShift />
        <TheProblem />
        <TheSolution />
        <Proof />
        <TheOffer />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
