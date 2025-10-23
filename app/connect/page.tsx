import { redirect } from 'next/navigation'

/**
 * Connect Page - Redirects to homepage contact section
 *
 * The main landing page now includes an integrated contact section.
 * This page redirects users to the #connect anchor on the homepage.
 */
export default function ConnectPage() {
  redirect('/#connect')
}
