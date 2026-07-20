import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type ContinueButtonProps = {
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function ContinueButton({ onClick, disabled, className }: ContinueButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#1d1d1f] text-[15px] font-semibold text-white transition-all hover:bg-[#333] active:scale-[0.98] disabled:opacity-40',
        className,
      )}
    >
      Continue
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}
