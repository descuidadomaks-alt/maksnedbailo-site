import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        bg: "#060608",
        fg: "#F0ECE6",
        accent: "#D4FF2B",

        // ── Para Ti demo (/projects/parati) — additive, used only there ──
        cream: "#F7F2E9",
        ivory: "#FBF8F2",
        gold: "#C2A05B",
        "gold-deep": "#9A7B33",
        charcoal: "#3A332B",
        sage: "#8A9A7B",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        sora: ["var(--font-sora)", "system-ui", "sans-serif"],

        // Para Ti demo only (scoped via --font-pt-* in app/projects/parati)
        display: ["var(--font-pt-display)", "Georgia", "serif"],
        jost: ["var(--font-pt-body)", "system-ui", "sans-serif"],
      },
      // ── Para Ti demo design tokens (additive, no defaults overridden) ──
      letterSpacing: {
        label: "0.22em",
      },
      maxWidth: {
        content: "72rem",
      },
      borderRadius: {
        soft: "1.25rem",
      },
      boxShadow: {
        soft: "0 24px 60px -32px rgba(58, 51, 43, 0.25)",
        card: "0 18px 48px -34px rgba(58, 51, 43, 0.22)",
      },
      keyframes: {
        bloom: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        bloom: "bloom 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
