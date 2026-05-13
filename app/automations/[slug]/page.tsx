import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { getProspect, getAllSlugs } from "./data";
import SectionHero from "./components/SectionHero";
import ConnectoWidget from "./components/ConnectoWidget";
import SectionObservation from "./components/SectionObservation";
import SectionMath from "./components/SectionMath";
import SectionProof from "./components/SectionProof";
import SectionHowBuilt from "./components/SectionHowBuilt";
import SectionOffer from "./components/SectionOffer";
import SectionSlot from "./components/SectionSlot";
import SectionCTA from "./components/SectionCTA";
import DemoTracker from "./components/DemoTracker";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getProspect(params.slug);
  if (!d) return {};
  const og = `/automations/${d.slug}/og.png`;
  return {
    title: `A live AI agent built for ${d.businessName} — careless`,
    description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in 9 seconds.`,
    alternates: { canonical: `https://maksnedbailo.site/automations/${d.slug}` },
    robots: { index: false, follow: false },
    openGraph: {
      title: `A live AI agent built for ${d.businessName} — careless`,
      description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in 9 seconds.`,
      url: `https://maksnedbailo.site/automations/${d.slug}`,
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: `${d.agentName} for ${d.businessName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `A live AI agent built for ${d.businessName} — careless`,
      description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in 9 seconds.`,
      images: [og],
    },
  };
}

export default function DemoPage({ params }: Props) {
  const data = getProspect(params.slug);
  if (!data) notFound();

  const w = data.connectoWidget;

  return (
    <>
      {/* Plausible — tagged events variant */}
      <Script
        src="https://plausible.io/js/script.tagged-events.js"
        data-domain="maksnedbailo.site"
        strategy="afterInteractive"
      />

      {/* WebSocket URL patcher — inline so it runs before widget.js.
          Vercel rewrites proxy HTTP but not WebSocket upgrades (1006 close).
          Direct wss://api.theconnecto.ai accepts our Origin, so we redirect
          proxy WS URLs back to the real server while HTTP stays proxied. */}
      {w && !data.slotExpired && (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var W=window.WebSocket;window.WebSocket=function(u,p){u=String(u).replace('wss://www.maksnedbailo.site/api/connecto','wss://api.theconnecto.ai/api/v1');return p?new W(u,p):new W(u);};window.WebSocket.prototype=W.prototype;window.WebSocket.CONNECTING=0;window.WebSocket.OPEN=1;window.WebSocket.CLOSING=2;window.WebSocket.CLOSED=3;})();`,
          }}
        />
      )}

      {/* Connecto chat widget */}
      {w && !data.slotExpired && (
        <Script
          src={w.src}
          strategy="afterInteractive"
          data-widget-key={w.widgetKey}
          data-api-url={w.apiUrl}
          data-title={w.title}
          data-subtitle={w.subtitle}
          data-colour={w.colour}
          data-position={w.position}
          data-language={w.language}
          data-auto-open="true"
        />
      )}

      <DemoTracker slug={data.slug} />
      <main className="min-h-screen">
        <SectionHero data={data} />
        <ConnectoWidget data={data} />
        <SectionObservation data={data} />
        <SectionMath data={data} />
        <SectionProof data={data} />
        <SectionHowBuilt data={data} />
        <SectionOffer data={data} />
        <SectionSlot data={data} />
        <SectionCTA data={data} />
      </main>
    </>
  );
}
