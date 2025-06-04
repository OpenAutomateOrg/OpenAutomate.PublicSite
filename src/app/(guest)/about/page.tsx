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
  const [particles, setParticles] = useState<Array<{
    id: string
    size: number
    speed: number
    opacity: number
    x: number
    delay: number
  }>>([])

  useEffect(() => {
    setIsMounted(true)
    // Generate stable particle data only on client side
    const particleData = Array.from({ length: 20 }, (_, index) => {
      const size = 10 + Math.random() * 20
      const speed = 10 + Math.random() * 30
      const opacity = 0.1 + Math.random() * 0.2
      const x = Math.random() * 100
      const delay = Math.random() * 5
      return {
        id: `particle-${index}-${size.toFixed(1)}-${x.toFixed(1)}`,
        size,
        speed,
        opacity,
        x,
        delay,
      }
    })
    setParticles(particleData)
  }, [])

  // Only render particles on client-side to avoid hydration mismatch
  if (!isMounted) return null

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-orange-600 mix-blend-overlay"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            opacity: particle.opacity,
            top: '100%',
          }}
          animate={{
            y: [0, -1000],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </>
  )
}

export default function AboutPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

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

  return (
    <>
      <Header />

      {/* Breadcrumbs */}
      <div className="container py-4">
        <Breadcrumbs />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-background to-background pointer-events-none z-0">
          {/* Radial glow effect that follows cursor */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-orange-600/10 pointer-events-none blur-3xl"
            animate={{
              x: cursorPosition.x - 250,
              y: cursorPosition.y - 250,
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 50,
              mass: 0.5,
            }}
          />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.41l2.83-2.83 1.41 1.41L1.41 4.41H0V3.41zM17.17 38.59l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM17.17 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM17.17 3.41l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.41zM34.59 38.59l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM34.59 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM34.59 3.41l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.41zM0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.41l2.83-2.83 1.41 1.41L1.41 4.41H0V3.41zM17.17 38.59l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM17.17 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM17.17 3.41l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.41zM34.59 38.59l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM34.59 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM34.59 3.41l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Client-side only particles */}
          <Particles />

          {/* Animated lines */}
          <motion.div
            className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-600/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          <motion.div
            className="absolute left-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-orange-600/20 to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />

          <motion.div
            className="absolute right-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-orange-600/20 to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.1 }}
          />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
            {/* Animated title with staggered appearance */}
            <motion.div initial="hidden" animate="visible" className="relative mb-3">
              <motion.h1
                className="text-5xl md:text-6xl font-bold tracking-tight text-orange-600 inline-block"
                variants={titleVariants}
              >
                OpenAutomate
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
              We are on a mission to democratize automation technology by providing an open-source
              alternative to proprietary platforms, helping organizations take control of their
              automation processes without vendor lock-in.
            </motion.p>

            {/* Animated button */}
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
                  <span className="relative z-10">Learn More</span>
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

            {/* Highlight rings */}
            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] pointer-events-none">
              <motion.div
                className="absolute inset-0 border border-orange-600/10 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 border border-orange-600/5 rounded-full"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 0.8, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 w-3 h-3 bg-orange-600/40 rounded-full shadow-lg shadow-orange-600/20"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 border border-orange-600/10 rounded-full"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 0.6, opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                <motion.div
                  className="absolute bottom-0 right-1/4 w-2 h-2 bg-orange-600/40 rounded-full shadow-lg shadow-orange-600/20"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-5xl font-bold mb-3 text-foreground">100+</h3>
              <p className="text-muted-foreground">
                customer countries (global location of customer base as of July 31, 2025)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-5xl font-bold mb-3 text-foreground">10,800+</h3>
              <p className="text-muted-foreground">customers (as of July 31, 2025)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-5xl font-bold mb-3 text-foreground">93%</h3>
              <p className="text-muted-foreground">would recommend; Gartner Peer Insights 2025</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-5xl font-bold mb-3 text-foreground">{'> 3 million'}</h3>
              <p className="text-muted-foreground">developers around the globe using AI at work</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-orange-600">Our Story</h2>
              <p className="mb-4 text-muted-foreground">
                OpenAutomate addresses these challenges by providing an open-source alternative
                based on Python for business process automation management. By leveraging the
                accessibility and extensive library ecosystem of Python, organizations can
                significantly reduce costs while gaining greater control over their automation
                solutions. This approach eliminates vendor dependency and empowers teams to create,
                modify, and extend automation processes without the constraints of commercial
                licensing.
              </p>
              <p className="mb-4 text-muted-foreground">
                The platform enables businesses to transition from expensive proprietary solutions
                to a more flexible, cost-effective approach that can be tailored to specific
                organizational needs. This not only reduces operational costs but also allows for
                more rapid innovation and adaptation to changing business requirements.
              </p>
            </motion.div>

            <motion.div
              className="relative border border-orange-600/10 rounded-lg p-6 bg-muted"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-600/10 p-3 rounded-md">
                    <Icons.check className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Open Source Core</h3>
                    <p className="text-sm text-muted-foreground">
                      100% open-source platform with transparent development
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-600/10 p-3 rounded-md">
                    <Icons.check className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Python Foundation</h3>
                    <p className="text-sm text-muted-foreground">
                      Built on Python to leverage its extensive ecosystem and flexibility
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-600/10 p-3 rounded-md">
                    <Icons.check className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Community Driven</h3>
                    <p className="text-sm text-muted-foreground">
                      Developed by and for the automation community
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-0 right-0 w-12 h-12"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 right-0 w-5 h-[1px] bg-orange-600/30"></div>
                <div className="absolute top-0 right-0 h-5 w-[1px] bg-orange-600/30"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-orange-600">Our Mission & Values</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              At the core of everything we do is a commitment to making automation technology
              accessible, customizable, and cost-effective for organizations of all sizes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-orange-600/10">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-full bg-orange-600/10 flex items-center justify-center">
                    <Icons.check className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Transparency</CardTitle>
                  <CardDescription>
                    We believe in complete transparency in our code, our business practices, and our
                    community engagement.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-orange-600/10">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-full bg-orange-600/10 flex items-center justify-center">
                    <Icons.about className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Empowerment</CardTitle>
                  <CardDescription>
                    We empower organizations by giving them full control over their automation
                    assets and processes.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-orange-600/10">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-full bg-orange-600/10 flex items-center justify-center">
                    <Icons.settings className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Flexibility</CardTitle>
                  <CardDescription>
                    We design our platform to be adaptable to any workflow or industry requirement
                    without limitations.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600/30 to-transparent" />

          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-orange-600/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full border border-orange-600/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-orange-600 relative inline-block">
              Our Team
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-600/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-4">
              Meet the passionate team of engineers, designers, and automation experts behind
              OpenAutomate.
            </p>

            <motion.div
              className="w-24 h-1 bg-orange-600/20 mx-auto rounded-full mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
            {[
              { name: 'Nguyen Xuan Hoai', role: 'Founder & CEO', icon: 'user' },
              { name: 'Huynh Duc Chinh', role: 'FE Developer', icon: 'user' },
              { name: 'Phan Hoang Nhat', role: 'FE Developer', icon: 'user' },
              { name: 'Nguyen Luong Hoang Vu', role: 'BE Developer', icon: 'user' },
              { name: 'Tran Van Khanh Hung', role: 'BE Developer', icon: 'user' },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="bg-muted/80 border border-orange-600/10 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center relative overflow-hidden group"
                  whileHover={{ boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <Icons.user className="h-10 w-10 text-orange-600/70 relative z-10" />

                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-orange-600/0 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      borderColor: [
                        'rgba(249, 115, 22, 0)',
                        'rgba(249, 115, 22, 0.3)',
                        'rgba(249, 115, 22, 0)',
                      ],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>

                <motion.h3
                  className="font-medium text-orange-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  {member.name}
                </motion.h3>

                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  {member.role}
                </motion.p>

                {/* Skill dots */}
                <motion.div
                  className="flex justify-center gap-1 mt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={'skill-'+i}
                      className={`w-1.5 h-1.5 rounded-full ${i < 5 ? 'bg-orange-600/70' : 'bg-orange-600/30'}`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Team metrics section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-muted/30 rounded-lg p-6 border border-orange-600/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-orange-600"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.6 }}
              >
                5+
              </motion.div>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>

            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-orange-600"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.7 }}
              >
                50+
              </motion.div>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>

            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-orange-600"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.8 }}
              >
                24/7
              </motion.div>
              <p className="text-sm text-muted-foreground">Support Available</p>
            </div>

            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-orange-600"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.9 }}
              >
                100%
              </motion.div>
              <p className="text-sm text-muted-foreground">Client Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600/10 text-foreground">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-orange-600">Join Our Big Dream</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you are looking to implement OpenAutomate or contribute to our open-source
              community, we would love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={config.paths.pages.contact}>
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  Contact Us
                </Button>
              </Link>
              {/* <Link href="https://github.com">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-orange-600 border-orange-600 hover:bg-orange-600/10 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
