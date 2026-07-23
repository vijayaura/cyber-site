import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import {
  ShieldCheck,
  ClipboardList,
  Activity,
  Lock,
  Database,
  DollarSign,
  Cpu,
  Users,
  LifeBuoy,
  ArrowRight,
  HeartPulse,
  ShoppingBag,
  Factory,
  Briefcase,
  GraduationCap,
  UtensilsCrossed,
  HardHat,
  Banknote,
  Truck,
  ShieldAlert,
  Clock,
  Building2,
} from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { SEO } from '@/components/site/SEO'
import { Container } from '@/components/site/Container'
import { TrustBadges } from '@/components/site/TrustBadges'
import { ScrollElasticSection } from '@/components/site/ScrollElasticSection'
import { CyberDotsBackground } from '@/components/site/CyberDotsBackground'
import { CountUp } from '@/components/site/CountUp'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const certifications = ['ISO 27001', 'SOC 2', 'Munich Re']

const elasticSpring = { stiffness: 72, damping: 22, mass: 0.55 }
const revealSpring = { type: 'spring' as const, stiffness: 110, damping: 16, mass: 0.7 }

const stats = [
  { label: 'Cyber attacks today', to: 2846000, prefix: '', suffix: '', icon: ShieldAlert, accent: '#00C2FF', bg: 'rgba(0,194,255,0.12)' },
  { label: 'Avg. ransomware payment', to: 1540000, prefix: '$', suffix: '', icon: Lock, accent: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  { label: 'Avg. SME recovery cost', to: 245000, prefix: '$', suffix: '', icon: DollarSign, accent: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  { label: 'Avg. downtime', to: 22, prefix: '', suffix: ' days', icon: Clock, accent: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  { label: 'SMEs without insurance', to: 98, prefix: '', suffix: '%', icon: Building2, accent: '#c8f060', bg: 'rgba(200,240,96,0.14)', highlight: true },
]

const steps = [
  { num: '01', title: 'Describe your business', description: 'A few smart questions — no jargon, no forms.', icon: ClipboardList },
  { num: '02', title: 'Get your cyber risk score', description: 'Watch your score update live as you answer.', icon: Activity },
  { num: '03', title: 'Buy your policy instantly', description: 'Sign, pay and download — all in one flow.', icon: ShieldCheck },
]

const coverageItems = [
  {
    title: 'Ransomware',
    icon: Lock,
    accent: '#1976FF',
    description: 'System restoration, decryption support, and expert negotiation when attackers lock your files or networks.',
  },
  {
    title: 'Data Breach',
    icon: Database,
    accent: '#00C2FF',
    description: 'Notification costs, credit monitoring, and forensic investigation when customer or employee data is exposed.',
  },
  {
    title: 'Business Interruption',
    icon: Activity,
    accent: '#c9a227',
    description: 'Lost revenue and extra running costs while your operations are offline after a cyber incident.',
  },
  {
    title: 'Cyber Extortion',
    icon: DollarSign,
    accent: '#7c3aed',
    description: 'Ransom payments and specialist fees when criminals threaten to leak, encrypt, or destroy your data.',
  },
  {
    title: 'Digital Asset Recovery',
    icon: Cpu,
    accent: '#059669',
    description: 'Restore websites, databases, and cloud workloads damaged by malware, hacks, or corruption.',
  },
  {
    title: 'Third Party Liability',
    icon: Users,
    accent: '#e11d48',
    description: 'Legal defence and settlements if a client or partner sues following a breach involving your business.',
  },
  {
    title: 'Incident Response',
    icon: LifeBuoy,
    accent: '#061a40',
    description: '24/7 breach coaches, forensics, and PR support from the moment you report an incident.',
  },
]

type CoverageItem = (typeof coverageItems)[number]

function CoverageRow({ item, index }: { item: CoverageItem; index: number }) {
  const reversed = index % 2 === 1
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, x: reversed ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...revealSpring, delay: index * 0.06 }}
      className={[
        'group flex flex-col gap-8 overflow-hidden rounded-[1.75rem] border border-border/60 p-6 sm:flex-row sm:items-center sm:p-8 lg:gap-12 lg:p-10',
        reversed ? 'sm:flex-row-reverse' : '',
        index % 2 === 0 ? 'bg-white shadow-soft' : 'bg-cream/40',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={`min-w-0 flex-1 ${reversed ? 'sm:text-right' : ''}`}>
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: item.accent }}
        >
          Coverage
        </p>
        <h3 className="mt-2 font-display text-2xl font-normal text-foreground lg:text-3xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">{item.description}</p>
      </div>

      <div className={`flex shrink-0 items-center justify-center ${reversed ? 'sm:justify-start' : 'sm:justify-end'}`}>
        <motion.div
          className="relative flex size-28 items-center justify-center rounded-[1.5rem] ring-1 ring-black/5 lg:size-32"
          style={{ backgroundColor: `${item.accent}14`, color: item.accent }}
          whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: reversed ? -2 : 2 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <motion.div
            className="pointer-events-none absolute inset-3 rounded-[1.1rem] blur-xl"
            style={{ backgroundColor: item.accent }}
            aria-hidden
            animate={
              reduceMotion
                ? { opacity: 0.4 }
                : { scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }
            }
            transition={{
              duration: 2.6 + index * 0.15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.12,
            }}
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, 4, 0, -4, 0] }}
            transition={{
              duration: 3.2 + index * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.15,
            }}
          >
            <item.icon className="relative size-10 lg:size-11" strokeWidth={1.5} aria-hidden />
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  )
}

