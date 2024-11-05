import { useTheme } from 'next-themes'
import styles from '@/styles/stats.module.css'
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
import AccumulatedRewardsChart from '@/components/charts/AccumulatedRewardsChart'
import { useStatisticsData } from '@/components/charts/hooks/useStatisticsData'
import { useProposedBlocksData } from '@/components/charts/hooks/useProposedBlocksData'
import { useAllValidatorsData } from '@/components/charts/hooks/useAllValidatorsData'
import { useAllBlocksData } from '@/components/charts/hooks/useAllBlocksData'
import { useValidatorData } from '@/components/charts/hooks/useValidatorData'
import { useValidatorStatuses } from '@/components/charts/hooks/useValidatorStatuses'
import { usePoolHealth } from '@/components/charts/hooks/usePoolHealth'
import SlidingBanner from '@/components/banners/SlidingBanner'

export default function Stats() {
  const { resolvedTheme } = useTheme()

  // Data hooks
  const { stats, isLoadingStats, isErrorStats } = useStatisticsData()
  const {
    proposedBlocks,
    sortedBlocks,
    medianReward,
    averageReward,
    isLoadingProposedBlocks,
    isErrorProposedBlocks,
  } = useProposedBlocksData(stats?.avgBlockRewardWei)

  const { validatorsData, isLoadingValidatorsData, isErrorValidatorsData } =
    useAllValidatorsData()

  const { allBlocks, isLoadingAllBlocks, isErrorAllBlocks } = useAllBlocksData()

  // Computed data from hooks
  const { validatorData } = useValidatorData(proposedBlocks)
  const validatorStatuses = useValidatorStatuses(validatorsData)
  const poolHealthPercentage = usePoolHealth(allBlocks)

  return (
    <div
      className={`${styles.statsContainer} ${
        resolvedTheme === 'dark' ? styles.dark : ''
      }`}>
      <SlidingBanner
        title="SmoothDAO"
        btnText="Click here"
        text="SmoothDAO has approved the new terms of use."
        link="https://link.dappnode.io/G4WDuCg"
      />
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
      <div className={styles.fullWidthGraph}>
        <AccumulatedRewardsChart
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
