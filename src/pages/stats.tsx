import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  fetchProposedBlocks,
  fetchStatistics,
} from '@/client/api/queryFunctions'
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
} from 'recharts'
import { weiToEth } from '@/utils/web3' // Ensure this import is correct
import styles from '@/styles/stats.module.css'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { SELECTED_CHAIN } from '@/utils/config'

// Utility to get Unix time for a slot
const getSlotUnixTime = (slot: number, SELECTED_CHAIN: string) => {
  const genesisUnixTime = SELECTED_CHAIN === 'goerli' ? 1616508000 : 1606824023
  return genesisUnixTime + slot * 12 // Each slot represents 12 seconds
}

export default function Stats() {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
  })
  const { data: proposedBlocks, isLoading: isLoadingProposedBLocks } = useQuery(
    {
      queryKey: ['proposedblocks'],
      queryFn: fetchProposedBlocks,
    }
  )

  interface RewardData {
    day: string
    reward: number
  }

  const [rewardsLast7Days, setRewardsLast7Days] = useState<RewardData[]>([])

  useEffect(() => {
    if (proposedBlocks) {
      const now = new Date()
      let dateLabels = Array.from({ length: 7 }).map((_, index) => {
        // Calculate the date for each of the last 7 days, including today
        let day = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - (6 - index)
        )
        return new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(day)
      })

      let rewardsPerDay = Array.from({ length: 7 }, () => 0) // Initialize array for 7 days
      proposedBlocks.forEach((block) => {
        const blockTime = getSlotUnixTime(block.slot, SELECTED_CHAIN)
        const blockDate = new Date(blockTime * 1000)
        const blockLabel = new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(blockDate)

        const dayIndex = dateLabels.indexOf(blockLabel)
        if (dayIndex !== -1) {
          // Only add rewards for the last 7 days
          rewardsPerDay[dayIndex] += weiToEth(block.rewardWei)
        }
      })

      const formattedData = rewardsPerDay.map((reward, index) => ({
        day: dateLabels[index], // Use the calculated date label
        reward: toFixedNoTrailingZeros(reward, 4),
      }))

      setRewardsLast7Days(formattedData)
    }
  }, [proposedBlocks])

  interface TopBlockData {
    name: string // For labeling purposes
    reward: number // Reward in ETH
    blockNumber: number // Actual block number to be used in the tooltip for redirection
  }

  const [topBlocksLast7Days, setTopBlocksLast7Days] = useState<TopBlockData[]>(
    []
  )

  useEffect(() => {
    if (proposedBlocks) {
      const now = new Date()
      const sevenDaysAgo =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        ).getTime() / 1000

      const last7DaysBlocks = proposedBlocks
        .filter(
          (block) => getSlotUnixTime(block.slot, SELECTED_CHAIN) >= sevenDaysAgo
        )
        .map((block) => ({
          ...block,
          rewardEth: weiToEth(block.rewardWei),
        }))
        .sort((a, b) => b.rewardEth - a.rewardEth) // Sort blocks by reward in descending order
        .slice(0, 10) // Keep only top 10

      const formattedBlocks = last7DaysBlocks.map((block) => ({
        name: `${block.block}`, // Assuming `block.number` holds the block number
        reward: toFixedNoTrailingZeros(block.rewardEth, 4),
        blockNumber: block.block, // Store the actual block number for redirection
      }))

      setTopBlocksLast7Days(formattedBlocks)
    }
  }, [proposedBlocks])

  const renderBarChart = () => {
    const data = [
      { name: 'Proposed', blocks: stats?.totalProposedBlocks ?? 0 },
      { name: 'Wrong Fee', blocks: stats?.totalWrongfeeBlocks ?? 0 },
      { name: 'Missed', blocks: stats?.totalMissedBlocks ?? 0 },
    ]

    return (
      <div>
        <h2 className={styles.chartTitle}>Block Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="blocks" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderPieChart = () => {
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

    const COLORS = ['#0088FE', '#00C49F']

    return (
      <div>
        <h2 className={styles.chartTitle}>Rewards Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // Example function to render "Total Smooth Rewards Last 7 Days"
  const renderRewardsLast7DaysChart = () => {
    return (
      <div>
        <h2 className={styles.chartTitle}>Rewards Last 7 Days</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={rewardsLast7Days}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="reward" fill="#82ca9d" name="ETH" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  const renderTopBlocksLast7DaysChart = () => {
    // This function is called when a bar is clicked.
    const handleBarClick = (data: { blockNumber: any }) => {
      // Ensure data.blockNumber is correctly populated.
      if (data.blockNumber) {
        window.open(`https://beaconcha.in/block/${data.blockNumber}`, '_blank')
      }
    }

    return (
      <div>
        <h2 className={styles.chartTitle}>Top 10 Blocks Last 7 Days</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical" // For horizontal bars
            data={topBlocksLast7Days}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 10 }}
              // Use custom style to make ticks look clickable.
              style={{ cursor: 'pointer' }}
            />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend />
            <Bar
              dataKey="reward"
              fill="#82ca9d"
              name="ETH Reward"
              onClick={handleBarClick}
              // Apply a cursor style to indicate the bars are clickable
              style={{ cursor: 'pointer' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (isLoadingStats || isLoadingProposedBLocks) return <div>Loading...</div>

  return (
    <div className={styles.statsContainer}>
      <div className={styles.row}>
        <div className={styles.column}>{renderBarChart()}</div>
        <div className={styles.column}>{renderPieChart()}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>{renderRewardsLast7DaysChart()}</div>
        <div className={styles.column}>{renderTopBlocksLast7DaysChart()}</div>
      </div>
    </div>
  )
}
