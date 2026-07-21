import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import {
  ShieldCheck,
  ClipboardList,
  Activity,
  Lock,
  Database,
  DollarSign,
  Cpu,
  Gavel,
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
} from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { SEO } from '@/components/site/SEO'
import { Container } from '@/components/site/Container'
import { TrustBadges } from '@/components/site/TrustBadges'
import { CyberDotsBackground } from '@/components/site/CyberDotsBackground'
import { CountUp } from '@/components/site/CountUp'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const trustLogos = ['PCI DSS', 'ISO 27001', 'SOC 2', "Lloyd's", 'AXA XL']

const stats = [
  { label: 'Cyber attacks today', to: 2846000, prefix: '', suffix: '' },
  { label: 'Avg. ransomware payment', to: 1540000, prefix: '$', suffix: '' },
  { label: 'Avg. SME recovery cost', to: 245000, prefix: '$', suffix: '' },
  { label: 'Avg. downtime', to: 22, prefix: '', suffix: ' days' },
  { label: 'SMEs without insurance', to: 78, prefix: '', suffix: '%' },
]

const steps = [
  { num: '01', title: 'Describe your business', description: 'A few smart questions — no jargon, no forms.', icon: ClipboardList },
  { num: '02', title: 'Get your cyber risk score', description: 'Watch your score update live as you answer.', icon: Activity },
  { num: '03', title: 'Buy your policy instantly', description: 'Sign, pay and download — all in one flow.', icon: ShieldCheck },
]

const coverageItems = [
  { title: 'Ransomware', icon: Lock },
  { title: 'Data Breach', icon: Database },
  { title: 'Business Interruption', icon: Activity },
  { title: 'Cyber Extortion', icon: DollarSign },
  { title: 'Digital Asset Recovery', icon: Cpu },
  { title: 'Regulatory Fines', icon: Gavel },
  { title: 'Third Party Liability', icon: Users },
  { title: 'Incident Response', icon: LifeBuoy },
]

const industries = [
  { name: 'Technology', icon: Cpu },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Retail', icon: ShoppingBag },
  { name: 'Manufacturing', icon: Factory },
  { name: 'Professional Services', icon: Briefcase },
  { name: 'Education', icon: GraduationCap },
  { name: 'Hospitality', icon: UtensilsCrossed },
  { name: 'Construction', icon: HardHat },
  { name: 'Financial Services', icon: Banknote },
  { name: 'Logistics', icon: Truck },
]

const testimonials = [
  { quote: 'Faster than opening a bank account. Our team was covered in four minutes.', name: 'Amina R.', role: 'COO, Aster Retail', initial: 'A' },
  { quote: 'The live risk score actually taught us how to be more secure. Then it lowered our premium.', name: 'Daniel K.', role: 'Founder, Northstack', initial: 'D' },
  { quote: 'Feels like Stripe for insurance. Beautiful, honest, and genuinely fast.', name: 'Priya S.', role: 'CTO, LedgerLoop', initial: 'P' },
]

const coverageColors = [
  { bg: '#dbeafe', icon: '#1976FF' },
  { bg: '#d1fae5', icon: '#059669' },
  { bg: '#fef3c7', icon: '#d97706' },
  { bg: '#ede9fe', icon: '#7c3aed' },
  { bg: '#ffe4e6', icon: '#e11d48' },
  { bg: '#e0f2fe', icon: '#0284c7' },
  { bg: '#ecfccb', icon: '#65a30d' },
  { bg: '#ffedd5', icon: '#ea580c' },
]

const stepColors = ['#1976FF', '#00C2FF', '#c8f060']

