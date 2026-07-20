import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
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
  icon: LucideIcon
  title: string
  subtitle?: string
  stepId: string
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
  icon: Icon,
  title,
  subtitle,
  stepId,
  stepTip,
  children,
}: QuoteWizardProps) {
  const answersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    answersRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stepId])

  const showSubtitle = !!subtitle && (stepId === 'industry' || activeStep === 0)

  return (
    <div className="quote-shell flex h-[100dvh] flex-col overflow-hidden bg-[#09090b]">
      <nav className="relative z-20 flex h-12 shrink-0 items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 sm:flex">
          {Array.from({ length: 12 }).map((_, i) => {
            const mapped = Math.round((i / 11) * (questionSteps - 1))
            const done = mapped < activeStep
            const active = mapped === activeStep
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

        <Link
          to="/"
          className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md hover:bg-white/15 hover:text-white"
          aria-label="Exit"
        >
          <X className="size-4" />
        </Link>
      </nav>

      <div className="relative z-20 px-4 pb-2 sm:hidden">
        <div className="h-0.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-white"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 sm:gap-4 sm:p-4 lg:grid-cols-[1fr_360px] lg:p-5">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
          <div className="quote-question-card relative shrink-0 overflow-hidden">
            <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-[#1976FF]/25 blur-3xl" />

            <div className="relative flex items-center gap-3 px-5 py-4 sm:px-6 sm:py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepId}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-w-0 flex-1 items-start gap-2.5"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm sm:size-9">
                    <Icon className="size-4 text-white" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                      {isLoading ? 'Almost done' : `Step ${activeStep + 1} of ${questionSteps}`}
                    </span>
                    <h1 className="mt-0.5 text-[17px] font-semibold leading-snug tracking-tight text-white sm:text-[20px]">
                      {title}
                    </h1>
                    {showSubtitle && (
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">{subtitle}</p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex shrink-0 items-center gap-2.5 border-l border-white/15 pl-3 sm:gap-3 sm:pl-4">
                <ScoreGauge score={score} size="sm" inverted showLabel={false} />
                <div className="text-right leading-tight">
                  <p className="text-[15px] font-bold tabular-nums text-white sm:text-xl">
                    ${fmtNumber(premium)}
                  </p>
                  <p className="text-[10px] font-medium text-white/50 sm:text-[11px]">/yr</p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={answersRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={stepId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <aside className="hidden min-h-0 flex-col overflow-hidden rounded-[20px] bg-[#111113] lg:flex">
          <QuoteAssistant
            stepId={stepId}
            stepTitle={title}
            stepSubtitle={subtitle}
            stepTip={stepTip}
            className="h-full min-h-0"
          />
        </aside>
      </div>
    </div>
  )
}
