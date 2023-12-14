import dappnodeLogo from '../../public/images/dappnode-logo.svg'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { Head } from '@/components/layout/Head'
import { DonateDialog } from '@/components/dialogs/DonateDialog'

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
            alt="ETH Circle"
            className="absolute -left-10 bottom-32"
            height={180}
            src="images/eth-circle.svg"
            width={180}
          />
          <Image
            alt="ETH Circle"
            className="absolute -top-5 left-20"
            height={176}
            src="images/eth-circle.svg"
            width={176}
          />
          <Image
            alt="ETH Circle"
            className="absolute right-28 top-6"
            height={136}
            src="images/eth-circle.svg"
            width={136}
          />
          <div className="relative">
            <div className="absolute left-14 top-28 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md shadow-yellow-100">
              <Image
                alt="Circle"
                className="z-50"
                height={40}
                src={dappnodeLogo}
                width={40}
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-44 top-36 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md shadow-yellow-100">
              <Image
                alt="Circle"
                className="z-50"
                height={40}
                src={dappnodeLogo}
                width={40}
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute right-12 top-40 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md shadow-yellow-100">
              <Image
                alt="Circle"
                className="z-50"
                height={50}
                src={dappnodeLogo}
                width={50}
              />
            </div>
          </div>
        </div>
        <article className="mx-auto mt-14 flex max-w-fit flex-col text-center lg:mt-0 lg:text-left">
          <h1 className="mt-2 text-5xl font-bold leading-[56px] text-DAppDeep">
            Support Solo Stakers
          </h1>
          <h2 className="order-first text-base font-normal tracking-wider text-DAppBlue">
            Fund decentralization directly to Solo Stakers&apos; wallets
          </h2>
          <p className="mt-2 max-w-md text-lg font-normal leading-8 text-DAppDeep">
            {`You can support Solo Stakers and increase their revenue by donating directly into the pool. It's a great way of supporting the true decentralized Node Runners that keep Ethereum decentralized at scale.`}
          </p>
          <div className="mx-auto mt-8 w-[220px] lg:mx-0">
            {isConnected ? <DonateDialog /> : <w3m-button label="Donate" />}
          </div>
        </article>
      </main>
    </>
  )
}
