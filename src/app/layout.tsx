// layout.tsx - Root layout for the public website
// No auth providers or redirect-causing components
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { generateMetadata as generateSEOMetadata, generateOrganizationSchema, generateWebsiteSchema, generateSoftwareApplicationSchema } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/structured-data'
import { SEODebugPanel } from '@/components/seo/seo-debug'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

// Generate comprehensive metadata for the root layout
export const metadata: Metadata = generateSEOMetadata({
  title: 'OpenAutomate - Open Source Business Process Automation',
  description: 'OpenAutomate provides a Python-based, open-source alternative to commercial automation platforms. Take control of your automation processes without licensing costs.',
  keywords: [
    'business process automation',
    'open source automation',
    'Python automation',
    'workflow automation',
    'RPA alternative',
    'automation platform'
  ],
  url: '/',
  type: 'website'
})

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Generate structured data schemas
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()
  const softwareSchema = generateSoftwareApplicationSchema()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <MultipleStructuredData schemas={[organizationSchema, websiteSchema, softwareSchema]} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col antialiased bg-background">{children}</div>
          <SEODebugPanel />
        </ThemeProvider>
      </body>
    </html>
  )
}
