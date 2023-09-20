import { RewardsCard } from '.'

interface AverageRewardsCardProps {
  isLoading: boolean
  isError: boolean
  rewardsPerValidatorPer30daysWei: string | undefined
}

export function AverageRewardsCard({
  isLoading,
  isError,
  rewardsPerValidatorPer30daysWei,
}: AverageRewardsCardProps) {
  return (
    <RewardsCard
      ethRewardWei={rewardsPerValidatorPer30daysWei}
      isError={isError}
      isLoading={isLoading}
      secondaryRewardTitle="test"
      secondaryRewardWei={rewardsPerValidatorPer30daysWei}
      title="Validator's Monthly Rewards"
      tooltip="Smooth Validator Average Rewards for the Past 30 Days"
    />
  )
}
