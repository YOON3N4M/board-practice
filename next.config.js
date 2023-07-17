/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    KAKAO_API_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
  },
};

module.exports = nextConfig;
