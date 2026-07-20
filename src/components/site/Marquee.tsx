import { cn } from '@/lib/utils'

type MarqueeProps = {
  items: string[]
  className?: string
  speed?: 'slow' | 'normal'
}

export function Marquee({ items, className, speed = 'normal' }: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div className={cn('overflow-hidden', className)} aria-hidden>
      <div
        className={cn(
          'flex w-max gap-12 whitespace-nowrap',
          speed === 'slow' ? 'animate-marquee' : 'animate-marquee',
        )}
        style={{ animationDuration: speed === 'slow' ? '60s' : '35s' }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
