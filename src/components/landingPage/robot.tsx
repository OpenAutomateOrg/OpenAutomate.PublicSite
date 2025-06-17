import { useLayoutEffect, useRef, memo } from 'react'
import { gsap } from 'gsap'

interface RobotProps {
  className?: string
  width?: string | number
  height?: string | number
}

/**
 * Animated robot SVG rendered with GSAP.
 *
 * • Entrance animation: scale/rotation + small ‘bounce’.
 * • Continuous subtle float, eye‑blink, antenna wiggle and drop‑shadow pulse.
 *
 * The component is memoised so it re‑renders only when its props change.
 */
const Robot: React.FC<RobotProps> = ({ className, width, height }: RobotProps) => {
  const robotRef = useRef<SVGSVGElement | null>(null)

  useLayoutEffect(() => {
    if (!robotRef.current) return

    // All GSAP calls inside `ctx` are scoped to `robotRef`.
    const ctx = gsap.context(() => {
      /* ---------- ENTRANCE ---------- */
      gsap
        .timeline({ defaults: { ease: 'back.out(1.7)' } })
        .from(robotRef.current, {
          scale: 0,
          rotation: -360,
          opacity: 0,
          duration: 1.2,
          transformOrigin: 'center center',
        })
        .to(robotRef.current, {
          y: -8,
          repeat: 2,
          yoyo: true,
          duration: 0.25,
          ease: 'sine.out',
        })

      /* ---------- INFINITE LOOP ---------- */
      const LOOP_DELAY = 1.2

      // Gentle hover
      gsap.to(robotRef.current, {
        y: -3,
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: 'sine.inOut',
        delay: LOOP_DELAY,
      })

      // Eye blink
      gsap.to('.eye', {
        scaleY: 0.1,
        transformOrigin: 'center center',
        repeat: -1,
        yoyo: true,
        repeatDelay: 3,
        duration: 0.15,
        ease: 'power2.inOut',
        delay: LOOP_DELAY,
      })

      // Antenna wiggle
      gsap.to('.antenna', {
        rotation: 25,
        transformOrigin: 'bottom center',
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: 'sine.inOut',
        delay: LOOP_DELAY,
      })

      // Glow pulse
      gsap.to(robotRef.current, {
        filter: 'drop-shadow(0 0 8px rgba(253,186,116,0.8))',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
        delay: LOOP_DELAY,
      })
    }, robotRef) // <- scope

    // Clean up on unmount/StrictMode re-run
    return () => ctx.revert()
  }, [])

  return (
    <>
      <svg
        ref={robotRef}
        className={`flex-shrink-0 text-orange-600 ${className}`}
        width={width}
        height={height}
        viewBox="0 0 60 60"
        fill="currentColor"
      >
        {/* Antenna */}
        <g className="antenna">
          <line
            x1="30"
            y1="8"
            x2="30"
            y2="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="30" cy="0" r="2" />
        </g>

        {/* Body / Head */}
        <rect x="8" y="12" width="44" height="30" rx="6" />

        {/* Eyes */}
        <circle className="eye" cx="20" cy="28" r="4" fill="#ffffff" />
        <circle className="eye" cx="40" cy="28" r="4" fill="#ffffff" />
      </svg>
    </>
  )
}

export default memo(Robot)
