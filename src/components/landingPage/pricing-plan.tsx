'use client'

// import { useTranslations } from 'next-intl'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const pricingPlans = [
  {
    name: 'Developer',
    price: '$19',
    period: 'per month',
    description: 'Perfect for individual developers',
    features: [
      '5 active projects',
      '10GB cloud storage',
      'Basic code editor',
      'Community support',
      'Standard deployment',
    ],
    popular: false,
  },
  {
    name: 'Team',
    price: '$49',
    period: 'per month',
    description: 'Ideal for development teams',
    features: [
      'Unlimited projects',
      '100GB cloud storage',
      'Advanced IDE features',
      'Priority support',
      'Team collaboration tools',
      'Advanced deployment options',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For large organizations',
    features: [
      'Unlimited everything',
      '1TB cloud storage',
      'Custom integrations',
      '24/7 dedicated support',
      'Advanced security features',
      'On-premise deployment',
    ],
    popular: false,
  },
]

export default function Pricing() {
  // const t = useTranslations('landing')

  const pricingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // pricing section animation
      gsap.from('.pricing-content', {
        scrollTrigger: {
          trigger: pricingRef.current,
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
      {/* Piricing Section */}
      <section ref={pricingRef} className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="section-title text-4xl sm:text-5xl font-bold text-white mb-6">
              Choose Your Development Plan
            </h2>
            <p className="section-title text-xl text-neutral-400 max-w-3xl mx-auto">
              Scale from individual projects to enterprise solutions. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card hover-card pricing-content relative p-10 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'border-orange-500 bg-gradient-to-br from-orange-900/20 to-red-900/20 shadow-xl'
                    : 'border-neutral-900  bg-neutral-950  hover:border-neutral-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-orange-600 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-neutral-400 ml-2 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-neutral-400 text-lg">{plan.description}</p>
                </div>

                <ul className="space-y-5 mb-10">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-6 h-6 text-orange-400 mr-4 flex-shrink-0" />
                      <span className="text-neutral-300 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`animated-button w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    plan.popular
                      ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
                      : 'bg-black text-white hover:bg-neutral-600'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
