import { site } from "../lib/content";
import { waLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/**
 * Contacto & Ubicación — Google Maps embed of the real business listing (so it
 * carries their Google presence/reviews), tinted toward the cream/gold palette
 * via a CSS filter; hover eases it back to full colour.
 */
export function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${site.business} Masaje, ${site.address}`
  )}&output=embed`;

  return (
    <section id="contacto" className="bg-ivory px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow={site.contact.eyebrow}
          title={site.contact.heading}
        />

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <div className="overflow-hidden rounded-soft border border-gold/20 shadow-card">
              <iframe
                src={mapSrc}
                title={site.contact.mapTitle}
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pt-map"
                style={{ border: 0, display: "block" }}
              />
            </div>
            <a
              href={site.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-jost text-sm text-gold-deep underline-offset-4 transition-colors hover:underline"
            >
              {site.contact.openMaps} <span aria-hidden>→</span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div>
              <h3 className="font-jost text-xs uppercase tracking-label text-gold-deep">
                {site.contact.addressLabel}
              </h3>
              <p className="mt-2 font-display text-xl text-charcoal">
                {site.address}
              </p>
            </div>

            <div>
              <h3 className="font-jost text-xs uppercase tracking-label text-gold-deep">
                {site.contact.hoursLabel}
              </h3>
              <dl className="mt-3 space-y-2">
                {site.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 border-b border-gold/15 pb-2 font-jost text-sm"
                  >
                    <dt className="text-charcoal/80">{h.day}</dt>
                    <dd className="text-right text-charcoal/60">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton href={waLink()}>{site.contact.cta}</WhatsAppButton>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/40 px-5 py-3 font-jost text-sm text-gold-deep transition-colors hover:border-gold-deep hover:bg-gold/10"
              >
                <InstagramGlyph className="h-4 w-4" />
                {site.instagramHandle}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export { InstagramGlyph };
