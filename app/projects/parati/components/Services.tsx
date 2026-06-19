import { site } from "../lib/content";
import { SectionHeading } from "./SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { RevealGroup } from "./Reveal";

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
      </div>
    </section>
  );
}
