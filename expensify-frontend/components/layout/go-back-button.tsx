'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface GoBackButtonProps {
  text?: string
  onClick?: () => void
}

export function GoBackButton({
  text = 'Go back',
  onClick
}: GoBackButtonProps) {
  const router = useRouter()

  const handleClick = useCallback(() => {
    onClick?.()
    router.back()
  }, [onClick, router])

  return (
    <div
      className="group flex cursor-pointer items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
      onClick={handleClick}
    >
      <ArrowLeft className="group-hover:-translate-x-1 h-4 w-4 transition-transform" />
      {text}
    </div>
  )
}
