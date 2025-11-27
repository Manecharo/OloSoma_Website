/**
 * Beam Choreography System - Directional Light Cone
 *
 * Light beam is a CONE/SPOTLIGHT shape (not circular):
 * - Sharp bright source point (no blur)
 * - Expanding cone with blurred colored edges
 * - Tips use complementary colors (purple/magenta/pink)
 * - Beam rotates to point in different directions
 *
 * Movement at each waypoint:
 * - STOP with text visible (long pause for reading)
 * - Slow start (bezier ease out)
 * - Fast travel
 * - Slow arrival (bezier ease in)
 * - STOP again
 */

export interface BeamPosition {
  x: number // Percentage (0-100) - source point position
  y: number // Percentage (0-100)
  angle: number // Degrees (0=right, 90=down, 180=left, 270=up)
  intensity: number // 0-1
  size: number // Cone length in pixels
  spread: number // Cone width angle in degrees
  blur: number // Blur at tip
  isAtWaypoint: boolean // True when stopped at waypoint
}

/**
 * Waypoint definition with text and beam direction
 */
interface Waypoint {
  position: [number, number] // [row, col] in desktop 6×6 grid
  mobilePosition: [number, number] // [row, col] in mobile 2×6 grid (2 wide, 6 high)
  text: string
  beamAngle: number // Direction beam points (degrees)
  mobileBeamAngle: number // Direction for mobile layout
  scrollRange: [number, number] // [start, end] including pause time
  beamSpread?: number // Custom beam spread angle in degrees (default: 45)
  beamSize?: number // Custom beam length multiplier (default: 1.0)
}

// Convert grid [row, col] to percentage
function gridToPercentage(row: number, col: number, isMobile: boolean = false): { x: number; y: number } {
  if (isMobile) {
    // Mobile: 2 columns × 6 rows with padding (10% top/bottom, 15% left/right)
    const cols = 2
    const rows = 6
    const paddingX = 15 // 15% padding on left/right
    const paddingY = 10 // 10% padding on top/bottom
    const usableWidth = 100 - paddingX * 2
    const usableHeight = 100 - paddingY * 2
    const cellWidth = usableWidth / cols
    const cellHeight = usableHeight / rows

    return {
      x: paddingX + col * cellWidth + cellWidth / 2,
      y: paddingY + row * cellHeight + cellHeight / 2
    }
  } else {
    // Desktop: 6×6 grid
    const cellSize = 100 / 6
    return {
      x: col * cellSize + cellSize / 2,
      y: row * cellSize + cellSize / 2
    }
  }
}

/**
 * 6 Waypoints with professional text and poetic beam directions
 * Positions adjusted to keep text within visible screen area
 */
const waypoints: Waypoint[] = [
  // Waypoint 0: Start - Bottom center
  {
    position: [4, 2.5], // Desktop: Lower center (moved up from 5 to 4)
    mobilePosition: [4, 1], // Mobile: Lower center (moved up)
    text: '',
    beamAngle: 270, // Point up
    mobileBeamAngle: 270, // Same for mobile
    scrollRange: [0, 0.14] // MUCH LONGER initial pause (14% of total scroll)
  },

  // Waypoint 1: Spatial Design - LEFT side - NARROW FOCUSED BEAM
  {
    position: [1.5, 1], // Desktop: Upper-left (moved to safe zone)
    mobilePosition: [1, 0.5], // Mobile: Upper area, left
    text: 'Spatial Design\nArchitecture that shapes experience',
    beamAngle: 130, // Rotate 130 degrees clockwise
    mobileBeamAngle: 130, // Same for mobile
    scrollRange: [0.14, 0.30], // MUCH LONGER - 16% of total scroll
    beamSpread: 35, // Narrow focused beam
    beamSize: 1.2 // Longer beam
  },

  // Waypoint 2: Brand Strategy - RIGHT side - WIDE SPREAD BEAM
  {
    position: [2.5, 4.5], // Desktop: Middle-right (moved inward from edge)
    mobilePosition: [2, 1.5], // Mobile: Second area, right
    text: 'Brand Strategy\nIdentity systems that resonate',
    beamAngle: 170, // Rotate 170 degrees
    mobileBeamAngle: 170, // Same for mobile
    scrollRange: [0.30, 0.46], // MUCH LONGER - 16% of total scroll
    beamSpread: 60, // Wide spread beam
    beamSize: 0.9 // Shorter beam
  },

  // Waypoint 3: Experience Design - LEFT side - MEDIUM BEAM
  {
    position: [3.5, 1], // Desktop: Mid-lower left (adjusted for visibility)
    mobilePosition: [3, 0.5], // Mobile: Third area, left
    text: 'Experience Design\nJourneys that transform',
    beamAngle: 45, // Desktop: Point up-right
    mobileBeamAngle: 60, // Mobile: Adjust angle
    scrollRange: [0.46, 0.62], // MUCH LONGER - 16% of total scroll
    beamSpread: 45, // Standard medium beam
    beamSize: 1.0 // Standard length
  },

  // Waypoint 4: Product Development - RIGHT side - TIGHT LASER BEAM
  {
    position: [2, 4.5], // Desktop: Upper-right (adjusted for visibility)
    mobilePosition: [4, 1.5], // Mobile: Fourth area, right
    text: 'Product Development\nInnovation from concept to reality',
    beamAngle: 180, // Rotate 180 degrees
    mobileBeamAngle: 180, // Same for mobile
    scrollRange: [0.62, 0.78], // MUCH LONGER - 16% of total scroll
    beamSpread: 25, // Very tight laser-like beam
    beamSize: 1.4 // Extra long beam
  },

  // Waypoint 5: Strategic Communications - LEFT side - EXPANDING BEAM
  {
    position: [3, 1], // Desktop: Center-left (adjusted for visibility)
    mobilePosition: [5, 0.5], // Mobile: Fifth area, left
    text: 'Strategic Communications\nNarratives that connect',
    beamAngle: 225, // Desktop: Point down-left
    mobileBeamAngle: 135, // Mobile: Adjust angle
    scrollRange: [0.78, 0.92], // MUCH LONGER - 14% of total scroll
    beamSpread: 55, // Wide expanding beam
    beamSize: 1.1 // Slightly longer
  },

  // Waypoint 6: Logo - Center, beam points outward (radial glow effect)
  {
    position: [2.5, 2.5], // Desktop: Center
    mobilePosition: [3, 1], // Mobile: Center (adjusted)
    text: '', // Logo appears
    beamAngle: 90, // Desktop: Point down
    mobileBeamAngle: 90, // Mobile: Same
    scrollRange: [0.92, 1.0] // Logo finale - 8% for final fade
  }
]

