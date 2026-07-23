import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  pulse: number
  size: number
}

type CyberDotsBackgroundProps = {
  className?: string
  /** Lighter mesh for hero text areas */
  density?: 'light' | 'normal'
}

const PRESETS = {
  light: {
    areaDivisor: 18000,
    minCount: 36,
    maxCount: 56,
    linkDistance: 88,
    lineAlpha: 0.08,
    speed: 0.1,
    dotOpacity: 0.22,
    haloOpacity: 0.035,
    pulseAmount: 0.2,
  },
  normal: {
    areaDivisor: 7500,
    minCount: 80,
    maxCount: Infinity,
    linkDistance: 130,
    lineAlpha: 0.22,
    speed: 0.28,
    dotOpacity: 0.45,
    haloOpacity: 0.06,
    pulseAmount: 0.45,
  },
} as const

export function CyberDotsBackground({ className, density = 'normal' }: CyberDotsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const preset = PRESETS[density]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let nodes: Node[] = []
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(
        preset.maxCount,
        Math.max(preset.minCount, Math.floor((w * h) / preset.areaDivisor)),
      )
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0 : preset.speed),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0 : preset.speed),
        pulse: Math.random() * Math.PI * 2,
        size: density === 'light' ? 0.8 + Math.random() * 0.8 : 1 + Math.random() * 1.4,
      }))
    }

    const draw = (time: number) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      for (const node of nodes) {
        if (!reducedMotion) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0 || node.x > w) node.vx *= -1
          if (node.y < 0 || node.y > h) node.vy *= -1
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > preset.linkDistance) continue

          const alpha = (1 - dist / preset.linkDistance) * preset.lineAlpha
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(25, 118, 255, ${alpha})`
          ctx.lineWidth = density === 'light' ? 0.45 : 0.6
          ctx.stroke()
        }
      }

      nodes.forEach((node) => {
        const pulse = reducedMotion
          ? 1
          : 1 - preset.pulseAmount + Math.sin(time * 0.0018 + node.pulse) * preset.pulseAmount
        const r = node.size * pulse

        ctx.beginPath()
        ctx.arc(node.x, node.y, r + 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(25, 118, 255, ${preset.haloOpacity * pulse})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 26, 64, ${preset.dotOpacity * pulse})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [density, preset])

  return <canvas ref={canvasRef} className={cn('size-full', className)} aria-hidden />
}
