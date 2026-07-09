import { site } from "../lib/content";
import { waBonoLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { RevealGroup, RevealItem, Reveal } from "./Reveal";

/**
 * Bonos y regalos — its own visual block (not fine print). Two cards, each
 * with its own WhatsApp CTA pre-filled for that specific bundle.
 */
export function Bonos() {
  return (
    <section className="bg-cream px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto max-w-content">
        <Reveal className="text-center">
          <span className="font-jost text-xs uppercase tracking-label text-gold-deep">
            {site.bonos.heading}
          </span>
        </Reveal>

        <RevealGroup className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
          {site.bonos.items.map((b) => (
            <RevealItem
              key={b.sessions}
              as="article"
              className="relative flex flex-col items-center rounded-soft border border-gold/25 bg-ivory p-8 text-center shadow-card"
            >
              <span aria-hidden className="absolute right-6 top-6 text-lg text-gold/50">
                ✦
              </span>
              <span className="font-display text-6xl text-gold-deep">{b.sessions}</span>
              <h3 className="mt-3 font-display text-xl text-charcoal">{b.label}</h3>
              <p className="mt-1 font-jost text-sm text-charcoal/60">{b.desc}</p>
              <div className="mt-6">
                <WhatsAppButton href={waBonoLink(b.sessions)} variant="outline">
                  {site.bonos.cta}
                </WhatsAppButton>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="font-jost text-sm text-charcoal/60">{site.bonos.giftLine}</p>
          <p className="font-jost text-xs uppercase tracking-label text-charcoal/40">
            {site.services.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
