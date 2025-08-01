'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Instagram, Youtube, Linkedin, X, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-2">
      <nav className="container mx-auto rounded-2xl bg-background/30 backdrop-blur-lg p-4">
        <div className="flex justify-between items-center">
          {/* Left side - Logo */}
          <div className="w-32"> {/* Add fixed width to balance the right side */}
            <Link href="/" className="text-2xl font-bold">SR</Link>
          </div>

          {/* Center - Navigation Menu */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link 
                href="/" 
                className={`relative transition-colors pb-2 font-bold ${
                  pathname === '/' 
                    ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`relative transition-colors pb-2 font-bold ${
                  pathname === '/about' 
                    ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/gallery" 
                className={`relative transition-colors pb-2 font-bold ${
                  pathname === '/gallery' 
                    ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`relative transition-colors pb-2 font-bold ${
                  pathname === '/contact' 
                    ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right side - Theme toggle and mobile menu */}
          <div className="flex items-center space-x-4 w-32 justify-end"> {/* Add fixed width to balance the left side */}
            {/* Social Icons */}
            <div className="hidden md:flex items-center space-x-4 relative">
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative p-2 rounded-full group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <Instagram size={20} className="group-hover:text-white transition-colors" />
                </div>
              </Link>
              <Link 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative p-2 rounded-full group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: 1
                  }}
                >
                  <Youtube size={24} className="group-hover:text-white transition-colors" />
                </motion.div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="relative rounded-full group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div 
                  className="relative z-10"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: 2
                  }}
                >
                  {mounted && (theme === 'dark' ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="40" 
                      height="40" 
                      viewBox="0 0 24 24" 
                      className="group-hover:text-white transition-colors"
                      style={{ transform: 'rotate(90deg)' }}
                    >
                      <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" 
                      fill="currentColor"
                    />
                    </svg>
                  ) : (
                    <Moon size={40} className="group-hover:text-white transition-colors" />
                  ))}
                </motion.div>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-6">
              <li>
                <Link 
                  href="/" 
                  className={`relative transition-colors pb-2 font-bold ${
                    pathname === '/' 
                      ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`relative transition-colors pb-2 font-bold ${
                    pathname === '/about' 
                      ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/gallery" 
                  className={`relative transition-colors pb-2 font-bold ${
                    pathname === '/gallery' 
                      ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`relative transition-colors pb-2 font-bold ${
                    pathname === '/contact' 
                      ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Contact
                </Link>
              </li>
              <div className="flex space-x-4 pt-4">
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram size={24} className="hover:text-primary transition-colors" />
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} className="hover:text-primary transition-colors" />
                </Link>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube size={24} className="hover:text-primary transition-colors" />
                </Link>
              </div>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}