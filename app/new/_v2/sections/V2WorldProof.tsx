"use client";

import type { V2Copy } from "../lib/copy";
import { KlarnaWordmark, IkeaWordmark, OctopusWordmark } from "../../components/BrandWordmarks";

const WORDMARKS = [KlarnaWordmark, IkeaWordmark, OctopusWordmark];

/**
 * Section 4b — WORLD PROOF. Sits directly under the cases (V2Cases), no
 * divider between them, so the page doesn't read as three small projects
 * standing alone — it reads as one continuous "this pattern is proven"
 * block, small companies and large companies in the same breath.
 */
export default function V2WorldProof({ d }: { d: V2Copy }) {
  return (
    <div className="relative" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <p
          data-reveal
          className="font-label text-fg/45 mb-6"
          style={{ fontSize: "9.5px", letterSpacing: "2.5px", textTransform: "uppercase" }}
        >
          {d.worldProof.label}
        </p>

        <div className="flex flex-col">
          {d.worldProof.items.map((item, i) => {
            const Wordmark = WORDMARKS[i];
            return (
              <div
                key={item.name}
                data-reveal={`d${i}`}
                className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 py-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="sm:w-40 shrink-0 flex items-center gap-3">
                  {Wordmark && <Wordmark className="h-5 w-auto shrink-0" />}
                  <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "18px" }}>
                    {item.name}
                  </h3>
                </div>
                <div className="flex-1">
                  <p className="font-sora font-light text-fg/62 leading-[1.65]" style={{ fontSize: "14px" }}>
                    {item.line}
                  </p>
                  <p className="font-label mt-2" style={{ fontSize: "10px", letterSpacing: "1px", color: "rgba(240,236,230,0.35)" }}>
                    {item.source}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
