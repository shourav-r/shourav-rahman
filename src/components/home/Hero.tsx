'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { GlassBackground } from '../ui/GlassBackground'

const TypewriterText = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return <span className="text-foreground">{displayText}</span>
}

export default function Hero() {
  const router = useRouter()

  const scrollToGallery = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Navigate to the gallery page first
    router.push('/gallery')
    
    // Then scroll to the gallery section after a small delay to allow page load
    setTimeout(() => {
      const gallerySection = document.getElementById('gallery-section')
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100) // Small delay to ensure the page has started loading
  }
  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80" />
      
      {/* Full viewport glass effect */}
      <GlassBackground className="fixed inset-0 -z-10">
        <></>
      </GlassBackground>
      
      {/* Content container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl text-center space-y-8 bg-background/30 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6 w-full">
              <div className="w-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 leading-tight mx-auto">
                  <TypewriterText text="Shourav Rahman" />
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-lg sm:text-xl md:text-2xl font-normal space-y-4 w-full"
              >
                <p className="text-foreground/90 w-full">What if art could do more than just exist?</p>
                <p className="text-foreground/80 w-full">I create visuals designed to act, persuade, and endure.</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
          >
            <Button asChild size="lg" className="px-8 py-6 text-base sm:text-lg">
              <Link href="/gallery" onClick={scrollToGallery}>Explore My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base sm:text-lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-muted-foreground/50"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}