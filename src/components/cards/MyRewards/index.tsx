import { MyRewardsSection } from './MyRewardsSection'
import { Skeleton } from './Skeleton'
import { BaseCard } from '../BaseCard'
import { ClaimRewardsDialog } from '@/components/dialogs/ClaimRewardsDialog'
import { formatTime } from '@/utils/formatTime'
import {
  AccumulatedRewardsIcon,
  ClaimableRewardsIcon,
  PendingRewardsIcon,
} from '@/components/icons'

interface MyRewardsProps {
  claimableRewards: number
  isDisabled?: boolean
  isLoading?: boolean
  nextCheckpoint: number | undefined
  pendingRewards: number
  totalAccumulatedRewards: number
}

export function MyRewards({
  claimableRewards,
  isDisabled,
  isLoading,
  nextCheckpoint,
  pendingRewards,
  totalAccumulatedRewards,
}: MyRewardsProps) {
  return (
    <BaseCard className="mx-auto flex h-[338px] w-full max-w-md flex-col justify-between bg-opacity-80 text-DAppDeep dark:bg-opacity-80 sm:h-[600px] md:h-[580px]">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <h3 className=" text-2xl font-bold leading-8 text-DAppDeep dark:text-DAppDarkText sm:mb-4">
            My Rewards
          </h3>
          <p className="pb-4 text-sm font-light leading-6 text-DAppDeep dark:text-DAppDarkText sm:mb-4 sm:border-b sm:border-DAppGray/20">
            {`Updates in: ${formatTime(nextCheckpoint)}`}{' '}
          </p>
          <MyRewardsSection
            className="pb-2 sm:border-none sm:pb-0"
            icon={<ClaimableRewardsIcon />}
            rewards={claimableRewards}
            title="Claimable"
            tooltip="Rewards ready to be claimed from all your validators"
          />
          <ClaimRewardsDialog
            claimableRewards={claimableRewards}
            disabledTrigger={isDisabled}
          />
          <MyRewardsSection
            className="mb-6 mt-2 pt-2 sm:border-t sm:pt-6"
            icon={<PendingRewardsIcon />}
            rewards={+pendingRewards}
            title="Pending"
            tooltip="Non-confirmed rewards that will become claimable after proposing a block"
            type="pending"
          />
          <MyRewardsSection
            className="mb-8"
            icon={<AccumulatedRewardsIcon />}
            rewards={totalAccumulatedRewards}
            title="Lifetime earned"
            tooltip="Claimable now + already claimed in the past"
          />
        </>
      )}
    </BaseCard>
  )
}
