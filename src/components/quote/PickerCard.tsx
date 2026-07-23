import { cn } from '@/lib/utils'
import { Check, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

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
        !isTile && !isChip && 'flex w-full min-w-0 items-center gap-3 rounded-2xl border px-4 py-3.5 sm:gap-3.5',
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
        <motion.span
          className={cn(
            'relative flex shrink-0 items-center justify-center rounded-xl shadow-sm',
            isTile && 'size-12 rounded-2xl',
            isChip && 'size-8 rounded-lg',
            !isTile && !isChip && 'size-10',
          )}
          style={{ backgroundColor: iconBg }}
          animate={
            selected
              ? { scale: [1, 1.18, 1], rotate: [0, -8, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence>
            {selected && (
              <motion.span
                key="pulse"
                className={cn(
                  'pointer-events-none absolute inset-0 rounded-xl ring-2 ring-white/70',
                  isTile && 'rounded-2xl',
                  isChip && 'rounded-lg',
                )}
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.55, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
          <motion.span
            className="relative flex items-center justify-center"
            animate={selected ? { scale: [1, 0.88, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Icon
              className={cn('text-white', isTile ? 'size-6' : 'size-4')}
              strokeWidth={2}
              fill="currentColor"
              fillOpacity={0.25}
            />
          </motion.span>
        </motion.span>
      )}

      <span
        className={cn(
          'relative font-medium transition-colors duration-200',
          isTile && 'text-center text-[15px] font-semibold',
          isChip && 'text-[15px] font-semibold tabular-nums',
          !isTile && !isChip && 'min-w-0 flex-1 text-[14px] leading-snug sm:text-[15px]',
          selected ? 'text-electric' : 'text-navy-deep group-hover:text-navy',
        )}
      >
        {label}
      </span>

      {!isTile && !isChip && (
        <span
          className={cn(
            'relative flex size-7 shrink-0 items-center justify-center rounded-full',
            selected ? 'bg-[#1976FF] text-white shadow-sm' : 'bg-[#f2f2f7] text-[#86868b] group-hover:bg-[#1976FF]/10 group-hover:text-[#1976FF]',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {selected ? (
              <motion.span
                key="check"
                initial={{ scale: 0, rotate: -120 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 120 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className="flex items-center justify-center"
              >
                <Check className="size-3.5" />
              </motion.span>
            ) : (
              <motion.span
                key="chevron"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center"
              >
                <ChevronRight className="size-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      )}

      {(isTile || isChip) && (
        <AnimatePresence>
          {selected && (
            <motion.span
              key="tile-check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className="absolute right-2.5 top-2.5 flex size-5 items-center justify-center rounded-full bg-[#1976FF] text-white shadow-sm"
            >
              <Check className="size-3" />
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </button>
  )
}
