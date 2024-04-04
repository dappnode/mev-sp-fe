/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */

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
        <div className="py-24 sm:py-32">
            <div className="relative">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-2xl flex-col gap-16 rounded-2xl bg-gray-400/5 px-6 py-16 shadow sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                        <div style={{ width: '100%', height: '450px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', }}>
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: `url('/images/SMOOTH_STILL_POOLPARTY.png')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    transform: 'scale(1.5)',
                                }}
                            />
                        </div>
                        <div className="w-full flex-auto">
                            <h2 className="text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">Why <span className="text-purple-600">Smooth</span>?</h2>
                            <p className="mt-6 text-lg leading-8 text-DAppDeep dark:text-DAppDarkText ">
                                Get higher MEV rewards by joining forces with other stakers.
                            </p>
                            <ul
                                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-DAppDeep dark:text-DAppDarkText sm:grid-cols-2"
                                role="list"
                            >
                                {whySmooth.map((feature) => (
                                    <li key={feature.name} className="flex cursor-pointer gap-x-3 rounded-md p-2 transition duration-300 hover:scale-110 hover:text-purple-600">
                                        <p className="text-sm">
                                            <strong className="text-base">{feature.name}</strong>{' '}
                                            {feature.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10 flex">
                                <a className="text-sm font-semibold leading-6 text-purple-600" href="#">
                                    Go to dashboard <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                >
                    <div
                        className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}




