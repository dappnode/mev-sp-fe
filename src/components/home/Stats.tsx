/* eslint-disable jsx-a11y/anchor-is-valid */

const stats = [
    { id: 1, value: '~0.15 ETH', name: 'Solo Stakers earn an average annually of' },
    { id: 2, value: '~0.29 ETH', name: 'Smooth Solo Stakers earn an average annually of', },
    { id: 3, value: '~93%', name: 'More rewards', },
]

export default function Stats() {
    return (
        <div className="mb-24 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
                            Solo Staking Vs Solo Staking with Smooth
                        </h2>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                                <dt className="text-sm font-semibold leading-6  text-DAppDeep dark:text-DAppDarkText">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-purple-600">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
