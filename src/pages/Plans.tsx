import { useMemo } from 'react'
import { SEO } from '@/components/site/SEO'
import { QuotePlansPanel } from '@/components/quote/QuotePlansPanel'
import { useQuote, calcScore, estimatePremium } from '@/lib/quote-store'

export default function PlansPage() {
  const { answers } = useQuote()
  const score = useMemo(() => calcScore(answers), [answers])
  const premium = useMemo(() => estimatePremium(answers, score), [answers, score])

  return (
    <>
      <SEO
        title="Choose your plan — Sentrix"
        description="Compare Basic, Value, and Premium cyber insurance plans."
      />
      <QuotePlansPanel score={score} basePremium={premium} />
    </>
  )
}