const industries = [
  {
    name: 'Technology',
    icon: Cpu,
    description: 'SaaS breaches, IP theft, and cloud misconfigurations expose code repos and customer data at scale.',
  },
  {
    name: 'Healthcare',
    icon: HeartPulse,
    description: 'Patient records and connected devices are prime targets for ransomware and privacy violations.',
  },
  {
    name: 'Retail',
    icon: ShoppingBag,
    description: 'POS skimming, e-commerce fraud, and payment card leaks disrupt sales and erode customer trust.',
  },
  {
    name: 'Manufacturing',
    icon: Factory,
    description: 'OT and supply chain systems face downtime when ransomware hits production lines and vendors.',
  },
  {
    name: 'Professional Services',
    icon: Briefcase,
    description: 'Client confidentiality breaches and email compromise put contracts, filings, and reputations at risk.',
  },
  {
    name: 'Education',
    icon: GraduationCap,
    description: 'Student data, research assets, and open campus networks invite phishing and data theft.',
  },
  {
    name: 'Hospitality',
    icon: UtensilsCrossed,
    description: 'Guest PII, booking systems, and POS terminals are exposed through turnover and shared devices.',
  },
  {
    name: 'Construction',
    icon: HardHat,
    description: 'Project bids, subcontractor portals, and field tools create gaps in access control and data handling.',
  },
  {
    name: 'Financial Services',
    icon: Banknote,
    description: 'Wire fraud, account takeover, and regulatory scrutiny demand robust fraud and breach response.',
  },
  {
    name: 'Logistics',
    icon: Truck,
    description: 'Fleet tracking, warehouse systems, and shipment data face disruption from ransomware and supplier attacks.',
  },
]

const stepColors = ['#1976FF', '#00C2FF', '#c8f060']

const industryColors = ['#6366f1', '#ec4899', '#f59e0b', '#64748b', '#0ea5e9', '#8b5cf6', '#14b8a6', '#ea580c', '#059669', '#0284c7']

