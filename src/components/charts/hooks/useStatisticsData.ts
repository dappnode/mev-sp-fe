import { useQuery } from '@tanstack/react-query';
import { fetchStatistics } from '@/client/api/queryFunctions';

export function useStatisticsData() {
    const {
        data: stats,
        isLoading: isLoadingStats,
        isError: isErrorStats,
    } = useQuery({
        queryKey: ['statistics'],
        queryFn: fetchStatistics,
    });

    return { stats, isLoadingStats, isErrorStats };
}