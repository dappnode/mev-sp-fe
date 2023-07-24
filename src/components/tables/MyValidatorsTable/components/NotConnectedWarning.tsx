import { Skeleton } from './Skeleton'
import { ConnectWalletButton } from '@/components/common/ConnectWalletButton'
import { CheckIcon } from '@/components/icons'

interface NotConnectedWarningProps {
  title: string
}

export function NotConnectedWarning({ title }: NotConnectedWarningProps) {
  return (
    <div className="relative w-full">
      <Skeleton title={title} />
      <div className="absolute top-28 left-0 flex h-full w-full flex-col items-center px-8">
        <CheckIcon />
        <h2 className="mt-2 mb-3 text-center text-3xl font-bold leading-[50px] md:leading-[60px]">
          Join Smooth and earn higher rewards!
        </h2>
        <ConnectWalletButton />
      </div>
    </div>
  )
}
