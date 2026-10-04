import { Bell, Boxes, Gauge, Layers, LineChart, ShieldCheck, Smartphone, Workflow } from 'lucide-react'
import { SectionHeading } from './section-heading'

const features = [
  { Icon: Gauge, title: 'Asset health scoring', body: 'A single 0–100 score per asset combining every signal, ranked by criticality.' },
  { Icon: LineChart, title: 'RUL forecasting', body: 'Remaining useful life estimates with confidence bands that update in real time.' },
  { Icon: Workflow, title: 'Schedule optimizer', body: 'Balances risk, cost, labor, and downtime windows to build the optimal PM calendar.' },
  { Icon: Bell, title: 'Smart alerting', body: 'Context-rich alerts with probable cause, so teams act on signal, not noise.' },
  { Icon: Boxes, title: 'Spare parts planning', body: 'Forecast parts demand from predicted failures and avoid stockouts and overstock.' },
  { Icon: Layers, title: 'CMMS & ERP sync', body: 'Two-way integration with SAP PM, IBM Maximo, Fiix, UpKeep, and more.' },
  { Icon: Smartphone, title: 'Mobile technician app', body: 'Guided checklists, photo capture, and offline work orders on the shop floor.' },
  { Icon: ShieldCheck, title: 'Enterprise security', body: 'SSO, role-based access, on-prem edge option, and SOC 2 Type II controls.' },
]

export function Features() {
  return (
    <section id="features" className="border-b border-border bg-card/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Platform"
          title="Everything your reliability team needs"
          description="One platform for condition monitoring, AI diagnostics, and maintenance planning."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <li
              key={f.title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/40"
            >
              <f.Icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
