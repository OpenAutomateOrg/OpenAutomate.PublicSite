# OpenAutomate.PublicSite

The public website for OpenAutomate, providing marketing content, documentation, and access to the Orchestrator application.

## Overview

This repository contains the public-facing website for OpenAutomate, accessible at `openautomate.me`. This site is separate from the Orchestrator application (`cloud.openautomate.me`) and contains no authenticated functionality.

## Key Features

- Marketing landing pages
- Documentation
- About and contact information
- "Launch Orchestrator" button that redirects to the Orchestrator application

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/OpenAutomate.PublicSite.git
   cd OpenAutomate.PublicSite
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with the following configuration:
   ```
   # Location of the Orchestrator application
   NEXT_PUBLIC_ORCHESTRATOR_URL=http://localhost:3001
   
   # Public API URL (if needed)
   NEXT_PUBLIC_API_URL=http://localhost:5252
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The site will be available at [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Redirect Loop Issues

If you experience "too many redirects" errors or redirect loops:

1. **Clear browser cache and cookies completely**:
   - This is critical! Previous auth tokens may be causing loops
   - In Chrome, go to Settings > Clear browsing data > Select "Cookies and other site data" + "Cached images and files"
   - In Firefox, go to Options > Privacy & Security > Clear Data > Select "Cookies and Site Data" + "Cached Web Content"

2. **Check your Next.js configuration**:
   - Ensure in `next.config.ts` that:
     - No route is redirecting to itself (e.g., `/` to `/`)
     - All redirects are using `permanent: false` to prevent browser caching
     - No conflicting redirect rules exist (like `/` redirecting to multiple places)

3. **Environment Variables**:
   - Verify you have a `.env.local` file with proper configuration
   - Restart the Next.js server after creating/modifying environment files

4. **Delete and Rebuild**:
   ```bash
   # Remove cached build files
   rm -rf .next
   # Rebuild the application
   npm run dev
   ```

5. **Use Incognito/Private Browsing**:
   - Try accessing the site in an incognito window to avoid existing cookies/cache

If issues persist after these steps, look for circular redirects between your application and the orchestrator application or check for cross-domain cookie issues.

## Project Structure

```
OpenAutomate.PublicSite/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   │   ├── (guest)/     # Guest-accessible routes
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page with landing content
│   ├── components/      # React components
│   │   ├── layout/      # Layout components
│   │   │   ├── header.tsx       # Site header with navigation
│   │   │   ├── footer.tsx       # Site footer
│   │   │   ├── main-nav.tsx     # Main navigation for desktop
│   │   │   └── mobile-nav.tsx   # Mobile navigation menu
│   │   ├── ui/          # UI components from shadcn/ui
│   │   ├── launch-button.tsx    # Button to launch orchestrator
│   │   └── theme-toggle.tsx     # Dark/light mode toggle
│   ├── lib/             # Utility functions and configuration
│   │   ├── api/         # Simple API client (no auth)
│   │   ├── utils/       # Utility functions
│   │   └── config.ts    # App configuration
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript type definitions
├── .env.development     # Development environment variables
├── .env.production      # Production environment variables
└── next.config.ts       # Next.js configuration with redirect rules
```

## Deployment

The website is configured for deployment to any static hosting provider or serverless platform. For production deployment:

1. Build the production version:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the output to your hosting provider.

## Relationship with Orchestrator Application

This application is designed to work alongside the OpenAutomate Orchestrator application but is completely independent. The only connection between the two is the "Launch Orchestrator" button that redirects users to the Orchestrator application.

## License

[MIT](LICENSE)
