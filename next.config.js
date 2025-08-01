/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static HTML is generated for the gallery page
  output: 'export',
  // Disable image optimization during export since we're using next/image with remote images
  images: {
    unoptimized: true,
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