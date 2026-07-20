import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, animate, motion } from 'motion/react'

type CountUpProps = {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function CountUp({ to, prefix = '', suffix = '', decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionVal, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] })
    return controls.stop
  }, [inView, motionVal, to])

  useEffect(() => {
    const unsub = motionVal.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent =
          prefix +
          v.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix
      }
    })
    return unsub
  }, [motionVal, prefix, suffix, decimals])

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0{suffix}
    </motion.span>
  )
}
