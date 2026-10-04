const metrics = [
  { value: '92%', label: 'Failure prediction accuracy', detail: 'across rotating equipment' },
  { value: '21 days', label: 'Average early warning', detail: 'before functional failure' },
  { value: '38%', label: 'Fewer unnecessary PMs', detail: 'via condition-based intervals' },
  { value: '3.2x', label: 'Maintenance ROI', detail: 'in the first year' },
]

export function Metrics() {
  return (
    <section aria-label="Results" className="border-b border-border">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1 bg-background px-4 py-8 md:px-6">
            <dt className="text-sm font-medium">{m.label}</dt>
            <dd className="order-first font-mono text-3xl font-semibold text-primary md:text-4xl">{m.value}</dd>
            <dd className="text-xs text-muted-foreground">{m.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
