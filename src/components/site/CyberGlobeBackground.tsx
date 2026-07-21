import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Projected = { x: number; y: number; depth: number; visible: boolean }

type GlobeNode = {
  lat: number
  lng: number
  pulse: number
}

type AmbientNode = {
  x: number
  y: number
  vx: number
  vy: number
  pulse: number
}

type GlobeTier = 'large' | 'medium' | 'small' | 'tiny'

type GlobeConfig = {
  cxFactor: number
  cyFactor: number
  radiusFactor: number
  rotationSpeed: number
  opacity: number
  tier: GlobeTier
  orbits?: boolean
}

type GlobeMesh = {
  nodes: GlobeNode[]
  edges: [number, number][]
  latStep: number
  lngStep: number
  pulseEvery: number
  wireframe: 'full' | 'normal' | 'light' | 'minimal'
}

function project(
  lat: number,
  lng: number,
  rotation: number,
  cx: number,
  cy: number,
  radius: number,
): Projected {
  const latRad = (lat * Math.PI) / 180
  const lngRad = ((lng + rotation) * Math.PI) / 180

  const x3 = Math.cos(latRad) * Math.sin(lngRad)
  const y3 = Math.sin(latRad)
  const z3 = Math.cos(latRad) * Math.cos(lngRad)

  return {
    x: cx + x3 * radius,
    y: cy - y3 * radius,
    depth: z3,
    visible: z3 > -0.12,
  }
}

function buildNodes(latStep: number, lngStep: number): GlobeNode[] {
  const nodes: GlobeNode[] = []

  for (let lat = -75; lat <= 75; lat += latStep) {
    for (let lng = 0; lng < 360; lng += lngStep) {
      nodes.push({ lat, lng, pulse: Math.random() * Math.PI * 2 })
    }
  }

  return nodes
}

function buildEdges(nodes: GlobeNode[], latStep: number, lngStep: number) {
  const edges: [number, number][] = []
  const key = (lat: number, lng: number) => `${lat}:${((lng % 360) + 360) % 360}`

  const indexByKey = new Map<string, number>()
  nodes.forEach((node, i) => indexByKey.set(key(node.lat, node.lng), i))

  for (const node of nodes) {
    const i = indexByKey.get(key(node.lat, node.lng))!
    const neighbors = [
      key(node.lat + latStep, node.lng),
      key(node.lat - latStep, node.lng),
      key(node.lat, node.lng + lngStep),
      key(node.lat, node.lng - lngStep),
    ]

    for (const neighborKey of neighbors) {
      const j = indexByKey.get(neighborKey)
      if (j !== undefined && i < j) edges.push([i, j])
    }
  }

  return edges
}

function createMesh(latStep: number, lngStep: number, pulseEvery: number, wireframe: GlobeMesh['wireframe']): GlobeMesh {
  const nodes = buildNodes(latStep, lngStep)
  return { nodes, edges: buildEdges(nodes, latStep, lngStep), latStep, lngStep, pulseEvery, wireframe }
}

const TIER_MESH: Record<GlobeTier, GlobeMesh> = {
  large: createMesh(15, 20, 1, 'full'),
  medium: createMesh(25, 35, 2, 'normal'),
  small: createMesh(35, 50, 3, 'light'),
  tiny: createMesh(45, 70, 5, 'minimal'),
}

