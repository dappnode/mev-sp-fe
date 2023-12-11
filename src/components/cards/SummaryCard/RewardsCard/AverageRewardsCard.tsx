import { AverageCard } from '.';
import { BigNumber } from 'ethers';

interface AverageRewardsCardProps {
  isLoading: boolean
  isError: boolean
  avgBlockRewardWei: string | undefined
  poolFeesPercent: number | undefined;
}

export function AverageRewardsCard({
  isLoading,
  isError,
  avgBlockRewardWei,
  poolFeesPercent
}: AverageRewardsCardProps) {

  let adjustedPoolFeesPercent = poolFeesPercent;

  let adjustedRewardsWei = avgBlockRewardWei;

  if (adjustedPoolFeesPercent !== undefined && avgBlockRewardWei !== undefined) {
    adjustedPoolFeesPercent /= 100; // Convert to a decimal
    // Convert rewardsPerValidatorPer30daysWei to a BigNumber
    const rewardsWeiBigNumber = BigNumber.from(avgBlockRewardWei);
    // Calculate the fee amount (multiply rewards by the fee percent and divide by 100)
    const feeAmount = rewardsWeiBigNumber.mul(adjustedPoolFeesPercent).div(100);

    const rewards = rewardsWeiBigNumber.sub(feeAmount).mul(3).div(12).toString();
    // Subtract the fee amount from the original rewards
    adjustedRewardsWei = rewards;
    
  } else {
    adjustedRewardsWei = undefined;
  }

  return (
    <AverageCard
      ethRewardWei={adjustedRewardsWei}
      isError={isError}
      isLoading={isLoading}
      title="Expected Monthly Rewards"
      tooltip="Expected Validator Rewards per Month"
    />
  )
}
