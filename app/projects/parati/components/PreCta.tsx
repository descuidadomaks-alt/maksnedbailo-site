import { site } from "../lib/content";
import { waLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { Reveal } from "./Reveal";

/** Pre-CTA micro-yes — a calm, centered final nudge before contact. */
export function PreCta() {
  return (
    <section className="bg-cream px-5 py-24 sm:px-8 sm:py-28">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl md:text-5xl">
          {site.preCta.heading}
        </h2>
        <p className="mt-4 font-jost text-base text-charcoal/70">
          {site.preCta.sub}
        </p>
        <div className="mt-9">
          <WhatsAppButton href={waLink()} className="!px-8 !py-4 text-base">
            {site.preCta.cta}
          </WhatsAppButton>
        </div>
      </Reveal>
    </section>
  );
}