const WORLD_GLOBES: GlobeConfig[] = [
  // Large — opposite corners
  { cxFactor: 0.1, cyFactor: 0.14, radiusFactor: 0.2, rotationSpeed: 0.1, opacity: 0.52, tier: 'large', orbits: true },
  { cxFactor: 0.9, cyFactor: 0.86, radiusFactor: 0.18, rotationSpeed: -0.08, opacity: 0.46, tier: 'large', orbits: true },
  // Medium — remaining corners + edge pockets
  { cxFactor: 0.88, cyFactor: 0.12, radiusFactor: 0.13, rotationSpeed: -0.05, opacity: 0.42, tier: 'medium' },
  { cxFactor: 0.08, cyFactor: 0.84, radiusFactor: 0.125, rotationSpeed: 0.045, opacity: 0.4, tier: 'medium' },
  { cxFactor: 0.78, cyFactor: 0.08, radiusFactor: 0.1, rotationSpeed: 0.04, opacity: 0.34, tier: 'medium' },
  { cxFactor: 0.18, cyFactor: 0.92, radiusFactor: 0.095, rotationSpeed: -0.038, opacity: 0.32, tier: 'medium' },
  // Small — scattered along edges, away from center
  { cxFactor: 0.04, cyFactor: 0.34, radiusFactor: 0.078, rotationSpeed: 0.035, opacity: 0.26, tier: 'small' },
  { cxFactor: 0.96, cyFactor: 0.3, radiusFactor: 0.072, rotationSpeed: -0.032, opacity: 0.24, tier: 'small' },
  { cxFactor: 0.28, cyFactor: 0.06, radiusFactor: 0.065, rotationSpeed: -0.03, opacity: 0.22, tier: 'small' },
  { cxFactor: 0.72, cyFactor: 0.94, radiusFactor: 0.062, rotationSpeed: 0.028, opacity: 0.2, tier: 'small' },
  // Tiny — corner accents
  { cxFactor: 0.22, cyFactor: 0.04, radiusFactor: 0.04, rotationSpeed: 0.05, opacity: 0.14, tier: 'tiny' },
  { cxFactor: 0.96, cyFactor: 0.04, radiusFactor: 0.036, rotationSpeed: -0.04, opacity: 0.12, tier: 'tiny' },
  { cxFactor: 0.04, cyFactor: 0.96, radiusFactor: 0.034, rotationSpeed: 0.035, opacity: 0.11, tier: 'tiny' },
  { cxFactor: 0.96, cyFactor: 0.96, radiusFactor: 0.032, rotationSpeed: -0.03, opacity: 0.1, tier: 'tiny' },
]

const SORTED_GLOBES = [...WORLD_GLOBES].sort((a, b) => a.radiusFactor - b.radiusFactor)

const WIREFRAME_LATS: Record<GlobeMesh['wireframe'], number[]> = {
  full: [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75],
  normal: [-60, -30, 0, 30, 60],
  light: [-45, 0, 45],
  minimal: [0],
}

const WIREFRAME_LNG_COUNT: Record<GlobeMesh['wireframe'], number> = {
  full: 18,
  normal: 12,
  light: 8,
  minimal: 6,
}

function drawWireframe(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rotation: number,
  opacity: number,
  wireframe: GlobeMesh['wireframe'],
) {
  const lats = WIREFRAME_LATS[wireframe]
  const lngCount = WIREFRAME_LNG_COUNT[wireframe]
  const step = wireframe === 'full' ? 4 : wireframe === 'normal' ? 6 : 8

  for (const lat of lats) {
    ctx.beginPath()
    let started = false
    for (let lng = 0; lng <= 360; lng += step) {
      const p = project(lat, lng, rotation, cx, cy, radius)
      if (!p.visible) {
        started = false
        continue
      }
      if (!started) {
        ctx.moveTo(p.x, p.y)
        started = true
      } else {
        ctx.lineTo(p.x, p.y)
      }
    }
    ctx.strokeStyle = `rgba(25, 118, 255, ${0.1 * opacity})`
    ctx.lineWidth = 0.65
    ctx.stroke()
  }

  for (let i = 0; i < lngCount; i++) {
    const lng = (360 / lngCount) * i
    ctx.beginPath()
    let started = false
    for (let lat = -90; lat <= 90; lat += step) {
      const p = project(lat, lng, rotation, cx, cy, radius)
      if (!p.visible) {
        started = false
        continue
      }
      if (!started) {
        ctx.moveTo(p.x, p.y)
        started = true
      } else {
        ctx.lineTo(p.x, p.y)
      }
    }
    ctx.strokeStyle = `rgba(0, 194, 255, ${0.08 * opacity})`
    ctx.lineWidth = 0.65
    ctx.stroke()
  }
}

