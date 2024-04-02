import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid'
import { useAccount } from 'wagmi';
import { Transition } from '@headlessui/react';
import Confetti from 'react-confetti';
import { DonateDialog } from '@/components/dialogs/DonateDialog'


interface ApiData {
    total_subscribed_validators: number;
}

export default function JoinSmooth() {
    const [validators, setValidators] = useState('');
    const [result, setResult] = useState('');
    const [apiData, setApiData] = useState<ApiData | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { isConnected } = useAccount()

    const features = [
        {
            name: "Smooth's official documentation",
            href: 'https://docs.dappnode.io/docs/smooth',
        },
        {
            name: 'Learn about Smooth in just 20 minutes!',
            href: 'https://twitter.com/EthereumDenver/status/1763659085507907742'
        },
        {
            name: 'In-depth analysis of Smoothing Pools for Rocket Pool by Ken Smith',
            href: 'https://github.com/htimsk/SPanalysis',
        },
        {
            name: 'Discover how Smooth participants earn 120% more on our last post',
            href: 'https://twitter.com/dappnode/status/1763595296624300081',
        }
    ];

    const checkValidators = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (errorMessage) {
            return;
        }

        if (isSubmitted) {
            setValidators('');
            setResult('');
            setApiData(null);
            setIsSubmitted(false);
        }
        else {
            try {
                const response = await fetch('https://smooth.dappnode.io/api/memory/statistics');
                const data = await response.json();
                setApiData(data);

                if (validators > data.total_subscribed_validators) {
                    setResult('No');
                } else {
                    setResult('Yes');
                }
                setIsSubmitted(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return (
        <div id="target-section">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative overflow-hidden px-6 py-24 sm:rounded-3xl sm:px-24 xl:py-32">
                    <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
                        Should I join Smooth?
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-400">
                        Type how many validators you have
                    </p>
                    <form className="mx-auto mt-10 flex max-w-md gap-x-4" onSubmit={checkValidators}>
                        <input
                            autoComplete="off"
                            className="block w-full rounded-md border-0 p-2 py-1.5 text-DAppDeep shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-DAppDarkText sm:text-sm sm:leading-6"
                            disabled={isSubmitted}
                            id="validators"
                            name="validators"
                            placeholder="Number of validators"
                            type="number"
                            value={validators}
                            onChange={(event) => {
                                const val = parseFloat(event.target.value);
                                if (!Number.isNaN(val) && val.toString().length <= 8) {
                                    setValidators(val.toString());
                                    setErrorMessage('');
                                } else {
                                    setErrorMessage('Please enter a valid number');
                                }
                            }}
                        />
                        <button
                            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            type="submit"
                        >
                            {isSubmitted ? 'Restart' : 'Should you?'}
                        </button>
                    </form>
                    {errorMessage && <p className="mt-6 text-center text-sm text-red-500">{errorMessage}</p>}

                    {result &&
                        <Transition
                            show
                            enter="transition ease-out duration-500"
                            enterFrom="opacity-0 -translate-y-4"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-300"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-4"
                        >
                            <div className="mt-10 text-center text-lg font-bold">More resources to learn about Smooth</div>
                            <div className="py-16 sm:py-24">
                                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                        {result === 'Yes' ? (
                                            <>
                                                <Confetti
                                                    height={600}
                                                    recycle={false}
                                                    width={1200}
                                                />
                                                <div>
                                                    <p className="text-base leading-7 text-DAppDeep dark:text-DAppDarkText">
                                                        <span className='text-xl font-bold'>Yes!</span>
                                                        <br />
                                                        It makes sense to join Smooth if you control less than 50% of the pool&apos;s validators. <br />
                                                        You have <strong>{validators}</strong> validators, and there are <strong>{apiData?.total_subscribed_validators}</strong> validators in the pool
                                                    </p>
                                                    <br />
                                                    <a
                                                        className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                                                        href="https://smooth.dappnode.io/">
                                                        Join Now!
                                                    </a>
                                                </div>
                                                <dl className="col-span-2 grid gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-1 lg:grid-cols-2 lg:gap-y-16">
                                                    {features.map((feature) => (
                                                        <div key={feature.name} className="relative pl-9">
                                                            <dt className="font-semibold text-DAppDeep dark:text-DAppDarkText">
                                                                <a
                                                                    className="group transition-colors duration-300 hover:text-purple-600"
                                                                    href={feature.href}
                                                                    rel="noopener noreferrer"
                                                                    target="_blank"
                                                                >
                                                                    <CheckIcon aria-hidden="true" className="absolute left-0 top-1 h-5 w-5 text-purple-600" />
                                                                    {feature.name}
                                                                </a>
                                                            </dt>
                                                        </div>
                                                    ))}
                                                </dl>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <p className="text-base leading-7 text-DAppDeep dark:text-DAppDarkText">
                                                        Smooth is expected to provide smoothing benefits to participants with less than 50% of the validators in the pool <br />
                                                        You have <strong>{validators}</strong> validators, and there are <strong>{apiData?.total_subscribed_validators}</strong> validators in the pool.<br />
                                                        <br />
                                                        You can consider donating to the pool and incentivize Solo Stakers by literally bumping their APR, making it more attractive! <br />
                                                        <br />
                                                        {isConnected ? <DonateDialog /> : <w3m-button label="Donate now" />}
                                                        <br />
                                                    </p>
                                                </div>

                                                <dl className="col-span-2 grid gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-1 lg:grid-cols-2 lg:gap-y-16">
                                                    {features.map((feature) => (
                                                        <div key={feature.name} className="relative pl-9">
                                                            <dt className="font-semibold text-DAppDeep dark:text-DAppDarkText">
                                                                <a
                                                                    className="group transition-colors duration-300 hover:text-purple-600"
                                                                    href={feature.href}
                                                                    rel="noopener noreferrer"
                                                                    target="_blank">
                                                                    <CheckIcon aria-hidden="true" className="absolute left-0 top-1 h-5 w-5 text-purple-600" />
                                                                    {feature.name}
                                                                </a>
                                                            </dt>
                                                        </div>
                                                    ))}
                                                </dl>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    }
                    <svg
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                        viewBox="0 0 1024 1024"
                    >
                        <circle cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" r={512} />
                        <defs>
                            <radialGradient
                                cx={0}
                                cy={0}
                                gradientTransform="translate(512 512) rotate(90) scale(512)"
                                gradientUnits="userSpaceOnUse"
                                id="759c1415-0410-454c-8f7c-9a820de03641"
                                r={1}
                            >
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    )
}
