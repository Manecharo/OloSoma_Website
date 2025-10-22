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
  position: [number, number] // [row, col] in 6×6 grid
  text: string
  beamAngle: number // Direction beam points (degrees)
  scrollRange: [number, number] // [start, end] including pause time
}

// Convert grid [row, col] to percentage
function gridToPercentage(row: number, col: number): { x: number; y: number } {
  const cellSize = 100 / 6
  return {
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2
  }
}

/**
 * 6 Waypoints with professional text and poetic beam directions
 */
const waypoints: Waypoint[] = [
  // Waypoint 0: Start - Bottom center
  {
    position: [5, 2.5], // Bottom center
    text: '',
    beamAngle: 270, // Point up
    scrollRange: [0, 0.14] // MUCH LONGER initial pause (14% of total scroll)
  },

  // Waypoint 1: Spatial Design - Top-left, beam points right-down toward text
  {
    position: [1, 1], // Top-left
    text: 'Spatial Design\nArchitecture that shapes experience',
    beamAngle: 135, // Point toward text (down-right from source)
    scrollRange: [0.14, 0.30] // MUCH LONGER - 16% of total scroll
  },

  // Waypoint 2: Brand Strategy - Middle-right, beam points left toward text
  {
    position: [2, 4], // Middle-right
    text: 'Brand Strategy\nIdentity systems that resonate',
    beamAngle: 180, // Point toward text (left from source)
    scrollRange: [0.30, 0.46] // MUCH LONGER - 16% of total scroll
  },

  // Waypoint 3: Experience Design - Bottom-left, beam points up-right toward text
  {
    position: [4, 1], // Bottom-left
    text: 'Experience Design\nJourneys that transform',
    beamAngle: 45, // Point toward text (up-right from source)
    scrollRange: [0.46, 0.62] // MUCH LONGER - 16% of total scroll
  },

  // Waypoint 4: Product Development - Center, beam points down
  {
    position: [3, 3], // Center
    text: 'Product Development\nInnovation from concept to reality',
    beamAngle: 90, // Point toward text (down from source)
    scrollRange: [0.62, 0.78] // MUCH LONGER - 16% of total scroll
  },

  // Waypoint 5: Strategic Communications - Top-right, beam points down-left toward text
  {
    position: [1, 4], // Top-right
    text: 'Strategic Communications\nNarratives that connect',
    beamAngle: 225, // Point toward text (down-left from source)
    scrollRange: [0.78, 0.92] // MUCH LONGER - 14% of total scroll
  },

  // Waypoint 6: Logo - Center, beam points outward (radial glow effect)
  {
    position: [2.5, 2.5], // Center
    text: '', // Logo appears
    beamAngle: 90, // Point down for symmetry
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
export function getBeamState(scrollProgress: number): BeamPosition {
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

  // Interpolate position
  const fromPos = gridToPercentage(fromWaypoint.position[0], fromWaypoint.position[1])
  const toPos = gridToPercentage(toWaypoint!.position[0], toWaypoint!.position[1])

  const x = fromPos.x + (toPos.x - fromPos.x) * travelProgress
  const y = fromPos.y + (toPos.y - fromPos.y) * travelProgress

  // Interpolate angle for smooth rotation
  let fromAngle = fromWaypoint.beamAngle
  let toAngle = toWaypoint!.beamAngle

  // Handle angle wrapping (shortest path)
  let angleDiff = toAngle - fromAngle
  if (angleDiff > 180) angleDiff -= 360
  if (angleDiff < -180) angleDiff += 360

  const angle = fromAngle + angleDiff * travelProgress

  // Size grows with overall progress - DOUBLED (2x larger)
  const baseSize = 500 + scrollProgress * 800 // Was 250 + 400
  const waypointSizeBoost = isAtWaypoint ? 160 : 0 // Was 80
  const size = baseSize + waypointSizeBoost

  // Intensity - fade at final waypoint for logo reveal
  const isFinalWaypoint = scrollProgress >= 0.92
  const baseIntensity = isFinalWaypoint
    ? Math.max(0, 1 - (scrollProgress - 0.92) * 10) // Fade out quickly at end (adjusted for 0.92-1.0 range)
    : Math.min(1, 0.35 + scrollProgress * 0.65)
  const waypointBoost = isAtWaypoint && !isFinalWaypoint ? 0.2 : 0
  const intensity = Math.min(1, baseIntensity + waypointBoost)

  // Cone spread (width angle) - wider for better text illumination
  const spread = isAtWaypoint ? 70 : 55 // Was 55:45

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
export function getWaypointData(index: number): { text: string; position: { x: number; y: number } } | null {
  if (index < 0 || index >= waypoints.length) return null

  const waypoint = waypoints[index]
  const pos = gridToPercentage(waypoint.position[0], waypoint.position[1])

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
