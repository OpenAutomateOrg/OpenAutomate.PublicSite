// AnimatedComponents.tsx
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/* ------------ AnimatedText ------------ */
interface AnimatedTextProps {
  text: string
  className?: string
  stagger?: number // tuỳ chọn tempo
}

export function AnimatedText({ text, className = '', stagger = 0.5 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    /* gsap.context giúp auto-revert khi unmount hoặc hot reload */
    const ctx = gsap.context(() => {
      const chars = containerRef.current!.children
      const tl = gsap.timeline({
        defaults: { opacity: 0, duration: 1, ease: 'power3.out' },
      })

      Array.from(chars).forEach((el, idx) => {
        const variant = idx % 5
        const time = `-=${1 - stagger}` // độ chồng thời gian

        switch (variant) {
          case 0:
            tl.from(el, { y: 60 }, time)
            break
          case 1:
            tl.from(el, { y: -60 }, time)
            break
          case 2:
            tl.from(el, { rotation: -180, scale: 0 }, time)
            break
          case 3:
            tl.from(el, { rotationY: 180 }, time)
            break
          default:
            tl.from(el, { scale: 0 }, time)
        }
      })
    }, containerRef)

    return () => ctx.revert() // cleanup
  }, [text, stagger])

  return (
    <span ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
