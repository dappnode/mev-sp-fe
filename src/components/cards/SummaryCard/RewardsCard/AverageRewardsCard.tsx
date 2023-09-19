import { RewardsCard } from '.'

interface AverageRewardsCardProps {
  averageEthRewardWei: string | undefined
  isLoading: boolean
  isError: boolean
}

export function AverageRewardsCard({
  averageEthRewardWei,
  isLoading,
  isError,
}: AverageRewardsCardProps) {
  return (
    <RewardsCard
      ethRewardWei={averageEthRewardWei}
      isError={isError}
      isLoading={isLoading}
      secondaryRewardTitle=""
      secondaryRewardWei=""
      title="Validator's Monthly Rewards"
      tooltip="Smooth Validator Average Rewards for the Past 30 Days"
    />
  )
}
