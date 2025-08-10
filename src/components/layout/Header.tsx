'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { navigationLinks, socialLinks } from '@/lib/config/links'
import { cn } from '@/lib/utils'
import SocialIcons from '@/components/ui/SocialIcons'
import { Button } from '@/components/ui/button'

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
          <div className="w-32">
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

          {/* Right side - Social icons (hidden on mobile) and menu button */}
          <div className="flex items-center space-x-4 w-32 justify-end">
            {/* Social media links in header - hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks
                .filter(social => 
                  social.name === 'Instagram' || 
                  social.name === 'Dribbble' || 
                  social.name === 'Behance' ||
                  social.name === 'ArtStation'
                )
                .map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-foreground/5 transition-colors group"
                    aria-label={social.name}
                  >
                    <SocialIcons name={social.name} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
                ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-foreground/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="space-y-6 py-4">
                <ul className="space-y-4">
                  {navigationLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleMenuItemClick}
                        className={`block py-2 px-4 rounded-lg transition-colors ${
                          pathname === link.href
                            ? 'bg-foreground/10 text-foreground'
                            : 'text-foreground/70 hover:bg-foreground/5'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Social Icons in Mobile Menu */}
                <div className="pt-4 border-t border-foreground/10">
                  <p className="px-4 text-sm text-foreground/60 mb-3">Connect with me</p>
                  <div className="flex items-center gap-4 px-4">
                    {socialLinks
                      .filter(social => 
                        social.name === 'Instagram' || 
                        social.name === 'Dribbble' || 
                        social.name === 'Behance' ||
                        social.name === 'ArtStation'
                      )
                      .map((social) => (
                        <Link
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-foreground/5 transition-colors group"
                          aria-label={social.name}
                          onClick={handleMenuItemClick}
                        >
                          <SocialIcons name={social.name} className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
