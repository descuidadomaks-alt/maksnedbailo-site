/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { source: "/new12", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new12/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/new11", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new11/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/shared/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/projects/aelia-2", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/aelia-2/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      // BG Beach Homes preview: will move to its own domain, so it stays out of this site's index.
      { source: "/projects/bg-beach-homes", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/projects/bg-beach-homes/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/bgbh/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  // Proxy Connecto API through our own domain so the browser makes
  // same-origin requests — no CORS preflight, no 403.
  // Vercel forwards the request (HTTP + WebSocket) to api.theconnecto.ai.
  async rewrites() {
    return [
      // Homepage = the care_less experience (same file as /new12; "/" is indexable, /new12 keeps its noindex header).
      // The previous homepage lives at /old4.
      {
        source: "/",
        destination: "/careless/new12/index.html",
      },
      {
        source: "/new12",
        destination: "/careless/new12/index.html",
      },
      {
        source: "/new11",
        destination: "/careless/new11/index.html",
      },
      {
        source: "/projects/aelia",
        destination: "/aelia-presentation/index.html",
      },
      {
        source: "/projects/aelia-2",
        destination: "/aelia-2/index.html",
      },
      // BG Beach Homes: one buildless app; the client router reads the path.
      {
        source: "/projects/bg-beach-homes",
        destination: "/bgbh/index.html",
      },
      {
        source: "/projects/bg-beach-homes/:path*",
        destination: "/bgbh/index.html",
      },
      {
        source: "/api/connecto/:path*",
        destination: "https://api.theconnecto.ai/api/v1/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/roman",
        destination: "/projects/roman",
        permanent: true,
      },
      {
        source: "/parati",
        destination: "/projects/parati",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Disable webpack's persistent disk cache in dev — its gzip serialize step
  // OOMs in this environment (ERR_MEMORY_ALLOCATION_FAILED), which silently
  // leaves the dev server serving stale compiled output after edits.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
