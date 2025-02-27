import Link from 'next/link'

const footerLinks = {
  product: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/analytics', label: 'Analytics' }
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ],
  legal: [
    { href: '/docs/privacy', label: 'Privacy Policy' },
    { href: '/docs/eula', label: 'Terms' }
  ]
} as const

export function Footer() {
  return (
    <footer className='border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {/* Brand and description */}
          <div className='col-span-2 flex flex-col gap-4 md:col-span-1'>
            <Link href='/' className='text-primary hover:text-primary/80'>
              <span className='text-lg font-bold'>Expensify</span>
            </Link>
            <p className='text-sm text-muted-foreground'>
              Track your expenses and manage your budget with ease
            </p>
          </div>

          {/* Links sections */}
          <div className='grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3'>
            {/* Product links */}
            <div>
              <h3 className='mb-3 text-sm font-semibold text-foreground'>
                Product
              </h3>
              <ul className='space-y-2'>
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h3 className='mb-3 text-sm font-semibold text-foreground'>
                Company
              </h3>
              <ul className='space-y-2'>
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h3 className='mb-3 text-sm font-semibold text-foreground'>
                Legal
              </h3>
              <ul className='space-y-2'>
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social links */}
          <div className='col-span-2 md:col-span-1'>
            <h3 className='mb-3 text-sm font-semibold text-foreground'>
              Connect
            </h3>
            <div className='flex gap-4'>
              <a
                href='https://github.com/yourusername/expensify'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-foreground'
              >
                GitHub
              </a>
              <a
                href='https://twitter.com/yourusername'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-foreground'
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-8 border-t border-border pt-8'>
          <p className='text-center text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Expensify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
