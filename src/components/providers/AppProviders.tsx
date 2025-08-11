'use client'

import { ReactNode, useEffect } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'

type AppProvidersProps = {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  // Ensure dark theme is always applied
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    document.documentElement.style.colorScheme = 'dark';
  }, [])

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}
