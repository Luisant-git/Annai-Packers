import React from 'react'
import Breadcrumb from '../components/BreadCrumb'
import WhoWeAre from '../components/WhoweAre'
import StatsBanner from '../components/StatesHero'
import FAQSection from '../components/Faq'

const AboutPage = () => {
  return (
    <>
    <Breadcrumb
    title="About Us"
    parent="Homepage"
    current="About"
  />

  <WhoWeAre/>
  <StatsBanner/>
  <FAQSection/>
  </>
  
  )
}

export default AboutPage