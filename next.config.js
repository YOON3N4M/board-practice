/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://192.168.100.76:3000/:path*",
      },
    ];
  }
};

module.exports = nextConfig;
