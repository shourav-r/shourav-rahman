import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolidBackground from '@/components/SplineBackground'
import ErrorBoundary from '@/components/ErrorBoundary'
import ThemeInitializer from '@/components/theme/ThemeInitializer'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Shourav's Portfolio",
  description: 'Professional portfolio showcasing my work and skills.',
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
    title: "Shourav's Portfolio",
    description: 'Professional portfolio showcasing my work, skills, and experience.',
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
    title: "Shourav's Portfolio",
    description: 'Professional portfolio showcasing my work and creative projects.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Shourav's Portfolio",
      }
    ],
    creator: '@yourtwitterhandle',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --background: 0 0% 3.9%;
            --foreground: 0 0% 98%;
            --card: 0 0% 3.9%;
            --card-foreground: 0 0% 98%;
            --popover: 0 0% 3.9%;
            --popover-foreground: 0 0% 98%;
            --primary: 0 0% 98%;
            --primary-foreground: 0 0% 9%;
            --secondary: 0 0% 14.9%;
            --secondary-foreground: 0 0% 98%;
            --muted: 0 0% 14.9%;
            --muted-foreground: 0 0% 63.9%;
            --accent: 0 0% 14.9%;
            --accent-foreground: 0 0% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 0 0% 98%;
            --border: 0 0% 14.9%;
            --input: 0 0% 14.9%;
            --ring: 0 0% 83.1%;
          }
          html, body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
          }
          @media (prefers-color-scheme: dark) {
            :root {
              color-scheme: dark;
            }
          }
        `}</style>
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeInitializer />
        <ErrorBoundary>
          <SolidBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}