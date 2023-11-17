import { AverageCard } from '.';
import { BigNumber } from 'ethers';

interface AverageRewardsCardProps {
  isLoading: boolean
  isError: boolean
  rewardsPerValidatorPer30daysWei: string | undefined
  poolFeesPercent: number | undefined;
}

export function AverageRewardsCard({
  isLoading,
  isError,
  rewardsPerValidatorPer30daysWei,
  poolFeesPercent
}: AverageRewardsCardProps) {

  let adjustedPoolFeesPercent = poolFeesPercent;

  let adjustedRewardsWei = rewardsPerValidatorPer30daysWei;

  if (adjustedPoolFeesPercent !== undefined && rewardsPerValidatorPer30daysWei !== undefined) {
    adjustedPoolFeesPercent /= 100; // Convert to a decimal

    // Convert rewardsPerValidatorPer30daysWei to a BigNumber
    const rewardsWeiBigNumber = BigNumber.from(rewardsPerValidatorPer30daysWei);

    // Calculate the fee amount (multiply rewards by the fee percent and divide by 100)
    const feeAmount = rewardsWeiBigNumber.mul(adjustedPoolFeesPercent).div(100);

    // Subtract the fee amount from the original rewards
    adjustedRewardsWei = rewardsWeiBigNumber.sub(feeAmount).toString();
  } else {
    adjustedRewardsWei = undefined;
  }

  return (
    <AverageCard
      ethRewardWei={adjustedRewardsWei}
      isError={isError}
      isLoading={isLoading}
      title="Validator's Monthly Rewards"
      tooltip="Smooth Validator Average Rewards for the Past 30 Days"
    />
  )
}
