import { Skeleton } from './Skeleton'
import { CheckIcon } from '@/components/icons'

interface NotConnectedWarningProps {
  title: string
}

export function NotConnectedWarning({ title }: NotConnectedWarningProps) {
  return (
    <div className="relative w-full">
      <Skeleton title={title} />
      <div className="absolute left-0 top-28 flex h-full w-full flex-col items-center px-8">
        <CheckIcon />
        <h2 className="mb-3 mt-2 text-center text-3xl font-bold leading-[50px] md:leading-[60px]">
          Join Smooth and earn higher rewards!
        </h2>
        <w3m-account-button />
      </div>
    </div>
  )
}
