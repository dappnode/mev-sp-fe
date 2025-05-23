import { LatestDonationsTable } from '../tables/LatestDonationsTable'
import { useQuery } from '@tanstack/react-query'
import type { Donation } from '@/components/tables/types'
import { fetchAllDonations } from '@/client/api/queryFunctions'
import { weiToEth } from '@/utils/web3'
import { SELECTED_CHAIN } from '@/utils/config'

export function LatestDonationsSP() {
  const { data, isLoading } = useQuery({
    queryKey: ['latest-donations'],
    queryFn: fetchAllDonations,
  })
  let donations: Donation[] = []

  if (data) {
    donations = data.map(({ amountWei, sender, txHash, blockNumber }) => ({
      txHash,
      sender,
      reward: weiToEth(amountWei),
      blockNumber,
    }))
  }

  return (
    <div className="mt-8">
      <LatestDonationsTable
        data={donations}
        isLoading={isLoading}
        blockExplorerUrl={
          SELECTED_CHAIN === 'mainnet'
            ? 'https://eth.blockscout.com'
            : 'https://eth-hoodi.blockscout.com'
        }
      />
    </div>
  )
}
