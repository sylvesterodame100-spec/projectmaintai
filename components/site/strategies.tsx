import { CalendarClock, Check, Radar } from 'lucide-react'
import { SectionHeading } from './section-heading'

const strategies = [
  {
    Icon: CalendarClock,
    tag: 'Preventive',
    title: 'Smarter schedules, not more of them',
    body: 'AI analyzes failure history, OEM guidance, and actual usage to right-size every PM interval. Stop over-maintaining healthy assets and under-maintaining critical ones.',
    points: [
      'Usage- and condition-based interval optimization',
      'Auto-generated PM task lists and checklists',
      'Technician, parts, and shutdown-window scheduling',
      'Compliance tracking and audit-ready records',
    ],
    accent: 'text-success',
    ring: 'bg-success/10',
  },
  {
    Icon: Radar,
    tag: 'Predictive',
    title: 'See failures weeks in advance',
    body: 'Models trained on sensor streams detect anomalies, classify fault modes, and estimate remaining useful life so you intervene at exactly the right moment.',
    points: [
      'Anomaly detection on vibration, thermal, current, oil',
      'Fault diagnosis: bearings, misalignment, imbalance',
      'Remaining useful life (RUL) forecasting',
      'Root-cause suggestions with confidence scores',
    ],
    accent: 'text-primary',
    ring: 'bg-primary/10',
  },
]

export function Strategies() {
  return (
    <section id="strategies" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Two strategies, one brain"
          title="Preventive and predictive maintenance, optimized together"
          description="Most plants run both strategies in silos. Prognos AI blends them: predictions continuously tune your preventive plan, and every completed work order makes the models smarter."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {strategies.map((s) => (
            <article key={s.tag} className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className={`flex size-10 items-center justify-center rounded-lg ${s.ring}`}>
                  <s.Icon className={`size-5 ${s.accent}`} aria-hidden="true" />
                </span>
                <span className={`font-mono text-xs uppercase tracking-widest ${s.accent}`}>{s.tag}</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{s.body}</p>
              <ul className="mt-auto flex flex-col gap-3 border-t border-border pt-5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <Check className={`mt-0.5 size-4 shrink-0 ${s.accent}`} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
