'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    // Ensure dark theme is applied
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    
    // Set initial colors to prevent flash
    document.documentElement.style.setProperty('--background', '0 0% 3.9%');
    document.documentElement.style.setProperty('--foreground', '0 0% 98%');
  }, []);

  return null;
}
