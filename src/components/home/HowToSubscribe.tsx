/* eslint-disable @next/next/no-html-link-for-pages */
import { CheckIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const smoothAddress = '0xAdFb8D27671F14f297eE94135e266aAFf8752e35';

export default function HowToSubscribe() {
    const [copied, setCopied] = useState(false);


    const handleCopyAddress = (e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.KeyboardEvent<HTMLSpanElement>): void => {
        e.preventDefault();
        if (e.type === 'click' || (e.type === 'keydown' && (e as React.KeyboardEvent<HTMLSpanElement>).key === 'Enter')) {
            navigator.clipboard.writeText(smoothAddress);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };

    const steps = [
        {
            name: '1. Fee recipient',
            description: (
                <span
                    role="button"
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    onClick={handleCopyAddress}
                    onMouseEnter={() => setCopied(false)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            handleCopyAddress(e);
                        }
                    }}
                >
                    Change your validator&apos;s fee recipient to{' '}
                    <dl style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', textDecoration: 'underline' }}>
                        <dt>{smoothAddress}</dt>
                        <dd>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </dd>
                        {copied && (
                            <span className="ml-2 text-base text-green-600">Copied!</span>
                        )}
                    </dl>

                </span>
            ),
            status: 'complete',
            isLink: false,
            href: '',
        },
        {
            name: '2. Subscribe on Next Proposal',
            description: 'You will subscribe to Smooth the next time your validator proposes a block and sends its execution rewards to the pool',
            status: 'complete',
            isLink: false,
            href: '',
        },
        {
            name: '3. Start Accumulating Rewards Today!',
            description: (
                <span>
                    Or you can also add a colateral of 0.01 ETH per validator on the <u>dashboard</u> to start accumulating rewards today!
                </span>
            ),
            status: 'complete',
            isLink: true,
            href: '/',
        },
        {
            name: '4. More Information',
            description: (
                <div className="flex items-center justify-center">
                    <span>
                        <span style={{ textDecoration: 'underline' }}>Read more</span> on our documentation for detailed information{' '}
                    </span>
                    <svg className="icon-learn-smooth ml-1 inline-block h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            ),
            status: 'complete',
            isLink: true,
            href: 'https://docs.dappnode.io/docs/smooth/subscribe-to-smooth/manual/',
            target: '_blank',
        },
    ];

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="mx-auto mt-20 max-w-7xl px-16 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-purple-600">
                    How to subscribe
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
                    Subscribe your validator today in just a few steps!
                </p>
            </div>
            <div className="items-center justify-center py-14">
                <nav aria-label="Progress">
                    <ol className="overflow-hidden">
                        {steps.map((step, stepIdx) => (
                            <li
                                key={step.name}
                                className={classNames(
                                    stepIdx !== steps.length - 1 ? 'pb-10' : '',
                                    'relative'
                                )}
                            >
                                {step.status === 'complete' ? (
                                    <>
                                        {stepIdx !== steps.length - 1 ? (
                                            <div
                                                aria-hidden="true"
                                                className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-purple-600"
                                            />
                                        ) : null}
                                        {step.isLink ? (
                                            <a
                                                href={step.href}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                className={`group relative flex items-start ${step.isLink ? 'hover:text-purple-600' : ''
                                                    }`}
                                            >
                                                <span className="flex h-9 items-center">
                                                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 group-hover:bg-purple-800">
                                                        <CheckIcon
                                                            aria-hidden="true"
                                                            className="h-5 w-5 text-white"
                                                        />
                                                    </span>
                                                </span>
                                                <span className="ml-4 flex min-w-0 flex-col">
                                                    <span className="text-base font-medium">{step.name}</span>
                                                    <span className="text-base text-DAppDeep dark:text-DAppGray">{step.description}</span>
                                                </span>
                                            </a>
                                        ) : (
                                            <div className="group relative flex cursor-default items-start">
                                                <span className="flex h-9 items-center">
                                                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 group-hover:bg-purple-800">
                                                        <CheckIcon
                                                            aria-hidden="true"
                                                            className="h-5 w-5 text-white"
                                                        />
                                                    </span>
                                                </span>
                                                <span className="ml-4 flex min-w-0 flex-col">
                                                    <span className="text-base font-medium">{step.name}</span>
                                                    <span className="text-base text-DAppDeep dark:text-DAppGray">{step.description}</span>
                                                </span>
                                            </div>
                                        )}
                                    </>
                                ) : null}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                    className="rounded-md bg-purple-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm transition duration-300 hover:scale-110 hover:bg-purple-800"
                    href="/dashboard"
                >
                    Join Now
                </a>
            </div>
        </div>
    );
}
