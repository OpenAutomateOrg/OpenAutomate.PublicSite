'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Cloud, Code2, Database } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Register GSAP plugins only in the browser
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('landing')

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: t('features.noVendorLockIn.title'),
      description: t('features.noVendorLockIn.desc'),
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: t('features.costEffective.title'),
      description: t('features.costEffective.desc'),
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: t('features.pythonBased.title'),
      description: t('features.pythonBased.desc'),
    },
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Features section animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Feature icons animation
      gsap.from('.feature-icon', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        scale: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.3,
      })
    }, featuresRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={featuresRef} className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="feature-title text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('features.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card hover-card transform-gpu p-10 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-neutral-700 hover:border-orange-600/50 will-change-transform"
            >
              <div className="feature-icon w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
