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
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://shourav.netlify.app' : 'http://localhost:3000'),
  title: 'Artist Portfolio | Creative Works & Gallery',
  description: 'Explore a curated collection of artwork including paintings, drawings, illustrations, and digital art. Experience creativity through various mediums and styles.',
  keywords: ['art', 'portfolio', 'gallery', 'paintings', 'illustrations', 'digital art'],
  authors: [{ name: 'Shourav Rahman' }],
  openGraph: {
    title: 'Artist Portfolio | Creative Works & Gallery',
    description: 'Explore a curated collection of artwork including paintings, drawings, illustrations, and digital art.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artist Portfolio | Creative Works & Gallery',
    description: 'Explore a curated collection of artwork including paintings, drawings, illustrations, and digital art.',
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