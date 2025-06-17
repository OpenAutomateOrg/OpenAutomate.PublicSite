import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const faqs = [
  {
    id: 'item-1',
    question: 'What is your return policy?',
    answer:
      "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return, and we'll provide you with a prepaid shipping label.",
  },
  {
    id: 'item-2',
    question: 'How long does shipping take?',
    answer:
      'Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for 1-2 day delivery. International shipping times vary by location but generally take 7-14 business days.',
  },
  {
    id: 'item-3',
    question: 'Do you offer customer support?',
    answer:
      'Yes! Our customer support team is available Monday through Friday, 9 AM to 6 PM EST. You can reach us via email, phone, or live chat. We strive to respond to all inquiries within 24 hours.',
  },
  {
    id: 'item-4',
    question: 'Can I track my order?',
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or directly with the shipping carrier.",
  },
  {
    id: 'item-5',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with SSL encryption.',
  },
  {
    id: 'item-6',
    question: 'Do you offer bulk discounts?',
    answer:
      "Yes, we offer volume discounts for bulk orders. Please contact our sales team directly for custom pricing on orders of 50+ items. We're happy to work with businesses, schools, and organizations.",
  },
]

export function FAQ() {
  const faqRef = useRef<HTMLDivElement>(null)

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
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-content border-b border-gray-700 pb-4">
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
