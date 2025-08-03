'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

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
      <div className="relative w-full overflow-hidden py-8">
        <div className="flex gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="min-w-[200px] h-[300px] bg-secondary/50 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    )
  }

  // If no items are found after loading
  if (!isLoading && categoryItems.length === 0) {
    return (
      <div className="w-full py-8 text-center text-muted-foreground">
        No categories found.
      </div>
    )
  }

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
          className="flex gap-4 px-4"
          style={{
            x: isDragging ? undefined : 0,
            transition: isDragging ? 'none' : 'transform 0.5s ease-out'
          }}
        >
          {categoryItems.map((category) => (
            <motion.div
              key={category.id}
              className="min-w-[200px] sm:min-w-[250px] relative group flex-shrink-0"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href={`/gallery?category=${encodeURIComponent(category.name)}`}
                className="block relative aspect-[3/4] w-full overflow-hidden rounded-xl cursor-pointer border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 200px, 250px"
                      onError={(e) => {
                        console.error('Error loading image:', category.imageUrl);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/50">
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold capitalize">{category.name}</h3>
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
