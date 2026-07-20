import { useEffect, useState } from 'react'
import { motion, useSpring } from 'motion/react'
import { scoreGrade } from '@/lib/quote-store'
import { cn } from '@/lib/utils'

type ScoreGaugeProps = {
  score: number
  size?: 'sm' | 'md' | 'bar' | 'lg'
  showLabel?: boolean
  inverted?: boolean
  className?: string
}

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

  useEffect(() => {
    spring.set(score)
    const unsub = spring.on('change', (v) => {
      setOffset(circumference - (v / 100) * circumference)
    })
    return unsub
  }, [score, spring, circumference])

  const dim = size === 'sm' ? 56 : size === 'bar' ? 96 : size === 'lg' ? 120 : 88

  return (
    <div className={cn('flex items-end gap-4', className)}>
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} viewBox="0 0 96 96" aria-hidden>
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={inverted ? 'text-white/15' : 'text-border'}
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={grade.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 48 48)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              'font-display tabular-nums',
              size === 'sm' ? 'text-xl' : size === 'bar' ? 'text-[28px]' : size === 'lg' ? 'text-4xl' : 'text-3xl',
              inverted ? 'text-white' : 'text-foreground',
            )}
          >
            {Math.round(score)}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className="pb-1">
          <p className={cn('label-caps', inverted && 'text-white/50')}>Cyber score</p>
          <p className="font-display text-lg" style={{ color: inverted ? grade.color : grade.color }}>
            {grade.label}
          </p>
        </div>
      )}
    </div>
  )
}
