'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    // Ensure dark theme is applied
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.style.colorScheme = 'dark';
    
    // Set initial colors to prevent flash
    if (!document.documentElement.hasAttribute('data-theme-initialized')) {
      document.documentElement.style.setProperty('--background', '0 0% 3.9%');
      document.documentElement.style.setProperty('--foreground', '0 0% 98%');
      document.documentElement.setAttribute('data-theme-initialized', 'true');
    }

    // Force update theme in case of hydration mismatch
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const html = document.documentElement;
          if (!html.classList.contains('dark')) {
            html.classList.add('dark');
            html.style.colorScheme = 'dark';
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
