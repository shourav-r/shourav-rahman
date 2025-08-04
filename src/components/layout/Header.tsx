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
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm3.6 3.6c-1.17-.27-2.4-.4-3.6-.4-1.2 0-2.43.13-3.6.4 1.44 1.29 2.37 3.1 2.8 5.1 1.12-.2 2.2-.7 3.1-1.5.9-.8 1.6-1.8 1.9-3zM12 4.8c1.2 0 2.4.13 3.6.4-.6 1.2-1.5 2.2-2.6 2.9-1.1.7-2.4 1.1-3.8 1.2.2-1.7.8-3.3 1.8-4.6.5-.2 1-.3 1.6-.4.2 0 .4-.1.6-.1zM8.4 5.1c1 .9 1.7 2.1 2 3.4-2.3.2-4.5.1-6.5-.6.7-2.4 2.2-4.3 4.2-5.4.6 1.1.9 2.3 1 3.6h.1c.4 0 .8.1 1.2.2v-.2zM4.2 12c0 .9.2 1.8.5 2.6 2.1.8 4.4 1 6.5.6-.2 1.3-.6 2.5-1.2 3.6-2.5-1.1-4.4-3.2-5.2-5.8-.3-1.1-.4-2.2-.4-3.3 0-.5 0-1 .1-1.5-2.1 1.3-3.4 3.5-3.4 6zM8 18.4c.8 1.1 1.8 2.1 3 2.8-1.1.4-2.3.6-3.5.6-1.2 0-2.4-.2-3.5-.6 1.3-1.6 2.2-3.5 2.5-5.5.1 0 .2.1.3.1 1.1.4 2.2.9 3.2 1.6v.3c0 1.3-.2 2.6-.8 3.9l.8.6zM12 21.2c1.2 0 2.4-.2 3.5-.6-1.2-.8-2.2-1.8-3-3-.5-1.3-.7-2.6-.8-3.9 0 0 0-.3.1-.4.9-.6 1.9-1.1 2.9-1.5.1 0 .2-.1.3-.1.4 2.1 1.3 4 2.7 5.5-2.2 1.1-4.7 1.7-7.3 1.7-.2 0-.4 0-.6-.1 1.3-.9 2.4-2 3.2-3.3.5 1.3.8 2.6.8 4 0 .2 0 .4-.1.6zM18.7 14c-.3-1.3-1.1-2.4-2.1-3.2 1.1-.6 2.3-1 3.5-1.2.6 1.1.9 2.3.9 3.6 0 1.1-.2 2.2-.5 3.2-1.9-1.8-1.9-4.6-1.8-2.4z"/>
        </svg>
      )
      DribbbleIcon.displayName = 'DribbbleIcon';
      return DribbbleIcon;
    }
    case 'Behance': {
      const BehanceIcon = ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 12.5h-3v-1h3v1zm.5-3.5h-3.5v-1h3.5v1zm9.5-6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 11H9v2H6.5v-2h-2v-5h2v-2H9v-2h3v9zm7-7h-3v1h3v1h-2v1h2v1h-3v1h3v1h-3v1h3v1h-3v1h3c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2z"/>
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
            {/* Social Icons - Only Instagram, Dribbble, and Behance */}
            <div className="hidden md:flex items-center space-x-2">
              {socialLinks
                .filter(social => 
                  social.name === 'Instagram' || 
                  social.name === 'Dribbble' || 
                  social.name === 'Behance'
                )
                .map((social) => {
                  const IconComponent = getIconComponent(social.icon)
                  if (!IconComponent) return null
                  
                  return (
                    <Link 
                      key={social.name}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-foreground/5 rounded-full transition-colors"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5 text-foreground/80 hover:text-foreground transition-colors" />
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
              <div className="pt-4">
                {/* Mobile Social Icons */}
                <div className="flex justify-center space-x-6 pt-2">
                  {socialLinks
                    .filter(social => 
                      social.name === 'Instagram' || 
                      social.name === 'Dribbble' || 
                      social.name === 'Behance'
                    )
                    .map((social) => {
                      const IconComponent = getIconComponent(social.icon)
                      if (!IconComponent) return null
                    
                    return (
                      <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                        onClick={handleMenuItemClick}
                        aria-label={social.name}
                      >
                        <IconComponent className="w-6 h-6 text-foreground/80" />
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