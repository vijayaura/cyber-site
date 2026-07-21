import { useCallback, useEffect, useMemo, useRef } from 'react'
import { motion } from 'motion/react'
import {
  ShieldCheck,
  Building2,
  DollarSign,
  Users,
  Globe,
  MapPin,
  Database,
  CreditCard,
  Home,
  GraduationCap,
  Bug,
  ClipboardCheck,
  KeyRound,
  Wifi,
  Download,
  Cloud,
  RefreshCw,
  Server,
  AlertTriangle,
  Mail,
  Lock,
  Radar,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SEO } from '@/components/site/SEO'
import { AnswerGrid, AnswerGridFooter } from '@/components/quote/StepShell'
import { QuoteWizard } from '@/components/quote/QuoteWizard'
import { QuoteThreadBlock } from '@/components/quote/QuoteThreadBlock'
import { QuotePlansPanel } from '@/components/quote/QuotePlansPanel'
import { ChoiceButton } from '@/components/quote/ChoiceButton'
import { OptionChip, REVENUE_CHIPS, EMPLOYEE_CHIPS } from '@/components/quote/OptionChip'
import { YesNoUnsure } from '@/components/quote/YesNoUnsure'
import { ContinueButton } from '@/components/quote/ContinueButton'
import { TipBlock } from '@/components/quote/TipBlock'
import {
  useQuote,
  calcScore,
  estimatePremium,
  INDUSTRIES,
  COUNTRIES,
  OPERATES,
  DATA_TYPES,
} from '@/lib/quote-store'
import { isStepAnswered, getAnswerSummary } from '@/lib/quote-steps'
import { ADVANCE_DELAY } from '@/lib/utils'
import {
  INDUSTRY_ICONS,
  COUNTRY_ICONS,
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
  { id: 'country', icon: Globe, title: 'Where is your business based?' },
  { id: 'operates', icon: MapPin, title: 'How does your team work?' },
  { id: 'data', icon: Database, title: 'What kind of sensitive data do you store?' },
  { id: 'payments', icon: CreditCard, title: 'Do you process online payments?' },
  { id: 'remote', icon: Home, title: 'Do employees work remotely?' },
  { id: 'training', icon: GraduationCap, title: 'Do all employees receive cybersecurity training every year?' },
  {
    id: 'phishing',
    icon: Bug,
    title: 'Do you regularly test employees with fake phishing emails?',
    subtitle: 'Simulated phishing helps train instincts.',
    tip: 'This is one of the easiest ways to reduce cyber attacks.',
  },
  { id: 'inventory', icon: ClipboardCheck, title: 'Do you keep an updated list of all company laptops, computers and software?' },
  {
    id: 'mfa',
    icon: KeyRound,
    title: 'When employees log in, do they verify with a code from their phone or authenticator app?',
    subtitle: 'Also known as two-step verification or MFA.',
    tip: 'Multi-factor auth blocks over 99% of automated attacks.',
  },
  { id: 'vpn', icon: Wifi, title: 'Can employees connect remotely only through your company VPN?' },
  { id: 'installFree', icon: Download, title: 'Can employees install software on their computers without approval?' },
  { id: 'backups', icon: Cloud, title: 'Is your business data backed up regularly?' },
  {
    id: 'backupTest',
    icon: RefreshCw,
    title: 'Have you ever tested restoring those backups?',
    tip: "Backups you haven't tested are just wishes. Restore-test at least once a year.",
  },
  { id: 'patching', icon: Server, title: 'Do you install security updates within a month?' },
  { id: 'legacy', icon: AlertTriangle, title: 'Do you still use computers or software that are no longer supported?' },
  { id: 'emailBlock', icon: Mail, title: 'Are suspicious emails automatically blocked?' },
  {
    id: 'emailAuth',
    icon: Lock,
    title: 'Do you use email verification (SPF, DKIM and DMARC)?',
    subtitle: 'These prevent attackers from impersonating your domain.',
  },
  { id: 'antivirus', icon: ShieldCheck, title: 'Do all computers have antivirus or endpoint protection installed?' },
  { id: 'monitoring', icon: Radar, title: 'Are threats monitored centrally?' },
  { id: 'ir', icon: ShieldCheck, title: 'If your business is hacked, do you already have a documented response plan?' },
  { id: 'irReview', icon: RefreshCw, title: 'Is that plan reviewed every year?' },
]

const LOADING_CHECKS = [
  'Analyzing business profile…',
  'Benchmarking industry risk…',
  'Calibrating coverage…',
  'Finalizing your quote…',
]

const LOADING_STEP_INDEX = QUESTION_STEPS.length
const PLANS_STEP_INDEX = QUESTION_STEPS.length + 1

