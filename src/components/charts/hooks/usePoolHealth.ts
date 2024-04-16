import { AllBlocksData } from '../types';
import { useMemo } from 'react';
import { getSlotUnixTime } from '@/utils/slotsTime';
import { toFixedNoTrailingZeros } from '@/utils/decimals';

export function usePoolHealth(allBlocks: AllBlocksData | undefined) {
    return useMemo(() => {
        if (!allBlocks) return 0;

        const now = Date.now();
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        const lastWeekBlocks = allBlocks.filter((block) => {
            const blockTime = getSlotUnixTime(block.slot) * 1000;
            return blockTime >= sevenDaysAgo;
        });

        const okPoolProposals = lastWeekBlocks.filter(
            (block) => block.blockType === 'okpoolproposal'
        ).length;
        const totalBlocks = lastWeekBlocks.length;

        const percentage =
            totalBlocks > 0 ? (okPoolProposals / totalBlocks) * 100 : 0;
        return toFixedNoTrailingZeros(percentage, 2);
    }, [allBlocks]);
}
