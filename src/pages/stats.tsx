import { useMemo } from 'react'
import { useTheme } from 'next-themes'
import { useQuery } from '@tanstack/react-query'
import {
  fetchAllBlocks,
  fetchAllValidators,
  fetchProposedBlocks,
  fetchStatistics,
} from '@/client/api/queryFunctions'
import { weiToEth } from '@/utils/web3' // Ensure this import is correct
import styles from '@/styles/stats.module.css'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { getSlotUnixTime } from '@/utils/slotsTime'
import SmoothSubsChart from '@/components/charts/SmoothSubsChart'
import PoolHealthChart from '@/components/charts/PoolHealthChart'
import MedianVsAverageBarChart from '@/components/charts/MedianVsAverageBarChart'
import TotalSmoothProposalsChart from '@/components/charts/TotalSmoothProposalsChart'
import RewardsLast30DaysChart from '@/components/charts/RewardsLast30DaysChart'
import TopBlocksLast7DaysChart from '@/components/charts/TopBlocksLast7DaysChart'
import PieRewardSourceChart from '@/components/charts/PieRewardSourceChart'
import RewardDistributionBucketChart from '@/components/charts/RewardDistributionBucketChart'
import AllBlocksSortedByRewardChart from '@/components/charts/AllBlocksSortedByRewardChart'
import ValidatorsPerformanceChart from '@/components/charts/ValidatorsPerformanceChart'
import ValidatorsStatusChart from '@/components/charts/ValidatorsStatusChart'

export default function Stats() {
  const { resolvedTheme } = useTheme()

  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
  })

  const {
    data: proposedBlocks,
    isLoading: isLoadingProposedBlocks,
    isError: isErrorProposedBlocks,
  } = useQuery({
    queryKey: ['proposedblocks'],
    queryFn: fetchProposedBlocks,
  })

  const {
    data: validatorsData,
    isLoading: isLoadingValidatorsData,
    isError: isErrorValidatorsData,
  } = useQuery({
    queryKey: ['validators'],
    queryFn: fetchAllValidators,
  })

  const {
    data: allBlocks,
    isLoading: isLoadingAllBlocks,
    isError: isErrorAllBlocks,
  } = useQuery({
    queryKey: ['allblocks'],
    queryFn: fetchAllBlocks,
  })

  interface ValidatorStats {
    [index: number]: {
      totalRewards: bigint
      blockCount: number
    }
  }

  interface ValidatorData {
    validatorIndex: number
    totalRewardsEth: number
    blockCount: number
  }

  // useMemo to arrange blocks into sorted blocks by reward and compute median and average rewards
  const { sortedBlocks, medianReward, averageReward } = useMemo(() => {
    // Guard checks to ensure necessary data is available
    if (!proposedBlocks || !stats)
      return { sortedBlocks: [], medianReward: 0, averageReward: 0 }

    // Transform proposed blocks into rewards in ETH
    const rewardsInEth = proposedBlocks.map((block) =>
      weiToEth(block.rewardWei)
    )
    // Sort rewards to calculate median
    const sortedRewards = [...rewardsInEth].sort((a, b) => a - b)
    const mid = Math.floor(sortedRewards.length / 2)
    const median =
      sortedRewards.length % 2 !== 0
        ? sortedRewards[mid]
        : (sortedRewards[mid - 1] + sortedRewards[mid]) / 2
    // Calculate average reward
    const average = weiToEth(stats.avgBlockRewardWei)

    // Map proposed blocks to include only necessary data
    const sortedBlocksData = [...proposedBlocks]
      .sort((a, b) => parseFloat(b.rewardWei) - parseFloat(a.rewardWei))
      .map((block) => ({
        blockNumber: block.block,
        rewardEth: toFixedNoTrailingZeros(weiToEth(block.rewardWei), 4),
      }))

    return {
      sortedBlocks: sortedBlocksData,
      medianReward: toFixedNoTrailingZeros(median, 4),
      averageReward: toFixedNoTrailingZeros(average, 4),
    }
  }, [proposedBlocks, stats])

  // useMemo to prepare data for validators performance chart
  const { validatorData } = useMemo(() => {
    // Return early if data is not available
    if (!proposedBlocks) return { validatorData: [] }

    // Accumulate rewards and count blocks for each validator
    const validatorStats: ValidatorStats = {}
    proposedBlocks.forEach((block) => {
      const index = block.validatorIndex
      if (validatorStats[index]) {
        validatorStats[index].totalRewards += BigInt(block.rewardWei)
        validatorStats[index].blockCount += 1
      } else {
        validatorStats[index] = {
          totalRewards: BigInt(block.rewardWei),
          blockCount: 1,
        }
      }
    })

    // Sort validators by total rewards in descending order
    const sortedValidators: ValidatorData[] = Object.keys(validatorStats)
      .map((key) => {
        const index = parseInt(key, 10) // Ensure key is treated as a number
        return {
          validatorIndex: index,
          totalRewardsEth: toFixedNoTrailingZeros(
            weiToEth(validatorStats[index].totalRewards.toString()),
            4
          ),
          blockCount: validatorStats[index].blockCount,
        }
      })
      .sort((a, b) => b.totalRewardsEth - a.totalRewardsEth)
      .slice(0, 10) // Get top 10

    return { validatorData: sortedValidators }
  }, [proposedBlocks])

  // useMemo to aggregate status data for validators
  const validatorStatuses = useMemo(() => {
    if (!validatorsData) return []

    let yellowCard = 0
    let redCard = 0
    let banned = 0

    // Count the number of validators with each status type
    validatorsData.forEach((validator) => {
      if (validator.status === 'yellowcard') {
        yellowCard += 1
      } else if (validator.status === 'redcard') {
        redCard += 1
      } else if (validator.status === 'banned') {
        banned += 1
      }
    })

    return [
      { name: 'Yellow Card 🟡', count: yellowCard },
      { name: 'Red Card 🔴', count: redCard },
      { name: 'Banned 💀', count: banned },
    ]
  }, [validatorsData])

  // useMemo to calculate pool health based on the percentage of successful proposals
  const poolHealthPercentage = useMemo(() => {
    if (!allBlocks) return 0

    const now = Date.now()
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000 // Calculate timestamp for 7 days ago
    const lastWeekBlocks = allBlocks.filter((block) => {
      const blockTime = getSlotUnixTime(block.slot) * 1000 // Convert slot time to milliseconds
      return blockTime >= sevenDaysAgo
    })

    const okPoolProposals = lastWeekBlocks.filter(
      (block) => block.blockType === 'okpoolproposal'
    ).length
    const totalBlocks = lastWeekBlocks.length

    const percentage =
      totalBlocks > 0 ? (okPoolProposals / totalBlocks) * 100 : 0
    return toFixedNoTrailingZeros(percentage, 2) // Format the percentage to 2 decimal places
  }, [allBlocks])

  return (
    <div
      className={`${styles.statsContainer} ${
        resolvedTheme === 'dark' ? styles.dark : ''
      }`}>
      <div className={styles.row}>
        <div className={styles.column}>
          <SmoothSubsChart
            isError={isErrorStats}
            isLoading={isLoadingStats}
            totalSubs={stats?.totalSubscribedValidators}
          />
        </div>
        <div className={styles.column}>
          <PoolHealthChart
            isError={isErrorAllBlocks}
            isLoading={isLoadingAllBlocks}
            poolHealthPercentage={poolHealthPercentage}
            resolvedTheme={resolvedTheme}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <MedianVsAverageBarChart
            averageReward={averageReward}
            isError={isErrorProposedBlocks || isErrorStats}
            isLoading={isLoadingProposedBlocks || isLoadingStats}
            medianReward={medianReward}
            resolvedTheme={resolvedTheme}
          />
        </div>
        <div className={styles.column}>
          <TotalSmoothProposalsChart
            isError={isErrorStats}
            isLoading={isLoadingStats}
            resolvedTheme={resolvedTheme}
            stats={stats}
          />
        </div>
      </div>
      <div
        className={`${styles.fullWidthGraph} ${
          resolvedTheme === 'dark' ? styles.dark : ''
        }`}>
        <RewardsLast30DaysChart
          isError={isErrorProposedBlocks}
          isLoading={isLoadingProposedBlocks}
          proposedBlocks={proposedBlocks}
          resolvedTheme={resolvedTheme}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <TopBlocksLast7DaysChart
            isError={isErrorProposedBlocks}
            isLoading={isLoadingProposedBlocks}
            proposedBlocks={proposedBlocks}
            resolvedTheme={resolvedTheme}
          />
        </div>
        <div className={styles.column}>
          <PieRewardSourceChart
            isError={isErrorStats}
            isLoading={isLoadingStats}
            resolvedTheme={resolvedTheme}
            stats={stats}
          />
        </div>
      </div>
      <div
        className={`${styles.fullWidthGraph} ${
          resolvedTheme === 'dark' ? styles.dark : ''
        }`}>
        <RewardDistributionBucketChart
          isError={isErrorProposedBlocks}
          isLoading={isLoadingProposedBlocks}
          proposedBlocks={proposedBlocks}
          resolvedTheme={resolvedTheme}
        />
      </div>
      <div
        className={`${styles.fullWidthGraph} ${
          resolvedTheme === 'dark' ? styles.dark : ''
        }`}>
        <AllBlocksSortedByRewardChart
          isError={isErrorProposedBlocks}
          isLoading={isLoadingProposedBlocks}
          resolvedTheme={resolvedTheme}
          sortedBlocks={sortedBlocks}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <ValidatorsPerformanceChart
            isError={isErrorProposedBlocks}
            isLoading={isLoadingProposedBlocks}
            resolvedTheme={resolvedTheme}
            validatorData={validatorData}
          />
        </div>
        <div className={styles.column}>
          <ValidatorsStatusChart
            isError={isErrorValidatorsData}
            isLoading={isLoadingValidatorsData}
            resolvedTheme={resolvedTheme}
            validatorStatuses={validatorStatuses}
          />
        </div>
      </div>
    </div>
  )
}
