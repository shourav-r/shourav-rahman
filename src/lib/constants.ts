export const artCategories = [
    'Painting',
    'Drawing',
    'Mixed Media',
    'Illustration',
    'Watercolor',
    'Animation',
    'Product Design',
    'Video Editing'
  ] as const
  
  export type ArtCategory = typeof artCategories[number]