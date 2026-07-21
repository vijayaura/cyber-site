import type { LucideIcon } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type QuoteThreadBlockProps = {
  icon: LucideIcon
  title: string
  subtitle?: string
  stepNumber: number
  active: boolean
  past: boolean
  summary: string | null
  onEdit: () => void
  children?: React.ReactNode
}

export function QuoteThreadBlock({
  icon: Icon,
  title,
  subtitle,
  stepNumber,
  active,
  past,
  summary,
  onEdit,
  children,
}: QuoteThreadBlockProps) {
  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'border-b border-navy-deep/10 py-8 first:pt-2',
        past && !active && 'opacity-45 hover:opacity-70',
        active && 'opacity-100',
      )}
    >
      <div className="flex gap-3">
        <div
          className={cn(
            'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg',
            active ? 'bg-navy-deep/10 text-navy-deep' : 'bg-navy-deep/5 text-ink-muted',
          )}
        >
          <Icon className="size-4" strokeWidth={1.75} aria-hidden />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">
            Question {stepNumber}
          </p>
          <h2
            className={cn(
              'mt-1 text-[17px] font-semibold leading-snug tracking-tight sm:text-[19px]',
              active ? 'text-navy-deep' : 'text-ink-muted',
            )}
          >
            {title}
          </h2>
          {active && subtitle && (
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{subtitle}</p>
          )}

          {past && !active && summary && (
            <button
              type="button"
              onClick={onEdit}
              className="group mt-4 flex w-full items-start justify-between gap-3 rounded-xl border border-transparent py-1 text-left transition hover:border-navy-deep/10 hover:bg-cream/80"
            >
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted/80">Your answer</p>
                <p className="mt-1 text-[15px] font-medium leading-snug text-ink-muted group-hover:text-navy-deep">
                  {summary}
                </p>
              </div>
              <span className="mt-1 flex shrink-0 items-center gap-1 text-[12px] font-medium text-ink-muted group-hover:text-electric">
                <Pencil className="size-3.5" />
                Edit
              </span>
            </button>
          )}

          {active && children && <div className="mt-5">{children}</div>}
        </div>
      </div>
    </motion.section>
  )
}
