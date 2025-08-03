'use client'

import { useEffect } from 'react'
import AppProviders from '@/components/providers/AppProviders'
import SolidBackground from '@/components/SplineBackground'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add any client-side initialization here
  useEffect(() => {
    // Initialize any client-side code if needed
  }, [])

  return (
    <AppProviders>
      <SolidBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <Toaster />
    </AppProviders>
  )
}
