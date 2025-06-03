/**
 * SEO Debug component for development - helps verify SEO implementation
 * Only shows in development mode
 */

'use client'

import { useEffect, useState } from 'react'

interface SEODebugInfo {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterCard: string
  structuredData: unknown[]
  headings: { level: number; text: string }[]
  images: { src: string; alt: string }[]
  internalLinks: { href: string; text: string }[]
}

/**
 * SEO Debug Panel - only visible in development
 */
export function SEODebugPanel() {
  const [debugInfo, setDebugInfo] = useState<SEODebugInfo | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const extractSEOInfo = (): SEODebugInfo => {
      // Extract meta tags
      const title = document.title
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || ''
      const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || ''
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || ''
      const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || ''

      // Extract structured data
      const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]')
      const structuredData = Array.from(structuredDataScripts).map(script => {
        try {
          return JSON.parse(script.textContent || '{}')
        } catch {
          return {}
        }
      })

      // Extract headings
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const headings = Array.from(headingElements).map(heading => ({
        level: parseInt(heading.tagName.charAt(1)),
        text: heading.textContent?.trim() || ''
      }))

      // Extract images
      const imageElements = document.querySelectorAll('img')
      const images = Array.from(imageElements).map(img => ({
        src: img.src,
        alt: img.alt || 'Missing alt text'
      }))

      // Extract internal links
      const linkElements = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]')
      const internalLinks = Array.from(linkElements).map(link => ({
        href: link.getAttribute('href') || '',
        text: link.textContent?.trim() || 'No text'
      }))

      return {
        title,
        description,
        canonical,
        ogTitle,
        ogDescription,
        ogImage,
        twitterCard,
        structuredData,
        headings,
        images,
        internalLinks
      }
    }

    // Extract info after page load
    const timer = setTimeout(() => {
      setDebugInfo(extractSEOInfo())
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (process.env.NODE_ENV !== 'development' || !debugInfo) {
    return null
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-orange-700 transition-colors"
        style={{ fontSize: '12px' }}
      >
        SEO Debug
      </button>

      {/* Debug panel */}
      {isVisible && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">SEO Debug Information</h2>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 text-sm">
                {/* Basic Meta Tags */}
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Basic Meta Tags</h3>
                  <div className="space-y-1 text-gray-700">
                    <div><strong>Title:</strong> {debugInfo.title}</div>
                    <div><strong>Description:</strong> {debugInfo.description}</div>
                    <div><strong>Canonical:</strong> {debugInfo.canonical}</div>
                  </div>
                </section>

                {/* Open Graph */}
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Open Graph</h3>
                  <div className="space-y-1 text-gray-700">
                    <div><strong>OG Title:</strong> {debugInfo.ogTitle}</div>
                    <div><strong>OG Description:</strong> {debugInfo.ogDescription}</div>
                    <div><strong>OG Image:</strong> {debugInfo.ogImage}</div>
                    <div><strong>Twitter Card:</strong> {debugInfo.twitterCard}</div>
                  </div>
                </section>

                {/* Structured Data */}
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Structured Data</h3>
                  <div className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                    <pre>{JSON.stringify(debugInfo.structuredData, null, 2)}</pre>
                  </div>
                </section>

                {/* Heading Structure */}
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Heading Structure</h3>
                  <div className="space-y-1 text-gray-700 max-h-40 overflow-auto">
                    {debugInfo.headings.map((heading, index) => (
                      <div key={index} style={{ marginLeft: `${(heading.level - 1) * 20}px` }}>
                        <strong>H{heading.level}:</strong> {heading.text}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Images */}
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Images ({debugInfo.images.length})</h3>
                  <div className="space-y-1 text-gray-700 max-h-40 overflow-auto">
                    {debugInfo.images.map((image, index) => (
                      <div key={index} className={image.alt === 'Missing alt text' ? 'text-red-600' : ''}>
                        <strong>Alt:</strong> {image.alt} <br />
                        <span className="text-xs text-gray-500">{image.src}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Internal Links */}
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">Internal Links ({debugInfo.internalLinks.length})</h3>
                  <div className="space-y-1 text-gray-700 max-h-40 overflow-auto">
                    {debugInfo.internalLinks.slice(0, 10).map((link, index) => (
                      <div key={index}>
                        <strong>{link.href}:</strong> {link.text}
                      </div>
                    ))}
                    {debugInfo.internalLinks.length > 10 && (
                      <div className="text-gray-500">... and {debugInfo.internalLinks.length - 10} more</div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
