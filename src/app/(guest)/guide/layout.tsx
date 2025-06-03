/**
 * Layout for Guide page with SEO metadata
 */

import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'OpenAutomate Guides - Learn Automation Best Practices',
  description: 'Comprehensive guides and documentation for OpenAutomate. Learn how to implement business process automation, best practices, and get started with our open-source platform.',
  keywords: [
    'OpenAutomate guides',
    'automation tutorials',
    'business process automation guide',
    'Python automation tutorial',
    'automation best practices',
    'open source automation documentation'
  ],
  url: '/guide',
  type: 'website'
})

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
