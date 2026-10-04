'use client'

import { Area, AreaChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { AlertTriangle, CheckCircle2, Wrench } from 'lucide-react'

const vibration = Array.from({ length: 40 }, (_, i) => {
  const base = 2.1 + Math.sin(i / 3) * 0.25
  const drift = i > 24 ? (i - 24) * 0.17 : 0
  return { t: i, v: Number((base + drift + ((i * 7) % 5) * 0.04).toFixed(2)) }
})

const assets = [
  { name: 'Pump P-104', status: 'critical', rul: '6 days', note: 'Bearing outer-race defect' },
  { name: 'Compressor C-22', status: 'warning', rul: '34 days', note: 'Lubricant degradation' },
  { name: 'Conveyor CV-7', status: 'healthy', rul: '210 days', note: 'Nominal' },
] as const

const statusStyles = {
  critical: { text: 'text-destructive', bg: 'bg-destructive', Icon: AlertTriangle },
  warning: { text: 'text-warning', bg: 'bg-warning', Icon: Wrench },
  healthy: { text: 'text-success', bg: 'bg-success', Icon: CheckCircle2 },
}

export function AssetHealthPanel() {
  return (
    <div
      className="rounded-xl border border-border bg-card/80 p-4 shadow-2xl shadow-black/40 backdrop-blur-sm md:p-5"
      aria-label="Example asset health dashboard"
      role="img"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-muted-foreground">ASSET / P-104 / DE BEARING</p>
          <p className="mt-1 text-lg font-semibold">Vibration velocity (mm/s RMS)</p>
        </div>
        <span className="rounded-md bg-destructive/15 px-2 py-1 font-mono text-xs text-destructive">
          ANOMALY 0.94
        </span>
      </div>

      <div className="mt-4 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={vibration} margin={{ top: 8, right: 4, bottom: 0, left: -28 }}>
            <defs>
              <linearGradient id="vib" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis
              domain={[1, 6]}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceLine
              y={4.5}
              stroke="var(--destructive)"
              strokeDasharray="4 4"
              label={{ value: 'ISO 10816 limit', fill: 'var(--destructive)', fontSize: 10, position: 'insideTopLeft' }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#vib)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 flex flex-col divide-y divide-border rounded-lg border border-border">
        {assets.map((a) => {
          const s = statusStyles[a.status]
          return (
            <li key={a.name} className="flex items-center gap-3 px-3 py-2.5">
              <s.Icon className={`size-4 shrink-0 ${s.text}`} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.name}</p>
                <p className="truncate text-xs text-muted-foreground">{a.note}</p>
              </div>
              <div className="text-right">
                <p className={`font-mono text-sm ${s.text}`}>{a.rul}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">RUL</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
