import { SummaryCard, SummaryCardProps } from '..'
import { FaEthereum } from 'react-icons/fa'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

interface TotalSStakedEthCardProps
  extends Pick<SummaryCardProps, 'isError' | 'isLoading'> {
  subscribers: number | undefined
  totalStakedEth: number | undefined
}

export function TotalStakedEthCard({
  isError,
  isLoading,
  totalStakedEth,
  subscribers,
}: TotalSStakedEthCardProps) {
  const ethPerValidator =
    totalStakedEth && subscribers ? totalStakedEth / subscribers : 0

  return (
    <SummaryCard
      bottomLeftText={`${subscribers} Validators (Avg: ${toFixedNoTrailingZeros(
        ethPerValidator,
        2
      )} ETH)`}
      isError={isError}
      isLoading={isLoading}
      title="Total Staked ETH"
      tooltip="Total Staked ETH among all Validators subscribed to the Pool">
      <div className="flex items-center text-DAppDeep dark:text-DAppDarkText">
        <FaEthereum className="mr-2 h-[24px] w-[14px] text-DAppDeep dark:text-DAppDarkText" />
        <div className="flex items-baseline">
          <h4 className="mr-1 text-2xl font-bold leading-8">
            {toFixedNoTrailingZeros(totalStakedEth || NaN, 2)}
          </h4>
          <h5 className="text-lg font-normal leading-6 text-DAppGray">ETH</h5>
        </div>
      </div>
    </SummaryCard>
  )
}
