/**
 * SEO-optimized breadcrumb navigation component
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateBreadcrumbSchema } from '@/lib/seo'
import { StructuredData } from './structured-data'

interface BreadcrumbItem {
  name: string
  url: string
  isCurrentPage?: boolean
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  showHome?: boolean
  homeLabel?: string
}

/**
 * Generate breadcrumb items from pathname
 */
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  // Add home
  breadcrumbs.push({
    name: 'Home',
    url: '/',
  })

  // Build breadcrumbs from path segments
  let currentPath = ''
  paths.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Convert segment to readable name
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Handle specific routes
    switch (segment) {
      case 'about':
        name = 'About Us'
        break
      case 'guide':
        name = 'Guides'
        break
      case 'contact':
        name = 'Contact Us'
        break
    }

    breadcrumbs.push({
      name,
      url: currentPath,
      isCurrentPage: index === paths.length - 1,
    })
  })

  return breadcrumbs
}

/**
 * SEO-optimized breadcrumb navigation component
 */
export function Breadcrumbs({
  items,
  className,
  showHome = true,
  homeLabel = 'Home',
}: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Use provided items or generate from pathname
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname)
  
  // Filter out home if not wanted
  const displayItems = showHome 
    ? breadcrumbItems 
    : breadcrumbItems.filter(item => item.url !== '/')

  // Don't show breadcrumbs on home page unless explicitly provided
  if (pathname === '/' && !items) {
    return null
  }

  // Generate structured data for breadcrumbs
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map(item => ({
      name: item.name,
      url: item.url,
    }))
  )

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <nav
        aria-label="Breadcrumb navigation"
        className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
      >
        <ol className="flex items-center space-x-1">
          {displayItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  className="h-4 w-4 mx-1 text-muted-foreground/60" 
                  aria-hidden="true"
                />
              )}
              
              {item.isCurrentPage ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 rounded-sm px-1"
                  aria-label={index === 0 && item.url === '/' ? `Go to ${homeLabel}` : `Go to ${item.name}`}
                >
                  {index === 0 && item.url === '/' && showHome ? (
                    <span className="flex items-center">
                      <Home className="h-4 w-4 mr-1" aria-hidden="true" />
                      {homeLabel}
                    </span>
                  ) : (
                    item.name
                  )}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

/**
 * Simple breadcrumb component for specific use cases
 */
interface SimpleBreadcrumbsProps {
  items: Array<{ label: string; href?: string }>
  className?: string
}

export function SimpleBreadcrumbs({ items, className }: SimpleBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
    >
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight 
                className="h-4 w-4 mx-1 text-muted-foreground/60" 
                aria-hidden="true"
              />
            )}
            
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 rounded-sm px-1"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className="font-medium text-foreground"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
