"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver that watches every [data-reveal] element
 * on the demo pages. When an element enters the viewport it gets the .revealed
 * class, triggering the CSS fade-up transition defined in globals.css.
 *
 * Delay variants: data-reveal="d0" | "d1" | "d2" | "d3"
 * (mapped to 0 / 80 / 160 / 240 ms via CSS --reveal-delay)
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
