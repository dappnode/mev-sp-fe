/* eslint-disable jsx-a11y/anchor-is-valid */

const whySmooth = [
    {
        name: '🚀 Boost your MEV earnings',
        description:
            'Pool rewards with other stakers and share profits from every block.',
    },
    {
        name: '🎰 No luck involved',
        description: 'Earn an average of all pool rewards, not just your individual blocks.',
    },
    {
        name: '🔍 Full transparency',
        description: 'Track all blocks, MEV, and validator performance on the dashboard.',
    },
    {
        name: '✅ Get started easily',
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
                            <h2 className="text-base font-semibold leading-7 text-purple-600">Smooth</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">Why Smooth</p>
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
                    <div className="sm:px-6 lg:px-0">
                        <div className="relative isolate overflow-hidden bg-purple-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                            <div
                                aria-hidden="true"
                                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-purple-100 opacity-20 ring-1 ring-inset ring-white"
                            />
                            <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                                <img
                                    alt="Product screenshot"
                                    className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                                    height={1442}
                                    src="https://images.unsplash.com/photo-1498747946579-bde604cb8f44?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    width={2432}
                                />
                            </div>
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
