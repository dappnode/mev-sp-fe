import { Button } from './Button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { shortenEthAddress } from '@/utils/web3'

export function ConnectWalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const connected = account && mounted && chain

        if (!connected) {
          return (
            <Button
              buttonType="primary"
              className="min-w-[160px] max-w-fit"
              onPress={openConnectModal}>
              Connect Wallet
            </Button>
          )
        }

        if (chain.unsupported) {
          return (
            <Button
              buttonType="secondary"
              className="max-w-fit"
              color="red"
              onPress={openChainModal}>
              Wrong Network
            </Button>
          )
        }

        return (
          <Button
            buttonType="secondary"
            className="max-w-fit"
            color="gray"
            onPress={openAccountModal}>
            {shortenEthAddress(account.address as `0x${string}`)}
          </Button>
        )
      }}
    </ConnectButton.Custom>
  )
}
