'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

// Preload images function
const preloadImages = (urls: string[]) => {
  urls.forEach(url => {
    if (!url) return;
    const img = new window.Image();
    img.src = transformImageUrl(url);
  });
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (item?.image_url) {
      const img = new (window as Window & { Image: { new (): HTMLImageElement } }).Image();
      img.src = transformImageUrl(item.image_url);
      img.onload = () => {
        setImageSrc(img.src);
        setIsLoading(false);
      };
      img.onerror = () => {
        console.error('Error loading image in popup:', item.image_url);
        setIsLoading(false);
      };
    }
  }, [item]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden"
        >
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div className="animate-pulse">
                <div className="h-64 w-64 rounded-full bg-gray-700"></div>
              </div>
            </div>
          ) : (
            <Image
              src={imageSrc || transformImageUrl(item.image_url)}
              alt={item.title || 'Gallery image'}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/70 rounded-full p-2 hover:bg-black transition-colors z-10"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {item.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="text-lg font-medium">{item.title}</h3>
              {item.category && (
                <p className="text-sm text-gray-300 capitalize">{item.category}</p>
              )}
            </div>
          )}
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

      <ImagePopup
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}
