import { Head } from '@/components/layout/Head'
import { UserInfo } from '@/components/views/UserInfo'
import { Statistics } from '@/components/views/Statistics'
import { LatestBlocksSP } from '@/components/views/LatestBlocksSP'

export default function Home() {
  return (
    <>
      <Head />
      <main>
        <Statistics />
        <UserInfo />
        <LatestBlocksSP />
      </main>
    </>
  )
}