/**
 * Bezier easing for smooth acceleration/deceleration
 * cubic-bezier(0.4, 0.0, 0.2, 1) - Material Design standard
 */
function cubicBezier(t: number): number {
  // Control points: (0.4, 0.0) and (0.2, 1.0)
  // Approximation of cubic bezier curve
  const c1 = 0.4
  const c2 = 0.2

  const t2 = t * t
  const t3 = t2 * t

  const mt = 1 - t
  const mt2 = mt * mt
  const mt3 = mt2 * mt

  return 3 * mt2 * t * c1 + 3 * mt * t2 * (1 - c2) + t3
}

/**
 * Interpolate with dramatic pause at waypoints
 */
function interpolateWithPause(
  t: number, // 0-1 progress through segment
  pauseDuration: number = 0.60 // 60% of time spent paused at start (2x longer!)
): number {
  if (t < pauseDuration) {
    // Paused at start waypoint - LONGER pause for better text reading
    return 0
  }

  // Normalize remaining time for travel
  const travelT = (t - pauseDuration) / (1 - pauseDuration)

  // Apply bezier for smooth acceleration and deceleration
  return cubicBezier(travelT)
}

/**
 * Main choreography function
 */
export function getBeamState(scrollProgress: number, isMobile: boolean = false): BeamPosition {
  // Find current waypoint segment
  let fromWaypoint: Waypoint | null = null
  let toWaypoint: Waypoint | null = null
  let segmentProgress = 0
  let currentWaypointIndex = 0

  for (let i = 0; i < waypoints.length - 1; i++) {
    const waypoint = waypoints[i]
    const nextWaypoint = waypoints[i + 1]

    if (scrollProgress >= waypoint.scrollRange[0] && scrollProgress < nextWaypoint.scrollRange[0]) {
      fromWaypoint = waypoint
      toWaypoint = nextWaypoint
      currentWaypointIndex = i

      // Progress within this segment
      const segmentStart = waypoint.scrollRange[0]
      const segmentEnd = nextWaypoint.scrollRange[0]
      segmentProgress = (scrollProgress - segmentStart) / (segmentEnd - segmentStart)
      break
    }
  }

  // Handle final waypoint
  if (!fromWaypoint && scrollProgress >= waypoints[waypoints.length - 1].scrollRange[0]) {
    fromWaypoint = waypoints[waypoints.length - 1]
    toWaypoint = fromWaypoint
    currentWaypointIndex = waypoints.length - 1
    segmentProgress = 1
  }

  // Fallback
  if (!fromWaypoint) {
    fromWaypoint = waypoints[0]
    toWaypoint = waypoints[0]
    segmentProgress = 0
  }

  // Apply pause interpolation (spend 60% of time paused at start - 2x longer!)
  const travelProgress = interpolateWithPause(segmentProgress, 0.60)

  // Determine if we're at a waypoint (paused) - updated for longer pause
  const isAtWaypoint = segmentProgress < 0.60 || segmentProgress > 0.95

  // Interpolate position - use mobile or desktop grid positions
  const fromPosData = isMobile ? fromWaypoint.mobilePosition : fromWaypoint.position
  const toPosData = isMobile ? toWaypoint!.mobilePosition : toWaypoint!.position
  const fromPos = gridToPercentage(fromPosData[0], fromPosData[1], isMobile)
  const toPos = gridToPercentage(toPosData[0], toPosData[1], isMobile)

  const x = fromPos.x + (toPos.x - fromPos.x) * travelProgress
  const y = fromPos.y + (toPos.y - fromPos.y) * travelProgress

  // Interpolate angle for smooth rotation - use mobile or desktop angles
  let fromAngle = isMobile ? fromWaypoint.mobileBeamAngle : fromWaypoint.beamAngle
  let toAngle = isMobile ? toWaypoint!.mobileBeamAngle : toWaypoint!.beamAngle

  // Handle angle wrapping (shortest path)
  let angleDiff = toAngle - fromAngle
  if (angleDiff > 180) angleDiff -= 360
  if (angleDiff < -180) angleDiff += 360

  const angle = fromAngle + angleDiff * travelProgress

  // Interpolate beam spread between waypoints - each waypoint has unique spread
  const fromSpread = fromWaypoint.beamSpread || 45
  const toSpread = toWaypoint!.beamSpread || 45
  const spread = fromSpread + (toSpread - fromSpread) * travelProgress

  // Interpolate beam size between waypoints - each waypoint has unique size
  const fromSizeMultiplier = fromWaypoint.beamSize || 1.0
  const toSizeMultiplier = toWaypoint!.beamSize || 1.0
  const sizeMultiplier = fromSizeMultiplier + (toSizeMultiplier - fromSizeMultiplier) * travelProgress

  // Size grows with overall progress - DOUBLED (2x larger)
  const baseSize = (500 + scrollProgress * 800) * sizeMultiplier
  const waypointSizeBoost = isAtWaypoint ? 160 : 0
  const size = baseSize + waypointSizeBoost

  // Intensity - fade at 97% for logo reveal
  const isFinalWaypoint = scrollProgress >= 0.97
  const baseIntensity = isFinalWaypoint
    ? Math.max(0, 1 - (scrollProgress - 0.97) * 33.33) // Fade out quickly after 97%
    : Math.min(1, 0.35 + scrollProgress * 0.65)
  const waypointBoost = isAtWaypoint && !isFinalWaypoint ? 0.2 : 0
  const intensity = Math.min(1, baseIntensity + waypointBoost)

  // Blur at cone tip
  const blur = 120 + scrollProgress * 80

  return {
    x,
    y,
    angle,
    intensity,
    size,
    spread,
    blur,
    isAtWaypoint
  }
}

