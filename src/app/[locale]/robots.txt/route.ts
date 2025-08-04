/**
 * Dynamic robots.txt generation
 * This creates a robots.txt file that search engines can access
 */

import { config } from '@/lib/config'

export function GET() {
  const siteUrl = config.seo.site.url

  const robotsTxt = `# Robots.txt for ${config.seo.site.name}
# Generated automatically

User-agent: *
Allow: /

# Disallow admin and private areas (if any in the future)
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important files
Allow: /favicon.ico
Allow: /logo-oa.png
Allow: /*.css
Allow: /*.js

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl delay (optional - be respectful to search engines)
Crawl-delay: 1

# Specific rules for major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Block common bad bots (optional)
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}
