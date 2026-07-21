import { create } from 'zustand'

export type Answers = {
  industry?: string
  revenue?: number
  employees?: number
  country?: string
  operates?: string
  data?: string[]
  payments?: string
  remote?: string
  training?: string
  phishing?: string
  inventory?: string
  mfa?: string
  vpn?: string
  installFree?: string
  backups?: string
  backupTest?: string
  patching?: string
  legacy?: string
  emailBlock?: string
  emailAuth?: string
  antivirus?: string
  monitoring?: string
  ir?: string
  irReview?: string
}

type QuoteState = {
  step: number
  answers: Answers
  setAnswer: <K extends keyof Answers>(key: K, value: Answers[K]) => void
  next: () => void
  prev: () => void
  goto: (step: number) => void
  reset: () => void
}

export const TOTAL_STEPS = 26

const WEIGHTS: Record<string, number> = {
  training: 10,
  phishing: 6,
  inventory: 6,
  mfa: 14,
  vpn: 8,
  installFree: 6,
  backups: 12,
  backupTest: 6,
  patching: 8,
  legacy: 6,
  emailBlock: 6,
  emailAuth: 4,
  antivirus: 8,
  monitoring: 6,
  ir: 8,
  irReview: 4,
}

const GOOD_NO = new Set(['installFree', 'legacy'])

function valueScore(key: string, answer?: string): number {
  if (!answer) return 0
  if (answer === 'yes') return GOOD_NO.has(key) ? 0 : 1
  if (answer === 'no') return GOOD_NO.has(key) ? 1 : 0
  if (answer === 'unsure') return 0.5
  return 0
}

export function calcScore(a: Answers): number {
  let weighted = 0
  let total = 0
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    weighted += weight * valueScore(key, a[key as keyof Answers] as string | undefined)
    total += weight
  }
  return Math.round(40 + (weighted / total) * 60)
}

export function scoreGrade(score: number): { label: string; color: string } {
  if (score >= 85) return { label: 'Excellent', color: '#00C2FF' }
  if (score >= 70) return { label: 'Good', color: '#1976FF' }
  if (score >= 55) return { label: 'Fair', color: '#FFB020' }
  return { label: 'Poor', color: '#FF5470' }
}

const INDUSTRY_MULT: Record<string, number> = {
  Technology: 1.1,
  Healthcare: 1.4,
  Retail: 1.2,
  Manufacturing: 1.1,
  Education: 1.05,
  'Professional Services': 1.0,
  Construction: 0.9,
  Hospitality: 1.1,
  Logistics: 1.05,
  'Financial Services': 1.5,
  'Government Contractor': 1.35,
  Other: 1.0,
}

export function estimatePremium(answers: Answers, score: number): number {
  const base = 3000
  let multiplier = 1

  if (answers.revenue != null) {
    multiplier *= Math.min(2.5, Math.max(0.7, Math.sqrt(answers.revenue / 1_000_000)))
  }
  if (answers.employees != null) {
    multiplier *= Math.min(1.75, Math.max(0.8, answers.employees / 25))
  }
  if (answers.industry) {
    multiplier *= INDUSTRY_MULT[answers.industry] ?? 1
  }
  if (answers.payments === 'yes') multiplier *= 1.08
  if (answers.remote === 'yes') multiplier *= 1.05
  if (answers.data?.length) {
    multiplier *= 1 + Math.min(0.4, answers.data.length * 0.035)
  }

  const securityKeys = [
    'training',
    'phishing',
    'inventory',
    'mfa',
    'vpn',
    'installFree',
    'backups',
    'backupTest',
    'patching',
    'legacy',
    'emailBlock',
    'emailAuth',
    'antivirus',
    'monitoring',
    'ir',
    'irReview',
  ] as const
  const answeredSecurity = securityKeys.filter((key) => answers[key]).length
  if (answeredSecurity > 0) {
    const scoreDiscount = Math.max(0.7, 1 - (score - 55) / 130)
    multiplier *= scoreDiscount
  }

  return Math.round((base * multiplier) / 10) * 10
}

