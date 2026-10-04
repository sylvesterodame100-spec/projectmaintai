import { BrainCircuit, ClipboardCheck, Cpu, RefreshCcw } from 'lucide-react'
import { SectionHeading } from './section-heading'

const steps = [
  {
    Icon: Cpu,
    title: 'Connect',
    body: 'Stream data from IoT sensors, PLCs, SCADA, historians, and your CMMS. Wireless retrofit kits available for legacy assets.',
  },
  {
    Icon: BrainCircuit,
    title: 'Learn',
    body: 'Models build a healthy baseline for each asset, then flag deviations, diagnose fault modes, and forecast remaining useful life.',
  },
  {
    Icon: ClipboardCheck,
    title: 'Act',
    body: 'The optimizer creates prioritized work orders, reserves parts, and slots tasks into planned downtime windows automatically.',
  },
  {
    Icon: RefreshCcw,
    title: 'Improve',
    body: 'Technician feedback and completed work orders retrain the models, steadily improving accuracy and PM intervals.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-card/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From raw sensor data to optimized work orders"
          description="A closed-loop pipeline that goes live in weeks, not quarters."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-4 bg-background p-6">
              <div className="flex items-center justify-between">
                <s.Icon className="size-6 text-primary" aria-hidden="true" />
                <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
