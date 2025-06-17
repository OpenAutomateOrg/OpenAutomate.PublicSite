import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DescriptionSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Chạy trong context để dễ clean-up
    const ctx = gsap.context(() => {
      // 1️⃣ Timeline xuất hiện
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 100%', // 80% viewport
          once: true,
        },
      })

      tl.from('.chevron-left', { x: -60, opacity: 0 })
        .from('.description-text', { y: 20, opacity: 0 }, '-=0.4')
        .from('.chevron-right', { x: 60, opacity: 0 }, '-=0.4')

      // 2️⃣ Hiệu ứng nhấp-nháy nhẹ cho hai mũi tên (lặp vô hạn)
      gsap.to(['.chevron-left', '.chevron-right'], {
        x: (i) => (i === 0 ? -6 : 6), // trái ‒ phải
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert() // dọn dẹp khi unmount
  }, [])

  return (
    <div ref={sectionRef} className="flex flex-row justify-between items-center gap-8">
      {/* Description */}
      <div className="flex flex-row items-center space-x-4">
        {/* Chevron trái */}
        <div className="chevron-left text-neutral-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right-icon"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </div>

        {/* Nội dung */}
        <p className="description-text text-lg md:text-xl text-neutral-300">
          We help organisations build scalable, custom automation
          <br />
          workflows based on open-source technology and Python.
        </p>

        {/* Chevron phải */}
        <div className="chevron-right text-neutral-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right-icon"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
