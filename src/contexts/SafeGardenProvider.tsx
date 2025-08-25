'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

// Dynamically import GardenProvider to avoid SSR issues
const DynamicGardenProvider = dynamic(
  () => import('./GardenContext').then(mod => ({ default: mod.GardenProvider })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }
)

interface SafeGardenProviderProps {
  children: ReactNode
}

export const SafeGardenProvider: React.FC<SafeGardenProviderProps> = ({ children }) => {
  return (
    <DynamicGardenProvider>
      {children}
    </DynamicGardenProvider>
  )
}