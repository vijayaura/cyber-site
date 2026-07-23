import { scoreExplanation, useQuote } from '@/lib/quote-store'
import { cn } from '@/lib/utils'

const INTRO_COPY = 'Your score updates live as you answer each question.'

type ScoreInsightProps = {
  score: number
  inverted?: boolean
  className?: string
}

/** One-line hint shown before the first answer */
export function ScoreIntroHint({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        'whitespace-nowrap text-[10px] leading-none',
        inverted ? 'text-white/50' : 'text-ink-muted',
        className,
      )}
    >
      {INTRO_COPY}
    </p>
  )
}

/** Benchmark line — always visible once the score is above 0 */
export function ScoreBenchmark({ score, inverted = false, className }: ScoreInsightProps) {
  const answers = useQuote((state) => state.answers)
  const { benchmark } = scoreExplanation(score, answers)

  if (!benchmark) return null

  return (
    <p
      className={cn(
        'whitespace-nowrap text-[10px] font-semibold leading-none',
        inverted ? 'text-accent' : 'text-electric',
        className,
      )}
    >
      {benchmark}
    </p>
  )
}

/** Detailed score explanation — visible on hover/focus of parent `.group/score` */
export function ScoreInsight({ score, inverted = false, className }: ScoreInsightProps) {
  const answers = useQuote((state) => state.answers)
  const { summary } = scoreExplanation(score, answers)

  if (score === 0) return null

  return (
    <div
      role="tooltip"
      className={cn(
        'pointer-events-none absolute right-0 top-[calc(100%+8px)] z-50 w-max max-w-[280px] rounded-xl border px-3 py-2.5 text-right opacity-0 shadow-xl backdrop-blur-md transition-opacity duration-200',
        'group-hover/score:opacity-100 group-focus-within/score:opacity-100',
        inverted
          ? 'border-white/10 bg-[#061a40]/95 text-white/50'
          : 'border-border bg-white text-ink-muted shadow-medium',
        className,
      )}
    >
      <p className="text-[10px] leading-relaxed">{summary}</p>
    </div>
  )
}
