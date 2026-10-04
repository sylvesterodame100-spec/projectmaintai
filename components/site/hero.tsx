import Image from 'next/image'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AssetHealthPanel } from './asset-health-panel'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <Image
        src="/images/turbine-hall.png"
        alt=""
        fill
        priority
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      <div className="bg-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-16 md:px-6 lg:grid-cols-2 lg:items-center lg:pt-28 lg:pb-24">
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-success" aria-hidden="true" />
            Monitoring 48,210 assets in real time
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Fix machines <span className="text-primary">before</span> they fail.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Prognos AI unifies preventive and predictive maintenance. Machine learning models read
            vibration, temperature, and runtime data to forecast failures, then automatically optimize
            your PM schedule and work orders.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5 text-base')}>
              Start free pilot
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </a>
            <a
              href="#simulator"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5 text-base')}
            >
              <PlayCircle data-icon="inline-start" aria-hidden="true" />
              Try the simulator
            </a>
          </div>
          <dl className="mt-4 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              { k: 'Downtime', v: '-47%' },
              { k: 'PM labor', v: '-30%' },
              { k: 'Payback', v: '4 mo' },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-xs text-muted-foreground">{s.k}</dt>
                <dd className="font-mono text-2xl font-semibold text-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <AssetHealthPanel />
      </div>
    </section>
  )
}
