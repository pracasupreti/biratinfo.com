import Body from '@/components/homepage/Body'
import Footer from '@/components/homepage/Footer'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import React from 'react'

function page() {
  return (
    <div className=' bg-white'>
      <Header />
      <Hero />
      <Body />
      <Footer />
    </div>
  )
}

export default page