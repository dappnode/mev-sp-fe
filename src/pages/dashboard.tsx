import { Head } from '@/components/layout/Head'
import { UserInfo } from '@/components/views/UserInfo'
import { Statistics } from '@/components/views/Statistics'
import { LatestBlocksSP } from '@/components/views/LatestBlocksSP'
import { LatestDonationsSP } from '@/components/views/LatestDonationsSP'
import SlidingBanner from '@/components/banners/SlidingBanner'

export default function Dashboard() {
  return (
    <>
      <Head />
      <SlidingBanner
        title="SmoothDAO - Vote on Snapshot "
        btnText="Vote here"
        text="The Future of Smooth is at Stake!"
        link="https://link.dappnode.io/G4WDuCg"
      />
      <main>
        <Statistics />
        <UserInfo />
        <LatestBlocksSP />
        <LatestDonationsSP />
      </main>
    </>
  )
}
