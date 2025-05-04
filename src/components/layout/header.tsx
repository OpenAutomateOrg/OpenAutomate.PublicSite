'use client'

import Link from 'next/link'
import { MainNav } from '@/components/layout/main-nav'
import { MobileNav } from '@/components/layout/mobile-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { LaunchButton } from '@/components/launch-button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-orange-600">OpenAutomate</span>
        </Link>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <MainNav />
        </div>
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <LaunchButton 
              variant="outline" 
              size="sm" 
              className="transition-all duration-300 hover:translate-y-[-2px]"
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
