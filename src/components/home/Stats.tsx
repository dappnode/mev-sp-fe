/* eslint-disable react/function-component-definition */
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchConfig, fetchProposedBlocks, fetchStatistics } from '@/client/api/queryFunctions'
import { weiToEth } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

const SLOTS_IN_30_DAYS = 30 * 7200
const DAYS_PER_YEAR = 365.25
const THIRTY_TWO_ETH_GWEI = 32_000_000_000

const SIMULATIONS = 20000
const SIMULATION_SEED = 24290

// Deterministic PRNG (Park-Miller) so the headline figure does not jitter
// between reloads.
function seededRandom(seed: number) {
  const MODULUS = 2147483647
  let state = seed % MODULUS
  if (state <= 0) state += MODULUS - 1

  return () => {
    state = (state * 16807) % MODULUS
    return (state - 1) / (MODULUS - 1)
  }
}

/*
 * Median ETH a solo staker takes home in a year.
 *
 * A year of solo proposals is a compound Poisson: a random number of blocks,
 * each worth a random amount drawn from a heavily right-skewed distribution.
 * Its median has no closed form, so sample it. Shortcuts like
 * `medianBlock * blocksPerYear` are not the median of the sum and understate it,
 * which would overstate how far ahead Smooth is.
 */
function medianAnnualSoloEth(blockRewardsEth: number[], blocksPerYear: number) {
  if (!blockRewardsEth.length || blocksPerYear <= 0) return 0

  const random = seededRandom(SIMULATION_SEED)
  const zeroBlockOdds = Math.exp(-blocksPerYear)
  const outcomes = new Float64Array(SIMULATIONS)

  for (let i = 0; i < SIMULATIONS; i += 1) {
    // Knuth's method: draw this year's block count from Poisson(blocksPerYear)
    let blocks = 0
    let p = 1
    for (;;) {
      p *= random()
      if (p <= zeroBlockOdds) break
      blocks += 1
    }

    let yearEth = 0
    for (let b = 0; b < blocks; b += 1) {
      yearEth += blockRewardsEth[Math.floor(random() * blockRewardsEth.length)]
    }
    outcomes[i] = yearEth
  }

  outcomes.sort()
  return outcomes[Math.floor(SIMULATIONS / 2)]
}

