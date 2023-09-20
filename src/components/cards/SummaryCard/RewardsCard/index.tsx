import { SummaryCard, type SummaryCardProps } from '..'
import { FaEthereum } from 'react-icons/fa'
import { weiToEth } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

// Define the interface for the RewardsCardProps
interface RewardsCardProps
  extends Omit<
    SummaryCardProps,
    'children' | 'bottomLeftText' | 'bottomRightText'
  > {
  ethRewardWei: string | undefined;
  secondaryRewardTitle: string;
  secondaryRewardWei: string | undefined;
}

// Define the RewardsCard component
export function RewardsCard({
  isError,
  isLoading,
  title,
  secondaryRewardTitle,
  secondaryRewardWei,
  tooltip,
  ethRewardWei,
}: RewardsCardProps) {
  const ethReward = weiToEth(ethRewardWei);
  const secondaryReward = weiToEth(secondaryRewardWei);

  return (
    <SummaryCard
      bottomLeftText={secondaryRewardTitle}
      bottomRightText={`${toFixedNoTrailingZeros(secondaryReward, 4)} ETH`}
      isError={isError}
      isLoading={isLoading}
      title={title}
      tooltip={tooltip}
    >
      <div className="flex items-center">
        <FaEthereum className="mr-2 h-[24px] w-[14px] text-DAppDeep" />
        <div className="flex items-baseline">
          <h4 className="mr-1 text-2xl font-bold leading-8 text-DAppDeep">
            {toFixedNoTrailingZeros(ethReward, 4)}
          </h4>
          <h5 className="text-lg font-normal leading-6 text-DAppGray">ETH</h5>
        </div>
      </div>
    </SummaryCard>
  );
}

// Define the interface for the AverageCardProps
interface AverageCardProps
  extends Omit<
    SummaryCardProps,
    'children' | 'bottomLeftText' | 'bottomRightText' | 'secondaryRewardTitle' | 'secondaryRewardWei'
  > {
  ethRewardWei: string | undefined;
}

// Create the AverageCard component
export function AverageCard({
  isError,
  isLoading,
  title,
  tooltip,
  ethRewardWei,
}: AverageCardProps) {
  const ethReward = weiToEth(ethRewardWei);

  return (
    <SummaryCard
      bottomLeftText=""
      bottomRightText=""
      isError={isError}
      isLoading={isLoading}
      title={title}
      tooltip={tooltip}
    >
      <div className="flex items-center">
        <FaEthereum className="mr-2 h-[24px] w-[14px] text-DAppDeep" />
        <div className="flex items-baseline">
          <h4 className="mr-1 text-2xl font-bold leading-8 text-DAppDeep">
            {toFixedNoTrailingZeros(ethReward, 4)}
          </h4>
          <h5 className="text-lg font-normal leading-6 text-DAppGray">ETH</h5>
        </div>
      </div>
    </SummaryCard>
  );
}
