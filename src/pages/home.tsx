/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {

  CloudArrowUpIcon,

  LockClosedIcon,
  MinusSmallIcon, PlusSmallIcon
} from '@heroicons/react/24/outline'
import { useAccount } from 'wagmi'
import { Disclosure } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { DonateDialog } from '@/components/dialogs/DonateDialog'


const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 2,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 3,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
]

const stats = [
  { id: 1, name: 'Total Subscribers', value: '550' },
  { id: 2, name: 'Expected Monthly Rewards', value: '0.0297 ETH' },
  { id: 3, name: 'Total Rewards', value: '28.4 ETH' },
]

const whySmooth = [
  {
    name: '🎰 Stop Depending on Luck!',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: '🚀 Dont miss high fee seasons!',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: '💰 Hitting MEV Lottery Blocks',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',

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
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Find out more on our docs{' '}
                <a className="font-semibold text-purple-600" href="#">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Earn more rewards by pooling MEV rewards together
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                It is a product by Dappnode, fight centralitzation
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  href="#">
                  Join Now
                </a>
                <a
                  className="text-sm font-semibold leading-6 text-gray-900"
                  href="#">
                  Learn more <span aria-hidden="true">→</span>
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
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Smooth Stats
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Lorem ipsum dolor sit amet consect adipisicing possimus.
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6  text-gray-900">{stat.name}</dt>
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
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Smooth</p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Get higher MEV revenue by joining forces with other stakers
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {whySmooth.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">

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
                    src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
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

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">
            How to subscribe
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Follow the steps to subcribe to Smooth
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
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
      <div>
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Support Solo Stakers
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              You can support Solo Stakers and increase their revenue by donating directly into the pool. It&apos;s a great way of supporting the true decentralized Node Runners that keep Ethereum decentralized at scale.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">

              {isConnected ? <DonateDialog /> : <w3m-button label="Donate to Smooth" />}

            </div>
            <svg
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              viewBox="0 0 1024 1024">
              <circle
                cx={512}
                cy={512}
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
                r={512}
              />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mx-auto max-w-7xl px-6 sm:py-32 lg:px-8 lg:py-10 mb-16">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
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
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}
