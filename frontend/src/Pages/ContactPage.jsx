import React from 'react'
import Breadcrumb from '../components/BreadCrumb'
import GetInTouch from '../components/GetInTouch'

const ContactPage = () => {
  return (
    <>
    <Breadcrumb
     title="Contact Us"
     parent="Homepage"
     current="Contact"/>
      <GetInTouch/>
    </>

   
  )
}

export default ContactPage