'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { socialLinks } from '@/lib/config/links'
import SocialIcons from '@/components/ui/SocialIcons'

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

const iconAnimation = {
  initial: {
    y: 0,
    scale: 1,
    rotate: 0
  },
  animate: {
    y: [-3, 3, -3],
    scale: [1, 1.05, 1],
    rotate: [-5, 5, -5],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut"
    }
  },
  hover: {
    scale: 1.2,
    y: -8,
    rotate: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

const formAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

// Animation variants moved to where they are used directly

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // TODO: Implement form submission logic
      console.log('Form submitted:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="w-full bg-background px-4 sm:px-6 py-8 sm:py-12">
      {/* Social Media Section */}
      <motion.div 
        className="max-w-2xl mx-auto text-center mb-8 sm:mb-12"
        variants={formAnimation}
      >
        <motion.h2 
          className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Connect With Me
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {socialLinks.filter(social => ["Instagram", "Facebook", "WhatsApp", "Messenger"].includes(social.name)).map((social) => (
            <motion.div
              key={social.name}
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={iconAnimation}
            >
              <a 
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-1.5 sm:p-2"
                aria-label={social.name}
              >
                <SocialIcons 
                  name={social.name} 
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  size={28}
                />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="max-w-2xl mx-auto w-full text-foreground bg-background/95 dark:bg-background/95 rounded-2xl p-6 sm:p-8 shadow-lg border border-border/50"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center sm:text-left text-foreground"
          variants={fadeIn}
        >
          Or Drop A Message
        </motion.h1>
        
        <div className="space-y-5 sm:space-y-6 text-base sm:text-lg md:text-xl">
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2"
            variants={fadeIn}
          >
            <label htmlFor="name" className="text-sm sm:text-base text-muted-foreground">My name is</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-primary px-2 py-1.5 sm:py-1 outline-none w-full sm:min-w-[200px] text-foreground text-sm sm:text-base"
              placeholder="Your name"
              required
            />
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-1.5 sm:gap-2 items-baseline"
            variants={fadeIn}
          >
            <span className="text-sm sm:text-base text-muted-foreground">and I have a</span>
            <input
              type="text"
              id="project"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-primary px-2 py-1.5 sm:py-1 outline-none w-full sm:min-w-[200px] text-foreground text-sm sm:text-base"
              placeholder="website and app design"
              required
            />
            <span className="text-sm sm:text-base text-muted-foreground">that needs help.</span>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2"
            variants={fadeIn}
          >
            <label htmlFor="email" className="text-sm sm:text-base text-muted-foreground">You can reach me at</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-primary px-2 py-1 outline-none w-full sm:min-w-[250px] text-foreground"
              placeholder="your.email@example.com"
              required
            />
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 text-center sm:text-left"
          variants={fadeIn}
        >
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full text-sm sm:text-base uppercase tracking-wider py-3 px-6 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto sm:w-auto sm:mx-0"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </>
            )}
          </motion.button>
          <p className="mt-3 text-sm text-muted-foreground text-center sm:text-left">
            I'll get back to you within 24 hours
          </p>
        </motion.div>

      </motion.form>
      
      <style jsx global>{`
        .contact-form input,
        .contact-form textarea {
          color: inherit;
          min-height: 2.5rem;
        }
        
        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: hsl(var(--muted-foreground));
          opacity: 0.7;
        }

        @media (max-width: 640px) {
          .contact-form input,
          .contact-form textarea {
            font-size: 1rem;
          }
          
          .contact-form button {
            min-height: 3rem;
          }
        }
      `}</style>
    </div>
  )
}

