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
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              About Me
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A journey through art, creativity, and continuous learning
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            {/* Image Section */}
            <motion.div 
              className="relative h-[400px] w-[400px] mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-primary/30"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10 rounded-full" />
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center">
                <div className="text-6xl font-bold text-primary/60">
                  SR
                </div>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold mb-4 text-gradient">
                My Artistic Journey
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                From an early age, I was drawn to the world of visual arts. What started as simple sketches in school notebooks evolved into a passionate pursuit of various art forms.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through years of dedicated practice and formal education, I&apos;ve developed expertise in multiple artistic disciplines, from traditional painting to digital design.
              </p>
            </motion.div>
          </div>

          {/* Skills & Education */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Education Timeline */}
            <motion.div 
              className="space-y-8"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gradient">
                Education & Training
              </h3>
              
              <div className="space-y-4">
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
                  'Oil Painting',
                  'Digital Illustration',
                  'Watercolor',
                  'Character Design',
                  'Mixed Media',
                  'Motion Graphics',
                  'Concept Art',
                  'Video Editing'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="bg-secondary p-3 rounded-md hover:bg-primary/10 transition-colors border border-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="font-medium">{skill}</p>
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
              My work explores the intersection of traditional and digital art forms, seeking to bridge the gap between classical techniques and modern technology. Through my diverse artistic practice, I aim to create pieces that not only captivate visually but also tell compelling stories and evoke emotional responses.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}