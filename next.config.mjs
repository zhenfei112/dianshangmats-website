/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async headers() {
    return ["/admin/:path*", "/account", "/quote-basket", "/submit-inquiry", "/order-history", "/order-tracking", "/search"].map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }]
    }));
  },
  allowedDevOrigins: ["127.0.0.1", "localhost", "127.0.0.1:3000", "localhost:3000"],
  images: {
    unoptimized: true
  }
};

export default nextConfig;
