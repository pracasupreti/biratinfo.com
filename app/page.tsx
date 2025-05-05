import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import React from 'react'

function page() {
  return (
    <div className='h-[100vh] w-[100vw] bg-white'>
      <Header />
      <Hero />
    </div>
  )
}

export default page