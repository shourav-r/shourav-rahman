'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Animation variants are now defined inline where they are used

export default function AboutPage() {
  return (
    <div>
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
              About Me
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              A journey through art, creativity, and continuous learning
            </p>
          </motion.div>

          {/* Rest of the component */}
          </div>
        </section>
      </div>
  )
}