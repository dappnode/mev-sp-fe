import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '@/components/common/ChartsTooltip';
import styles from '@/styles/stats.module.css';

interface MedianVsAverageBarChartProps {
    medianReward: number;
    averageReward: number;
    isLoading: boolean;
    isError: boolean;
    resolvedTheme?: string;
}

function MedianVsAverageBarChart({
    medianReward,
    averageReward,
    isLoading,
    isError,
    resolvedTheme
}: MedianVsAverageBarChartProps) {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an error loading this chart.</div>;

    // Data for the bar chart
    const data = [
        { name: 'Median', value: medianReward },
        { name: 'Average', value: averageReward },
    ];

    // Determine the color based on the theme
    const barColor = resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC';

    return (
        <div>
            <h2 className={styles.chartTitle}>
                Smooth Median vs Average Block Rewards (ETH)
            </h2>
            <ResponsiveContainer height={250} width="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'ETH', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
                    <Bar
                        barSize={50}
                        dataKey="value"
                        fill={barColor}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MedianVsAverageBarChart;
