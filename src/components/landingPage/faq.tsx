import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslations } from 'next-intl'

export function Faq() {
  const faqRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('landing')
  const faqs = [
    {
      question: t('faq.item-1.question'),
      answer: t('faq.item-1.answer'),
    },
    {
      question: t('faq.item-2.question'),
      answer: t('faq.item-2.answer'),
    },
    {
      question: t('faq.item-3.question'),
      answer: t('faq.item-3.answer'),
    },
    {
      question: t('faq.item-4.question'),
      answer: t('faq.item-4.answer'),
    },
    {
      question: t('faq.item-5.question'),
      answer: t('faq.item-5.answer'),
    },
    {
      question: t('faq.item-6.question'),
      answer: t('faq.item-6.answer'),
    },
    {
      question: t('faq.item-7.question'),
      answer: t('faq.item-7.answer'),
    },
    {
      question: t('faq.item-8.question'),
      answer: t('faq.item-8.answer'),
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // faq section animation
      gsap.from('.faq-content', {
        scrollTrigger: {
          trigger: faqRef.current,
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
    <section ref={faqRef} className="w-full mx-auto px-4 py-8 bg-black ">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-orange-600">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="w-full space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-content border-b border-gray-700 pb-4">
              <div className="font-semibold text-xl mb-2 text-orange-600 drop-shadow-sm">
                {faq.question}
              </div>
              <div className="text-base text-white/50">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
