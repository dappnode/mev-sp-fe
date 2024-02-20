import { Head } from '@/components/layout/Head'
import { FeaturesIcon, WalletIcon } from '@/components/icons'
import { HowToFeature, HowToStep } from '@/components/how-to'
import {
  HowToBanner,
  HowToStep1,
  HowToStep2,
  HowToStep3,
  HowToStep4,
  HowToStep5,
} from '@/components/images/how-to-images/how-to-images'

export default function HowTo() {
  return (
    <>
      <Head title="How to use" />
      <main className="px-3">
        <section className="mt-8 flex w-full justify-between gap-x-14">
          <div className="hidden xl:block">
            <HowToBanner />
          </div>

          <div className="mx-auto w-1/2">
            <h1 className="mt-12 text-center text-5xl font-bold text-DAppDeep dark:text-DAppDarkText xl:text-left">
              Smooth
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
              Explore all the steps for using Smooth. We highly recommend
              reviewing&nbsp;
              <a
                className="text-blue-500 underline hover:text-blue-700"
                href="https://docs.dappnode.io/docs/smooth/"
                rel="noopener noreferrer"
                target="_blank">
                the documentation
              </a>{' '}
              before getting started!
            </h4>
          </div>
          <div className="mt-14 flex flex-col gap-y-8 sm:mt-20 sm:gap-y-28">
            {howToSteps.map((step, index) => (
              <HowToStep
                key={step.title}
                description={step.description}
                imageComponent={step.imageComponent}
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
    title: 'Subscribe to the Pool',
    description:
      "Update your fee recipient address to Smooth's and connect to the Dashboard using the withdrawal address of your validators. Register them to start accumulating rewards. If you opt to wait until your next block proposal, you can easily set your Fee Recipient Address to the Smoothing Pool. Your validator will automatically be subscribed when you send your next block proposal EL rewards!",
    imageComponent: <HowToStep1 />,
  },
  {
    title: 'Claim Rewards',
    description: `After every sucessful block proposal, you will be able to claim the accumulated rewards for that validator. You won't depend on the MEV of that particular block, and you will get an average of all successfully proposed blocks in the pool!`,
    imageComponent: <HowToStep2 />,
  },
  {
    title: 'No cheating possible',
    description: `You start accumulating rewards since registration, but rewards can only be claimed after successfully proposing a block. This prevents anyone stealing rewards without sending their MEV rewards to the pool. If you miss a block, no problem! We have a "card system" and you'll get a Yellow card for a missed block -you will still accumulate rewards but won't be able to withdraw until your next proposal-, a Red one for two misses -you will stop accumulating rewards until you propose a block to the pool- and a Ban if you send your MEV rewards from the block somewhere else -all your accumulated rewards will be divided among the rest of participants`,
    imageComponent: <HowToStep3 />,
  },
  {
    title: 'Check your rewards at any time',
    description:
      'Look at the dashboard to see  total subscribers, avg rewards, total rewards, etc; and Log in to see specific metrics about your validators',
    imageComponent: <HowToStep4 />,
  },
  {
    title: 'Transparency: Keep Track of all the blocks coming into Smooth',
    description:
      'You can see all blocks that are sent to Smooth. See if they have MEV, if they missed and who proposed them.',
    imageComponent: <HowToStep5 />,
  },
]
