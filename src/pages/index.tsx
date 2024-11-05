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
        title="SmoothDAO"
        btnText="Click here"
        text="SmoothDAO has approved the new terms of use."
        link="https://link.dappnode.io/G4WDuCg"
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
