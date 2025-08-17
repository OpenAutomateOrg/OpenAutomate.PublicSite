'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Button } from '@/components/ui/button'
import { VideoDemoSection } from '@/components/layout/landingPage/videoDemo'
import { Faq } from '@/components/layout/landingPage/faq'
import { AnimatedText } from '@/components/layout/landingPage/gsapAnimation'
import Pricing from '@/components/layout/landingPage/pricingPlan'
import Features from '@/components/layout/landingPage/features'
import Robot from '@/components/layout/landingPage/robot'
import DescriptionSection from '@/components/layout/landingPage/description'
import { useTranslations } from 'next-intl'
import { LaunchButton } from '@/components/launch-button'
import '@/components/layout/landingPage/heroSection/heroSection.css'
import { SkipForward } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Home() {
  const automateTitleRef = useRef<HTMLHeadingElement>(null)
  const videoDemoRef = useRef<HTMLElement>(null)
  const t = useTranslations('landing')

  const scrollToVideoDemo = () => {
    if (videoDemoRef.current) {
      videoDemoRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
  // Handlers for button hover, moved out to avoid deep nesting
  function mouseEnterHandlerFactory(tl: gsap.core.Timeline) {
    return () => {
      tl.play()
    }
  }
  function mouseLeaveHandlerFactory(tl: gsap.core.Timeline) {
    return () => {
      tl.reverse()
    }
  }

  useLayoutEffect(() => {
    // Helper function to create a span for a character
    function createCharSpan(char: string): HTMLSpanElement {
      const charSpan = document.createElement('span')
      charSpan.textContent = char
      charSpan.className = 'automation-char inline-block'
      charSpan.style.opacity = '0'
      charSpan.style.transform = 'translateY(100px) rotateX(-90deg)'
      return charSpan
    }

    // Helper function to create a span for a word
    function createWordSpan(word: string): HTMLSpanElement {
      const wordSpan = document.createElement('span')
      wordSpan.className = 'inline-block'
      word.split('').forEach((char) => {
        wordSpan.appendChild(createCharSpan(char))
      })
      return wordSpan
    }

    // Extracted event handlers for card hover animations to avoid deep nesting
    function handleCardMouseEnter(tl: gsap.core.Timeline) {
      tl.play()
    }
    function handleCardMouseLeave(tl: gsap.core.Timeline) {
      tl.reverse()
    }

    // Handlers for card hover, moved out to avoid deep nesting
    function cardMouseEnterHandler(tl: gsap.core.Timeline) {
      return () => handleCardMouseEnter(tl)
    }
    function cardMouseLeaveHandler(tl: gsap.core.Timeline) {
      return () => handleCardMouseLeave(tl)
    }

    const ctx = gsap.context(() => {
      // Split the automation title into individual characters for animation
      if (automateTitleRef.current) {
        const titleText = automateTitleRef.current.textContent ?? ''
        automateTitleRef.current.innerHTML = ''

        // Create spans for each word
        const words = titleText.split(' ')
        words.forEach((word, wordIndex) => {
          const wordSpan = createWordSpan(word)
          automateTitleRef.current?.appendChild(wordSpan)

          // Add space between words (except for the last word)
          if (wordIndex < words.length - 1) {
            const spaceSpan = document.createElement('span')
            spaceSpan.innerHTML = '&nbsp;'
            automateTitleRef.current?.appendChild(spaceSpan)
          }
        })
      }
      // Page load sequence
      const masterTl = gsap.timeline()

      // Animated automation title with staggered character entrance
      masterTl
        .to(
          '.automation-char',
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: {
              amount: 1.5,
              from: 'start',
              ease: 'power2.out',
            },
            ease: 'back.out(1.7)',
          },
          '-=0.2',
        )

        // Add a glitch effect to "automation"
        .to(
          '.automation-char:nth-last-child(-n+11)',
          {
            color: '#ea580c',
            textShadow: '0 0 10px #ea580c, 0 0 20px #ea580c, 0 0 30px #ea580c',
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            ease: 'power2.inOut',
          },
          '-=0.5',
        )

        // Continuous text glow animation for "automation"
        .to(
          '.automation-char:nth-last-child(-n+11)',
          {
            textShadow: '0 0 5px #ea580c, 0 0 10px #ea580c, 0 0 15px #ea580c',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
          },
          '-=0.3',
        )
      const cards = document.querySelectorAll('.hover-card')
      cards.forEach((card) => {
        const tl = gsap.timeline({ paused: true })
        tl.to(card, {
          y: -15,
          scale: 1.03,
          boxShadow: '0 20px 40px rgba(234, 88, 12, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        })

        card.addEventListener('mouseenter', cardMouseEnterHandler(tl))
        card.addEventListener('mouseleave', cardMouseLeaveHandler(tl))
      })
      // Button animations
      const buttons = document.querySelectorAll('.animated-button')

      buttons.forEach((button) => {
        const tl = gsap.timeline({ paused: true })
        tl.to(button, {
          scale: 1.05,
          y: -2,
          duration: 0.2,
          ease: 'power2.out',
        })

        button.addEventListener('mouseenter', mouseEnterHandlerFactory(tl))
        button.addEventListener('mouseleave', mouseLeaveHandlerFactory(tl))
      })
    })
    const buttons = gsap.utils.toArray('.button-show')
    gsap.set(buttons, { y: 60, opacity: 0 })
    gsap.to(buttons, {
      y: 0,
      opacity: 1,
      duration: 1, // thời gian mỗi nút
      ease: 'power1.out',
    })
    return () => ctx.revert()
  }, [])

  // Load the Three.js hero script on the client after the hero container exists
  useEffect(() => {
    const container = document.getElementById('hero-section')
    if (!container) return
    import('@/components/layout/landingPage/heroSection/heroSection.js').catch((err) =>
      console.error('Failed to load heroSection.js', err),
    )
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Content Section with Three.js Background */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Three.js Background Container - only for hero section, positioned below header */}
        <div id="hero-section" className="absolute inset-0 z-0" />

        <main className="hero relative z-20 max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="hero-inner flex flex-col items-center text-center space-y-8">
            {/* Main headline */}
            <div className="space-y-4 mb-0">
              <h1 className="  leading-none tracking-tight">
                <div className="flex flex-row items-center justify-center gap-3 ">
                  {/* "Open" bên trái */}
                  <AnimatedText
                    text="Open"
                    className="text-6xl md:text-7xl lg:text-8xl text-white leading-tight"
                  />

                  {/* Robot màu orange-600, tự canh giữa nhờ flex + items-center */}
                  <Robot width={60} height={60} />
                  <span
                    ref={automateTitleRef}
                    className="text-6xl md:text-7xl lg:text-8xl block font-bold text-white leading-tight"
                  >
                    Automate
                  </span>
                </div>
              </h1>
            </div>

            {/* Description - Centered */}
            <div className="max-w-2xl mx-auto">
              <DescriptionSection />
            </div>

            {/* Buttons - Centered */}
            <div className="flex flex-col gap-5 items-center justify-center w-full max-w-md mx-auto">
              <LaunchButton
                id="exploreBtn"
                className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl flex items-center justify-center hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all duration-300 hover:shadow-orange-500/25"
              ></LaunchButton>
              <Button
                variant="outline"
                aria-label="View Live Demo"
                className="animated-button button-show w-full bg-neutral-900/70 text-neutral-100 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-orange-600 hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-200 border-2 border-orange-600 flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToVideoDemo()
                }}
              >
                {t('button.viewLiveDemo')}
                <SkipForward size={20} />
              </Button>
            </div>
          </div>
        </main>
      </section>

      <div>
        {/* Video Demo Section */}
        <section ref={videoDemoRef}>
          <VideoDemoSection />
        </section>

        {/* Features Section */}
        <Features />

        {/* Pricing Section */}
        <Pricing />

        {/* Frequently asked questions Section */}
        <Faq />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
