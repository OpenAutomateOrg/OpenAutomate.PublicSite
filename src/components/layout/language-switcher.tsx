'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Check } from 'lucide-react'

const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Tiếng Việt' },
] as const

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  // Try to detect the active locale from the first URL segment
  const currentLocale =
    LOCALES.find((locale) => pathname.startsWith(`/${locale.code}`))?.code ?? LOCALES[0].code

  function handleLanguageChange(newLocale: string) {
    // Don't do anything if it's the same locale
    if (newLocale === currentLocale) return

    // Strip the current locale from the path so we can prepend the new one
    const withoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    router.push(`/${newLocale}${withoutLocale}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-5 w-5 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLanguageChange(locale.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{locale.name}</span>
            {currentLocale === locale.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
