import type { Metadata } from 'next'
import { ManagerTeaser } from '@/components/manager/ManagerTeaser'

export const metadata: Metadata = {
  title: 'OloSoma Manager',
  description:
    'Your AI-guided creative studio manager. One platform, 15 specialists, zero admin. Join the wishlist for the OloSoma Manager private beta.',
  alternates: { canonical: '/manager' },
  openGraph: {
    type: 'website',
    url: 'https://olosoma.com/manager',
    title: 'OloSoma Manager — Run your studio with Olo',
    description:
      'Your AI-guided creative studio manager. One platform, 15 specialists, zero admin. Join the private-beta wishlist.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'OloSoma Manager' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OloSoma Manager — Run your studio with Olo',
    description: 'AI-guided creative studio manager. One platform, 15 specialists, zero admin.',
    images: ['/og-image.png'],
  },
}

export default function ManagerPage() {
  return <ManagerTeaser />
}
