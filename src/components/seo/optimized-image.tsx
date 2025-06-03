/**
 * SEO-optimized image component with proper alt tags, lazy loading, and performance optimizations
 */

'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

/**
 * SEO-optimized image component with lazy loading and proper alt text
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

  if (hasError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          aria-hidden="true"
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        // SEO and accessibility attributes
        itemProp="image"
        decoding="async"
      />
    </div>
  )
}

/**
 * Hero image component with specific optimizations for above-the-fold content
 */
interface HeroImageProps extends Omit<OptimizedImageProps, 'priority' | 'loading'> {
  heroAlt: string
}

export function HeroImage({ heroAlt, ...props }: HeroImageProps) {
  return (
    <OptimizedImage
      {...props}
      alt={heroAlt}
      priority={true}
      loading="eager"
      quality={90}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}

/**
 * Logo image component with specific optimizations
 */
interface LogoImageProps extends Omit<OptimizedImageProps, 'alt'> {
  companyName: string
}

export function LogoImage({ companyName, ...props }: LogoImageProps) {
  return (
    <OptimizedImage
      {...props}
      alt={`${companyName} logo`}
      priority={true}
      loading="eager"
      quality={95}
    />
  )
}

/**
 * Avatar image component with fallback
 */
interface AvatarImageProps extends Omit<OptimizedImageProps, 'alt'> {
  name: string
  fallbackInitials?: string
}

export function AvatarImage({ name, fallbackInitials, className, ...props }: AvatarImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError && fallbackInitials) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-orange-600 text-white font-medium rounded-full',
          className
        )}
        role="img"
        aria-label={`${name} avatar`}
      >
        {fallbackInitials}
      </div>
    )
  }

  return (
    <OptimizedImage
      {...props}
      alt={`${name} avatar`}
      className={cn('rounded-full', className)}
      onError={() => setHasError(true)}
    />
  )
}
