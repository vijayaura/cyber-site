import { cn } from '@/lib/utils'

type TrustBadgesProps = {
  items: string[]
  className?: string
}

export function TrustBadges({ items, className }: TrustBadgesProps) {
  return (
    <p
      className={cn(
        'mt-6 inline-flex flex-nowrap items-center justify-center whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-foreground/50',
        className,
      )}
    >
      <span className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground/65">Certifications</span>
      {items.map((item) => (
        <span key={item} className="inline-flex items-center">
          <span className="mx-3 text-muted-foreground/25" aria-hidden>
            ·
          </span>
          <span className="font-semibold">{item}</span>
        </span>
      ))}
    </p>
  )
}
