import React from 'react'

interface SmoothChartProps {
  ChartComponent: () => JSX.Element
  isLoading: boolean
  isError: boolean
}

function SmoothChart({ ChartComponent, isLoading, isError }: SmoothChartProps) {
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>There was an error loading this chart.</div>

  return <ChartComponent />
}

export default SmoothChart
