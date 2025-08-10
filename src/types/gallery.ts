export type ArtworkCategory = 
  | '3D'
  | 'Product Design'
  | 'Drawing & Painting'
  | 'Illustration'
  | 'Character Design'
  | 'Branding'
  | 'Conceptual'

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