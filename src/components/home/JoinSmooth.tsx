import React, { useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useAccount } from 'wagmi'
import { Transition } from '@headlessui/react'
import Confetti from 'react-confetti'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { DonateDialog } from '@/components/dialogs/DonateDialog'
import { fetchStatistics } from '@/client/api/queryFunctions'

export default function JoinSmooth() {
  const [validators, setValidators] = useState('')
  const [result, setResult] = useState<string | null>('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { isConnected } = useAccount()

  const statisticsQuery = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics
});  const totalSubscribedValidators =
    statisticsQuery.data?.totalSubscribedValidators

  const checkValidators = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (errorMessage || isSubmitted) {
      setValidators('')
      setResult(null)
      setIsSubmitted(false)
    } else if (totalSubscribedValidators !== undefined) {
      const validatorsNumber = parseFloat(validators)
      if (!Number.isNaN(validatorsNumber)) {
        if (validatorsNumber > totalSubscribedValidators) {
          setResult('No')
        } else {
          setResult('Yes')
        }
      } else {
        setErrorMessage('Please enter a valid number')
        return
      }
      setIsSubmitted(true)
    }
  }

  const features = [
    {
      name: "Smooth's official documentation",
      href: 'https://docs.dappnode.io/docs/smooth',
      blank: true,
    },
    {
      name: 'Learn about Smooth in just 20 minutes!',
      href: 'https://twitter.com/EthereumDenver/status/1763659085507907742',
      blank: true,
    },
    {
      name: 'In-depth analysis of Smoothing Pools for Rocket Pool by Ken Smith',
      href: 'https://github.com/htimsk/SPanalysis',
      blank: true,
    },
    {
      name: 'Discover how Smooth participants earn 120% more on our last post',
      href: 'https://twitter.com/dappnode/status/1763595296624300081',
      blank: true,
    },
  ]

  return statisticsQuery.data !== undefined ? (
    <div id="target-section">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative mb-10 overflow-hidden px-6 py-24 sm:rounded-3xl xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
            Should I join Smooth?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-400">
            Type how many validators you have
          </p>
          <form
            className="mx-auto mt-10 flex max-w-md gap-x-4"
            onSubmit={checkValidators}>
            <input
              autoComplete="off"
              className="block w-full rounded-md border-0 p-2 py-1.5 text-DAppDeep shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-DAppDarkText sm:text-sm sm:leading-6"
              disabled={isSubmitted}
              id="validators"
              name="validators"
              placeholder="Number of validators"
              type="text"
              value={validators}
              onChange={(event) => {
                const input = event.target.value.trim()
                if (input === '' || /^[0-9]*$/.test(input)) {
                  setValidators(input)
                  setErrorMessage('')
                } else {
                  setErrorMessage('Please enter a valid number')
                }
              }}
            />
            <button
              className="ml-2 flex-none rounded-md bg-purple-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm transition duration-300 hover:scale-110 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
              disabled={statisticsQuery.isLoading}
              type="submit">
              {statisticsQuery.isLoading
                ? 'Loading...'
                : isSubmitted
                ? 'Restart'
                : 'Should you? 😏'}
            </button>
          </form>
          {statisticsQuery.isError && (
            <p className="mt-6 text-center text-xs text-red-500">
              Error fetching statistics. Please try again later.
            </p>
          )}
          {errorMessage && (
            <p className="mt-6 text-center text-sm text-red-500">
              {errorMessage}
            </p>
          )}

          {result && (
            <Transition
              show
              enter="transition ease-out duration-500"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-4">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {result === 'Yes' ? (
                  <>
                    <Confetti height={600} recycle={false} width={1200} />
                    <div className="mb-14 text-center">
                      <div className="text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
                        <p className="my-8 text-5xl font-bold text-purple-600">
                          YES!
                        </p>
                        It makes sense to join Smooth if you control less than
                        50% of the pool&apos;s validators. <br />
                        You have{' '}
                        <strong className="text-purple-600">
                          {validators}
                        </strong>{' '}
                        validators, and there are{' '}
                        <strong className="text-purple-600">
                          {totalSubscribedValidators}
                        </strong>{' '}
                        validators in the pool
                      </div>
                      <br />
                      <div className="transition duration-300 ease-in-out hover:scale-110 ">
                        <Link
                          className="rounded-md bg-purple-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm  hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                          href="/dashboard">
                          Join Now
                        </Link>
                      </div>
                    </div>
                    <div className="mx-auto rounded-2xl bg-gray-400/5 p-4 shadow-sm sm:p-8 lg:p-12 xl:p-16">
                      <div className="mb-16 flex items-center justify-center text-center text-lg font-bold">
                        <span>More resources to learn about Smooth</span>
                        <svg
                          className="icon-learn-smooth ml-2 h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <dl className="col-span-2 grid gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-1 lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                          <div key={feature.name} className="relative pl-9">
                            <dt className="font-semibold text-DAppDeep dark:text-DAppDarkText">
                              <a
                                className="group transition-colors duration-300 hover:text-purple-600"
                                href={feature.href}
                                rel="noopener noreferrer"
                                target="_blank">
                                <CheckIcon
                                  aria-hidden="true"
                                  className="absolute left-0 top-1 h-5 w-5 text-purple-600"
                                />
                                {feature.name}
                              </a>
                            </dt>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mx-auto mb-14 max-w-xl text-center">
                      <p className="text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
                        <span className="text-3xl font-bold">Not yet...</span>
                        <br />
                        Smooth is expected to provide smoothing benefits to
                        participants with less than 50% of the validators in the
                        pool. You have <strong>{validators}</strong> validators,
                        and there are{' '}
                        <strong>{totalSubscribedValidators}</strong> validators
                        in the pool.
                        <br />
                        <br />
                        You can consider donating to the pool and incentivize
                        Solo Stakers by literally bumping their APR, making it
                        more attractive! <br />
                        <div className="mt-4 flex justify-center">
                          {isConnected ? (
                            <DonateDialog />
                          ) : (
                            <w3m-button label="Donate now" />
                          )}
                        </div>
                      </p>
                    </div>
                    <div className="mx-auto rounded-2xl bg-gray-400/5 p-4 shadow-sm sm:p-8 lg:p-12 xl:p-16">
                      <div className="mb-16 flex items-center justify-center text-center text-lg font-bold">
                        <span>More resources to learn about Smooth</span>
                        <svg
                          className="icon-learn-smooth ml-2 h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <dl className="col-span-2 grid gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-1 lg:grid-cols-2 lg:gap-y-16">
                          {features.map((feature) => (
                            <div key={feature.name} className="relative pl-9">
                              <dt className="font-semibold text-DAppDeep dark:text-DAppDarkText">
                                <a
                                  className="group transition-colors duration-300 hover:text-purple-600"
                                  href={feature.href}
                                  rel="noopener noreferrer"
                                  target="_blank">
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="absolute left-0 top-1 h-5 w-5 text-purple-600"
                                  />
                                  {feature.name}
                                </a>
                              </dt>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Transition>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div />
  )
}
