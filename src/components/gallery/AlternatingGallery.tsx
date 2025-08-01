'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

interface GalleryItem {
  id: number
  title: string
  category: string
  image_url: string
}

const categories = ['All', 'Painting', 'Drawing', 'Mixed media', 'Illustration', 'Watercolor', 'Animation', '3D', 'Product design', 'Video editing']

// Function to transform image URLs to the correct format
const transformImageUrl = (url: string) => {
  // Handle i.ibb.co URLs
  if (url.includes('i.ibb.co')) {
    return url.replace('i.ibb.co.com', 'i.ibb.co')
  }
  return url
}

interface ImagePopupProps {
  item: GalleryItem | null
  onClose: () => void
}

const ImagePopup = ({ item, onClose }: ImagePopupProps) => {
  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", damping: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl aspect-[4/3] rounded-xl overflow-hidden"
        >
          <Image
            src={transformImageUrl(item.image_url)}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function AlternatingGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data: items, error } = await supabase
          .from('gallery_items')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error fetching gallery items:', error)
          setGalleryItems([])
          return
        }
        
        setGalleryItems(items || [])
      } catch (error) {
        console.error('Error fetching gallery items:', error)
        setGalleryItems([])
      }
    }

    fetchGalleryItems()
  }, [])

  const filteredItems = galleryItems.filter(item =>
    selectedCategory.toLowerCase() === 'all' ? true : item.category.toLowerCase() === selectedCategory.toLowerCase()
  )

  return (
    <>
      {/* Category Filter */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-[#E6D5B8] to-[#C4A484] text-[#4A3728] shadow-lg scale-105'
                  : 'bg-gradient-to-r from-[#F5EEE6] to-[#E6D5B8] hover:from-[#E6D5B8] hover:to-[#D4C4A8] text-[#6B4F4F] hover:scale-105 hover:shadow-md'
                } dark:${
                  selectedCategory === category
                    ? 'from-zinc-100 to-zinc-300 text-zinc-900'
                    : 'from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 text-zinc-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="w-full max-w-[2000px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-[300px] w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={transformImageUrl(item.image_url)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImagePopup
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}
