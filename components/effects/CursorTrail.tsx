'use client'

import { useCursorTrail } from '@/lib/hooks/useCursorTrail'

interface CursorTrailProps {
  particleCount?: number
  particleSize?: number
  particleLife?: number
  color?: string
  enabled?: boolean
}

export function CursorTrail(props: CursorTrailProps = {}) {
  useCursorTrail(props)
  return null
}
