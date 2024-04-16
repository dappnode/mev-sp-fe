import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import CustomTooltip from '@/components/common/ChartsTooltip'
import styles from '@/styles/stats.module.css'
import { weiToEth } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

interface PieRewardSourceChartProps {
  stats:
    | {
        totalRewardsSentWei?: string
        totalDonationsWei?: string
      }
    | undefined
  isLoading: boolean
  isError: boolean
  resolvedTheme?: string
}

function PieRewardSourceChart({
  stats,
  isLoading,
  isError,
  resolvedTheme,
}: PieRewardSourceChartProps) {
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>There was an error loading this chart.</div>
  if (!stats) return null

  const totalRewardsETH = toFixedNoTrailingZeros(
    weiToEth(stats.totalRewardsSentWei),
    4
  )
  const donationsETH = toFixedNoTrailingZeros(
    weiToEth(stats.totalDonationsWei),
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

  const COLORS = ['#FFB900', resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'] // Ensure to handle potentially undefined resolvedTheme

  return (
    <div>
      <h2 className={styles.chartTitle}>Total Rewards Source Distribution</h2>
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
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieRewardSourceChart
