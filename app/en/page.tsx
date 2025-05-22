import Body from '@/components/enHomepage/Body'
import Footer from '@/components/enHomepage/Footer'
import Header from '@/components/enHomepage/Header'
import Hero from '@/components/enHomepage/Hero'
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