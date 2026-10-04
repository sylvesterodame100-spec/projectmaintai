'use client'

import { useId, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertTriangle, CalendarClock, CheckCircle2, Wrench } from 'lucide-react'
import { SectionHeading } from './section-heading'

type Inputs = {
  vibration: number
  temperature: number
  hours: number
  load: number
}

const assetTypes = {
  pump: { label: 'Centrifugal pump', pmInterval: 2000 },
  motor: { label: 'Electric motor', pmInterval: 4000 },
  compressor: { label: 'Air compressor', pmInterval: 3000 },
} as const

type AssetType = keyof typeof assetTypes

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n))
}

function analyze(inputs: Inputs, asset: AssetType) {
  const { pmInterval } = assetTypes[asset]
  const vib = clamp((inputs.vibration - 1.5) / 6)
  const temp = clamp((inputs.temperature - 50) / 50)
  const wear = clamp(inputs.hours / (pmInterval * 1.5))
  const load = clamp((inputs.load - 50) / 60)

  const stress = 0.4 * vib + 0.25 * temp + 0.25 * wear + 0.1 * load
  const health = Math.round((1 - stress) * 100)
  const failProb30 = Math.round(clamp(1 / (1 + Math.exp(-9 * (stress - 0.55)))) * 100)
  const degradationPerDay = 0.15 + stress * 1.6
  const rulDays = Math.max(0, Math.round((health - 25) / degradationPerDay))

  const forecast = Array.from({ length: 13 }, (_, i) => {
    const day = i * 10
    return { day, health: Math.max(0, Number((health - degradationPerDay * day).toFixed(1))) }
  })

  const hoursToPm = pmInterval - inputs.hours
  let level: 'healthy' | 'warning' | 'critical' = 'healthy'
  let action = `Keep the current preventive plan. Next PM in ${Math.max(0, hoursToPm).toLocaleString()} h; AI suggests extending the interval by ${Math.round((1 - stress) * 20)}% based on condition.`
  if (failProb30 >= 60 || rulDays < 14) {
    level = 'critical'
    action = 'Predictive alert: schedule corrective work within the next planned downtime window. Inspect bearings and lubrication; parts reserved automatically.'
  } else if (failProb30 >= 25 || hoursToPm < 300) {
    level = 'warning'
    action = 'Pull the next PM forward. Add a vibration route and an oil analysis to the task list to confirm the developing fault.'
  }

  return { health, failProb30, rulDays, forecast, level, action }
}

const levelStyles = {
  healthy: { label: 'Healthy', text: 'text-success', bg: 'bg-success/10', border: 'border-success/30', Icon: CheckCircle2 },
  warning: { label: 'Watch', text: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', Icon: Wrench },
  critical: { label: 'Critical', text: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', Icon: AlertTriangle },
}

function Slider({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  unit: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-primary">
          {value.toLocaleString()} {unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
      />
    </div>
  )
}

export function Simulator() {
  const [asset, setAsset] = useState<AssetType>('pump')
  const [inputs, setInputs] = useState<Inputs>({ vibration: 3.4, temperature: 68, hours: 1400, load: 75 })
  const result = useMemo(() => analyze(inputs, asset), [inputs, asset])
  const style = levelStyles[result.level]
  const set = (key: keyof Inputs) => (v: number) => setInputs((prev) => ({ ...prev, [key]: v }))

  return (
    <section id="simulator" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Interactive demo"
          title="Predict an asset's future in seconds"
          description="Adjust live condition readings and watch the model update health score, failure risk, remaining useful life, and the recommended maintenance action."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 lg:col-span-2">
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-sm font-medium">Asset type</legend>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(assetTypes) as AssetType[]).map((key) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-border px-2 py-2 text-center text-xs transition-colors has-checked:border-primary has-checked:bg-primary/10 has-checked:text-primary has-focus-visible:ring-2 has-focus-visible:ring-ring"
                  >
                    <input
                      type="radio"
                      name="asset"
                      value={key}
                      checked={asset === key}
                      onChange={() => setAsset(key)}
                      className="sr-only"
                    />
                    {assetTypes[key].label}
                  </label>
                ))}
              </div>
            </fieldset>
            <Slider label="Vibration velocity" unit="mm/s" value={inputs.vibration} min={0.5} max={9} step={0.1} onChange={set('vibration')} />
            <Slider label="Bearing temperature" unit="°C" value={inputs.temperature} min={30} max={110} step={1} onChange={set('temperature')} />
            <Slider label="Hours since last PM" unit="h" value={inputs.hours} min={0} max={6000} step={50} onChange={set('hours')} />
            <Slider label="Operating load" unit="%" value={inputs.load} min={20} max={110} step={1} onChange={set('load')} />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Demo model for illustration. Production models are trained on your asset history and sensor data.
            </p>
          </div>

          <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 lg:col-span-3" aria-live="polite">
            <dl className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">Health score</dt>
                <dd className={`font-mono text-3xl font-semibold ${style.text}`}>{result.health}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">30-day failure risk</dt>
                <dd className="font-mono text-3xl font-semibold">{result.failProb30}%</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">Remaining useful life</dt>
                <dd className="font-mono text-3xl font-semibold">
                  {result.rulDays}
                  <span className="ml-1 text-base text-muted-foreground">days</span>
                </dd>
              </div>
            </dl>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.forecast} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="health" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--success)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                    tickFormatter={(d) => `${d}d`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis domain={[0, 100]} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                    labelFormatter={(d) => `Day ${d}`}
                    formatter={(v) => [`${v}`, 'Health']}
                  />
                  <ReferenceLine
                    y={25}
                    stroke="var(--destructive)"
                    strokeDasharray="4 4"
                    label={{ value: 'Failure threshold', fill: 'var(--destructive)', fontSize: 10, position: 'insideBottomRight' }}
                  />
                  <Area type="monotone" dataKey="health" stroke="var(--success)" strokeWidth={2} fill="url(#health)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className={`flex gap-3 rounded-lg border p-4 ${style.border} ${style.bg}`}>
              <style.Icon className={`mt-0.5 size-5 shrink-0 ${style.text}`} aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <p className={`text-sm font-semibold ${style.text}`}>
                  {style.label} · Recommended action
                </p>
                <p className="text-sm leading-relaxed text-foreground/90">{result.action}</p>
              </div>
              <CalendarClock className="ml-auto hidden size-5 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
