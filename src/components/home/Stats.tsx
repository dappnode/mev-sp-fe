/* eslint-disable react/function-component-definition */
import { useQuery } from '@tanstack/react-query'
import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { fetchConfig, fetchProposedBlocks, fetchStatistics } from '@/client/api/queryFunctions'
import { weiToEth } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

const MULTIPLIER = 2.56

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
  

  const medianSolo = useMemo(() => {
    const proposedBlocks = proposedBlocksQuery.data;
    if (!proposedBlocks) return 0; // Handle loading or error states

    const rewards = proposedBlocks.map(block => weiToEth(block.rewardWei));
    const sortedRewards = rewards.sort((a, b) => a - b);
    const mid = Math.floor(sortedRewards.length / 2);
    const median = sortedRewards.length % 2 !== 0
      ? sortedRewards[mid]
      : (sortedRewards[mid - 1] + sortedRewards[mid]) / 2;

    return parseFloat(median.toFixed(4)); // Rounds the median to three decimal places
  }, [proposedBlocksQuery.data]);

  const averageSolo = MULTIPLIER * medianSolo; // Dynamically calculated as 2.56 times the median reward

  const averagePool = useMemo(() => {
    const avgBlockRewardWei = statisticsQuery.data?.avgBlockRewardWei;
    const poolFeesPercent = configQuery.data?.poolFeesPercent;

    if (!avgBlockRewardWei || !poolFeesPercent) return 0;

    const rewardWei = BigNumber.from(avgBlockRewardWei);
    const fees = rewardWei.mul(poolFeesPercent).div(10000);
    const netRewardWei = rewardWei.sub(fees);
    const netRewardEth = parseFloat(utils.formatEther(netRewardWei));
    return netRewardEth * MULTIPLIER;  // Apply multiplier
  }, [statisticsQuery.data?.avgBlockRewardWei, configQuery.data?.poolFeesPercent]);

  const percentageIncrease = useMemo(() => {
    if (!averagePool || !averageSolo) return 0;
    return (averagePool / averageSolo) * 100; // Adjusted calculation
  }, [averagePool, averageSolo]);

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
                    {averageSolo !== undefined
                      ? `~ ${averageSolo.toFixed(4)} ETH`
                      : 'Loading...'}
                  </dd>
                  <dt className="mt-2 text-base font-medium leading-6 text-DAppDeep dark:text-DAppDarkText">
                    Average Yearly Earnings for{' '}
                    <strong className="staking-solo-stats">Solo Stakers</strong>
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
                    {percentageIncrease !== undefined ? (
                      <>
                        {`${(percentageIncrease).toFixed(2)}%`}
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
