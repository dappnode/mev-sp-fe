import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from '@/components/common/ChartsTooltip';
import styles from '@/styles/stats.module.css';

interface PoolHealthChartProps {
    poolHealthPercentage: number;
    isLoading: boolean;
    isError: boolean;
    resolvedTheme?: string;
}

function PoolHealthChart(props: PoolHealthChartProps) {
    const { poolHealthPercentage, isLoading, isError, resolvedTheme } = props;

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an error loading this chart.</div>;
    if (poolHealthPercentage === null) return null;

    const poolHealthFormatted = parseFloat(poolHealthPercentage.toFixed(2));
    const missedOrWrongFormatted = parseFloat((100 - poolHealthPercentage).toFixed(2));

    const data = [
        { name: ' % Successful Proposals', value: poolHealthFormatted },
        { name: ' % Missed or Wrong proposals', value: missedOrWrongFormatted },
    ];

    const COLORS = [resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC', '#FFBB28']; // Color for pool health and the remaining part

    return (
        <div>
            <h2 className={styles.chartTitle}>Smooth Health Last 7 days</h2>
            <ResponsiveContainer height={100} width="100%">
                <PieChart margin={{ bottom: 0 }}>
                    <Pie
                        cx="50%"
                        cy="90%"
                        data={data}
                        dataKey="value"
                        endAngle={0}
                        fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
                        innerRadius={47}
                        nameKey="name"
                        outerRadius={70}
                        startAngle={180}>
                        {data.map((entry) => (
                            <Cell
                                key={entry.name} // Use a unique identifier (name) as the key
                                fill={COLORS[data.indexOf(entry) % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
                    <Legend height={20} verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PoolHealthChart;
