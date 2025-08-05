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
            {/* Social media links in header */}
            <div className="flex items-center gap-2">
              {socialLinks
                .filter(social => 
                  social.name === 'Instagram' || 
                  social.name === 'Dribbble' || 
                  social.name === 'Behance'
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 z-50 bg-background/95 backdrop-blur-sm p-4 border-b shadow-lg md:hidden"
            >
              <div className="flex flex-col space-y-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-2 text-lg font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground/70'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <p className="px-4 pb-2 text-sm font-medium text-foreground/70">Follow me</p>
                  <div className="flex space-x-4 px-4">
                    {socialLinks
                      .filter(social => 
                        social.name === 'Instagram' || 
                        social.name === 'Dribbble' || 
                        social.name === 'Behance'
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
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}