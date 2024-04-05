/* eslint-disable react/function-component-definition */
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { fetchConfig, fetchStatistics } from '@/client/api/queryFunctions';
import { weiToEth } from '@/utils/web3';
import { toFixedNoTrailingZeros } from '@/utils/decimals';

export default function Stats() {
    const statisticsQuery = useQuery(['statistics'], fetchStatistics);
    const configQuery = useQuery(['config'], fetchConfig);
    const avgBlockRewardWei = statisticsQuery.data?.avgBlockRewardWei;
    const poolFeesPercent = configQuery.data?.poolFeesPercent;
    const averageSolo = 0.15 // TODO: make this dynamic or more accurate
    let averagePool;
    let percentageIncrease;

    if (avgBlockRewardWei !== undefined && poolFeesPercent !== undefined) {
        const feesPoolFraction = BigNumber.from(poolFeesPercent).div(100);
        const feeAmount = BigNumber.from(avgBlockRewardWei).mul(feesPoolFraction).div(100);
        averagePool = BigNumber.from(avgBlockRewardWei).sub(feeAmount).mul(3).toString();
        percentageIncrease = ((parseFloat(averagePool) - averageSolo) / averageSolo) * 100;
    }

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
                            <span className="staking-solo-stats">Solo Staking</span> Vs <span className="text-purple-600">Solo Staking with Smooth</span>
                        </h2>
                    </div>
                    <div>
                        <dl className="mt-10 grid grid-cols-1 gap-5 text-center sm:grid-cols-1 md:grid-cols-2">
                            <div className="overflow-hidden rounded-lg bg-gray-400/5 px-4 py-5 shadow sm:p-8">
                                <dd className="staking-solo-stats text-3xl font-semibold tracking-tight">
                                    {averageSolo !== undefined ? `~ ${averageSolo.toFixed(2)} ETH` : 'Loading...'}
                                </dd>
                                <dt className="mt-2 text-base font-medium leading-6 text-DAppDeep dark:text-DAppDarkText">Average Yearly Earnings for <strong className="staking-solo-stats">Solo Stakers</strong></dt>
                            </div>
                            <div className="relative overflow-visible rounded-lg bg-gray-400/5 px-4 py-5 shadow sm:p-8">
                                <span className="absolute right-0 top-0 z-10 -mr-4 -mt-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-xs font-extralight text-white sm:h-24 sm:w-24 sm:text-sm sm:font-bold" style={{ transform: 'rotate(-25deg)' }}>
                                    {percentageIncrease !== undefined ? (
                                        <>
                                            {`${(percentageIncrease / 1e18).toFixed(2)}%`}
                                            <br />
                                            More ETH!
                                        </>
                                    ) : 'Loading...'}
                                </span>
                                <dd className="text-3xl font-semibold tracking-tight text-purple-600">
                                    {averagePool !== undefined ? `~ ${toFixedNoTrailingZeros(weiToEth(averagePool), 4)} ETH` : 'Loading...'}
                                </dd>
                                <dt className="mt-2 text-base font-medium leading-6 text-DAppDeep dark:text-DAppDarkText">Average Yearly Earnings for <strong className="text-purple-600">Smooth Solo Stakers</strong></dt>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}