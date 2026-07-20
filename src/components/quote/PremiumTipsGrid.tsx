import { cn } from '@/lib/utils'
import type { PremiumTip } from '@/lib/premium-tips'
import { Clock } from 'lucide-react'

type PremiumTipCardProps = {
  tip: PremiumTip
  onAction?: () => void
}

export function PremiumTipCard({ tip, onAction }: PremiumTipCardProps) {
  const Icon = tip.icon
  return (
    <div
      className={cn(
        'picker-card group flex flex-col rounded-2xl border border-[#e8e8ed] bg-white p-5',
        'transition-all duration-200 hover:border-[#1976FF]/45 hover:shadow-[0_10px_28px_rgba(25,118,255,0.1)]',
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: tip.bg }}
        >
          <Icon className="size-5 text-white" strokeWidth={2} fill="currentColor" fillOpacity={0.2} />
        </span>
        <span className="shrink-0 rounded-full bg-[#1d1d1f] px-2.5 py-1 text-[11px] font-bold tabular-nums text-white">
          −{tip.discount}%
        </span>
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-[#1d1d1f]">{tip.title}</h3>
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#86868b]">
        <Clock className="size-3.5 shrink-0" />
        {tip.time}
      </p>

      <button
        type="button"
        onClick={onAction}
        className={cn(
          'mt-5 w-full rounded-xl border border-[#e8e8ed] bg-[#fafafa] py-2.5 text-[13px] font-semibold text-[#1d1d1f]',
          'transition-all hover:border-[#1976FF]/30 hover:bg-[#1976FF]/[0.06] hover:text-[#1976FF]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1976FF]/30',
        )}
      >
        {tip.action}
      </button>
    </div>
  )
}

export function PremiumTipsGrid({ tips, className }: { tips: PremiumTip[]; className?: string }) {
  return (
    <div className={cn('picker-grid grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4', className)}>
      {tips.map((tip) => (
        <PremiumTipCard key={tip.title} tip={tip} />
      ))}
    </div>
  )
}
