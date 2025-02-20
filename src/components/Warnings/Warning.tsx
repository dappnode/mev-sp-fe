import Link from 'next/link'

interface WarningCardProps {
  title: string
  children: React.ReactNode
  variant: WariningVariants
  showIf?: boolean
  href?: string
}

type WariningVariants = 'caution' | 'danger'

const variantEmoji = (variant: WariningVariants) =>
  variant === 'caution' ? '⚠️' : '🚨'

export function WarningCard({
  title,
  children,
  variant,
  href,
  showIf = true,
}: WarningCardProps) {
  return showIf ? (
    <div
      className={`mx-auto mt-6 h-full w-full rounded-lg px-6 py-4 ${
        variant === 'caution'
          ? 'bg-DAppOrange/70 dark:bg-DAppOrange/75'
          : 'bg-red-600/70 dark:bg-red-800/75'
      }`}>
      <div className="flex h-full w-full flex-col justify-around gap-2 text-center">
        <div className="flex w-full flex-row  justify-center gap-5">
          <p className="text-xl">{variantEmoji(variant)}</p>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-xl">{variantEmoji(variant)}</p>
        </div>

        {children}
        {href && (
          <p>
            {' '}
            Learn more in our{' '}
            <Link
              className="font-bold text-DAppPurple-900 underline"
              href={href}
              target="_blank">
              Documentation
            </Link>
          </p>
        )}
      </div>
    </div>
  ) : null
}

interface WarningContentWrapperProps {
  children: React.ReactNode
}

export function WarningContentWrapper({
  children,
}: WarningContentWrapperProps) {
  return <div className="flex flex-col items-center gap-2">{children}</div>
}

interface WarningLabelProps {
  children: React.ReactNode
  variant: 'caution' | 'danger'
}

export function WarningLabel({ children, variant }: WarningLabelProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg bg-DAppOrange/50 px-5 py-2 md:flex-row md:gap-2 ${
        variant === 'caution'
          ? 'bg-DAppOrange/50'
          : 'bg-red-400 dark:bg-red-950/30'
      }`}
    >
      {children}
    </div>
  )
}
