/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { source: "/new3", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/new4", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/new5", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/new6", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new6/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new5/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/careless/new4/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
    ];
  },
  // Proxy Connecto API through our own domain so the browser makes
  // same-origin requests — no CORS preflight, no 403.
  // Vercel forwards the request (HTTP + WebSocket) to api.theconnecto.ai.
  async rewrites() {
    return [
      {
        source: "/new6",
        destination: "/careless/new6/index.html",
      },
      {
        source: "/new5",
        destination: "/careless/new5/index.html",
      },
      {
        source: "/new4",
        destination: "/careless/new4/index.html",
      },
      {
        source: "/new3",
        destination: "/careless/new3/index.html",
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