function drawOrbitRings(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rotation: number,
  time: number,
  opacity: number,
) {
  for (let i = 0; i < 3; i++) {
    const tilt = rotation * 0.015 + i * 0.9
    const rx = radius * (1.18 + i * 0.12)
    const ry = radius * (0.34 + i * 0.06)
    const spin = time * 0.00025 * (i % 2 === 0 ? 1 : -1)

    ctx.beginPath()
    ctx.ellipse(cx, cy, rx, ry, tilt + spin, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(0, 194, 255, ${(0.06 + i * 0.025) * opacity})`
    ctx.lineWidth = 0.6
    ctx.stroke()
  }
}

function drawGlobeMesh(
  ctx: CanvasRenderingContext2D,
  mesh: GlobeMesh,
  cx: number,
  cy: number,
  radius: number,
  rotation: number,
  time: number,
  opacity: number,
  reducedMotion: boolean,
) {
  drawWireframe(ctx, cx, cy, radius, rotation, opacity, mesh.wireframe)

  const projected = mesh.nodes.map((node) => project(node.lat, node.lng, rotation, cx, cy, radius))
  const dotScale = Math.max(0.65, Math.min(1.4, radius / 80))

  for (const [a, b] of mesh.edges) {
    const pa = projected[a]
    const pb = projected[b]
    if (!pa.visible || !pb.visible) continue

    const depth = (pa.depth + pb.depth) / 2
    const alpha = (0.1 + depth * 0.28) * opacity

    ctx.beginPath()
    ctx.moveTo(pa.x, pa.y)
    ctx.lineTo(pb.x, pb.y)
    ctx.strokeStyle = `rgba(0, 194, 255, ${alpha})`
    ctx.lineWidth = 0.75
    ctx.stroke()

    if (!reducedMotion && a % mesh.pulseEvery === 0) {
      const pulse = (time * 0.0012 + a * 0.13) % 1
      const px = pa.x + (pb.x - pa.x) * pulse
      const py = pa.y + (pb.y - pa.y) * pulse
      ctx.beginPath()
      ctx.arc(px, py, 1.2 * dotScale, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200, 240, 96, ${(0.35 + depth * 0.5) * opacity})`
      ctx.fill()
    }
  }

  projected.forEach((p, i) => {
    if (!p.visible) return
    const node = mesh.nodes[i]
    const pulse = reducedMotion ? 1 : 0.6 + Math.sin(time * 0.003 + node.pulse) * 0.4
    const alpha = (0.28 + p.depth * 0.62) * pulse * opacity

    ctx.beginPath()
    ctx.arc(p.x, p.y, (1.2 + p.depth * 1.2) * dotScale, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(25, 118, 255, ${alpha})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(p.x, p.y, (3.5 + p.depth * 2) * dotScale, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 194, 255, ${alpha * 0.18})`
    ctx.fill()
  })

  return projected.filter((p) => p.visible)
}

function drawAmbientNetwork(
  ctx: CanvasRenderingContext2D,
  nodes: AmbientNode[],
  w: number,
  h: number,
  time: number,
  reducedMotion: boolean,
) {
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
      if (dist > 120) continue

      const alpha = (1 - dist / 120) * 0.09
      ctx.beginPath()
      ctx.moveTo(nodes[i].x, nodes[i].y)
      ctx.lineTo(nodes[j].x, nodes[j].y)
      ctx.strokeStyle = `rgba(25, 118, 255, ${alpha})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }

  nodes.forEach((node, i) => {
    const pulse = reducedMotion ? 1 : 0.55 + Math.sin(time * 0.0025 + node.pulse) * 0.45
    ctx.beginPath()
    ctx.arc(node.x, node.y, 1 * pulse, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 194, 255, ${0.3 * pulse})`
    ctx.fill()

    if (!reducedMotion && i % 6 === 0) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 194, 255, 0.05)'
      ctx.fill()
    }
  })
}

function drawCrossLinks(
  ctx: CanvasRenderingContext2D,
  anchors: Projected[],
  time: number,
  reducedMotion: boolean,
) {
  if (anchors.length < 2) return

  const linkCount = Math.min(6, Math.floor(anchors.length / 4))
  const links: [number, number][] = []

  for (let i = 0; i < linkCount; i++) {
    const a = Math.floor((anchors.length * (i + 1)) / (linkCount + 2))
    const b = Math.floor((anchors.length * (i + 1 + linkCount / 2)) / (linkCount + 2)) % anchors.length
    if (a !== b) links.push([a, b])
  }

  for (const [a, b] of links) {
    const pa = anchors[a]
    const pb = anchors[b]
    if (!pa || !pb) continue

    const mx = (pa.x + pb.x) / 2
    const my = (pa.y + pb.y) / 2 - 36
    const depth = (pa.depth + pb.depth) / 2

    ctx.beginPath()
    ctx.moveTo(pa.x, pa.y)
    ctx.quadraticCurveTo(mx, my, pb.x, pb.y)
    ctx.strokeStyle = `rgba(200, 240, 96, ${0.07 + depth * 0.1})`
    ctx.lineWidth = 0.55
    ctx.setLineDash([4, 8])
    ctx.stroke()
    ctx.setLineDash([])

    if (!reducedMotion) {
      const pulse = (time * 0.0008 + a * 0.17) % 1
      const t = pulse
      const inv = 1 - t
      const x = inv * inv * pa.x + 2 * inv * t * mx + t * t * pb.x
      const y = inv * inv * pa.y + 2 * inv * t * my + t * t * pb.y
      ctx.beginPath()
      ctx.arc(x, y, 1.4, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200, 240, 96, ${0.4 + depth * 0.35})`
      ctx.fill()
    }
  }
}

function drawScanGrid(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, reducedMotion: boolean) {
  const spacing = 56
  const offset = reducedMotion ? 0 : (time * 0.015) % spacing

  ctx.strokeStyle = 'rgba(25, 118, 255, 0.035)'
  ctx.lineWidth = 0.5

  for (let x = -spacing; x < w + spacing; x += spacing) {
    ctx.beginPath()
    ctx.moveTo(x + offset, 0)
    ctx.lineTo(x + offset, h)
    ctx.stroke()
  }

  for (let y = -spacing; y < h + spacing; y += spacing) {
    ctx.beginPath()
    ctx.moveTo(0, y + offset * 0.6)
    ctx.lineTo(w, y + offset * 0.6)
    ctx.stroke()
  }
}

function scatterPosition(size: number) {
  return (Math.random() < 0.5 ? Math.random() * 0.26 : 0.74 + Math.random() * 0.26) * size
}

export function CyberGlobeBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let rotation = 0
    let ambientNodes: AmbientNode[] = []
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

      const count = Math.max(24, Math.floor((w * h) / 32000))
      ambientNodes = Array.from({ length: count }, () => ({
        x: scatterPosition(w),
        y: scatterPosition(h),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (time: number) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      if (!reducedMotion) rotation += 0.1

      drawScanGrid(ctx, w, h, time, reducedMotion)
      drawAmbientNetwork(ctx, ambientNodes, w, h, time, reducedMotion)

      const anchorPoints: Projected[] = []
      const base = Math.min(w, h)

      for (const config of SORTED_GLOBES) {
        const mesh = TIER_MESH[config.tier]
        const cx = w * config.cxFactor
        const cy = h * config.cyFactor
        const radius = base * config.radiusFactor
        const rot = rotation * (config.rotationSpeed / 0.1)

        if (config.orbits) {
          drawOrbitRings(ctx, cx, cy, radius, rotation, time, config.opacity)
        }

        const visible = drawGlobeMesh(ctx, mesh, cx, cy, radius, rot, time, config.opacity, reducedMotion)
        const anchorSample = config.tier === 'tiny' ? 1 : config.tier === 'small' ? 2 : 3
        anchorPoints.push(...visible.slice(0, anchorSample))
      }

      drawCrossLinks(ctx, anchorPoints, time, reducedMotion)

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

  return (
    <canvas
      ref={canvasRef}
      className={cn('size-full', className)}
      aria-hidden
    />
  )
}
