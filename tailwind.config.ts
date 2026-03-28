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
      colors: {
        bg: "#060608",
        fg: "#F0ECE6",
        accent: "#D4FF2B",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        sora: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
