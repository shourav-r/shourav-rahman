'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import ImagePopup from './ImagePopup'

// Preload images function
const preloadImages = (urls: string[]) => {
  urls.forEach(url => {
    if (!url) return;
    const img = new window.Image();
    img.src = transformImageUrl(url);
  });
};

export interface GalleryItem {
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

export default function AlternatingGallery() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  const galleryRef = useRef<HTMLDivElement>(null)

  // Preload all images in the background when component mounts
  useEffect(() => {
    if (galleryItems.length === 0) return;
    
    // Preload all images in the background
    galleryItems.forEach(item => {
      if (item?.image_url) {
        const img = new (window as Window & { Image: { new (): HTMLImageElement } }).Image();
        img.src = transformImageUrl(item.image_url);
      }
    });
    
    // Also preload the first 3 images immediately
    const firstThree = galleryItems.slice(0, 3).map(item => item.image_url);
    preloadImages(firstThree);
  }, [galleryItems]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data: items, error } = await supabase
          .from('gallery_items')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching gallery items:', error);
          setGalleryItems([]);
          return;
        }
        
        // Ensure category is always a string
        const processedItems = items?.map(item => ({
          ...item,
          category: item.category || 'Uncategorized'
        })) || [];
        
        // Preload first 3 images
        const firstThreeImages = processedItems.slice(0, 3).map(item => item.image_url);
        preloadImages(firstThreeImages);
        
        setGalleryItems(processedItems);
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
          {filteredItems.map((item) => {
            const imageUrl = transformImageUrl(item.image_url);
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden rounded-xl"
                >
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlZGVkZWQiLz48L3N2Zz4="
                    loading="eager"
                    priority={true}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0.5';
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImagePopup
            item={selectedImage}
            onClose={() => setSelectedImage(null)}
            galleryItems={filteredItems}
            setSelectedImage={setSelectedImage}
            currentIndex={filteredItems.findIndex(item => item.id === selectedImage.id)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
