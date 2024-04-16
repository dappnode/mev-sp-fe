import React from 'react'
import styles from '@/styles/stats.module.css'

interface SmoothSubsChartProps {
  totalSubs?: number
  isLoading: boolean
  isError: boolean
}

function SmoothSubsChart({
  totalSubs,
  isLoading,
  isError,
}: SmoothSubsChartProps) {
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>There was an error loading this chart.</div>
  if (totalSubs === undefined) return null

  return (
    <div>
      <h2 className={styles.chartTitle}>Total Subscribed Validators</h2>
      <div className={styles.numberGraph}>{totalSubs}</div>
    </div>
  )
}

export default SmoothSubsChart
