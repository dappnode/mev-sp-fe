export default function Stats() {
  const stats = [
    { id: 1, name: 'Total Subscribers', value: '550' },
    { id: 2, name: 'Expected Monthly Rewards', value: '0.0297 ETH' },
    { id: 3, name: 'Total Rewards', value: '28.4 ETH' },
  ]

  return (
    <div className="mb-12 py-12 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
              Smooth Stats
            </h2>
            <p className="mt-4 text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
              Lorem ipsum dolor sit amet consect adipisicing possimus.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6  text-DAppDeep dark:text-DAppDarkText">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-purple-600">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
