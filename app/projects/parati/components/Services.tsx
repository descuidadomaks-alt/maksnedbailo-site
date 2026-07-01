import { site } from "../lib/content";
import { SectionHeading } from "./SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { RevealGroup, Reveal } from "./Reveal";

/**
 * Servicios — price-anchored grid (most expensive first, descending).
 */
export function Services() {
  return (
    <section id="servicios" className="bg-cream px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow={site.services.eyebrow}
          title={site.services.heading}
          intro={site.services.intro}
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.services.items.map((service, i) => (
            <ServiceCard key={service.name} service={service} featured={i === 0} />
          ))}
        </RevealGroup>

        {/* Loyalty bundles + tax note */}
        <Reveal className="mt-12 flex flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-8">
            {site.services.bonos.map((bono) => (
              <span
                key={bono}
                className="inline-flex items-center gap-2 font-jost text-sm text-charcoal/75"
              >
                <span aria-hidden className="text-gold">✦</span>
                {bono}
              </span>
            ))}
          </div>
          <p className="font-jost text-xs uppercase tracking-label text-charcoal/45">
            {site.services.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