export default function QuotePage() {
  const { step, answers, setAnswer, next, prev, goto } = useQuote()
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const score = useMemo(() => calcScore(answers), [answers])
  const premium = useMemo(() => estimatePremium(answers, score), [answers, score])
  const questionSteps = QUESTION_STEPS.length
  const isLoading = step === LOADING_STEP_INDEX
  const isPlans = step === PLANS_STEP_INDEX
  const activeStepDef = isLoading || isPlans ? QUESTION_STEPS[questionSteps - 1] : QUESTION_STEPS[step]
  const progressPct =
    isPlans || isLoading
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

      case 'country':
        return (
          <AnswerGrid>
            {COUNTRIES.map((c) => {
              const { icon, bg } = getOptionIcon(COUNTRY_ICONS, c)
              return (
                <ChoiceButton
                  key={c}
                  label={c}
                  icon={icon}
                  iconBg={bg}
                  selected={answers.country === c}
                  onClick={() => {
                    setAnswer('country', c)
                    maybeAdvance()
                  }}
                />
              )
            })}
          </AnswerGrid>
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
        return (
          <YesNoUnsure
            includeUnsure={false}
            value={answers.payments}
            onChange={(v) => {
              setAnswer('payments', v)
              maybeAdvance()
            }}
          />
        )

      case 'remote':
        return (
          <YesNoUnsure
            includeUnsure={false}
            value={answers.remote}
            onChange={(v) => {
              setAnswer('remote', v)
              maybeAdvance()
            }}
          />
        )

      case 'training':
        return (
          <YesNoUnsure
            value={answers.training}
            onChange={(v) => {
              setAnswer('training', v)
              maybeAdvance()
            }}
          />
        )

      case 'phishing':
        return (
          <>
            <YesNoUnsure
              value={answers.phishing}
              onChange={(v) => {
                setAnswer('phishing', v)
                maybeAdvance()
              }}
            />
            {answers.phishing === 'no' && stepDef.tip && <TipBlock tip={stepDef.tip} />}
          </>
        )

      case 'inventory':
        return (
          <YesNoUnsure
            value={answers.inventory}
            onChange={(v) => {
              setAnswer('inventory', v)
              maybeAdvance()
            }}
          />
        )

      case 'mfa':
        return (
          <>
            <YesNoUnsure
              value={answers.mfa}
              onChange={(v) => {
                setAnswer('mfa', v)
                maybeAdvance()
              }}
            />
            {answers.mfa === 'no' && stepDef.tip && <TipBlock tip={stepDef.tip} />}
          </>
        )

      case 'vpn':
        return (
          <YesNoUnsure
            value={answers.vpn}
            onChange={(v) => {
              setAnswer('vpn', v)
              maybeAdvance()
            }}
          />
        )

      case 'installFree':
        return (
          <YesNoUnsure
            includeUnsure={false}
            value={answers.installFree}
            onChange={(v) => {
              setAnswer('installFree', v)
              maybeAdvance()
            }}
          />
        )

      case 'backups':
        return (
          <YesNoUnsure
            value={answers.backups}
            onChange={(v) => {
              setAnswer('backups', v)
              maybeAdvance()
            }}
          />
        )

      case 'backupTest':
        return (
          <>
            <YesNoUnsure
              includeUnsure={false}
              value={answers.backupTest}
              onChange={(v) => {
                setAnswer('backupTest', v)
                maybeAdvance()
              }}
            />
            {answers.backupTest === 'no' && stepDef.tip && <TipBlock tip={stepDef.tip} />}
          </>
        )

      case 'patching':
        return (
          <YesNoUnsure
            value={answers.patching}
            onChange={(v) => {
              setAnswer('patching', v)
              maybeAdvance()
            }}
          />
        )

      case 'legacy':
        return (
          <YesNoUnsure
            includeUnsure={false}
            value={answers.legacy}
            onChange={(v) => {
              setAnswer('legacy', v)
              maybeAdvance()
            }}
          />
        )

      case 'emailBlock':
        return (
          <YesNoUnsure
            value={answers.emailBlock}
            onChange={(v) => {
              setAnswer('emailBlock', v)
              maybeAdvance()
            }}
          />
        )

      case 'emailAuth':
        return (
          <YesNoUnsure
            value={answers.emailAuth}
            onChange={(v) => {
              setAnswer('emailAuth', v)
              maybeAdvance()
            }}
          />
        )

      case 'antivirus':
        return (
          <YesNoUnsure
            includeUnsure={false}
            value={answers.antivirus}
            onChange={(v) => {
              setAnswer('antivirus', v)
              maybeAdvance()
            }}
          />
        )

      case 'monitoring':
        return (
          <YesNoUnsure
            value={answers.monitoring}
            onChange={(v) => {
              setAnswer('monitoring', v)
              maybeAdvance()
            }}
          />
        )

      case 'ir':
        return (
          <YesNoUnsure
            includeUnsure={false}
            value={answers.ir}
            onChange={(v) => {
              setAnswer('ir', v)
              maybeAdvance()
            }}
          />
        )

      case 'irReview':
        return (
          <YesNoUnsure
            includeUnsure={false}
            value={answers.irReview}
            onChange={(v) => {
              setAnswer('irReview', v)
              maybeAdvance()
            }}
          />
        )

      default:
        return null
    }
  }

  const displayStep = isLoading
    ? { id: 'loading', icon: Radar, title: 'Generating your quote…', subtitle: 'Running our underwriting engine over your answers.' }
    : activeStepDef

  if (isPlans) {
    return (
      <>
        <SEO
          title="Choose your plan — Sentrix"
          description="Compare Basic, Value, and Premium cyber insurance plans."
          noindex
        />
        <QuotePlansPanel score={score} basePremium={premium} onBack={() => goto(LOADING_STEP_INDEX)} />
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
        premium={premium}
        isLoading={isLoading}
        canGoBack={step > 0 && !isLoading}
        onBack={prev}
        stepId={displayStep.id}
        stepTitle={displayStep.title}
        stepSubtitle={displayStep.subtitle}
        stepTip={'tip' in displayStep ? displayStep.tip : undefined}
      >
        {(isLoading ? QUESTION_STEPS : QUESTION_STEPS.slice(0, step + 1)).map((stepDef, i) => (
          <QuoteThreadBlock
            key={stepDef.id}
            icon={stepDef.icon}
            title={stepDef.title}
            subtitle={stepDef.subtitle}
            stepNumber={i + 1}
            active={!isLoading && i === step}
            past={isLoading || i < step}
            summary={getAnswerSummary(stepDef.id, answers)}
            onEdit={() => goto(i)}
          >
            {!isLoading && i === step ? renderAnswers(stepDef) : null}
          </QuoteThreadBlock>
        ))}

        {isLoading && (
          <motion.section
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
