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
        link="https://snapshot.org/#/dao.smooth.dappnode.eth/proposal/0xddd71930ac1a2876cc7e012861320a19b24fc2c4cc8289060c626737413251a3"
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
