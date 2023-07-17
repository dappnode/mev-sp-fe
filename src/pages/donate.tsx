import Image from 'next/image'
import { useAccount } from 'wagmi'
import { Head } from '@/components/layout/Head'
import { DonateDialog } from '@/components/dialogs/DonateDialog'
import { ConnectWalletButton } from '@/components/common/ConnectWalletButton'

export default function Donate() {
  const { isConnected } = useAccount()
  return (
    <>
      <Head title="Support DAppNode" />
      <main className="mx-auto flex max-w-5xl items-center justify-between pt-6">
        <div className="relative mt-20 hidden h-[520px] w-[490px] lg:block">
          <Image
            alt="ETH Circle"
            className="absolute left-36 bottom-14"
            height={230}
            src="images/eth-circle.svg"
            width={230}
          />
          <Image
            alt="WETH Circle"
            className="absolute -left-10 bottom-32 "
            height={180}
            src="images/weth-circle.svg"
            width={180}
          />
          <Image
            alt="WETH Circle"
            className="absolute right-20 -bottom-14"
            height={180}
            src="images/weth-circle.svg"
            width={180}
          />
          <Image
            alt="USDC Circle"
            className="absolute left-20 -top-5"
            height={176}
            src="images/usdc-circle.svg"
            width={176}
          />
          <Image
            alt="USDT Circle"
            className="absolute right-28 top-6"
            height={136}
            src="images/usdt-circle.svg"
            width={136}
          />
          <Image
            alt="DAI Circle"
            className="absolute -right-10 top-8"
            height={170}
            src="images/dai-circle.svg"
            width={170}
          />
          <Image
            alt="Circle"
            className="absolute bottom-4 left-14"
            height={120}
            src="images/currency-circle.svg"
            width={120}
          />
          <Image
            alt="Circle"
            className="absolute top-28 left-14"
            height={110}
            src="images/currency-circle.svg"
            width={110}
          />
          <Image
            alt="Circle"
            className="absolute left-48 top-36"
            height={90}
            src="images/currency-circle.svg"
            width={90}
          />
          <Image
            alt="Circle"
            className="absolute top-40 right-12"
            height={124}
            src="images/currency-circle.svg"
            width={124}
          />
          <Image
            alt="Circle"
            className="absolute bottom-20 -right-7"
            height={160}
            src="images/currency-circle.svg"
            width={160}
          />
        </div>
        <article className="mx-auto mt-14 flex max-w-fit flex-col text-center lg:mt-0 lg:text-left">
          <h1 className="mt-2 text-5xl font-bold leading-[56px] text-DAppDeep">
            Support DAppNode
          </h1>
          <h2 className="order-first text-base font-normal tracking-wider text-DAppBlue">
            MEV Smoothing Pool
          </h2>
          <p className="mt-2 max-w-md text-lg font-normal leading-8 text-DAppDeep">
            Lorem ipsum dolor sit amet consectetur. Non nulla ut dolor turpis
            habitasse. Orci leo id amet sit. Feugiat quisque mi auctor pharetra.
            Diam purus lorem ut felis adipiscing dis cras.
          </p>
          <div className="mx-auto mt-8 w-[220px] lg:mx-0">
            {isConnected ? <DonateDialog /> : <ConnectWalletButton />}
          </div>
        </article>
      </main>
    </>
  )
}
