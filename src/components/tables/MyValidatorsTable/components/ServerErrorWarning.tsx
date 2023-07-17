import { Skeleton } from './Skeleton'
import { AlertIcon } from '@/components/icons'

interface NotConnectedWarningProps {
  title: string
}

export function ServerErrorWarning({ title }: NotConnectedWarningProps) {
  return (
    <div className="relative flex w-full flex-col items-center">
      <Skeleton title={title} />
      <div className="w-100 absolute left-auto top-20 mt-16 flex flex-col items-center bg-white px-16 pb-16 pt-8 shadow-md">
        <AlertIcon />
        <h2 className="mb-3 mt-2 text-center text-3xl font-bold leading-[50px] text-red-500 md:leading-[60px]">
          Server Request Error
        </h2>
        <h4 className="text-red-500">
          Oracle node is currently syncing and not serving requests
        </h4>
      </div>
    </div>
  )
}
