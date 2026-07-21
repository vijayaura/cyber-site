import { cn } from '@/lib/utils'

type TrustBadgesProps = {
  items: string[]
  className?: string
}

export function TrustBadges({ items, className }: TrustBadgesProps) {
  return (
    <div className={cn('border-t border-border bg-cream/60 py-5', className)}>
      <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5">
        {items.map((item) => (
          <li
            key={item}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/75"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
