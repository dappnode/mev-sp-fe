import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from '@/components/common/ChartsTooltip';
import styles from '@/styles/stats.module.css';
import { weiToEth } from '@/utils/web3'; 
import { toFixedNoTrailingZeros } from '@/utils/decimals';
import type { ProposedBlock } from '@/components/charts/types';

interface RewardDistributionBucketChartProps {
    proposedBlocks?: ProposedBlock[];
    isLoading: boolean;
    isError: boolean;
    resolvedTheme?: string;
}

function RewardDistributionBucketChart({
    isError,
    isLoading,
    proposedBlocks,
    resolvedTheme
}: RewardDistributionBucketChartProps) {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an error loading this chart.</div>;
    if (!proposedBlocks) return null;

    const rewardValueBuckets = [
        { range: '> 10 ETH', min: 10, max: Infinity },
        { range: '10 - 1 ETH', min: 1, max: 10 },
        { range: '1 - 0.1 ETH', min: 0.1, max: 1 },
        { range: '0.1 - 0.01 ETH', min: 0.01, max: 0.1 },
        { range: '< 0.01 ETH', min: 0, max: 0.01 },
    ];

    const bucketCounts = rewardValueBuckets.map(() => 0);
    const bucketSums = rewardValueBuckets.map(() => 0);

    proposedBlocks.forEach(block => {
        const rewardEth = weiToEth(block.rewardWei);
        rewardValueBuckets.forEach((bucket, index) => {
            if (rewardEth >= bucket.min && rewardEth < bucket.max) {
                bucketCounts[index] += 1;
                bucketSums[index] += rewardEth;
            }
        });
    });

    const data = rewardValueBuckets.map((bucket, index) => ({
        range: bucket.range,
        blocks: bucketCounts[index],
        sum: toFixedNoTrailingZeros(bucketSums[index], 4),
    }));
    const maxSum = Math.max(...bucketSums);

    return (
        <div>
            <h2 className={styles.chartTitle}>Proposed MEV Block Distribution by Ranges</h2>
            <ResponsiveContainer height={350} width="100%">
                <ComposedChart data={data} margin={{ bottom: 35, left: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis yAxisId="left" />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, Math.ceil(maxSum)]}
                        label={{ value: 'Total ETH', angle: -90, position: 'right', offset: -10 }}
                    />
                    <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
                    <Legend verticalAlign="top" height={20} />
                    <Bar yAxisId="left" dataKey="blocks" fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'} name="Amount of blocks" />
                    <Line yAxisId="right" dataKey="sum" type="monotone" stroke="#FFB900" name="Total ETH" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RewardDistributionBucketChart;
