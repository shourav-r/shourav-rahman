'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { GalleryItem } from './AlternatingGallery';

interface ImagePopupProps {
  item: GalleryItem | null;
  onClose: () => void;
  galleryItems: GalleryItem[];
  setSelectedImage: (item: GalleryItem) => void;
  currentIndex: number;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ 
  item, 
  onClose, 
  galleryItems, 
  setSelectedImage,
  currentIndex 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [direction, setDirection] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);
  const touchTime = useRef(0);

  // Optimized touch handling for smoother performance
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchTime.current = performance.now(); // Use performance.now() for better accuracy
      setTouchStart(e.touches[0].clientX);
      setTouchEnd(e.touches[0].clientX);
    }
  };

  const scrollToThumbnail = (index: number) => {
    const container = document.querySelector('.thumbnail-container') as HTMLElement | null;
    const thumb = document.querySelector(`.thumbnail-${index}`) as HTMLElement | null;
    if (container && thumb) {
      const containerRect = container.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const scrollLeft = thumb.offsetLeft - (containerRect.width / 2) + (thumbRect.width / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      // Only update state if touch position changed significantly
      if (Math.abs(touch.clientX - touchEnd) > 2) {
        setTouchEnd(touch.clientX);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const diff = touchEnd - touchStart; // Inverted the calculation for more intuitive swipe
    const absDiff = Math.abs(diff);
    const swipeThreshold = 50; // Increased threshold for better intentional swipes
    const velocityThreshold = 0.3; // Slightly increased for better control
    const timeDiff = performance.now() - touchTime.current;
    const velocity = absDiff / Math.max(timeDiff, 1);
    
    const resetTouch = () => {
      setTouchStart(0);
      setTouchEnd(0);
    };
    
    // Only trigger swipe if the movement is significant enough
    if (absDiff < swipeThreshold && velocity < velocityThreshold) {
      resetTouch();
      return;
    }
    
    // Left-to-right swipe (previous image)
    if (diff > 0 && currentIndex > 0) {
      const prevItem = galleryItems[currentIndex - 1];
      if (prevItem) {
        setDirection(-1);
        setSelectedImage(prevItem);
      }
    } 
    // Right-to-left swipe (next image)
    else if (diff < 0 && currentIndex < galleryItems.length - 1) {
      const nextItem = galleryItems[currentIndex + 1];
      if (nextItem) {
        setDirection(1);
        setSelectedImage(nextItem);
      }
    }
    
    resetTouch();
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      
      if (e.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
        e.preventDefault();
        const nextItem = galleryItems[currentIndex + 1];
        if (nextItem) {
          requestAnimationFrame(() => {
            setSelectedImage(nextItem);
          });
        }
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        const prevItem = galleryItems[currentIndex - 1];
        if (prevItem) {
          requestAnimationFrame(() => {
            setSelectedImage(prevItem);
          });
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, currentIndex, galleryItems, onClose, setSelectedImage]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Disable body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!item) return null;

  // Ultra-optimized animation variants for maximum performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1] // Snappier ease curve
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '50px' : '-50px', // Reduced distance for faster animation
      opacity: 0,
      scale: 0.99
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'tween', // Using tween for more consistent performance
        duration: 0.2, // Faster animation
        ease: 'easeOut'
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-50px' : '50px', // Reduced distance for faster animation
      opacity: 0,
      scale: 0.99,
      transition: {
        duration: 0.15, // Faster exit
        ease: 'easeIn'
      }
    })
  };

  // Optimized transition for navigation buttons
  const buttonTransition = {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut'
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
        onClick={onClose}
      >
        <motion.div
          ref={popupRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            x: touchEnd - touchStart,
            transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <motion.div
            key={item.id}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex items-center justify-center"
          >
            <Image
              src={transformImageUrl(item.image_url)}
              alt={item.title || 'Gallery image'}
              width={1600}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain select-none"
              draggable={false}
              priority
              onLoadingComplete={() => setIsLoading(false)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </motion.div>
          
          {/* Navigation Arrows - Hidden on mobile */}
          <div className="hidden md:block">
            {currentIndex > 0 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  const prevItem = galleryItems[currentIndex - 1];
                  if (prevItem) {
                    setDirection(-1);
                    setSelectedImage(prevItem);
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={buttonTransition}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}
            
            {currentIndex < galleryItems.length - 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  const nextItem = galleryItems[currentIndex + 1];
                  if (nextItem) {
                    setDirection(1);
                    setSelectedImage(nextItem);
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={buttonTransition}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
          </div>
          {/* Single close button that's always visible */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={buttonTransition}
            className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            aria-label="Close"
            style={{
              // Make it more visible on mobile
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
          
          {/* Pagination */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {galleryItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(index > currentIndex ? 1 : -1);
                  setSelectedImage(galleryItems[index]);
                }}
                className={`h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                initial={{ width: index === currentIndex ? 24 : 8 }}
                animate={{ width: index === currentIndex ? 24 : 8 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/10 border-t-white/30 rounded-full animate-spin"></div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImagePopup;

// Helper function to transform image URLs
function transformImageUrl(url: string): string {
  if (!url) return '';
  // Remove any existing query parameters
  const cleanUrl = url.split('?')[0];
  // Add width and quality parameters
  return `${cleanUrl}?width=1600&quality=80`;
}
