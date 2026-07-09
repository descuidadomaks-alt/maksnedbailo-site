import { site } from "../lib/content";
import { waLink } from "../lib/whatsapp";
import { WhatsAppGlyph } from "./WhatsAppButton";
import { InstagramGlyph } from "./Contact";

/** Footer — wordmark, legal placeholder, IG + WhatsApp, © year. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-cream px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 text-center">
        <a href="#top" className="font-display text-2xl text-charcoal">
          {site.business}
        </a>
        <p className="font-jost text-xs uppercase tracking-label text-charcoal/50">
          {site.footer.tagline}
        </p>

        <div className="flex items-center">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-11 w-11 items-center justify-center text-charcoal/60 transition-colors hover:text-gold-deep"
          >
            <WhatsAppGlyph className="h-5 w-5" />
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center text-charcoal/60 transition-colors hover:text-gold-deep"
          >
            <InstagramGlyph className="h-5 w-5" />
          </a>
        </div>

        <div className="hairline max-w-xs" />

        <div className="flex flex-col items-center gap-2 font-jost text-xs text-charcoal/50">
          {/* RGPD / Aviso legal — placeholder link, see TODO_PLACEHOLDERS.md */}
          <a href="#" className="underline-offset-4 transition-colors hover:text-gold-deep hover:underline">
            {site.footer.legal}
          </a>
          <p>{site.footer.rights(year)}</p>
        </div>
      </div>
    </footer>
  );
}
