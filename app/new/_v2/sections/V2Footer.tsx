"use client";

import Link from "next/link";
import type { V2Copy } from "../lib/copy";
import { WA_LINK } from "@/lib/content";

const YEAR = new Date().getFullYear();

/**
 * Slim V2 footer — logo, tagline, nav, WhatsApp, copyright, plus a huge
 * clipped "Care Less" wordmark bleeding off the bottom edge (reference:
 * the client's attached footer example). Decorative only, aria-hidden —
 * the real brand name already lives in the logo and the copyright line.
 * No /score link — the Bottleneck Score has been retired from this page.
 */
export default function V2Footer({ d, ctaHref }: { d: V2Copy; ctaHref: string }) {
  return (
    <footer className="section-divider relative overflow-hidden pt-20 md:pt-24" style={{ background: "var(--bg)" }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center gap-6 text-center pb-14 md:pb-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Care Less" width={28} height={28} className="w-auto shrink-0 opacity-80" style={{ height: "28px" }} />

        <p className="font-sora font-light text-[13px] text-fg/55 leading-relaxed max-w-[480px] tracking-wide">
          {d.footer.tagline}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/" className="font-sora text-[12px] text-fg/55 hover:text-fg/70 transition-colors">
            {d.footer.navHome}
          </Link>
          <Link href={ctaHref} className="font-sora text-[12px] text-fg/55 hover:text-fg/70 transition-colors">
            {d.footer.navAiMap}
          </Link>
          <Link href="/blog" className="font-sora text-[12px] text-fg/55 hover:text-fg/70 transition-colors">
            {d.footer.navBlog}
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sora text-[12px] text-fg/55 hover:text-green-400 transition-colors group"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-50 group-hover:opacity-100 transition-opacity">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
            {d.footer.waLabel}
          </a>
        </nav>

        <p className="font-sora text-[11px] text-fg/55">
          © {YEAR} Care Less AI Automation. Santander, Spain
        </p>
      </div>

      {/* Giant clipped wordmark — the real brand lockup (public/care_less.svg,
          1100x178, white paths), bled off the bottom edge of the page and
          dimmed to a watermark. Clipping is done by the wrapper's fixed
          height + overflow-hidden, so roughly the bottom fifth of the
          letterforms is cut by the page edge. */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden select-none px-6"
        style={{ height: "clamp(46px, 10vw, 132px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/care_less.svg"
          alt=""
          className="w-full block"
          style={{ opacity: 0.08, maxWidth: "1200px", margin: "0 auto" }}
        />
      </div>
    </footer>
  );
}
