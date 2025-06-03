/**
 * Layout for About page with SEO metadata
 */

import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About OpenAutomate - Open Source Automation Platform',
  description: 'Learn about OpenAutomate\'s mission to democratize automation technology through open-source solutions. Discover our story, values, and commitment to providing cost-effective automation alternatives.',
  keywords: [
    'about OpenAutomate',
    'open source automation company',
    'automation platform story',
    'business process automation mission',
    'Python automation platform',
    'automation software company'
  ],
  url: '/about',
  type: 'website'
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
