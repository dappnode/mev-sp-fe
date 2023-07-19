import Image from 'next/image'
import { Head } from '@/components/layout/Head'
import { FeaturesIcon, WalletIcon } from '@/components/icons'
import { HowToFeature, HowToStep } from '@/components/how-to'

export default function HowTo() {
  return (
    <>
      <Head title="How to use" />
      <main className="px-3">
        <section className="mt-8 flex w-full justify-between gap-x-14">
          <Image
            alt="How to use"
            className="hidden xl:block"
            height={643}
            src="images/how-to-banner.svg"
            width={728}
          />
          <div className="mx-auto">
            <h1 className="mt-12 text-center text-5xl font-bold text-DAppDeep xl:text-left">
              MEV Smoothing Pool
            </h1>
            <h3 className="mt-7 text-center text-base font-normal leading-8 xl:text-left">
              Get higher MEV revenue by joining forces with other stakers
            </h3>
            {howToFeatures.map((feature) => (
              <HowToFeature
                key={feature.title}
                description={feature.description}
                title={feature.title}>
                {feature.icon}
              </HowToFeature>
            ))}
          </div>
        </section>
        <section className="my-24 w-full sm:mb-36">
          <div className="mx-auto max-w-fit text-center">
            <h2 className="text-5xl font-bold">How to Use</h2>
            <h4 className="mt-6 text-xl font-normal">
              Check all the steps to use the MEV Smoothing Pool
            </h4>
          </div>
          <div className="mt-14 flex flex-col gap-y-8 sm:mt-20 sm:gap-y-28">
            {howToSteps.map((step, index) => (
              <HowToStep
                key={step.title}
                description={step.description}
                imageSrc={step.imageSrc}
                side={index % 2 === 0 ? 'left' : 'right'}
                step={index + 1}
                title={step.title}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

const howToFeatures = [
  {
    title: 'Pool rewards, Earn More',
    description:
      'Pool your MEV rewards together with other Stakers and get payouts from every block in the pool',
    icon: <FeaturesIcon />,
  },
  {
    title: 'Smooth and Simple',
    description:
      'Simply set your Fee Recipient Address to Smooth and claim your rewards after proposing a slot',
    icon: <WalletIcon />,
  },
]

const howToSteps = [
  {
    title: 'User Connects',
    description:
      'User connects to the web with a given address (deposit address): This endpoint returns a list of the validators deposited with that address. This endpoint returns a list of the validators deposited with that address (the ones that can be subscribed)',
    imageSrc: 'images/how-to-step-1.svg',
  },
  {
    title: 'Returning User',
    description:
      'User connects (and has already some active subscriptions). This endpoint returns all validators subscribed from that deposit address with the state (active, banned, redcard, yellowcard, etc) balance, etc.',
    imageSrc: 'images/how-to-step-2.svg',
  },
  {
    title: 'Check In',
    description:
      'Check if a validator key has properly registered (for subscript)',
    imageSrc: 'images/how-to-step-3.svg',
  },
  {
    title: 'UI Metrics',
    description:
      'UI has some metrics: total subscribers, avg rewards, total rewards, etc',
    imageSrc: 'images/how-to-step-4.svg',
  },
  {
    title: 'SP Blocks',
    description:
      'For Latest Blocks to SP. This endpoint returns all proposed. Same for missed blocks and wrong fee',
    imageSrc: 'images/how-to-step-5.svg',
  },
]
