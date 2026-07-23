import { cn } from '@/lib/utils'

type SectionWaveBgProps = {
  corner?: 'bottom-right' | 'bottom-left'
  className?: string
}

/** Organic contour layers — clipped by section overflow, anchored to a corner */
const LAYER_COLORS = [
  '#edf5ff',
  '#d6ebff',
  '#b8dcff',
  '#8fc4ff',
  '#5a9fff',
  '#1976ff',
  '#0a3d7a',
  '#061a40',
] as const

/** Blob emanating from bottom-right of viewBox (640 × 520) */
const BLOB_PATH =
  'M640 520 L640 32 C592 38 558 68 528 108 C496 152 478 204 452 262 C424 328 388 382 332 428 C276 474 196 508 112 516 C48 522 8 508 640 520 Z'

const ORIGIN = { x: 640, y: 520 }

function WaveSvg({ flipX }: { flipX?: boolean }) {
  return (
    <svg
      viewBox="0 0 640 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-full w-full', flipX && '-scale-x-100')}
      preserveAspectRatio="xMaxYMax meet"
    >
      {LAYER_COLORS.map((fill, i) => {
        const scale = 1 - i * 0.085
        return (
          <path
            key={fill}
            d={BLOB_PATH}
            fill={fill}
            transform={`translate(${ORIGIN.x} ${ORIGIN.y}) scale(${scale}) translate(${-ORIGIN.x} ${-ORIGIN.y})`}
          />
        )
      })}
    </svg>
  )
}

export function SectionWaveBg({ corner = 'bottom-right', className }: SectionWaveBgProps) {
  const flipX = corner === 'bottom-left'

  return (
    <div
      className={cn(
        'pointer-events-none absolute z-0 select-none',
        corner === 'bottom-right' && 'bottom-0 right-0 translate-x-[6%] translate-y-[5%]',
        corner === 'bottom-left' && 'bottom-0 left-0 -translate-x-[6%] translate-y-[5%]',
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          'h-[min(88vh,760px)] w-[min(62vw,680px)] min-h-[280px] min-w-[240px]',
          flipX ? 'origin-bottom-left' : 'origin-bottom-right',
        )}
      >
        <WaveSvg flipX={flipX} />
      </div>
    </div>
  )
}
