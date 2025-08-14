'use client'

import type React from 'react'
import type { StaticImageData } from 'next/image'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { config } from '@/lib/config'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import TeamMember from '@/components/aboutUs/teamMember'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import ChinhHD from '../../../../../public/images/ChinhHD.jpg'
import HoaiNX from '../../../../../public/images/HoaiNX.jpg'
import NhatPH from '../../../../../public/images/NhatPH.jpg'
import HungTVK from '../../../../../public/images/HungTVK.jpg'

gsap.registerPlugin(ScrollTrigger)

interface TeamMember {
  name: string
  role: string
  image: StaticImageData
}

// Create a default avatar StaticImageData object
const defaultAvatar: StaticImageData = {
  src: '/images/default-avatar.jpg',
  height: 400,
  width: 400,
}

export default function AboutPage() {
  const t = useTranslations('aboutUs')
  const gridRef = useRef<HTMLDivElement>(null)

  const teamMembers: TeamMember[] = [
    {
      name: t('team.longNX.name'),
      role: t('team.longNX.role'),
      image: defaultAvatar,
    },
    {
      name: t('team.hoaiNX.name'),
      role: t('team.hoaiNX.role'),
      image: HoaiNX,
    },
    {
      name: t('team.nhatPH.name'),
      role: t('team.nhatPH.role'),
      image: NhatPH,
    },
    {
      name: t('team.hungTVK.name'),
      role: t('team.hungTVK.role'),
      image: HungTVK,
    },
    {
      name: t('team.vuNLH.name'),
      role: t('team.vuNLH.role'),
      image: defaultAvatar,
    },
    {
      name: t('team.chinhHD.name'),
      role: t('team.chinhHD.role'),
      image: ChinhHD,
    },
  ]

  function StoryFeatures() {
    const items = [
      {
        icon: <Icons.check className="w-6 h-6 text-orange-500" />,
        title: t('story.features.openSource.title'),
        desc: t('story.features.openSource.desc'),
      },
      {
        icon: <Icons.check className="w-6 h-6 text-orange-500" />,
        title: t('story.features.python.title'),
        desc: t('story.features.python.desc'),
      },
      {
        icon: <Icons.check className="w-6 h-6 text-orange-500" />,
        title: t('story.features.community.title'),
        desc: t('story.features.community.desc'),
      },
    ]

    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent rounded-2xl" />
        <div className="relative border border-orange-600/20 rounded-2xl p-8 bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex flex-col gap-8">
            {items.map(({ icon, title, desc }, index) => (
              <div
                key={title}
                className="flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-orange-600/20 to-orange-600/10 p-4 rounded-xl border border-orange-600/20 group-hover:border-orange-600/40 transition-colors duration-300">
                  {icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-white group-hover:text-orange-400 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  function ValueCard({
    icon,
    title,
    desc,
  }: Readonly<{
    icon: React.ReactNode
    title: string
    desc: string
  }>) {
    return (
      <Card className="group h-full bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border-orange-600/20 hover:border-orange-600/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-600/10">
        <CardHeader className="p-8">
          <div className="mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-600/20 to-orange-600/10 flex items-center justify-center border border-orange-600/20 group-hover:border-orange-600/40 transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
          <CardTitle className="text-xl text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
            {title}
          </CardTitle>
          <CardDescription className="text-neutral-400 leading-relaxed">{desc}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <>
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-black w-full">
        <div className="container py-3 px-0  ">
          <Breadcrumbs />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen py-24 md:py-32 bg-gradient-to-b from-black via-neutral-700 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-orange-600/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
            <Badge
              variant="outline"
              className="mb-6 border-orange-600/30 text-orange-400 bg-orange-600/10"
            >
              {t('introduction.badge')}{' '}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
                {t('introduction.title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed text-neutral-300 max-w-3xl">
              {t('introduction.tagline')}
            </p>
            <Link href={config.paths.pages.contact} className="inline-block group">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-orange-600/25 transition-all duration-300 group-hover:scale-105"
              >
                {t('introduction.button')}
                <Icons.arrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-neutral-950 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="border-orange-600/30 text-orange-400 bg-orange-600/10"
              >
                {t('story.badge')}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {t('story.title')}
                </span>
              </h2>
              <div className="space-y-4 text-lg text-neutral-300 leading-relaxed">
                <p>{t('story.p1')}</p>
                <p>{t('story.p2')}</p>
              </div>
            </div>

            <StoryFeatures />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-b from-neutral-950 to-black text-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-6 border-orange-600/30 text-orange-400 bg-orange-600/10"
            >
              Mission & Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {t('mission.title')}
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Icons.check className="h-8 w-8 text-orange-500" />}
              title={t('mission.values.transparency.title')}
              desc={t('mission.values.transparency.desc')}
            />
            <ValueCard
              icon={<Icons.about className="h-8 w-8 text-orange-500" />}
              title={t('mission.values.empowerment.title')}
              desc={t('mission.values.empowerment.desc')}
            />
            <ValueCard
              icon={<Icons.settings className="h-8 w-8 text-orange-500" />}
              title={t('mission.values.flexibility.title')}
              desc={t('mission.values.flexibility.desc')}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-orange-600/30 text-orange-400 bg-orange-600/10"
            >
              Our Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {t('team.title')}
              </span>
            </h2>
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.name} {...member} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br bg-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-600/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />

        <div className="container text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
              {t('cta.title')}
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-neutral-300 leading-relaxed">
            {t('cta.tagline')}
          </p>
          <Link href={config.paths.pages.contact} className="inline-block group">
            <Button
              size="lg"
              className="bg-gradient-to-r bg-white text-orange-600 px-10 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-colors whitespace-nowrap text-lg"
            >
              {t('cta.button')}
              <Icons.arrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
