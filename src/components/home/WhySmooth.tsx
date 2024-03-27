/* eslint-disable jsx-a11y/anchor-is-valid */

import Image from "next/image"

const whySmooth = [
    {
        name: '🚀 Boost your MEV earnings:',
        description:
            'Pool rewards with other stakers and share profits from every block.',
    },
    {
        name: '🎰 No luck involved:',
        description: 'Earn an average of all pool rewards, not just your individual blocks.',
    },
    {
        name: '🔍 Full transparency:',
        description: 'Track all blocks, MEV, and validator performance on the dashboard.',
    },
    {
        name: '✅ Get started easily:',
        description: 'Just update your fee recipient and claim rewards after proposals. Simple and secure.',
    },
]

export default function WhySmooth() {
    return (
        <div className="overflow-hidden">
            <div className="mx-auto mt-16 max-w-7xl md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                    <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                            <p className="mt-2 text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">Why Smooth?</p>
                            <p className="mt-6 text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
                                Get higher MEV rewards by joining forces with other stakers
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-DAppDeep dark:text-DAppDarkText lg:max-w-none">
                                {whySmooth.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-DAppDeep dark:text-DAppDarkText">
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className="mx-auto mt-8 max-w-2xl sm:mx-0 sm:max-w-none">
                        <Image
                            alt="Product screenshot"
                            className="-mb-12 w-[57rem] rounded-xl bg-gray-800 ring-1 ring-white/10"
                            height={800}
                            src="/images/poolv5.png"
                            width={800}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
