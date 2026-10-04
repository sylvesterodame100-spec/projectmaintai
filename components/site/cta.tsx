import { CheckCircle2 } from 'lucide-react'
import { DemoForm } from './demo-form'

const included = ['Up to 25 assets monitored', 'Wireless sensor kit included', 'Dedicated reliability engineer', 'ROI report at day 60']

export function Cta() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">90-day pilot</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Prove the value on your own equipment.
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Pick your most problematic assets. We&apos;ll install sensors, connect your CMMS, and show measurable
            results within one quarter.
          </p>
          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <DemoForm />
      </div>
    </section>
  )
}
