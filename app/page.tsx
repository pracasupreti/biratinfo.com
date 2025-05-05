import Body from '@/components/homepage/Body'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import React from 'react'

function page() {
  return (
    <div className=' bg-white'>
      <Header />
      <Hero />
      <Body />
    </div>
  )
}

export default page