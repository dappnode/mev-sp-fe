import clsx from 'clsx'

interface BaseCardProps {
  children: React.ReactNode
  className?: string
}

export function BaseCard({ children, className }: BaseCardProps) {
  return (
    <article
      className={clsx(
        'rounded-lg bg-white p-6 dark:bg-DAppDarkSurface-200',
        className
      )}>
      {children}
    </article>
  )
}
