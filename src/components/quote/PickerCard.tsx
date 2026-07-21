import { cn } from '@/lib/utils'
import { Check, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type PickerCardProps = {
  label: string
  selected?: boolean
  onClick: () => void
  icon?: LucideIcon
  iconBg?: string
  layout?: 'row' | 'tile' | 'chip'
  className?: string
}

export function PickerCard({
  label,
  selected,
  onClick,
  icon: Icon,
  iconBg,
  layout = 'row',
  className,
}: PickerCardProps) {
  const isTile = layout === 'tile'
  const isChip = layout === 'chip'

  return (
    <button
      type="button"
      onClick={onClick}
      data-selected={selected ? 'true' : 'false'}
      className={cn(
        'picker-card group relative overflow-hidden text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1976FF]/40 focus-visible:ring-offset-2',
        isTile && 'flex flex-col items-center gap-3 rounded-2xl border px-5 py-6',
        isChip && 'flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5',
        !isTile && !isChip && 'flex w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5',
        selected
          ? 'border-[#1976FF] bg-[#1976FF]/[0.08] shadow-[0_0_0_1px_#1976FF,0_12px_28px_rgba(25,118,255,0.14)]'
          : 'border-[#e8e8ed] bg-white hover:border-[#1976FF]/45 hover:bg-[#f8faff]',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200',
          'group-hover:opacity-100',
          selected && 'opacity-100',
        )}
        style={{
          background: selected
            ? 'radial-gradient(circle at 30% 20%, rgba(25,118,255,0.12), transparent 55%)'
            : 'radial-gradient(circle at 30% 20%, rgba(25,118,255,0.08), transparent 55%)',
        }}
      />

      {Icon && iconBg && (
        <span
          className={cn(
            'relative flex shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform duration-200',
            'group-hover:scale-110',
            isTile && 'size-12 rounded-2xl',
            isChip && 'size-8 rounded-lg',
            !isTile && !isChip && 'size-10',
            selected && 'scale-105',
          )}
          style={{ backgroundColor: iconBg }}
        >
          <Icon
            className={cn('text-white', isTile ? 'size-6' : 'size-4')}
            strokeWidth={2}
            fill="currentColor"
            fillOpacity={0.25}
          />
        </span>
      )}

      <span
        className={cn(
          'relative font-medium transition-colors duration-200',
          isTile && 'text-center text-[15px] font-semibold',
          isChip && 'text-[15px] font-semibold tabular-nums',
          !isTile && !isChip && 'min-w-0 flex-1 text-[15px] leading-snug',
          selected ? 'text-electric' : 'text-navy-deep group-hover:text-navy',
        )}
      >
        {label}
      </span>

      {!isTile && !isChip && (
        <span
          className={cn(
            'relative flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-200',
            'group-hover:scale-110',
            selected
              ? 'bg-[#1976FF] text-white shadow-sm'
              : 'bg-[#f2f2f7] text-[#86868b] group-hover:bg-[#1976FF]/10 group-hover:text-[#1976FF]',
          )}
        >
          {selected ? <Check className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        </span>
      )}

      {(isTile || isChip) && selected && (
        <span className="absolute right-2.5 top-2.5 flex size-5 items-center justify-center rounded-full bg-[#1976FF] text-white shadow-sm">
          <Check className="size-3" />
        </span>
      )}
    </button>
  )
}
