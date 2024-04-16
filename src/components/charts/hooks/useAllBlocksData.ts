import { useQuery } from '@tanstack/react-query';
import { fetchAllBlocks } from '@/client/api/queryFunctions';

export function useAllBlocksData() {
    const {
        data: allBlocks,
        isLoading: isLoadingAllBlocks,
        isError: isErrorAllBlocks,
    } = useQuery({
        queryKey: ['allblocks'],
        queryFn: fetchAllBlocks,
    })

    return { allBlocks, isLoadingAllBlocks, isErrorAllBlocks }
}

