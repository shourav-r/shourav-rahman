'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

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

const containerAnimation = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const inputAnimation = {
  initial: { x: -20, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

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
    <div className="w-full">
      {/* Social Media Section */}
      <motion.div 
        className="max-w-2xl mx-auto text-center mb-8 sm:mb-12"
        variants={formAnimation}
      >
        <motion.h2 
          className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Connect With Me
        </motion.h2>
        
        <motion.div 
          className="flex justify-center gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="flex justify-center items-center gap-8">
            {/* Facebook */}
            <motion.a 
              href="#" 
              className="p-2"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={iconAnimation}
            >
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.a>

            {/* Messenger */}
            <motion.a 
              href="#" 
              className="p-2"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={iconAnimation}
            >
              <svg className="w-11 h-11 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.726 7.21V22l3.405-1.869c.909.252 1.871.388 2.869.388 5.523 0 10-4.145 10-9.259C22 6.146 17.523 2 12 2zm1.008 12.445l-2.54-2.709-4.953 2.709 5.445-5.79 2.604 2.709 4.89-2.709-5.446 5.79z"/>
              </svg>
            </motion.a>

            {/* Instagram */}
            <motion.a 
              href="#" 
              className="p-2"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={iconAnimation}
            >
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </motion.a>

            {/* WhatsApp */}
            <motion.a 
              href="#" 
              className="p-2"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={iconAnimation}
            >
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </motion.a>

            {/* Telegram */}
            <motion.a 
              href="#" 
              className="p-2"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={iconAnimation}
            >
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8 w-full"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center sm:text-left text-black"
          variants={fadeIn}
        >
          Or Drop A Message
        </motion.h1>
        
        <div className="space-y-6 text-base sm:text-lg md:text-xl">
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2"
            variants={fadeIn}
          >
            <label htmlFor="name" className="text-sm sm:text-base text-muted-foreground">My name is</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 px-2 py-1 outline-none w-full sm:min-w-[200px] text-gray-900 dark:text-white"
              placeholder="Your name"
              required
            />
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-2 items-baseline"
            variants={fadeIn}
          >
            <span className="text-sm sm:text-base text-muted-foreground">and I have a</span>
            <input
              type="text"
              id="project"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 px-2 py-1 outline-none w-full sm:min-w-[200px] text-gray-900 dark:text-white"
              placeholder="website and app design"
              required
            />
            <span className="text-sm sm:text-base text-muted-foreground">that needs help.</span>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2"
            variants={fadeIn}
          >
            <label htmlFor="email" className="text-sm sm:text-base text-muted-foreground">You can reach me at</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 px-2 py-1 outline-none w-full sm:min-w-[250px] text-gray-900 dark:text-white"
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
            className="w-full sm:w-auto text-sm md:text-base uppercase tracking-wider py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto sm:mx-0"
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
    </div>
  )
}