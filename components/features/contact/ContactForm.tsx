'use client'

import { useActionState, useFormStatus } from 'react-dom'
import { NeuInput, NeuTextarea } from '@/components/ui/NeuInput'
import { NeuButton } from '@/components/ui/NeuButton'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'
import { useEffect, useRef } from 'react'
import { MotionDiv } from '@/components/animations/MotionWrapper'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <NeuButton
      type="submit"
      variant="primary"
      disabled={pending}
      className="w-full"
    >
      {pending ? 'Sending...' : '→ Connect with us'}
    </NeuButton>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(
    submitContactForm,
    null
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state?.success])

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form ref={formRef} action={formAction} className="space-y-6">
        <NeuInput
          name="name"
          label="Your Name *"
          placeholder="John Doe"
          required
          error={state?.errors?.name?.[0]}
        />

        <NeuInput
          name="email"
          type="email"
          label="Your Email *"
          placeholder="john@example.com"
          required
          error={state?.errors?.email?.[0]}
        />

        <NeuInput
          name="company"
          label="Company / Project"
          placeholder="Your company name (optional)"
          error={state?.errors?.company?.[0]}
        />

        <NeuTextarea
          name="message"
          label="Tell us about your vision *"
          placeholder="Share your project details, goals, and timeline..."
          required
          rows={6}
          error={state?.errors?.message?.[0]}
        />

        {/* Success Message */}
        {state?.success && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-lg bg-teal-accent/20 border border-teal-accent/40"
          >
            <p className="text-teal-accent font-semibold">
              ✓ Thank you! We'll be in touch within 24 hours.
            </p>
          </MotionDiv>
        )}

        {/* Error Message */}
        {state?.errors?._form && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-lg bg-red-500/20 border border-red-500/40"
          >
            <p className="text-red-400">{state.errors._form[0]}</p>
          </MotionDiv>
        )}

        <SubmitButton />

        <p className="text-sm text-gray-500 text-center">
          We typically respond within 24 hours. For urgent inquiries, please email{' '}
          <a href="mailto:hello@olosoma.com" className="text-teal-accent hover:underline">
            hello@olosoma.com
          </a>
        </p>
      </form>
    </MotionDiv>
  )
}
