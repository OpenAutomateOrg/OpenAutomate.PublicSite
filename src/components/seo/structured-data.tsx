/**
 * Structured Data component for injecting JSON-LD schema markup
 */

import Script from 'next/script'

interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/**
 * Component to inject structured data (JSON-LD) into the page head
 */
export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data]

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd),
      }}
    />
  )
}

/**
 * Multiple structured data schemas component
 */
interface MultipleStructuredDataProps {
  schemas: Array<Record<string, unknown>>
}

export function MultipleStructuredData({ schemas }: MultipleStructuredDataProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}
