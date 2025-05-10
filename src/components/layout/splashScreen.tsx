'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'

// Define window.anime for TypeScript
// declare global {
//   interface Window {
//     anime: {
//       timeline: () => any
//       (params: any): any
//       stagger: (value: number, options?: any) => any
//     }
//   }
// }

function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [circuitLines, setCircuitLines] = useState<
    Array<{ id: string; top: string; left: string; isHorizontal: boolean }>
  >([])

  // Handle script loading
  const handleScriptLoad = () => {
    console.log('Anime.js script loaded successfully')
    setScriptLoaded(true)
  }

  // Generate circuit lines only on client side
  useEffect(() => {
    // Create 10 horizontal and 10 vertical lines with fixed positions
    const lines = []

    // Create horizontal lines
    for (let i = 0; i < 10; i++) {
      lines.push({
        id: `h-${i}`,
        top: `${(i + 1) * 9}%`,
        left: `${i * 8 + 5}%`,
        isHorizontal: true,
      })
    }

    // Create vertical lines
    for (let i = 0; i < 10; i++) {
      lines.push({
        id: `v-${i}`,
        top: `${i * 9 + 5}%`,
        left: `${(i + 1) * 9}%`,
        isHorizontal: false,
      })
    }

    setCircuitLines(lines)
  }, [])

  useEffect(() => {
    // Only run animation if the script has loaded
    if (!scriptLoaded) {
      console.log('Waiting for script to load...')
      return
    }

    console.log('Starting animation sequence')

    // Access the global anime object (from the CDN)
    if (!window.anime) {
      console.error('anime.js not found on window object')
      return
    }

    try {
      // Create circuit lines animation
      window.anime({
        targets: '.circuit-line',
        translateX: function (el: Element) {
          return el.classList.contains('horizontal') ? ['-100%', '100%'] : 0
        },
        translateY: function (el: Element) {
          return el.classList.contains('vertical') ? ['-100%', '100%'] : 0
        },
        opacity: [0, 0.8, 0],
        easing: 'steps(5)',
        delay: window.anime.stagger(200, { from: 'center' }),
        duration: 1500,
        loop: true,
      })

      // Create grid background
      window.anime({
        targets: '.grid-background',
        opacity: [0, 0.15],
        duration: 800,
        easing: 'easeOutQuad',
      })

      // Create digital noise effect
      const glitchAnimation = window.anime({
        targets: '.logo-glitch',
        opacity: [0, 0.2, 0],
        translateX: window.anime.stagger(5, { from: 'center', direction: 'normal' }),
        translateY: window.anime.stagger(2, { from: 'center', direction: 'normal' }),
        scale: [1, 1.02, 1],
        duration: 200,
        easing: 'steps(2)',
        loop: true,
      })

      // Create robotic assembly animation for the logo
      const roboticAssembly = window.anime.timeline({
        easing: 'easeOutExpo',
      })

      roboticAssembly
        // Scanning line from top to bottom
        .add({
          targets: '.scan-line',
          translateY: ['0%', '100%'],
          opacity: [0.7, 0],
          duration: 1000,
          easing: 'linear',
        })
        // Logo parts appear with mechanical precision
        .add(
          {
            targets: '.logo-part',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: window.anime.stagger(150),
            duration: 500,
            easing: 'cubicBezier(0.22, 1, 0.36, 1)',
          },
          '-=800',
        )
        // Logo container spins and locks in
        .add(
          {
            targets: '.logo-container',
            rotateZ: [90, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'cubicBezier(0.22, 1, 0.36, 1)',
          },
          '-=400',
        )
        // Text appears with typewriter effect
        .add(
          {
            targets: '.text-character',
            opacity: [0, 1],
            duration: 20,
            delay: window.anime.stagger(50),
            easing: 'steps(1)',
          },
          '-=400',
        )
        // System status line
        .add({
          targets: '.system-status',
          width: ['0%', '100%'],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeInOutQuart',
        })
        // System ready text
        .add({
          targets: '.system-ready',
          opacity: [0, 1],
          duration: 400,
        })

      // Set timeout to hide splash screen with mechanical shutdown
      const timeoutId = setTimeout(() => {
        window.anime({
          targets: '.splash-screen',
          opacity: [1, 0],
          duration: 600,
          easing: 'cubicBezier(0.22, 1, 0.36, 1)',
          complete: () => {
            console.log('Animation complete, hiding splash screen')
            setVisible(false)
          },
        })
      }, 4000)

      // Clean up timeout if component unmounts
      return () => {
        console.log('Cleaning up timeout')
        if (timeoutId) clearTimeout(timeoutId)
        if (glitchAnimation) glitchAnimation.pause()
      }
    } catch (err) {
      console.error('Error in animation:', err)
    }
  }, [scriptLoaded])

  useEffect(() => {
    // Split text into individual characters for robotic typing effect
    if (scriptLoaded && typeof document !== 'undefined') {
      const textElement = document.querySelector('.splash-text h1')
      if (textElement && textElement.innerHTML) {
        const text = textElement.innerHTML
        let splitText = ''

        for (let i = 0; i < text.length; i++) {
          splitText += `<span class="text-character">${text[i]}</span>`
        }

        textElement.innerHTML = splitText
      }
    }
  }, [scriptLoaded])

  if (!visible) return null

  return (
    <>
      {/* Load anime.js from CDN to avoid module issues */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
        onLoad={handleScriptLoad}
        strategy="afterInteractive"
        onError={() => console.error('Failed to load anime.js script')}
      />

      {/* Add a key to force re-render when script loads */}
      <div
        key={scriptLoaded ? 'loaded' : 'loading'}
        className="splash-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#0f0a05' }} // Darker background for orange theme
      >
        {/* Digital grid background */}
        <div
          className="grid-background absolute inset-0 opacity-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 102, 0, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 102, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Circuit lines - Only rendered client-side */}
        <div className="absolute inset-0 overflow-hidden">
          {circuitLines.map((line) => (
            <div
              key={line.id}
              className={`circuit-line ${line.isHorizontal ? 'horizontal' : 'vertical'} absolute ${line.isHorizontal ? 'h-[1px] w-[100px]' : 'h-[100px] w-[1px]'} bg-orange-500 opacity-0`}
              style={{
                top: line.top,
                left: line.left,
                transform: line.isHorizontal ? 'translateX(-100%)' : 'translateY(-100%)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Logo container with mechanical styling */}
          <div className="logo-container relative mb-8">
            {/* Scanning line */}
            <div className="scan-line absolute left-0 top-0 z-20 h-[5px] w-full bg-orange-500 opacity-1" />

            {/* Glitch copy of logo */}
            <div
              className="logo-glitch absolute left-0 top-0 opacity-0"
              style={{ filter: 'blur(2px)' }}
            >
              <Image
                src="/logo-oa.png"
                alt=""
                width={320}
                height={320}
                style={{ filter: 'hue-rotate(10deg)' }}
              />
            </div>

            {/* Logo broken into parts for robotic assembly */}
            <div
              className="logo-part absolute left-0 opacity-0 top-[0%]"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 25%, 0% 25%)' }}
            >
              <Image src="/logo-oa.png" alt="" width={320} height={320} />
            </div>
            <div
              className="logo-part absolute left-0 opacity-0 top-[0%]"
              style={{ clipPath: 'polygon(0% 25%, 100% 25%, 100% 50%, 0% 50%)' }}
            >
              <Image src="/logo-oa.png" alt="" width={320} height={320} />
            </div>
            <div
              className="logo-part absolute left-0 opacity-0 top-[0%]"
              style={{ clipPath: 'polygon(0% 50%, 100% 50%, 100% 75%, 0% 75%)' }}
            >
              <Image src="/logo-oa.png" alt="" width={320} height={320} />
            </div>
            <div
              className="logo-part absolute left-0 opacity-0 top-[0%]"
              style={{ clipPath: 'polygon(0% 75%, 100% 75%, 100% 100%, 0% 100%)' }}
            >
              <Image src="/logo-oa.png" alt="" width={320} height={320} />
            </div>
          </div>

          <div className="splash-text mt-4 w-full max-w-[500px]">
            <h1
              className="text-5xl font-bold tracking-wide text-orange-500"
              style={{ fontFamily: 'monospace' }}
            >
              OpenAutomate
            </h1>

            {/* Status line like a progress bar */}
            <div className="mt-4 h-[2px] w-full overflow-hidden rounded bg-orange-900/30">
              <div className="system-status h-full w-0 bg-orange-500" />
            </div>

            <p className="system-ready mt-3 opacity-0 text-xl text-orange-300 font-mono">
              SYSTEM READY
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SplashScreen
