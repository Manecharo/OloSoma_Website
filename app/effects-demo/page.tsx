'use client'

import { NeuButton } from '@/components/ui/NeuButton'
import { NeuCard, NeuCardHeader } from '@/components/ui/NeuCard'
import { TextShimmer } from '@/components/effects/TextShimmer'
import { GyroscopeParallax } from '@/components/effects/GyroscopeParallax'
import { MotionDiv } from '@/components/animations/MotionWrapper'

export default function EffectsDemoPage() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="container-custom max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gradient-teal">
            Interactive Effects Demo
          </h1>
          <p className="text-xl text-gray-400">
            Experience the subtle interactions that bring OloSoma to life
          </p>
        </div>

        {/* Magnetic Buttons Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Magnetic Buttons</h2>
            <p className="text-gray-400 mb-6">
              Desktop only: Move your cursor near these buttons to feel the magnetic pull
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <NeuButton variant="primary">
              Primary Button
            </NeuButton>
            <NeuButton variant="secondary">
              Secondary Button
            </NeuButton>
            <NeuButton variant="primary" magnetic={false}>
              No Magnetic
            </NeuButton>
          </div>
        </section>

        {/* Magnetic Cards Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Magnetic Cards with Edge Light</h2>
            <p className="text-gray-400 mb-6">
              Desktop: Hover to see magnetic pull + edge light reflection. Mobile: Tap for ripple effect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NeuCard>
              <NeuCardHeader>
                <h3 className="text-xl font-semibold text-teal-accent">
                  oloPulse™
                </h3>
              </NeuCardHeader>
              <p className="text-gray-300">
                Strategy & Vision — where potential finds its path
              </p>
            </NeuCard>

            <NeuCard accent>
              <NeuCardHeader>
                <h3 className="text-xl font-semibold text-teal-accent">
                  somaWeave™
                </h3>
              </NeuCardHeader>
              <p className="text-gray-300">
                Experience Design — where worlds become seamless
              </p>
            </NeuCard>

            <NeuCard>
              <NeuCardHeader>
                <h3 className="text-xl font-semibold text-teal-accent">
                  somaForge™
                </h3>
              </NeuCardHeader>
              <p className="text-gray-300">
                Form & Identity — where ideas take shape
              </p>
            </NeuCard>
          </div>
        </section>

        {/* Text Shimmer Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Text Shimmer</h2>
            <p className="text-gray-400 mb-6">
              Desktop only: Move your cursor over the text to see proximity-based shimmer
            </p>
          </div>

          <div className="text-center">
            <TextShimmer className="text-4xl font-bold">
              We give form to potential
            </TextShimmer>
          </div>
        </section>

        {/* Gyroscope Parallax Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Gyroscope Parallax</h2>
            <p className="text-gray-400 mb-6">
              Mobile only: Tilt your device to see parallax movement with ambient light
            </p>
          </div>

          <GyroscopeParallax intensity={1} ambientLight>
            <NeuCard className="text-center p-12">
              <h3 className="text-2xl font-bold mb-4">Tilt Me!</h3>
              <p className="text-gray-300">
                On mobile devices, tilting will create a subtle parallax effect
                with dynamic ambient lighting
              </p>
            </NeuCard>
          </GyroscopeParallax>
        </section>

        {/* Touch Ripple Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Touch Ripple</h2>
            <p className="text-gray-400 mb-6">
              Click or tap anywhere on these elements to see the ripple effect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeuCard className="p-12 text-center cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Click Me</h3>
              <p className="text-gray-400">Ripple effect on buttons</p>
            </NeuCard>

            <NeuCard className="p-12 text-center cursor-pointer" accent>
              <h3 className="text-xl font-bold mb-2">Touch Me</h3>
              <p className="text-gray-400">Works on mobile too</p>
            </NeuCard>
          </div>
        </section>

        {/* Cursor Trail Info */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Cursor Trail</h2>
            <p className="text-gray-400 mb-6">
              Desktop only: The subtle teal particles following your cursor are always active
            </p>
          </div>

          <NeuCard className="p-8 text-center">
            <p className="text-lg text-gray-300">
              Move your mouse around the screen to see the particle trail effect.
              It's subtle and respects your system's motion preferences.
            </p>
          </NeuCard>
        </section>

        {/* Breathing Noise Info */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Breathing Background Noise</h2>
            <p className="text-gray-400 mb-6">
              An ultra-subtle animated grain texture adds organic life to the background
            </p>
          </div>

          <NeuCard className="p-8 text-center">
            <p className="text-lg text-gray-300">
              This effect is always active but almost imperceptible.
              It creates a sense of depth and warmth through subtle movement.
            </p>
          </NeuCard>
        </section>

        {/* Performance Notes */}
        <section className="space-y-8 pb-16">
          <div>
            <h2 className="text-3xl font-bold mb-2">Performance & Accessibility</h2>
          </div>

          <NeuCard className="p-8 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-teal-accent mb-2">
                Hardware Accelerated
              </h3>
              <p className="text-gray-300">
                All effects use GPU acceleration (transform3d, will-change) for smooth 60fps performance
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-teal-accent mb-2">
                Respects User Preferences
              </h3>
              <p className="text-gray-300">
                All animations respect <code className="text-teal-accent">prefers-reduced-motion</code> settings
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-teal-accent mb-2">
                Device Optimized
              </h3>
              <p className="text-gray-300">
                Desktop effects (cursor trail, magnetic) don't run on mobile. Mobile effects (gyroscope) only on devices
              </p>
            </div>
          </NeuCard>
        </section>
      </div>
    </main>
  )
}
