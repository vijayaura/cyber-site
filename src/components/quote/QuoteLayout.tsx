import { Link } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import { scoreGrade } from '@/lib/quote-store'
import { fmtNumber } from '@/lib/utils'

type QuoteHeaderProps = {
  progressPct: number
  score: number
  premium: number
  canGoBack: boolean
  onBack: () => void
}

export function QuoteHeader({ progressPct, score, premium, canGoBack, onBack }: QuoteHeaderProps) {
  const grade = scoreGrade(score)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-5">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full bg-black/[0.04] text-foreground transition-transform active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5" strokeWidth={2} />
          </button>
        ) : (
          <Link to="/" className="text-[17px] font-semibold tracking-tight">
            Sentrix
          </Link>
        )}
        <Link
          to="/"
          className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.04]"
          aria-label="Exit"
        >
          <X className="size-5" strokeWidth={2} />
        </Link>
      </div>

      {/* Friendly progress bar */}
      <div className="mx-auto max-w-2xl px-5 pb-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="h-full rounded-full bg-[#1976FF] transition-all duration-500 ease-out"
            style={{ width: `${Math.max(progressPct, 4)}%` }}
          />
        </div>
      </div>

      {/* Live stats pills */}
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 px-5 pb-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <span className="size-2 rounded-full" style={{ backgroundColor: grade.color }} />
          <span className="text-[13px] font-semibold tabular-nums">{score}</span>
          <span className="text-[13px] text-muted-foreground">score</span>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <span className="text-[13px] font-semibold tabular-nums">${fmtNumber(premium)}</span>
          <span className="text-[13px] text-muted-foreground">/year</span>
        </div>
      </div>
    </header>
  )
}
