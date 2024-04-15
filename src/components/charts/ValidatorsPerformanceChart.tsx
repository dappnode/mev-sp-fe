import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from '@/components/common/ChartsTooltip';
import styles from '@/styles/stats.module.css';

interface ValidatorsPerformanceChartProps {
    validatorData: {
        validatorIndex: number;
        totalRewardsEth: number;
        blockCount: number;
    }[];
    isLoading: boolean;
    isError: boolean;
    resolvedTheme?: string;
}

function ValidatorsPerformanceChart({
    validatorData,
    isLoading,
    isError,
    resolvedTheme
}: ValidatorsPerformanceChartProps) {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an error loading this chart.</div>;
    if (!validatorData.length) return null;

    return (
        <div>
            <h2 className={styles.chartTitle}>Smooth Top Validators by Rewards Shared</h2>
            <ResponsiveContainer height={300} width="100%">
                <ComposedChart data={validatorData} margin={{ bottom: 25, left: 0, right: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        angle={-45}
                        dataKey="validatorIndex"
                        name="Validator Index"
                        tick={{ fontSize: 11, dy: 12 }}
                    />
                    <YAxis
                        yAxisId="left"
                        label={{
                            angle: -90,
                            position: 'insideLeft',
                            offset: 15,
                            style: { textAnchor: 'middle' },
                            value: 'Total Rewards Shared (ETH)',
                        }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#FFB900"
                        label={{
                            angle: -90,
                            position: 'insideRight',
                            offset: 20,
                            style: { textAnchor: 'middle' },
                            value: 'Number of Blocks Proposed',
                        }}
                    />
                    <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
                    <Bar
                        yAxisId="left"
                        dataKey="totalRewardsEth"
                        fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
                        name="Total Rewards (ETH)"
                    />
                    <Line
                        yAxisId="right"
                        dataKey="blockCount"
                        name="Number of Blocks"
                        stroke="#FFB900"
                    />
                    <Legend height={30} verticalAlign="top" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ValidatorsPerformanceChart;
