import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, AnimatePresence } from 'motion/react'
import { scoreGrade } from '@/lib/quote-store'
import { cn } from '@/lib/utils'

type ScoreGaugeProps = {
  score: number
  size?: 'sm' | 'md' | 'bar' | 'lg'
  showLabel?: boolean
  inverted?: boolean
  className?: string
  celebrateThreshold?: number
}

const pulseTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }

const CELEBRATION_COLORS = ['#c8f060', '#00C2FF', '#1976FF', '#c9a227', '#ffffff']

function CelebrationBurst({ active }: { active: boolean }) {
  if (!active) return null

  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    color: CELEBRATION_COLORS[i % CELEBRATION_COLORS.length],
    dist: 28 + (i % 3) * 10,
  }))

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 size-2 rounded-full"
          style={{ backgroundColor: p.color, marginLeft: -4, marginTop: -4 }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.2, 0],
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
        />
      ))}
      <motion.span
        className="absolute inset-0 rounded-full ring-2 ring-accent/60"
        initial={{ scale: 0.85, opacity: 0.8 }}
        animate={{ scale: 1.45, opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      />
    </div>
  )
}

export function ScoreGauge({
  score,
  size = 'md',
  showLabel = true,
  inverted = false,
  className,
  celebrateThreshold = 80,
}: ScoreGaugeProps) {
  const grade = scoreGrade(score)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference - (score / 100) * circumference
  const gaugeControls = useAnimationControls()
  const numberControls = useAnimationControls()
  const prevScore = useRef(score)
  const crossedThreshold = useRef(false)
  const isFirstRender = useRef(true)
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevScore.current = score
      if (score >= celebrateThreshold) crossedThreshold.current = true
      return
    }

    const crossedUp =
      prevScore.current < celebrateThreshold && score >= celebrateThreshold && !crossedThreshold.current

    if (crossedUp) {
      crossedThreshold.current = true
      setCelebrate(true)
      window.setTimeout(() => setCelebrate(false), 900)
      gaugeControls.start({
        scale: [1, 1.22, 0.94, 1.08, 1],
        rotate: [0, -4, 4, 0],
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })
    } else if (prevScore.current !== score) {
      gaugeControls.start({
        scale: [1, 1.16, 0.96, 1],
        transition: pulseTransition,
      })
    }

    if (score < celebrateThreshold) {
      crossedThreshold.current = false
    }

    prevScore.current = score

    numberControls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
    })
  }, [score, gaugeControls, numberControls, celebrateThreshold])

  const dim = size === 'sm' ? 56 : size === 'bar' ? 96 : size === 'lg' ? 120 : 88
  const strokeWidth = size === 'sm' ? 5 : size === 'lg' ? 7 : 6

  return (
    <div className={cn('flex items-end gap-4', className)}>
      <motion.div
        className="relative origin-center"
        style={{ width: dim, height: dim }}
        animate={gaugeControls}
      >
        <CelebrationBurst active={celebrate} />
        <svg width={dim} height={dim} viewBox="0 0 96 96" aria-hidden>
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className={inverted ? 'text-white/15' : 'text-border'}
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={grade.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: targetOffset }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            transform="rotate(-90 48 48)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={score}
            animate={numberControls}
            className={cn(
              'font-display tabular-nums',
              size === 'sm' ? 'text-xl' : size === 'bar' ? 'text-[28px]' : size === 'lg' ? 'text-4xl' : 'text-3xl',
              inverted ? 'text-white' : 'text-foreground',
            )}
          >
            {score}
          </motion.span>
        </div>
        <AnimatePresence>
          {celebrate && (
            <motion.span
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-accent"
            >
              Strong score!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      {showLabel && (
        <div className="pb-1">
          <p className={cn('label-caps', inverted && 'text-white/50')}>Cyber score</p>
          <p className="font-display text-lg" style={{ color: grade.color }}>
            {grade.label}
          </p>
        </div>
      )}
    </div>
  )
}
