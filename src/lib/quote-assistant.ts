export type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: Date
}

type StepContext = {
  id: string
  title: string
  subtitle?: string
  tip?: string
}

const STEP_HINTS: Record<string, { intro: string; suggestions: string[] }> = {
  industry: {
    intro: "Welcome — let's build your cyber shield. This is a friendly 2-minute check and your score updates live. Pick the industry closest to your business to get started.",
    suggestions: ['How long does this take?', 'What affects my premium?', 'Why does industry matter?'],
  },
  revenue: {
    intro: 'Revenue helps size your coverage limit. Slide to your approximate annual figure — exact numbers aren\'t required.',
    suggestions: ['How is revenue used?', 'What if revenue varies?', 'Does revenue affect my score?'],
  },
  employees: {
    intro: 'Headcount reflects exposure — more people usually means more devices, accounts, and phishing targets.',
    suggestions: ['Do contractors count?', 'Remote vs office staff?', 'How does this affect premium?'],
  },
  country: {
    intro: 'Your operating country determines regulatory requirements and which policy terms apply.',
    suggestions: ['Which countries are covered?', 'UAE vs international?', 'GCC coverage details'],
  },
  operates: {
    intro: 'Work setup affects risk — remote and hybrid teams often need extra controls like MFA and VPN.',
    suggestions: ['Remote-only risks?', 'Hybrid best practices', 'Does this change my score?'],
  },
  data: {
    intro: 'Select every type of sensitive data you store. More categories can mean higher exposure, but honest answers get you accurate coverage.',
    suggestions: ['What counts as sensitive?', 'Can I select multiple?', 'What if we store none?'],
  },
  payments: {
    intro: 'Processing payments online increases fraud and PCI-related exposure. Be honest — it helps us right-size your policy.',
    suggestions: ['PCI compliance help?', 'Third-party processors?', 'Payment fraud coverage'],
  },
  remote: {
    intro: 'Remote work expands your attack surface. Insurers look for VPN, MFA, and endpoint protection.',
    suggestions: ['Remote security tips', 'BYOD considerations', 'Score impact of remote work'],
  },
  training: {
    intro: 'Annual security training is one of the strongest signals — it shows your team can spot phishing and social engineering.',
    suggestions: ['What training counts?', 'Free training options', 'How much does this save?'],
  },
  phishing: {
    intro: 'Simulated phishing tests train reflexes. Teams that run them regularly score significantly higher.',
    suggestions: ['Recommended tools?', 'How often to test?', 'What if we failed tests?'],
  },
  inventory: {
    intro: 'An asset inventory helps you know what to protect and speeds up incident response after a breach.',
    suggestions: ['What to include?', 'Spreadsheet vs tool?', 'Quick inventory template'],
  },
  mfa: {
    intro: "Multi-factor authentication blocks over 99% of automated account attacks. It's the single highest-impact control.",
    suggestions: ['What is MFA?', 'Authenticator vs SMS?', 'How to roll out MFA'],
  },
  vpn: {
    intro: 'A VPN ensures remote traffic goes through your security controls instead of the open internet.',
    suggestions: ['VPN vs zero trust?', 'Cloud-only businesses', 'Score without VPN'],
  },
  installFree: {
    intro: 'When anyone can install software freely, malware risk jumps. "No" here is the safer answer.',
    suggestions: ['App allowlisting?', 'Mac vs Windows', 'Developer exceptions'],
  },
  backups: {
    intro: 'Regular backups are your recovery lifeline after ransomware. Cloud + offline copies is best practice.',
    suggestions: ['3-2-1 backup rule', 'Cloud backup tools', 'Ransomware recovery'],
  },
  backupTest: {
    intro: 'Untested backups fail when you need them most. One restore test per year is the minimum.',
    suggestions: ['How to test restores?', 'What to document?', 'Recovery time targets'],
  },
  patching: {
    intro: 'Patching within 30 days closes known vulnerabilities before attackers exploit them.',
    suggestions: ['Auto-updates enough?', 'Legacy software patches', 'Patch management tools'],
  },
  legacy: {
    intro: 'Unsupported software no longer receives security fixes — a common ransomware entry point.',
    suggestions: ['Windows 10 end of life', 'Replacement planning', 'Virtualisation options'],
  },
  emailBlock: {
    intro: 'Automatic filtering stops malicious emails before employees see them.',
    suggestions: ['Microsoft vs Google', 'False positives', 'Phishing still gets through?'],
  },
  emailAuth: {
    intro: 'SPF, DKIM and DMARC stop attackers impersonating your domain — critical for trust and deliverability.',
    suggestions: ['What is DMARC?', 'Setup difficulty', 'Common misconfigurations'],
  },
  antivirus: {
    intro: 'Endpoint protection on every device catches malware that email filters miss.',
    suggestions: ['EDR vs antivirus', 'Mac protection needed?', 'Free vs paid tools'],
  },
  monitoring: {
    intro: 'Centralised threat monitoring detects intrusions faster — often within minutes instead of months.',
    suggestions: ['SIEM for SMEs?', 'Managed SOC options', 'Minimum viable monitoring'],
  },
  ir: {
    intro: 'An incident response plan tells your team exactly what to do when — not if — something happens.',
    suggestions: ['Plan template', 'Who to call first?', 'Legal requirements'],
  },
  irReview: {
    intro: 'Annual plan reviews keep contacts, procedures and tools current as your business changes.',
    suggestions: ['Tabletop exercises', 'When to update?', 'Insurance notification steps'],
  },
  loading: {
    intro: "Almost there — I'm running your answers through our underwriting engine now.",
    suggestions: ['What happens next?', 'Can I change answers?', 'When do I get documents?'],
  },
}

