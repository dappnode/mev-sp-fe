import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '@/components/common/ChartsTooltip';
import styles from '@/styles/stats.module.css';

interface ValidatorsStatusChartProps {
    validatorStatuses: {
        name: string;
        count: number;
    }[];
    isLoading: boolean;
    isError: boolean;
    resolvedTheme?: string;
}

function ValidatorsStatusChart({ validatorStatuses, isLoading, isError, resolvedTheme }: ValidatorsStatusChartProps) {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an error loading this chart.</div>;
    if (!validatorStatuses.length) return null;

    return (
        <div>
            <h2 className={styles.chartTitle}>Total Unhealthy Smooth Validators</h2>
            <ResponsiveContainer height={300} width="100%">
                <BarChart
                    data={validatorStatuses}
                    layout="vertical" // Set the layout to vertical for a horizontal bar chart
                    margin={{ bottom: 5, left: 20, right: 30, top: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip content={<CustomTooltip {...{ resolvedTheme }} />} />
                    <Bar
                        barSize={20}
                        dataKey="count"
                        fill={resolvedTheme === 'dark' ? '#6B21A8' : '#C084FC'}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ValidatorsStatusChart;
