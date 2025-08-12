'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Newsletter() {
  const t = useTranslations('newsletter')

  const newsletterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Newsletter section animation
      gsap.from('.newsletter-content', {
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Newsletter Section */}
      <section
        ref={newsletterRef}
        className="py-24 bg-gradient-to-r from-orange-600 to-red-500 relative overflow-hidden"
      >
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full floating-1 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full floating-2 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full floating-3 blur-lg"></div>

        <div className="newsletter-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder={t('placeholder')}
              className="flex-1 px-8 py-4 rounded-xl border-0 focus:ring-4 focus:ring-orange-200 focus:outline-none text-lg bg-white/90"
            />
            <button className="animated-button bg-white text-orange-600 px-10 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-colors whitespace-nowrap text-lg">
              {t('button')}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
