import { cn } from '@/lib/utils'

interface DocLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DocLayout({ children, className }: DocLayoutProps) {
  return (
    <div className='min-h-screen bg-background'>
      <div
        className={cn('container mx-auto py-8 px-4 md:px-6 mt-16', className)}
      >
        {children}
      </div>
    </div>
  )
}
