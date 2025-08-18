'use client'

import Link from 'next/link'
import { MainNav } from '@/components/layout/main-nav'
import { MobileNav } from '@/components/layout/mobile-nav'
import { LaunchButton } from '@/components/launch-button'
import { LanguageSwitcher } from './language-switcher'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export function Header() {
  const t = useTranslations('common')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldBeScrolled = scrollTop > 50
      setIsScrolled(shouldBeScrolled)
    }

    // Check initial scroll position
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'fixed bg-black/90 backdrop-blur-md shadow-lg' : 'absolute bg-transparent '
      }`}
    >
      <div className="container p-0 flex h-16 items-center border-b border-neutral-800">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-orange-600">{t('appName')}</span>
        </Link>
        <div className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2">
          <MainNav />
        </div>
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher />
            <LaunchButton
              id="launchButton"
              variant="outline"
              size="sm"
              className="bg-transparent text-white duration-300 hover:bg-orange-600 hover:text-white hover:scale-102 hover:shadow-md"
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
