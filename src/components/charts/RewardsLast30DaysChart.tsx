import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { weiToEth } from '@/utils/web3'; 
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import CustomTooltip from '@/components/common/ChartsTooltip';
import styles from '@/styles/stats.module.css';
import { getSlotUnixTime } from '@/utils/slotsTime';
import type { ProposedBlock } from '@/components/charts/types'; 

interface RewardsLast30DaysChartProps {
    proposedBlocks?: ProposedBlock[];
    isLoading: boolean;
    isError: boolean;
    resolvedTheme?: string;
}

function RewardsLast30DaysChart({ proposedBlocks, isLoading, isError, resolvedTheme }: RewardsLast30DaysChartProps) {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an error loading this chart.</div>;
    if (!proposedBlocks) return null;

    // Get current date (defaults to local timezone of users browser)
    const now = new Date();
    // Calculate date labels for the last 30 days (array) in the format MM/DD/YYYY
    const dateLabels = Array.from({ length: 30 }).map((_, index) => {
      const day = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - (29 - index)
      );
      return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(day);
    });

    // Initialize array to store rewards per day
    const rewardsPerDay = Array.from({ length: 30 }, () => 0);

    // Loop through proposed blocks and add rewards to the corresponding day
    proposedBlocks.forEach((block) => {
      // Get UNIX timestamp for the block
      const blockTime = getSlotUnixTime(block.slot);
      // Convert UNIX timestamp to date object
      const blockDate = new Date(blockTime * 1000);
      // Format date object to match date labels
      const blockLabel = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(blockDate);

      // Find the index of the block date in the date labels array. "indexOf" returns -1 if the date is not found.
      const dayIndex = dateLabels.indexOf(blockLabel);
      if (dayIndex !== -1) {
        rewardsPerDay[dayIndex] += weiToEth(block.rewardWei);
      }
    });

    // Format data for the chart
    const formattedData = rewardsPerDay.map((reward, index) => ({
      day: dateLabels[index],
      reward: toFixedNoTrailingZeros(reward, 4),
    }));

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
    );
}

export default RewardsLast30DaysChart;
