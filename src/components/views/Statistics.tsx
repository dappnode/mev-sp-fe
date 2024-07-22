import { TotalSubscribersCard } from '../cards/SummaryCard/TotalSubscribersCard'
import { AverageRewardsCard } from '../cards/SummaryCard/RewardsCard/AverageRewardsCard'
import { TotalRewardsCard } from '../cards/SummaryCard/RewardsCard/TotalRewardsCard'
import { LastCheckpointCard } from '../cards/SummaryCard/LastCheckpointCard'
import { useQuery } from '@tanstack/react-query'
import {
  fetchConfig,
  fetchStatistics,
  fetchStatus,
  validateServerStatus,
} from '@/client/api/queryFunctions'

export function Statistics() {
  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig
});

const statisticsQuery = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics
});

const statusQuery = useQuery({
    queryKey: ['status'],
    queryFn: fetchStatus
});

const serverStatus = useQuery({
    queryKey: ['serverStatus'],
    queryFn: validateServerStatus
});


  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      <TotalSubscribersCard
        isError={statisticsQuery.isError}
        isLoading={!serverStatus.data?.ready || statisticsQuery.isLoading}
        poolFeesPercent={configQuery.data?.poolFeesPercent}
        subscribers={statisticsQuery.data?.totalSubscribedValidators}
      />
      <AverageRewardsCard
        avgBlockRewardWei={statisticsQuery.data?.avgBlockRewardWei}
        isError={statisticsQuery.isError}
        isLoading={!serverStatus.data?.ready || statisticsQuery.isLoading}
        poolFeesPercent={configQuery.data?.poolFeesPercent}
      />
      <TotalRewardsCard
        isError={statisticsQuery.isError}
        isLoading={!serverStatus.data?.ready || statisticsQuery.isLoading}
        last30daysEthRewardWei={statisticsQuery.data?.totalRewardsSent30daysWei}
        totalEthRewardWei={statisticsQuery.data?.totalRewardsSentWei}
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
