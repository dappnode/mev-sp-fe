import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '@/components/common/ChartsTooltip';
import { weiToEth } from '@/utils/web3';
import { toFixedNoTrailingZeros } from '@/utils/decimals';
import { getSlotUnixTime } from '@/utils/slotsTime';
import styles from '@/styles/stats.module.css';
import type { ProposedBlock } from '@/components/charts/types';

interface TopBlocksLast7DaysChartProps {
    proposedBlocks?: ProposedBlock[];
    isLoading: boolean;
    isError: boolean;
    resolvedTheme?: string;
}

function TopBlocksLast7DaysChart({ proposedBlocks, isLoading, isError, resolvedTheme }: TopBlocksLast7DaysChartProps) {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an error loading this chart.</div>;
    if (!proposedBlocks) return null;

    const now = new Date();
    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime() / 1000;
    const last7DaysBlocks = proposedBlocks
        .filter((block) => getSlotUnixTime(block.slot) >= sevenDaysAgo)
        .map((block) => ({
            ...block,
            rewardEth: weiToEth(block.rewardWei),
        }))
        .sort((a, b) => b.rewardEth - a.rewardEth)
        .slice(0, 10);

    const formattedBlocks = last7DaysBlocks.map((block) => ({
        name: `${block.block}`,
        reward: toFixedNoTrailingZeros(block.rewardEth, 4),
        blockNumber: block.block,
    }));

    const handleBarClick = (data: { blockNumber: number }) => {
        if (data.blockNumber) {
            window.open(`https://beaconcha.in/block/${data.blockNumber}`, '_blank');
        }
    };

    return (
        <div>
            <h2 className={styles.chartTitle}>Biggest 10 Blocks Last 7 Days</h2>
            <ResponsiveContainer height={400} width="100%">
                <BarChart
                    data={formattedBlocks}
                    layout="vertical"
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
                    <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
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
    );
}

export default TopBlocksLast7DaysChart;
