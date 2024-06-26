/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  useEffect(() => {
    // Function to handle smooth scrolling when clicking on the "Should I join?" link
    const handleClick = (event: MouseEvent) => {
      event.preventDefault()
      const targetElement = document.getElementById('target-section')
      targetElement?.scrollIntoView({ behavior: 'smooth' })
    }
    const learnMoreLink = document.getElementById('join-smooth')
    learnMoreLink?.addEventListener('click', handleClick)
    return () => {
      learnMoreLink?.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className=" pt-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-6xl">
              Join <span className="text-purple-600">Smooth</span>, the MEV
              Smoothing Pool by Dappnode
            </h1>
            <p className="mt-6 text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
              Earn higher rewards consistently by pooling MEV with other solo
              stakers, reducing reliance on luck and maximizing the potential of
              every staked ether.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm transition duration-300 hover:scale-110 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                href="/dashboard">
                Join Now
              </Link>
              <a
                className="group text-base font-semibold leading-6 text-DAppDeep dark:text-DAppDarkText"
                href="#"
                id="join-smooth">
                Should I join?{' '}
                <span
                  aria-hidden="true"
                  className="inline-block  text-2xl  transition group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}
