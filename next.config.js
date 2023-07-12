/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://board-practice.vercel.app/:path*",
      },
    ];
  }
};

module.exports = nextConfig;
