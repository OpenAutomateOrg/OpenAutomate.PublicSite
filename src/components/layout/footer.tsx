'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  const platformLinks = [
    { label: t('links.platform.pricing'), href: '/pricing' },
    { label: t('links.platform.docs'), href: '/docs.openautomate.io' },
  ]

  const resourceLinks = [
    { label: t('links.resources.community'), href: 'https://discord.gg/hPt44QfY4B' },
    { label: t('links.resources.support'), href: '/support' },
  ]

  const companyLinks = [
    { label: t('links.company.about'), href: '/about' },
    { label: t('links.company.contact'), href: '/contact' },
    { label: 'GitHub', href: 'https://github.com/OpenAutomateOrg' }, // GitHub brand left untranslated
  ]

  const policyLinks = [
    { label: t('policies.terms'), href: '/terms' },
    { label: t('policies.privacy'), href: '/privacy' },
    { label: t('policies.cookies'), href: '/cookies' },
  ]

  const Column = ({
    title,
    links,
  }: {
    title: string
    links: { label: string; href: string }[]
  }) => (
    <div>
      <h4 className="mb-4 font-bold  text-lg ">{title}</h4>
      <ul className="space-y-2 ">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-muted-foreground hover:text-orange-600 transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="bg-neutral-200 py-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 text-orange-600  lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">{t('brand')}</h3>
            <p className="text-muted-foreground mb-4">{t('tagline')}</p>
          </div>

          <Column title={t('sections.platform')} links={platformLinks} />
          <Column title={t('sections.resources')} links={resourceLinks} />
          <Column title={t('sections.company')} links={companyLinks} />
        </div>

        <div className="border-t border-neutral-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">{t('copyright', { year })}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {policyLinks.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
