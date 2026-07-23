import { useCallback, useEffect, useMemo, useRef } from 'react'
import { motion } from 'motion/react'
import {
  ShieldCheck,
  Building2,
  DollarSign,
  Users,
  MapPin,
  Database,
  CreditCard,
  GraduationCap,
  KeyRound,
  ClipboardCheck,
  Cloud,
  Mail,
  Radar,
  AlertTriangle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SEO } from '@/components/site/SEO'
import { AnswerGrid, AnswerGridFooter } from '@/components/quote/StepShell'
import { QuoteWizard } from '@/components/quote/QuoteWizard'
import { QuoteThreadBlock } from '@/components/quote/QuoteThreadBlock'
import { QuotePlansPanel } from '@/components/quote/QuotePlansPanel'
import { QuotePaymentPanel } from '@/components/quote/QuotePaymentPanel'
import { QuoteDocCollectionPanel } from '@/components/quote/QuoteDocCollectionPanel'
import { QuotePolicyPanel } from '@/components/quote/QuotePolicyPanel'
import { ChoiceButton } from '@/components/quote/ChoiceButton'
import { OptionChip, REVENUE_CHIPS, EMPLOYEE_CHIPS } from '@/components/quote/OptionChip'
import { YesNoUnsure } from '@/components/quote/YesNoUnsure'
import { ContinueButton } from '@/components/quote/ContinueButton'
import { TipBlock } from '@/components/quote/TipBlock'
import {
  useQuote,
  useQuoteScore,
  estimatePremium,
  getPlanPremium,
  INDUSTRIES,
  OPERATES,
  DATA_TYPES,
  STEP_LOADING,
  STEP_PLANS,
  STEP_PAYMENT,
  STEP_DOCS,
  STEP_POLICY,
  type PlanId,
} from '@/lib/quote-store'
import { isStepAnswered, getAnswerSummary } from '@/lib/quote-steps'
import { ADVANCE_DELAY } from '@/lib/utils'
import {
  INDUSTRY_ICONS,
  OPERATES_ICONS,
  DATA_TYPE_ICONS,
  getOptionIcon,
} from '@/lib/quote-option-icons'

type StepDef = {
  id: string
  icon: LucideIcon
  title: string
  subtitle?: string
  tip?: string
}

const QUESTION_STEPS: StepDef[] = [
  {
    id: 'industry',
    icon: Building2,
    title: 'What best describes your business?',
    subtitle:
      "Let's build your cyber shield — a friendly 2-minute check. Pick the closest industry match and watch your score update live as you answer.",
  },
  { id: 'revenue', icon: DollarSign, title: "What's your annual revenue?" },
  { id: 'employees', icon: Users, title: 'How many people work at your company?' },
  { id: 'cloudServices', icon: Cloud, title: 'Do you use cloud services for email, files, or business apps?', subtitle: 'e.g. Microsoft 365, Google Workspace, AWS' },
  { id: 'operates', icon: MapPin, title: 'How does your team work?' },
  { id: 'data', icon: Database, title: 'What kind of sensitive data do you store?' },
  { id: 'payments', icon: CreditCard, title: 'Do you process online payments?' },
  {
    id: 'securityAwareness',
    icon: GraduationCap,
    title: 'Do employees receive annual cybersecurity training and phishing simulations?',
    subtitle: 'Training and simulated phishing are strong indicators of security culture.',
    tip: 'Combined training and phishing tests significantly reduce social engineering risk.',
  },
  {
    id: 'secureAccess',
    icon: KeyRound,
    title: 'Do employees use MFA and connect remotely through a company VPN?',
    subtitle: 'Multi-factor authentication plus VPN for remote access.',
    tip: 'MFA blocks over 99% of automated account attacks.',
  },
  {
    id: 'assetPatch',
    icon: ClipboardCheck,
    title: 'Do you maintain an asset inventory and install security updates within a month?',
    subtitle: 'Knowing your assets and patching promptly closes common gaps.',
  },
  {
    id: 'endpointControls',
    icon: AlertTriangle,
    title: 'Can employees install software without approval, or do you use unsupported legacy systems?',
    subtitle: 'Uncontrolled installs and end-of-life software increase breach risk.',
  },
  {
    id: 'backupRecovery',
    icon: Cloud,
    title: 'Is your data backed up regularly and have you tested restoring it?',
    tip: "Backups you haven't tested are just wishes. Restore-test at least once a year.",
  },
  {
    id: 'emailSecurity',
    icon: Mail,
    title: 'Are suspicious emails blocked and is your domain protected with SPF, DKIM and DMARC?',
    subtitle: 'Filtering plus domain authentication prevents impersonation.',
  },
  {
    id: 'endpointProtection',
    icon: ShieldCheck,
    title: 'Do all devices have endpoint protection with centralised threat monitoring?',
  },
  {
    id: 'incidentResponse',
    icon: Radar,
    title: 'Do you have a documented incident response plan reviewed every year?',
  },
]

const LOADING_CHECKS = [
  'Analyzing business profile…',
  'Benchmarking industry risk…',
  'Calibrating coverage…',
  'Finalizing your quote…',
]

