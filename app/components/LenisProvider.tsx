"use client";

import { useEffect } from "react";

/**
 * Lenis smooth-scroll provider — site-wide.
 *
 * Gives the buttery-smooth scroll feel (à la littleonline.com).
 * Fully respects prefers-reduced-motion: disabled when media query matches.
 * Handles anchor-link clicks so `href="#section"` scrolls smoothly.
 *
 * Also drives a lightweight parallax system: any element with
 * `data-parallax="0.08"` (speed 0–1) gets a subtle translateY on scroll.
 * Speed is halved on touch devices (<768px) to avoid heaviness.
 *
 * Render once in the root layout body — no children wrapper needed.
 */
export default function LenisProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    // Skip on touch / small screens. The smooth-scroll RAF loop + parallax
    // scroll handler is a major mobile main-thread (TBT) cost, and native
    // mobile scrolling is already smooth. Desktop keeps the premium glide.
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) return;

    // Dynamically import Lenis so it's never bundled server-side
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        lerp: 0.07,          // silkiness; lower = slower but smoother (premium glide)
        smoothWheel: true,
        touchMultiplier: 1.8,
        infinite: false,
      });

      // RAF loop
      let rafId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Anchor-link support — prevent double-scroll on href="#id" clicks
      const onAnchorClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest("a[href^='#']");
        if (!a) return;
        const id = (a as HTMLAnchorElement).hash?.slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      };
      document.addEventListener("click", onAnchorClick);

      // Parallax: elements with data-parallax="<speed>" get translateY on scroll
      const isMobile = () => window.innerWidth < 768;
      const parallaxEls = Array.from(
        document.querySelectorAll<HTMLElement>("[data-parallax]")
      );

      if (parallaxEls.length > 0) {
        lenis.on("scroll", ({ scroll }: { scroll: number }) => {
          const speed_mult = isMobile() ? 0.5 : 1;
          parallaxEls.forEach((el) => {
            const speed = parseFloat(el.dataset.parallax ?? "0.08") * speed_mult;
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const offset = (window.innerHeight / 2 - center) * speed;
            el.style.transform = `translateY(${offset.toFixed(2)}px)`;
          });
        });
      }

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        document.removeEventListener("click", onAnchorClick);
      };
    });
  }, []);

  return null;
}
