import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ellie — built for Edible Health",
  description: "A quick note and a live demo, from Maks.",
  robots: { index: false, follow: false },
};

// ─── Config ───────────────────────────────────────────────────────────────────
// TODO: paste Connecto widget key for the Edible Health agent once it's ready.
// Checklist: verify agent name in data-title matches intended name, language "en",
// apiUrl through the Vercel proxy. See reusable prompt for full checklist.
const WIDGET_KEY   = "";
const WIDGET_COLOR = "#5E8C72"; // warm sage — earthy, health-brand feel

// WhatsApp deep link — Maks's number for this page specifically
const WA =
  "https://wa.me/380939256452?text=Alright%20Maks%2C%20I%20played%20with%20Ellie%20%E2%80%94%20let%27s%20talk.";

// ─── Warm light palette ───────────────────────────────────────────────────────
// These override the dark site defaults via inline styles throughout.
const INK  = "#1C1208";                   // near-black warm brown
const MUTE = "rgba(28,18,8,0.50)";       // body text
const DIM  = "rgba(28,18,8,0.34)";       // captions, labels
const A    = "#C8976A";                   // warm amber accent
const CARD = "rgba(255,255,255,0.68)";   // card background
const LINE = "rgba(28,18,8,0.07)";       // borders, dividers

// Shared card style
const cardStyle: React.CSSProperties = {
  border: `1px solid ${LINE}`,
  background: CARD,
};

