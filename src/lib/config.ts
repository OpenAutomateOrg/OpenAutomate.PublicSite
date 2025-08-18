/**
 * Central configuration settings for the public website
 * Makes configuration values accessible throughout the app
 * No auth or redirect functionality
 */

export const config = {
  /**
   * Application information
   */
  app: {
    /**
     * Application name
     */
    name: 'OpenAutomate',

    /**
     * The orchestrator URL to redirect to
     */
    orchestratorUrl: process.env.NEXT_PUBLIC_ORCHESTRATOR_URL || 'http://localhost:3001',
  },

  /**
   * API configuration
   */
  api: {
    /**
     * Base URL for API requests
     */
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5252',

    /**
     * Default headers for API requests
     */
    defaultHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },

  /**
   * URL paths for the public website
   */
  paths: {
    /**
     * Page paths
     */
    pages: {
      home: '/',
      about: '/about',
      contact: '/contact',
    },
  },

  /**
   * SEO configuration
   */
  seo: {
    /**
     * Site information
     */
    site: {
      name: 'OpenAutomate',
      title: 'OpenAutomate - Open Source Business Process Automation',
      description:
        'OpenAutomate provides a Python-based, open-source alternative to commercial automation platforms. Take control of your automation processes without licensing costs.',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.openautomate.io',
      logo: '/logo-oa.png',
      favicon: '/favicon.ico',
    },

    /**
     * Organization information for structured data
     */
    organization: {
      name: 'OpenAutomate',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.openautomate.io',
      logo: '/logo-oa.png',
      description: 'Open source business process automation platform',
      foundingDate: '2024',
      industry: 'Software Development',
      contactPoint: {
        telephone: '',
        contactType: 'customer service',
        email: 'contact@openautomate.io',
      },
      sameAs: [
        // Add social media URLs when available
      ],
    },

    /**
     * Default meta tags
     */
    defaultMeta: {
      keywords: [
        'business process automation',
        'open source automation',
        'Python automation',
        'workflow automation',
        'RPA alternative',
        'automation platform',
        'process automation',
        'business automation',
        'open source RPA',
        'automation software',
      ],
      author: 'OpenAutomate Team',
      robots: 'index, follow',
      language: 'en',
      charset: 'utf-8',
    },

    /**
     * Social media configuration
     */
    social: {
      twitter: {
        handle: '@openautomate',
        site: '@openautomate',
        creator: '@openautomate',
      },
    },
  },
}
