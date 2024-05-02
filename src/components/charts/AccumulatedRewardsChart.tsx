import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { weiToEth } from '@/utils/web3';
import { toFixedNoTrailingZeros } from '@/utils/decimals';
import CustomTooltip from '@/components/common/ChartsTooltip';
import styles from '@/styles/stats.module.css';
import { getSlotUnixTime } from '@/utils/slotsTime';
import type { ProposedBlock } from '@/components/charts/types';

interface AccumulatedRewardsChartProps {
  proposedBlocks?: ProposedBlock[];
  isLoading: boolean;
  isError: boolean;
  resolvedTheme?: string;
}

function AccumulatedRewardsChart({
  proposedBlocks,
  isLoading,
  isError,
  resolvedTheme,
}: AccumulatedRewardsChartProps) {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There was an error loading this chart.</div>;
  if (!proposedBlocks || proposedBlocks.length === 0) return null;

  proposedBlocks.sort((a, b) => getSlotUnixTime(a.slot) - getSlotUnixTime(b.slot));

  const startDate = new Date(getSlotUnixTime(proposedBlocks[0].slot) * 1000);
  const endDate = new Date(getSlotUnixTime(proposedBlocks[proposedBlocks.length - 1].slot) * 1000);
  const dateLabels: string[] = [];
  const rewardsPerDay: Record<string, number> = {};

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const formattedDate = d.toISOString().slice(0, 10);
    dateLabels.push(formattedDate);
    rewardsPerDay[formattedDate] = 0;  // Initialize daily rewards to zero
  }

  proposedBlocks.forEach((block) => {
    const blockDate = new Date(getSlotUnixTime(block.slot) * 1000).toISOString().slice(0, 10);
    rewardsPerDay[blockDate] += weiToEth(block.rewardWei);
  });

  let accumulatedRewards = 0;
  const formattedData = dateLabels.map(date => {
    accumulatedRewards += rewardsPerDay[date];
    return {
      date,
      totalEthFromBlocks: toFixedNoTrailingZeros(accumulatedRewards, 4),
    };
  });

  return (
    <div>
      <h2 className={styles.chartTitle}>Accumulated ETH From Proposals</h2>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={formattedData}>
          <CartesianGrid strokeDasharray=" 3" />
          <XAxis 
          angle={-15}
          dataKey="date"
          name="Day"
          tick={{ fontSize: 12, dy: 8 }}
           />
          <YAxis 
          label={{
            value: `Total ETH`,
            style: { textAnchor: 'middle' },
            angle: -90,
            position: 'left',
            offset: -5,
          }}/>
          <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
          <Area type="monotone" dataKey="totalEthFromBlocks" stroke="#8884d8" fillOpacity={1} fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AccumulatedRewardsChart;
