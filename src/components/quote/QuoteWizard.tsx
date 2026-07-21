import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import { motion } from 'motion/react'
import { fmtNumber } from '@/lib/utils'
import { QuoteAssistant } from './QuoteAssistant'
import { ScoreGauge } from './ScoreGauge'

type QuoteWizardProps = {
  activeStep: number
  questionSteps: number
  progressPct: number
  score: number
  premium: number
  isLoading: boolean
  canGoBack: boolean
  onBack: () => void
  pageTitle?: string
  stepId: string
  stepTitle: string
  stepSubtitle?: string
  stepTip?: string
  children: React.ReactNode
}

export function QuoteWizard({
  activeStep,
  questionSteps,
  progressPct,
  score,
  premium,
  isLoading,
  canGoBack,
  onBack,
  pageTitle = 'Get your cyber quote',
  stepId,
  stepTitle,
  stepSubtitle,
  stepTip,
  children,
}: QuoteWizardProps) {
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
  }, [stepId, isLoading])

  return (
    <div className="quote-shell flex h-[100dvh] flex-col overflow-hidden">
      <header className="relative z-20 shrink-0 border-b border-gold/20 bg-transparent">
        <div className="flex h-11 items-center justify-between px-4 sm:h-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {canGoBack ? (
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

          <Link
            to="/"
            className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md hover:bg-white/15 hover:text-white"
            aria-label="Exit"
          >
            <X className="size-4" />
          </Link>
        </div>

        <div className="px-4 pb-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-[17px] font-semibold tracking-tight text-white sm:text-[19px]">
                {pageTitle}
              </h1>
              <p className="mt-0.5 text-[12px] text-white/45">
                {isLoading ? 'Finalizing' : `Step ${activeStep + 1} of ${questionSteps}`}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              <ScoreGauge score={score} size="sm" inverted showLabel={false} />
              <div className="text-right leading-tight">
                <motion.p
                  key={premium}
                  initial={{ opacity: 0.6, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[15px] font-bold tabular-nums text-white sm:text-lg"
                >
                  ${fmtNumber(premium)}
                </motion.p>
                <p className="text-[10px] font-medium text-white/50 sm:text-[11px]">/yr est.</p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            {Array.from({ length: 12 }).map((_, i) => {
              const mapped = Math.round((i / 11) * (questionSteps - 1))
              const done = mapped < activeStep || isLoading
              const active = mapped === activeStep && !isLoading
              return (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    active ? 'w-6 bg-white' : done ? 'w-2 bg-white/50' : 'w-1 bg-white/20'
                  }`}
                />
              )
            })}
          </div>

          <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/10 sm:hidden">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4 lg:grid-cols-[1fr_340px] lg:px-5 lg:pb-5">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] quote-thread-panel">
          <div
            ref={threadRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8 lg:px-10"
          >
            <div className="w-full">{children}</div>
          </div>
        </div>

        <aside className="quote-sidebar hidden min-h-0 flex-col overflow-hidden rounded-[20px] lg:flex">
          <QuoteAssistant
            stepId={stepId}
            stepTitle={stepTitle}
            stepSubtitle={stepSubtitle}
            stepTip={stepTip}
            className="h-full min-h-0"
          />
        </aside>
      </div>
    </div>
  )
}
