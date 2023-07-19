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
    title: 'Subscribe to the Pool',
    description:
      'Connect to the Dashboard with your Withdrawal Address of your validators and register them to start accumulating rewards. If you prefer to wait until your next block proposal, you can simply set your Fee Recipient Address to the Smoothing Pool and your validator will be subscribed when you send your first EL rewards',
    imageSrc: 'images/how-to-step-1.svg',
  },
  {
    title: 'Claim Rewards',
    description: `After every sucessful block proposal, you will be able to claim all accumulated rewards for that validator. You won't depend on the MEV of that particular block, and you will get an average of all successfully proposed blocks in the pool!`,
    imageSrc: 'images/how-to-step-2.svg',
  },
  {
    title: 'No cheating possible',
    description: `You start accumulating rewards since registration, but rewards can only be claimed after successfully proposing a block. This prevents anyone stealing rewards without sending their MEV rewards to the pool. If you miss a block, no problem! We have a "card system" and you'll get a Yellow card for a missed block -you will still accumulate rewards but won't be able to withdraw until your next proposal-, a Red one for two misses -you will stop accumulating rewards until you propose a block to the pool- and a Ban if you send your MEV rewards from the block somewhere else -all your accumulated rewards will be divided among the rest of participants`,
    imageSrc: 'images/how-to-step-3.svg',
  },
  {
    title: 'Check your rewards at any time',
    description:
      'Look at the dashboard to see  total subscribers, avg rewards, total rewards, etc; and Log in to see specific metrics about your validators',
    imageSrc: 'images/how-to-step-4.svg',
  },
  {
    title: 'Transparency: Keep Track of all the blocks coming into Smooth',
    description:
      'You can see all blocks that are sent to Smooth. See if they have MEV, if they missed and who proposed them.',
    imageSrc: 'images/how-to-step-5.svg',
  },
]
