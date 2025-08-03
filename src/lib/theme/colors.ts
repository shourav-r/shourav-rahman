// Centralized theme configuration
export const themeColors = {
  // Primary brand colors
  primary: {
    light: '#E6D5B8', // Warm beige
    dark: '#C4A484',  // Darker beige
  },
  
  // Secondary colors
  secondary: {
    light: '#F5EEE6', // Light cream
    dark: '#E6D5B8',  // Warm beige
  },
  
  // Text colors
  text: {
    primary: {
      light: '#4A3728', // Dark brown
      dark: '#F5EEE6',  // Light cream
    },
    secondary: {
      light: '#6B4F4F', // Medium brown
      dark: '#C4A484',  // Light brown
    },
    muted: {
      light: '#8B7355', // Muted brown
      dark: '#A08B73',  // Muted light brown
    }
  },
  
  // Gallery category buttons
  categoryButton: {
    active: {
      light: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border border-blue-600',
      dark: 'bg-white text-blue-600 shadow-lg border border-white'
    },
    inactive: {
      light: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm',
      dark: 'bg-zinc-800 border border-zinc-600 text-zinc-200 hover:bg-zinc-700 hover:border-zinc-500 shadow-sm'
    }
  },
  
  // Navigation
  nav: {
    background: 'bg-background/30 backdrop-blur-lg',
    border: {
      light: 'border-zinc-900',
      dark: 'border-zinc-100'
    }
  },
  
  // Social icons
  social: {
    instagram: 'from-pink-500 via-purple-500 to-blue-500',
    linkedin: 'from-blue-600 to-blue-400',
    youtube: 'from-red-600 to-red-400'
  }
}

// Helper function to get theme-aware classes
export const getThemeClasses = (lightClass: string, darkClass: string) => {
  return `${lightClass} dark:${darkClass}`
}

// Category button theme classes
export const getCategoryButtonClasses = (isActive: boolean) => {
  if (isActive) {
    return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border border-blue-600 dark:bg-white dark:text-blue-600 dark:shadow-lg dark:border-white'
  }
  return 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:border-zinc-500 dark:shadow-sm'
}
