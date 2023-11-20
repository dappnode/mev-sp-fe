import { DialogProps } from '../types'
import Link from 'next/link'
import { Button } from '@/components/common/Button'

export function SuccessDialog({ handleClose }: DialogProps) {
  return (
    <>
      <div className="px-6 text-center text-DAppDeep">
        <h3 className="text-lg font-normal">Congratulations!</h3>
        <div className="mt-4 text-lg font-normal tracking-wide">
          <p>You have claimed your rewards from Smooth.</p>
          <p>You can check out more LSD options.</p>
        </div>
        <Link
          className="mt-1 inline-block text-lg font-semibold underline"
          href="https://ethereum.org/en/community/research/#liquid-staking-and-derivatives"
          rel="noopener noreferrer"
          target="_blank">
          Check out LSD options
        </Link>
      </div>
      <Button className="mt-5" onPress={handleClose}>
        Done
      </Button>
    </>
  )
}
