'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong!</h2>
          <p className="text-muted-foreground mb-6">We apologize for the inconvenience. Please try refreshing the page.</p>
          <Button
            onClick={() => window.location.reload()}
            className="button-primary"
          >
            Refresh Page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
