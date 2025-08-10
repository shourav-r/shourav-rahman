'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import SocialIcons from '@/components/ui/SocialIcons'

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
      const response = await fetch('/.netlify/functions/sendToTelegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      let result
      const contentType = response.headers.get('content-type')
      
      try {
        // Only try to parse as JSON if the response is JSON
        if (contentType && contentType.includes('application/json')) {
          result = await response.json()
        } else {
          const text = await response.text()
          console.error('Non-JSON response:', text)
          throw new Error(`Server returned ${response.status}: ${text.substring(0, 100)}...`)
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError)
        throw new Error(`Invalid response from server (${response.status}). Please try again later.`)
      }
      
      if (!response.ok) {
        console.error('Server error:', result)
        throw new Error(
          result?.details || 
          result?.error || 
          `Server responded with status ${response.status}`
        )
      }
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setErrorDetails(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 text-black">
      {/* Social Media Section */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2 
          className="text-2xl font-bold mb-6 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Connect With Me
        </motion.h2>
        
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-black/80 hover:text-primary transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              aria-label={social.name}
            >
              <SocialIcons name={social.name} className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <motion.form 
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-6 text-center text-black">Or Drop A Message</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-black/90">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-border/50 bg-background/50 text-black focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-black/50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-black/90">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-border/50 bg-background/50 text-black focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-black/50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1 text-black/90">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-border/50 bg-background/50 text-black focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-black/50"
              required
            />
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
          
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mt-4">
              <p className="font-medium">Message sent successfully!</p>
              <p className="text-sm mt-1">I'll get back to you as soon as possible.</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mt-4">
              <p className="font-medium">Failed to send message</p>
              {errorDetails && (
                <p className="text-sm mt-1 font-mono bg-red-100 p-2 rounded text-red-800 overflow-x-auto">
                  {errorDetails}
                </p>
              )}
              <p className="text-sm mt-2">Please try again or contact me directly through social media.</p>
            </div>
          )}
        </div>
      </motion.form>
    </div>
  )
}
