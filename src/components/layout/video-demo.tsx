'use client'

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
}: VideoDemoSectionProps) {
  // Nếu không còn controls thì không cần state nữa
  return (
    <section className={`w-full flex justify-center items-center py-8 ${className || ''}`}>
      <div className="w-full md:w-2/3">
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
