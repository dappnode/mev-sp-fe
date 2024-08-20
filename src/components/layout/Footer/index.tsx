import Image from 'next/image'
import Link from 'next/link'
import { IoLogoDiscord } from 'react-icons/io5'
import { FaGithubSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { MAIN_SITE_URL, SOCIALS } from '@/utils/config'

const socialIcons = {
  Discord: IoLogoDiscord,
  GitHub: FaGithubSquare,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitterSquare,
}

export function Footer() {
  return (
    <footer className="flex h-44 flex-col items-center justify-center gap-y-4 border-t bg-white px-4 dark:border-DAppDarkSurface-400 dark:bg-DAppDarkSurface-200 sm:h-20 sm:flex-row sm:justify-between md:px-12">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        {/* Link with logo and text */}
        <div className="flex flex-col items-center gap-y-4 hover:underline sm:flex-row">
          <Link href={MAIN_SITE_URL} rel="noopener noreferrer" target="_blank">
            <Image
              alt="Dappnode logo"
              height={26}
              src="/images/dappnode-logo.svg"
              width={26}
            />
          </Link>
          <Link href={MAIN_SITE_URL} rel="noopener noreferrer" target="_blank">
            <h4 className="ml-4 mt-2 flex items-center justify-center text-xs sm:text-left">
              Dappnode <FiExternalLink className="ml-1" />
            </h4>
          </Link>
        </div>

        {/* Right side text */}
        <h4 className="mt-2 text-center text-xs sm:mx-3 sm:text-left">
          | Decentralized P2P Networking | © 2024
        </h4>
      </div>

      <nav className="flex gap-x-5">
        {SOCIALS.map(({ name, path }) => {
          const Icon = socialIcons[name]
          return (
            <Link
              key={name}
              className="flex items-center "
              href={path}
              rel="noopener noreferrer"
              target="_blank">
              <Icon className="h-5 w-5 text-DAppDeep dark:text-DAppDarkText" />
            </Link>
          )
        })}
      </nav>
    </footer>
  )
}
