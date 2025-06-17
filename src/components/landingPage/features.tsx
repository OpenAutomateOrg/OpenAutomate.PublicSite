'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Cloud, Code2, Database } from 'lucide-react'

// Register GSAP plugins only in the browser
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'No Vendor Lock‑in',
    description: 'Full control over your automation assets and infrastructure—no proprietary tech.',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Cost Effective',
    description: 'Cut licensing fees while retaining enterprise‑grade automation capabilities.',
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Python‑based',
    description: 'Leverage the power and flexibility of Python and its vast library ecosystem.',
  },
]

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)

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
            Everything You Need to Build
          </h2>
          <p className="feature-title text-xl text-neutral-400 max-w-3xl mx-auto">
            A complete development environment with professional tools, cloud infrastructure, and
            team collaboration features.
          </p>
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
    //     <section ref={featuresRef} className="py-24 bg-gray-800">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center mb-20">
    //         <h2 className="section-title text-4xl sm:text-5xl font-bold text-white mb-6">
    //           Everything You Need to Build
    //         </h2>
    //         <p className="section-title text-xl text-gray-400 max-w-3xl mx-auto">
    //           A complete development environment with professional tools, cloud infrastructure, and team collaboration features.
    //         </p>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    //         {features.map((feature, index) => (
    //           <div
    //             key={index}
    //             className="feature-card hover-card p-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-700 hover:border-orange-600/50"
    //           >
    //             <div className="feature-icon w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white mb-8">
    //               {feature.icon}
    //             </div>
    //             <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
    //             <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>
  )
}
