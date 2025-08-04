'use client'

import Link from 'next/link'
import { socialLinks } from '@/lib/config/links'
import { getIconComponent } from './Header'

export default function Footer() {
  return (
    <footer className="bg-background/60 backdrop-blur-lg border-t border-border/40 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Social Icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {socialLinks.map((social) => {
              const IconComponent = getIconComponent(social.icon)
              if (!IconComponent) return null
              
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full hover:bg-foreground/5 transition-colors group`}
                  aria-label={social.name}
                >
                  <IconComponent 
                    className={`w-6 h-6 group-hover:scale-110 transition-transform`}
                  />
                </Link>
              )
            })}
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-foreground/70">
            &copy; {new Date().getFullYear()} Shourav Rahman. All rights reserved.
          </p>
          
          {/* Quick Links */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/gallery" className="hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}