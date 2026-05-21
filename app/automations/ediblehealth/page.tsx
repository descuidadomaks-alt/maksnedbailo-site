import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Built something for you, Corinna — Maks",
  description:
    "No pitch deck. Just a live agent trained on Edible Health, built on a quiet evening.",
  robots: { index: false, follow: false },
};

// ─── Config ───────────────────────────────────────────────────────────────────
// TODO: paste Connecto widget key for the Edible Health agent once it's ready.
// Agent name correction: always verify the widget title matches the intended
// agent name (dashboard copy-paste errors are common). Set language: "en".
const WIDGET_KEY   = ""; // e.g. "a7a0f6615376c91ca5a91e224d5043df"
const WIDGET_COLOR = "#7A9E8A"; // warm sage — earthy without aping Edible Health

// Warm amber — replaces Maks's default acid-green accent on this page.
// Used via inline styles because Tailwind's 'accent' colour is hardcoded.
const A = "#C8976A";

const WA_URL =
  "https://wa.me/34641935207?text=Alright%20Maks%2C%20I%20played%20with%20the%20Edible%20Health%20agent%20%E2%80%94%20let%27s%20talk.";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EdibleHealthPage() {
  return (
    <>
      {/* Plausible — tagged events */}
      <Script
        src="https://plausible.io/js/script.tagged-events.js"
        data-domain="maksnedbailo.site"
        strategy="afterInteractive"
      />

      {/*
       * WebSocket patcher — same as every other automation page.
       * Vercel proxy handles HTTP; WS must go direct to api.theconnecto.ai.
       */}
      {WIDGET_KEY && (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var W=window.WebSocket;window.WebSocket=function(u,p){u=String(u).replace('wss://www.maksnedbailo.site/api/connecto','wss://api.theconnecto.ai/api/v1');return p?new W(u,p):new W(u);};window.WebSocket.prototype=W.prototype;window.WebSocket.CONNECTING=0;window.WebSocket.OPEN=1;window.WebSocket.CLOSING=2;window.WebSocket.CLOSED=3;})();`,
          }}
        />
      )}

      {/* Connecto chat widget */}
      {WIDGET_KEY && (
        <Script
          src="https://app.theconnecto.ai/widget.js"
          strategy="afterInteractive"
          data-widget-key={WIDGET_KEY}
          data-api-url="https://www.maksnedbailo.site/api/connecto"
          data-title="Ask the Edible Health Agent"
          data-subtitle="Built by Maks"
          data-colour={WIDGET_COLOR}
          data-position="right"
          data-language="en"
          data-auto-open="false"
        />
      )}

      <main className="relative min-h-screen">

        {/* ── Warm ambient glow — fixed in background ───────────────────── */}
        <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div style={{
            position: "absolute", top: "8%", right: "8%",
            width: "640px", height: "640px",
            background: "radial-gradient(ellipse at center, rgba(200,151,106,0.07) 0%, transparent 68%)",
          }} />
          <div style={{
            position: "absolute", bottom: "15%", left: "5%",
            width: "440px", height: "440px",
            background: "radial-gradient(ellipse at center, rgba(122,158,138,0.05) 0%, transparent 68%)",
          }} />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative flex items-center pt-28 pb-24 md:pt-36 md:pb-32"
          style={{ zIndex: 1, minHeight: "88vh" }}
        >
          <div className="max-w-5xl mx-auto px-6 w-full">

            {/* Badge */}
            <div
              data-reveal
              className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: A, boxShadow: `0 0 6px ${A}80` }}
              />
              <span className="font-sora text-fg/50 text-xs tracking-widest uppercase">
                Personal · Edible Health · From Maks
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-16 items-start">

              {/* Left — quote + Maks's line */}
              <div>
                <blockquote
                  data-reveal="d0"
                  className="font-playfair italic text-fg mb-7"
                  style={{
                    fontSize: "clamp(28px, 5.2vw, 68px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  <span style={{ color: A, fontStyle: "normal", opacity: 0.65 }}>"</span>
                  Wow Maks — this is fucking awesome!!
                  <br />
                  You&apos;re a genius!! Thank you!! 🙏😭
                  <span style={{ color: A, fontStyle: "normal", opacity: 0.65 }}>"</span>
                </blockquote>

                <p
                  data-reveal="d1"
                  className="font-sora text-fg/32 mb-16 italic"
                  style={{ fontSize: "13px", letterSpacing: "0.01em" }}
                >
                  Corinna Cope · about 5 years ago · still my favourite testimonial
                </p>

                <p
                  data-reveal="d2"
                  className="font-sora text-fg/68"
                  style={{
                    fontSize: "clamp(17px, 1.9vw, 23px)",
                    lineHeight: 1.55,
                    maxWidth: "480px",
                  }}
                >
                  Built you something. The agent on the right is yours.
                  Have a play.{" "}
                  <span style={{ color: A }}>👉</span>
                </p>
              </div>

              {/* Right — screenshot as pinned paper cutout */}
              <div
                data-reveal="d3"
                style={{
                  transform: "rotate(-3.5deg)",
                  transformOrigin: "center top",
                  marginTop: "16px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "3px",
                    padding: "10px 10px 44px",
                    boxShadow:
                      "0 10px 52px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.35)",
                    position: "relative",
                  }}
                >
                  {/* Pin */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-11px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: A,
                      boxShadow: `0 3px 10px rgba(0,0,0,0.45)`,
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/automations/ediblehealth/Corinna_Cope_Feedback.png"
                    alt="Corinna's original feedback message"
                    style={{ display: "block", width: "100%", borderRadius: "2px" }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-sora, system-ui, sans-serif)",
                      fontSize: "10px",
                      color: "#aaa",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    the original 🙏
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — NOTE FROM MAKS
        ══════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-20 md:py-28 relative" style={{ zIndex: 1 }}>
          <div className="max-w-3xl mx-auto px-6">
            <div
              data-reveal
              style={{
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: `3px solid ${A}`,
                borderRadius: "18px",
                padding: "clamp(28px, 5vw, 52px)",
              }}
            >
              <p
                className="font-sora text-fg/30 mb-7"
                style={{
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                A note from Maks
              </p>

              <div
                className="font-sora text-fg/62 leading-[1.88]"
                style={{ fontSize: "16px" }}
              >
                <p className="mb-5 text-fg/80">Hi Corinna 👋</p>
                <p className="mb-5">
                  Quick story: AI came for the design industry. Rather than wait around to be a
                  casualty, I went the other way — spent the last while learning how to build AI
                  agents and automate the boring parts of running a business.
                </p>
                <p className="mb-5">
                  Built this on a quiet evening because I thought of you. No pitch deck. No
                  &ldquo;let&apos;s reconnect&rdquo; nonsense. You can WhatsApp me anytime — you
                  already do.
                </p>
                <p className="mb-5">
                  The agent on your right is v1, trained on what&apos;s public about Edible Health.
                  She&apos;s already useful. She&apos;ll only sound truly like{" "}
                  <em className="text-fg/85">you</em> once you&apos;ve told her what to keep and
                  what to bin.
                </p>
                <p className="text-fg/82 font-medium">
                  Have a play. Be brutal. — <strong>Maks</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — THREE THINGS I NOTICED
        ══════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-20 md:py-28 relative" style={{ zIndex: 1 }}>
          <div className="max-w-5xl mx-auto px-6">
            <p
              data-reveal
              className="font-sora text-fg/30 mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              What I spotted
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-4"
              style={{
                fontSize: "clamp(24px, 3.4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.022em",
              }}
            >
              Three things I noticed
              <br />
              <em style={{ opacity: 0.55 }}>(poking around Edible Health)</em>
            </h2>
            <p
              data-reveal="d1"
              className="font-sora text-fg/40 mb-14"
              style={{ fontSize: "15px", lineHeight: 1.78, maxWidth: "520px" }}
            >
              Not because anything&apos;s broken — but the tools moved fast in the last 12 months.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  n: "01",
                  title:
                    "Help Scout is great. Until someone DMs you on Instagram.",
                  body: "Your site uses Help Scout's Beacon widget — good kit for handling support tickets. Their new AI feature works on the website, but here's the catch: it doesn't extend to Instagram DMs, Facebook Messenger, or WhatsApp. Those still hit your inbox and wait for a human. So if someone DMs your Instagram at 9pm asking whether to start with bovine or marine, that question sits overnight. A custom agent trained on your voice can answer it in seconds, on every channel, around the clock.",
                },
                {
                  n: "02",
                  title: "Your guides do half the job.",
                  body: "The free guides (New to Collagen, Menopause, Collagen for Men) are smart — they get the email, they teach, they build trust. What I'd add: a short follow-up sequence that gently bridges from \"thanks for downloading\" to \"here's the right product for what you told us about yourself\", in your tone, without sounding like marketing. Most people who download a free guide don't buy on day one. They buy on day 9, or 17, or never — depending on what happens between.",
                },
                {
                  n: "03",
                  title: "The 30-day rhythm.",
                  body: "Collagen is a 30-day product. People run out. Some come back, some forget, some get nudged by another brand's ad. A quiet \"hey, you're probably nearly out — here's your reorder in one tap\" message at the right moment (text, email, or both — your call) does more than most ad spend. It's boring. It's unsexy. It prints money.",
                },
              ].map((card, i) => (
                <div
                  key={card.n}
                  data-reveal={`d${i}`}
                  className="rounded-2xl p-8 flex flex-col gap-5 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.018)",
                  }}
                >
                  <span
                    className="font-playfair font-bold"
                    style={{
                      fontSize: "clamp(52px, 6vw, 76px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: A,
                    }}
                  >
                    {card.n}
                  </span>
                  <h3
                    className="font-playfair font-normal text-fg"
                    style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.28 }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="font-sora font-light text-fg/55 leading-[1.82]"
                    style={{ fontSize: "14px" }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — WHAT'S POSSIBLE
        ══════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-20 md:py-28 relative" style={{ zIndex: 1 }}>
          <div className="max-w-5xl mx-auto px-6">
            <p
              data-reveal
              className="font-sora text-fg/30 mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              The full picture
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-4"
              style={{
                fontSize: "clamp(24px, 3.4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.022em",
              }}
            >
              Things I (and my partners) can build for you
            </h2>
            <p
              data-reveal="d1"
              className="font-sora text-fg/40 mb-14"
              style={{ fontSize: "15px", lineHeight: 1.78, maxWidth: "520px" }}
            >
              Anything we can&apos;t do in-house, my automation partners can. No buzzwords below
              — promise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "An agent on your website",
                  body: "Recommends products like a knowledgeable team member would. 24/7.",
                },
                {
                  title: "An agent on your Instagram & Facebook",
                  body: "Replies to DMs in your tone, knows your science, hands off to a human when it should.",
                },
                {
                  title: "A \"you're nearly out\" reorder nudge",
                  body: "Quiet, helpful, well-timed. Email or text.",
                },
                {
                  title: "A welcome sequence for guide downloads",
                  body: "Five short emails that turn a curious reader into a confident buyer.",
                },
                {
                  title: "An eye on your reviews",
                  body: "Pings you when someone leaves a low rating on Trustpilot, Amazon, Feefo. Drafts a response in your voice.",
                },
                {
                  title: "Getting found in ChatGPT, Perplexity, Google",
                  body: "The new way people search. We can write content built for both human eyes and AI engines.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  data-reveal={`d${i % 3}`}
                  className="rounded-xl p-6 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.018)",
                  }}
                >
                  <h3
                    className="font-playfair font-normal text-fg"
                    style={{ fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.3 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sora font-light text-fg/52 leading-[1.75]"
                    style={{ fontSize: "13.5px" }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — THE DEAL
        ══════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-20 md:py-28 relative" style={{ zIndex: 1 }}>
          <div className="max-w-3xl mx-auto px-6">
            <p
              data-reveal
              className="font-sora text-fg/30 mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              No commitment
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-14"
              style={{
                fontSize: "clamp(24px, 3.4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.022em",
              }}
            >
              What I&apos;m proposing
            </h2>

            <div className="flex flex-col gap-5">
              {[
                "I make the agent on the right actually sound like Edible Health. ~30 minutes of input from you or someone on the team. I do the rest.",
                "You play with v2. Show it to Simon, Jess, whoever. If it doesn't feel right, I rework it. Still free.",
                "Only if you love it, we talk numbers. Discounted rate — because of our history, and because you'd be one of the first I'm doing this for properly.",
                "Money-back if we go live and it underperforms what we agreed it would do. In writing.",
              ].map((body, i) => (
                <div
                  key={i}
                  data-reveal={`d${i % 2}`}
                  className="flex items-start gap-6 rounded-2xl p-6 md:p-8"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.018)",
                  }}
                >
                  <span
                    className="font-playfair font-bold shrink-0"
                    style={{
                      fontSize: "clamp(40px, 4.5vw, 60px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: A,
                      minWidth: "52px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-sora text-fg/68 leading-[1.82] pt-1"
                    style={{ fontSize: "15px" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — PLAY WITH HER NOW
        ══════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-20 md:py-28 relative" style={{ zIndex: 1 }}>
          <div className="max-w-3xl mx-auto px-6">
            <p
              data-reveal
              className="font-sora text-fg/30 mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              Have a go
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-10"
              style={{
                fontSize: "clamp(24px, 3.4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.022em",
              }}
            >
              She&apos;s good.
              <br />
              Only you can make her perfect.
            </h2>

            <div
              data-reveal="d1"
              className="font-sora text-fg/58 leading-[1.88]"
              style={{ fontSize: "16px", maxWidth: "560px" }}
            >
              <p className="mb-5">
                The agent on the bottom right knows Edible Health from your public stuff — the About
                page, the products, Corinna and Simon&apos;s story. She&apos;s not
                me-and-my-marketing-voice. She&apos;s trained on{" "}
                <em className="text-fg/85">yours</em>.
              </p>
              <p className="mb-10">
                Ask her something a first-time customer would ask. Try{" "}
                <em className="text-fg/82">&ldquo;I&apos;m 52, where do I start?&rdquo;</em> Try{" "}
                <em className="text-fg/82">
                  &ldquo;what&apos;s the difference between bovine and marine?&rdquo;
                </em>{" "}
                Try{" "}
                <em className="text-fg/82">&ldquo;is this for menopause?&rdquo;</em>{" "}
                See where she shines, see where she trips. That&apos;s the feedback I need to make
                her perfect.
              </p>
            </div>

            {/* Arrow to widget */}
            <div data-reveal="d2" className="flex items-center gap-3">
              <span className="font-sora text-fg/32" style={{ fontSize: "13px" }}>
                She&apos;s in the corner 👉 (or scroll down on mobile)
              </span>
              <svg
                width="26" height="26" viewBox="0 0 24 24" fill="none"
                style={{ color: A, opacity: 0.5 }}
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7 — CTA
        ══════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-28 md:py-44 relative" style={{ zIndex: 1 }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div data-reveal>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-sora font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  background: A,
                  color: "#1C1208",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  padding: "clamp(16px, 2.5vw, 22px) clamp(32px, 4vw, 52px)",
                  boxShadow: `0 8px 52px rgba(200,151,106,0.30), 0 2px 18px rgba(200,151,106,0.15)`,
                }}
              >
                Alright Maks, let&apos;s see how this plays out →
              </a>
            </div>
            <p
              data-reveal="d1"
              className="font-sora text-fg/28 mt-7"
              style={{ fontSize: "13px" }}
            >
              Goes to my WhatsApp. Same number you&apos;ve always had. No forms, no calendar links.
              Just us.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 8 — HONEST CLOSE
        ══════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-20 md:py-28 relative" style={{ zIndex: 1 }}>
          <div className="max-w-2xl mx-auto px-6">

            {/* Second screenshot — raw, slightly different tilt */}
            <div
              data-reveal
              className="mb-14"
              style={{ display: "inline-block", transform: "rotate(1.8deg)", maxWidth: "240px" }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "3px",
                  padding: "8px 8px 32px",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.45)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/automations/ediblehealth/Corinna_Cope_Feedback.png"
                  alt="Corinna's original feedback"
                  style={{ display: "block", width: "100%", borderRadius: "2px" }}
                />
              </div>
            </div>

            <div
              data-reveal="d1"
              className="font-sora text-fg/60 leading-[1.88]"
              style={{ fontSize: "16px" }}
            >
              <p
                className="font-sora text-fg/28 mb-7"
                style={{ fontSize: "12px", letterSpacing: "0.04em" }}
              >
                Last bit, since I&apos;d rather over-explain than under-explain:
              </p>
              <p className="mb-5">
                I&apos;m not pretending I&apos;ve got dozens of clients lined up — I&apos;m early in
                this chapter. What I do have is the same precision and care you got 5 years ago,
                plus a new toolbox, plus partners who can handle the bits I can&apos;t.
              </p>
              <p className="mb-5">
                If the timing&apos;s wrong, no drama. If you&apos;ve got 5 minutes to tell me what I
                got right or wrong on the agent, that alone is worth more than most things on my
                calendar this week. And if you know someone this&apos;d genuinely help — an intro
                means a lot.
              </p>
              <p className="mb-10">Either way — glad we kept in touch.</p>
              <p className="text-fg/82 font-medium">
                — <strong>Maks</strong>
              </p>
            </div>

            {/* Ghost button — secondary CTA */}
            <div className="mt-14 pt-10 border-t border-white/[0.06]">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sora font-medium rounded-full transition-all duration-300 hover:opacity-80"
                style={{
                  color: A,
                  border: `1px solid ${A}38`,
                  fontSize: "14px",
                  padding: "12px 26px",
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
