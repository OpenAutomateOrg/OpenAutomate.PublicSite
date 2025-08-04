'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { config } from '@/lib/config'
import { useTranslations } from 'next-intl'

type MainNavProps = HTMLAttributes<HTMLDivElement>

export function MainNav({ ...props }: MainNavProps) {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const navItems = [
    {
      title: t('about'),
      href: config.paths.pages.about,
    },
    {
      title: t('guides'),
      href: config.paths.pages.guides,
    },
    {
      title: t('contact'),
      href: config.paths.pages.contact,
    },
  ]

  return (
    <div className="mr-4 hidden md:flex" {...props}>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navItems.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'relative px-2 py-1.5 transition-all duration-200 text-white hover:text-orange-600',
              pathname === href
                ? ' font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-orange-600 after:rounded-full'
                : 'text-white/80 hover:text-orange-600',
            )}
          >
            {title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
