import { motion } from 'motion/react'
import {
  Shield,
  Lock,
  Cloud,
  Server,
  Zap,
  Fingerprint,
} from 'lucide-react'

const orbitIcons = [
  { Icon: Lock, angle: 0 },
  { Icon: Cloud, angle: 60 },
  { Icon: Server, angle: 120 },
  { Icon: Zap, angle: 180 },
  { Icon: Fingerprint, angle: 240 },
]

export function AnimatedShield() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden>
      <div className="absolute inset-[10%] rounded-full bg-electric/20 blur-3xl" />

      {[60, 78, 96].map((size, i) => (
        <motion.div
          key={size}
          className="absolute inset-0 flex items-start justify-center"
          style={{ padding: `${(100 - size) / 2}%` }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 40 + i * 10, repeat: Infinity, ease: 'linear' }}
        >
          <div className="relative size-full rounded-full border border-white/10">
            <div className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_rgba(0,194,255,0.8)]" />
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {orbitIcons.map(({ Icon, angle }) => {
          const rad = (angle * Math.PI) / 180
          const r = 46
          const x = 50 + r * Math.sin(rad)
          const y = 50 - r * Math.cos(rad)
          return (
            <motion.div
              key={angle}
              className="absolute size-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="glass-dark flex size-10 items-center justify-center rounded-2xl">
                <Icon className="size-4 text-white/90" />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex size-40 items-center justify-center rounded-3xl bg-brand-gradient shadow-glow md:size-48">
          <Shield className="size-16 text-white md:size-20" strokeWidth={1.5} />
          <motion.div
            className="absolute inset-x-4 h-px bg-white/40"
            animate={{ y: [-20, 60, -20] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}
