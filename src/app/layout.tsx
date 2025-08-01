import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolidBackground from '@/components/SplineBackground'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Shourav's Portfolio",
  description: 'Professional portfolio showcasing my work and skills.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: {
      rel: 'icon',
      url: '/favicon.ico',
    },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  )
}