/**
 * Get current waypoint index for text display
 */
export function getCurrentWaypointIndex(scrollProgress: number): number {
  for (let i = waypoints.length - 1; i >= 0; i--) {
    if (scrollProgress >= waypoints[i].scrollRange[0]) {
      return i
    }
  }
  return 0
}

/**
 * Get waypoint data for text rendering
 */
export function getWaypointData(index: number, isMobile: boolean = false): { text: string; position: { x: number; y: number } } | null {
  if (index < 0 || index >= waypoints.length) return null

  const waypoint = waypoints[index]
  const posData = isMobile ? waypoint.mobilePosition : waypoint.position
  const pos = gridToPercentage(posData[0], posData[1], isMobile)

  return {
    text: waypoint.text,
    position: pos
  }
}

/**
 * Check if text should be visible at waypoint
 */
export function isTextVisibleAtWaypoint(scrollProgress: number, waypointIndex: number): boolean {
  if (waypointIndex < 0 || waypointIndex >= waypoints.length) return false

  const waypoint = waypoints[waypointIndex]
  const nextWaypoint = waypoints[waypointIndex + 1]

  if (!nextWaypoint) {
    // Last waypoint - visible if past start
    return scrollProgress >= waypoint.scrollRange[0]
  }

  // Calculate segment progress
  const segmentStart = waypoint.scrollRange[0]
  const segmentEnd = nextWaypoint.scrollRange[0]

  if (scrollProgress < segmentStart || scrollProgress >= segmentEnd) {
    return false
  }

  const segmentProgress = (scrollProgress - segmentStart) / (segmentEnd - segmentStart)

  // Visible during LONGER pause at start (0-65%) - matches the 60% pause + extra buffer
  return segmentProgress < 0.65 || (segmentProgress > 0.90 && segmentProgress < 0.95)
}
