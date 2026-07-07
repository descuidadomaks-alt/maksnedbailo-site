"use client";

import { useEffect, useRef } from "react";
import { site } from "../lib/content";

/**
 * Leaflet map (CARTO light basemap) recoloured toward the cream/gold palette
 * via a CSS filter on the tile pane — a genuine styled map, no Google key.
 * Leaflet is loaded from CDN on mount so it adds no build dependency.
 */
export function MapPara() {
  const ref = useRef<HTMLDivElement>(null);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current || !ref.current) return;
    inited.current = true;

    const ensureCss = () => {
      if (document.getElementById("leaflet-css")) return;
      const l = document.createElement("link");
      l.id = "leaflet-css";
      l.rel = "stylesheet";
      l.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(l);
    };

    const init = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      if (!L || !ref.current) return;
      const { lat, lng } = site.geo;
      const map = L.map(ref.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([lat, lng], 16);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(map);

      const icon = L.divIcon({
        className: "pt-pin",
        html: "<span></span>",
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${site.business}</strong><br>${site.address}`);
    };

    ensureCss();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).L) {
      init();
    } else {
      let s = document.getElementById("leaflet-js") as HTMLScriptElement | null;
      if (!s) {
        s = document.createElement("script");
        s.id = "leaflet-js";
        s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        document.body.appendChild(s);
      }
      s.addEventListener("load", init, { once: true });
    }
  }, []);

  return (
    <div
      ref={ref}
      className="pt-map h-[380px] w-full"
      role="img"
      aria-label={site.contact.mapTitle}
    />
  );
}
