'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const inputClass =
  'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40'

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-10 text-center" role="status">
        <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
        <p className="text-xl font-semibold">Request received</p>
        <p className="text-sm text-muted-foreground">A reliability engineer will reach out within one business day.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 md:p-8"
    >
      <p className="text-lg font-semibold">Book a demo</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">Full name</label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">Work email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-sm font-medium">Company</label>
          <input id="company" name="company" required autoComplete="organization" className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="assets" className="text-sm font-medium">Number of assets</label>
          <select id="assets" name="assets" className={inputClass} defaultValue="100-1000">
            <option value="1-100">1 – 100</option>
            <option value="100-1000">100 – 1,000</option>
            <option value="1000+">1,000+</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="challenge" className="text-sm font-medium">Biggest maintenance challenge</label>
        <textarea
          id="challenge"
          name="challenge"
          rows={3}
          placeholder="e.g. Frequent pump failures, too many routine PMs…"
          className={`${inputClass} h-auto py-2`}
        />
      </div>
      <Button type="submit" size="lg" className="mt-2 h-11 text-base">
        Request pilot
      </Button>
    </form>
  )
}
