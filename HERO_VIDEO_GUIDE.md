# 🎬 Adding Background Video to Hero Section

## Complete Implementation Guide

---

## Option 1: Simple Background Video (Recommended)

### Step 1: Prepare Your Video

**Video Requirements**:
- **Format**: MP4 (H.264 codec) for best compatibility
- **Alternative formats**: WebM for smaller file size
- **Resolution**: 1920x1080 (Full HD) or 3840x2160 (4K)
- **Duration**: 10-30 seconds (loop-friendly)
- **File size**: < 5MB for fast loading (optimize heavily!)
- **Frame rate**: 24-30 fps
- **No audio**: Remove audio track to reduce file size

**Optimization Tips**:
- Use [HandBrake](https://handbrake.fr/) to compress
- Target bitrate: 2-5 Mbps
- Use constant quality (RF 28-32)
- Reduce resolution if needed (1280x720 is acceptable)

### Step 2: Add Video to Project

Place your video file in the public directory:
```
public/
└── videos/
    ├── hero-video.mp4       ← Your main video
    └── hero-video-poster.jpg ← Fallback image (1920x1080)
```

### Step 3: Update Hero Component

Open [`components/features/hero/Hero.tsx`](components/features/hero/Hero.tsx) and replace the background section:

```tsx
'use client'

import { MotionDiv, MotionH1 } from '@/components/animations/MotionWrapper'
import { NeuButton } from '@/components/ui/NeuButton'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/hero-video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          <source src="/videos/hero-video.webm" type="video/webm" />
        </video>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-dark-base/60" />

        {/* Optional: Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark-base/40 to-dark-base/80" />
      </div>

      {/* Content (keep existing code) */}
      <MotionDiv
        className="container-custom text-center z-10 px-4 relative"
        initial="initial"
        animate="animate"
      >
        {/* Your existing logo, title, etc. */}
      </MotionDiv>
    </section>
  )
}
```

---

## Option 2: Advanced with Performance Optimization

### Enhanced Component with Lazy Loading

```tsx
'use client'

import { MotionDiv, MotionH1 } from '@/components/animations/MotionWrapper'
import { NeuButton } from '@/components/ui/NeuButton'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    // Only load video on desktop for performance
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isDesktop && !prefersReducedMotion && videoRef.current) {
      // Force video to load and play
      videoRef.current.load()
      videoRef.current.play().catch(() => {
        // Autoplay failed, which is fine
        console.log('Autoplay prevented')
      })
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Video with Lazy Loading */}
      <div className="absolute inset-0 z-0">
        {/* Fallback image shown while video loads */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: 'url(/videos/hero-video-poster.jpg)',
            opacity: isVideoLoaded ? 0 : 1
          }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/hero-video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          <source src="/videos/hero-video.webm" type="video/webm" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-dark-base/70" />

        {/* Teal gradient overlay (optional) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-base/90" />

        {/* Neomorphic effect overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-teal-accent/5 via-transparent to-transparent opacity-30" />
      </div>

      {/* Content - keep your existing code */}
      <MotionDiv
        className="container-custom text-center z-10 px-4 relative"
        initial="initial"
        animate="animate"
      >
        {/* Your existing Hero content here */}
        {/* Logo, heading, buttons, etc. */}
      </MotionDiv>
    </section>
  )
}
```

---

## Option 3: Video with Parallax Effect

### Subtle Scroll-Based Movement

```tsx
'use client'

import { useEffect, useState } from 'react'
import { MotionDiv } from '@/components/animations/MotionWrapper'

export function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`, // Parallax speed
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-dark-base/60" />
      </div>

      {/* Content */}
      <MotionDiv className="container-custom text-center z-10 px-4 relative">
        {/* Your content */}
      </MotionDiv>
    </section>
  )
}
```

---

## CSS Customization Options

### Add to your globals.css or component:

```css
/* Subtle video zoom animation */
@keyframes subtle-zoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.hero-video {
  animation: subtle-zoom 30s ease-in-out infinite;
}

/* Blur effect (use sparingly for performance) */
.hero-video-blur {
  filter: blur(2px);
  transform: scale(1.1); /* Compensate for blur edge */
}

/* Desaturate for monochrome effect */
.hero-video-mono {
  filter: grayscale(60%) contrast(1.2);
}

/* Teal tint */
.hero-video-teal {
  filter: sepia(20%) saturate(150%) hue-rotate(120deg);
}
```

---

## Video Creation Recommendations

### Content Ideas:

1. **Abstract Motion Graphics**
   - Flowing teal particles
   - Geometric patterns morphing
   - Subtle light rays
   - Gradient waves

2. **Minimalist Footage**
   - Slow-motion flowing water
   - Cloud timelapse
   - Ink in water (very on-brand!)
   - Abstract shapes

3. **Stock Video Sources**:
   - [Pexels Videos](https://www.pexels.com/videos/) - Free
   - [Coverr](https://coverr.co/) - Free
   - [Artgrid](https://artgrid.io/) - Premium
   - [Envato Elements](https://elements.envato.com/video) - Premium

### Video Keywords to Search:
- "abstract teal motion"
- "minimalist background"
- "flowing particles"
- "gradient animation"
- "soft motion graphics"
- "neomorphic animation"

---

## Performance Optimization

### 1. Lazy Loading Script

Create a utility component:

```tsx
// components/effects/LazyVideo.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  poster?: string
  className?: string
}

