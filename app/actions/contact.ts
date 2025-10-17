'use server'

import { z } from 'zod'

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormState = {
  success: boolean
  errors?: {
    name?: string[]
    email?: string[]
    company?: string[]
    message?: string[]
    _form?: string[]
  }
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  // Validate form data
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

  const { name, email, company, message } = validatedFields.data

  try {
    // TODO: Integrate with Resend when API key is available
    // For now, just log to console
    console.log('Contact form submission:', {
      name,
      email,
      company: company || 'Not provided',
      message,
      submittedAt: new Date().toISOString(),
    })

    // Simulate email sending
    // When ready, uncomment and configure:
    /*
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'contact@olosoma.com',
      to: 'hello@olosoma.com',
      subject: `New contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    */

    return { success: true }
  } catch (error) {
    console.error('Failed to send contact form:', error)
    return {
      success: false,
      errors: {
        _form: ['Failed to send message. Please try again later.'],
      },
    }
  }
}
