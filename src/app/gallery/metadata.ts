import { Metadata } from 'next';

// Set the base URL for metadata (should match the one in layout.tsx)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-production-url.com';

export const metadata: Metadata = {
  title: 'Gallery | Shourav\'s Portfolio',
  description: 'Explore my creative work and projects in the gallery.',
  openGraph: {
    title: 'Gallery | Shourav\'s Portfolio',
    description: 'Explore my creative work and projects in the gallery.',
    url: `${baseUrl}/gallery`,
    images: [
      {
        url: '/og-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Gallery | Shourav\'s Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Shourav\'s Portfolio',
    description: 'Explore my creative work and projects in the gallery.',
    images: ['/og-gallery.jpg'],
  },
  alternates: {
    canonical: `${baseUrl}/gallery`,
  },
};

// This ensures the metadata is properly exported
export default metadata;
