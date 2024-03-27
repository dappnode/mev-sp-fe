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
        <div className="mb-24 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
                            Solo Staking Vs Solo Staking with Smooth
                        </h2>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
                        <div key={1} className="flex flex-col bg-gray-400/5 p-8">
                            <dt className="text-sm font-semibold leading-6  text-DAppDeep dark:text-DAppDarkText">Average Yearly Earnings for <strong>Solo Stakers</strong></dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-purple-600">~{calculatedSoloStakerReward} ETH</dd>
                        </div>
                        <div key={2} className="flex flex-col bg-gray-400/5 p-8">
                            <dt className="text-sm font-semibold leading-6  text-DAppDeep dark:text-DAppDarkText"> Average Yearly Earnings for <strong>Smooth Solo Stakers</strong></dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-purple-600">~{calculatedSmoothStakerReward} ETH</dd>
                        </div>
                        <div key={3} className="flex flex-col bg-gray-400/5 p-8">
                            <dt className="text-sm font-semibold leading-6  text-DAppDeep dark:text-DAppDarkText">More Rewards Await Smooth Stakers!</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-purple-600">
                                {percentageIncrease !== undefined ? `${(percentageIncrease / 1e18).toFixed(2)}%` : 'Calculating...'}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Stats;
