export type ArtworkCategory = 
  | 'Painting'
  | 'Drawing'
  | 'Mixed Media'
  | 'Illustration'
  | 'Watercolor'
  | 'Animation'
  | 'Product Design'
  | 'Video Editing'

export interface Artwork {
  id: string
  title: string
  category: ArtworkCategory
  imageUrl: string
  description: string
  year: number
  dimensions?: string
  medium?: string
} 