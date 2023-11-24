/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { RxExternalLink } from 'react-icons/rx'
import { useState } from 'react'
import {
  createWeb3Modal,
  useWeb3Modal,
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme,
} from '@web3modal/wagmi/react'
import { PAGES } from '@/utils/config'
import { MobileMenuDialog } from '@/components/dialogs/MobileMenuDialog'
import { ConnectWallet } from '@/providers/ConnectWallet'
import { Button } from '@/components/common/Button'

export function Header() {
  const router = useRouter()
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false)
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false)

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false)
    setIsConnectHighlighted(false)
  }

  const modal = useWeb3Modal()
  const state = useWeb3ModalState()
  const { themeMode, themeVariables, setThemeMode } = useWeb3ModalTheme()
  const events = useWeb3ModalEvents()

  return (
    <header className="flex h-24 items-center justify-between border-b bg-white p-4 md:p-6">
      <Link className="flex items-center" href="/">
        <Image
          alt="Dappnode logo"
          height={50}
          src="/images/dappnode-logo.svg"
          width={50}
        />
        <h2 className="ml-4 hidden font-urbanist text-2xl font-bold text-DAppGray lg:inline lg:text-3xl">
          <span className="text-DAppDeep">Smooth</span>
        </h2>
      </Link>
      <nav className="hidden md:flex md:gap-x-5">
        {PAGES.map(({ name, path }) => {
          const isExternalLink = path.includes('http')
          return (
            <div
              key={name}
              className={clsx(
                'h-[94px] pb-[2px]',
                router.pathname === path ? 'bg-DApppurple-linear' : 'bg-none'
              )}>
              <Link
                className="flex h-[92px] min-w-full items-center bg-white px-3 font-inter text-base leading-7 text-DAppDeep transition duration-300 hover:text-DAppPurple/900"
                href={path}
                rel={isExternalLink ? 'noopener noreferrer' : ''}
                target={isExternalLink ? '_blank' : '_self'}>
                <h3 className="flex items-center">
                  {name}
                  {isExternalLink && <RxExternalLink className="ml-2 inline" />}
                </h3>
              </Link>
            </div>
          )
        })}
      </nav>
      <div className="flex items-center">
        <w3m-account-button />

        <div className="md:hidden">
          <MobileMenuDialog />
        </div>
      </div>
    </header>
  )
}