export const useQuote = create<QuoteState>((set) => ({
  step: 0,
  answers: {},
  setAnswer: (key, value) =>
    set((s) => ({ answers: { ...s.answers, [key]: value } })),
  next: () => set((s) => ({ step: Math.min(s.step + 1, TOTAL_STEPS - 1) })),
  prev: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),
  goto: (step) => set({ step: Math.max(0, Math.min(step, TOTAL_STEPS - 1)) }),
  reset: () => set({ step: 0, answers: {} }),
}))

export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Retail',
  'Manufacturing',
  'Education',
  'Professional Services',
  'Construction',
  'Hospitality',
  'Logistics',
  'Financial Services',
  'Government Contractor',
  'Other',
] as const

export const COUNTRIES = [
  'United Arab Emirates',
  'Saudi Arabia',
  'United Kingdom',
  'United States',
  'Germany',
  'France',
  'Singapore',
  'India',
  'Australia',
  'Other',
] as const

export const OPERATES = [
  'Single location',
  'Multiple offices',
  'Remote only',
  'Hybrid',
] as const

export const DATA_TYPES = [
  'Customer Names',
  'Email Addresses',
  'Phone Numbers',
  'Credit Card Data',
  'Payment Information',
  'Medical Records',
  'Employee Information',
  'Financial Records',
  'Bank Details',
  'Intellectual Property',
  'Trade Secrets',
  'Passwords',
  'Government IDs',
  'Tax Records',
  'Biometric Data',
  'None',
] as const

export const LIMITS = [250_000, 500_000, 1_000_000, 2_000_000, 5_000_000] as const

export function planAnnualPremium(
  basePremium: number,
  planMultiplier: number,
  limitFactor: number,
): number {
  return Math.round((basePremium * planMultiplier * limitFactor) / 10) * 10
}

export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    tag: null as string | null,
    multiplier: 1.0,
    deductible: 5_000,
    features: {
      'First Party Loss': true,
      'Cyber Liability': true,
      'Incident Response': true,
      'Data Recovery': true,
      'Business Interruption': false,
      Ransomware: true,
      'Cyber Crime': false,
      'Legal Costs': true,
      'PR Costs': false,
      'Regulatory Defence': false,
      'Privacy Liability': true,
      'Media Liability': false,
      'Network Liability': true,
      'Social Engineering': false,
      'Digital Assets': true,
    },
  },
  {
    id: 'value',
    name: 'Value',
    tag: 'Most Popular',
    multiplier: 1.5,
    deductible: 2_500,
    features: {
      'First Party Loss': true,
      'Cyber Liability': true,
      'Incident Response': true,
      'Data Recovery': true,
      'Business Interruption': true,
      Ransomware: true,
      'Cyber Crime': true,
      'Legal Costs': true,
      'PR Costs': true,
      'Regulatory Defence': true,
      'Privacy Liability': true,
      'Media Liability': false,
      'Network Liability': true,
      'Social Engineering': true,
      'Digital Assets': true,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    tag: 'Recommended',
    multiplier: 1.75,
    deductible: 1_000,
    features: {
      'First Party Loss': true,
      'Cyber Liability': true,
      'Incident Response': true,
      'Data Recovery': true,
      'Business Interruption': true,
      Ransomware: true,
      'Cyber Crime': true,
      'Legal Costs': true,
      'PR Costs': true,
      'Regulatory Defence': true,
      'Privacy Liability': true,
      'Media Liability': true,
      'Network Liability': true,
      'Social Engineering': true,
      'Digital Assets': true,
    },
  },
] as const

export const FEATURE_LIST = [
  'First Party Loss',
  'Cyber Liability',
  'Incident Response',
  'Data Recovery',
  'Business Interruption',
  'Ransomware',
  'Cyber Crime',
  'Legal Costs',
  'PR Costs',
  'Regulatory Defence',
  'Privacy Liability',
  'Media Liability',
  'Network Liability',
  'Social Engineering',
  'Digital Assets',
] as const