export default function Stats() {
  const statisticsQuery = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
  });

  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  });

  const proposedBlocksQuery = useQuery({
    queryKey: ['proposedblocks'],
    queryFn: fetchProposedBlocks,
  });

  // Everything below is derived from the last 30 days. Pool-lifetime averages
  // still carry MEV levels from years ago and overstate today's rewards ~3x.
  const recentRewardsEth = useMemo(() => {
    const proposedBlocks = proposedBlocksQuery.data;
    const latestSlot = statisticsQuery.data?.latestCheckpointSlot;
    if (!proposedBlocks || !latestSlot) return []; // Handle loading or error states

    return proposedBlocks
      .filter(
        (block) =>
          block.blockType === 'okpoolproposal' &&
          block.slot > latestSlot - SLOTS_IN_30_DAYS
      )
      .map((block) => weiToEth(block.rewardWei));
  }, [proposedBlocksQuery.data, statisticsQuery.data?.latestCheckpointSlot]);

  // Since the Electra fork, proposal odds track effective balance, so a block
  // rate is only meaningful per unit of stake, not per validator.
  const blocksPerYearPer32Eth = useMemo(() => {
    const totalEffectiveBalanceGwei = statisticsQuery.data?.totalEffectiveBalanceGwei;
    if (!recentRewardsEth.length || !totalEffectiveBalanceGwei) return 0;

    const stakeShare = THIRTY_TWO_ETH_GWEI / Number(totalEffectiveBalanceGwei);
    return recentRewardsEth.length * (DAYS_PER_YEAR / 30) * stakeShare;
  }, [recentRewardsEth, statisticsQuery.data?.totalEffectiveBalanceGwei]);

  // Solo, you keep only the blocks luck hands you.
  const medianSolo = useMemo(
    () => medianAnnualSoloEth(recentRewardsEth, blocksPerYearPer32Eth),
    [recentRewardsEth, blocksPerYearPer32Eth]
  );

  // In Smooth every 32 ETH of stake earns 32 / totalEffectiveBalance of whatever
  // the pool takes in, whether or not it proposed anything itself.
  const averagePool = useMemo(() => {
    const totalRewardsSent30daysWei = statisticsQuery.data?.totalRewardsSent30daysWei;
    const totalEffectiveBalanceGwei = statisticsQuery.data?.totalEffectiveBalanceGwei;
    const poolFeesPercent = configQuery.data?.poolFeesPercent;

    if (
      !totalRewardsSent30daysWei ||
      !totalEffectiveBalanceGwei ||
      poolFeesPercent === undefined
    ) return 0;

    const netRewardWei =
      (((BigInt(totalRewardsSent30daysWei) * BigInt(THIRTY_TWO_ETH_GWEI)) /
        BigInt(totalEffectiveBalanceGwei)) * BigInt(10000 - poolFeesPercent)) /
      BigInt(10000);

    return weiToEth(netRewardWei.toString()) * (DAYS_PER_YEAR / 30);
  }, [
    statisticsQuery.data?.totalRewardsSent30daysWei,
    statisticsQuery.data?.totalEffectiveBalanceGwei,
    configQuery.data?.poolFeesPercent,
  ]);

  // How much further Smooth carries the typical staker, as a plain multiplier.
  // A ratio rendered as "217%" reads as "217% more", which is a different (and
  // much larger) claim than the number actually supports.
  const timesMore = useMemo(() => {
    if (!averagePool || !medianSolo) return 0;
    return averagePool / medianSolo;
  }, [averagePool, medianSolo]);

  return (
    <div className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
              <span className="staking-solo-stats">Solo Staking</span> Vs{' '}
              <span className="text-purple-600">Solo Staking with Smooth</span>
            </h2>
          </div>
          <div>
            <dl className="mt-10 grid grid-cols-1 gap-5 text-center sm:grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="overflow-hidden rounded-lg bg-gray-400/5 px-4 py-5 shadow sm:p-8">
                  <dd className="staking-solo-stats text-3xl font-semibold tracking-tight">
                    {medianSolo !== undefined
                      ? `~ ${medianSolo.toFixed(4)} ETH`
                      : 'Loading...'}
                  </dd>
                  <dt className="mt-2 text-base font-medium leading-6 text-DAppDeep dark:text-DAppDarkText">
                    Typical Yearly Earnings for{' '}
                    <strong className="staking-solo-stats">Solo Stakers</strong>
                    <span className="mt-1 block text-sm font-normal text-DAppGray">
                      Median luck, per 32 ETH staked
                    </span>
                  </dt>
                </div>
                <div className="flex w-full items-center justify-center">
                  <video autoPlay muted loop className="w-4/6 md:w-3/5">
                    <source
                      src="/videos/solo-staking-animation.webm"
                      type="video/webm"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="relative overflow-visible rounded-lg bg-gray-400/5 px-4 py-5 shadow sm:p-8">
                  <span
                    className="absolute right-0 top-0 z-10 -mr-4 -mt-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-xs font-extralight text-white sm:h-24 sm:w-24 sm:text-sm sm:font-bold"
                    style={{ transform: 'rotate(-25deg)' }}>
                    {timesMore ? (
                      <>
                        {`${toFixedNoTrailingZeros(timesMore, 1)}x`}
                        <br />
                        ETH!
                      </>
                    ) : (
                      'Loading...'
                    )}
                  </span>
                  <dd className="text-3xl font-semibold tracking-tight text-purple-600">
                    {averagePool !== undefined
                      ? `~ ${toFixedNoTrailingZeros(
                          averagePool,
                          4
                        )} ETH`
                      : 'Loading...'}
                  </dd>
                  <dt className="mt-2 text-base font-medium leading-6 text-DAppDeep dark:text-DAppDarkText">
                    Average Yearly Earnings for{' '}
                    <strong className="text-purple-600">
                      Smooth Solo Stakers
                    </strong>
                    <span className="mt-1 block text-sm font-normal text-DAppGray">
                      Paid to everyone, per 32 ETH staked
                    </span>
                  </dt>
                </div>

                <video autoPlay muted loop>
                  <source
                    src="/videos/smooth-staking-animation.webm"
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
