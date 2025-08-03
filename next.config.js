/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  // Configure images for Next.js Image component
  images: {
    // Enable image optimization in production
    unoptimized: process.env.NODE_ENV === 'production',
    // Configure domains for external images
    domains: [
      'i.ibb.co',
      'i.ibb.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'www.pictoclub.com',
      'img.freepik.com',
      'static.vecteezy.com',
      'imgs.search.brave.com',
      'fcsccdavaidltzupeotu.supabase.co'
    ],
    // Disable image optimization for Netlify (handled by Netlify's image optimization)
    loader: 'default',
    // Set minimum cache TTL
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pictoclub.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },
      {
        protocol: 'https',
        hostname: 'fcsccdavaidltzupeotu.supabase.co',
      }
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig