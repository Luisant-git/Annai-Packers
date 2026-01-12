import React from 'react'
import Breadcrumb from '../components/BreadCrumb'
import GalleryGrid from '../components/GalleryGrid'

const Gallery = () => {
  return (
    <>
    <Breadcrumb
     title="Our Gallery"
     parent="Homepage"
     current="Gallery"/>
     <GalleryGrid/>
         </>
  )
}

export default Gallery