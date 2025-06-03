/**
 * Layout for Contact page with SEO metadata
 */

import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact OpenAutomate - Get in Touch',
  description: 'Contact OpenAutomate for questions about our open-source automation platform, implementation support, or partnership opportunities. We\'re here to help with your automation needs.',
  keywords: [
    'contact OpenAutomate',
    'automation support',
    'business automation help',
    'OpenAutomate contact',
    'automation consultation',
    'open source automation support'
  ],
  url: '/contact',
  type: 'website'
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
