import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import ClientLayout from './client-layout'
import GlobalStyles from '@/components/ui/GlobalStyles'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Set the base URL for metadata (replace with your production URL)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-production-url.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Shourav's Portfolio",
  description: 'Professional portfolio showcasing my work and creative projects.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Shourav's Portfolio",
      }
    ],
    type: 'website',
    siteName: "Shourav's Portfolio",
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Set theme before the page renders to prevent flash
                try {
                  const theme = 'dark';
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.colorScheme = theme;
                  
                  // Set initial colors to prevent flash
                  document.documentElement.style.setProperty('--background', '0 0% 3.9%');
                  document.documentElement.style.setProperty('--foreground', '0 0% 98%');
                } catch (e) {}
              })();
            `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <GlobalStyles />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}