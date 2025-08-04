import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image, { StaticImageData } from 'next/image'

interface TeamMemberProps {
  name: string
  role: string
  image: StaticImageData
  delay?: number
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const imageEl = imageRef.current
    const content = contentRef.current

    if (!card || !imageEl || !content) return

    // Initial animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 100,
        rotationX: -15,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1.2,
        delay,
        ease: 'power3.out',
      },
    )

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        rotationY: 8,
        rotationX: -5,
        scale: 1.05,
        z: 50,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.to(imageEl, {
        scale: 1.1,
        rotationZ: 2,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.to(content, {
        y: -10,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        z: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.to(imageEl, {
        scale: 1,
        rotationZ: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.to(content, {
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [delay])

  return (
    <Card
      ref={cardRef}
      className="group pt-0 bg-neutral-950 border-orange-600/30  relative overflow-hidden rounded-2xl shadow-xl  transform-gpu perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Image */}
      <CardHeader className="p-0">
        <div ref={imageRef} className="relative h-96 overflow-hidden">
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </CardHeader>

      <CardContent ref={contentRef} className="py-2 px-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-orange-600 font-semibold text-sm uppercase tracking-wide">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TeamMember
