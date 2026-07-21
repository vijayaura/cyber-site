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

const LINK_DISTANCE = 130

export function CyberDotsBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

      const count = Math.max(48, Math.floor((w * h) / 14000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.28),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.28),
        pulse: Math.random() * Math.PI * 2,
        size: 1 + Math.random() * 1.4,
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
          if (dist > LINK_DISTANCE) continue

          const alpha = (1 - dist / LINK_DISTANCE) * 0.22
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(25, 118, 255, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()

          if (!reducedMotion && i % 7 === 0) {
            const t = (time * 0.0009 + i * 0.11) % 1
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * t
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * t
            ctx.beginPath()
            ctx.arc(px, py, 1.3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(201, 162, 39, ${0.35 + alpha})`
            ctx.fill()
          }
        }
      }

      nodes.forEach((node, i) => {
        const pulse = reducedMotion ? 1 : 0.55 + Math.sin(time * 0.0028 + node.pulse) * 0.45
        const r = node.size * pulse

        ctx.beginPath()
        ctx.arc(node.x, node.y, r + 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(25, 118, 255, ${0.06 * pulse})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle =
          i % 11 === 0
            ? `rgba(201, 162, 39, ${0.55 * pulse})`
            : `rgba(6, 26, 64, ${0.45 * pulse})`
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
  }, [])

  return <canvas ref={canvasRef} className={cn('size-full', className)} aria-hidden />
}
