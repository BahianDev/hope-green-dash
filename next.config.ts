import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hope-green.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'osten-dash.s3.us-east-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
