'use client'

import Link from 'next/link'
import { Instagram, Youtube, Linkedin, X, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationLinks, socialLinks } from '@/lib/config/links'
import { Button } from '@/components/ui/button'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()



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
                      ? 'border-b-2 text-foreground border-zinc-100' 
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
                        ? 'border-b-2 text-foreground border-zinc-100' 
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
                

              </div>
            </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}