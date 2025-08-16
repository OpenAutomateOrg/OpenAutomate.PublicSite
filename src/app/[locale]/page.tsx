'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Button } from '@/components/ui/button'
import { VideoDemoSection } from '@/components/layout/video-demo'
import { Faq } from '@/components/landingPage/faq'
import { AnimatedText } from '@/components/landingPage/gsap-animation'
import Pricing from '@/components/landingPage/pricing-plan'
import Features from '@/components/landingPage/features'
import FloatingGear from '@/components/landingPage/Gear/floatingGear'
import Robot from '@/components/landingPage/robot'
import DescriptionSection from '@/components/landingPage/description'
import { useTranslations } from 'next-intl'
import { LaunchButton } from '@/components/launch-button'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Home() {
  const automationTitleRef = useRef<HTMLHeadingElement>(null)
  const videoDemoRef = useRef<HTMLElement>(null)
  const t = useTranslations('landing')

  const scrollToVideoDemo = () => {
    if (videoDemoRef.current) {
      const element = videoDemoRef.current
      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate position to center the video in viewport
      const offsetPosition = elementTop - windowHeight / 2 + elementHeight / 2

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      console.log('Scrolling to video demo center...', videoDemoRef.current)
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
      if (automationTitleRef.current) {
        const titleText = automationTitleRef.current.textContent ?? ''
        automationTitleRef.current.innerHTML = ''

        // Create spans for each word
        const words = titleText.split(' ')
        words.forEach((word, wordIndex) => {
          const wordSpan = createWordSpan(word)
          automationTitleRef.current?.appendChild(wordSpan)

          // Add space between words (except for the last word)
          if (wordIndex < words.length - 1) {
            const spaceSpan = document.createElement('span')
            spaceSpan.innerHTML = '&nbsp;'
            automationTitleRef.current?.appendChild(spaceSpan)
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
    gsap.set(buttons, { y: 60, opacity: 10 })
    gsap.to(buttons, {
      y: 0,
      opacity: 1,
      duration: 1, // thời gian mỗi nút
      ease: 'power1.out',
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Header />
      <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-neutral-700 to-black overflow-hidden">
        {/* Floating gears */}
        <FloatingGear size={128} position="top-20 left-20" />
        <FloatingGear size={80} position="top-40 right-32" />
        <FloatingGear size={96} position="bottom-70 left-40" />
        <FloatingGear size={64} position="top-20 right-20" />
        <FloatingGear size={96} position="bottom-60 right-45" />

        <main className="flex-1 flex flex-col min-h-screen justify-center px-8 md:px-16 lg:px-24">
          {/* Main headline */}
          <div className="space-y-4 mb-20">
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-bold leading-none tracking-tight">
              <div className="flex flex-row items-center gap-3">
                {/* "Open" bên trái */}
                <AnimatedText text="Open" className="font-bold text-white leading-tight" />

                {/* Robot màu orange-600, tự canh giữa nhờ flex + items-center */}
                <Robot width={80} height={80} />

                {/* "source" bên phải */}
                <AnimatedText text="source" className="font-bold text-white leading-tight" />
              </div>
              <span
                ref={automationTitleRef}
                className="block  relative font-bold text-white mb-8 leading-tight text-right"
              >
                automation
              </span>
            </h1>
          </div>
          <div className="flex flex-row justify-between align-center items-center gap-8">
            {/* Description */}
            <DescriptionSection />

            <div className="flex right-8">
              <Button
                variant={'outline'}
                aria-label="View Live Demo"
                className="h-full animated-button button-show bg-transparent text-neutral-300 px-10 py-5 rounded-xl text-xl font-semibold hover:bg-orange-600 hover:text-white hover:scale-102 hover:shadow-md"
                onClick={scrollToVideoDemo}
              >
                {t('button.viewLiveDemo')}
              </Button>
              <LaunchButton
                className={
                  'animated-button button-show h-full ml-3 group bg-orange-600 text-white px-10 py-5 rounded-xl text-xl font-semibold transition-all duration-200 shadow-lg flex items-center '
                }
              ></LaunchButton>
            </div>
          </div>
        </main>
      </section>
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
    </>
  )
}
