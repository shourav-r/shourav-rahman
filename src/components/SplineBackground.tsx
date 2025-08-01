'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function SolidBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`fixed inset-0 -z-10 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
          : 'bg-gradient-to-br from-slate-50 via-white to-gray-100'
      }`}
    >
      {/* Optional: Add subtle texture overlay */}
      <div 
        className={`absolute inset-0 opacity-30 ${
          theme === 'dark' ? 'opacity-20' : 'opacity-30'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${
            theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
          } 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
    </motion.div>
  )
}