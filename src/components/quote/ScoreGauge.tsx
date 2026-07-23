import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, useSpring } from 'motion/react'
import { scoreGrade } from '@/lib/quote-store'
import { cn } from '@/lib/utils'

type ScoreGaugeProps = {
  score: number
  size?: 'sm' | 'md' | 'bar' | 'lg'
  showLabel?: boolean
  inverted?: boolean
  className?: string
}

const pulseTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }

export function ScoreGauge({
  score,
  size = 'md',
  showLabel = true,
  inverted = false,
  className,
}: ScoreGaugeProps) {
  const grade = scoreGrade(score)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const spring = useSpring(0, { stiffness: 60, damping: 18 })
  const [offset, setOffset] = useState(circumference)
  const gaugeControls = useAnimationControls()
  const numberControls = useAnimationControls()
  const prevScore = useRef(score)
  const isFirstRender = useRef(true)

  useEffect(() => {
    spring.set(score)
    const unsub = spring.on('change', (v) => {
      setOffset(circumference - (v / 100) * circumference)
    })
    return unsub
  }, [score, spring, circumference])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevScore.current = score
      return
    }
    if (prevScore.current === score) return
    prevScore.current = score

    gaugeControls.start({
      scale: [1, 1.16, 0.96, 1],
      transition: pulseTransition,
    })
    numberControls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
    })
  }, [score, gaugeControls, numberControls])

  const dim = size === 'sm' ? 56 : size === 'bar' ? 96 : size === 'lg' ? 120 : 88
  const strokeWidth = size === 'sm' ? 5 : size === 'lg' ? 7 : 6

  return (
    <div className={cn('flex items-end gap-4', className)}>
      <motion.div
        className="relative origin-center"
        style={{ width: dim, height: dim }}
        animate={gaugeControls}
      >
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
            strokeDashoffset={offset}
            transform="rotate(-90 48 48)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            animate={numberControls}
            className={cn(
              'font-display tabular-nums',
              size === 'sm' ? 'text-xl' : size === 'bar' ? 'text-[28px]' : size === 'lg' ? 'text-4xl' : 'text-3xl',
              inverted ? 'text-white' : 'text-foreground',
            )}
          >
            {Math.round(score)}
          </motion.span>
        </div>
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
