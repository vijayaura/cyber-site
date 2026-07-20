import { cn } from '@/lib/utils'

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  wide?: boolean
}

export function Container({ className, wide, ...props }: ContainerProps) {
  return (
    <div
      className={cn('container-site', wide && 'max-w-[1440px]', className)}
      {...props}
    />
  )
}
