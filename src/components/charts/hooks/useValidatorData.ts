import { ProposedBlocks } from '../types';
import { useMemo } from 'react';
import { weiToEth } from '@/utils/web3';
import { toFixedNoTrailingZeros } from '@/utils/decimals';

interface ValidatorStats {
    [index: number]: {
        totalRewards: bigint;
        blockCount: number;
    };
}

interface ValidatorData {
    validatorIndex: number;
    totalRewardsEth: number;
    blockCount: number;
}

export function useValidatorData(proposedBlocks: ProposedBlocks | undefined) {
    return useMemo(() => {
        if (!proposedBlocks) return { validatorData: [] };

        const validatorStats: ValidatorStats = {};
        proposedBlocks.forEach((block) => {
            const index = block.validatorIndex;
            if (validatorStats[index]) {
                validatorStats[index].totalRewards += BigInt(block.rewardWei);
                validatorStats[index].blockCount += 1;
            } else {
                validatorStats[index] = {
                    totalRewards: BigInt(block.rewardWei),
                    blockCount: 1,
                };
            }
        });

        const sortedValidators: ValidatorData[] = Object.keys(validatorStats)
            .map((key) => {
                const index = parseInt(key, 10);
                return {
                    validatorIndex: index,
                    totalRewardsEth: toFixedNoTrailingZeros(
                        weiToEth(validatorStats[index].totalRewards.toString()),
                        4
                    ),
                    blockCount: validatorStats[index].blockCount,
                };
            })
            .sort((a, b) => b.totalRewardsEth - a.totalRewardsEth)
            .slice(0, 10);

        return { validatorData: sortedValidators };
    }, [proposedBlocks]);
}
