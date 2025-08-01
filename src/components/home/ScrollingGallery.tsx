'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface GalleryItem {
  id: number
  title: string
  category?: string
  categories?: string[]
  image_url: string
  created_at: string
  gallery_item_categories?: Array<{ category_name: string }>
}

export default function ScrollingGallery() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        // Get all gallery items with their categories
        const { data: galleryItems, error } = await supabase
          .from('gallery_items')
          .select(`
            *,
            gallery_item_categories (
              category_name
            )
          `)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching gallery items:', error)
          return
        }

        // Process items to get latest item per category
        const categoryMap = new Map()
        
        galleryItems?.forEach((item: GalleryItem) => {
          // Get all categories for this item
          const categories = item.gallery_item_categories?.map((cat: { category_name: string }) => cat.category_name) || 
                           (item.category ? [item.category] : ['Uncategorized'])
          
          // For each category, keep track of the latest item
          categories.forEach((category: string) => {
            const existingItem = categoryMap.get(category)
            if (!existingItem || 
                new Date(item.created_at) > new Date(existingItem.created_at)) {
              categoryMap.set(category, {
                ...item,
                // Store all categories for this item
                categories: categories
              })
            }
          })
        })

        // Convert map values to array
        const latestItems = Array.from(categoryMap.values())
        setGalleryItems(latestItems)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [galleryItems])

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    if (carousel.current) {
      const xOffset = info.offset.x
      const threshold = carousel.current.offsetWidth / 3

      if (Math.abs(xOffset) > threshold) {
        if (xOffset > 0) {
          carousel.current.scrollLeft = width
        } else {
          carousel.current.scrollLeft = 0
        }
      }
    }
  }

  // If no items are loaded yet, show loading state
  if (isLoading) {
    return (
      <div className="relative w-full overflow-hidden py-8">
        <div className="flex gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="min-w-[300px] h-[400px] bg-secondary/50 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    )
  }

  // If no items are found after loading
  if (!isLoading && galleryItems.length === 0) {
    return (
      <div className="w-full py-8 text-center text-muted-foreground">
        No gallery items found.
      </div>
    )
  }

  // Use original gallery items without duplication
  const extendedGalleryItems = galleryItems

  return (
    <div className="relative w-full overflow-hidden py-8">
      <motion.div
        ref={carousel}
        className="cursor-grab"
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="flex gap-2 sm:gap-4"
          style={{
            x: isDragging ? undefined : 0,
            transition: isDragging ? 'none' : 'transform 0.5s ease-out'
          }}
        >
          {extendedGalleryItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="min-w-[calc(50vw-24px)] sm:min-w-[300px] relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href={`/gallery?category=${encodeURIComponent(item.categories?.[0] || item.category || '')}`}
                className="block relative aspect-square w-[calc(50vw-24px)] sm:h-[300px] sm:w-[240px] md:h-[400px] md:w-[300px] overflow-hidden rounded-xl cursor-pointer"
              >
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 240px, 300px"
                  priority={index < 3} // Only prioritize first 3 images for better LCP
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white/80 text-base md:text-lg font-medium capitalize">{item.category}</p>
                  <p className="text-white/60 text-xs md:text-sm mt-1">View Gallery →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Gradient overlays to indicate more content */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  )
}
