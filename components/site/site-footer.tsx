import { Logo } from './site-header'

const columns = [
  { title: 'Platform', links: ['Condition monitoring', 'Predictive analytics', 'PM optimizer', 'Integrations'] },
  { title: 'Company', links: ['About', 'Customers', 'Careers', 'Contact'] },
  { title: 'Resources', links: ['Documentation', 'ROI calculator', 'Reliability guides', 'Security'] },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            AI optimization for preventive and predictive maintenance.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 font-mono text-xs text-muted-foreground md:px-6">
          {'© 2026 Prognos AI. All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}
