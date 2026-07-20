import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-ink text-white hover:bg-ink-soft shadow-soft',
        primary: 'bg-navy-deep text-white hover:bg-navy shadow-medium',
        accent: 'bg-accent text-accent-ink hover:brightness-95',
        outline: 'border border-border bg-transparent hover:bg-secondary',
        ghost: 'hover:bg-secondary',
        link: 'underline-offset-4 hover:underline text-foreground',
        inverse: 'bg-white text-ink hover:bg-white/90',
        lime: 'bg-accent text-accent-ink font-semibold hover:brightness-95',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs tracking-wide uppercase',
        lg: 'h-12 px-8 text-base',
        icon: 'size-10',
      },
      shape: {
        default: 'rounded-lg',
        pill: 'rounded-full',
        square: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
