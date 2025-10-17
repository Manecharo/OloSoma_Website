# 🎨 OloSoma Interactive Effects Guide

## Overview

This guide documents all the subtle interactive effects implemented in the OloSoma website. These effects are designed to enhance user experience while maintaining the brand's neomorphic minimalism philosophy.

---

## 🌟 Effects Catalog

### 1. **Magnetic Element Attraction** ⭐⭐⭐

**Desktop Only** | **High Impact**

Elements subtly "pull" toward the cursor when it comes nearby, creating a premium tactile feel.

**Technical Details:**
- Uses GSAP for smooth spring physics animation
- Triggers within 100-150px radius
- 2-4px translation with 1.01-1.03x scale
- Adds teal glow that intensifies with proximity

**Usage:**

```tsx
import { NeuButton } from '@/components/ui/NeuButton'

// Enabled by default
<NeuButton variant="primary">Click Me</NeuButton>

// Disable if needed
<NeuButton magnetic={false}>No Magnetic</NeuButton>
```

```tsx
import { NeuCard } from '@/components/ui/NeuCard'

// Enabled by default
<NeuCard>Content here</NeuCard>

// Disable if needed
<NeuCard magnetic={false}>Content here</NeuCard>
```

**Parameters:**
- `strength`: 0.15-0.25 (cards vs buttons)
- `radius`: 120-150px
- `scale`: 1.01-1.03x
- `glowIntensity`: 0.1-0.15

---

### 2. **Edge Light Reflection** ⭐⭐⭐

**Desktop Only** | **High Impact**

Cursor proximity creates a subtle edge highlight on neomorphic cards, following the cursor position around the card perimeter.

**Technical Details:**
- Calculates angle from cursor to card center
- Creates directional gradient that follows cursor
- Only visible within 200px radius
- Uses CSS `mix-blend-mode: screen` for subtle overlay

**Usage:**

```tsx
import { NeuCard } from '@/components/ui/NeuCard'

// Enabled by default
<NeuCard>
  <h3>Card Title</h3>
  <p>Card content with edge light effect</p>
</NeuCard>

// Disable if needed
<NeuCard edgeLight={false}>Content</NeuCard>
```

**Parameters:**
- `intensity`: 0.25-0.3 (opacity multiplier)
- `radius`: 200px (detection range)
- `color`: '#62bfa4' (teal accent)

---

### 3. **Cursor Trail** ⭐

**Desktop Only** | **Ambient**

Ultra-subtle trail of teal particles follows the cursor with physics-based decay.

**Technical Details:**
- Canvas-based particle system
- 3-5 micro-dots (2-4px) per trail
- 70% opacity, fading over 200ms
- Bezier curve motion for organic flow
- GPU accelerated with `requestAnimationFrame`

**Usage:**

```tsx
// Already added to app/layout.tsx globally
import { CursorTrail } from '@/components/effects'

<CursorTrail
  particleCount={5}
  particleSize={3}
  particleLife={800}
  color="#62bfa4"
/>
```

**Parameters:**
- `particleCount`: 3-7 (number of particles)
- `particleSize`: 2-4px (dot size)
- `particleLife`: 600-1000ms (fade duration)
- `color`: string (hex or rgba)

---

### 4. **Touch Ripple** ⭐⭐

**All Devices** | **High Impact**

Organic ripple effect emanates from touch/click point, like watercolor dispersal.

**Technical Details:**
- Appears on touch/click
- Expands to 100-120px radius over 600-800ms
- Cubic-bezier easing for natural motion
- Works on both mouse and touch events

**Usage:**

```tsx
import { NeuButton } from '@/components/ui/NeuButton'

// Enabled by default
<NeuButton>Click for Ripple</NeuButton>

// Disable if needed
<NeuButton ripple={false}>No Ripple</NeuButton>
```

**For Custom Components:**

```tsx
import { TouchRipple } from '@/components/effects'

<div className="relative">
  <TouchRipple
    color="rgba(98, 191, 164, 0.4)"
    duration={800}
    maxSize={120}
  />
  Your content
</div>
```

---

### 5. **Gyroscope Parallax** ⭐⭐

**Mobile Only** | **Premium Feel**

Device tilt creates subtle parallax movement with dynamic ambient lighting.

**Technical Details:**
- Uses `deviceorientation` API
- 2-3px maximum movement (±15° tilt range)
- Ambient light gradient shifts based on tilt
- Creates holographic depth illusion
- Requests permission on iOS 13+

**Usage:**

```tsx
import { GyroscopeParallax } from '@/components/effects'

<GyroscopeParallax intensity={1} ambientLight>
  <NeuCard>
    <h3>Tilt your device!</h3>
    <p>This card will move with parallax</p>
  </NeuCard>
</GyroscopeParallax>
```

**Parameters:**
- `intensity`: 0.5-1.5 (movement multiplier)
- `ambientLight`: boolean (enable light effect)

---

### 6. **Text Shimmer** ⭐

**Desktop Only** | **Subtle**

Characters near cursor gain subtle brightness and reduced blur.

**Technical Details:**
- Splits text into individual character spans
- Detects cursor proximity per character (80px radius)
- 2% brightness increase + 0.5px blur reduction
- Smooth 300ms cubic-bezier transition
- Zero layout shifts (pure CSS transforms)

**Usage:**

```tsx
import { TextShimmer } from '@/components/effects'

<TextShimmer className="text-4xl font-bold">
  We give form to potential
</TextShimmer>
```

**Parameters:**
- `radius`: 60-100px (detection range)
- `intensity`: 0.2-0.4 (effect strength)

---

### 7. **Breathing Background Noise** ⭐

**All Devices** | **Subliminal**

Subtle animated grain texture that slowly shifts, adding organic life to backgrounds.

**Technical Details:**
- Canvas-based Perlin-like noise
- 2-3% opacity with `mix-blend-mode: overlay`
- Shifts every 8-10 seconds
- Pre-rendered approach for performance
- Fixed position, covers entire viewport

**Usage:**

```tsx
// Already added to app/layout.tsx globally
import { BreathingNoise } from '@/components/effects'

<BreathingNoise
  opacity={0.025}
  speed={10000}
  scale={1.5}
/>
```

**Parameters:**
- `opacity`: 0.02-0.05 (visibility)
- `speed`: 8000-12000ms (animation cycle)
- `scale`: 1.2-1.8 (texture scale)

---

## 🎯 Usage Patterns

### Global Effects (app/layout.tsx)

```tsx
import { CursorTrail, BreathingNoise } from '@/components/effects'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CursorTrail />
        <BreathingNoise />
        {children}
      </body>
    </html>
  )
}
```

### Component-Level Effects

```tsx
import { NeuCard } from '@/components/ui/NeuCard'
import { TextShimmer } from '@/components/effects'

export function Hero() {
  return (
    <section>
      <TextShimmer className="text-6xl">
        Amazing Headline
      </TextShimmer>

      <NeuCard magnetic edgeLight>
        This card has magnetic + edge light effects
      </NeuCard>
    </section>
  )
}
```

### Mobile-Specific Effects

```tsx
import { GyroscopeParallax } from '@/components/effects'

export function MobileSection() {
  return (
    <GyroscopeParallax intensity={1.2}>
      <div className="hero-content">
        Tilts with device motion
      </div>
    </GyroscopeParallax>
  )
}
```

---

## ⚡ Performance Optimization

### GPU Acceleration

All effects use hardware acceleration:
- `transform: translate3d()` instead of `left/top`
- `will-change: transform` on animated elements
- CSS transforms over layout-triggering properties

### Device Detection

Effects are conditionally rendered based on device:

```tsx
// Desktop-only check
const isDesktop = window.matchMedia('(min-width: 768px)').matches
if (!isDesktop) return

// Mobile-only check
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
if (!isMobile) return
```

### Motion Preferences

