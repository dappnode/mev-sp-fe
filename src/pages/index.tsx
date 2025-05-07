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
        title="Pectra hard fork"
        btnText="Check Docs"
        text="⚠️ Learn how Pectra hard fork affects Smooth ⚠️"
        link="https://docs.dappnode.io/docs/smooth/deep-dive-into-smooth/consolidations/"
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