const testimonialColors = ['#e8f2ff', '#f4fce8', '#fff7ed']

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
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <>
      <SEO
        title="Sentrix — Cyber Insurance in Under 5 Minutes"
        description="Protect your business from ransomware, data breaches and cyber extortion. Live risk scoring, instant quotes, real coverage — built for SMEs."
      />
      <Header variant="minimal" />

      <main>
        {/* ── HERO: centered ── */}
        <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-paper pt-20 lg:pt-0">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <CyberDotsBackground className="absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(253,251,246,0.32)_0%,rgba(253,251,246,0.65)_40%,rgba(253,251,246,0.88)_62%)]" />
            <div className="absolute -left-24 top-16 size-80 rounded-full bg-electric/8 blur-3xl" />
            <div className="absolute -right-20 top-32 size-64 rounded-full bg-gold/10 blur-3xl" />
          </div>
          <Container className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center py-16 text-center lg:py-24">
            <motion.div style={{ y: heroY }} className="flex w-full max-w-3xl flex-col items-center space-y-10">
              <div className="inline-flex items-center gap-2 border border-border px-4 py-2">
                <span className="size-1.5 rounded-full bg-accent" />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Live underwriting engine · Backed by Lloyd&apos;s syndicates
                </span>
              </div>

              <h1 className="display-xl">
                Protect your business from cyber&nbsp;attacks.
              </h1>

              <p className="max-w-xl body-lg">
                Get insured in under 5 minutes. Live risk scoring, instant quotes, real
                coverage — built the way modern businesses actually work.
              </p>

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

          <TrustBadges items={trustLogos} />
        </section>

        {/* ── STATS: typographic strip ── */}
        <section className="border-b border-border bg-navy-deep text-white">
          <Container className="section-pad !py-0">
            <div className="grid divide-y divide-white/10 md:grid-cols-5 md:divide-x md:divide-y-0">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`px-0 py-10 text-center md:px-6 md:py-14 first:md:pl-0 last:md:pr-0 ${
                    i === 2 ? 'bg-electric/10 md:bg-transparent' : ''
                  }`}
                >
                  <p className="font-display text-3xl font-light tabular-nums md:text-4xl">
                    <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/50">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="section-pad bg-[#e8f2ff]">
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
                  transition={{ delay: i * 0.1, duration: 0.5 }}
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
        </section>

        {/* ── COVERAGE: bento grid ── */}
        <section id="coverage" className="section-pad bg-paper">
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

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
              {coverageItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  style={{ backgroundColor: coverageColors[i].bg }}
                  className={`group rounded-2xl p-8 transition-transform hover:-translate-y-1 hover:shadow-medium ${i === 0 ? 'sm:col-span-2 sm:row-span-2 sm:p-12' : ''}`}
                >
                  <div
                    className="flex size-10 items-center justify-center rounded-xl bg-white/70 shadow-sm"
                    style={{ color: coverageColors[i].icon }}
                  >
                    <item.icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className={`mt-6 font-display font-normal ${i === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                    {item.title}
                  </h3>
                  {i === 0 && (
                    <p className="mt-4 max-w-xs text-sm text-foreground/70">
                      Full incident response, forensics, and negotiation included with every policy.
                    </p>
                  )}
                  <span className="mt-6 inline-block text-xs uppercase tracking-wider text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100">
                    Included →
                  </span>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="section-pad bg-navy-deep text-white">
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
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col justify-between rounded-2xl bg-white/10 p-6 text-left backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  <div
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: industryColors[i] }}
                  >
                    <ind.icon className="size-5 text-white" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="mt-8">
                    <p className="font-display text-lg text-white">{ind.name}</p>
                    <p className="mt-2 text-xs text-white/45 opacity-0 transition-opacity group-hover:opacity-100">
                      Explore →
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </Container>
        </section>

        {/* ── TESTIMONIALS: editorial quotes ── */}
        <section className="section-pad bg-paper">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="label-caps">Loved by modern teams</p>
              <h2 className="display-lg mt-4 mb-16">A better way to buy insurance</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={t.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ backgroundColor: testimonialColors[i] }}
                  className="flex flex-col justify-between rounded-2xl p-8 lg:p-10"
                >
                  <p className="font-display text-xl leading-snug md:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-10 flex items-center gap-3 border-t border-foreground/10 pt-6">
                    <div
                      className="flex size-9 items-center justify-center text-xs font-medium text-white"
                      style={{ backgroundColor: stepColors[i] }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <cite className="not-italic text-sm font-medium">{t.name}</cite>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </Container>
        </section>

        {/* ── FAQ: split layout ── */}
        <section id="faq" className="section-pad bg-navy-deep text-white">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">Frequently asked</p>
              <h2 className="display-lg mt-4 text-white">Answers, before you ask</h2>
            </div>
            <Accordion type="single" collapsible className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-white px-2 text-navy-deep shadow-soft">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.q} value={faq.q} className="border-border">
                    <AccordionTrigger className="py-6 font-display text-lg font-normal text-navy-deep hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-ink-muted">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
          </Container>
        </section>

        {/* ── CTA: full bleed dark ── */}
        <section className="bg-brand-gradient text-white">
          <Container className="section-pad">
            <div className="mx-auto max-w-2xl space-y-8 text-center">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-tight">
                Get covered in under 5&nbsp;minutes.
              </h2>
              <p className="text-lg leading-relaxed text-white/60">
                Live risk scoring, instant premium, downloadable policy — no calls, no forms, no waiting.
              </p>
              <Button asChild variant="lime" shape="pill" size="lg">
                <Link to="/quote">
                  Get my quote
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
