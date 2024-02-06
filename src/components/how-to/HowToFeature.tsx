import { ReactNode } from 'react'

interface HowToFeatureProps {
  children: ReactNode
  title: string
  description: string
}

export function HowToFeature({
  children,
  title,
  description,
}: HowToFeatureProps) {
  return (
    <div className="mx-auto mt-12 flex w-full max-w-sm xl:max-w-none">
      <div className="mr-7 flex h-[64px] min-w-[64px] flex-1 items-center justify-center rounded-full bg-white dark:bg-DAppDarkSurface/300">
        {children}
      </div>
      <div>
        <h4 className="text-2xl font-bold text-black dark:text-DAppDarkText">
          {title}
        </h4>
        <p className="mt-2 text-base font-normal leading-8">{description}</p>
      </div>
    </div>
  )
}
