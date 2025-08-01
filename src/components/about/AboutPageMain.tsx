'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-8 sm:py-12">
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

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-16 md:mb-24">
            {/* Image Section */}
            <motion.div 
              className="relative aspect-square w-[250px] sm:w-[350px] md:w-[400px] mx-auto rounded-full overflow-hidden shadow-2xl ring-2 md:ring-4 ring-primary/30 flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                width: 'min(100%, 400px)',
                height: 'auto'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10 rounded-full" />
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center relative">
                {/* Fallback content - hidden by default, shown only if image fails to load */}
                <div className="absolute inset-0 flex items-center justify-center" id="initials-fallback">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary/60">
                    SR
                  </div>
                </div>
                {/* Profile image */}
                <Image
                  src="/profile.png"
                  alt="Profile Picture"
                  width={400}
                  height={400}
                  className="object-cover object-center w-full h-full"
                  onLoad={(e) => {
                    // Hide initials when image loads successfully
                    const initials = document.getElementById('initials-fallback');
                    if (initials) initials.style.display = 'none';
                  }}
                  onError={(e) => {
                    // Show initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const initials = document.getElementById('initials-fallback');
                    if (initials) initials.style.display = 'flex';
                  }}
                  priority
                />
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div 
              className="space-y-4 sm:space-y-6 mt-8 md:mt-0 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 text-gradient">
                My Artistic Journey
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                From an early age, I was drawn to the world of visual arts. What started as simple sketches in school notebooks evolved into a passionate pursuit of various art forms.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Through years of dedicated practice and formal education, I&apos;ve developed expertise in multiple artistic disciplines, from traditional painting to digital design.
              </p>
            </motion.div>
          </div>

          {/* Skills & Education */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-16 md:mb-24"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Education Timeline */}
            <motion.div 
              className="space-y-6 sm:space-y-8"
              variants={fadeIn}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gradient">
                Education & Training
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    title: "Fine Arts Degree",
                    year: "2018 - 2022",
                    desc: "Specialized in Contemporary Art and Digital Media"
                  },
                  {
                    title: "Digital Art Certification",
                    year: "2020",
                    desc: "Advanced Digital Illustration and Animation"
                  },
                  {
                    title: "Traditional Art Workshop",
                    year: "2019",
                    desc: "Watercolor and Oil Painting Techniques"
                  }
                ].map((edu, index) => (
                  <motion.div 
                    key={edu.title}
                    className="border-l-2 border-primary pl-4 py-2 hover:bg-secondary/50 rounded-r transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h4 className="font-semibold">{edu.title}</h4>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                    <p className="mt-2">{edu.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold mb-6 text-gradient">
                Artistic Skills
              </h3>
              <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={staggerContainer}
              >
                {[
                  'Digital Art',
                  'Character Design',
                  'Illustration',
                  'Interdisciplinary',
                  'Motion Graphics',
                  'Conceptual Art',
                  'Brand Identity',
                  'Typography',
                  '3D Modeling',
                  'Interior & Exterior Design',
                  'Performance Art',
                  'Product & Packaging Design',
                  'Drawing & Painting',
                  'Video Editing'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="bg-secondary p-3 rounded-md hover:bg-primary/10 transition-colors border border-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="font-medium text-foreground">{skill}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Artist Statement */}
          <motion.div 
            className="max-w-3xl mx-auto text-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gradient">
              Artist Statement
            </h3>
            <p className="text-muted-foreground leading-relaxed">
            I believe the medium must serve the message. My work begins with a core idea, selecting the perfect tool—brush, stylus, or camera—to create clear, resonant visual forms.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}