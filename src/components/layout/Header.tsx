'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Instagram, Youtube, Linkedin, X, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationLinks, socialLinks } from '@/lib/config/links'

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Instagram':
      return Instagram
    case 'Linkedin':
      return Linkedin
    case 'Youtube':
      return Youtube
    default:
      return null
  }
}

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu when clicking on a link
  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isMenuOpen])

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
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className={`relative transition-colors pb-2 font-bold ${
                    pathname === link.href
                      ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side - Theme toggle and mobile menu */}
          <div className="flex items-center space-x-4 w-32 justify-end"> {/* Add fixed width to balance the left side */}
            {/* Social Icons */}
            <div className="hidden md:flex items-center space-x-4 relative">
              {socialLinks.map((social) => {
                const IconComponent = getIconComponent(social.icon)
                if (!IconComponent) return null
                
                return (
                  <Link 
                    key={social.name}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {social.name === 'Youtube' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 5,
                          delay: 1
                        }}
                      >
                        <IconComponent size={24} />
                      </motion.div>
                    ) : (
                      <IconComponent size={20} />
                    )}
                  </Link>
                )
              })}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="relative rounded-full group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div 
                  className="relative z-10"
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ul className="flex flex-col space-y-6">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    onClick={handleMenuItemClick}
                    className={`relative transition-colors pb-2 font-bold ${
                      pathname === link.href
                        ? 'border-b-2 text-foreground border-zinc-900 dark:border-zinc-100' 
                        : 'text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <div className="flex items-center justify-between pt-4">
                {/* Mobile Social Icons */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const IconComponent = getIconComponent(social.icon)
                    if (!IconComponent) return null
                    
                    return (
                      <Link 
                        key={social.name}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={handleMenuItemClick}
                        className="hover:text-primary transition-colors"
                      >
                        <IconComponent size={24} />
                      </Link>
                    )
                  })}
                </div>
                
                {/* Mobile Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                    setIsMenuOpen(false);
                  }}
                  className="relative group"
                  aria-label="Toggle theme"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="relative z-10"
                    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {mounted && (theme === 'dark' ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="group-hover:text-white transition-colors"
                        style={{ transform: 'rotate(90deg)' }}
                      >
                        <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" 
                        fill="currentColor"
                      />
                      </svg>
                    ) : (
                      <Moon size={24} className="group-hover:text-white transition-colors" />
                    ))}
                  </motion.div>
                </Button>
              </div>
            </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}