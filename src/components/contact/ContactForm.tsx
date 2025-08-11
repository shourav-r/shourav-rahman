'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassBackground } from '../ui/GlassBackground';
import SocialIcons from '@/components/ui/SocialIcons';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/baldcape/' },
  { name: 'Facebook', href: 'https://m.facebook.com/roll0001/' },
  { name: 'WhatsApp', href: 'https://wa.me/qr/D2ITBHLVB377A1' },
  { name: 'Messenger', href: 'https://m.me/roll0001' }
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorDetails(null)

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      const response = await fetch('/.netlify/functions/sendToTelegram', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      })
      
      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
          console.error('Server error details:', errorData)
        } catch (parseError) {
          const text = await response.text()
          console.error('Non-JSON error response:', text)
          errorMessage = `Error: ${text.substring(0, 200)}`
        }
        throw new Error(errorMessage)
      }

      // Parse successful response
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send message')
      }
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      
      // User-friendly error messages
      let errorMessage = 'Failed to send message. Please try again.'
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Unable to connect to the server. Please check your internet connection.'
        } else if (error.message.includes('timeout')) {
          errorMessage = 'The request timed out. Please try again.'
        } else {
          errorMessage = error.message
        }
      }
      
      setErrorDetails(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 text-foreground">
      <GlassBackground className="p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Get in Touch</h2>
            <p className="mt-2 text-muted-foreground">
              Have a project in mind or want to collaborate? Send me a message and I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/30 backdrop-blur-lg border border-border/50 hover:bg-background/50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                aria-label={social.name}
              >
                <SocialIcons name={social.name} className="w-6 h-6 text-foreground/90 hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-foreground/90">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm transition-all duration-200"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground/90">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm transition-all duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-foreground/90">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="flex w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm transition-all duration-200 min-h-[120px]"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mt-4">
                <p className="font-medium">Message sent successfully!</p>
                <p className="text-sm mt-1">I'll get back to you as soon as possible.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
                <p className="font-medium">Failed to send message</p>
                {errorDetails && (
                  <p className="text-sm mt-1 font-mono bg-red-100 p-2 rounded text-red-800 overflow-x-auto">
                    {errorDetails}
                  </p>
                )}
                <p className="text-sm mt-2">Please try again or contact me directly through social media.</p>
              </div>
            )}
          </form>
        </div>
      </GlassBackground>
    </div>
  );
}