const FAQ_RESPONSES: { match: RegExp; reply: string }[] = [
  { match: /how long|minutes|time|duration/i, reply: 'Most businesses finish in under five minutes. You can pause anytime — your progress is saved in this session.' },
  { match: /secure|privacy|data|encrypt|sell/i, reply: "All submissions are encrypted end-to-end. We're SOC 2 and ISO 27001 aligned, and we never sell your data." },
  { match: /premium|price|cost|expensive|cheap/i, reply: 'Premium depends on revenue, headcount, industry, and your security score. Better controls = lower price. Watch the live estimate in the left panel.' },
  { match: /score|grade|rating/i, reply: 'Your cyber score (0–100) updates live as you answer. Training, MFA, backups and patching have the biggest impact.' },
  { match: /mfa|two.?factor|2fa|authenticator/i, reply: 'MFA means logging in with a password plus a code from your phone or authenticator app. It blocks over 99% of automated attacks.' },
  { match: /not sure|don't know|unsure|help me choose/i, reply: 'Select "Not sure" on any question — we\'ll use conservative underwriting defaults. You can also ask me about the specific question you\'re on.' },
  { match: /country|uae|gcc|international|cover/i, reply: 'We cover businesses across the UAE, GCC and select international markets. More geographies are being added regularly.' },
  { match: /lower|reduce|discount|improve/i, reply: 'Complete security upgrades after purchase — MFA, backups, training — to unlock instant premium discounts on renewal.' },
  { match: /plan|basic|value|premium|coverage/i, reply: "After this check you'll compare Basic, Value and Premium plans with adjustable policy limits. Value is our most popular tier." },
  { match: /ransomware|breach|attack|incident/i, reply: 'Every Sentrix policy includes 24/7 incident response, forensics, legal support and ransomware negotiation.' },
  { match: /hello|hi|hey|start/i, reply: "Hello! I'm here to help you through the cyber health check. Ask about the current question or anything about coverage." },
]

export function getStepContext(step: StepContext) {
  return STEP_HINTS[step.id] ?? {
    intro: `You're on: "${step.title}". Ask me if anything is unclear.`,
    suggestions: ['Explain this question', 'What should I pick?', 'Does this affect my score?'],
  }
}

export function generateAssistantReply(input: string, step: StepContext): string {
  const lower = input.toLowerCase()

  for (const { match, reply } of FAQ_RESPONSES) {
    if (match.test(lower)) return reply
  }

  if (/explain|what (is|does|mean)|help|current|this question/i.test(lower)) {
    const hint = STEP_HINTS[step.id]
    if (hint) return hint.intro
    return step.subtitle ?? `"${step.title}" — answer based on your current setup. Honest answers give you accurate coverage.`
  }

  if (/tip|advice|best practice|recommend/i.test(lower) && step.tip) {
    return step.tip
  }

  if (/pick|choose|select|should i/i.test(lower)) {
    return "Answer based on how things work today — not how you plan them to be. If you're genuinely unsure, choose \"Not sure\" and we'll apply safe defaults."
  }

  return `Good question. For "${step.title}": ${STEP_HINTS[step.id]?.intro ?? step.subtitle ?? 'Take your best guess — you can improve your score and premium later with security upgrades.'}`
}

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
