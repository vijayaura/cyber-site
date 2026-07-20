import { cn } from '@/lib/utils'
import { Container } from './Container'

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: 'default' | 'muted' | 'dark' | 'hero'
  wide?: boolean
  id?: string
}

const variantClasses = {
  default: 'bg-background',
  muted: 'bg-surface-muted',
  dark: 'bg-navy-deep text-white',
  hero: 'bg-hero text-white',
}

export function Section({
  className,
  variant = 'default',
  wide,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn('section-padding', variantClasses[variant], className)}
      {...props}
    >
      <Container wide={wide}>{children}</Container>
    </section>
  )
}

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  light,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-16 max-w-3xl space-y-4',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow', light && 'text-cyan')}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          'heading-section',
          light && 'text-white',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'body-large',
            light ? 'text-white/70' : undefined,
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
