import { TotalSubscribersCard } from '../cards/SummaryCard/TotalSubscribersCard'
import { AverageRewardsCard } from '../cards/SummaryCard/RewardsCard/AverageRewardsCard'
import { TotalRewardsCard } from '../cards/SummaryCard/RewardsCard/TotalRewardsCard'
import { LastCheckpointCard } from '../cards/SummaryCard/LastCheckpointCard'
import { useQuery } from '@tanstack/react-query'
import {
  fetchStatistics,
  fetchStatus,
  validateServerStatus,
} from '@/client/api/queryFunctions'

export function Statistics() {
  const statisticsQuery = useQuery(['statistics'], fetchStatistics)
  const statusQuery = useQuery(['status'], fetchStatus)
  const serverStatus = useQuery(['serverStatus'], validateServerStatus)

  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      <TotalSubscribersCard
        isError={statisticsQuery.isError}
        isLoading={!serverStatus.data?.ready || statisticsQuery.isLoading}
        subscribers={statisticsQuery.data?.totalSubscribedValidators}
      />
      <AverageRewardsCard
        averageEthRewardWei={statisticsQuery.data?.rewardsPerValidatorPer30daysWei}
        isError={statisticsQuery.isError}
        isLoading={!serverStatus.data?.ready || statisticsQuery.isLoading}
      />
      <TotalRewardsCard
        isError={statisticsQuery.isError}
        isLoading={!serverStatus.data?.ready || statisticsQuery.isLoading}
        lastSevenDaysEthRewardWei={statisticsQuery.data?.totalRewardsSentWei}
        totalEthRewardWei={statisticsQuery.data?.totalRewardsSent30daysWei}
      />
      <LastCheckpointCard
        isError={statusQuery.isError}
        isLoading={!serverStatus.data?.ready || statusQuery.isLoading}
        lastCheckpoint={statusQuery.data?.previousCheckpointAgeUnix}
        nextCheckpoint={statusQuery.data?.nextCheckpointRemainingUnix}
      />
    </div>
  )
}
