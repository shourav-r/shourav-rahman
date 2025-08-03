'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

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
    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
      
      {/* Hero content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container max-w-4xl mx-auto px-4 text-center relative z-[2] space-y-12"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <TypewriterText text="Shourav Rahman" />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-base sm:text-lg md:text-xl font-normal text-muted-foreground space-y-2"
          >
            <p className="leading-tight">What if art could do more than just exist?</p>
            <p className="leading-tight">I create visuals designed to act, persuade, and endure.</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex justify-center gap-6"
        >
          <Button asChild size="lg" className="px-8">
            <Link href="/gallery">Explore My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}