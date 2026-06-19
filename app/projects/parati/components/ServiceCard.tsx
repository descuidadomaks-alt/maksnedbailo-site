import type { Service } from "../lib/content";
import { site } from "../lib/content";
import { waServiceLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { RevealItem } from "./Reveal";

/**
 * Single service card: name (serif), duration, price, sensory benefit,
 * and its own WhatsApp button pre-filled with this service.
 * `featured` highlights the price-anchor card (most expensive, first).
 */
export function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  const isPlaceholder = service.price.includes("[");

  return (
    <RevealItem
      as="article"
      className={`group flex h-full flex-col rounded-soft border bg-ivory p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8 ${
        featured ? "border-gold/50 shadow-soft" : "border-gold/15"
      }`}
    >
      {featured ? (
        <span className="mb-4 inline-flex w-fit rounded-full bg-gold/15 px-3 py-1 font-jost text-[11px] uppercase tracking-label text-gold-deep">
          Nuestro ritual estrella
        </span>
      ) : null}

      <h3 className="font-display text-2xl text-charcoal sm:text-[1.65rem]">
        {service.name}
      </h3>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-display text-3xl text-gold-deep">
          {service.price}
        </span>
        <span className="font-jost text-xs uppercase tracking-label text-charcoal/50">
          {service.duration}
        </span>
      </div>

      <p className="mt-4 flex-1 font-jost text-[0.95rem] leading-relaxed text-charcoal/70">
        {service.benefit}
      </p>

      <div className="mt-7">
        <WhatsAppButton
          href={waServiceLink(service.name)}
          variant={featured ? "primary" : "outline"}
          className="w-full"
        >
          {site.services.cardCta}
        </WhatsAppButton>
        {isPlaceholder ? (
          <p className="mt-2 text-center font-jost text-[11px] text-charcoal/40">
            Consulta duración y precio por WhatsApp
          </p>
        ) : null}
      </div>
    </RevealItem>
  );
}
