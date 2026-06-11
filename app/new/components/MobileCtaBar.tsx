"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SCORE_TARGET } from "../lib/config";

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
        Bottleneck Score — 2 min, free
      </p>
      <Link
        href={SCORE_TARGET}
        className="btn-glass shrink-0 inline-flex items-center gap-1.5 font-sora font-semibold rounded-lg"
        style={{ fontSize: "12.5px", padding: "9px 16px", letterSpacing: "-0.01em" }}
      >
        Start
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
