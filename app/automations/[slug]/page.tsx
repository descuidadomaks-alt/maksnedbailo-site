import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { getProspect, getAllSlugs } from "./data";
import SectionHero from "./components/SectionHero";
import ConnectoWidget from "./components/ConnectoWidget";
import SectionMath from "./components/SectionMath";
import SectionProof from "./components/SectionProof";
import SectionHowItWorks from "./components/SectionHowItWorks";
import SectionValueStack from "./components/SectionValueStack";
import SectionTrust from "./components/SectionTrust";
import SectionSlot from "./components/SectionSlot";
import SectionEnquiryForm from "./components/SectionEnquiryForm";
import SectionCTA from "./components/SectionCTA";
import SectionReality from "./components/SectionReality";
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
    title: `A live AI agent built for ${d.businessName} — care less AI automation`,
    description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in ${d.metrics.responseTimeUs}.`,
    alternates: { canonical: `https://maksnedbailo.site/automations/${d.slug}` },
    robots: { index: false, follow: false },
    openGraph: {
      title: `A live AI agent built for ${d.businessName} — care less AI automation`,
      description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in ${d.metrics.responseTimeUs}.`,
      url: `https://maksnedbailo.site/automations/${d.slug}`,
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: `${d.agentName} for ${d.businessName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `A live AI agent built for ${d.businessName} — care less AI automation`,
      description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in ${d.metrics.responseTimeUs}.`,
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
      {/* Plausible — tagged events */}
      <Script
        src="https://plausible.io/js/script.tagged-events.js"
        data-domain="maksnedbailo.site"
        strategy="afterInteractive"
      />

      {/*
       * WebSocket URL patcher — runs inline (before widget.js loads).
       * Vercel rewrites proxy HTTP but silently drop WebSocket upgrade requests
       * (1006 close). api.theconnecto.ai accepts WS from our origin without CORS
       * preflight, so we rewrite wss://[proxy] → wss://api.theconnecto.ai/api/v1
       * while keeping HTTP calls through the Vercel proxy.
       */}
      {w && !data.slotExpired && !data.caseStudy && (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var W=window.WebSocket;window.WebSocket=function(u,p){u=String(u).replace('wss://www.maksnedbailo.site/api/connecto','wss://api.theconnecto.ai/api/v1');return p?new W(u,p):new W(u);};window.WebSocket.prototype=W.prototype;window.WebSocket.CONNECTING=0;window.WebSocket.OPEN=1;window.WebSocket.CLOSING=2;window.WebSocket.CLOSED=3;})();`,
          }}
        />
      )}

      {/* Connecto chat widget */}
      {w && !data.slotExpired && !data.caseStudy && (
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
        {/* 1. Hero — H1 + single CTA + animated arrow */}
        <SectionHero data={data} />

        {/* 1b. Case-study framing band (drpaul and similar) */}
        {data.caseStudy && data.caseStudyBand && (
          <div className="section-divider py-5 md:py-6">
            <p
              className="font-sora text-center text-fg/35 leading-relaxed"
              style={{ fontSize: "13px", letterSpacing: "0.04em" }}
            >
              {data.caseStudyBand}
            </p>
          </div>
        )}

        {/* 2. Live widget anchor (analytics + section divider) */}
        <ConnectoWidget data={data} />

        {/* 3. Leak calculation */}
        <SectionMath data={data} />

        {/* 4. Conversation proof — 3 screenshot slots */}
        <SectionProof data={data} />

        {/* 5. Process — 3 steps */}
        <SectionHowItWorks data={data} />

        {/* 6. Value stack — Hormozi table + guarantee */}
        <SectionValueStack data={data} />

        {/* 7. Trust block — infrastructure / clinical safety */}
        <SectionTrust data={data} />

        {/* 8. Reality check — why clinics quit AI too early */}
        <SectionReality data={data} />

        {/* 9. Scarcity — dynamic expiry from createdAt (hidden in case-study mode) */}
        {!data.caseStudy && <SectionSlot data={data} />}

        {/* 10. Enquiry form → Web3Forms + calendar redirect */}
        <SectionEnquiryForm data={data} />

        {/* 11. Final CTA */}
        <SectionCTA data={data} />
      </main>
    </>
  );
}
