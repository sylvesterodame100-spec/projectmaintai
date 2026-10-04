import { Factory, Plane, Truck, Wind, Droplets, Building2 } from 'lucide-react'
import { SectionHeading } from './section-heading'

const industries = [
  { Icon: Factory, name: 'Manufacturing', use: 'CNC spindles, presses, conveyors' },
  { Icon: Wind, name: 'Energy & Utilities', use: 'Turbines, transformers, generators' },
  { Icon: Droplets, name: 'Oil, Gas & Water', use: 'Pumps, compressors, valves' },
  { Icon: Truck, name: 'Fleet & Logistics', use: 'Engines, brakes, refrigeration units' },
  { Icon: Plane, name: 'Aviation', use: 'APUs, landing gear, ground support' },
  { Icon: Building2, name: 'Facilities', use: 'HVAC, chillers, elevators' },
]

const testimonial = {
  quote:
    'We cut unplanned downtime on our packaging lines by 52% in six months. The schedule optimizer removed nearly a third of our routine PMs without increasing failures.',
  name: 'Maria Okafor',
  role: 'Head of Reliability, Northbridge Foods',
}

export function Industries() {
  return (
    <section id="industries" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Industries"
            title="Built for any asset that spins, heats, or wears"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {industries.map((i) => (
              <li key={i.name} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <i.Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.use}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <figure className="flex flex-col justify-center gap-6 rounded-xl border border-border bg-card p-8 md:p-10">
          <span className="font-mono text-6xl leading-none text-primary" aria-hidden="true">
            {'“'}
          </span>
          <blockquote className="text-pretty text-xl leading-relaxed md:text-2xl">{testimonial.quote}</blockquote>
          <figcaption className="border-t border-border pt-6">
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
