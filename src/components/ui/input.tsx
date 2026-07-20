import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-xl border border-[#e8e8ed] bg-[#f9f9fb] px-4 text-[17px] font-medium tabular-nums transition-colors',
        'placeholder:text-[#86868b] focus-visible:border-[#1976FF] focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1976FF]/20',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }
