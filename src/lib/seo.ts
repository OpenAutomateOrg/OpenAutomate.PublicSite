/**
 * SEO utilities and helpers for generating metadata, structured data, and SEO-related content
 */

import { Metadata } from 'next'
import { config } from './config'

export interface SEOPageData {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  noindex?: boolean
  nofollow?: boolean
}

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(pageData: SEOPageData): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noindex = false,
    nofollow = false,
  } = pageData

  const siteConfig = config.seo.site
  const defaultMeta = config.seo.defaultMeta
  const socialConfig = config.seo.social

  // Construct full title
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title

  // Use provided description or default
  const metaDescription = description || siteConfig.description

  // Combine keywords
  const allKeywords = [...defaultMeta.keywords, ...keywords]

  // Construct full URL
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url

  // Construct image URL
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.logo}`

  // Robots directive
  const robots =
    noindex || nofollow
      ? `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`
      : defaultMeta.robots

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: allKeywords.join(', '),
    authors: [{ name: author || defaultMeta.author }],
    robots,
    alternates: {
      canonical: fullUrl,
    },

    // Open Graph
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: 'en_US',
      type: type as 'website' | 'article',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
      creator: socialConfig.twitter.creator,
      site: socialConfig.twitter.site,
    },

    // Additional meta tags
    other: {
      'theme-color': '#ea580c', // Orange-600
      'msapplication-TileColor': '#ea580c',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
    },
  }
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  const org = config.seo.organization
  const site = config.seo.site

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: `${site.url}${org.logo}`,
    description: org.description,
    foundingDate: org.foundingDate,
    industry: org.industry,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: org.contactPoint.telephone,
      contactType: org.contactPoint.contactType,
      email: org.contactPoint.email,
    },
    sameAs: org.sameAs,
  }
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema() {
  const site = config.seo.site

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: {
      '@type': 'Organization',
      name: config.seo.organization.name,
      url: config.seo.organization.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate JSON-LD structured data for software application
 */
export function generateSoftwareApplicationSchema() {
  const site = config.seo.site
  const org = config.seo.organization

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    description: site.description,
    url: site.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cross-platform',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Open source software - free to use',
    },
    author: {
      '@type': 'Organization',
      name: org.name,
      url: org.url,
    },
    softwareVersion: '1.0',
    releaseNotes: 'Open source business process automation platform',
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  const site = config.seo.site

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.url}`,
    })),
  }
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Utility to create canonical URL
 */
export function createCanonicalUrl(path: string): string {
  const site = config.seo.site
  return `${site.url}${path}`
}

/**
 * Utility to truncate description to optimal length
 */
export function truncateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description

  const truncated = description.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...'
}

/**
 * Generate sitemap URLs
 */
export function generateSitemapUrls() {
  const site = config.seo.site
  const pages = config.paths.pages

  return Object.entries(pages).map(([key, path]) => ({
    url: `${site.url}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: key === 'home' ? 'weekly' : 'monthly',
    priority: key === 'home' ? 1.0 : 0.8,
  }))
}
