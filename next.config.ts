import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/**'), new URL('https://img.clerk.com/**')],
  }
};

export default nextConfig;
