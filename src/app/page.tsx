'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Footer } from '@/components/layout/footer'
import { LaunchButton } from '@/components/launch-button'
import { config } from '@/lib/config'
import SplashScreen from '@/components/layout/splashScreen'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

// Robot animation variants
const roboticVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const circuitLineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: 'easeInOut' },
  },
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
  const path4 = 'M200,350 C250,350 250,300 300,300'
  const path5 = 'M800,350 C750,350 750,300 700,300'
  const path6 = 'M150,50 L150,350'
  const path7 = 'M850,50 L850,350'

  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      viewBox="0 0 1000 400"
      xmlns="http://www.w3.org/2000/svg"
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

      {/* Glowing effect behind main circuit nodes */}
      <motion.circle
        cx="200"
        cy="100"
        r="40"
        initial={{ opacity: 0.4 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
          transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
        fill="url(#circuitGlow)"
      />
      <motion.circle
        cx="800"
        cy="100"
        r="40"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
        fill="url(#circuitGlow)"
      />
      <motion.circle
        cx="500"
        cy="50"
        r="30"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.15, 1],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
        fill="url(#circuitGlow)"
      />

      {/* Binary code background effect */}
      <motion.text
        x="80"
        y="40"
        fill="rgba(249, 115, 22, 0.07)"
        fontFamily="monospace"
        fontSize="10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          transition: {
            delay: 1,
            duration: 5,
            repeat: Infinity,
            repeatDelay: 3,
          },
        }}
      >
        10110010 01001101 11001010
      </motion.text>
      <motion.text
        x="700"
        y="30"
        fill="rgba(249, 115, 22, 0.07)"
        fontFamily="monospace"
        fontSize="10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          transition: {
            delay: 2,
            duration: 5,
            repeat: Infinity,
            repeatDelay: 4,
          },
        }}
      >
        01010111 00110101 10101100
      </motion.text>
      <motion.text
        x="300"
        y="380"
        fill="rgba(249, 115, 22, 0.07)"
        fontFamily="monospace"
        fontSize="10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          transition: {
            delay: 3,
            duration: 5,
            repeat: Infinity,
            repeatDelay: 5,
          },
        }}
      >
        11100101 01010010 00101011
      </motion.text>

      {/* Main circuit paths */}
      <motion.path
        variants={circuitLineVariants}
        d={path1}
        fill="none"
        stroke="rgba(249, 115, 22, 0.3)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))"
      />
      <motion.path
        variants={circuitLineVariants}
        d={path2}
        fill="none"
        stroke="rgba(249, 115, 22, 0.3)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))"
      />
      <motion.path
        variants={circuitLineVariants}
        d={path3}
        fill="none"
        stroke="rgba(249, 115, 22, 0.3)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))"
      />
      <motion.path
        variants={circuitLineVariants}
        d={path4}
        fill="none"
        stroke="rgba(249, 115, 22, 0.3)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        variants={circuitLineVariants}
        d={path5}
        fill="none"
        stroke="rgba(249, 115, 22, 0.3)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Additional circuit lines */}
      <motion.path
        variants={circuitLineVariants}
        d={path6}
        fill="none"
        stroke="rgba(249, 115, 22, 0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="10,5"
      />
      <motion.path
        variants={circuitLineVariants}
        d={path7}
        fill="none"
        stroke="rgba(249, 115, 22, 0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="10,5"
      />
      <motion.path
        variants={circuitLineVariants}
        d="M50,250 L950,250"
        fill="none"
        stroke="rgba(249, 115, 22, 0.15)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="5,10"
      />

      {/* Pulse wave horizontal line */}
      <motion.path
        d="M50,180 Q100,150 150,180 T250,180 T350,180 T450,180 T550,180 T650,180 T750,180 T850,180 T950,180"
        fill="none"
        stroke="rgba(249, 115, 22, 0.1)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,
          transition: {
            delay: 1,
            duration: 2,
            ease: 'easeInOut',
          },
        }}
      />

      {/* Moving digital scan line */}
      <motion.rect
        width="100%"
        height="2"
        fill="rgba(249, 115, 22, 0.2)"
        initial={{ y: -10, opacity: 0 }}
        animate={{
          y: 410,
          opacity: [0, 0.5, 0],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'linear',
          },
        }}
      />

      {/* Data dots traveling along paths */}
      <DataDot path={path1} delay={0.5} duration={5} size={2.5} />
      <DataDot path={path1} delay={3.5} duration={5} size={2.5} />
      <DataDot path={path2} delay={1.2} duration={5} size={2.5} />
      <DataDot path={path2} delay={4.2} duration={5} size={2.5} />
      <DataDot path={path3} delay={0.8} duration={2} size={2} />
      <DataDot path={path3} delay={2.8} duration={2} size={2} />
      <DataDot path={path4} delay={2} duration={3} size={2} />
      <DataDot path={path5} delay={1} duration={3} size={2} />
      <DataDot path={path6} delay={0} duration={8} size={2} color="rgba(249, 115, 22, 0.6)" />
      <DataDot path={path6} delay={4} duration={8} size={2} color="rgba(249, 115, 22, 0.6)" />
      <DataDot path={path7} delay={2} duration={8} size={2} color="rgba(249, 115, 22, 0.6)" />
      <DataDot path={path7} delay={6} duration={8} size={2} color="rgba(249, 115, 22, 0.6)" />

      {/* Circuit nodes */}
      <motion.circle
        initial={{ r: 0, opacity: 0 }}
        animate={{
          r: 5,
          opacity: 1,
          transition: { delay: 0.5, duration: 0.5 },
        }}
        cx="200"
        cy="100"
        fill="rgba(249, 115, 22, 0.5)"
      />
      <motion.circle
        initial={{ r: 0, opacity: 0 }}
        animate={{
          r: 5,
          opacity: 1,
          transition: { delay: 0.8, duration: 0.5 },
        }}
        cx="300"
        cy="200"
        fill="rgba(249, 115, 22, 0.5)"
      />
      <motion.circle
        initial={{ r: 0, opacity: 0 }}
        animate={{
          r: 5,
          opacity: 1,
          transition: { delay: 1.1, duration: 0.5 },
        }}
        cx="800"
        cy="100"
        fill="rgba(249, 115, 22, 0.5)"
      />
      <motion.circle
        initial={{ r: 0, opacity: 0 }}
        animate={{
          r: 5,
          opacity: 1,
          transition: { delay: 1.4, duration: 0.5 },
        }}
        cx="700"
        cy="200"
        fill="rgba(249, 115, 22, 0.5)"
      />
      <motion.circle
        initial={{ r: 0, opacity: 0 }}
        animate={{
          r: 5,
          opacity: 1,
          transition: { delay: 1.7, duration: 0.5 },
        }}
        cx="500"
        cy="50"
        fill="rgba(249, 115, 22, 0.5)"
      />

      {/* Pulsing circuit nodes */}
      <motion.circle
        cx="150"
        cy="100"
        initial={{ r: 3 }}
        animate={{
          r: [3, 5, 3],
          opacity: [0.3, 0.7, 0.3],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
        fill="rgba(249, 115, 22, 0.5)"
      />
      <motion.circle
        cx="850"
        cy="100"
        initial={{ r: 3 }}
        animate={{
          r: [3, 5, 3],
          opacity: [0.3, 0.7, 0.3],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
        fill="rgba(249, 115, 22, 0.5)"
      />
      <motion.circle
        cx="150"
        cy="300"
        initial={{ r: 3 }}
        animate={{
          r: [3, 5, 3],
          opacity: [0.3, 0.7, 0.3],
          transition: {
            duration: 1.8,
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
        fill="rgba(249, 115, 22, 0.5)"
      />
      <motion.circle
        cx="850"
        cy="300"
        initial={{ r: 3 }}
        animate={{
          r: [3, 5, 3],
          opacity: [0.3, 0.7, 0.3],
          transition: {
            duration: 2.2,
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
        fill="rgba(249, 115, 22, 0.5)"
      />

      {/* Data processing text */}
      <motion.text
        x="120"
        y="80"
        fill="rgba(249, 115, 22, 0.3)"
        fontFamily="monospace"
        fontSize="8"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          transition: {
            delay: 2,
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 5,
          },
        }}
      >
        executing_automation_01
      </motion.text>
      <motion.text
        x="750"
        y="150"
        fill="rgba(249, 115, 22, 0.3)"
        fontFamily="monospace"
        fontSize="8"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          transition: {
            delay: 3,
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 4,
          },
        }}
      >
        process_automation_running
      </motion.text>
      <motion.text
        x="200"
        y="320"
        fill="rgba(249, 115, 22, 0.3)"
        fontFamily="monospace"
        fontSize="8"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          transition: {
            delay: 4,
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 6,
          },
        }}
      >
        system_calibration_active
      </motion.text>
    </motion.svg>
  )
}

export default function Home() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isLoading, setIsLoading] = useState(isHome)

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
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-orange-600/30"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 2 + Math.random() * 3,
                    delay: Math.random() * 5,
                    repeatDelay: Math.random() * 5,
                  },
                }}
              />
            ))}
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
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
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
              ))}
            </div>

            <div className="absolute top-2 right-12 flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
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
              ))}
            </div>
          </motion.div>

          <TypingText
            text="Open Source Automation is here."
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-orange-600"
          />
          <motion.p className="text-xl md:text-2xl max-w-3xl mb-10" variants={textVariants}>
            OpenAutomate provides a Python-based, open-source alternative to commercial automation
            platforms. Take control of your automation processes without licensing costs.
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
                  Explore the platform
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
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">
            The workflows of tomorrow start here
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-orange-600/10 flex items-center justify-center mb-4">
                  <Icons.check className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>No Vendor Lock-in</CardTitle>
                <CardDescription>
                  Full control over your automation assets and infrastructure with no proprietary
                  technologies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-orange-600/10 flex items-center justify-center mb-4">
                  <Icons.billing className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Cost Effective</CardTitle>
                <CardDescription>
                  Eliminate licensing costs while maintaining enterprise-grade automation
                  capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-orange-600/10 flex items-center justify-center mb-4">
                  <Icons.fileText className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Python-based</CardTitle>
                <CardDescription>
                  Leverage the power and flexibility of Python and its extensive library ecosystem.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">
            Solutions for every industry
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            <Button
              variant="outline"
              className="py-6 h-auto flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              <Icons.user className="h-6 w-6" />
              <span>Healthcare</span>
            </Button>

            <Button
              variant="outline"
              className="py-6 h-auto flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              <Icons.billing className="h-6 w-6" />
              <span>Finance</span>
            </Button>

            <Button
              variant="outline"
              className="py-6 h-auto flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              <Icons.check className="h-6 w-6" />
              <span>Insurance</span>
            </Button>

            <Button
              variant="outline"
              className="py-6 h-auto flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              <Icons.home className="h-6 w-6" />
              <span>Public Sector</span>
            </Button>

            <Button
              variant="outline"
              className="py-6 h-auto flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              <Icons.settings className="h-6 w-6" />
              <span>Manufacturing</span>
            </Button>

            <Button
              variant="outline"
              className="py-6 h-auto flex flex-col gap-2 hover:bg-orange-600/10 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              <Icons.file className="h-6 w-6" />
              <span>Retail</span>
            </Button>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Focus on core business, not automation infrastructure
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Eliminate repetitive, rules-based tasks and liberate your team&apos;s time for
                    strategic initiatives. OpenAutomate provides an end-to-end platform for
                    automation that&apos;s easy to deploy and manage.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Icons.check className="h-5 w-5 text-orange-600" />
                      <span>Reduction in automation platform costs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icons.check className="h-5 w-5 text-orange-600" />
                      <span>Decreased time to deploy new processes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icons.check className="h-5 w-5 text-orange-600" />
                      <span>Increased control over automation assets</span>
                    </li>
                  </ul>
                  <Link href={config.paths.pages.about} className="mt-6 inline-block">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 hover:translate-y-[-2px]">
                      Learn more
                    </Button>
                  </Link>
                </div>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Dashboard Preview</p>
                    <div className="bg-background border border-input p-4 rounded inline-block">
                      <Icons.chart className="h-10 w-10 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">
            The proof is in the performance
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Icons.help className="h-6 w-6 text-orange-600" />
                </div>
                <p className="italic text-muted-foreground mb-4">
                  &ldquo;OpenAutomate has allowed us to save over 120 hours per month on repetitive
                  tasks while giving us full control over our automation infrastructure.&rdquo;
                </p>
                <div>
                  <p className="font-semibold">Alex Chen</p>
                  <p className="text-sm text-muted-foreground">
                    IT Director, Healthcare Solutions Inc.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Icons.help className="h-6 w-6 text-orange-600" />
                </div>
                <p className="italic text-muted-foreground mb-4">
                  &ldquo;Switching to OpenAutomate reduced our automation costs by 70% while giving
                  our team the flexibility to customize processes to our exact needs.&rdquo;
                </p>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">CTO, Finance Partners</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Icons.help className="h-6 w-6 text-orange-600" />
                </div>
                <p className="italic text-muted-foreground mb-4">
                  &ldquo;The Python foundation of OpenAutomate means we can leverage our existing
                  skills and libraries. We&apos;ve cut development time in half.&rdquo;
                </p>
                <div>
                  <p className="font-semibold">Marcus Rivera</p>
                  <p className="text-sm text-muted-foreground">Automation Lead, TechInnovate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600/10 text-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6 text-orange-600">
            Ready to take control of your automation?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join organizations that have broken free from vendor lock-in and reduced costs while
            gaining more control over their automation processes.
          </p>
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
                Contact Sales
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
