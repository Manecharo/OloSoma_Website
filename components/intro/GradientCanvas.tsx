'use client'

import { useEffect, useRef, useState } from 'react'

interface GradientCanvasProps {
  progress: number // 0 to 1
}

export function GradientCanvas({ progress }: GradientCanvasProps) {
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // Animate rotation very slowly
    const animate = () => {
      setRotation((prev) => (prev + 0.05) % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Calculate opacity based on progress
  const opacity = Math.min(1, progress * 1.2)

  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{
        opacity,
        transition: 'opacity 0.5s ease-out',
        willChange: 'opacity',
      }}
    >
      {/* Ultra-detailed layered gradients - 60+ layers for cinematic quality */}

      {/* === BLACK ZONES - Multiple overlapping layers === */}

      {/* Pure black core 1 - Top-left */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 100% at ${18 + Math.sin(rotation * 0.008) * 3}% ${18 + Math.cos(rotation * 0.012) * 3}%,
            rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.98) 12%, rgba(0, 0, 0, 0.92) 25%, rgba(0, 0, 0, 0.75) 40%, rgba(0, 0, 0, 0.5) 55%, transparent 75%)`,
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 110% 95% at ${22 + Math.cos(rotation * 0.009) * 4}% ${15 + Math.sin(rotation * 0.011) * 3}%,
            rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.88) 15%, rgba(0, 0, 0, 0.7) 32%, rgba(0, 0, 0, 0.45) 50%, transparent 70%)`,
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 105% at ${20 + Math.sin(rotation * 0.01) * 5}% ${20 + Math.cos(rotation * 0.013) * 4}%,
            rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.8) 18%, rgba(0, 0, 0, 0.6) 38%, rgba(0, 0, 0, 0.35) 58%, transparent 78%)`,
          filter: 'blur(85px)',
        }}
      />

      {/* Pure black detail layers - Top-left region */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 85% at ${15 + Math.cos(rotation * 0.007) * 2}% ${22 + Math.sin(rotation * 0.009) * 2}%,
            rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.65) 22%, rgba(0, 0, 0, 0.4) 45%, transparent 68%)`,
          filter: 'blur(55px)',
        }}
      />

      {/* === 70% BLACK ZONES - Deep gray layers === */}

      {/* 70% black core 1 - Bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 130% 95% at ${73 + Math.sin(rotation * 0.011) * 6}% ${78 + Math.cos(rotation * 0.015) * 5}%,
            rgba(26, 26, 26, 1) 0%, rgba(26, 26, 26, 0.95) 10%, rgba(26, 26, 26, 0.85) 22%, rgba(26, 26, 26, 0.65) 38%, rgba(26, 26, 26, 0.4) 55%, transparent 72%)`,
          filter: 'blur(75px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 140% 100% at ${77 + Math.cos(rotation * 0.012) * 7}% ${82 + Math.sin(rotation * 0.016) * 6}%,
            rgba(26, 26, 26, 0.92) 0%, rgba(26, 26, 26, 0.82) 15%, rgba(26, 26, 26, 0.6) 32%, rgba(26, 26, 26, 0.35) 52%, transparent 70%)`,
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 125% 110% at ${75 + Math.sin(rotation * 0.013) * 8}% ${80 + Math.cos(rotation * 0.017) * 7}%,
            rgba(26, 26, 26, 0.88) 0%, rgba(26, 26, 26, 0.7) 18%, rgba(26, 26, 26, 0.48) 40%, rgba(26, 26, 26, 0.25) 60%, transparent 78%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* 70% black mid layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 95% at ${70 + Math.cos(rotation * 0.01) * 5}% ${75 + Math.sin(rotation * 0.014) * 5}%,
            rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.58) 25%, rgba(26, 26, 26, 0.32) 50%, transparent 72%)`,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 110% 105% at ${78 + Math.sin(rotation * 0.009) * 4}% ${77 + Math.cos(rotation * 0.012) * 4}%,
            rgba(26, 26, 26, 0.75) 0%, rgba(26, 26, 26, 0.52) 28%, rgba(26, 26, 26, 0.28) 55%, transparent 75%)`,
          filter: 'blur(70px)',
        }}
      />

      {/* === DARK GRAY TRANSITION ZONES === */}

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 100% at ${50 + Math.sin(rotation * 0.008) * 6}% ${50 + Math.cos(rotation * 0.011) * 6}%,
            rgba(15, 15, 15, 0.85) 0%, rgba(15, 15, 15, 0.6) 25%, rgba(15, 15, 15, 0.35) 50%, transparent 70%)`,
          filter: 'blur(95px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 95% 110% at ${12 + Math.cos(rotation * 0.01) * 4}% ${48 + Math.sin(rotation * 0.013) * 7}%,
            rgba(15, 15, 15, 0.92) 0%, rgba(15, 15, 15, 0.7) 20%, rgba(15, 15, 15, 0.42) 42%, transparent 65%)`,
          filter: 'blur(88px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 85% 95% at ${8 + Math.sin(rotation * 0.009) * 3}% ${52 + Math.cos(rotation * 0.014) * 8}%,
            rgba(15, 15, 15, 0.88) 0%, rgba(15, 15, 15, 0.62) 24%, rgba(15, 15, 15, 0.38) 48%, transparent 68%)`,
          filter: 'blur(75px)',
        }}
      />

      {/* === TEAL ACCENT ZONES - Multiple layers for depth === */}

      {/* Teal core 1 - Top-right */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 75% 90% at ${83 + Math.cos(rotation * 0.013) * 5}% ${13 + Math.sin(rotation * 0.015) * 6}%,
            rgba(98, 191, 164, 0.42) 0%, rgba(98, 191, 164, 0.32) 15%, rgba(98, 191, 164, 0.2) 32%, rgba(98, 191, 164, 0.1) 52%, transparent 72%)`,
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 95% at ${85 + Math.sin(rotation * 0.014) * 6}% ${16 + Math.cos(rotation * 0.016) * 7}%,
            rgba(98, 191, 164, 0.38) 0%, rgba(98, 191, 164, 0.28) 18%, rgba(98, 191, 164, 0.17) 38%, rgba(98, 191, 164, 0.08) 58%, transparent 75%)`,
          filter: 'blur(115px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 85% 100% at ${87 + Math.cos(rotation * 0.015) * 7}% ${12 + Math.sin(rotation * 0.017) * 6}%,
            rgba(98, 191, 164, 0.35) 0%, rgba(98, 191, 164, 0.24) 20%, rgba(98, 191, 164, 0.14) 42%, rgba(98, 191, 164, 0.06) 62%, transparent 78%)`,
          filter: 'blur(125px)',
        }}
      />

      {/* Teal detail layers - Top-right region */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 85% at ${88 + Math.sin(rotation * 0.012) * 4}% ${18 + Math.cos(rotation * 0.014) * 5}%,
            rgba(98, 191, 164, 0.3) 0%, rgba(98, 191, 164, 0.2) 22%, rgba(98, 191, 164, 0.11) 45%, transparent 68%)`,
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 80% at ${82 + Math.cos(rotation * 0.011) * 4}% ${15 + Math.sin(rotation * 0.013) * 5}%,
            rgba(98, 191, 164, 0.28) 0%, rgba(98, 191, 164, 0.18) 25%, rgba(98, 191, 164, 0.09) 50%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Teal core 2 - Bottom-left */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 68% 88% at ${23 + Math.cos(rotation * 0.016) * 5}% ${83 + Math.sin(rotation * 0.018) * 4}%,
            rgba(98, 191, 164, 0.22) 0%, rgba(98, 191, 164, 0.15) 20%, rgba(98, 191, 164, 0.08) 42%, transparent 65%)`,
          filter: 'blur(105px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 72% 92% at ${27 + Math.sin(rotation * 0.017) * 6}% ${87 + Math.cos(rotation * 0.019) * 5}%,
            rgba(98, 191, 164, 0.18) 0%, rgba(98, 191, 164, 0.12) 22%, rgba(98, 191, 164, 0.06) 45%, transparent 68%)`,
          filter: 'blur(115px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 90% at ${25 + Math.cos(rotation * 0.015) * 5}% ${85 + Math.sin(rotation * 0.02) * 4}%,
            rgba(98, 191, 164, 0.16) 0%, rgba(98, 191, 164, 0.1) 25%, rgba(98, 191, 164, 0.05) 50%, transparent 72%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* === MID-TONE BLENDING LAYERS === */}

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 85% 95% at ${45 + Math.sin(rotation * 0.011) * 6}% ${35 + Math.cos(rotation * 0.014) * 7}%,
            rgba(20, 20, 20, 0.7) 0%, rgba(20, 20, 20, 0.45) 25%, rgba(20, 20, 20, 0.22) 52%, transparent 72%)`,
          filter: 'blur(110px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 100% at ${55 + Math.cos(rotation * 0.012) * 7}% ${45 + Math.sin(rotation * 0.015) * 8}%,
            rgba(18, 18, 18, 0.65) 0%, rgba(18, 18, 18, 0.42) 28%, rgba(18, 18, 18, 0.2) 55%, transparent 75%)`,
          filter: 'blur(120px)',
        }}
      />

      {/* === ORGANIC NOISE LAYERS - Multiple overlapping === */}

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 70% at ${58 + Math.sin(rotation * 0.019) * 9}% ${38 + Math.cos(rotation * 0.021) * 10}%,
              rgba(12, 12, 12, 0.72) 0%, rgba(12, 12, 12, 0.45) 30%, transparent 58%),
            radial-gradient(ellipse 62% 75% at ${42 + Math.cos(rotation * 0.017) * 8}% ${58 + Math.sin(rotation * 0.022) * 9}%,
              rgba(22, 22, 22, 0.68) 0%, rgba(22, 22, 22, 0.38) 35%, transparent 62%)`,
          filter: 'blur(130px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 68% at ${65 + Math.sin(rotation * 0.016) * 7}% ${42 + Math.cos(rotation * 0.019) * 8}%,
              rgba(8, 8, 8, 0.65) 0%, rgba(8, 8, 8, 0.35) 32%, transparent 60%),
            radial-gradient(ellipse 58% 72% at ${38 + Math.cos(rotation * 0.018) * 7}% ${62 + Math.sin(rotation * 0.02) * 8}%,
              rgba(28, 28, 28, 0.6) 0%, rgba(28, 28, 28, 0.32) 38%, transparent 65%)`,
          filter: 'blur(140px)',
        }}
      />

      {/* === ATMOSPHERIC TEAL ACCENTS - Subtle hints === */}

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 90% at ${90 + Math.cos(rotation * 0.014) * 3}% ${25 + Math.sin(rotation * 0.016) * 4}%,
            rgba(98, 191, 164, 0.12) 0%, rgba(98, 191, 164, 0.07) 30%, transparent 60%)`,
          filter: 'blur(95px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 75% 85% at ${18 + Math.sin(rotation * 0.013) * 3}% ${88 + Math.cos(rotation * 0.015) * 3}%,
            rgba(98, 191, 164, 0.1) 0%, rgba(98, 191, 164, 0.05) 35%, transparent 65%)`,
          filter: 'blur(85px)',
        }}
      />

      {/* === CORNER ACCENT DETAILS === */}

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 75% at ${5 + Math.cos(rotation * 0.01) * 2}% ${5 + Math.sin(rotation * 0.012) * 2}%,
            rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.65) 25%, transparent 55%)`,
          filter: 'blur(65px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 80% at ${93 + Math.sin(rotation * 0.011) * 2}% ${7 + Math.cos(rotation * 0.013) * 2}%,
            rgba(98, 191, 164, 0.25) 0%, rgba(98, 191, 164, 0.12) 28%, transparent 58%)`,
          filter: 'blur(75px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 85% at ${92 + Math.cos(rotation * 0.012) * 2}% ${92 + Math.sin(rotation * 0.014) * 2}%,
            rgba(26, 26, 26, 0.88) 0%, rgba(26, 26, 26, 0.55) 30%, transparent 62%)`,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 68% 78% at ${7 + Math.sin(rotation * 0.01) * 2}% ${90 + Math.cos(rotation * 0.012) * 2}%,
            rgba(98, 191, 164, 0.14) 0%, rgba(98, 191, 164, 0.07) 32%, transparent 60%)`,
          filter: 'blur(70px)',
        }}
      />

      {/* === FINAL DEPTH AND ATMOSPHERE LAYERS === */}

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 180% 180% at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.4) 100%)`,
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 150% 150% at ${50 + Math.sin(rotation * 0.008) * 5}% ${50 + Math.cos(rotation * 0.01) * 5}%, transparent 30%, rgba(0, 0, 0, 0.15) 100%)`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.6) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
