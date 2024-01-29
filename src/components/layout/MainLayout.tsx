import { Footer } from './Footer'
import { Header } from './Header'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

interface MainLayoutProps {
  children: ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const router = useRouter()

  return (
    <div
      className={clsx(
        'min-h-screen bg-cover',
        router.pathname === '/' || router.pathname === '/how-to'
          ? '-ml-2 bg-wave-pattern dark:bg-wave-pattern-dark '
          : 'bg-DAppBackgroundLight dark:bg-DAppDarkSurface',
        className
      )}>
      <Header />
      <div className="mx-auto min-h-screen-content max-w-7xl p-4 md:p-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}
