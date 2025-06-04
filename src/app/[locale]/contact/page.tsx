'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const t = useTranslations('contact')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send data to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-8 p-4 py-8 md:py-12">
        <div className="container mx-auto max-w-5xl space-y-6">
          {/* Tiêu đề trang */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('pageTitle')}</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground">{t('pageSubtitle')}</p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
            {/* FORM */}
            <Card>
              <CardHeader>
                <CardTitle>{t('form.title')}</CardTitle>
                <CardDescription>{t('form.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('form.name.label')}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t('form.name.placeholder')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('form.email.label')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('form.email.placeholder')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('form.subject.label')}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder={t('form.subject.placeholder')}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('form.message.label')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t('form.message.placeholder')}
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>

                  {formStatus === 'success' && (
                    <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <p>{t('form.success')}</p>
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      <AlertCircle className="h-5 w-5" />
                      <p>{t('form.error')}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t('form.submitting') : t('form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* THÔNG TIN LIÊN HỆ */}
            <Card>
              <CardHeader>
                <CardTitle>{t('info.title')}</CardTitle>
                <CardDescription>{t('info.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium">{t('info.address.title')}</h3>
                  <address className="whitespace-pre-line not-italic text-muted-foreground">
                    {t('info.address.value')}
                  </address>
                </div>

                <div>
                  <h3 className="font-medium">{t('info.email.title')}</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:info@openautomate.com" className="hover:underline">
                      {t('info.email.value')}
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">{t('info.phone.title')}</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+84234567900" className="hover:underline">
                      {t('info.phone.value')}
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">{t('info.hours.title')}</h3>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {t('info.hours.value')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
