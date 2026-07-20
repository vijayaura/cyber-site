import type { LucideIcon } from 'lucide-react'
import {
  Cpu,
  HeartPulse,
  ShoppingBag,
  Factory,
  GraduationCap,
  Briefcase,
  HardHat,
  UtensilsCrossed,
  Truck,
  Banknote,
  Landmark,
  LayoutGrid,
  Globe2,
  Flag,
  Building2,
  Laptop,
  User,
  Mail,
  Phone,
  CreditCard,
  Wallet,
  Stethoscope,
  Users,
  PiggyBank,
  Lightbulb,
  Key,
  Fingerprint,
  FileText,
  Ban,
  MapPin,
  Building,
  Monitor,
} from 'lucide-react'

export type OptionIcon = {
  icon: LucideIcon
  bg: string
}

export const INDUSTRY_ICONS: Record<string, OptionIcon> = {
  Technology: { icon: Cpu, bg: '#6366f1' },
  Healthcare: { icon: HeartPulse, bg: '#ec4899' },
  Retail: { icon: ShoppingBag, bg: '#f59e0b' },
  Manufacturing: { icon: Factory, bg: '#64748b' },
  Education: { icon: GraduationCap, bg: '#8b5cf6' },
  'Professional Services': { icon: Briefcase, bg: '#0ea5e9' },
  Construction: { icon: HardHat, bg: '#ea580c' },
  Hospitality: { icon: UtensilsCrossed, bg: '#14b8a6' },
  Logistics: { icon: Truck, bg: '#0284c7' },
  'Financial Services': { icon: Banknote, bg: '#059669' },
  'Government Contractor': { icon: Landmark, bg: '#4f46e5' },
  Other: { icon: LayoutGrid, bg: '#71717a' },
}

export const COUNTRY_ICONS: Record<string, OptionIcon> = {
  'United Arab Emirates': { icon: Flag, bg: '#059669' },
  'Saudi Arabia': { icon: Flag, bg: '#16a34a' },
  'United Kingdom': { icon: Flag, bg: '#2563eb' },
  'United States': { icon: Flag, bg: '#dc2626' },
  Germany: { icon: Flag, bg: '#ca8a04' },
  France: { icon: Flag, bg: '#1d4ed8' },
  Singapore: { icon: Flag, bg: '#e11d48' },
  India: { icon: Flag, bg: '#ea580c' },
  Australia: { icon: Flag, bg: '#0891b2' },
  Other: { icon: Globe2, bg: '#71717a' },
}

export const OPERATES_ICONS: Record<string, OptionIcon> = {
  'Single location': { icon: Building, bg: '#6366f1' },
  'Multiple offices': { icon: Building2, bg: '#0ea5e9' },
  'Remote only': { icon: Laptop, bg: '#8b5cf6' },
  Hybrid: { icon: Monitor, bg: '#14b8a6' },
}

export const DATA_TYPE_ICONS: Record<string, OptionIcon> = {
  'Customer Names': { icon: User, bg: '#6366f1' },
  'Email Addresses': { icon: Mail, bg: '#0ea5e9' },
  'Phone Numbers': { icon: Phone, bg: '#14b8a6' },
  'Credit Card Data': { icon: CreditCard, bg: '#dc2626' },
  'Payment Information': { icon: Wallet, bg: '#ea580c' },
  'Medical Records': { icon: Stethoscope, bg: '#ec4899' },
  'Employee Information': { icon: Users, bg: '#8b5cf6' },
  'Financial Records': { icon: Banknote, bg: '#059669' },
  'Bank Details': { icon: PiggyBank, bg: '#0284c7' },
  'Intellectual Property': { icon: Lightbulb, bg: '#f59e0b' },
  'Trade Secrets': { icon: Key, bg: '#64748b' },
  Passwords: { icon: Key, bg: '#7c3aed' },
  'Government IDs': { icon: Fingerprint, bg: '#4f46e5' },
  'Tax Records': { icon: FileText, bg: '#ca8a04' },
  'Biometric Data': { icon: Fingerprint, bg: '#be185d' },
  None: { icon: Ban, bg: '#71717a' },
}

export function getOptionIcon(map: Record<string, OptionIcon>, key: string): OptionIcon {
  return map[key] ?? { icon: MapPin, bg: '#71717a' }
}
