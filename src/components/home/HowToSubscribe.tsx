/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CheckIcon } from '@heroicons/react/20/solid'
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

    const steps: { name: string, description: JSX.Element | string, href: string, status: string }[] = [
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
                    Change your validator&apos;s fee recipient to {' '}
                    <dl style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        {smoothAddress} {' '}
                        {copied && (
                            <span className="ml-2 text-sm text-green-600">Copied!</span>
                        )}
                    </dl>
                </span>
            ),
            href: '#',
            status: 'complete'
        },
        {
            name: '2. Subscribe on Next Proposal',
            description: 'You will subscribe to Smooth the next time your validator proposes a block and sends its execution rewards to the pool',
            href: '#',
            status: 'complete',
        },
        {
            name: '3. Start Accumulating Rewards Today!',
            description: 'Or you can also add a colateral of 0.01 ETH per validator to start accumulating rewards today!',
            href: '#',
            status: 'complete'
        },
        {
            name: '4. More Information',
            description: 'Refer to the documentation for detailed information',
            href: 'https://docs.dappnode.io/docs/smooth/subscribe-to-smooth/manual/',
            status: 'complete'
        },
    ];

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-purple-600">
                    How to subscribe
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
                    Subscribe your validator today in just a few steps!
                </p>
            </div>
            <div className="flex items-center justify-center py-14">
                <nav aria-label="Progress">
                    <ol className="overflow-hidden" role="list">
                        {steps.map((step, stepIdx) => (
                            <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
                                {step.status === 'complete' ? (
                                    <>
                                        {stepIdx !== steps.length - 1 ? (
                                            <div aria-hidden="true" className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-purple-600" />
                                        ) : null}
                                        <a className="group relative flex items-start" href={step.href}>
                                            <span className="flex h-9 items-center">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 group-hover:bg-purple-800">
                                                    <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
                                                </span>
                                            </span>
                                            <span className="ml-4 flex min-w-0 flex-col">
                                                <span className="text-sm font-medium">{step.name}</span>
                                                <span className="text-sm text-gray-500">{step.description}</span>
                                            </span>
                                        </a>
                                    </>
                                ) : step.status === 'current' ? (
                                    <>
                                        {stepIdx !== steps.length - 1 ? (
                                            <div aria-hidden="true" className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" />
                                        ) : null}
                                        <a aria-current="step" className="group relative flex items-start" href={step.href}>
                                            <span aria-hidden="true" className="flex h-9 items-center">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple-600 bg-white">
                                                    <span className="h-2.5 w-2.5 rounded-full bg-purple-600" />
                                                </span>
                                            </span>
                                            <span className="ml-4 flex min-w-0 flex-col">
                                                <span className="text-sm font-medium text-purple-600">{step.name}</span>
                                                <span className="text-sm text-gray-500">{step.description}</span>
                                            </span>
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        {stepIdx !== steps.length - 1 ? (
                                            <div aria-hidden="true" className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" />
                                        ) : null}
                                        <a className="group relative flex items-start" href={step.href}>
                                            <span aria-hidden="true" className="flex h-9 items-center">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                                    <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                                </span>
                                            </span>
                                            <span className="ml-4 flex min-w-0 flex-col">
                                                <span className="text-sm font-medium text-gray-500">{step.name}</span>
                                                <span className="text-sm text-gray-500">{step.description}</span>
                                            </span>
                                        </a>
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    )
}
