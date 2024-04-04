import { useAccount } from 'wagmi'
import { DonateDialog } from '@/components/dialogs/DonateDialog'

export default function Donate() {
    const { isConnected } = useAccount()

    return (
        <div className="mt-32 rounded-3xl bg-gradient-to-br from-DAppPurple/900 to-DAppBlue text-center">
            <div className="mx-auto max-w-7xl p-6 py-12 sm:py-16 lg:px-8">
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Donate to the Pool and Support Ethereum Decentralization
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                    Contribute to the pool and increase solo staker&apos;s revenue. It&apos;s a great way of supporting the true decentralized node runners that keep Ethereum decentralized at scale.</p>
                <div className="mt-8 flex w-[220px] items-center justify-center pt-10 lg:mx-0" style={{ margin: "auto" }}>
                    {isConnected ? <DonateDialog /> : <w3m-button label="Donate now" />}
                </div>
            </div>
        </div>
    )
}
