import type { LucideIcon } from 'lucide-react'
import { KeyRound, Cloud, GraduationCap, ShieldCheck } from 'lucide-react'

export type PremiumTip = {
  title: string
  time: string
  discount: number
  action: string
  icon: LucideIcon
  bg: string
}

export const PREMIUM_TIPS: PremiumTip[] = [
  { title: 'Enable Multi-Factor Auth', time: '20 min', discount: 8, action: 'Enable MFA', icon: KeyRound, bg: '#6366f1' },
  { title: 'Automated cloud backups', time: '45 min', discount: 6, action: 'Set up backups', icon: Cloud, bg: '#0ea5e9' },
  { title: 'Employee awareness training', time: '1 hr', discount: 5, action: 'Start training', icon: GraduationCap, bg: '#8b5cf6' },
  { title: 'Endpoint detection & response', time: '1 hr', discount: 8, action: 'Add EDR', icon: ShieldCheck, bg: '#14b8a6' },
]

/** @deprecated use PREMIUM_TIPS */
export const PREMIUM_RECOMMENDATIONS = PREMIUM_TIPS.map(({ title, time, discount, action }) => ({
  title,
  time,
  discount,
  action,
}))
