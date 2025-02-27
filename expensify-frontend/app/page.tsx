import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  PiggyBank,
  LineChart,
  Shield,
  Clock,
  Ban
} from 'lucide-react'
import type { ComponentType } from 'react'

const FEATURE_CARDS = [
  {
    href: '/dashboard',
    icon: BarChart3,
    title: 'Smart Dashboard',
    description:
      'Get instant insights into your spending patterns and financial health',
    badge: 'Popular'
  },
  {
    href: '/expenses',
    icon: PiggyBank,
    title: 'Track Expenses',
    description:
      'Effortlessly log and categorize your daily expenses and income'
  },
  {
    href: '/reports',
    icon: LineChart,
    title: 'Financial Reports',
    description:
      'Generate detailed reports and visualizations of your financial journey'
  }
] as const

const STATS = [
  { value: '100%', label: 'Secure', icon: Shield },
  { value: '24/7', label: 'Access', icon: Clock },
  { value: '0', label: 'Hidden Fees', icon: Ban }
] as const

export default async function Home() {
  return (
    <main className='relative min-h-screen w-full overflow-x-hidden'>
      {/* Add padding for floating navbar and proper spacing */}
      <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pt-30 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <section className='mx-auto mb-24 max-w-4xl space-y-8 text-center'>
          <Badge variant='outline' className='inline-flex px-4 py-1.5 text-sm'>
            ✨ Simple, yet powerful expense tracking
          </Badge>
          <h1 className='font-black text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
            Master Your Finances
            <br />
            <span className='bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent'>
              with Expensify
            </span>
          </h1>
          <p className='mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl'>
            Take control of your financial life with smart expense tracking,
            insightful analytics, and powerful budgeting tools. Your path to
            financial freedom starts here.
          </p>
        </section>

        {/* Feature Cards */}
        <section className='mb-24 w-full'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {FEATURE_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className='transition-transform duration-300'
              >
                <FeatureCard {...card} />
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className='mb-24 w-full'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
            {STATS.map(({ value, label, icon: Icon }) => (
              <Card
                key={label}
                className='border-border/50 bg-secondary/30 p-6 backdrop-blur-sm'
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-lg bg-primary/10 p-2.5 text-primary ring-1 ring-primary/25'>
                    <Icon className='h-6 w-6' />
                  </div>
                  <div>
                    <p className='font-bold text-3xl tracking-tight'>{value}</p>
                    <p className='font-medium text-muted-foreground'>{label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='mb-24 flex flex-col items-center gap-6 text-center'>
          <Button
            size='lg'
            className='group relative h-14 rounded-full bg-primary px-8 text-lg text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30'
          >
            <span className='flex items-center gap-2'>
              Get Started Free
              <ArrowRight className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
            </span>
          </Button>
          <p className='text-muted-foreground text-sm'>
            No credit card required · Cancel anytime
          </p>
        </section>
      </div>
    </main>
  )
}

interface FeatureCardProps {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  badge?: string
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  badge
}: FeatureCardProps) {
  return (
    <Card className='group relative flex h-full min-h-[280px] flex-col overflow-hidden border-border/50 bg-secondary/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-secondary/50'>
      <div className='absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      <div className='relative flex h-full flex-col'>
        <div className='mb-6 flex items-start justify-between'>
          <div className='h-12 w-12 rounded-lg bg-primary/10 p-2.5 text-primary ring-1 ring-primary/25'>
            <Icon className='h-full w-full' />
          </div>
          {badge && (
            <Badge
              variant='secondary'
              className='bg-primary/10 px-3 py-1 text-sm font-medium text-primary'
            >
              {badge}
            </Badge>
          )}
        </div>
        <div className='flex-1'>
          <h3 className='mb-3 font-semibold text-xl'>{title}</h3>
          <p className='text-muted-foreground text-base leading-relaxed'>
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}
