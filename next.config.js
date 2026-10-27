/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { source: "/new7", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/new8", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/new9", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/new10", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/new11", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new11/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new10/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new9/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new8/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new7/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/shared/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
    ];
  },
  // Proxy Connecto API through our own domain so the browser makes
  // same-origin requests — no CORS preflight, no 403.
  // Vercel forwards the request (HTTP + WebSocket) to api.theconnecto.ai.
  async rewrites() {
    return [
      {
        source: "/new11",
        destination: "/careless/new11/index.html",
      },
      {
        source: "/new10",
        destination: "/careless/new10/index.html",
      },
      {
        source: "/new9",
        destination: "/careless/new9/index.html",
      },
      {
        source: "/new8",
        destination: "/careless/new8/index.html",
      },
      {
        source: "/new7",
        destination: "/careless/new7/index.html",
      },
      {
        source: "/projects/aelia",
        destination: "/aelia-presentation/index.html",
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
