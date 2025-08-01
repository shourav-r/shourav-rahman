'use client'

import { Suspense } from 'react'
import AlternatingGallery from '@/components/gallery/AlternatingGallery'

// This component wraps the AlternatingGallery to handle the search params
function GalleryContent() {
  return <AlternatingGallery />
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-pulse text-foreground/60">Loading gallery...</div>
        </div>
      }>
        <GalleryContent />
      </Suspense>
    </div>
  )
}
