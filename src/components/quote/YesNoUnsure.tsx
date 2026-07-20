import { cn } from '@/lib/utils'
import { Check, HelpCircle, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PickerCard } from './PickerCard'

type YesNoUnsureProps = {
  value?: string
  onChange: (value: string) => void
  includeUnsure?: boolean
}

const OPTIONS: { label: string; val: string; icon: LucideIcon; bg: string }[] = [
  { label: 'Yes', val: 'yes', icon: Check, bg: '#22c55e' },
  { label: 'No', val: 'no', icon: X, bg: '#ef4444' },
  { label: 'Not sure', val: 'unsure', icon: HelpCircle, bg: '#f59e0b' },
]

export function YesNoUnsure({ value, onChange, includeUnsure = true }: YesNoUnsureProps) {
  const options = includeUnsure ? OPTIONS : OPTIONS.filter((o) => o.val !== 'unsure')

  return (
    <div
      className={cn(
        'picker-grid grid w-full gap-3',
        includeUnsure ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2',
      )}
    >
      {options.map(({ label, val, icon, bg }) => (
        <PickerCard
          key={val}
          label={label}
          icon={icon}
          iconBg={bg}
          layout="tile"
          selected={value === val}
          onClick={() => onChange(val)}
        />
      ))}
    </div>
  )
}
