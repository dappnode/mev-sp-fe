import { RewardsCard } from '.'

interface TotalRewardsCardProps {
  totalEthRewardWei: string | undefined
  isLoading: boolean
  isError: boolean
  last30daysEthRewardWei: string | undefined
}

export function TotalRewardsCard({
  totalEthRewardWei,
  isLoading,
  isError,
  last30daysEthRewardWei,
}: TotalRewardsCardProps) {
  return (
    <RewardsCard
      ethRewardWei={totalEthRewardWei}
      isError={isError}
      isLoading={isLoading}
      secondaryRewardTitle="Last 30 days"
      secondaryRewardWei={last30daysEthRewardWei}
      title="Total Rewards"
      tooltip="Total rewards sent into the Smooth"
    />
  )
}
