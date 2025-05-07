import { Head } from '@/components/layout/Head'
import { UserInfo } from '@/components/views/UserInfo'
import { Statistics } from '@/components/views/Statistics'
import { LatestBlocksSP } from '@/components/views/LatestBlocksSP'
import { LatestDonationsSP } from '@/components/views/LatestDonationsSP'
import SlidingBanner from '@/components/banners/SlidingBanner'
import DashboardWarnings from '@/components/views/DashboardWarnings'

export default function Dashboard() {
  return (
    <>
      <Head />
      <SlidingBanner
        title="Pectra hard fork"
        btnText="Check Docs"
        text="⚠️ Learn how Pectra hard fork affects Smooth ⚠️"
        link="https://docs.dappnode.io/docs/smooth/deep-dive-into-smooth/consolidations/"
      />
      <main>
        <Statistics />
        <DashboardWarnings />
        <UserInfo />
        <LatestBlocksSP />
        <LatestDonationsSP />
      </main>
    </>
  )
}
