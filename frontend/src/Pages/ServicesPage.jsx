import React from 'react'
import Breadcrumb from '../components/BreadCrumb'
import ServicesSection from '../components/OurServices'
import HalfBanner from '../components/HalfBanner'


import GetInTouchGrid from '../components/ContactItems'
import GetInTouch from '../components/GetInTouch'


const ServicesPage = () => {
  return (
    <>
    <Breadcrumb
    title="Our Services"
    parent="Homepage"
    current="Services"
  />
    <ServicesSection/>
    <HalfBanner/>
   
    
<GetInTouchGrid/>
    </>
  )
}

export default ServicesPage