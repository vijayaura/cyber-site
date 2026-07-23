import { cn } from '@/lib/utils'
import type { PremiumTip } from '@/lib/premium-tips'
import { Check, Clock } from 'lucide-react'

const ACCEPT_LABEL = 'Yes, I accept to implement in 30 days'

type PremiumTipCardProps = {
  tip: PremiumTip
  accepted?: boolean
  onAccept?: () => void
}

export function PremiumTipCard({ tip, accepted = false, onAccept }: PremiumTipCardProps) {
  const Icon = tip.icon
  return (
    <div
      className={cn(
        'picker-card group flex flex-col rounded-2xl border bg-white p-5 transition-all duration-200',
        accepted
          ? 'border-[#22c55e]/40 shadow-[0_10px_28px_rgba(34,197,94,0.08)]'
          : 'border-[#e8e8ed] hover:border-[#1976FF]/45 hover:shadow-[0_10px_28px_rgba(25,118,255,0.1)]',
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: tip.bg }}
        >
          <Icon className="size-5 text-white" strokeWidth={2} fill="currentColor" fillOpacity={0.2} />
        </span>
        <span className="shrink-0 rounded-full bg-navy-deep px-2.5 py-1 text-[11px] font-bold tabular-nums text-white">
          −{tip.discount}%
        </span>
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-navy-deep">{tip.title}</h3>
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-ink-muted">
        <Clock className="size-3.5 shrink-0" />
        {tip.time}
      </p>

      <button
        type="button"
        onClick={onAccept}
        aria-pressed={accepted}
        className={cn(
          'mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[12px] font-semibold leading-snug sm:text-[13px]',
          'transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1976FF]/30',
          accepted
            ? 'border border-[#22c55e]/30 bg-[#22c55e]/10 text-[#16a34a]'
            : 'border border-navy-deep/10 bg-cream/60 text-navy-deep hover:border-[#1976FF]/30 hover:bg-[#1976FF]/[0.06] hover:text-[#1976FF]',
        )}
      >
        {accepted && <Check className="size-3.5 shrink-0" aria-hidden />}
        {accepted ? 'Accepted · implement within 30 days' : ACCEPT_LABEL}
      </button>
    </div>
  )
}

type PremiumTipsGridProps = {
  tips: PremiumTip[]
  acceptedIds?: string[]
  onAccept?: (tipId: string) => void
  className?: string
}

export function PremiumTipsGrid({ tips, acceptedIds = [], onAccept, className }: PremiumTipsGridProps) {
  return (
    <div className={cn('picker-grid grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4', className)}>
      {tips.map((tip) => (
        <PremiumTipCard
          key={tip.id}
          tip={tip}
          accepted={acceptedIds.includes(tip.id)}
          onAccept={() => onAccept?.(tip.id)}
        />
      ))}
    </div>
  )
}
