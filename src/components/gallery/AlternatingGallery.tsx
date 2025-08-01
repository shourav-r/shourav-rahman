'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

interface GalleryItem {
  id: number
  title: string
  category: string
  image_url: string
  created_at: string
}

const categories = ['All', 'Painting', 'Drawing', 'Mixed media', 'Illustration', 'Watercolor', '3D', 'Product design']

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
          <div className="relative w-full h-full">
            <Image
              src={transformImageUrl(item.image_url)}
              alt={item.title || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              onError={(e) => {
                console.error('Error loading image in popup:', item.image_url, e);
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {!item.image_url && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image not available</span>
              </div>
            )}
          </div>
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
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All')
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
        
        // Ensure category is always a string
        const processedItems = items?.map(item => ({
          ...item,
          category: item.category || 'Uncategorized'
        })) || [];
        
        console.log('Processed items:', processedItems);
        
        console.log('Setting gallery items:', processedItems);
        setGalleryItems(processedItems)
      } catch (error) {
        console.error('Error fetching gallery items:', error)
        setGalleryItems([])
      }
    }

    fetchGalleryItems()
  }, [])

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [categoryFromUrl])

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => 
        item.category
          .split(',')
          .map(cat => cat.trim())
          .some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      )

  return (
    <>
      {/* Category Filter */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-8 sm:mb-12">
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          {/* Mobile: Show fewer buttons per row, Desktop: Show all */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border border-blue-600 dark:bg-white dark:text-blue-600 dark:shadow-lg dark:border-white dark:from-white dark:to-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:border-zinc-500 dark:shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="w-full max-w-[2000px] mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
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
                className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden rounded-xl"
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
