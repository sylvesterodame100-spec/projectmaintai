import { Activity } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { href: '#strategies', label: 'Strategies' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#simulator', label: 'Simulator' },
  { href: '#features', label: 'Platform' },
  { href: '#industries', label: 'Industries' },
]

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Activity className="size-4" aria-hidden="true" />
      </span>
      <span>
        Prognos<span className="text-primary">AI</span>
      </span>
    </a>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className={cn(buttonVariants({ variant: 'ghost' }), 'hidden sm:inline-flex')}>
            Sign in
          </a>
          <a href="#contact" className={buttonVariants({ size: 'lg' })}>
            Book a demo
          </a>
        </div>
      </div>
    </header>
  )
}
