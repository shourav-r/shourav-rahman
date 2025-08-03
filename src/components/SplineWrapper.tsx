'use client'

import { useEffect, useState } from 'react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

// Define the Spline props interface based on what we know about the component
interface SplineProps {
  scene: string
  onLoad?: (app: unknown) => void
  style?: React.CSSProperties
}

interface SplineWrapperProps {
  scene: string
  onLoad?: (app: unknown) => void
  style?: React.CSSProperties
}

export default function SplineWrapper({ scene, onLoad, style }: SplineWrapperProps) {
  const [SplineComponent, setSplineComponent] = useState<
    ForwardRefExoticComponent<SplineProps & RefAttributes<HTMLDivElement>> | null
  >(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadSpline = async () => {
      try {
        // Dynamic import with error handling
        // const splineModule = await import('@splinetool/react-spline')
        if (isMounted) {
          // Directly assign the component, don't wrap in a function
          // setSplineComponent(splineModule.default || splineModule)
          setLoadError(true) // Since we're not using Spline anymore
        }
      } catch (error) {
        console.warn('Failed to load Spline:', error)
        if (isMounted) {
          setLoadError(true)
        }
      }
    }

    loadSpline()

    return () => {
      isMounted = false
    }
  }, [])

  if (loadError || !SplineComponent) {
    return (
      <div 
        className="w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        style={style}
      />
    )
  }

  return (
    <SplineComponent
      scene={scene}
      onLoad={onLoad}
      style={style}
    />
  )
}
