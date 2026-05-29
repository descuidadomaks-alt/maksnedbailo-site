"use client";

import { useState } from "react";
import type { PartnerData } from "@/content/partners/index";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

type State = "idle" | "loading" | "success" | "error";

export default function SectionLeadMagnet({ data }: { data: PartnerData }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");

    try {
      // TODO:LEADMAGNET_WEBHOOK — replace with real ESP endpoint (Mailchimp / ConvertKit / Zapier)
      // For now: posts to Web3Forms which forwards to maks@maksnedbailo.site
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "TODO:WEB3FORMS_ACCESS_KEY", // get from web3forms.com (free)
          subject: "Strategic AI Map Template Request",
          from_name: "care less — Partner Page",
          email,
          message: `Template request from /partners/${data.slug}. Email: ${email}`,
          partner: data.partner.name,
        }),
      });

      if (res.ok) {
        setState("success");
        window.plausible?.("template_form_submit", { props: { slug: data.slug } });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <section className="section-divider py-12 md:py-16">
      <div className="max-w-xl mx-auto px-6">

        <div
          data-reveal
          className="rounded-2xl border border-white/[0.04] p-7 md:p-9 text-center"
          style={{ background: "rgba(255,255,255,0.01)" }}
        >
          <p
            className="font-sora font-semibold text-fg/50 mb-3 uppercase"
            style={{ fontSize: "11px", letterSpacing: "2px" }}
          >
            Not ready to book yet?
          </p>

          <p className="font-sora font-light text-fg/45 leading-[1.75] mb-8" style={{ fontSize: "14px" }}>
            Get the Strategic AI Map template I use on the call.
            You can run it on yourself first — no prep needed.
          </p>

          {state === "success" ? (
            <div
              className="rounded-xl py-5 px-6"
              style={{ background: "rgba(212,255,43,0.07)", border: "1px solid rgba(212,255,43,0.2)" }}
            >
              <p className="font-sora font-semibold text-accent" style={{ fontSize: "14px" }}>
                On its way.
              </p>
              <p className="font-sora font-light text-fg/40 mt-1" style={{ fontSize: "13px" }}>
                Check your inbox — usually arrives in a few minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === "loading"}
                className="flex-1 rounded-xl px-5 py-4 font-sora font-light text-fg/80 placeholder:text-fg/20 outline-none disabled:opacity-50 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  fontSize: "14px",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(212,255,43,0.3)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="shrink-0 rounded-xl px-6 py-4 font-sora font-semibold transition-all duration-200 hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                style={{
                  fontSize: "14px",
                  letterSpacing: "-0.01em",
                  border: "1px solid rgba(212,255,43,0.35)",
                  color: "rgba(212,255,43,0.8)",
                  background: "transparent",
                }}
              >
                {state === "loading" ? "Sending…" : "Send me the template →"}
              </button>
            </form>
          )}

          {state === "error" && (
            <p className="font-sora font-light text-fg/35 mt-4" style={{ fontSize: "12px" }}>
              Something went wrong. Message me on{" "}
              <a
                href={data.booking.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg/55 underline underline-offset-2 hover:text-fg/80 transition-colors"
              >
                WhatsApp
              </a>{" "}
              instead.
            </p>
          )}

          <p className="font-sora font-light text-fg/20 mt-5" style={{ fontSize: "11px" }}>
            No sequences. One email with the template, that&apos;s it.
          </p>
        </div>

      </div>
    </section>
  );
}
