'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/home/Hero'
import ScrollingGallery from '@/components/home/ScrollingGallery'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Page Error:', error)
      setError(error.error)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">We apologize for the inconvenience. Please try refreshing the page.</p>
        <Button
          onClick={() => window.location.reload()}
          className="button-primary"
        >
          Refresh Page
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="py-16 bg-background">
        <ScrollingGallery />
      </div>
    </div>
  )
}