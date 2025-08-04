'use client'

import Link from 'next/link'
import { Instagram, Youtube, Linkedin, X, Menu, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationLinks, socialLinks } from '@/lib/config/links'
import { Button } from '@/components/ui/button'

// Helper function to get icon component by name
export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Instagram':
      return Instagram
    case 'Linkedin':
      return Linkedin
    case 'Youtube':
      return Youtube
    case 'Twitter':
      return X
    case 'Dribbble': {
      const DribbbleIcon = ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm9.8 12c0 4.31-3.49 7.8-7.8 7.8S4.2 16.31 4.2 12 7.69 4.2 12 4.2s7.8 3.49 7.8 7.8z"/>
          <path d="M12 6.6c-3.09 0-5.4 2.31-5.4 5.4s2.31 5.4 5.4 5.4 5.4-2.31 5.4-5.4-2.31-5.4-5.4-5.4zm0 9.6c-2.31 0-4.2-1.89-4.2-4.2S9.69 7.8 12 7.8s4.2 1.89 4.2 4.2-1.89 4.2-4.2 4.2z"/>
          <path d="M16.8 7.2c-.66 0-1.2.54-1.2 1.2s.54 1.2 1.2 1.2 1.2-.54 1.2-1.2-.54-1.2-1.2-1.2z"/>
        </svg>
      )
      DribbbleIcon.displayName = 'DribbbleIcon';
      return DribbbleIcon;
    }
    case 'Behance': {
      const BehanceIcon = ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7h-7v-2h7v2zm1.77 5.77a7.46 7.46 0 01-1.55 4.64 7.4 7.4 0 01-6.06 3.08H0V7h10.5c2.64 0 4.5 1.36 4.5 3.32 0 1.96-1.86 3.22-4.5 3.22 2.4 0 3.96 1.9 3.96 4.26 0 2.1-1.56 4.2-4.2 4.2H6v-8.28h10.5c1.14 0 1.98.61 2.24 1.55zM6 10.8v2.7h2.7c.9 0 1.5-.6 1.5-1.35 0-.75-.6-1.35-1.5-1.35H6zm3.6 7.2H6v-2.7h3.6c.9 0 1.5.6 1.5 1.35s-.6 1.35-1.5 1.35z"/>
        </svg>
      )
      BehanceIcon.displayName = 'BehanceIcon';
      return BehanceIcon;
    }
    case 'Facebook': {
      const FacebookIcon = ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
        </svg>
      )
      FacebookIcon.displayName = 'FacebookIcon';
      return FacebookIcon;
    }
    case 'MessageCircle':
      return MessageCircle
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