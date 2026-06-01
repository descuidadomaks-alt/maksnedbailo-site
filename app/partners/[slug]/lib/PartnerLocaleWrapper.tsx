"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { PartnerLocaleProvider, usePartnerLocale } from "./partner-locale";
import type { Locale } from "@/content/partners/index";

// ── Language toggle ────────────────────────────────────────────────────────────

function LangToggle() {
  const { locale, setLocale } = usePartnerLocale();
  const btn = (l: Locale, label: string) => (
    <button
      onClick={() => setLocale(l)}
      aria-pressed={locale === l}
      className="font-sora transition-colors duration-150"
      style={{
        fontSize: "10px",
        letterSpacing: "1.5px",
        fontWeight: locale === l ? 600 : 300,
        color: locale === l ? "rgba(212,255,43,0.75)" : "rgba(240,236,230,0.25)",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px 0",
      }}
    >
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-2">
      {btn("en", "EN")}
      <span style={{ color: "rgba(240,236,230,0.15)", fontSize: "10px" }}>·</span>
      {btn("uk", "УК")}
    </div>
  );
}

// ── Minimal static partner header ─────────────────────────────────────────────

function PartnerHeader() {
  return (
    <header
      className="flex items-center justify-between px-5 sm:px-8"
      style={{
        height: "56px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(6,6,8,0.98)",
      }}
    >
      <Link href="/" aria-label="care less AI automation — home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="care less AI automation"
          style={{ height: "28px", opacity: 0.6 }}
          className="hover:opacity-90 transition-opacity duration-200"
        />
      </Link>

      <div className="flex items-center gap-4">
        <LangToggle />
        <span
          className="font-sora hidden sm:block"
          style={{
            fontSize: "9px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            border: "1px solid rgba(212,255,43,0.14)",
            borderRadius: "999px",
            padding: "4px 10px",
            color: "rgba(212,255,43,0.45)",
          }}
        >
          Personal Invitation
        </span>
      </div>
    </header>
  );
}

// ── Wrapper — provides context + renders header ────────────────────────────────

export default function PartnerLocaleWrapper({
  children,
  defaultLocale,
}: {
  children: ReactNode;
  defaultLocale: Locale;
}) {
  return (
    <PartnerLocaleProvider defaultLocale={defaultLocale}>
      <PartnerHeader />
      {children}
    </PartnerLocaleProvider>
  );
}
