'use client'

import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'
import { Rocket } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface LaunchButtonProps {
  readonly id?: string
  readonly size?: 'default' | 'sm' | 'lg' | 'icon'
  readonly className?: string
  readonly variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function LaunchButton({
  id,
  size = 'lg',
  className = 'bg-orange-600 hover:bg-orange-700 transition-all duration-300 hover:translate-y-[-2px]',
  variant = 'default',
}: LaunchButtonProps) {
  const handleLaunch = () => {
    // Redirect to the orchestrator app login page
    window.location.href = `${config.app.orchestratorUrl}/login`
  }
  const t = useTranslations('landing')

  return (
    <Button onClick={handleLaunch} size={size} className={className} variant={variant} id={id}>
      <Rocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />

      {t('signin')}
    </Button>
  )
}
