import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid'
import { useAccount } from 'wagmi';
import { Transition } from '@headlessui/react';
import Confetti from 'react-confetti';
import Link from 'next/link';
import { DonateDialog } from '@/components/dialogs/DonateDialog'


interface ApiData {
    total_subscribed_validators: number;
}

export default function JoinSmooth() {
    const [validators, setValidators] = useState('');
    const [result, setResult] = useState<string | null>('');
    const [apiData, setApiData] = useState<ApiData | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { isConnected } = useAccount()

    const features = [
        {
            name: "Smooth's official documentation",
            href: 'https://docs.dappnode.io/docs/smooth',
            blank: true
        },
        {
            name: 'Learn about Smooth in just 20 minutes!',
            href: 'https://twitter.com/EthereumDenver/status/1763659085507907742',
            blank: true
        },
        {
            name: 'In-depth analysis of Smoothing Pools for Rocket Pool by Ken Smith',
            href: 'https://github.com/htimsk/SPanalysis',
            blank: true
        },
        {
            name: 'Discover how Smooth participants earn 120% more on our last post',
            href: 'https://twitter.com/dappnode/status/1763595296624300081',
            blank: true
        }
    ];

    const checkValidators = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (errorMessage) {
            return;
        }

        if (isSubmitted) {
            setValidators('');
            setResult(null);
            setApiData(null);
            setIsSubmitted(false);
        }
        else {
            try {
                setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div id="target-section">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative overflow-hidden px-6 py-24 sm:rounded-3xl xl:py-32">
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
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? 'Loading...' : (isSubmitted ? 'Restart' : 'Should you?')}
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
                            <div className="py-16 sm:py-20">
                                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                    {result === 'Yes' ? (
                                        <>
                                            <Confetti
                                                height={600}
                                                recycle={false}
                                                width={1200}
                                            />
                                            <div className="mb-14 text-center">
                                                <p className="text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
                                                    <span className='text-3xl font-bold'>YES!</span>
                                                    <br />
                                                    It makes sense to join Smooth if you control less than 50% of the pool&apos;s validators. <br />
                                                    You have <strong>{validators}</strong> validators, and there are <strong>{apiData?.total_subscribed_validators}</strong> validators in the pool
                                                </p>
                                                <br />
                                                <Link
                                                    className="rounded-md bg-purple-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm transition duration-300 hover:scale-110 hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                                                    href="/">
                                                    Join Now
                                                </Link>
                                            </div>
                                            <div className="mx-auto rounded-2xl bg-gray-400/5 p-4 shadow-sm sm:p-8 lg:p-12 xl:p-16">
                                                <div className="mb-16 flex items-center justify-center text-center text-lg font-bold">
                                                    <span>More resources to learn about Smooth</span>
                                                    <svg className="icon-learn-smooth ml-2 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
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
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mx-auto mb-14 max-w-xl text-center">
                                                <p className="text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
                                                    <span className='text-3xl font-bold'>NO!</span>
                                                    <br />
                                                    Smooth is expected to provide smoothing benefits to participants with less than 50% of the validators in the pool.
                                                    You have <strong>{validators}</strong> validators, and there are <strong>{apiData?.total_subscribed_validators}</strong> validators in the pool.<br />
                                                    <br />
                                                    You can consider donating to the pool and incentivize Solo Stakers by literally bumping their APR, making it more attractive! <br />
                                                    <div className="mt-4 flex justify-center">
                                                        {isConnected ? <DonateDialog /> : <w3m-button label="Donate now" />}
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="mx-auto rounded-2xl bg-gray-400/5 p-4 shadow-sm sm:p-8 lg:p-12 xl:p-16">
                                                <div className="mb-16 flex items-center justify-center text-center text-lg font-bold">
                                                    <span>More resources to learn about Smooth</span>
                                                    <svg className="icon-learn-smooth ml-2 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
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
                                                </div>
                                            </div>
                                        </>
                                    )}
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
