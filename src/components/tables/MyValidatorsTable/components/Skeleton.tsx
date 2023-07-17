import { v4 as uuidv4 } from 'uuid'

interface SkeletonProps {
  title: string
}

export function Skeleton({ title }: SkeletonProps) {
  return (
    <div className="h-[580px] w-full overflow-hidden rounded-lg bg-white">
      <h3 className="p-6 text-2xl font-bold leading-8 text-DAppDeep">
        {title}
      </h3>
      {[...Array(5)].map(() => (
        <div
          key={uuidv4()}
          className="mb-9 flex w-full items-center justify-between px-6">
          <div>
            <div className="h-5 w-[500px] animate-pulse rounded-sm bg-DAppLight" />
            <div className="mt-3 h-4 w-[300px] animate-pulse rounded-sm bg-DAppLight" />
          </div>
          <div>
            <div className="h-5 w-[110px] animate-pulse rounded-sm bg-DAppLight" />
            <div className="mt-3 mr-0 ml-auto h-4 w-[60px] animate-pulse rounded-sm bg-DAppLight" />
          </div>
        </div>
      ))}
    </div>
  )
}
