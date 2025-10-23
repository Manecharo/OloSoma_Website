import { redirect } from 'next/navigation'

/**
 * Studio Page - Redirects to homepage about section
 *
 * The main landing page now includes an integrated about section.
 * This page redirects users to the #about anchor on the homepage.
 */
export default function StudioPage() {
  redirect('/#about')
}
