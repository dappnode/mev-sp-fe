import { AverageCard } from '.'

interface AverageRewardsCardProps {
  isLoading: boolean
  isError: boolean
  rewardsPerValidatorPer30daysWei: string | undefined
  poolFeesPercent: number | undefined
}

export function AverageRewardsCard({
  isLoading,
  isError,
  rewardsPerValidatorPer30daysWei,
  poolFeesPercent
}: AverageRewardsCardProps) {
  let adjustedPoolFeesPercent = poolFeesPercent;

  if (adjustedPoolFeesPercent !== undefined) {
    // poolFeesPercent is multiplied x 100 in the backend, so 1000 = 10%, this is 
    // because the oracle doesnt want to deal with decimals.
    // We assume poolFeesPercent will never be 0.
    adjustedPoolFeesPercent /= 100;
  } else {
    adjustedPoolFeesPercent = NaN;
  }

  return (
    <AverageCard
      ethRewardWei={rewardsPerValidatorPer30daysWei}
      isError={isError}
      isLoading={isLoading}
      poolFeeTitle="Smooth Fee"
      poolFeesPercent={adjustedPoolFeesPercent}
      title="Validator's Monthly Rewards"
      tooltip="Smooth Validator Average Rewards for the Past 30 Days"
    />
  )
}
