import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import CustomTooltip from '@/components/common/ChartsTooltip'
import styles from '@/styles/stats.module.css'

interface TotalSmoothProposalsChartProps {
  stats:
    | {
        totalProposedBlocks?: number
        totalWrongfeeBlocks?: number
        totalMissedBlocks?: number
      }
    | undefined
  isLoading: boolean
  isError: boolean
  resolvedTheme?: string
}

function TotalSmoothProposalsChart(props: TotalSmoothProposalsChartProps) {
  const { stats, isLoading, isError, resolvedTheme } = props

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>There was an error loading this chart.</div>
  if (!stats) return null

  // Prepare the data within the component
  const data = [
    { blocks: stats.totalProposedBlocks ?? 0, name: 'Proposed' },
    { blocks: stats.totalWrongfeeBlocks ?? 0, name: 'Wrong Fee' },
    { blocks: stats.totalMissedBlocks ?? 0, name: 'Missed' },
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
          <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
          <Bar
            dataKey="blocks"
            fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TotalSmoothProposalsChart