export function LazyVideo({ src, poster, className }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Check if user is on a fast connection
    const connection = (navigator as any).connection
    const isFastConnection = !connection || connection.effectiveType === '4g'

    // Check device type
    const isDesktop = window.matchMedia('(min-width: 768px)').matches

    // Check motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Only load video if conditions are met
    if (isFastConnection && isDesktop && !prefersReducedMotion) {
      setShouldLoad(true)
    }
  }, [])

  if (!shouldLoad) {
    return (
      <div
        className={className}
        style={{ backgroundImage: `url(${poster})`, backgroundSize: 'cover' }}
      />
    )
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
```

### 2. Use Next.js Image Optimization for Poster

```tsx
<Image
  src="/videos/hero-video-poster.jpg"
  alt="Hero background"
  fill
  priority
  quality={85}
  className="object-cover"
/>
```

---

## Mobile Considerations

### Option A: No Video on Mobile (Recommended)

```tsx
export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Static image on mobile, video on desktop */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: Show poster image */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/videos/hero-video-poster.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Desktop: Show video */}
        <div className="hidden md:block absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay (both) */}
        <div className="absolute inset-0 bg-dark-base/60" />
      </div>

      {/* Content */}
      <MotionDiv className="container-custom text-center z-10 px-4 relative">
        {/* Your content */}
      </MotionDiv>
    </section>
  )
}
```

### Option B: Lighter Video for Mobile

Create a lower-res version and serve conditionally:

```tsx
<video autoPlay loop muted playsInline className="w-full h-full object-cover">
  <source
    src="/videos/hero-video-mobile.mp4"
    type="video/mp4"
    media="(max-width: 768px)"
  />
  <source
    src="/videos/hero-video.mp4"
    type="video/mp4"
    media="(min-width: 769px)"
  />
</video>
```

---

## Example: Complete Hero with Video

Here's a production-ready implementation:

```tsx
'use client'

import { MotionDiv, MotionH1 } from '@/components/animations/MotionWrapper'
import { NeuButton } from '@/components/ui/NeuButton'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video plays (some browsers block autoplay)
    const playVideo = async () => {
      try {
        await video.play()
      } catch (err) {
        console.log('Video autoplay prevented:', err)
      }
    }

    playVideo()
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* Desktop: Video */}
        <div className="hidden md:block absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/hero-video-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <source src="/videos/hero-video.webm" type="video/webm" />
          </video>
        </div>

        {/* Mobile: Static Image */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/videos/hero-video-poster.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Overlays for text readability */}
        <div className="absolute inset-0 bg-dark-base/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-base/90" />
        <div className="absolute inset-0 bg-gradient-radial from-teal-accent/5 via-transparent to-transparent opacity-30" />
      </div>

      {/* Content */}
      <MotionDiv
        className="container-custom text-center z-10 px-4 relative"
        initial="initial"
        animate="animate"
      >
        {/* OloSoma Logo */}
        <MotionDiv
          className="mb-12 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="relative w-64 h-20">
            <Image
              src="/logo.svg"
              alt="OloSoma"
              fill
              priority
              className="object-contain"
            />
          </div>
        </MotionDiv>

        <MotionH1
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We give form to potential.
        </MotionH1>

        <MotionDiv
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto space-y-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>A global design consultancy where soft logic meets real form—</p>
          <p>transforming the invisible into integrated experiences.</p>
        </MotionDiv>

        <MotionDiv
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="#services">
            <NeuButton variant="primary" className="breathing-glow">
              → Discover how
            </NeuButton>
          </Link>
        </MotionDiv>

        {/* Scroll indicator */}
        <MotionDiv
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <MotionDiv
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-teal-accent/60 text-2xl"
          >
            ↓
          </MotionDiv>
        </MotionDiv>
      </MotionDiv>
    </section>
  )
}
```

---

## Testing Checklist

- [ ] Video loads on desktop
- [ ] Poster image shows before video loads
- [ ] Video loops seamlessly
- [ ] Text is readable over video
- [ ] Mobile shows static image (or lighter video)
- [ ] Respects prefers-reduced-motion
- [ ] Page loads in < 3 seconds
- [ ] Video file size < 5MB
- [ ] No audio plays (muted works)
- [ ] Smooth scrolling performance

---

## Troubleshooting

### Video Won't Autoplay
- Ensure `muted` attribute is set
- Add `playsInline` for iOS
- Use JavaScript to force play (see examples)

### Poor Performance
- Reduce video resolution
- Lower bitrate
- Use static image on mobile
- Implement lazy loading

### Video Not Looping Smoothly
- Trim video to exact loop point
- Use video editing software (DaVinci Resolve, Premiere)
- Ensure last frame matches first frame

---

## Quick Start Steps

1. **Get/Create Video** (1920x1080 MP4, <5MB)
2. **Place in** `/public/videos/hero-video.mp4`
3. **Create poster** `/public/videos/hero-video-poster.jpg`
4. **Copy code** from examples above
5. **Replace** existing Hero background section
6. **Test** on desktop and mobile
7. **Optimize** if needed

---

**Need a video?** I can recommend specific stock videos or help you create a simple animated background using CSS/JavaScript!

Let me know if you need help with any step! 🎥
