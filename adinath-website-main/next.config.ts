import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Image optimization config — add external domains here when needed
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Example: add your CDN or image host here once available
      // { protocol: 'https', hostname: 'your-cdn.com' }
    ],
  },

  // Compiler options for better production builds
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
