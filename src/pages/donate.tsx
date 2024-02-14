import { useAccount } from 'wagmi'
import { Head } from '@/components/layout/Head'
import { DonateDialog } from '@/components/dialogs/DonateDialog'
import DonateCircle from '@/components/icons/DonateCircle'

export default function Donate() {
  const { isConnected } = useAccount()

  return (
    <>
      <Head title="Support Solo Stakers" />
      <main className="mx-auto flex max-w-5xl items-center justify-between pt-6">
        <div className="relative mt-20 hidden h-[520px] w-[490px] lg:block">
          <div className="absolute bottom-40 left-48">
            <DonateCircle hasEth size={110} />
          </div>
          <div className="absolute  -left-2 bottom-52">
            <DonateCircle hasEth size={85} />
          </div>
          <div className="absolute bottom-4 right-36">
            <DonateCircle hasEth size={85} />
          </div>
          <div className="absolute  left-28">
            <DonateCircle hasEth size={85} />
          </div>
          <div className="absolute right-40 top-10">
            <DonateCircle hasEth size={65} />
          </div>
          <div className="absolute right-4 top-12">
            <DonateCircle hasEth size={85} />
          </div>

          <div className="absolute bottom-16 left-20">
            <DonateCircle size={60} />
          </div>
          <div className="absolute left-20 top-32">
            <DonateCircle size={60} />
          </div>
          <div className="absolute left-52 top-40">
            <DonateCircle size={45} />
          </div>
          <div className="absolute right-20 top-44">
            <DonateCircle size={60} />
          </div>
          <div className="absolute right-3 bottom-36">
            <DonateCircle size={85} />
          </div>
        </div>
        <article className="mx-auto mt-14 flex max-w-fit flex-col text-center lg:mt-0 lg:text-left">
          <h1 className="mt-2 text-5xl font-bold leading-[56px] text-DAppDeep dark:text-DAppDarkText">
            Support Solo Stakers
          </h1>
          <h2 className="order-first text-base font-normal tracking-wider text-DAppBlue">
            Fund decentralization directly to Solo Stakers&apos; wallets
          </h2>
          <p className="mt-2 max-w-md text-lg font-normal leading-8 text-DAppDeep dark:text-DAppDarkText">
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
