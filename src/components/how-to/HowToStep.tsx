import clsx from 'clsx'

interface HowToStepProps {
  step: number
  title: string
  side: 'left' | 'right'
  description: string
  imageComponent: JSX.Element
}

export function HowToStep({
  step,
  title,
  side,
  description,
  imageComponent,
}: HowToStepProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl items-center justify-between text-center sm:text-left">
      <div
        className={clsx(
          'mx-4 flex w-full max-w-lg flex-col justify-between sm:flex-row',
          side === 'right' && 'order-last'
        )}>
        <div className="mx-auto my-4 flex h-[80px] w-[80px] items-center justify-center rounded-full border sm:mx-8 sm:my-0 sm:min-w-[80px]">
          <h4 className="bg-DApppurple-linear bg-clip-text text-4xl text-transparent">
            {step}
          </h4>
        </div>
        <div className="max-w-sm">
          <h3 className="text-3xl font-bold sm:text-4xl">{title}</h3>
          <p className="mt-2 sm:mt-3">{description}</p>
        </div>
      </div>
      <div className="mx-8 hidden h-[260px] min-w-[260px] items-center justify-center rounded-full bg-white drop-shadow-xl dark:bg-DAppDarkSurface-300 md:flex">
        {imageComponent}
      </div>
    </div>
  )
}
