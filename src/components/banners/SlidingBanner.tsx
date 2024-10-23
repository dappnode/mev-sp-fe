import { useEffect, useState } from 'react'
import Image from 'next/image'

interface SlidingBannerProps {
  title: string
  link: string
  btnText: string
  text: string
}

export default function SlidingBanner({
  title,
  link,
  btnText,
  text,
}: SlidingBannerProps) {
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 100
      setIsFixed(window.scrollY > navbarHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    // -marginTop to ignore body's tag padding
    <div className="-mt-4 md:-mt-8 ">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Link to ${title}`}
        className={`group ${
          isFixed ? 'fixed left-0 top-0 ' : 'relative '
        } z-10 mb-8 flex h-14 w-screen flex-col  justify-center overflow-hidden 
      bg-purple-400/90 transition-colors ease-in-out
       [mask-image:_linear-gradient(to_right,transparent_0,_black_200px,_black_calc(100%-200px),transparent_100%)]
      hover:bg-purple-400 dark:bg-DAppPurple-900/90 hover:dark:bg-DAppPurple-900`}
        style={{
          marginLeft: 'calc(-50vw + 49.7%)',
          marginRight: 'calc(-50vw + 50%)',
        }}>
        <div className="flex animate-slide">
          <BannerContent title={title} text={text} btnText={btnText} />
          <BannerContent title={title} text={text} btnText={btnText} />
        </div>
      </a>
      {/* render empty div with same size as the banner when this turns in to fixed position. This avoids viewport height to change and autoscroll */}
      {isFixed && <div className="relative mb-8 h-20 " />}{' '}
    </div>
  )
}

interface BannerContentProps {
  title: string
  btnText: string
  text: string
}

function BannerContent({ title, btnText, text }: BannerContentProps) {
  return (
    <div className="flex h-full min-w-full items-center">
      <div className="flex w-full flex-row items-center justify-around">
        <div className="flex flex-row items-center gap-x-3">
          <Image
            className="h-6 w-6"
            alt="Dappnode logo"
            src="/images/dappnode-logo.svg"
            height={50}
            width={50}
          />
          <span className="text-xl font-bold">{title}</span>
          <Image
            className="hidden h-6 w-6 lg:block"
            alt="Dappnode logo"
            src="/images/dappnode-logo.svg"
            height={50}
            width={50}
          />
        </div>
        <p className="hidden text-lg lg:block">{text}</p>
        <div className=" hidden flex-row items-center gap-x-3 lg:flex">
          <Image
            className="h-6 w-6"
            alt="Dappnode logo"
            src="/images/dappnode-logo.svg"
            height={50}
            width={50}
          />
          <span className="text-xl font-bold">{title}</span>
          <Image
            className="h-6 w-6"
            alt="Dappnode logo"
            src="/images/dappnode-logo.svg"
            height={50}
            width={50}
          />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-white p-2 text-DAppPurple-900 transition-colors duration-300 ease-in-out">
          <p className="font-bold">{btnText}</p>
        </div>
      </div>
    </div>
  )
}
