import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, Check, Minus, X, ArrowRight, Sparkles } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { ScoreGauge } from './ScoreGauge'
import { PremiumTipsGrid } from './PremiumTipsGrid'
import { LIMITS, PLANS, FEATURE_LIST } from '@/lib/quote-store'
import { PREMIUM_TIPS } from '@/lib/premium-tips'
import { fmtNumber } from '@/lib/utils'

function fmtLimit(n: number): string {
  if (n >= 1_000_000) return `$${n / 1_000_000}M`
  return `$${n / 1_000}K`
}

type QuotePlansPanelProps = {
  score: number
  basePremium: number
  onBack?: () => void
}

export function QuotePlansPanel({ score, basePremium, onBack }: QuotePlansPanelProps) {
  const [limitIndex, setLimitIndex] = useState(2)
  const limit = LIMITS[limitIndex]
  const limitFactor = Math.pow(limit / 1_000_000, 0.6)

  const planPrices = useMemo(
    () =>
      PLANS.map((plan) => {
        const monthly = Math.round((basePremium * plan.multiplier * limitFactor) / 12 / 10) * 10
        return { ...plan, monthly, annual: monthly * 12 }
      }),
    [basePremium, limitFactor],
  )

  return (
    <div className="quote-shell flex h-[100dvh] flex-col overflow-hidden bg-[#09090b]">
      <nav className="flex h-12 shrink-0 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/15"
              aria-label="Go back"
            >
              <ArrowLeft className="size-4" />
            </button>
          ) : (
            <Link to="/" className="text-[15px] font-semibold text-white">
              Sentrix
            </Link>
          )}
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">Your quote</span>
        <Link
          to="/"
          className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md hover:bg-white/15 hover:text-white"
          aria-label="Exit"
        >
          <X className="size-4" />
        </Link>
      </nav>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 lg:p-5">
        <div className="mx-auto max-w-5xl space-y-4 sm:space-y-5">
          {/* Header */}
          <div className="quote-question-card overflow-hidden rounded-[20px] px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">Your quote</p>
                <h1 className="mt-1 text-[22px] font-semibold tracking-tight text-white sm:text-[26px]">
                  Pick the coverage that fits.
                </h1>
                <p className="mt-2 max-w-lg text-[14px] text-white/50">
                  Drag the slider to change your policy limit — your premium updates instantly.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 border-white/15 sm:border-l sm:pl-5">
                <ScoreGauge score={score} size="sm" inverted showLabel={false} />
                <div className="text-right leading-tight">
                  <p className="text-lg font-bold tabular-nums text-white sm:text-xl">
                    ${fmtNumber(basePremium)}
                  </p>
                  <p className="text-[10px] font-medium text-white/50">base /yr</p>
                </div>
              </div>
            </div>
          </div>

          {/* Limit slider */}
          <div className="rounded-[20px] border border-white/[0.08] bg-[#111113] px-5 py-5 sm:px-7 sm:py-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">Policy limit</p>
                <p className="mt-1 font-display text-3xl font-light tabular-nums text-white sm:text-4xl">
                  ${fmtNumber(limit)}
                </p>
              </div>
              <p className="text-[13px] text-white/45">Cyber score {score}/100</p>
            </div>
            <Slider
              min={0}
              max={LIMITS.length - 1}
              step={1}
              value={[limitIndex]}
              onValueChange={([v]) => setLimitIndex(v)}
              aria-label="Policy limit"
            />
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-white/35">
              {LIMITS.map((l) => (
                <span key={l}>{fmtLimit(l)}</span>
              ))}
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {planPrices.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative flex flex-col rounded-[20px] border p-5 sm:p-6 ${
                  plan.id === 'value'
                    ? 'border-[#1976FF]/50 bg-white shadow-[0_0_0_1px_#1976FF,0_12px_40px_rgba(25,118,255,0.12)]'
                    : 'border-[#e8e8ed] bg-white'
                }`}
              >
                {plan.tag && (
                  <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-[#1976FF]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1976FF]">
                    <Sparkles className="size-3" />
                    {plan.tag}
                  </span>
                )}
                <h2 className="font-display text-xl font-normal text-[#1d1d1f]">{plan.name}</h2>
                <p className="mt-3 font-display text-3xl font-light tabular-nums text-[#1d1d1f]">
                  ${fmtNumber(plan.monthly)}
                  <span className="text-sm text-[#86868b]">/mo</span>
                </p>
                <p className="mt-1 text-xs text-[#86868b]">
                  ${fmtNumber(plan.annual)}/yr · ${fmtNumber(plan.deductible)} deductible
                </p>
                <ul className="mt-5 flex-1 space-y-2 border-t border-[#f2f2f7] pt-4">
                  {FEATURE_LIST.slice(0, 6).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-[#1d1d1f]">
                      {plan.features[f] ? (
                        <Check className="size-3.5 shrink-0 text-[#1976FF]" />
                      ) : (
                        <Minus className="size-3.5 shrink-0 text-[#d1d1d6]" />
                      )}
                      <span className={plan.features[f] ? '' : 'text-[#86868b]'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold transition-all ${
                    plan.id === 'value'
                      ? 'bg-[#1d1d1f] text-white hover:bg-[#333]'
                      : 'border border-[#e8e8ed] bg-white text-[#1d1d1f] hover:border-[#1976FF]/30 hover:bg-[#f8faff]'
                  }`}
                >
                  Choose {plan.name}
                  <ArrowRight className="size-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Premium tips */}
          <div className="rounded-[20px] bg-white px-5 py-6 sm:px-7 sm:py-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22c55e]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#16a34a]">
                Great news
              </span>
              <h2 className="mt-4 text-[22px] font-semibold tracking-tight text-[#1d1d1f] sm:text-[26px]">
                You can reduce your premium.
              </h2>
              <p className="mt-2 text-[15px] text-[#86868b]">
                Complete a few security upgrades and unlock instant discounts on your policy.
              </p>
            </div>
            <PremiumTipsGrid tips={PREMIUM_TIPS} className="mx-auto mt-8 max-w-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
