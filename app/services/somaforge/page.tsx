import { redirect } from 'next/navigation'

/**
 * Service Page - Redirects to homepage services section
 *
 * The main landing page now includes an integrated services section.
 * This page redirects users to the #services anchor on the homepage.
 */
export default function ServicePage() {
  redirect('/#services')
}
