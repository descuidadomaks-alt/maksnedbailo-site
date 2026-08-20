"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CTA_TARGET } from "../lib/config";

/**
 * Mobile-only sticky bottom bar — appears once the user scrolls past the
 * hero, nudging toward the Bottleneck Score. Mounted only on /new (not
 * /score). See .mobile-cta-bar in globals.css for the FAB-lift sibling rule.
 */
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mobile-cta-bar ${visible ? "is-visible" : ""}`}>
      <p className="font-sora font-light text-fg/65" style={{ fontSize: "12.5px" }}>
        Free AI Map: 90 min
      </p>
      <Link
        href={CTA_TARGET}
        className="bg-accent text-bg shrink-0 inline-flex items-center gap-1.5 font-sora font-semibold rounded-lg transition-transform duration-200 hover:scale-[1.03]"
        style={{ fontSize: "12.5px", padding: "9px 16px", letterSpacing: "-0.01em" }}
      >
        Start
        <span aria-hidden><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h13M12 5l7 7-7 7" /></svg></span>
      </Link>
    </div>
  );
}
