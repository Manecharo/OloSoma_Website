# OloSoma Website - Implementation Guide

This guide will walk you through building the complete OloSoma website from the current foundation.

## Current Status ✅

- ✅ Next.js 15 project initialized
- ✅ TypeScript configured
- ✅ Tailwind CSS set up with neomorphic design system
- ✅ Global styles with custom CSS components
- ✅ Dependencies installed (Framer Motion, GSAP, React Hook Form, Zod, Resend)
- ✅ Development server running at http://localhost:3000
- ✅ Basic test page with neomorphic buttons

## Phase 1: Component Library (Week 1)

### Step 1.1: Create Motion Wrapper Components

Create `components/animations/MotionWrapper.tsx`:

```tsx
'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef, ElementType } from 'react'

export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionButton = motion.button

// Reusable animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
```

### Step 1.2: Create Button Component

Create `components/ui/NeuButton.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes } from 'react'

interface NeuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function NeuButton({
  variant = 'primary',
  children,
  className = '',
  ...props
}: NeuButtonProps) {
  return (
    <motion.button
      className={`neu-button neu-button-${variant} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
```

### Step 1.3: Create Card Component

Create `components/ui/NeuCard.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NeuCardProps {
  children: ReactNode
  hover?: boolean
  className?: string
}

export function NeuCard({ children, hover = true, className = '' }: NeuCardProps) {
  return (
    <motion.div
      className={`neu-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### Step 1.4: Create Form Input Components

Create `components/ui/NeuInput.tsx`:

```tsx
'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface NeuInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const NeuInput = forwardRef<HTMLInputElement, NeuInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="neu-input-group">
        {label && (
          <label className="neu-input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`neu-input ${error ? 'neu-input-error' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="neu-input-error-text">{error}</span>
        )}
      </div>
    )
  }
)

NeuInput.displayName = 'NeuInput'
```

## Phase 2: Homepage (Week 2-3)

### Step 2.1: Create Hero Section

Create `components/features/hero/Hero.tsx`:

```tsx
'use client'

import { MotionDiv, MotionH1, fadeInUp } from '@/components/animations/MotionWrapper'
import { NeuButton } from '@/components/ui/NeuButton'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <MotionDiv
        className="container-custom text-center z-10"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {/* Animated logo placeholder - will add SVG morph later */}
        <MotionDiv
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-32 h-32 mx-auto neu-card rounded-full flex items-center justify-center">
            <span className="text-4xl text-teal-accent">∞</span>
          </div>
        </MotionDiv>

        <MotionH1
          className="text-6xl md:text-7xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We give form to potential.
        </MotionH1>

        <MotionDiv
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="mb-4">
            A global design consultancy where soft logic meets real form—
          </p>
          <p>
            transforming the invisible into integrated experiences.
          </p>
        </MotionDiv>

        <MotionDiv
          className="flex gap-4 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <NeuButton variant="primary">
            → Discover how
          </NeuButton>
        </MotionDiv>
      </MotionDiv>
    </section>
  )
}
```

### Step 2.2: Create Philosophy Block

Create `components/features/philosophy/Philosophy.tsx`:

```tsx
'use client'

import { MotionDiv } from '@/components/animations/MotionWrapper'

export function Philosophy() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Olo */}
          <MotionDiv
            className="text-center p-12 rounded-3xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(98,191,164,0.1), transparent)'
            }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gradient-teal mb-6">olo</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              The unseen—pure thought,
              <br />
              strategy, and possibility
              <br />
              waiting to be realized.
            </p>
          </MotionDiv>

          {/* Soma */}
          <MotionDiv
            className="neu-card text-center p-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">soma</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              The tangible—experience,
              <br />
              interface, and space made
              <br />
              real through design.
            </p>
          </MotionDiv>
        </div>

        <MotionDiv
          className="text-center mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-6">
            This is transformation by design.
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Where European luxury hospitality meets Latin American product innovation.
            <br />
            Where the Middle East's grand vision meets Asia's rapid prototyping.
            <br /><br />
            We operate at the intersection of spatial design, digital product strategy,
            <br />
            and cultural intelligence.
          </p>
        </MotionDiv>
      </div>
    </section>
  )
}
```

### Step 2.3: Create Services Section

Create `components/features/services/ServicesSection.tsx`:

```tsx
'use client'

import { NeuCard } from '@/components/ui/NeuCard'
import { NeuButton } from '@/components/ui/NeuButton'
import Link from 'next/link'

