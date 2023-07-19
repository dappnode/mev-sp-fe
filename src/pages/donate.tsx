import Image from 'next/image'
import { useAccount } from 'wagmi'
import { Head } from '@/components/layout/Head'
import { DonateDialog } from '@/components/dialogs/DonateDialog'
import { ConnectWalletButton } from '@/components/common/ConnectWalletButton'

export default function Donate() {
  const { isConnected } = useAccount()
  return (
    <>
      <Head title="Support Solo Stakers" />
      <main className="mx-auto flex max-w-5xl items-center justify-between pt-6">
        <div className="relative mt-20 hidden h-[520px] w-[490px] lg:block">
          <Image
            alt="ETH Circle"
            className="absolute bottom-14 left-36"
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
            className="absolute -bottom-14 right-20"
            height={180}
            src="images/weth-circle.svg"
            width={180}
          />
          <Image
            alt="USDC Circle"
            className="absolute -top-5 left-20"
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
            className="absolute left-14 top-28"
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
            className="absolute right-12 top-40"
            height={124}
            src="images/currency-circle.svg"
            width={124}
          />
          <Image
            alt="Circle"
            className="absolute -right-7 bottom-20"
            height={160}
            src="images/currency-circle.svg"
            width={160}
          />
        </div>
        <article className="mx-auto mt-14 flex max-w-fit flex-col text-center lg:mt-0 lg:text-left">
          <h1 className="mt-2 text-5xl font-bold leading-[56px] text-DAppDeep">
            Support Solo Stakers
          </h1>
          <h2 className="order-first text-base font-normal tracking-wider text-DAppBlue">
            MEV Smoothing Pool
          </h2>
          <p className="mt-2 max-w-md text-lg font-normal leading-8 text-DAppDeep">
            {`You can support Solo Stakers and increase their revenue by donating directly into the pool. It's a great way of supporting the true decentralized Node Runners that keep Ethereum decentralized at scale.`}
          </p>
          <div className="mx-auto mt-8 w-[220px] lg:mx-0">
            {isConnected ? <DonateDialog /> : <ConnectWalletButton />}
          </div>
        </article>
      </main>
    </>
  )
}
