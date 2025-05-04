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
      'Accept': 'application/json'
    }
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
      guides: '/guide',
      contact: '/contact'
    }
  }
} 