const services = [
  {
    title: 'oloPulse™',
    subtitle: 'Strategy & Vision',
    tagline: 'Where potential finds its path',
    description: 'From spark to blueprint—we define scope, map strategic direction, and chart the journey from concept to integrated reality.',
    href: '/services/olopulse',
  },
  {
    title: 'somaWeave™',
    subtitle: 'Experience Design',
    tagline: 'Where worlds become seamless',
    description: 'We design the convergence—where physical spaces, digital interfaces, and service flows unite into one breathing system.',
    href: '/services/somaweave',
  },
  {
    title: 'somaForge™',
    subtitle: 'Form & Identity',
    tagline: 'Where ideas take shape',
    description: 'From prototype to presence—we materialize your vision with tangible form, sensorial identity, and iterative precision.',
    href: '/services/somaforge',
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-dark-elevated/30">
      <div className="container-custom">
        <h2 className="text-5xl font-bold text-center mb-16">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <NeuCard key={service.title}>
              <div className="neu-card-header">
                <h3 className="text-2xl font-bold text-teal-accent">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-300 mt-1">{service.subtitle}</p>
              </div>

              <p className="text-sm font-semibold text-teal-accent/80 mb-4 uppercase tracking-wider">
                {service.tagline}
              </p>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <Link href={service.href}>
                <NeuButton variant="secondary" className="w-full">
                  → Explore {service.title.split('™')[0]}
                </NeuButton>
              </Link>
            </NeuCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Step 2.4: Update Homepage

Update `app/page.tsx`:

```tsx
import { Hero } from '@/components/features/hero/Hero'
import { Philosophy } from '@/components/features/philosophy/Philosophy'
import { ServicesSection } from '@/components/features/services/ServicesSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <ServicesSection />
      {/* More sections to be added */}
    </main>
  )
}
```

## Phase 3: Service Pages (Week 3-4)

### Step 3.1: Create Service Page Layout

Create `app/services/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { NeuCard } from '@/components/ui/NeuCard'
import { NeuButton } from '@/components/ui/NeuButton'
import Link from 'next/link'

const services = {
  olopulse: {
    title: 'oloPulse™',
    subtitle: 'Strategy & Vision',
    tagline: 'Where potential finds its path',
    description: 'The ignition moment—where ambition meets strategic clarity...',
    // ... rest of content from your brief
  },
  // Add somaweave and somaforge similarly
}

export async function generateStaticParams() {
  return [
    { slug: 'olopulse' },
    { slug: 'somaweave' },
    { slug: 'somaforge' },
  ]
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen py-24">
      <div className="container-custom">
        {/* Service content */}
      </div>
    </main>
  )
}
```

## Phase 4: Contact Page (Week 4)

### Step 4.1: Create Contact Form with Server Action

Create `app/actions/contact.ts`:

```tsx
'use server'

import { z } from 'zod'
import { Resend } from 'resend'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function submitContactForm(formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    // Send email with Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'contact@olosoma.com',
      to: 'hello@olosoma.com',
      subject: `New contact from ${validatedFields.data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedFields.data.name}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        <p><strong>Company:</strong> ${validatedFields.data.company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedFields.data.message}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      errors: { _form: ['Failed to send message. Please try again.'] },
    }
  }
}
```

### Step 4.2: Create Contact Form Component

Create `components/features/contact/ContactForm.tsx`:

```tsx
'use client'

import { useState, useTransition } from 'react'
import { NeuInput } from '@/components/ui/NeuInput'
import { NeuButton } from '@/components/ui/NeuButton'
import { submitContactForm } from '@/app/actions/contact'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setErrors({})
    setSuccess(false)

    startTransition(async () => {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSuccess(true)
        // Reset form
        const form = document.getElementById('contact-form') as HTMLFormElement
        form?.reset()
      } else if (result.errors) {
        setErrors(result.errors)
      }
    })
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-6">
      <NeuInput
        name="name"
        label="Your Name *"
        placeholder="John Doe"
        required
        error={errors.name?.[0]}
      />

      <NeuInput
        name="email"
        type="email"
        label="Your Email *"
        placeholder="john@example.com"
        required
        error={errors.email?.[0]}
      />

      <NeuInput
        name="company"
        label="Company / Project"
        placeholder="Your company name"
        error={errors.company?.[0]}
      />

      <div className="neu-input-group">
        <label className="neu-input-label">Tell us about your vision *</label>
        <textarea
          name="message"
          className="neu-textarea"
          placeholder="Your message..."
          required
          rows={6}
        />
        {errors.message && (
          <span className="neu-input-error-text">{errors.message[0]}</span>
        )}
      </div>

      {success && (
        <div className="p-4 rounded-lg bg-teal-accent/20 border border-teal-accent/40">
          <p className="text-teal-accent font-semibold">
            Thank you! We'll be in touch soon.
          </p>
        </div>
      )}

      {errors._form && (
        <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/40">
          <p className="text-red-400">{errors._form[0]}</p>
        </div>
      )}

      <NeuButton
        type="submit"
        variant="primary"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? 'Sending...' : '→ Connect with us'}
      </NeuButton>
    </form>
  )
}
```

## Phase 5: Deployment (Week 5)

### Step 5.1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: OloSoma website foundation"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/olosoma-website.git
git push -u origin main
```

### Step 5.2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `RESEND_API_KEY`
   - Any other variables from `.env.local`
5. Click "Deploy"

### Step 5.3: Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `olosoma.com`)
3. Update DNS records as instructed by Vercel
4. Wait for SSL certificate provisioning

## Next Steps

1. **Add Remaining Homepage Sections**:
   - Dual Vision (founders profiles)
   - Trust Indicators (logo carousel)
   - Closing CTA

2. **Implement Advanced Animations**:
   - Logo morph with SVG animation
   - GSAP scroll parallax effects
   - Cursor halo on desktop

3. **Add Sanity CMS** (for future case studies):
   - Set up Sanity project
   - Configure schemas
   - Integrate with Next.js

4. **Performance Optimization**:
   - Run Lighthouse audit
   - Optimize images
   - Add loading states
   - Implement lazy loading

5. **Testing**:
   - Cross-browser testing
   - Mobile responsiveness
   - Form validation
   - Accessibility audit

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [GSAP Documentation](https://gsap.com/docs/)
- [Sanity Documentation](https://www.sanity.io/docs)

---

**Remember**: The development server is running at http://localhost:3000. Make changes and see them update in real-time!
