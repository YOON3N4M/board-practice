/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    KAKAO_API_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    NAVER_API_KEY: process.env.NEXT_PUBLIC_NAVER_API_KEY,
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
