'use client'

import { useEffect } from 'react'
import { NeuButton } from '@/components/ui/NeuButton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-4xl font-bold mb-4 text-teal-accent">
          Something went wrong
        </h2>
        <p className="text-gray-300 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <NeuButton
          variant="primary"
          onClick={() => reset()}
        >
          Try again
        </NeuButton>
      </div>
    </div>
  )
}
