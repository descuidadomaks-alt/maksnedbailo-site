"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { DirectLocaleProvider, useDirectLocale, type DirectLocale } from "./locale";

function LangToggle() {
  const { locale, setLocale } = useDirectLocale();
  const btn = (l: DirectLocale, label: string) => (
    <button
      key={l}
      onClick={() => setLocale(l)}
      aria-pressed={locale === l}
      className="font-sora transition-colors duration-150"
      style={{
        fontSize: "10px",
        letterSpacing: "1.5px",
        fontWeight: locale === l ? 600 : 300,
        color: locale === l ? "rgba(212,255,43,0.78)" : "rgba(240,236,230,0.28)",
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
      <span style={{ color: "rgba(240,236,230,0.14)", fontSize: "10px" }}>·</span>
      {btn("uk", "УК")}
    </div>
  );
}

function DirectHeader() {
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
      <LangToggle />
    </header>
  );
}

export default function DirectLocaleWrapper({
  children,
  defaultLocale,
}: {
  children: ReactNode;
  defaultLocale: DirectLocale;
}) {
  return (
    <DirectLocaleProvider defaultLocale={defaultLocale}>
      <DirectHeader />
      {children}
    </DirectLocaleProvider>
  );
}
