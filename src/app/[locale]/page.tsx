'use client'

import Link from 'next/link'
import React, { useEffect, useState, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Footer } from '@/components/layout/footer'
import { LaunchButton } from '@/components/launch-button'
import { config } from '@/lib/config'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

// Robot animation variants
const roboticVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
}

// Typing animation component
const TypingText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ')

  // Creates an array of letter counts for each word to use in the animation
  const letters = words.map((word) => Array.from(word))

  return (
    <h1 className={className}>
      {letters.map((word, wordIndex) => (
        <React.Fragment key={`word-${text}-${wordIndex}`}>
          {wordIndex > 0 && ' '}
          <span className="inline-block">
            {word.map((letter, letterIndex) => (
              <motion.span
                key={`letter-${text}-${wordIndex}-${letterIndex}`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: wordIndex * 0.2 + letterIndex * 0.03 + 0.5,
                  duration: 0.1,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </h1>
  )
}

// Common animated icon wrapper
interface AnimatedIconProps {
  icon: ReactNode
  delay?: number
}

const AnimatedIcon = ({ icon, delay = 0 }: AnimatedIconProps) => {
  return (
    <motion.div
      className="h-12 w-12 rounded-full bg-orange-600/10 flex items-center justify-center mb-4 relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0 bg-orange-600/5 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          delay,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      {icon}
    </motion.div>
  )
}

// Feature card component
interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  delay?: number
  animationDelay?: number
}

const FeatureCard = ({
  title,
  description,
  icon,
  delay = 0,
  animationDelay = 0.2,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <Card className="h-full border-orange-600/10 relative overflow-hidden group">
        <CardHeader>
          <AnimatedIcon icon={icon} delay={delay} />
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute top-0 right-0 w-5 h-[1px] bg-orange-600/30"></div>
          <div className="absolute top-0 right-0 h-5 w-[1px] bg-orange-600/30"></div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

// Testimonial card component
interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  animationProps: {
    initial: Record<string, number | string>
    delay: number
  }
  motionDelay?: number
  repeatDelay?: number
}

const TestimonialCard = ({
  quote,
  name,
  title,
  animationProps,
  motionDelay = 0,
  repeatDelay = 2,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={animationProps.initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: animationProps.delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full relative group overflow-hidden border-orange-600/10 dark:border-orange-600/5">
        <CardContent className="p-6 relative">
          <div className="mb-4 relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, delay: motionDelay, repeat: Infinity }}
              className="absolute -inset-2 rounded-full bg-orange-600/5 -z-10"
            />
            <Icons.help className="h-6 w-6 text-orange-600 relative z-10" />
          </div>
          <p className="italic text-muted-foreground mb-4">{quote}</p>
          <div className="flex gap-3 items-center">
            <div className="rounded-full bg-orange-600/10 h-10 w-10 flex items-center justify-center overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-orange-600/5"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 2, delay: motionDelay / 3, repeat: Infinity }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Icons.user className="h-5 w-5 text-orange-600/80" />
              </motion.div>
            </div>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>

          {/* Circuit corner decoration */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <motion.path
                d="M2 2 L12 2 L12 8"
                stroke="rgba(249, 115, 22, 0.3)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </svg>
          </div>

          {/* Scanning line animation */}
          <motion.div
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-600/20 to-transparent"
            initial={{ top: 0, opacity: 0 }}
            animate={{
              top: '100%',
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay,
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Data dot component for circuit paths
const DataDot = ({
  path,
  delay = 0,
  duration = 3,
  size = 3,
  color = 'rgba(249, 115, 22, 0.8)',
}: {
  path: string
  delay?: number
  duration?: number
  size?: number
  color?: string
}) => {
  return (
    <circle
      r={size}
      fill={color}
      className="path-dot"
      style={
        {
          offsetPath: `path("${path}")`,
          // Use CSS custom properties for animation timing
          '--delay': `${delay}s`,
          '--duration': `${duration}s`,
        } as React.CSSProperties
      }
    />
  )
}

// Robot SVG component
const RobotCircuitSVG = () => {
  // Define paths for data dots to travel along
  const path1 = 'M100,100 L200,100 L200,200 L300,200 L300,300'
  const path2 = 'M900,100 L800,100 L800,200 L700,200 L700,300'
  const path3 = 'M500,50 L500,150'

  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      viewBox="0 0 1000 400"
      xmlns="http://www.w3.org/2000/svg"
      variants={roboticVariants}
    >
      {/* Background grid effect */}
      <defs>
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(249, 115, 22, 0.05)"
            strokeWidth="0.5"
          />
        </pattern>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#smallGrid)" />
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="rgba(249, 115, 22, 0.1)"
            strokeWidth="0.8"
          />
        </pattern>
        <radialGradient id="circuitGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(249, 115, 22, 0.15)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
        </radialGradient>
      </defs>

      {/* Background elements */}
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Circuit paths and other elements */}
      <motion.path
        d={path1}
        fill="none"
        stroke="rgba(249, 115, 22, 0.3)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        strokeLinecap="round"
        filter="drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))"
      />

      <motion.path
        d={path2}
        fill="none"
        stroke="rgba(249, 115, 22, 0.3)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
        strokeLinecap="round"
        filter="drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))"
      />

      <motion.path
        d={path3}
        fill="none"
        stroke="rgba(249, 115, 22, 0.3)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.6 }}
        strokeLinecap="round"
        filter="drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))"
      />

      {/* Data dots */}
      <DataDot path={path1} delay={0.5} duration={5} size={2.5} />
      <DataDot path={path2} delay={1.2} duration={5} size={2.5} />
      <DataDot path={path3} delay={0.8} duration={2} size={2} />
    </motion.svg>
  )
}

export default function Home() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isLoading, setIsLoading] = useState(isHome)
  const t = useTranslations('landing')

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000) // Show splash screen for 2 seconds
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (isLoading && isHome) {
    return <SplashScreen />
  }

  return (
    <>
      <Header />
      {/* Hero Section with Robotic Animation */}
      <section className="py-20 bg-orange-600/10 text-foreground">
        {/* Geometric robotic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Hexagonal grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.25'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          ></div>

          {/* Animated light beams */}
          <motion.div
            className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-orange-600/10 to-transparent opacity-0"
            animate={{
              opacity: [0, 0.8, 0],
              x: [-20, 20],
              transition: {
                repeat: Infinity,
                duration: 5,
                repeatDelay: 2,
                ease: 'easeInOut',
              },
            }}
          />

          <motion.div
            className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-orange-600/10 to-transparent opacity-0"
            animate={{
              opacity: [0, 0.8, 0],
              x: [20, -20],
              transition: {
                repeat: Infinity,
                duration: 7,
                repeatDelay: 3,
                ease: 'easeInOut',
              },
            }}
          />

          {/* Cybernetic circles */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-orange-600/10 opacity-60"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 20,
                  ease: 'linear',
                },
                scale: {
                  repeat: Infinity,
                  duration: 8,
                  repeatType: 'reverse',
                },
              },
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-orange-600/10 opacity-60"
              animate={{
                rotate: -360,
                transition: {
                  repeat: Infinity,
                  duration: 15,
                  ease: 'linear',
                },
              }}
            />
          </motion.div>

          <motion.div
            className="absolute right-0 top-1/3 -translate-y-1/2 w-48 h-48 rounded-full border border-orange-600/10 opacity-60"
            animate={{
              rotate: -360,
              scale: [1, 1.1, 1],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 25,
                  ease: 'linear',
                },
                scale: {
                  repeat: Infinity,
                  duration: 10,
                  repeatType: 'reverse',
                },
              },
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-orange-600/10 opacity-60"
              animate={{
                rotate: 360,
                transition: {
                  repeat: Infinity,
                  duration: 18,
                  ease: 'linear',
                },
              }}
            />
          </motion.div>

          {/* Digital particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 15 }, (_, i) => {
              // Pre-calculate random positions for stability
              const xPos = Math.random() * 100
              const yPos = Math.random() * 100
              const duration = 2 + Math.random() * 3
              const delay = Math.random() * 5
              const repeatDelay = Math.random() * 5
              // Create a stable, unique identifier
              const particleId = `particle-${i}-${xPos.toFixed(2)}-${yPos.toFixed(2)}`

              return (
                <motion.div
                  key={particleId}
                  className="absolute w-1 h-1 rounded-full bg-orange-600/30"
                  initial={{
                    x: `${xPos}%`,
                    y: `${yPos}%`,
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                    transition: {
                      repeat: Infinity,
                      duration,
                      delay,
                      repeatDelay,
                    },
                  }}
                />
              )
            })}
          </div>
        </div>

        <RobotCircuitSVG />
        <motion.div
          className="container flex flex-col items-center text-center relative z-10"
          variants={roboticVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Futuristic holographic frame */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {/* Top left corner */}
            <motion.div
              className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-600/40"
              initial={{ x: 20, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
            />
            {/* Top right corner */}
            <motion.div
              className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-orange-600/40"
              initial={{ x: -20, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5, type: 'spring' }}
            />
            {/* Bottom left corner */}
            <motion.div
              className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-orange-600/40"
              initial={{ x: 20, y: -20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5, type: 'spring' }}
            />
            {/* Bottom right corner */}
            <motion.div
              className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-orange-600/40"
              initial={{ x: -20, y: -20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5, type: 'spring' }}
            />

            {/* Scanner line */}
            <motion.div
              className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-600/50 to-transparent"
              initial={{ top: 0, opacity: 0 }}
              animate={{
                top: ['0%', '100%', '0%'],
                opacity: [0, 1, 0],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                  times: [0, 0.5, 1],
                },
              }}
            />

            {/* Digital readout markers */}
            <div className="absolute top-2 left-12 flex space-x-1">
              {Array.from({ length: 4 }, (_, i) => {
                // Create a stable identifier using position in sequence
                const readoutId = `readout-left-${i}-pos-${i * 4}`
                return (
                  <motion.div
                    key={readoutId}
                    className="w-1 h-3 bg-orange-600/50"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      transition: {
                        delay: 2 + i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 5,
                        duration: 1,
                        repeatType: 'reverse',
                      },
                    }}
                  />
                )
              })}
            </div>

            <div className="absolute top-2 right-12 flex space-x-1">
              {Array.from({ length: 4 }, (_, i) => {
                // Create a stable identifier using position in sequence
                const readoutId = `readout-right-${i}-pos-${i * 4}`
                return (
                  <motion.div
                    key={readoutId}
                    className="w-1 h-3 bg-orange-600/50"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      transition: {
                        delay: 2 + i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 5,
                        duration: 1,
                        repeatType: 'reverse',
                      },
                    }}
                  />
                )
              })}
            </div>
          </motion.div>

          <TypingText
            text={t('openSourceAutomation')}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-orange-600"
          />
          <motion.p className="text-xl md:text-2xl max-w-3xl mb-10" variants={textVariants}>
            {t('description')}
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4" variants={textVariants}>
            <motion.div variants={buttonVariants} whileHover="hover">
              <LaunchButton
                size="lg"
                className="bg-orange-600 text-white hover:bg-orange-700 transition-all duration-200 rounded-md px-6 py-3 font-medium"
              />
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover">
              <Link href={config.paths.pages.guides}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-orange-600 text-orange-600 bg-transparent hover:bg-orange-600/5 transition-all duration-200 rounded-md px-6 py-3 font-medium"
                >
                  {t('explorePlatform')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Gear Animation */}
          <motion.div
            className="absolute right-10 top-1/4 opacity-20"
            animate={{
              rotate: 360,
              transition: {
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
              },
            }}
          >
            <Icons.settings className="h-20 w-20 text-orange-600" />
          </motion.div>

          <motion.div
            className="absolute left-10 bottom-1/4 opacity-20"
            animate={{
              rotate: -360,
              transition: {
                duration: 25,
                ease: 'linear',
                repeat: Infinity,
              },
            }}
          >
            <Icons.settings className="h-16 w-16 text-orange-600" />
          </motion.div>

          {/* Robotic dots in corners */}
          <div className="absolute top-0 left-0 w-24 h-24 flex items-center justify-center opacity-25">
            <motion.div
              className="w-2 h-2 rounded-full bg-orange-600 absolute"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
                transition: { duration: 2, repeat: Infinity },
              }}
            />
            <motion.div
              className="w-12 h-12 rounded-full border border-orange-600/20 absolute"
              animate={{
                rotate: 360,
                transition: { duration: 8, repeat: Infinity, ease: 'linear' },
              }}
            />
          </div>

          <div className="absolute top-0 right-0 w-24 h-24 flex items-center justify-center opacity-25">
            <motion.div
              className="w-2 h-2 rounded-full bg-orange-600 absolute"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
                transition: { duration: 2.5, repeat: Infinity },
              }}
            />
            <motion.div
              className="w-12 h-12 rounded-full border border-orange-600/20 absolute"
              animate={{
                rotate: -360,
                transition: { duration: 8, repeat: Infinity, ease: 'linear' },
              }}
            />
          </div>

          <div className="absolute bottom-0 left-0 w-24 h-24 flex items-center justify-center opacity-25">
            <motion.div
              className="w-2 h-2 rounded-full bg-orange-600 absolute"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
                transition: { duration: 1.8, repeat: Infinity },
              }}
            />
            <motion.div
              className="w-12 h-12 rounded-full border border-orange-600/20 absolute"
              animate={{
                rotate: 360,
                transition: { duration: 9, repeat: Infinity, ease: 'linear' },
              }}
            />
          </div>

          <div className="absolute bottom-0 right-0 w-24 h-24 flex items-center justify-center opacity-25">
            <motion.div
              className="w-2 h-2 rounded-full bg-orange-600 absolute"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
                transition: { duration: 2.2, repeat: Infinity },
              }}
            />
            <motion.div
              className="w-12 h-12 rounded-full border border-orange-600/20 absolute"
              animate={{
                rotate: -360,
                transition: { duration: 10, repeat: Infinity, ease: 'linear' },
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-orange-600"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('workflowsTitle')}{' '}
          </motion.h2>

          {/* Background circuit lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Horizontal circuit line */}
            <motion.div
              className="absolute left-0 top-1/2 w-full h-[1px] bg-orange-600/10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />

            {/* Circuit nodes */}
            <motion.div
              className="absolute left-1/4 top-1/2 w-3 h-3 rounded-full bg-orange-600/15"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.div
              className="absolute left-2/4 top-1/2 w-3 h-3 rounded-full bg-orange-600/15"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
            />
            <motion.div
              className="absolute left-3/4 top-1/2 w-3 h-3 rounded-full bg-orange-600/15"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />

            {/* Vertical circuit lines */}
            <motion.div
              className="absolute left-1/4 top-1/2 w-[1px] h-1/2 bg-orange-600/10"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
            <motion.div
              className="absolute left-2/4 top-0 w-[1px] h-1/2 bg-orange-600/10"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.3 }}
            />
            <motion.div
              className="absolute left-3/4 top-1/2 w-[1px] h-1/2 bg-orange-600/10"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.4 }}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title={t('features.noVendorLockIn.title')}
              description={t('features.noVendorLockIn.desc')}
              icon={<Icons.check className="h-6 w-6 text-orange-600" />}
              animationDelay={0.2}
            />

            <FeatureCard
              title={t('features.costEffective.title')}
              description={t('features.costEffective.desc')}
              icon={<Icons.billing className="h-6 w-6 text-orange-600" />}
              delay={0.5}
              animationDelay={0.4}
            />

            <FeatureCard
              title={t('features.pythonBased.title')}
              description={t('features.pythonBased.desc')}
              icon={<Icons.fileText className="h-6 w-6 text-orange-600" />}
              delay={1}
              animationDelay={0.6}
            />
          </div>

          {/* Data flow animation */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {Array.from({ length: 5 }, (_, i) => {
              // Pre-calculate random values
              const width = 3 + Math.random() * 3
              const height = 3 + Math.random() * 3
              const leftPos = Math.random() * 100
              const duration = 5 + Math.random() * 5
              const delay = Math.random() * 5
              // Create a stable ID
              const flowId = `data-flow-${i}-${width.toFixed(1)}-${leftPos.toFixed(1)}`

              return (
                <motion.div
                  key={flowId}
                  className="absolute rounded-full bg-orange-600/40"
                  style={{
                    width: width + 'px',
                    height: height + 'px',
                    left: leftPos + '%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, 100, 200, 300, 400],
                    y: [0, 30, -20, 20, 0],
                    opacity: [0, 0.8, 0.8, 0.8, 0],
                    scale: [1, 1.2, 1.2, 1.2, 1],
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    delay,
                    ease: 'linear',
                  }}
                />
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 relative"
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-12 text-orange-600"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('solutionsTitle')}
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="aspect-[1.6/1]"
            >
              <Button
                variant="outline"
                className="py-6 h-auto w-full flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  className="mb-1 transition-all duration-300 group-hover:text-orange-500"
                >
                  <Icons.user className="h-6 w-6" />
                </motion.div>
                <span>{t('sectors.healthcare')}</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="aspect-[1.6/1]"
            >
              <Button
                variant="outline"
                className="py-6 h-auto w-full flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    },
                  }}
                  className="mb-1 transition-all duration-300 group-hover:text-orange-500"
                >
                  <Icons.billing className="h-6 w-6" />
                </motion.div>
                <span>{t('sectors.finance')}</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="aspect-[1.6/1]"
            >
              <Button
                variant="outline"
                className="py-6 h-auto w-full flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    },
                  }}
                  className="mb-1 transition-all duration-300 group-hover:text-orange-500"
                >
                  <Icons.check className="h-6 w-6" />
                </motion.div>
                <span>{t('sectors.insurance')}</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="aspect-[1.6/1]"
            >
              <Button
                variant="outline"
                className="py-6 h-auto w-full flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.5,
                    },
                  }}
                  className="mb-1 transition-all duration-300 group-hover:text-orange-500"
                >
                  <Icons.home className="h-6 w-6" />
                </motion.div>
                <span>{t('sectors.publicSector')}</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="aspect-[1.6/1]"
            >
              <Button
                variant="outline"
                className="py-6 h-auto w-full flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2,
                    },
                  }}
                  className="mb-1 transition-all duration-300 group-hover:text-orange-500"
                >
                  <Icons.settings className="h-6 w-6" />
                </motion.div>
                <span>{t('sectors.manufacturing')}</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="aspect-[1.6/1]"
            >
              <Button
                variant="outline"
                className="py-6 h-auto w-full flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2.5,
                    },
                  }}
                  className="mb-1 transition-all duration-300 group-hover:text-orange-500"
                >
                  <Icons.file className="h-6 w-6" />
                </motion.div>
                <span>{t('sectors.retail')}</span>
              </Button>
            </motion.div>
          </div>

          {/* Solution Detail Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Card className="overflow-hidden relative">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <div>
                    <motion.h3
                      className="text-2xl font-bold mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {t('focusTitle')}
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      {t('focusParagraph')}
                    </motion.p>
                    <motion.ul
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <li className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', duration: 0.5, delay: 0.9 }}
                        >
                          <Icons.check className="h-5 w-5 text-orange-600" />
                        </motion.div>
                        <span>{t('focusList.reductionCosts')}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', duration: 0.5, delay: 1.0 }}
                        >
                          <Icons.check className="h-5 w-5 text-orange-600" />
                        </motion.div>
                        <span>{t('focusList.decreaseTime')}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', duration: 0.5, delay: 1.1 }}
                        >
                          <Icons.check className="h-5 w-5 text-orange-600" />
                        </motion.div>
                        <span>{t('focusList.increaseControl')}</span>
                      </li>
                    </motion.ul>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className="mt-6"
                    >
                      <Link href={config.paths.pages.about}>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 hover:translate-y-[-2px]">
                          {t('learnMore')}
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                  <motion.div
                    className="bg-muted rounded-lg h-64 flex items-center justify-center relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <div className="text-center relative z-10">
                      <p className="text-muted-foreground mb-2">Dashboard Preview</p>
                      <div className="bg-background border border-input p-4 rounded inline-block">
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            transition: { duration: 30, repeat: Infinity, ease: 'linear' },
                          }}
                        >
                          <Icons.chart className="h-10 w-10 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Decorative background circuit patterns */}
                    <motion.div
                      className="absolute top-0 right-0 w-[200px] h-[200px] opacity-10"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    >
                      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          strokeDasharray="5 5"
                        />
                        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Background circuit nodes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div
                    className="absolute left-0 bottom-0 w-3 h-3 rounded-full bg-orange-600/10"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute right-0 top-0 w-2 h-2 rounded-full bg-orange-600/10"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, delay: 1, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute left-1/3 top-0 w-4 h-1 bg-orange-600/10"
                    animate={{
                      width: [4, 20, 4],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Animated circuit pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute left-0 top-1/3 w-full h-[1px] bg-orange-600/10"
              initial={{ scaleX: 0, transformOrigin: '0% 0%' }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.div
              className="absolute right-0 bottom-1/3 w-full h-[1px] bg-orange-600/10"
              initial={{ scaleX: 0, transformOrigin: '100% 0%' }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            <motion.div
              className="absolute right-1/4 top-0 w-[1px] h-full bg-orange-600/10"
              initial={{ scaleY: 0, transformOrigin: '0% 0%' }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
            <motion.div
              className="absolute left-3/4 top-0 w-[1px] h-full bg-orange-600/10"
              initial={{ scaleY: 0, transformOrigin: '0% 0%' }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-orange-600"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('performanceTitle')}
          </motion.h2>

          {/* Robotic circuit pattern background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,50 C200,150 300,0 500,100 C700,200 800,100 1000,150"
                stroke="rgba(249, 115, 22, 0.1)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
              <motion.path
                d="M0,200 C150,150 350,250 500,200 C650,150 750,250 1000,200"
                stroke="rgba(249, 115, 22, 0.1)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M0,350 C200,300 300,400 500,350 C700,300 800,400 1000,350"
                stroke="rgba(249, 115, 22, 0.1)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </svg>

            {/* Digital nodes */}
            {Array.from({ length: 10 }, (_, i) => {
              // Pre-calculate random values
              const width = 4 + Math.random() * 4
              const height = 4 + Math.random() * 4
              const leftPos = Math.random() * 100
              const topPos = Math.random() * 100
              const duration = 2 + Math.random() * 3
              const delay = Math.random() * 2
              const repeatDelay = Math.random() * 3 + 1
              // Create a stable ID
              const nodeId = `circuit-node-${i}-${width.toFixed(1)}-${leftPos.toFixed(1)}-${topPos.toFixed(1)}`

              return (
                <motion.div
                  key={nodeId}
                  className="absolute rounded-full bg-orange-600/20"
                  style={{
                    width: width,
                    height: height,
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatDelay,
                  }}
                />
              )
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="&ldquo;OpenAutomate has allowed us to save over 120 hours per month on repetitive tasks while giving us full control over our automation infrastructure.&rdquo;"
              name="Alex Chen"
              title="IT Director, Healthcare Solutions Inc."
              animationProps={{
                initial: { opacity: 0, x: -30 },
                delay: 0.1,
              }}
              motionDelay={0}
              repeatDelay={2}
            />

            <TestimonialCard
              quote="&ldquo;Switching to OpenAutomate reduced our automation costs by 70% while giving our team the flexibility to customize processes to our exact needs.&rdquo;"
              name="Sarah Johnson"
              title="CTO, Finance Partners"
              animationProps={{
                initial: { opacity: 0, y: 30 },
                delay: 0.3,
              }}
              motionDelay={0.5}
              repeatDelay={3}
            />

            <TestimonialCard
              quote="&ldquo;The Python-based architecture has transformed our engineering team's ability to customize workflows and integrate with our internal systems.&rdquo;"
              name="Michael Johnson"
              title="Lead Developer, FinTech"
              animationProps={{
                initial: { opacity: 0, x: 30 },
                delay: 0.5,
              }}
              motionDelay={1}
              repeatDelay={4}
            />
          </div>

          {/* Animated connection lines */}
          <div className="absolute left-1/6 top-1/2 right-1/6 h-0.5 opacity-10 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-orange-600"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />

            {/* Connection dots */}
            <motion.div
              className="absolute left-0 top-1/2 w-2 h-2 -translate-y-1/2 bg-orange-600 rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.0 }}
            />
            <motion.div
              className="absolute right-0 top-1/2 w-2 h-2 -translate-y-1/2 bg-orange-600 rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.3 }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600/10 text-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6 text-orange-600">{t('readyTitle')} </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t('readyParagraph')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LaunchButton
              size="lg"
              variant="secondary"
              className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 hover:translate-y-[-2px]"
            />
            <Link href={config.paths.pages.contact}>
              <Button
                size="lg"
                variant="outline"
                className="text-orange-600 border-orange-600 hover:bg-orange-600/10 transition-all duration-300 hover:translate-y-[-2px]"
              >
                {t('contactSales')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}