export default function QuotePage() {
  const {
    step,
    answers,
    selectedPlanId,
    selectedDeductible,
    planDeductibles,
    policyLimitIndex,
    tradeLicenseName,
    acceptedImprovements,
    setAnswer,
    setSelectedPlan,
    setPlanDeductible,
    setPolicyLimitIndex,
    setTradeLicense,
    setPaymentComplete,
    toggleAcceptedImprovement,
    next,
    prev,
    goto,
  } = useQuote()
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const score = useQuoteScore()
  const premium = useMemo(() => estimatePremium(answers, score), [answers, score])
  const questionSteps = QUESTION_STEPS.length
  const isLoading = step === STEP_LOADING
  const isPlans = step === STEP_PLANS
  const isPayment = step === STEP_PAYMENT
  const isDocs = step === STEP_DOCS
  const isPolicy = step === STEP_POLICY

  const selectedPremium = useMemo(() => {
    if (!selectedPlanId) return premium
    return getPlanPremium(
      premium,
      selectedPlanId,
      policyLimitIndex,
      selectedDeductible ?? planDeductibles[selectedPlanId],
    )
  }, [premium, selectedPlanId, policyLimitIndex, selectedDeductible, planDeductibles])

  const progressPct =
    isPlans || isLoading || isPayment || isDocs || isPolicy
      ? 100
      : Math.round(((step + (isStepAnswered(QUESTION_STEPS[step]?.id ?? '', answers) ? 1 : 0)) / questionSteps) * 100)

  const maybeAdvance = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    advanceTimer.current = setTimeout(next, ADVANCE_DELAY)
  }, [next])

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) return
    const timer = setTimeout(next, 2800)
    return () => clearTimeout(timer)
  }, [isLoading, next])

  const handleSelectPlan = (planId: PlanId) => {
    setSelectedPlan(planId)
    next()
  }

  const renderYesNoStep = (
    field: keyof typeof answers,
    opts?: { includeUnsure?: boolean; showTipOn?: string },
  ) => (
    <>
      <YesNoUnsure
        includeUnsure={opts?.includeUnsure ?? true}
        value={answers[field] as string | undefined}
        onChange={(v) => {
          setAnswer(field, v)
          maybeAdvance()
        }}
      />
      {opts?.showTipOn && answers[field] === opts.showTipOn && (
        <TipBlock tip={QUESTION_STEPS.find((s) => s.id === field)?.tip ?? ''} />
      )}
    </>
  )

  const renderAnswers = (stepDef: StepDef) => {
    switch (stepDef.id) {
      case 'industry':
        return (
          <AnswerGrid>
            {INDUSTRIES.map((ind) => {
              const { icon, bg } = getOptionIcon(INDUSTRY_ICONS, ind)
              return (
                <ChoiceButton
                  key={ind}
                  label={ind}
                  icon={icon}
                  iconBg={bg}
                  selected={answers.industry === ind}
                  onClick={() => {
                    setAnswer('industry', ind)
                    maybeAdvance()
                  }}
                />
              )
            })}
          </AnswerGrid>
        )

      case 'revenue':
        return (
          <AnswerGrid cols={3}>
            {REVENUE_CHIPS.map(({ value, label, bg }) => (
              <OptionChip
                key={value}
                label={label}
                icon={DollarSign}
                iconBg={bg}
                selected={answers.revenue === value}
                onClick={() => {
                  setAnswer('revenue', value)
                  maybeAdvance()
                }}
              />
            ))}
          </AnswerGrid>
        )

      case 'employees':
        return (
          <AnswerGrid cols={3}>
            {EMPLOYEE_CHIPS.map(({ value, label, bg }) => (
              <OptionChip
                key={value}
                label={label}
                icon={Users}
                iconBg={bg}
                selected={answers.employees === value}
                onClick={() => {
                  setAnswer('employees', value)
                  maybeAdvance()
                }}
              />
            ))}
          </AnswerGrid>
        )

      case 'cloudServices':
        return (
          <YesNoUnsure
            value={answers.cloudServices}
            onChange={(v) => {
              setAnswer('cloudServices', v)
              maybeAdvance()
            }}
          />
        )

      case 'operates':
        return (
          <AnswerGrid cols={1}>
            {OPERATES.map((o) => {
              const { icon, bg } = getOptionIcon(OPERATES_ICONS, o)
              return (
                <ChoiceButton
                  key={o}
                  label={o}
                  icon={icon}
                  iconBg={bg}
                  selected={answers.operates === o}
                  onClick={() => {
                    setAnswer('operates', o)
                    maybeAdvance()
                  }}
                />
              )
            })}
          </AnswerGrid>
        )

      case 'data': {
        const selected = answers.data ?? []
        const toggle = (item: string) => {
          const nextData = selected.includes(item)
            ? selected.filter((d) => d !== item)
            : [...selected, item]
          setAnswer('data', nextData)
        }
        return (
          <AnswerGrid hint="Pick all that apply">
            {DATA_TYPES.map((d) => {
              const { icon, bg } = getOptionIcon(DATA_TYPE_ICONS, d)
              return (
                <ChoiceButton
                  key={d}
                  label={d}
                  icon={icon}
                  iconBg={bg}
                  selected={selected.includes(d)}
                  onClick={() => toggle(d)}
                />
              )
            })}
            <AnswerGridFooter>
              <ContinueButton onClick={next} disabled={selected.length === 0} />
            </AnswerGridFooter>
          </AnswerGrid>
        )
      }

      case 'payments':
        return renderYesNoStep('payments', { includeUnsure: false })

      case 'securityAwareness':
        return renderYesNoStep('securityAwareness')

      case 'secureAccess':
        return renderYesNoStep('secureAccess', { showTipOn: 'no' })

      case 'assetPatch':
        return renderYesNoStep('assetPatch')

      case 'endpointControls':
        return renderYesNoStep('endpointControls', { includeUnsure: false })

      case 'backupRecovery':
        return renderYesNoStep('backupRecovery', { showTipOn: 'no', includeUnsure: false })

      case 'emailSecurity':
        return renderYesNoStep('emailSecurity')

      case 'endpointProtection':
        return renderYesNoStep('endpointProtection', { includeUnsure: false })

      case 'incidentResponse':
        return renderYesNoStep('incidentResponse', { includeUnsure: false })

      default:
        return null
    }
  }

  if (isPolicy && selectedPlanId) {
    return (
      <>
        <SEO title="Policy issued — Sentrix" description="Your cyber insurance policy is ready." noindex />
        <QuotePolicyPanel
          answers={answers}
          score={score}
          planId={selectedPlanId}
          limitIndex={policyLimitIndex}
          deductible={selectedDeductible ?? planDeductibles[selectedPlanId]}
          annualPremium={selectedPremium}
          tradeLicenseName={tradeLicenseName}
          onBack={() => goto(STEP_DOCS)}
        />
      </>
    )
  }

  if (isDocs) {
    return (
      <>
        <SEO title="Upload documents — Sentrix" description="Upload your trade license to complete your policy." noindex />
        <QuoteDocCollectionPanel
          fileName={tradeLicenseName}
          onFileSelect={setTradeLicense}
          onBack={() => goto(STEP_PAYMENT)}
          onContinue={next}
        />
      </>
    )
  }

  if (isPayment && selectedPlanId) {
    return (
      <>
        <SEO title="Payment — Sentrix" description="Complete your cyber insurance purchase." noindex />
        <QuotePaymentPanel
          planId={selectedPlanId}
          annualPremium={selectedPremium}
          onBack={() => goto(STEP_PLANS)}
          onComplete={() => {
            setPaymentComplete(true)
            next()
          }}
        />
      </>
    )
  }

  if (isPlans) {
    return (
      <>
        <SEO
          title="Choose your plan — Sentrix"
          description="Compare Basic, Value, and Premium cyber insurance plans."
          noindex
        />
        <QuotePlansPanel
          score={score}
          basePremium={premium}
          answers={answers}
          limitIndex={policyLimitIndex}
          planDeductibles={planDeductibles}
          acceptedImprovements={acceptedImprovements}
          onLimitChange={setPolicyLimitIndex}
          onDeductibleChange={setPlanDeductible}
          onToggleImprovement={toggleAcceptedImprovement}
          onSelectPlan={handleSelectPlan}
          onBack={() => goto(STEP_LOADING)}
        />
      </>
    )
  }

  return (
    <>
      <SEO
        title="Get your quote — Sentrix"
        description="A friendly cyber health check that ends with an instant quote."
        noindex
      />

      <QuoteWizard
        activeStep={Math.min(step, questionSteps - 1)}
        questionSteps={questionSteps}
        progressPct={progressPct}
        score={score}
        isLoading={isLoading}
        canGoBack={step > 0 && !isLoading}
        onBack={prev}
      >
        {(isLoading ? QUESTION_STEPS : QUESTION_STEPS.slice(0, step + 1)).map((stepDef, i) => (
          <QuoteThreadBlock
            key={stepDef.id}
            icon={stepDef.icon}
            title={stepDef.title}
            subtitle={stepDef.subtitle}
            stepId={stepDef.id}
            stepTip={'tip' in stepDef ? stepDef.tip : undefined}
            stepNumber={i + 1}
            active={!isLoading && i === step}
            past={isLoading || i < step}
            answered={isStepAnswered(stepDef.id, answers)}
            summary={getAnswerSummary(stepDef.id, answers)}
            onEdit={() => goto(i)}
          >
            {!isLoading && i === step ? renderAnswers(stepDef) : null}
          </QuoteThreadBlock>
        ))}

        {isLoading && (
          <motion.section
            data-quote-active
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-navy-deep/10 py-8"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">Processing</p>
            <h2 className="mt-1 text-[19px] font-semibold text-navy-deep">Generating your quote…</h2>
            <ul className="mt-6 space-y-4" aria-live="polite">
              {LOADING_CHECKS.map((check, i) => (
                <motion.li
                  key={check}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.35 }}
                  className="flex items-center gap-4 text-sm text-ink-muted"
                >
                  <span className="font-display text-xs tabular-nums text-ink-muted/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {check}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        )}
      </QuoteWizard>
    </>
  )
}
