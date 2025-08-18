'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LaunchButton } from '@/components/launch-button'
import { Menu } from 'lucide-react'
import { config } from '@/lib/config'

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  // Navigation items for mobile menu
  const navItems = [
    {
      title: 'About Us',
      href: config.paths.pages.about,
      icon: <Icons.about className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Documentation',
      href: 'https://docs.openautomate.io',
      icon: <Icons.guide className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Contact Us',
      href: config.paths.pages.contact,
      icon: <Icons.contact className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center text-lg font-bold hover:text-orange-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            OpenAutomate
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <nav className="flex flex-col space-y-2">
              {navItems.map(({ title, href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                    pathname === href
                      ? 'bg-orange-600/10 text-orange-600'
                      : 'hover:bg-orange-600/10 hover:text-orange-600',
                  )}
                >
                  {icon}
                  {title}
                </Link>
              ))}
              <div className="mt-4">
                <LaunchButton
                  className="w-full justify-center bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                  size="default"
                />
              </div>
            </nav>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
