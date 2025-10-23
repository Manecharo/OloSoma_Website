'use client'

/**
 * PrintIcons - Subtle decorative icons inspired by print design
 *
 * Abstract geometric shapes that add visual interest without overwhelming
 */

interface PrintIconProps {
  variant?: 'asterisk' | 'plus' | 'circle' | 'square' | 'triangle' | 'cross'
  size?: number
  color?: string
  opacity?: number
  rotation?: number
}

export function PrintIcon({
  variant = 'asterisk',
  size = 20,
  color = 'rgba(98, 191, 164, 0.3)',
  opacity = 0.3,
  rotation = 0
}: PrintIconProps) {
  const renderIcon = () => {
    switch (variant) {
      case 'asterisk':
        return (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2L10 18M3.5 6L16.5 14M16.5 6L3.5 14"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={opacity}
            />
          </svg>
        )
      case 'plus':
        return (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4L10 16M4 10L16 10"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={opacity}
            />
          </svg>
        )
      case 'circle':
        return (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" opacity={opacity} />
          </svg>
        )
      case 'square':
        return (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect x="4" y="4" width="12" height="12" stroke={color} strokeWidth="1.5" opacity={opacity} />
          </svg>
        )
      case 'triangle':
        return (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path d="M10 4L16 16L4 16Z" stroke={color} strokeWidth="1.5" opacity={opacity} />
          </svg>
        )
      case 'cross':
        return (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={opacity} />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
        display: 'inline-block',
        lineHeight: 0
      }}
    >
      {renderIcon()}
    </div>
  )
}

/**
 * RandomPrintDecoration - Scattered print-inspired decorations
 */
export function RandomPrintDecoration({ count = 8 }: { count?: number }) {
  const variants: Array<'asterisk' | 'plus' | 'circle' | 'square' | 'triangle' | 'cross'> = [
    'asterisk',
    'plus',
    'circle',
    'square',
    'triangle',
    'cross'
  ]

  // Generate stable random positions (won't change on re-render)
  const decorations = Array.from({ length: count }, (_, i) => {
    const seed = i * 17 // Stable seed
    return {
      variant: variants[seed % variants.length],
      left: `${(seed * 7) % 90 + 5}%`,
      top: `${(seed * 11) % 90 + 5}%`,
      size: 15 + (seed % 20),
      rotation: (seed * 23) % 360,
      opacity: 0.15 + (seed % 3) * 0.1,
      color: seed % 2 === 0 ? 'rgba(98, 191, 164, 0.3)' : 'rgba(100, 177, 242, 0.3)'
    }
  })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {decorations.map((decoration, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: decoration.left,
            top: decoration.top
          }}
        >
          <PrintIcon
            variant={decoration.variant}
            size={decoration.size}
            rotation={decoration.rotation}
            opacity={decoration.opacity}
            color={decoration.color}
          />
        </div>
      ))}
    </div>
  )
}
