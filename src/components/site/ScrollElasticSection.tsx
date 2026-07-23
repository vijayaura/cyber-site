import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ScrollElasticSectionProps = {
  children: ReactNode
  className?: string
  id?: string
  intensity?: number
  backgroundDecoration?: ReactNode
}

const spring = { stiffness: 72, damping: 22, mass: 0.55 }

export function ScrollElasticSection({
  children,
  className,
  id,
  intensity = 1,
  backgroundDecoration,
}: ScrollElasticSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, spring)
  const y = useTransform(smooth, [0, 0.45, 1], [48 * intensity, 0, -36 * intensity])
  const scale = useTransform(smooth, [0, 0.45, 1], [0.94, 1, 0.97])

  return (
    <section ref={ref} id={id} className={cn('relative overflow-hidden', className)}>
      {backgroundDecoration}
      <motion.div style={{ y, scale }} className="relative z-[1] origin-[center_top] will-change-transform">
        {children}
      </motion.div>
    </section>
  )
}
