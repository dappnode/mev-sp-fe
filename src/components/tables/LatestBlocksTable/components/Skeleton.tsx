import { v4 as uuidv4 } from 'uuid'

interface SkeletonProps {
  title: string
}

export function Skeleton({ title }: SkeletonProps) {
  return (
    <div className="h-[650px] w-full overflow-hidden rounded-lg bg-white dark:bg-DAppDarkSurface/200 ">
      <h3 className="p-6 text-2xl font-bold leading-8 text-DAppDeep dark:text-DAppDarkText">
        {title}
      </h3>
      {[...Array(7)].map(() => (
        <div
          key={uuidv4()}
          className="mb-8 flex w-full items-center justify-between px-6">
          <div>
            <div className="h-5 w-[500px] animate-pulse rounded-sm bg-DAppLight dark:bg-DAppDarkSurface/300" />
            <div className="mt-3 h-4 w-[300px] animate-pulse rounded-sm bg-DAppLight dark:bg-DAppDarkSurface/300" />
          </div>
          <div>
            <div className="h-5 w-[110px] animate-pulse rounded-sm bg-DAppLight dark:bg-DAppDarkSurface/300" />
            <div className="ml-auto mr-0 mt-3 h-4 w-[60px] animate-pulse rounded-sm bg-DAppLight dark:bg-DAppDarkSurface/300" />
          </div>
        </div>
      ))}
    </div>
  )
}
