import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Public Website Configuration */
  
  // Static export for optimal CDN caching (optional, depends on deployment strategy)
  // output: 'export',
  
  // Disable dev indicators in development
  devIndicators: false,
  
  // Optimize webpack configuration to prevent caching issues
  webpack: (config, { dev, isServer }) => {
    // Disable webpack caching in development to prevent memory issues
    if (dev) {
      config.cache = false
    }
    
    return config
  },
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.openautomate.me',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Only redirect auth-related paths to the orchestrator
  // All other paths stay on the public site
  async redirects() {
    const orchestratorUrl = process.env.NEXT_PUBLIC_ORCHESTRATOR_URL || 'http://localhost:3001';
    
    return [
      // Auth-related redirects to orchestrator
      {
        source: '/login',
        destination: `${orchestratorUrl}/login`,
        permanent: false, // Using temporary redirects to prevent browser caching
      },
      {
        source: '/register',
        destination: `${orchestratorUrl}/register`,
        permanent: false,
      },
      {
        source: '/verification-pending',
        destination: `${orchestratorUrl}/verification-pending`,
        permanent: false,
      },
      {
        source: '/email-verified',
        destination: `${orchestratorUrl}/email-verified`,
        permanent: false,
      },
    ]
  },
  
  // Security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ]
  },
}

export default nextConfig
