'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import ErrorBoundary from '@/components/ErrorBoundary'

type AppProvidersProps = {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  )
}
