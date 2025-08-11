'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { GlassBackground } from '../ui/GlassBackground'

interface CategoryItem {
  id: string
  name: string
  imageUrl: string
  count: number
}

export default function ScrollingGallery() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        // Get all gallery items with their categories
        const { data: galleryItems, error } = await supabase
          .from('gallery_items')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching gallery items:', error)
          return
        }

        // Get all unique categories
        const allCategories = new Set<string>();
        const categoryToLatestItem = new Map<string, string>();
        const categoryCounts = new Map<string, number>();
        
        galleryItems?.forEach((item: any) => {
          // Get all categories for this item (split by comma and trim)
          const categories = (item.category || 'Uncategorized')
            .split(',')
            .map((cat: string) => cat.trim())
            .filter(Boolean);
          
          categories.forEach((category: string) => {
            allCategories.add(category);
            // Keep track of the latest image for each category
            if (!categoryToLatestItem.has(category)) {
              categoryToLatestItem.set(category, item.image_url);
            }
            // Count items in each category
            categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
          });
        });

        // Create an array of category objects with their latest image and count
        const categoryItems = Array.from(allCategories).map(category => ({
          id: category.toLowerCase().replace(/\s+/g, '-'),
          name: category,
          imageUrl: categoryToLatestItem.get(category) || '',
          count: categoryCounts.get(category) || 0
        }));

        setCategoryItems(categoryItems);
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
  }, [categoryItems])

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
      <GlassBackground className="w-full py-12 px-4 sm:px-8">
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="min-w-[200px] h-[300px] bg-background/30 backdrop-blur-sm rounded-xl border border-border/30 animate-pulse"
            />
          ))}
        </div>
      </GlassBackground>
    )
  }

  // If no items are found after loading
  if (!isLoading && categoryItems.length === 0) {
    return (
      <GlassBackground className="w-full py-12 px-4 sm:px-8 text-center">
        <p className="text-foreground/80">No categories found.</p>
      </GlassBackground>
    )
  }

  return (
    <GlassBackground className="w-full py-12 px-4 sm:px-8">
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
          className="flex gap-6 py-2"
          style={{
            x: isDragging ? undefined : 0,
            transition: isDragging ? 'none' : 'transform 0.5s ease-out'
          }}
        >
          {categoryItems.map((category) => (
            <motion.div
              key={category.id}
              className="min-w-[220px] sm:min-w-[280px] relative group flex-shrink-0"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: [0.2, 0, 0, 1] }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              }}
              viewport={{ once: true, margin: "-20%" }}
            >
              <Link 
                href={`/gallery?category=${encodeURIComponent(category.name)}`}
                className="block relative aspect-[3/4] w-full overflow-hidden rounded-2xl cursor-pointer group"
              >
                <div className="absolute inset-0 bg-background/20 backdrop-blur-sm rounded-2xl -m-0.5 group-hover:bg-background/30 transition-all duration-300 z-0" />
                <div className="relative w-full h-full z-10">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 220px, 280px"
                      onError={(e) => {
                        console.error('Error loading image:', category.imageUrl);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center rounded-2xl">
                      <span className="text-5xl font-bold text-foreground/40">
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 rounded-2xl">
                  <div className="flex flex-col items-start">
                    <h3 className="text-white text-2xl font-bold capitalize mb-1">{category.name}</h3>
                    <span className="text-white/70 text-sm">{category.count} {category.count === 1 ? 'work' : 'works'}</span>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-foreground/60">
          <span>Scroll to explore</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </GlassBackground>
  )
}
