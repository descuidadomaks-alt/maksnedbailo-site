/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy Connecto API through our own domain so the browser makes
  // same-origin requests — no CORS preflight, no 403.
  // Vercel forwards the request (HTTP + WebSocket) to api.theconnecto.ai.
  async rewrites() {
    return [
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