const faqs = [
  { q: 'How fast can I get covered?', a: 'Most businesses complete the entire journey in under five minutes and receive their policy documents immediately.' },
  { q: "What if I don't know a technical answer?", a: "Every question is rewritten in plain English with helpful examples. You can also select 'Not sure' — we'll guide you." },
  { q: 'Can I lower my premium later?', a: 'Yes. Your Sentrix dashboard tracks security improvements. Each completed action can reduce your renewal premium.' },
  { q: 'Which countries do you cover?', a: 'We cover businesses across the UAE, GCC and select international markets. More geographies are being added.' },
  { q: 'Is my data secure?', a: 'All submissions are encrypted end-to-end. We are SOC 2 and ISO 27001 aligned, and never sell your data.' },
]

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const smoothHero = useSpring(scrollYProgress, elasticSpring)
  const heroY = useTransform(smoothHero, [0, 1], [0, 140])
  const heroScale = useTransform(smoothHero, [0, 1], [1, 0.9])
  const heroOpacity = useTransform(smoothHero, [0, 0.75, 1], [1, 1, 0.15])
  const dotsY = useTransform(smoothHero, [0, 1], [0, 80])

  return (
    <>
      <SEO
        title="Sentrix — Cyber Insurance in Under 5 Minutes"
        description="Protect your business from ransomware, data breaches and cyber extortion. Live risk scoring, instant quotes, real coverage — built for SMEs."
      />
      <Header variant="minimal" />

      <main>
        {/* ── HERO: centered ── */}
        <section ref={heroRef} className="relative h-svh overflow-hidden bg-paper">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <motion.div style={{ y: dotsY }} className="absolute inset-0">
              <CyberDotsBackground className="absolute inset-0" />
            </motion.div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(253,251,246,0.32)_0%,rgba(253,251,246,0.65)_40%,rgba(253,251,246,0.88)_62%)]" />
            <div className="absolute -left-24 top-16 size-80 rounded-full bg-electric/8 blur-3xl" />
            <div className="absolute -right-20 top-32 size-64 rounded-full bg-gold/10 blur-3xl" />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center pt-[72px] pb-8 lg:pt-20">
            <Container className="flex w-full justify-center text-center">
              <motion.div
                style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
                className="flex w-full max-w-3xl origin-center flex-col items-center justify-center gap-7 will-change-transform sm:gap-8"
              >
                <div className="flex flex-col items-center justify-center gap-2.5 border border-border bg-white/50 px-4 py-3 backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      Live underwriting engine · Backed by
                    </span>
                  </div>
                  <img
                    src="/logos/munich-re.png"
                    alt="Munich Re"
                    className="h-4 w-auto object-contain opacity-90"
                  />
                </div>

                <h1 className="display-xl">
                  <span className="block whitespace-nowrap">Protect your business</span>
                  <span className="block whitespace-nowrap">from cyber attacks.</span>
                </h1>

                <p className="max-w-xl body-lg">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="animate-flag-wave inline-flex shrink-0 align-middle">
                      <svg
                        viewBox="0 0 24 16"
                        className="h-3.5 w-[21px] rounded-[2px] shadow-sm ring-1 ring-black/10"
                        aria-hidden
                      >
                        <rect width="6" height="16" fill="#FF0000" />
                        <rect x="6" width="18" height="5.333" fill="#00732F" />
                        <rect x="6" y="5.333" width="18" height="5.334" fill="#FFFFFF" />
                        <rect x="6" y="10.667" width="18" height="5.333" fill="#000000" />
                      </svg>
                    </span>
                    UAE&apos;s first Cyber Insurance for SMEs.
                  </span>{' '}
                  Get insured in under 5 minutes. Live risk scoring, instant quotes, real
                  coverage — built the way modern businesses actually work.
                </p>

                <TrustBadges items={certifications} className="!mt-0" />

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button asChild variant="default" shape="pill" size="lg">
                    <Link to="/quote">
                      Get my quote
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <a
                    href="#how"
                    className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    How it works
                    <span className="block h-px w-8 bg-border transition-all group-hover:w-12 group-hover:bg-foreground" />
                  </a>
                </div>
              </motion.div>
            </Container>
          </div>
        </section>

        {/* ── STATS: visual cards ── */}
        <ScrollElasticSection className="border-b border-border bg-navy-deep text-white">
          <Container className="section-pad">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">The cyber risk landscape</p>
              <h2 className="display-lg mt-4 text-white">Why SMEs need cover now</h2>
              <p className="mt-4 text-base text-white/55">
                <span className="font-semibold text-accent">98% of SMEs</span> operate without cyber insurance — leaving recovery costs entirely on the business.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...revealSpring, delay: i * 0.06 }}
                  className={`group relative overflow-hidden rounded-2xl border p-6 transition-transform hover:-translate-y-1 ${
                    stat.highlight
                      ? 'border-accent/40 bg-gradient-to-br from-accent/20 via-white/10 to-electric/10 shadow-[0_0_40px_rgba(200,240,96,0.15)]'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                  }`}
                >
                  <div
                    className="mb-5 flex size-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: stat.bg, color: stat.accent }}
                  >
                    <stat.icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <p className="font-display text-3xl font-light tabular-nums lg:text-[2rem]">
                    <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/55">{stat.label}</p>
                  {stat.highlight && (
                    <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-accent/10 blur-2xl" aria-hidden />
                  )}
                </motion.div>
              ))}
            </div>
          </Container>
        </ScrollElasticSection>

        {/* ── HOW IT WORKS ── */}
        <ScrollElasticSection id="how" className="section-pad bg-[#e8f2ff]">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="label-caps text-electric">How it works</p>
              <h2 className="display-lg mt-4">Three steps to fully insured</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                No paperwork. No brokers. Just a fast, friendly journey with a real underwriting engine behind it.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ ...revealSpring, delay: i * 0.08 }}
                  className="flex flex-col rounded-2xl bg-white p-6 text-center shadow-medium sm:p-8"
                >
                  <div
                    className="mx-auto flex size-12 items-center justify-center rounded-xl text-white font-display text-sm font-semibold"
                    style={{ backgroundColor: stepColors[i] }}
                  >
                    {step.num}
                  </div>
                  <step.icon className="mx-auto mt-5 size-5" style={{ color: stepColors[i] }} strokeWidth={1.75} aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-normal">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </ScrollElasticSection>

        {/* ── COVERAGE: alternating rows ── */}
        <ScrollElasticSection id="coverage" className="section-pad bg-paper">
          <Container>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="label-caps">Coverage highlights</p>
              <h2 className="display-lg mt-4">Insurance that actually pays out.</h2>
              <p className="mt-4 body-lg !text-base">
                Every policy includes 24/7 incident response, forensics, legal support and ransomware negotiation. No small print games.
              </p>
              <Button asChild variant="outline" shape="pill" className="mt-8">
                <Link to="/plans">
                  Explore plans
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="mx-auto flex max-w-4xl flex-col gap-4 lg:gap-5">
              {coverageItems.map((item, i) => (
                <CoverageRow key={item.title} item={item} index={i} />
              ))}
            </div>
          </Container>
        </ScrollElasticSection>

        {/* ── INDUSTRIES ── */}
        <ScrollElasticSection className="section-pad bg-navy-deep text-white">
          <Container className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">Built for your industry</p>
            <h2 className="display-lg mx-auto mt-4 max-w-lg text-white">Tailored for the way you operate</h2>
            <p className="mx-auto mt-4 max-w-lg text-white/55">
              Explore the typical risks, claims examples and average premiums for your sector.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {industries.map((ind, i) => (
                <motion.button
                  key={ind.name}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...revealSpring, delay: i * 0.04 }}
                  className="group flex min-h-[168px] flex-col justify-between rounded-2xl bg-white/10 p-5 text-left backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/15 sm:min-h-[180px] sm:p-6"
                >
                  <div
                    className="flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: industryColors[i] }}
                  >
                    <ind.icon className="size-5 text-white" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="mt-6">
                    <p className="font-display text-lg leading-snug text-white">{ind.name}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/70 transition-all duration-300 max-sm:line-clamp-none sm:mt-0 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:group-hover:mt-2 sm:group-hover:max-h-none sm:group-hover:overflow-visible sm:group-hover:opacity-100">
                      {ind.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </Container>
        </ScrollElasticSection>

        {/* ── FAQ: split layout ── */}
        <ScrollElasticSection id="faq" className="section-pad bg-navy-deep text-white">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">Frequently asked</p>
              <h2 className="display-lg mt-4 text-white">Answers, before you ask</h2>
            </div>
            <Accordion
              type="single"
              collapsible
              className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border bg-white px-6 py-3 text-navy-deep shadow-soft sm:mt-16 sm:px-8 sm:py-4 lg:px-10 lg:py-5"
            >
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q} className="border-border last:border-b-0">
                  <AccordionTrigger className="py-7 font-display text-lg font-normal text-navy-deep hover:no-underline sm:py-8">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pr-2 text-ink-muted sm:pr-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </ScrollElasticSection>
      </main>

      <Footer />
    </>
  )
}
