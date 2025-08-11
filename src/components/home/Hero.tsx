'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
  return (
    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      </div>
      
      {/* Glass container */}
      <GlassBackground className="max-w-4xl w-full mx-4 sm:mx-8">
        <div className="py-16 sm:py-24 px-6 sm:px-12 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              <TypewriterText text="Shourav Rahman" />
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg sm:text-xl md:text-2xl font-normal space-y-3"
            >
              <p className="leading-tight text-foreground/90">What if art could do more than just exist?</p>
              <p className="leading-tight text-foreground/80">I create visuals designed to act, persuade, and endure.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          >
            <Button asChild size="lg" className="px-8 py-6 text-base sm:text-lg">
              <Link href="/gallery">Explore My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base sm:text-lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </GlassBackground>
      
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