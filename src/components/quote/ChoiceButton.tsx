import { PickerCard } from './PickerCard'
import type { LucideIcon } from 'lucide-react'

type ChoiceButtonProps = {
  label: string
  selected?: boolean
  onClick: () => void
  icon?: LucideIcon
  iconBg?: string
}

export function ChoiceButton(props: ChoiceButtonProps) {
  return <PickerCard layout="row" {...props} />
}
