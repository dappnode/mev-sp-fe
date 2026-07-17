import { AverageCard } from '.';
import { BigNumber } from 'ethers';

// The card states its figure per 32 ETH of stake, so a standard
// (non-consolidated) validator maps to exactly one unit.
const THIRTY_TWO_ETH_GWEI = BigNumber.from('32000000000');

interface AverageRewardsCardProps {
  isLoading: boolean
  isError: boolean
  totalRewardsSent30daysWei: string | undefined
  totalEffectiveBalanceGwei: string | undefined
  poolFeesPercent: number | undefined;
}

export function AverageRewardsCard({
  isLoading,
  isError,
  totalRewardsSent30daysWei,
  totalEffectiveBalanceGwei,
  poolFeesPercent
}: AverageRewardsCardProps) {

  let adjustedPoolFeesPercent = poolFeesPercent;

  let adjustedRewardsWei: string | undefined;

  if (
    poolFeesPercent !== undefined &&
    totalRewardsSent30daysWei !== undefined &&
    totalEffectiveBalanceGwei !== undefined
  ) {
    // poolFeesPercent is scaled by 10000 onchain. Only the display needs the
    // human percent; the reward math below stays integer to avoid BigNumber
    // rejecting a fractional multiplier.
    adjustedPoolFeesPercent = poolFeesPercent / 100;

    const totalEffectiveBalance = BigNumber.from(totalEffectiveBalanceGwei);

    if (totalEffectiveBalance.isZero()) {
      adjustedRewardsWei = undefined;
    } else {
      // Since the Electra fork the oracle splits every reward in proportion to
      // effective balance, so 32 ETH of stake earns 32 / totalEffectiveBalance
      // of whatever the pool takes in. The last 30 days is the projection basis:
      // it tracks current MEV conditions and needs no assumed blocks-per-year.
      adjustedRewardsWei = BigNumber.from(totalRewardsSent30daysWei)
        .mul(THIRTY_TWO_ETH_GWEI)
        .div(totalEffectiveBalance)
        .mul(10000 - poolFeesPercent)
        .div(10000)
        .toString();
    }
  } else {
    adjustedRewardsWei = undefined;
  }

  return (
    <AverageCard
      ethRewardWei={adjustedRewardsWei}
      isError={isError}
      isLoading={isLoading}
      title="Expected Monthly Rewards"
      adjustedPoolFeesPercent={adjustedPoolFeesPercent}
      tooltip="Expected rewards per month for every 32 ETH of stake, based on what the pool received over the last 30 days"
    />
  )
}
