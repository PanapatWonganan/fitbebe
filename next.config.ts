import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js config for Vercel deployment
  reactStrictMode: true,
  images: {
    domains: ['your-domain.com'], // Add your image domains here if needed
  },
  // Remove static export configs that cause issues with Vercel
  // distDir: 'out',
  // trailingSlash: true,
  // swcMinify: true, // Removed - not needed in Next.js 15+
};

export default nextConfig;
