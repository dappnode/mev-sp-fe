import Link from 'next/link'

interface DashboardWarningProps {
  title: string
  variant: WariningVariants
  children: React.ReactNode
  showIf?: boolean
  href?: string
}

export function DashboardWarning({
  title,
  children,
  variant,
  href,
  showIf = true,
}: DashboardWarningProps) {
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
          <p> Learn more in our{' '}
          <Link
            className="font-bold text-purple-600 underline"
            href={href}
            target="_blank">
            Documentation
          </Link></p>
        )}
      </div>
    </div>
  ) : null
}

type WariningVariants = 'caution' | 'danger'

const variantEmoji = (variant: WariningVariants) =>
  variant === 'caution' ? '⚠️' : '🚨'
