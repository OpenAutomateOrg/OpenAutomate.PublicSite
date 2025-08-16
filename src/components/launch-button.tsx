'use client'

import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'
import { useTranslations } from 'next-intl'

interface LaunchButtonProps {
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function LaunchButton({
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
    <Button onClick={handleLaunch} size={size} className={className} variant={variant}>
      {t('signin')}
    </Button>
  )
}
