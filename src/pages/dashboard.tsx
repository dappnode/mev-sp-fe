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
        title="SmoothDAO Proposal "
        btnText="Click here"
        text="Discuss and decide the future of Smooth!"
        link="https://discourse.dappnode.io/t/proposal-sip1-smooth-terms-of-use-policy/2388"
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
