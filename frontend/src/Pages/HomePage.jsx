import React from 'react'
import Banner from '../components/BannerCarousole'
import HalfBanner from '../components/HalfBanner'
import WhoWeAre from '../components/WhoweAre'
import ServicesSection from '../components/OurServices'
import WhyChooseUs from '../components/WhyChooseus'
import OurPartners from '../components/OurPartners'
import TweetRotator from '../components/TwitterBanner'
import ProcessSteps from '../components/OurProcess'





const HomePage = () => {
  return (
    <>
 

    <Banner/>
  
    <HalfBanner/>
    <WhoWeAre/>
    <ServicesSection/>
    <WhyChooseUs/>
    <ProcessSteps/>
   
    <OurPartners/>
  <TweetRotator/>
 
 
    </>
  )
}

export default HomePage