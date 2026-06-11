"use client";

import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

/**
 * GlassButton — liquid-glass primary CTA (see .btn-glass in globals.css).
 * Internal hrefs use next/link; external (http/zcal) hrefs open in a new tab.
 */
export default function GlassButton({
  href,
  children,
  className = "",
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const isExternal = href.startsWith("http");
  const classes = `btn-glass group inline-flex items-center justify-center gap-2.5 font-sora font-semibold rounded-xl ${className}`;
  const baseStyle: CSSProperties = {
    fontSize: "15px",
    padding: "18px 32px",
    minHeight: "60px",
    letterSpacing: "-0.01em",
    ...style,
  };

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={baseStyle}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={baseStyle}>
      {children}
    </Link>
  );
}
