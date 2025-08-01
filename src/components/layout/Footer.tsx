'use client'

import Link from 'next/link'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background/60 backdrop-blur-lg border-border/40 text-center py-6">
      <div className="px-4">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 hover:text-primary transition-colors" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 hover:text-primary transition-colors" />
          </Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Youtube className="w-6 h-6 hover:text-primary transition-colors" />
          </Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Shourav Rahman. All rights reserved.</p>
      </div>
    </footer>
  )
}