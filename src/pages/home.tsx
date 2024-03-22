/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  MinusSmallIcon, PlusSmallIcon
} from '@heroicons/react/24/outline'
import { useAccount } from 'wagmi'
import { Disclosure } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import { DonateDialog } from '@/components/dialogs/DonateDialog'

const faqs = [
  {
    id: 1,
    question: "What do I need to claim my rewards?",
    answer:
      "Once your pending rewards are transformed into accumulated rewards after your block proposal, a small claim transaction will be required from the withdrawal address to send the ETH rewards to your wallet.",
  },
  {
    id: 2,
    question: "Does Smooth take my Consensus Layer (CL) rewards?",
    answer:
      "No, Smooth does not take your CL rewards. CL rewards are always sent directly to your withdrawal address. Smooth only takes the execution layer rewards, which are the fees or MEV of the blocks you propose.",
  },
  {
    id: 3,
    question: "If I want to unsubscribe my validator from Smooth, when is the best time to do it?",
    answer: "Unsubscribing a validator from Smooth causes it to lose all its pending rewards. Hence, the ideal moment to exit Smooth is just after your last successful block proposal is reflected in Smooth's Smart Contract. A successful block proposal transfers all pending rewards claimable, allowing you to claim them before unsubscribing. This approach minimizes the pending rewards lost when unsubscribing."
  }
  // More questions...
]

const stats = [
  { id: 1, value: '~0.15 ETH', name: 'Solo Stakers earn an average annually of' },
  { id: 2, value: '~0.29 ETH', name: 'Smooth Solo Stakers earn an average annually of', },
  { id: 3, value: '~93%', name: 'More rewards', },
]

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

const steps = [
  { name: '1. Register', description: 'Register to at least one MEV relay (the more, the better)', href: '#', status: 'complete' },
  {
    name: '2. Fee recipient',
    description: 'Change your fee recipient to Smooth (brain for dappnode users).',
    href: '#',
    status: 'complete',
  },
  { name: '3. Subscribe', description: 'Penatibus eu quis ante.', href: '#', status: 'complete' },
  { name: '4. Manage validators', description: 'Faucibus nec enim leo et.', href: '#', status: 'complete' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function Landing() {
  const { isConnected } = useAccount()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      const targetElement = document.getElementById('target-section');
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    };
    const learnMoreLink = document.getElementById('learn-more-link');
    learnMoreLink?.addEventListener('click', handleClick);
    return () => {
      learnMoreLink?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Hero section */}
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
                Join Smooth, the MEV Smoothing Pool by Dappnode
              </h1>
              <p className="mt-6 text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
                Earn consistent rewards by pooling MEV with other solo stakers. Fight centralization and strengthen the Ethereum network.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  href="#">
                  Join Now
                </a>
                <a
                  className="text-sm font-semibold leading-6 text-DAppDeep dark:text-DAppDarkText"
                  href="#"
                  id="learn-more-link">
                  Should I join? <span aria-hidden="true">→</span>
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

      {/* stats */}
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

      {/* why smooth */}
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

      {/* How to subscribe */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">
            How to subscribe
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
            Subscribe your validator today in just a few steps!
          </p>
          <p className="mt-6 text-lg leading-8 text-DAppDeep dark:text-DAppDarkText">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
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

      {/* Call to action donate */}
      <div className="mt-16 bg-gradient-to-br from-DAppPurple/900 to-DAppBlue text-center sm:rounded-3xl">
        <div className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
            Donate to the Pool and Support Ethereum Decentralization
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Contribute to the pool and increase solo staker&apos;s revenue. It&apos;s a great way of supporting the true decentralized node runners that keep Ethereum decentralized at scale.</p>
          <div className="mt-8 w-[220px] pt-10 lg:mx-0" style={{ margin: "auto" }}>
            {isConnected ? <DonateDialog /> : <w3m-button label="Donate now" />}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mx-auto my-16 max-w-7xl px-6 sm:py-32 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-DAppDeep dark:text-DAppDarkText">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-DAppDeep dark:text-DAppDarkText">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon aria-hidden="true" className="h-6 w-6" />
                          ) : (
                            <PlusSmallIcon aria-hidden="true" className="h-6 w-6" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-DAppDeep dark:text-DAppDarkText">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA */}
      {/*  <div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
            Ready to dive in?
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
            <a
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              href="https://docs.dappnode.io/docs/smooth/faq-glossary"
              rel="noreferrer" target="_blank"
            >
              Read our docs
            </a>
            <a className="text-sm font-semibold leading-6 text-DAppDeep dark:text-DAppDarkText" href="#https://discord.gg/dappnode" target="_blank">
              Join Discord Community <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div> */}

      {/* Should I join smooth? */}
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
    </>
  )
}
