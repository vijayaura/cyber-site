import { cn } from '@/lib/utils'
import secureServer from '@/assets/undraw/secure-server.svg?raw'
import connectedWorld from '@/assets/undraw/connected-world.svg?raw'
import firewall from '@/assets/undraw/firewall.svg?raw'
import twoFactor from '@/assets/undraw/two-factor-authentication.svg?raw'
import secureLogin from '@/assets/undraw/secure-login.svg?raw'
import cloudHosting from '@/assets/undraw/cloud-hosting.svg?raw'
import dataAtWork from '@/assets/undraw/data-at-work.svg?raw'
import connected from '@/assets/undraw/connected.svg?raw'
import serverCluster from '@/assets/undraw/server-cluster.svg?raw'
import hackerMindset from '@/assets/undraw/hacker-mindset.svg?raw'

export type UndrawName =
  | 'secure-server'
  | 'connected-world'
  | 'firewall'
  | 'two-factor-authentication'
  | 'secure-login'
  | 'cloud-hosting'
  | 'data-at-work'
  | 'connected'
  | 'server-cluster'
  | 'hacker-mindset'

const ILLUSTRATIONS: Record<UndrawName, string> = {
  'secure-server': secureServer,
  'connected-world': connectedWorld,
  firewall,
  'two-factor-authentication': twoFactor,
  'secure-login': secureLogin,
  'cloud-hosting': cloudHosting,
  'data-at-work': dataAtWork,
  connected,
  'server-cluster': serverCluster,
  'hacker-mindset': hackerMindset,
}

type UndrawIllustrationProps = {
  name: UndrawName
  className?: string
  accentClassName?: string
  title?: string
  style?: React.CSSProperties
}

export function UndrawIllustration({
  name,
  className,
  accentClassName = 'text-electric',
  title,
  style,
}: UndrawIllustrationProps) {
  return (
    <div
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      style={style}
      className={cn('pointer-events-none [&_svg]:h-full [&_svg]:w-full', accentClassName, className)}
      dangerouslySetInnerHTML={{ __html: ILLUSTRATIONS[name] }}
    />
  )
}

type SectionIllustrationProps = {
  name: UndrawName
  className?: string
  accentClassName?: string
  opacity?: number
}

export function SectionIllustration({
  name,
  className,
  accentClassName,
  opacity = 0.12,
}: SectionIllustrationProps) {
  return (
    <UndrawIllustration
      name={name}
      accentClassName={accentClassName}
      style={{ opacity }}
      className={cn('absolute select-none', className)}
    />
  )
}
