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
        title="SmoothDAO"
        btnText="Click here"
        text="SmoothDAO has approved the new terms of use."
        link="https://link.dappnode.io/G4WDuCg"
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
