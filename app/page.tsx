import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { Metrics } from '@/components/site/metrics'
import { Strategies } from '@/components/site/strategies'
import { HowItWorks } from '@/components/site/how-it-works'
import { Simulator } from '@/components/site/simulator'
import { Features } from '@/components/site/features'
import { Industries } from '@/components/site/industries'
import { Cta } from '@/components/site/cta'
import { SiteFooter } from '@/components/site/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Metrics />
        <Strategies />
        <HowItWorks />
        <Simulator />
        <Features />
        <Industries />
        <Cta />
      </main>
      <SiteFooter />
    </>
  )
}
