import { MyRewards } from '../cards/MyRewards'
import { MyValidatorsTable } from '../tables/MyValidatorsTable'
import { Warnings } from '../tables/MyValidatorsTable/components/WarningIcon'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccount, useNetwork } from 'wagmi'
import { weiToEth } from '@/utils/web3'
import {
  fetchOnChainProof,
  fetchStatus,
  fetchValidatorsByDepositor,
  validateServerStatus,
} from '@/client/api/queryFunctions'

export function UserInfo() {
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()

  const validatorsQuery = useQuery({
    queryKey: ['user-validators', address],
    queryFn: () => fetchValidatorsByDepositor(address),
    enabled: !!address,
  })
  const onChainProofQuery = useQuery({
    queryKey: ['onchain-proof', address],
    queryFn: () => fetchOnChainProof(address),
    enabled: !!address,
  })

  const statusQuery = useQuery(['status'], fetchStatus)

  const serverStatus = useQuery(['serverStatus'], validateServerStatus)

  const totalAccumulatedRewards = weiToEth(
    onChainProofQuery.data?.totalAccumulatedRewardsWei
  )
  const claimableRewards = weiToEth(onChainProofQuery.data?.claimableRewardsWei)
  const pendingRewards = weiToEth(onChainProofQuery.data?.pendingRewardsWei)

  const setWarning = (status: string) => {
    switch (status) {
      case 'yellowcard':
        return 'yellow'
      case 'redcard':
        return 'red'
      case 'banned':
        return 'banned'
      default:
        return 'none'
    }
  }

  const memoizedTableData = useMemo(
    () =>
      validatorsQuery.data
        ? validatorsQuery.data.map(
            ({
              status,
              validatorKey,
              validatorIndex,
              pendingRewardsWei,
              accumulatedRewardsWei,
            }) => ({
              address: validatorKey as `0x${string}`,
              pending: weiToEth(pendingRewardsWei || 0),
              accumulated: weiToEth(accumulatedRewardsWei || 0),
              subscribed: ['active', 'yellowcard', 'redcard'].includes(status),
              validatorId: validatorIndex,
              validatorKey: validatorKey as `0x${string}`,
              warning: setWarning(status) as Warnings, // Adjust the type here
              checkbox: false,
            })
          )
        : [],
    [validatorsQuery.data]
  )

  return (
    <div className="mt-8 grid w-full grid-cols-1 gap-4 overflow-hidden sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
      <div className="order-1 col-span-4 sm:order-1 sm:col-span-2 lg:col-span-3">
        <MyValidatorsTable
          data={memoizedTableData}
          isConnected={isConnected}
          isLoading={validatorsQuery.isLoading}
          serverError={validatorsQuery.isError || !serverStatus.data?.ready}
        />
      </div>
      <div className="col-span-4 sm:order-2 sm:col-span-1">
        <MyRewards
          claimableRewards={claimableRewards}
          isLoading={!serverStatus.data?.ready || !isConnected}
          nextCheckpoint={statusQuery.data?.nextCheckpointRemainingUnix}
          pendingRewards={pendingRewards}
          totalAccumulatedRewards={totalAccumulatedRewards}
          isDisabled={
            onChainProofQuery.isLoading ||
            onChainProofQuery.isError ||
            onChainProofQuery.data?.claimableRewardsWei === '0' ||
            chain?.unsupported
          }
        />
      </div>
    </div>
  )
}
