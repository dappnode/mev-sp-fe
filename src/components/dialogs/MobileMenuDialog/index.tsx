import * as Dialog from '@radix-ui/react-dialog'
import { IoClose } from 'react-icons/io5'
import { RxHamburgerMenu, RxExternalLink } from 'react-icons/rx'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Button } from '@/components/common/Button'
import { PAGES } from '@/utils/config'
import { ToggleThemeBtn } from '@/components/common/ToggleThemeBtn'

export function MobileMenuDialog() {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button buttonType="unstyled" className="ml-4" size="none">
          <RxHamburgerMenu className="h-6 w-6" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full w-full bg-gray-600 opacity-30" />
        <AnimatePresence>
          <Dialog.Content>
            <motion.div
              className="fixed right-0 top-0 z-10 h-screen w-[300px] max-w-[75%] border bg-white p-6 dark:border-0 dark:bg-DAppDarkSurface-200"
              animate={{
                // opacity: 1,
                x: 0,
              }}
              exit={{
                // opacity: 0,
                x: 100,
              }}
              initial={{
                // opacity: 0.5,
                x: 100,
              }}
              transition={{
                duration: 0.3,
                type: 'easeInOut',
              }}>
              <Dialog.Close asChild>
                <Button
                  aria-label="Close"
                  buttonType="unstyled"
                  className="fixed right-6 top-6 max-w-fit"
                  size="none">
                  <IoClose className="h-6 w-6 text-DAppDeep dark:text-DAppDarkText" />
                </Button>
              </Dialog.Close>
              <Link className="mb-5 mt-10 flex items-center" href="/">
                <Image
                  alt="Dappnode logo"
                  height={50}
                  src="/images/dappnode-logo.svg"
                  width={50}
                />
                <h2 className="ml-4 font-urbanist text-base font-bold text-DAppGray">
                  <span className="text-DAppDeep dark:text-DAppDarkText">
                    Smooth
                  </span>
                </h2>
              </Link>
              <nav className="flex flex-col gap-y-4 border-y pt-4 dark:border-DAppDarkSurface-300">
                {PAGES.map(({ name, path }) => {
                  const isExternalLink = path.includes('http')
                  return (
                    <Link
                      key={name}
                      className="rounded-lg p-3 text-DAppDeep transition duration-300 hover:bg-DAppLight hover:text-DAppPurple-900 dark:text-DAppDarkText dark:hover:bg-DAppDarkSurface-300"
                      href={path}
                      rel={isExternalLink ? 'noopener noreferrer' : ''}
                      target={isExternalLink ? '_blank' : '_self'}>
                      <h3
                        className={clsx(
                          'flex items-center',
                          router.pathname === path && 'text-DAppPurple-900'
                        )}>
                        {name}
                        {isExternalLink && (
                          <RxExternalLink className="ml-2 inline" />
                        )}
                      </h3>
                    </Link>
                  )
                })}

                <div className="ml-2 flex flex-row items-center gap-2 border-t py-3 dark:border-DAppDarkSurface-300">
                  <span>Switch theme:</span>
                  <ToggleThemeBtn />
                </div>
              </nav>
            </motion.div>
          </Dialog.Content>
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
