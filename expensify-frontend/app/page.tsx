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
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
      {/* Hero Section */}
      <div className="mb-16 space-y-6 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1">
          ✨ Simple, yet powerful expense tracking
        </Badge>
        <h1 className="font-black text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Master Your Finances
          <br />
          <span className="bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
            with Expensify
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Take control of your financial life with smart
          expense tracking, insightful analytics, and
          powerful budgeting tools. Your path to financial
          freedom starts here.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="container mb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="transition-transform hover:scale-[1.02]"
            >
              <FeatureCard {...card} />
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mb-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map(({ value, label, icon: Icon }) => (
            <Card
              key={label}
              className="border-border/50 bg-secondary/30 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary ring-1 ring-primary/25">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-3xl tracking-tight">
                    {value}
                  </p>
                  <p className="font-medium text-muted-foreground">
                    {label}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center gap-6 text-center">
        <Button
          size="lg"
          className="group h-12 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
        >
          <span className="flex items-center gap-2">
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Button>
        <p className="text-muted-foreground text-sm">
          No credit card required · Cancel anytime
        </p>
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
    <Card className="group relative flex h-[250px] flex-col overflow-hidden border-border/50 bg-secondary/30 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-secondary/50">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between">
          <div className="h-12 w-12 rounded-lg bg-primary/10 p-2.5 text-primary ring-1 ring-primary/25">
            <Icon className="h-full w-full" />
          </div>
          {badge && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary"
            >
              {badge}
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <h3 className="mb-2 font-semibold text-lg">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}
