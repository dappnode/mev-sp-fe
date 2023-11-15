import { LatestBlocksTable } from '../tables/LatestBlocksTable'
import { useQuery } from '@tanstack/react-query'
import type { Block } from '@/components/tables/types'
import { fetchAllBlocks } from '@/client/api/queryFunctions'
import { weiToEth } from '@/utils/web3'
import { SELECTED_CHAIN } from '@/utils/config'

export function LatestBlocksSP() {
  const { data, isLoading } = useQuery({
    queryKey: ['latest-blocks'],
    queryFn: fetchAllBlocks,
  })

  let blocks: Block[] = []

  if (data) {
    blocks = data.map(
      ({
        slot,
        withdrawalAddress,
        validatorKey,
        validatorIndex,
        rewardType,
        rewardWei,
        blockType,
      }) => ({
        blockType,
        slot,
        proposer: {
          withdrawalAddress: withdrawalAddress as `0x${string}`,
          validatorKey: validatorKey as `0x${string}`,
          validatorIndex: validatorIndex as number,
        },
        rewardType,
        reward: weiToEth(rewardWei),
      })
    )
  }

  return (
    <div className="mt-8">
      <LatestBlocksTable
        blockExplorerUrl={
          SELECTED_CHAIN === 'mainnet'
            ? 'https://beaconcha.in'
            : 'https://prater.beaconcha.in'
        }
        data={blocks}
        isLoading={isLoading}
      />
    </div>
  )
}
