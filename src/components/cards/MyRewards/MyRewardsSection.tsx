import clsx from 'clsx'
import { Tooltip } from '@/components/common/Tooltip'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

interface MyRewardsSectionProps {
  className?: string
  icon: React.ReactNode
  rewards: number
  title: string
  tooltip: string
  type?: 'default' | 'pending'
}

export function MyRewardsSection({
  className,
  icon,
  rewards,
  title,
  tooltip,
  type = 'default',
}: MyRewardsSectionProps) {
  const trimmedReward = toFixedNoTrailingZeros(rewards, 4)

  return (
    <section
      className={clsx(
        'flex justify-between sm:block sm:border-b sm:border-DAppGray/20 sm:pb-4',
        className
      )}>
      <div className="flex items-center">
        <div className="hidden md:block">{icon}</div>
        <h3 className="max-w-fit text-sm dark:text-DAppDarkText sm:text-xs md:ml-3 md:mr-2 md:text-sm">
          {title}
        </h3>
        <Tooltip
          className="ml-1 mr-3 h-4 w-4 sm:hidden md:block lg:ml-2"
          iconType="question"
          tooltip={tooltip}
        />
      </div>
      <p className="text-lg font-bold leading-8 dark:text-DAppDarkText sm:mt-5 sm:text-base md:text-2xl ">
        {type === 'pending' ? (
          <span className="text-green-600/80">+{trimmedReward}</span>
        ) : (
          trimmedReward
        )}

        <span className="ml-2 text-base font-normal text-DAppGray sm:text-sm md:text-lg">
          ETH
        </span>
      </p>
    </section>
  )
}
