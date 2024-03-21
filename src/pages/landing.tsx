/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTheme } from 'next-themes'

import LandingSection from '@/components/landing/LandingSection'
import WaveSeparator from '@/components/landing/WaveSeparator'
import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import WhySmooth from '@/components/landing/WhySmooth'
import HowToSubscribe from '@/components/landing/HowToSubscribe'

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

export default function Landing() {
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  const sectionColors: string[] =
    currentTheme === 'light'
      ? ['#7F27FF', '#9147FF', '#B685FF', '#CEADFF', '#E7D6FF']
      : ['#121212', '#282828', '#3f3f3f', '#575757', '#717171']
  return (
    <div className="overflow-hidden">
      <LandingSection hasBg color={sectionColors[3]}>
        <div className="transition-all duration-1000 ease-in-out group-hover:scale-90">
          <Hero />
        </div>
      </LandingSection>

      <LandingSection color={sectionColors[4]}>
        <WaveSeparator hasBg color={sectionColors[3]} number={0} />
        <div className="transition-all duration-1000 ease-in-out group-hover:scale-90">
          <Stats />
          <WhySmooth />
          <HowToSubscribe />
        </div>

        {/* Call to action */}
        <div>
          <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to dive in?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
                anim id veniam aliqua proident excepteur commodo do ea.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href="http://localhost:3000/landing">
                  Get started
                </a>
                <a
                  className="text-sm font-semibold leading-6 text-white"
                  href="http://localhost:3000/landing">
                  Learn more <span aria-hidden="true">→</span>
                </a>
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
      </LandingSection>

      <LandingSection hasBg color={sectionColors[2]}>
        <WaveSeparator hasBg rotated color="#f7f7f7" number={1} />
        {/* FAQs */}
        <div className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
                  {faq.question}
                </dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className="text-base leading-7 text-gray-600">
                    {faq.answer}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </LandingSection>
    </div>
  )
}
