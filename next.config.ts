import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary disable static export for easier deployment
  // output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
