'use client'

import FloatingGear from './Gear/floatingGear'

interface VideoDemoSectionProps {
  title?: string
  description?: string
  videoSrc?: string
  posterSrc?: string
  className?: string
}

export function VideoDemoSection({
  videoSrc = 'https://www.augmentcode.com/hero-agents/video.h264.mp4',
  posterSrc = '/placeholder.svg?height=400&width=600',
  className = 'bg-black',
}: Readonly<VideoDemoSectionProps>) {
  // Nếu không còn controls thì không cần state nữa
  return (
    <section
      className={`relative w-full flex justify-center items-center py-32 overflow-hidden ${className || ''}`}
    >
      {/* Floating Gears */}
      <FloatingGear size={45} position="top-12 left-8" />
      <FloatingGear size={60} position="top-20 right-12" />
      <FloatingGear size={40} position="bottom-16 left-16" />
      <FloatingGear size={55} position="bottom-20 right-8" />
      <FloatingGear size={35} position="top-1/3 left-4" />
      <FloatingGear size={50} position="bottom-1/3 right-4" />

      <div className="relative z-10 w-full md:w-2/3">
        <div className="relative flex justify-center rounded-2xl aspect-video w-full h-full bg-black">
          <video
            className="w-auto rounded-2xl h-full object-cover"
            poster={posterSrc}
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
