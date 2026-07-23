import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type StepShellProps = {
  children?: React.ReactNode
  className?: string
}

export function StepShell({ children, className }: StepShellProps) {
  return (
    <motion.div className={cn('space-y-4', className)}>
      {children}
    </motion.div>
  )
}

type AnswerGridProps = {
  children: React.ReactNode
  cols?: 1 | 2 | 3
  hint?: string
}

export function AnswerGrid({ children, cols = 2, hint }: AnswerGridProps) {
  return (
    <div className="space-y-3">
      {hint && (
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">{hint}</p>
      )}
      <div
        className={cn(
          'picker-grid grid w-full gap-2.5 sm:gap-3',
          cols === 3 && 'grid-cols-2 sm:grid-cols-3',
          cols === 2 && 'grid-cols-1 sm:grid-cols-2',
          cols === 1 && 'grid-cols-1',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function AnswerGridFooter({ children }: { children: React.ReactNode }) {
  return <div className="col-span-full pt-2">{children}</div>
}
