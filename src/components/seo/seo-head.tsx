/**
 * SEO Head component for additional meta tags and optimizations
 */

'use client'

import Head from 'next/head'
import { config } from '@/lib/config'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
  noindex?: boolean
  nofollow?: boolean
  canonical?: string
  alternateLanguages?: Array<{ hreflang: string; href: string }>
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

/**
 * Additional SEO head component for client-side meta tag management
 * Note: This is supplementary to the server-side metadata in layout files
 */
export function SEOHead({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  noindex = false,
  nofollow = false,
  canonical,
  alternateLanguages = [],
  jsonLd,
}: SEOHeadProps) {
  const siteConfig = config.seo.site
  const defaultMeta = config.seo.defaultMeta

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

  return (
    <Head>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={defaultMeta.author} />
      <meta name="robots" content={robots} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical || fullUrl} />

      {/* Alternate language versions */}
      {alternateLanguages.map((lang) => (
        <link key={lang.hreflang} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={config.seo.social.twitter.creator} />
      <meta name="twitter:site" content={config.seo.social.twitter.site} />

      {/* Additional meta tags */}
      <meta name="theme-color" content="#ea580c" />
      <meta name="msapplication-TileColor" content="#ea580c" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]),
          }}
        />
      )}
    </Head>
  )
}

/**
 * Simple meta tags component for basic pages
 */
interface SimpleMetaProps {
  title: string
  description: string
  keywords?: string[]
}

export function SimpleMeta({ title, description, keywords = [] }: SimpleMetaProps) {
  return <SEOHead title={title} description={description} keywords={keywords} />
}

/**
 * Article meta tags component
 */
interface ArticleMetaProps extends SEOHeadProps {
  publishedTime: string
  modifiedTime?: string
  author: string
  section?: string
  tags?: string[]
}

export function ArticleMeta({
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  ...props
}: ArticleMetaProps) {
  return (
    <>
      <SEOHead {...props} type="article" />
      <Head>
        <meta property="article:published_time" content={publishedTime} />
        {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        <meta property="article:author" content={author} />
        {section && <meta property="article:section" content={section} />}
        {tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Head>
    </>
  )
}
