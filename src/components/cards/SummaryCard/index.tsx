import { Error } from './Error'
import { Skeleton } from './Skeleton'
import { Tooltip } from '../../common/Tooltip'

export interface SummaryCardProps {
  bottomLeftText?: string
  bottomRightText?: string
  children?: React.ReactNode
  title: string
  tooltip?: string
  isError?: boolean
  isLoading?: boolean
}

export function SummaryCard({
  bottomLeftText,
  bottomRightText,
  children,
  isError,
  isLoading,
  title,
  tooltip,
}: SummaryCardProps) {
  return (
    <article className="mx-auto h-36 w-full max-w-md rounded-lg bg-white px-6 py-4 font-inter shadow-card-light dark:bg-DAppDarkSurface/200 dark:shadow-card-dark">
      <div className="mb-3 flex items-center">
        <h3 className="mr-2 text-sm font-medium leading-7 text-DAppDeep dark:text-DAppDarkText">
          {title}
        </h3>
        {tooltip && <Tooltip tooltip={tooltip} />}
      </div>
      {isError ? (
        <Error />
      ) : isLoading ? (
        <Skeleton />
      ) : (
        <>
          {children}
          <div className="mt-4 flex justify-between text-sm font-light leading-7 text-DAppGray">
            <p>{bottomLeftText}</p>
            <p>{bottomRightText}</p>
          </div>
        </>
      )}
    </article>
  )
}
