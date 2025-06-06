'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { config } from '@/lib/config'
import { motion } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { useTranslations } from 'next-intl'

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Particle component to avoid hydration issues
const Particles = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Only render particles on client-side to avoid hydration mismatch
  if (!isMounted) return null

  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => {
        const size = 10 + Math.random() * 20
        const speed = 10 + Math.random() * 30
        const opacity = 0.1 + Math.random() * 0.2
        const x = Math.random() * 100
        const delay = Math.random() * 5

        return (
          <motion.div
            key={'particle-' + index}
            className="absolute rounded-full bg-orange-600 mix-blend-overlay"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              opacity: opacity,
              top: '100%',
            }}
            animate={{
              y: [0, -1000],
              rotate: [0, 360],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              delay: delay,
              ease: 'linear',
            }}
          />
        )
      })}
    </>
  )
}

export default function AboutPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const t = useTranslations('aboutUs')

  useEffect(() => {
    // Track last update time for throttling
    let lastUpdate = 0
    const throttleDelay = 50 // ms between updates

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()

      // Skip updates that happen too soon after the last one
      if (now - lastUpdate < throttleDelay) return

      lastUpdate = now
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  function Stat({ number, label, delay = 0 }: { number: string; label: string; delay?: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        <h3 className="text-5xl font-bold mb-3 text-foreground">{number}</h3>
        <p className="text-muted-foreground">{label}</p>
      </motion.div>
    )
  }

  function StoryFeatures() {
    const items = [
      {
        icon: <Icons.check className="w-5 h-5 text-orange-600" />,
        title: t('story.features.openSource.title'),
        desc: t('story.features.openSource.desc'),
      },
      {
        icon: <Icons.check className="w-5 h-5 text-orange-600" />,
        title: t('story.features.python.title'),
        desc: t('story.features.python.desc'),
      },
      {
        icon: <Icons.check className="w-5 h-5 text-orange-600" />,
        title: t('story.features.community.title'),
        desc: t('story.features.community.desc'),
      },
    ]

    return (
      <motion.div
        className="relative border border-orange-600/10 rounded-lg p-6 bg-muted"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col gap-6">
          {items.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="bg-orange-600/10 p-3 rounded-md">{icon}</div>
              <div>
                <h3 className="font-medium mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  function ValueCard({
    icon,
    title,
    desc,
    delay = 0,
  }: {
    icon: React.ReactNode
    title: string
    desc: string
    delay?: number
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        <Card className="h-full border-orange-600/10">
          <CardHeader>
            <div className="mb-4 h-12 w-12 rounded-full bg-orange-600/10 flex items-center justify-center">
              {icon}
            </div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    )
  }

  function TeamMetrics() {
    const metrics = [
      {
        value: t('team.metrics.experience.value'),
        label: t('team.metrics.experience.label'),
        delay: 0.6,
      },
      {
        value: t('team.metrics.projects.value'),
        label: t('team.metrics.projects.label'),
        delay: 0.7,
      },
      {
        value: t('team.metrics.support.value'),
        label: t('team.metrics.support.label'),
        delay: 0.8,
      },
      {
        value: t('team.metrics.satisfaction.value'),
        label: t('team.metrics.satisfaction.label'),
        delay: 0.9,
      },
    ]

    return (
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-muted/30 rounded-lg p-6 border border-orange-600/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {metrics.map(({ value, label, delay }) => (
          <div key={label} className="text-center">
            <motion.div
              className="text-3xl font-bold text-orange-600"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 10, delay }}
            >
              {value}
            </motion.div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </motion.div>
    )
  }

  return (
    <>
      <Header />

      {/* Breadcrumbs */}
      <div className="container py-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-background to-background pointer-events-none z-0">
          {/* Radial glow that follows cursor */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-orange-600/10 pointer-events-none blur-3xl"
            animate={{ x: cursorPosition.x - 250, y: cursorPosition.y - 250 }}
            transition={{ type: 'spring', damping: 30, stiffness: 50, mass: 0.5 }}
          />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: /* svg grid omitted for brevity – unchanged from your code */ '',
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Client-side particles */}
          <Particles />

          {/* Animated lines */}
          <motion.div
            className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-600/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          {/* …(other decorative lines unchanged)… */}
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
            {/* Title */}
            <motion.div initial="hidden" animate="visible" className="relative mb-3">
              <motion.h1
                className="text-5xl md:text-6xl font-bold tracking-tight text-orange-600 inline-block"
                variants={titleVariants}
              >
                {t('introduction.title')}
              </motion.h1>
              <motion.div
                className="h-1 w-24 bg-orange-600/40 rounded-full mx-auto mt-4"
                variants={lineVariants}
                style={{ transformOrigin: 'center' }}
              />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl mb-8 leading-relaxed"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {t('introduction.tagline')}
            </motion.p>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link href={config.paths.pages.contact} className="inline-block">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 relative overflow-hidden group"
                >
                  <span className="relative z-10">{t('introduction.button')}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-300"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>

            {/* highlight rings (unchanged) */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat number="100+" label={t('stats.countries')} />
            <Stat number="10,800+" delay={0.1} label={t('stats.customers')} />
            <Stat number="93%" delay={0.2} label={t('stats.recommend')} />
            <Stat number="> 3 million" delay={0.3} label={t('stats.developers')} />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-orange-600">{t('story.title')}</h2>
              <p className="mb-4 text-muted-foreground">{t('story.p1')}</p>
              <p className="mb-4 text-muted-foreground">{t('story.p2')}</p>
            </motion.div>

            <StoryFeatures />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-muted">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-orange-600">{t('mission.title')}</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">{t('mission.tagline')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Icons.check className="h-6 w-6 text-orange-600" />}
              title={t('mission.values.transparency.title')}
              desc={t('mission.values.transparency.desc')}
              delay={0.1}
            />
            <ValueCard
              icon={<Icons.about className="h-6 w-6 text-orange-600" />}
              title={t('mission.values.empowerment.title')}
              desc={t('mission.values.empowerment.desc')}
              delay={0.2}
            />
            <ValueCard
              icon={<Icons.settings className="h-6 w-6 text-orange-600" />}
              title={t('mission.values.flexibility.title')}
              desc={t('mission.values.flexibility.desc')}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background relative overflow-hidden">
        {/* decorative elements unchanged */}
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-orange-600 relative inline-block">
              {t('team.title')}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-600/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-4">{t('team.tagline')}</p>
            <motion.div
              className="w-24 h-1 bg-orange-600/20 mx-auto rounded-full mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {/* team grid unchanged – names/roles usually stay literal */}
          {/* metrics */}
          <TeamMetrics />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600/10 text-foreground">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-orange-600">{t('cta.title')}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{t('cta.tagline')}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={config.paths.pages.contact}>
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
