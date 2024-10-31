import Hero from '@/components/home/Hero'
import HowToSubscribe from '@/components/home/HowToSubscribe'
import Donate from '@/components/home/Donate'
import FAQs from '@/components/home/FAQs'
import JoinSmooth from '@/components/home/JoinSmooth'
import Stats from '@/components/home/Stats'
import WhySmooth from '@/components/home/WhySmooth'
import SlidingBanner from '@/components/banners/SlidingBanner'

export default function Home() {
  return (
    <>
     <SlidingBanner
        title="SmoothDAO - Vote on Snapshot "
        btnText="Vote here"
        text="The Future of Smooth is at Stake!"
        link="https://snapshot.org/#/dao.smooth.dappnode.eth/proposal/0xddd71930ac1a2876cc7e012861320a19b24fc2c4cc8289060c626737413251a3"
      />
      <Hero />
      <Stats />
      <WhySmooth />
      <HowToSubscribe />
      <Donate />
      <FAQs />
      <JoinSmooth />
    </>
  )
}
