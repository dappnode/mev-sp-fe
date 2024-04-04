/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';
import axios from 'axios';

const Stats: React.FC = () => {
    const [avgBlockRewardWei, setAvgBlockRewardWei] = useState<string | undefined>(undefined);
    const [calculatedSoloStakerReward, setCalculatedSoloStakerReward] = useState<string>('');
    const [calculatedSmoothStakerReward, setCalculatedSmoothStakerReward] = useState<string>('');
    const [percentageIncrease, setPercentageIncrease] = useState<number | undefined>(undefined);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://sp-api.dappnode.io/memory/statistics');
                const data = response.data;
                if ('avg_block_reward_wei' in data) {
                    setAvgBlockRewardWei(data.avg_block_reward_wei);
                } else {
                    console.error('avg_block_reward_wei not found in data object.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (avgBlockRewardWei) {
            const soloStakerRewardPerBlock = 0.05;
            const smoothStakerRewardPerBlock = parseFloat(avgBlockRewardWei) * (1 - 0.07);
            const soloStakerRewardPerYear = soloStakerRewardPerBlock * 3;
            const smoothStakerRewardPerYear = smoothStakerRewardPerBlock * 3;

            const soloStakerRewardPerYearRounded = parseFloat(soloStakerRewardPerYear.toFixed(2));
            const percentageIncreaseValue = ((smoothStakerRewardPerYear - soloStakerRewardPerYearRounded) / soloStakerRewardPerYearRounded) * 100;

            setCalculatedSoloStakerReward(`${soloStakerRewardPerYear.toFixed(2)}`);
            setCalculatedSmoothStakerReward(`${(smoothStakerRewardPerYear / 1000000000000000000).toFixed(5)}`);
            setPercentageIncrease(percentageIncreaseValue);
        }
    }, [avgBlockRewardWei]);

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
                                <dd className="staking-solo-stats text-3xl font-semibold tracking-tight">~{calculatedSoloStakerReward} ETH</dd>
                                <dt className="mt-2 text-base font-medium leading-6 text-DAppDeep dark:text-DAppDarkText">Average Yearly Earnings for <strong className="staking-solo-stats">Solo Stakers</strong></dt>
                            </div>
                            <div className="relative overflow-visible rounded-lg bg-gray-400/5 px-4 py-5 shadow sm:p-8">
                                <span className="absolute right-0 top-0 z-10 -mr-4 -mt-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-xs font-extralight text-white sm:h-24 sm:w-24 sm:text-sm sm:font-bold" style={{ transform: 'rotate(-25deg)' }}>
                                    {percentageIncrease !== undefined ? `${(percentageIncrease / 1e18).toFixed(2)}%` : 'Calculating...'}
                                    <br />
                                    More ETH!
                                </span>

                                <dd className="text-3xl font-semibold tracking-tight text-purple-600">~{calculatedSmoothStakerReward} ETH</dd>
                                <dt className="mt-2 text-base font-medium leading-6 text-DAppDeep dark:text-DAppDarkText">Average Yearly Earnings for <strong className="text-purple-600">Smooth Solo Stakers</strong></dt>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