All effects respect user preferences:

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) return // Skip animations
```

### Throttling & Debouncing

- Mouse move events throttled to ~60fps (16ms)
- Resize events debounced
- `requestAnimationFrame` for all visual updates

---

## 🎨 Customization

### Effect Intensity Levels

Adjust subtlety by modifying parameters:

**Ultra-Minimal** (barely perceptible):
```tsx
<NeuCard magnetic={{ strength: 0.1, scale: 1.005 }} />
<CursorTrail particleSize={2} particleLife={400} />
```

**Refined Subtlety** (recommended):
```tsx
<NeuCard magnetic={{ strength: 0.15, scale: 1.01 }} />
<CursorTrail particleSize={3} particleLife={800} />
```

**Premium Tactile** (more pronounced):
```tsx
<NeuCard magnetic={{ strength: 0.3, scale: 1.03 }} />
<CursorTrail particleSize={4} particleLife={1200} />
```

### Color Customization

All effects accept color parameters:

```tsx
<CursorTrail color="#FF6B9D" /> // Custom color
<TouchRipple color="rgba(255, 107, 157, 0.4)" />
<EdgeLight color="#FF6B9D" />
```

---

## 🧪 Testing

### Demo Page

Visit `/effects-demo` to see all effects in action with detailed explanations.

### Browser DevTools

Monitor performance:
```js
// Check FPS
const stats = new Stats()
document.body.appendChild(stats.dom)

// Monitor paint events
chrome://flags/#show-paint-rects
```

---

## ♿ Accessibility

### Keyboard Navigation

- Effects don't trigger on keyboard navigation
- Focus states remain clear and unaffected
- Interactive elements remain fully accessible

### Screen Readers

- All decorative effects use `aria-hidden="true"`
- No semantic content in effect layers
- Effects are purely visual enhancements

### Reduced Motion

Full support for `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🐛 Troubleshooting

### Effects Not Showing

1. **Check device type**: Desktop effects won't show on mobile
2. **Check motion preferences**: System settings may disable animations
3. **Check browser support**: Some effects require modern browsers
4. **Console errors**: Look for permission denied (gyroscope on iOS)

### Performance Issues

1. **Reduce particle count**: `particleCount={3}` instead of 5
2. **Increase thresholds**: Larger radius = less frequent updates
3. **Disable on low-end devices**: Check hardware capabilities
4. **Limit simultaneous effects**: Don't overuse on single page

### Mobile Gyroscope Not Working

iOS 13+ requires permission:
```tsx
// Request permission on user interaction
button.addEventListener('click', async () => {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    await DeviceOrientationEvent.requestPermission()
  }
})
```

---

## 📦 Effect Hooks

All effects are available as custom hooks for advanced usage:

```tsx
import { useMagneticEffect } from '@/lib/hooks'

function CustomComponent() {
  const ref = useMagneticEffect<HTMLDivElement>({
    strength: 0.2,
    radius: 100,
  })

  return <div ref={ref}>Magnetic element</div>
}
```

Available hooks:
- `useCursorTrail(options)`
- `useMagneticEffect<T>(options)`
- `useGyroscope(maxTilt)`
- `useTouchRipple(color)`

---

## 📚 Architecture

```
components/
├── effects/
│   ├── CursorTrail.tsx      # Desktop cursor particles
│   ├── TouchRipple.tsx       # Click/tap ripple effect
│   ├── EdgeLight.tsx         # Card edge reflection
│   ├── GyroscopeParallax.tsx # Mobile tilt parallax
│   ├── TextShimmer.tsx       # Text proximity effect
│   ├── BreathingNoise.tsx    # Background grain
│   └── index.ts
│
lib/
├── hooks/
│   ├── useCursorTrail.ts
│   ├── useMagneticEffect.ts
│   ├── useGyroscope.ts
│   ├── useTouchRipple.ts
│   └── index.ts
```

---

## 🎯 Design Philosophy Alignment

These effects embody OloSoma's **"soft logic meets real form"** philosophy:

### Soft Logic (olo) — The Invisible
- Cursor trails reveal invisible forces
- Text shimmer shows proximity fields
- Gyroscope parallax exposes device orientation
- Background noise adds imperceptible life

### Real Form (soma) — The Tangible
- Magnetic buttons create physical pull
- Touch ripples show material response
- Edge lights simulate real reflection
- All effects enhance tactile feedback

---

## 🚀 Future Enhancements

Potential additions (not yet implemented):

1. **Scroll Velocity Distortion**: Background wave on fast scroll
2. **Audio Reactivity**: Visual response to user interaction sounds
3. **Time-Based Ambience**: Effects that change with time of day
4. **Multi-Touch Gestures**: Advanced mobile interactions
5. **WebGL Shaders**: Custom fragment shaders for premium effects

---

**Last Updated**: October 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
