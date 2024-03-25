import { useAccount } from 'wagmi'
import { DonateDialog } from '@/components/dialogs/DonateDialog'

export default function Donate() {
    const { isConnected } = useAccount()

    return (
        <div className="mt-16 bg-gradient-to-br from-DAppPurple/900 to-DAppBlue text-center sm:rounded-3xl">
            <div className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-20 lg:px-8">
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-DAppDeep dark:text-DAppDarkText sm:text-4xl">
                    Donate to the Pool and Support Ethereum Decentralization
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                    Contribute to the pool and increase solo staker&apos;s revenue. It&apos;s a great way of supporting the true decentralized node runners that keep Ethereum decentralized at scale.</p>
                <div className="mt-8 w-[220px] pt-10 lg:mx-0" style={{ margin: "auto" }}>
                    {isConnected ? <DonateDialog /> : <w3m-button label="Donate now" />}
                </div>
            </div>
        </div>
    )
}
