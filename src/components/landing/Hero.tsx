/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 ">
          Find out more on our docs{' '}
          <a className="font-semibold text-purple-600" href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
          Earn more rewards by pooling MEV rewards together
        </h1>
        <p className="mt-6 text-lg leading-8 ">
          It is a product by Dappnode, fight centralitzation
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            href="#">
            Join Now
          </a>
          <a className="text-sm font-semibold leading-6 " href="#">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