export default function EdibleHealthPage() {
  return (
    <>
      {/* ── Plausible analytics ── */}
      <Script
        src="https://plausible.io/js/script.tagged-events.js"
        data-domain="maksnedbailo.site"
        strategy="afterInteractive"
      />

      {/* ── WebSocket patcher (same as every other demo page) ── */}
      {WIDGET_KEY && (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var W=window.WebSocket;window.WebSocket=function(u,p){u=String(u).replace('wss://www.maksnedbailo.site/api/connecto','wss://api.theconnecto.ai/api/v1');return p?new W(u,p):new W(u);};window.WebSocket.prototype=W.prototype;window.WebSocket.CONNECTING=0;window.WebSocket.OPEN=1;window.WebSocket.CLOSING=2;window.WebSocket.CLOSED=3;})();`,
          }}
        />
      )}

      {/* ── Connecto widget ── */}
      {WIDGET_KEY && (
        <Script
          src="https://app.theconnecto.ai/widget.js"
          strategy="afterInteractive"
          data-widget-key={WIDGET_KEY}
          data-api-url="https://www.maksnedbailo.site/api/connecto"
          data-title="Ask Ellie — Edible Health AI"
          data-subtitle="Built by Maks"
          data-colour={WIDGET_COLOR}
          data-position="right"
          data-language="en"
          data-auto-open="false"
        />
      )}

      {/* Warm background sentinel — triggers CSS in layout.tsx */}
      <div data-ediblehealth-page hidden aria-hidden="true" />

      <main style={{ color: INK }}>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative flex items-center pt-28 pb-24 md:pt-36 md:pb-32"
          style={{ minHeight: "88svh" }}
        >
          {/* Subtle warm glow in corner */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <div style={{
              position: "absolute", top: "5%", right: "10%",
              width: "500px", height: "500px",
              background: `radial-gradient(ellipse at center, rgba(200,151,106,0.10) 0%, transparent 68%)`,
            }} />
          </div>

          <div className="max-w-5xl mx-auto px-6 w-full relative">

            {/* Badge */}
            <div
              data-reveal
              className="mb-12 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                border: `1px solid rgba(200,151,106,0.25)`,
                background: "rgba(200,151,106,0.07)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: A, boxShadow: `0 0 5px ${A}80` }}
              />
              <span
                className="font-sora text-xs tracking-widest uppercase"
                style={{ color: A, letterSpacing: "3px" }}
              >
                For Corinna · Edible Health · From Maks
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-16 items-start">

              {/* Left — quote + attribution + note */}
              <div>
                {/* Big pull-quote */}
                <blockquote
                  data-reveal="d0"
                  className="font-playfair italic mb-6"
                  style={{
                    fontSize: "clamp(26px, 5vw, 64px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    color: INK,
                  }}
                >
                  <span style={{ color: A, fontStyle: "normal", opacity: 0.55 }}>&ldquo;</span>
                  Wow Maks — this is fucking awesome!!
                  <br className="hidden sm:block" />
                  {" "}I need to check properly on my laptop
                  <br className="hidden sm:block" />
                  {" "}but I am amazed! You&apos;re a genius!!
                  <br className="hidden sm:block" />
                  {" "}Thank you!! 🙏😘
                  <span style={{ color: A, fontStyle: "normal", opacity: 0.55 }}>&rdquo;</span>
                </blockquote>

                {/* Attribution */}
                <p
                  data-reveal="d1"
                  className="font-sora italic mb-12"
                  style={{ fontSize: "13px", color: DIM }}
                >
                  Corinna Cope · ~5 years ago · still my favourite testimonial
                </p>

                {/* Maks's note — styled like a handwritten card */}
                <div
                  data-reveal="d2"
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    ...cardStyle,
                    borderLeft: `3px solid ${A}`,
                    boxShadow: "0 2px 16px rgba(28,18,8,0.05)",
                  }}
                >
                  <p
                    className="font-sora leading-[1.85]"
                    style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: MUTE }}
                  >
                    I went forward and created an AI-employee for you.
                    <br /><br />
                    We had a fun time working together 😄 Just letting you know I&apos;ve switched
                    rails to AI concierge + ops automation, ROI-first.
                    <br /><br />
                    73% of customers buy from the first responder.{" "}
                    <strong style={{ color: INK }}>Ellie</strong> goes live on your site in
                    48 hours — Facebook + Instagram added once Meta approves.
                    <br /><br />
                    <strong style={{ color: INK }}>Try her live to the right →</strong>
                  </p>
                </div>
              </div>

              {/* Right — paper-cutout screenshot */}
              <div
                data-reveal="d3"
                style={{
                  transform: "rotate(-3.5deg)",
                  transformOrigin: "center top",
                  marginTop: "12px",
                  flexShrink: 0,
                }}
              >
                <div style={{
                  background: "#fff",
                  borderRadius: "3px",
                  padding: "10px 10px 44px",
                  boxShadow: "0 8px 48px rgba(28,18,8,0.14), 0 2px 10px rgba(28,18,8,0.08)",
                  position: "relative",
                }}>
                  {/* Pin */}
                  <div style={{
                    position: "absolute", top: "-11px", left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px", height: "20px", borderRadius: "50%",
                    background: A,
                    boxShadow: `0 2px 8px rgba(200,151,106,0.45)`,
                  }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/automations/ediblehealth/Corinna_Cope_Feedback.png"
                    alt="Corinna's original feedback"
                    style={{ display: "block", width: "100%", borderRadius: "2px" }}
                  />
                  <p style={{
                    fontFamily: "var(--font-sora, system-ui, sans-serif)",
                    fontSize: "10px", color: "#999",
                    marginTop: "10px", textAlign: "center",
                  }}>
                    the original 🙏
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — ELLIE IN ACTION (proof screenshots)
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          <div className="max-w-5xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", color: DIM }}
            >
              Proof of work
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal mb-4"
              style={{
                fontSize: "clamp(22px, 3.2vw, 44px)",
                lineHeight: 1.12,
                letterSpacing: "-0.022em",
                color: INK,
              }}
            >
              Not a generic chatbot.
              <br />
              <em style={{ opacity: 0.55 }}>Here she is talking like Edible Health.</em>
            </h2>
            <p
              data-reveal="d1"
              className="font-sora mb-14"
              style={{ fontSize: "15px", lineHeight: 1.75, color: MUTE, maxWidth: "500px" }}
            >
              Three quick examples. When you try her live, ask her the same things.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  num: "01",
                  label: "Bovine vs marine",
                  scenario:
                    "Visitor asks where to start. Ellie recommends bovine for skin, hair, and nails — and explains when marine makes more sense.",
                  placeholder: "Screenshot coming — ask Ellie: \"where do I start with collagen?\"",
                },
                {
                  num: "02",
                  label: "Menopause",
                  scenario:
                    "52-year-old asks where to look. Ellie suggests the marine powder and offers the free Menopause guide.",
                  placeholder: "Screenshot coming — ask Ellie: \"I'm 52, what should I take?\"",
                },
                {
                  num: "03",
                  label: "The sceptic",
                  scenario:
                    "Visitor pushes back: \"isn't collagen just a trend?\". Ellie answers honestly with the enzymatic hydrolysis point. Doesn't oversell.",
                  placeholder: "Screenshot coming — ask Ellie: \"isn't collagen just a trend?\"",
                },
              ].map((item, i) => (
                <div
                  key={item.num}
                  data-reveal={`d${i}`}
                  className="rounded-2xl overflow-hidden flex flex-col hover:-translate-y-0.5 transition-all duration-300"
                  style={{ ...cardStyle, boxShadow: "0 2px 12px rgba(28,18,8,0.05)" }}
                >
                  {/* Fake browser / phone bar */}
                  <div
                    className="flex items-center gap-1.5 px-4 py-3"
                    style={{
                      borderBottom: `1px solid ${LINE}`,
                      background: "rgba(250,248,244,0.9)",
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8696A" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F0C050" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6CBE6C" }} />
                    <span
                      className="font-sora ml-2"
                      style={{ fontSize: "11px", color: MUTE }}
                    >
                      Ask Ellie — Edible Health
                    </span>
                  </div>

                  {/* Placeholder area */}
                  <div
                    className="flex-1 flex flex-col justify-center items-center px-6 py-10 text-center gap-3"
                    style={{ minHeight: "220px" }}
                  >
                    <span
                      className="font-playfair font-bold"
                      style={{ fontSize: "40px", lineHeight: 1, letterSpacing: "-0.04em", color: A, opacity: 0.4 }}
                    >
                      {item.num}
                    </span>
                    <p
                      className="font-sora italic"
                      style={{ fontSize: "12px", color: DIM, lineHeight: 1.6 }}
                    >
                      {item.placeholder}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-4" style={{ borderTop: `1px solid ${LINE}` }}>
                    <p
                      className="font-playfair font-normal mb-1"
                      style={{ fontSize: "15px", color: INK }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-sora"
                      style={{ fontSize: "12px", color: MUTE, lineHeight: 1.65 }}
                    >
                      {item.scenario}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 3 — HOW IT WORKS
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          <div className="max-w-5xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", color: DIM }}
            >
              Process
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal mb-14"
              style={{
                fontSize: "clamp(22px, 3.2vw, 44px)",
                lineHeight: 1.12,
                letterSpacing: "-0.022em",
                color: INK,
              }}
            >
              How this works
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  n: "01",
                  title: "30 mins from you.",
                  body: "I sit with you (or whoever on the team) and learn how Edible Health actually talks. Voice, do's, don'ts, the science you want surfaced.",
                },
                {
                  n: "02",
                  title: "I train Ellie properly.",
                  body: "She moves from the v1 you see on this page to sounding like you.",
                },
                {
                  n: "03",
                  title: "She goes live on your site in 48 hours.",
                  body: "Quiet launch — you'll see her work in real time.",
                },
                {
                  n: "04",
                  title: "Facebook & Instagram once Meta approves.",
                  body: "Same Ellie, same voice, across channels.",
                },
              ].map((step, i) => (
                <div
                  key={step.n}
                  data-reveal={`d${i % 3}`}
                  className="rounded-2xl p-7 flex flex-col gap-5 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ ...cardStyle, boxShadow: "0 2px 12px rgba(28,18,8,0.04)" }}
                >
                  <span
                    className="font-playfair font-bold"
                    style={{
                      fontSize: "clamp(48px, 5.5vw, 72px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: A,
                    }}
                  >
                    {step.n}
                  </span>
                  <h3
                    className="font-playfair font-normal"
                    style={{ fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.28, color: INK }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sora font-light leading-[1.8]"
                    style={{ fontSize: "14px", color: MUTE }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — WHAT ELLIE DOES FOR EDIBLE HEALTH
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          <div className="max-w-5xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", color: DIM }}
            >
              Built for Edible Health
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal mb-4"
              style={{
                fontSize: "clamp(22px, 3.2vw, 44px)",
                lineHeight: 1.12,
                letterSpacing: "-0.022em",
                color: INK,
              }}
            >
              What Ellie does for Edible Health
            </h2>
            <p
              data-reveal="d1"
              className="font-sora mb-14"
              style={{ fontSize: "15px", lineHeight: 1.75, color: MUTE, maxWidth: "480px" }}
            >
              Plain English, no buzzwords.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Recommends the right collagen.",
                  body: "Skin, hair, nails, joints, menopause — Ellie maps the visitor's goal to the right product.",
                },
                {
                  title: "Answers the science.",
                  body: "Hydrolysed, enzymatic, bovine vs marine — without sounding like a textbook.",
                },
                {
                  title: "Surfaces your free guides.",
                  body: "New to Collagen, Menopause, Collagen for Men. Captures the email cleanly.",
                },
                {
                  title: "Nudges quiet reorders.",
                  body: "Collagen is a 30-day product. Ellie reminds the right customer at the right moment.",
                },
                {
                  title: "Watches your reviews.",
                  body: "Pings the team if anyone leaves 1–3 stars on Trustpilot, Feefo, or Amazon. Drafts a response in your voice.",
                },
                {
                  title: "Hands off to a human the moment she should.",
                  body: "Medical, complaints, sensitive questions — straight to the team.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  data-reveal={`d${i % 3}`}
                  className="rounded-xl p-6 flex flex-col gap-3 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ ...cardStyle, boxShadow: "0 1px 8px rgba(28,18,8,0.04)" }}
                >
                  <h3
                    className="font-playfair font-normal"
                    style={{ fontSize: "clamp(15px, 1.35vw, 17px)", lineHeight: 1.3, color: INK }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sora font-light leading-[1.75]"
                    style={{ fontSize: "13.5px", color: MUTE }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 5 — MARKETING IS YOUR HEADACHE
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          <div className="max-w-3xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", color: DIM }}
            >
              A note
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal mb-10"
              style={{
                fontSize: "clamp(22px, 3.2vw, 44px)",
                lineHeight: 1.12,
                letterSpacing: "-0.022em",
                color: INK,
              }}
            >
              You told me marketing
              <br />was your biggest headache.
            </h2>

            <div
              data-reveal="d1"
              className="rounded-2xl p-7 md:p-10"
              style={{
                ...cardStyle,
                borderLeft: `3px solid ${A}`,
                boxShadow: "0 2px 16px rgba(28,18,8,0.05)",
              }}
            >
              <p
                className="font-sora leading-[1.9]"
                style={{ fontSize: "clamp(15px, 1.4vw, 17px)", color: MUTE }}
              >
                Last time we spoke, you said marketing was your biggest headache. I&apos;m not a
                marketer — and I won&apos;t pretend to be. But here&apos;s the thing: most marketing
                isn&apos;t broken because the ads are bad. It&apos;s broken because the visitor
                arrives, has a question, and nobody answers. Ellie is the bit between the click and
                the checkout. That&apos;s the bit I can fix.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 6 — THE DEAL
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          <div className="max-w-3xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", color: DIM }}
            >
              No commitment
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal mb-14"
              style={{
                fontSize: "clamp(22px, 3.2vw, 44px)",
                lineHeight: 1.12,
                letterSpacing: "-0.022em",
                color: INK,
              }}
            >
              The deal
            </h2>

            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Free to build.",
                  sub: "No upfront. No catch.",
                },
                {
                  title: "48 hours to live.",
                  sub: "Once you give the green light.",
                },
                {
                  title: "You only pay if you love it.",
                  sub: "Discounted rate — because of our history, and because you're early.",
                },
                {
                  title: "Money-back if she underperforms.",
                  sub: "What we agreed she'd do. In writing.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  data-reveal={`d${i % 2}`}
                  className="flex items-start gap-5 rounded-2xl px-7 py-6"
                  style={{ ...cardStyle, boxShadow: "0 1px 8px rgba(28,18,8,0.04)" }}
                >
                  <span
                    className="font-playfair font-bold shrink-0"
                    style={{
                      fontSize: "clamp(36px, 4vw, 52px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: A,
                      minWidth: "44px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <p
                      className="font-playfair font-normal mb-1"
                      style={{ fontSize: "clamp(17px, 1.6vw, 21px)", color: INK, lineHeight: 1.25 }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="font-sora font-light"
                      style={{ fontSize: "14px", color: MUTE, lineHeight: 1.7 }}
                    >
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 7 — CTA
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-28 md:py-44"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          <div className="max-w-xl mx-auto px-6 text-center">
            <div data-reveal>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 font-sora font-semibold rounded-full w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  background: A,
                  color: INK,
                  fontSize: "clamp(16px, 1.8vw, 19px)",
                  padding: "20px 40px",
                  minHeight: "64px",
                  boxShadow: `0 8px 48px rgba(200,151,106,0.35), 0 2px 16px rgba(200,151,106,0.2)`,
                }}
              >
                Alright Maks, let&apos;s see how this plays out →
              </a>
            </div>
            <p
              data-reveal="d1"
              className="font-sora mt-6"
              style={{ fontSize: "13px", color: DIM }}
            >
              Same WhatsApp number you&apos;ve always had. No forms, no calendar links.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 8 — HONEST CLOSE
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 md:py-28"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          <div className="max-w-2xl mx-auto px-6">

            <div
              data-reveal
              className="font-sora leading-[1.9]"
              style={{ fontSize: "clamp(15px, 1.4vw, 17px)", color: MUTE }}
            >
              <p className="mb-5">
                If timing&apos;s wrong, no drama. Even 5 minutes of your honest take on Ellie is
                worth more than most things on my calendar this week. If you know someone she&apos;d
                help — an intro means a lot.
              </p>
              <p className="mb-10">Either way, glad we kept in touch.</p>
              <p style={{ color: INK, fontWeight: 500 }}>— Maks</p>
            </div>

            {/* Ghost repeat CTA */}
            <div className="mt-12 pt-10" style={{ borderTop: `1px solid ${LINE}` }}>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sora font-medium rounded-full transition-all duration-300 hover:opacity-70"
                style={{
                  color: A,
                  border: `1px solid rgba(200,151,106,0.3)`,
                  fontSize: "14px",
                  padding: "13px 28px",
                }}
              >
                Message on WhatsApp →
              </a>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}
