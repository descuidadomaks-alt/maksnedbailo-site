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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
