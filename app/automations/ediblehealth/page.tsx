import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ellie — built for Edible Health",
  description: "A quick note and a live demo, from Maks.",
  robots: { index: false, follow: false },
};

// ─── Config ───────────────────────────────────────────────────────────────────
const WIDGET_KEY   = "462ee3c2e525aa231104a73336884bf8";
const WIDGET_COLOR = "#7485b3";

// WhatsApp deep link — Maks's UK number for Edible Health
const WA =
  "https://wa.me/380939256452?text=Alright%20Maks%2C%20I%20played%20with%20Ellie%20%E2%80%94%20let%27s%20talk.";

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
          data-title="Ellie | Edible Health"
          data-subtitle="No Nonsense Guide"
          data-colour={WIDGET_COLOR}
          data-position="right"
          data-language="en"
          data-auto-open="false"
        />
      )}

      <main>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative flex items-center pt-28 pb-20 md:pt-36 md:pb-28"
          style={{ minHeight: "88svh" }}
        >
          {/* Subtle accent glow */}
          <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              style={{
                position: "absolute", top: "10%", right: "8%",
                width: "480px", height: "480px",
                background: "radial-gradient(ellipse at center, rgba(212,255,43,0.055) 0%, transparent 68%)",
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto px-6 w-full relative">

            {/* Eyebrow */}
            <div
              data-reveal
              className="mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{ border: "1px solid rgba(212,255,43,0.2)", background: "rgba(212,255,43,0.05)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 5px rgba(212,255,43,0.6)" }}
              />
              <span
                className="font-sora text-xs text-accent tracking-widest uppercase"
                style={{ letterSpacing: "3px" }}
              >
                For Corinna · Edible Health · From Maks
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-16 items-start">

              {/* Left — quote + attribution + note */}
              <div>
                <blockquote
                  data-reveal="d0"
                  className="font-playfair italic text-fg mb-5"
                  style={{
                    fontSize: "clamp(26px, 4.8vw, 60px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  <span className="text-accent not-italic" style={{ opacity: 0.4 }}>&ldquo;</span>
                  Wow Maks — this is fucking awesome!! &hellip;{" "}
                  You&apos;re a genius!! Thank you!!
                  <span className="text-accent not-italic" style={{ opacity: 0.4 }}>&rdquo;</span>
                </blockquote>

                <p
                  data-reveal="d1"
                  className="font-sora italic text-fg/40 mb-10"
                  style={{ fontSize: "13px" }}
                >
                  Corinna Cope · ~5 years ago · still my favourite testimonial
                </p>

                {/* Note card */}
                <div
                  data-reveal="d2"
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: "2px solid rgba(212,255,43,0.45)",
                  }}
                >
                  <p
                    className="font-sora font-light text-fg/75 leading-[1.85]"
                    style={{ fontSize: "clamp(14px, 1.4vw, 16px)" }}
                  >
                    We had a fun time working together 😄 Just so you know — I&apos;ve switched rails
                    to AI concierge + ops automation, ROI-first.
                    <br /><br />
                    78% of customers buy from the first business that responds.{" "}
                    <strong className="text-fg font-medium">Ellie</strong> goes live on your website
                    + Facebook Messenger + Instagram DMs in 48 hours — once approved.
                    <br /><br />
                    <strong className="text-fg font-medium">
                      Try her live. Widget bottom-right →
                    </strong>
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
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "3px",
                    padding: "10px 10px 20px",
                    boxShadow: "0 8px 48px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)",
                    position: "relative",
                  }}
                >
                  {/* Pin */}
                  <div
                    style={{
                      position: "absolute", top: "-11px", left: "50%",
                      transform: "translateX(-50%)",
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: "#D4FF2B",
                      boxShadow: "0 2px 8px rgba(212,255,43,0.45)",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/automations/ediblehealth/Corinna_Cope_Feedback.png"
                    alt="Corinna's original feedback"
                    style={{ display: "block", width: "100%", borderRadius: "2px" }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-sora, system-ui, sans-serif)",
                      fontSize: "10px",
                      color: "#999",
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

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — ELLIE IN ACTION (proof screenshots)
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase text-fg/40 mb-4"
              style={{ fontSize: "10px", letterSpacing: "3px" }}
            >
              Proof of work
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-3"
              style={{ fontSize: "clamp(22px, 3.2vw, 44px)", lineHeight: 1.12, letterSpacing: "-0.022em" }}
            >
              Not a generic chatbot.
              <br />
              <em className="text-fg/55">Here she is talking like Edible Health.</em>
            </h2>
            <p
              data-reveal="d1"
              className="font-sora font-light text-fg/65 mb-12"
              style={{ fontSize: "15px", lineHeight: 1.75, maxWidth: "500px" }}
            >
              When you try her live, ask anything, be brutal, then let me know what she got wrong.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  num: "01",
                  label: "Bovine vs marine",
                  scenario:
                    "Visitor asks where to start. Ellie recommends bovine for skin, hair, and nails — and explains when marine makes more sense.",
                  placeholder:
                    "Screenshot coming — ask Ellie: \"where do I start with collagen?\"",
                },
                {
                  num: "02",
                  label: "Menopause",
                  scenario:
                    "52-year-old asks where to look. Ellie suggests the marine powder and offers the free Menopause guide.",
                  placeholder:
                    "Screenshot coming — ask Ellie: \"I'm 52, what should I take?\"",
                },
                {
                  num: "03",
                  label: "The sceptic",
                  scenario:
                    "Visitor pushes back: \"isn't collagen just a trend?\". Ellie answers honestly with the enzymatic hydrolysis point. Doesn't oversell.",
                  placeholder:
                    "Screenshot coming — ask Ellie: \"isn't collagen just a trend?\"",
                },
              ].map((item, i) => (
                <div
                  key={item.num}
                  data-reveal={`d${i}`}
                  className="rounded-2xl overflow-hidden flex flex-col hover:-translate-y-0.5 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {/* Dark phone/browser bar */}
                  <div
                    className="flex items-center gap-1.5 px-4 py-3"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.025)",
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    <span className="font-sora ml-2 text-fg/40" style={{ fontSize: "11px" }}>
                      Ask Ellie — Edible Health
                    </span>
                  </div>

                  {/* Placeholder area */}
                  <div
                    className="flex-1 flex flex-col justify-center items-center px-6 py-10 text-center gap-3"
                    style={{ minHeight: "220px" }}
                  >
                    <span
                      className="font-playfair font-bold text-accent"
                      style={{ fontSize: "40px", lineHeight: 1, letterSpacing: "-0.04em", opacity: 0.4 }}
                    >
                      {item.num}
                    </span>
                    <p
                      className="font-sora italic text-fg/35"
                      style={{ fontSize: "12px", lineHeight: 1.6 }}
                    >
                      {item.placeholder}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="font-playfair font-normal text-fg mb-1" style={{ fontSize: "15px" }}>
                      {item.label}
                    </p>
                    <p
                      className="font-sora font-light text-fg/60"
                      style={{ fontSize: "12px", lineHeight: 1.65 }}
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
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase text-fg/40 mb-4"
              style={{ fontSize: "10px", letterSpacing: "3px" }}
            >
              Process
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-12"
              style={{ fontSize: "clamp(22px, 3.2vw, 44px)", lineHeight: 1.12, letterSpacing: "-0.022em" }}
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
                  title: "Live on your site in 48 hours.",
                  body: "Quiet launch — you'll see her work in real time.",
                },
                {
                  n: "04",
                  title: "Facebook & Instagram follow.",
                  body: "Once Meta approves — usually a few days. Same Ellie, same voice, across channels.",
                },
              ].map((step, i) => (
                <div
                  key={step.n}
                  data-reveal={`d${i % 3}`}
                  className="rounded-2xl p-7 flex flex-col gap-5 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span
                    className="font-playfair font-bold text-accent"
                    style={{ fontSize: "clamp(48px, 5.5vw, 72px)", lineHeight: 1, letterSpacing: "-0.04em" }}
                  >
                    {step.n}
                  </span>
                  <h3
                    className="font-playfair font-normal text-fg"
                    style={{ fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.28 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sora font-light text-fg/65 leading-[1.8]"
                    style={{ fontSize: "14px" }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — WHAT ELLIE DOES (3 cards)
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase text-fg/40 mb-4"
              style={{ fontSize: "10px", letterSpacing: "3px" }}
            >
              Built for Edible Health
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-3"
              style={{ fontSize: "clamp(22px, 3.2vw, 44px)", lineHeight: 1.12, letterSpacing: "-0.022em" }}
            >
              What Ellie does for Edible Health
            </h2>
            <p
              data-reveal="d1"
              className="font-sora font-light text-fg/65 mb-12"
              style={{ fontSize: "15px", lineHeight: 1.75, maxWidth: "480px" }}
            >
              Plain English, no buzzwords.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              ].map((item, i) => (
                <div
                  key={item.title}
                  data-reveal={`d${i}`}
                  className="rounded-xl p-6 flex flex-col gap-3 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <h3
                    className="font-playfair font-normal text-fg"
                    style={{ fontSize: "clamp(15px, 1.35vw, 17px)", lineHeight: 1.3 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sora font-light text-fg/65 leading-[1.75]"
                    style={{ fontSize: "13.5px" }}
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
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase text-fg/40 mb-4"
              style={{ fontSize: "10px", letterSpacing: "3px" }}
            >
              A note
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-8"
              style={{ fontSize: "clamp(22px, 3.2vw, 44px)", lineHeight: 1.12, letterSpacing: "-0.022em" }}
            >
              You told me marketing
              <br />was your biggest headache.
            </h2>

            <div
              data-reveal="d1"
              className="rounded-2xl p-7 md:p-10"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "2px solid rgba(212,255,43,0.45)",
              }}
            >
              <p
                className="font-sora font-light text-fg/75 leading-[1.9]"
                style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}
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
            Section 7 (You Stay in Control) flows inline below — no divider.
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase text-fg/40 mb-4"
              style={{ fontSize: "10px", letterSpacing: "3px" }}
            >
              No commitment
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-12"
              style={{ fontSize: "clamp(22px, 3.2vw, 44px)", lineHeight: 1.12, letterSpacing: "-0.022em" }}
            >
              The deal
            </h2>

            <div className="flex flex-col gap-4">
              {[
                { title: "Free to build.",               sub: "No upfront. No catch." },
                { title: "48 hours to live.",            sub: "Once you give the green light." },
                { title: "You only pay if you love it.", sub: "Discounted rate — because of our history, and because you're early." },
                { title: "Money-back if she underperforms.", sub: "What we agreed she'd do. In writing." },
              ].map((item, i) => (
                <div
                  key={item.title}
                  data-reveal={`d${i % 2}`}
                  className="flex items-start gap-5 rounded-2xl px-7 py-6"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span
                    className="font-playfair font-bold text-accent shrink-0"
                    style={{
                      fontSize: "clamp(36px, 4vw, 52px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      minWidth: "44px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <p
                      className="font-playfair font-normal text-fg mb-1"
                      style={{ fontSize: "clamp(17px, 1.6vw, 21px)", lineHeight: 1.25 }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="font-sora font-light text-fg/60"
                      style={{ fontSize: "14px", lineHeight: 1.7 }}
                    >
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── SECTION 7 — YOU STAY IN CONTROL ──────────────────────────────
                Tight inline div — no section-divider, flows directly after the deal.
            ───────────────────────────────────────────────────────────────────── */}
            <div
              data-reveal
              className="mt-5 rounded-2xl px-7 py-5"
              style={{ background: "rgba(212,255,43,0.04)", border: "1px solid rgba(212,255,43,0.12)" }}
            >
              <p
                className="font-sora font-light text-fg/70 leading-[1.85]"
                style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
              >
                <strong className="font-medium text-fg">You stay in control.</strong>{" "}
                You see every conversation. You can step in any time. If Ellie says something wrong,
                you tell me — and I fix it, usually same day.
              </p>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 8 — GOT A DIFFERENT PROBLEM?
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-6">

            <p
              data-reveal
              className="font-sora uppercase text-fg/40 mb-4"
              style={{ fontSize: "10px", letterSpacing: "3px" }}
            >
              While I have you
            </p>
            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-8"
              style={{ fontSize: "clamp(22px, 3.2vw, 44px)", lineHeight: 1.12, letterSpacing: "-0.022em" }}
            >
              Got a different problem?
              <br />
              <em className="text-fg/55">Probably know someone who&apos;s solved one like it.</em>
            </h2>

            <div
              data-reveal="d1"
              className="rounded-2xl p-7 md:p-9 mb-10"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "2px solid rgba(212,255,43,0.45)",
              }}
            >
              <p
                className="font-sora font-light text-fg/75 leading-[1.9]"
                style={{ fontSize: "clamp(14px, 1.35vw, 16px)" }}
              >
                Ellie handles the conversation. For the deeper stuff — I&apos;ve spent the last 2
                years inside a Ukrainian digital community of operators across marketing, SEO, Amazon,
                and content. If something here lands and you want to go deeper, we can. If not, no
                pressure.
              </p>
            </div>

            <p
              data-reveal="d2"
              className="font-sora font-light text-fg/45 mb-5"
              style={{ fontSize: "12px", letterSpacing: "0.01em" }}
            >
              Things we could talk about, when it makes sense:
            </p>

            <ul data-reveal="d3" className="flex flex-col gap-3">
              {[
                "Email sequences — welcome flows from guide downloads, 30-day reorder nudges.",
                "SEO + GEO — being findable in Google and in ChatGPT, Perplexity, Gemini. GEO (Generative Engine Optimisation) is the new layer: writing content AI engines actually quote back.",
                "Amazon listing optimisation — for the friction we talked about last time.",
                "Customer story automation — gather reviews, before-afters, and testimonials without chasing people.",
                "New customer onboarding — a sequence that turns a first-time buyer into a repeat one.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-sora font-light text-fg/70 leading-[1.75]"
                  style={{ fontSize: "clamp(14px, 1.3vw, 15px)" }}
                >
                  <span className="text-accent shrink-0 mt-1" style={{ fontSize: "9px" }}>●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 9 — CTA
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-xl mx-auto px-6">
            <div data-reveal>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 font-sora font-semibold rounded-full w-full bg-accent text-bg transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  fontSize: "clamp(16px, 1.8vw, 19px)",
                  padding: "20px 40px",
                  minHeight: "64px",
                }}
              >
                Alright Maks, let&apos;s see how this plays out →
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 10 — HONEST CLOSE
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-2xl mx-auto px-6">
            <p
              data-reveal
              className="font-sora font-light text-fg/65 leading-[1.9]"
              style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}
            >
              No timeline pressure from me — never has been. Ping me when you&apos;ve played with her.
            </p>
            <p
              data-reveal="d1"
              className="font-sora font-medium text-fg mt-4"
              style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}
            >
              — Maks
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
