import Link from 'next/link'
import { NeuButton } from '@/components/ui/NeuButton'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold mb-4 text-teal-accent">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <NeuButton variant="primary">
            Return Home
          </NeuButton>
        </Link>
      </div>
    </div>
  )
}
