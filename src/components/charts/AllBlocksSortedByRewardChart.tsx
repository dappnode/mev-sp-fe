import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import CustomTooltip from '@/components/common/ChartsTooltip'
import styles from '@/styles/stats.module.css'

interface AllBlocksSortedByRewardChartProps {
  sortedBlocks: {
    blockNumber: number
    rewardEth: number
  }[]
  isLoading: boolean
  isError: boolean
  resolvedTheme?: string
}

function AllBlocksSortedByRewardChart({
  sortedBlocks,
  isLoading,
  isError,
  resolvedTheme,
}: AllBlocksSortedByRewardChartProps) {
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>There was an error loading this chart.</div>
  if (!sortedBlocks.length) return null

  const maxReward = Math.max(...sortedBlocks.map((block) => block.rewardEth))

  return (
    <div>
      <h2 className={styles.chartTitle}>All Blocks Sorted by MEV Reward</h2>
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

export default AllBlocksSortedByRewardChart
