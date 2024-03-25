

export default function JoinSmooth() {
    return (
        <div className="py-16 sm:py-24" id="target-section">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative overflow-hidden px-6 py-24 sm:rounded-3xl sm:px-24 xl:py-32">
                    <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
                        Should you join Smooth?
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-500">
                        How many validators do you have?            </p>
                    <form className="mx-auto mt-10 flex max-w-md gap-x-4">
                        <input
                            required
                            autoComplete="email"
                            className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="validators"
                            name="email"
                            placeholder="Number of validators"
                            type="email"
                        />
                        <button
                            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            type="submit"
                        >
                            Should you?
                        </button>
                    </form>
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
