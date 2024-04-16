import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProposedBlocks } from '@/client/api/queryFunctions';
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { weiToEth } from '@/utils/web3';

export function useProposedBlocksData(avgBlockRewardWei: string | undefined) {
    const {
        data: proposedBlocks,
        isLoading: isLoadingProposedBlocks,
        isError: isErrorProposedBlocks,
    } = useQuery({
        queryKey: ['proposedblocks'],
        queryFn: fetchProposedBlocks,
    })

    // useMemo to arrange blocks into sorted blocks by reward and compute median and average rewards
    const { sortedBlocks, medianReward, averageReward } = useMemo(() => {
        // Guard checks to ensure necessary data is available
        if (!proposedBlocks || !avgBlockRewardWei)
            return { sortedBlocks: [], medianReward: 0, averageReward: 0 }

        // Transform proposed blocks into rewards in ETH
        const rewardsInEth = proposedBlocks.map((block) =>
            weiToEth(block.rewardWei)
        )
        // Sort rewards to calculate median
        const sortedRewards = [...rewardsInEth].sort((a, b) => a - b)
        const mid = Math.floor(sortedRewards.length / 2)
        const median =
            sortedRewards.length % 2 !== 0
                ? sortedRewards[mid]
                : (sortedRewards[mid - 1] + sortedRewards[mid]) / 2
        // Calculate average reward
        const average = weiToEth(avgBlockRewardWei)

        // Map proposed blocks to include only necessary data
        const sortedBlocksData = [...proposedBlocks]
            .sort((a, b) => parseFloat(b.rewardWei) - parseFloat(a.rewardWei))
            .map((block) => ({
                blockNumber: block.block,
                rewardEth: toFixedNoTrailingZeros(weiToEth(block.rewardWei), 4),
            }))

        return {
            sortedBlocks: sortedBlocksData,
            medianReward: toFixedNoTrailingZeros(median, 4),
            averageReward: toFixedNoTrailingZeros(average, 4),
        }
    }, [avgBlockRewardWei, proposedBlocks])

    return { proposedBlocks, sortedBlocks, medianReward, averageReward, isLoadingProposedBlocks, isErrorProposedBlocks };
}