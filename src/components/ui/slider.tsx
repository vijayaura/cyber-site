import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center py-2', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#f2f2f7]">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-[#1976FF]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-6 rounded-full border-[3px] border-white bg-[#1976FF] shadow-[0_2px_8px_rgba(25,118,255,0.4)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1976FF]/30 hover:scale-110" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
