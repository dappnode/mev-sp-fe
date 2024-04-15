import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
  Line,
} from 'recharts'
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
import { SELECTED_CHAIN } from '@/utils/config'
import CustomTooltip from '@/components/common/ChartsTooltip'

// Helper to calculate Unix time based on blockchain slot (depends on the chain genesis time)
const getSlotUnixTime = (slot: number) => {
  const genesisUnixTime = SELECTED_CHAIN === 'goerli' ? 1616508000 : 1606824023
  return genesisUnixTime + slot * 12 // Each slot represents 12 seconds
}

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

  const renderSmoothSubs = () => {
    if (isLoadingStats) return <div>Loading...</div>
    if (isErrorStats) return <div>There was an error loading this chart.</div>
    if (!stats) return null // Just in case stats are somehow null

    const totalSubs = stats.totalSubscribedValidators
    return (
      <div>
        <h2 className={styles.chartTitle}>Total Subscribed Validators</h2>
        <div className={styles.numberGraph}>{totalSubs}</div>
      </div>
    )
  }

  const renderPoolHealth = () => {
    if (isLoadingAllBlocks) return <div>Loading...</div>
    if (isErrorAllBlocks)
      return <div>There was an error loading this chart.</div>
    if (!allBlocks) return null

    const poolHealthFormatted = toFixedNoTrailingZeros(poolHealthPercentage, 2)
    const missedOrWrongFormatted = toFixedNoTrailingZeros(
      100 - poolHealthPercentage,
      2
    )

    const data = [
      { name: ' % Successful Proposals', value: poolHealthFormatted },
      { name: ' % Missed or Wrong proposals', value: missedOrWrongFormatted },
    ]

    const COLORS = [resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC', '#FFBB28'] // Color for pool health and the remaining part

    return (
      <div>
        <h2 className={styles.chartTitle}>Smooth Health Last 7 days</h2>
        <ResponsiveContainer height={100} width="100%">
          <PieChart margin={{ bottom: 0 }}>
            <Pie
              cx="50%"
              cy="90%"
              data={data}
              dataKey="value"
              endAngle={0}
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
              innerRadius={47}
              nameKey="name"
              outerRadius={70}
              startAngle={180}>
              {data.map((entry) => (
                <Cell
                  key={entry.name} // Use a unique identifier (name) as the key
                  fill={COLORS[data.indexOf(entry) % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />{' '}
            <Legend height={20} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderMedianVsAverageBarChart = () => {
    if (isLoadingProposedBlocks || isLoadingStats) return <div>Loading...</div>
    if (isErrorProposedBlocks || isErrorStats)
      return <div>There was an error loading this chart.</div>
    if (sortedBlocks.length === 0) return null

    // Data for the bar chart
    const data = [
      { name: 'Median', value: medianReward },
      { name: 'Average', value: averageReward },
    ]

    return (
      <div>
        <h2 className={styles.chartTitle}>
          Smooth&#39;s Median vs Average Block Rewards (ETH)
        </h2>
        <ResponsiveContainer height={250} width="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{ value: 'ETH', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
            <Bar
              barSize={50}
              dataKey="value"
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderTotalSmoothProposals = () => {
    if (isLoadingStats) return <div>Loading...</div>
    if (isErrorStats) return <div>There was an error loading this chart.</div>
    if (!stats) return null

    const data = [
      { blocks: stats?.totalProposedBlocks ?? 0, name: 'Proposed' },
      { blocks: stats?.totalWrongfeeBlocks ?? 0, name: 'Wrong Fee' },
      { blocks: stats?.totalMissedBlocks ?? 0, name: 'Missed' },
    ]

    return (
      <div>
        <h2 className={styles.chartTitle}>Total Smooth Proposals</h2>
        <ResponsiveContainer height={250} width="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: `Number of blocks`,
                style: { textAnchor: 'middle' },
                angle: -90,
                position: 'left',
                offset: 0,
              }}
            />
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />{' '}
            <Bar
              dataKey="blocks"
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderRewardsLast30DaysChart = () => {
    if (isLoadingProposedBlocks) return <div>Loading...</div>
    if (isErrorProposedBlocks)
      return <div>There was an error loading this chart.</div>
    if (!proposedBlocks) return null

    const now = new Date()
    const dateLabels = Array.from({ length: 30 }).map((_, index) => {
      // Calculate the date for each of the last 30 days, including today
      const day = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - (29 - index) // Adjusted from 6 to 29
      )
      return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(day)
    })

    const rewardsPerDay = Array.from({ length: 30 }, () => 0) // Adjusted from 7 to 30
    proposedBlocks.forEach((block) => {
      const blockTime = getSlotUnixTime(block.slot)
      const blockDate = new Date(blockTime * 1000)
      const blockLabel = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(blockDate)

      const dayIndex = dateLabels.indexOf(blockLabel)
      if (dayIndex !== -1) {
        // Only add rewards for the last 30 days
        rewardsPerDay[dayIndex] += weiToEth(block.rewardWei)
      }
    })

    const formattedData = rewardsPerDay.map((reward, index) => ({
      day: dateLabels[index], // Use the calculated date label
      reward: toFixedNoTrailingZeros(reward, 4),
    }))

    return (
      <div>
        <h2 className={styles.chartTitle}>Total Smooth Rewards Last 30 Days</h2>
        <ResponsiveContainer height={300} width="100%">
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis
              label={{
                value: `Total ETH`,
                style: { textAnchor: 'middle' },
                angle: -90,
                position: 'left',
                offset: -5,
              }}
            />
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
            <Bar
              dataKey="reward"
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
              name="ETH"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderTopBlocksLast7DaysChart = () => {
    if (isLoadingProposedBlocks) return <div>Loading...</div>
    if (isErrorProposedBlocks)
      return <div>There was an error loading this chart.</div>
    if (!proposedBlocks) return null

    // Calculate top blocks directly here
    const now = new Date()
    const sevenDaysAgo =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime() /
      1000

    const last7DaysBlocks = proposedBlocks
      ?.filter((block) => getSlotUnixTime(block.slot) >= sevenDaysAgo)
      .map((block) => ({
        ...block,
        rewardEth: weiToEth(block.rewardWei),
      }))
      .sort((a, b) => b.rewardEth - a.rewardEth) // Sort blocks by reward in descending order
      .slice(0, 10) // Keep only top 10

    const formattedBlocks = last7DaysBlocks?.map((block) => ({
      name: `${block.block}`, // Assuming `block.number` holds the block number
      reward: toFixedNoTrailingZeros(block.rewardEth, 4),
      blockNumber: block.block, // Store the actual block number for redirection
    }))

    // This function is called when a bar is clicked.
    const handleBarClick = (data: { blockNumber: number }) => {
      // Ensure data.blockNumber is correctly populated.
      if (data.blockNumber) {
        window.open(`https://beaconcha.in/block/${data.blockNumber}`, '_blank')
      }
    }

    return (
      <div>
        <h2 className={styles.chartTitle}>Biggest 10 Blocks Last 7 Days</h2>
        <ResponsiveContainer height={400} width="100%">
          <BarChart
            data={formattedBlocks}
            layout="vertical" // For horizontal bars
            margin={{ top: 20, right: 30, left: 20, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              label={{
                value: `ETH Reward`,
                style: { textAnchor: 'middle' },
                position: 'bottom',
                offset: 0,
              }}
            />
            <YAxis
              dataKey="name"
              style={{ cursor: 'pointer' }}
              tick={{ fontSize: 10 }}
              type="category"
            />
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />{' '}
            <Bar
              dataKey="reward"
              fill="#FFB900"
              name="ETH Reward"
              style={{ cursor: 'pointer' }}
              onClick={handleBarClick}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderPieRewardSourceChart = () => {
    if (isLoadingStats) return <div>Loading...</div>
    if (isErrorStats) return <div>There was an error loading this chart.</div>
    if (!stats) return null

    const totalRewardsETH = toFixedNoTrailingZeros(
      weiToEth(stats?.totalRewardsSentWei),
      4
    )
    const donationsETH = toFixedNoTrailingZeros(
      weiToEth(stats?.totalDonationsWei),
      4
    )
    const blockRewardsETH = toFixedNoTrailingZeros(
      totalRewardsETH - donationsETH,
      4
    )

    const data = [
      { name: 'Donations', value: donationsETH },
      { name: 'Block Rewards', value: blockRewardsETH },
    ]

    const COLORS = ['#FFB900', resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC']

    return (
      <div>
        <h2 className={styles.chartTitle}>Total Rewards source Distribution</h2>
        <ResponsiveContainer height={370} width="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
              nameKey="name"
              outerRadius={100}>
              {data.map((entry) => (
                <Cell
                  key={entry.name} // Use a unique identifier (name) as the key
                  fill={COLORS[data.indexOf(entry) % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />{' '}
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderRewardDistributionBucketChart = () => {
    if (isLoadingProposedBlocks) return <div>Loading...</div>
    if (isErrorProposedBlocks)
      return <div>There was an error loading this chart.</div>
    if (!proposedBlocks) return null

    // Define reward value buckets
    const rewardValueBuckets = [
      { range: '> 10 ETH', min: 10, max: Infinity },
      { range: '10 - 1 ETH', min: 1, max: 10 },
      { range: '1 - 0.1 ETH', min: 0.1, max: 1 },
      { range: '0.1 - 0.01 ETH', min: 0.01, max: 0.1 },
      { range: '< 0.01 ETH', min: 0, max: 0.01 },
    ]

    // Initialize counts and sums for each bucket
    const bucketCounts = rewardValueBuckets.map(() => 0)
    const bucketSums = rewardValueBuckets.map(() => 0)

    if (!proposedBlocks) {
      return null // Render nothing if proposedBlocks is undefined
    }

    // Categorize blocks into buckets and calculate the sum of rewards for each bucket
    proposedBlocks.forEach((block) => {
      const rewardEth = weiToEth(block.rewardWei)
      for (let i = 0; i < rewardValueBuckets.length; i += 1) {
        const { min, max } = rewardValueBuckets[i]
        if (rewardEth >= min && rewardEth <= max) {
          bucketCounts[i] += 1
          bucketSums[i] += rewardEth // Accumulate sum within the range
          break
        }
      }
    })

    // Prepare data for Scatter graph
    const data = rewardValueBuckets.map((bucket, index) => ({
      range: bucket.range,
      blocks: bucketCounts[index],
      sum: toFixedNoTrailingZeros(bucketSums[index], 4), // Round the sum within each range
    }))
    // Determine the maximum sum to set the domain of the right Y-axis
    const maxSum = Math.max(...bucketSums)

    return (
      <div>
        <h2 className={styles.chartTitle}>
          Proposed MEV Block Distribution by Ranges
        </h2>
        <ResponsiveContainer height={350} width="100%">
          <ComposedChart
            data={data}
            margin={{
              bottom: 35,
              left: 5,
            }}>
            <XAxis
              dataKey="range"
              dy={5}
              label={{
                value: `MEV reward range`,
                style: { textAnchor: 'middle' },
                position: 'bottom',
                offset: 10,
              }}
            />
            <YAxis
              yAxisId="left"
              label={{
                value: `Number of blocks`,
                style: { textAnchor: 'middle' },
                angle: -90,
                position: 'left',
                offset: 0,
              }}
            />
            <YAxis
              domain={[0, Math.ceil(maxSum)]}
              orientation="right"
              stroke="#FFB900"
              tickFormatter={(value) => `${value} `}
              yAxisId="right"
              label={{
                value: `Total ETH`,
                style: { textAnchor: 'middle' },
                angle: -90,
                position: 'right',
                offset: -10,
              }}
            />
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />{' '}
            <Legend height={20} verticalAlign="top" />
            <Bar
              dataKey="blocks"
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
              name="Amount of blocks"
              yAxisId="left"
            />
            <Line
              dataKey="sum"
              name="Total ETH"
              stroke="#FFB900"
              type="monotone"
              yAxisId="right"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderAllBlocksSortedByRewardChart = () => {
    if (isLoadingProposedBlocks) return <div>Loading...</div>
    if (isErrorProposedBlocks)
      return <div>There was an error loading this chart.</div>
    if (!sortedBlocks.length) return null

    const maxReward = Math.max(...sortedBlocks.map((block) => block.rewardEth))

    return (
      <div>
        <h2 className={styles.chartTitle}>All Blocks sorted by MEV Reward</h2>
        <ResponsiveContainer height={400} width="100%">
          <BarChart
            data={sortedBlocks}
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 20, bottom: 17 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              domain={[0, Math.ceil(maxReward)]}
              type="number"
              label={{
                value: `MEV Reward (ETH)`,
                style: { textAnchor: 'middle' },
                position: 'left',
                angle: -90,
                offset: -10,
              }}
            />
            <XAxis
              dataKey="blockNumber"
              tick={{ fontSize: 0 }}
              tickLine={false}
              label={{
                value: `Proposed blocks`,
                style: { textAnchor: 'middle' },
                position: 'bottom',
                offset: 0,
              }}
            />
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
            <Bar
              dataKey="rewardEth"
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
              isAnimationActive={false}
              name="ETH Reward"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderValidatorsPerformanceChart = () => {
    if (isLoadingProposedBlocks) return <div>Loading...</div>
    if (isErrorProposedBlocks)
      return <div>There was an error loading this chart.</div>
    if (!validatorData.length) return null

    return (
      <div>
        <h2 className={styles.chartTitle}>
          Smooth&#39;s Top Validators by Rewards Shared
        </h2>
        <ResponsiveContainer height={300} width="100%">
          <ComposedChart
            data={validatorData}
            margin={{
              bottom: 25,
              left: 0,
              right: 0,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              angle={-45}
              dataKey="validatorIndex"
              name="Validator Index"
              tick={{ fontSize: 11, dy: 12 }}
            />
            <YAxis
              yAxisId="left"
              label={{
                angle: -90,
                position: 'insideLeft',
                offset: 15,
                style: { textAnchor: 'middle' },
                value: 'Total Rewards Shared (ETH)',
              }}
            />
            <YAxis
              orientation="right"
              stroke="#FFB900"
              yAxisId="right"
              label={{
                angle: -90,
                position: 'insideRight',
                offset: 20,
                style: { textAnchor: 'middle' },
                value: 'Number of Blocks Proposed',
              }}
            />
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
            <Bar
              dataKey="totalRewardsEth"
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
              name="Total Rewards (ETH)"
              yAxisId="left"
            />
            <Line
              dataKey="blockCount"
              name="Number of Blocks"
              stroke="#FFB900"
              yAxisId="right"
            />
            <Legend height={30} verticalAlign="top" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderStatusChart = () => {
    if (isLoadingValidatorsData) return <div>Loading...</div>
    if (isErrorValidatorsData)
      return <div>There was an error loading this chart.</div>
    if (!validatorData.length) return null

    return (
      <div>
        <h2 className={styles.chartTitle}>
          Total Unhealthy Smooth&#39;s Validators
        </h2>
        <ResponsiveContainer height={300} width="100%">
          <BarChart
            data={validatorStatuses}
            layout="vertical" // Set the layout to vertical for a horizontal bar chart
            margin={{ bottom: 5, left: 20, right: 30, top: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
            <Bar
              barSize={20}
              dataKey="count"
              fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div
      className={`${styles.statsContainer} ${
        resolvedTheme === 'dark' ? styles.dark : ''
      }`}>
      <div className={styles.row}>
        <div className={styles.column}>{renderSmoothSubs()}</div>
        <div className={styles.column}>{renderPoolHealth()}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>{renderMedianVsAverageBarChart()}</div>
        <div className={styles.column}>{renderTotalSmoothProposals()}</div>
      </div>
      <div
        className={`${styles.fullWidthGraph} ${
          resolvedTheme === 'dark' ? styles.dark : ''
        }`}>
        {renderRewardsLast30DaysChart()}
      </div>
      <div className={styles.row}>
        <div className={styles.column}>{renderTopBlocksLast7DaysChart()}</div>
        <div className={styles.column}>{renderPieRewardSourceChart()}</div>
      </div>
      <div
        className={`${styles.fullWidthGraph} ${
          resolvedTheme === 'dark' ? styles.dark : ''
        }`}>
        {renderRewardDistributionBucketChart()}
      </div>
      <div
        className={`${styles.fullWidthGraph} ${
          resolvedTheme === 'dark' ? styles.dark : ''
        }`}>
        {renderAllBlocksSortedByRewardChart()}
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          {renderValidatorsPerformanceChart()}
        </div>
        <div className={styles.column}>{renderStatusChart()}</div>
      </div>
    </div>
  )
}
