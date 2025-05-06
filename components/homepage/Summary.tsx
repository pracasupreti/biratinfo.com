import React from 'react'
import Image from 'next/image'

function Summary() {
    const summary = [
        {
            title: 'Society',
            description: 'After becoming a parent, I developed an Intense fear of dying',
            imageUrl: '/images/homepage/SummaryImage2.png'
        },
        {
            title: 'Health(Advertorial )',
            description: 'Should I tell the braless friend of a friend that her breasts wobble?',
            imageUrl: '/images/homepage/SummaryImage5.png'
        },
        {
            title: 'Startups',
            description: 'The shies Rebecca Harding  has worn to death-and what she’ll buy next',
            imageUrl: '/images/homepage/SummaryImage3.png'
        },
        {
            title: 'Economy',
            description: ' Confused about skincare trends?  This is what you need to know ',
            imageUrl: '/images/homepage/SummaryImage4.png'
        },
    ]
    return (
        <div className='md:flex-row flex flex-col px-12 md:px-20 pb-10'>
            <div className='flex flex-col text-center items-center justify-center gap-5'>
                <div className='md:w-[673px] md:h-[448px] w-[373px] h-[248px] bg-[url(/images/homepage/SummaryImage1.png)] bg-cover bg-no-repeat bg-center' />
                <p className='text-[#939393] font-orienta text-[20px]'>Politics</p>
                <p className='text-black font-ibm_plex_serif font-[700] text-[30px] px-48'>Self-care for four-years-old&apos;s? The rise
                    of pre-teen beauty therapies</p>
                <p className='text-[#808080] font-ibm_plex_serif font-[500] text-[18px] px-60'>As the “get ready with me” trend goes into overdrive on TikTok,
                    some skincare therapists are sounding warning about the
                    potential for long-term damage</p>
            </div>
            <div>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-y-12'>
                    {summary.map((items, index) =>
                        <div key={index} className='flex flex-col gap-4'>
                            <div className='w-[260px] h-[173px] relative'>
                                <Image
                                    src={items.imageUrl}
                                    alt=''
                                    fill
                                    objectFit='contain'
                                />
                            </div>
                            <p className='text-[#939393] font-orienta text-[16px] '>{items.title}</p>
                            <p className='text-black font-ibm_plex_serif font-[700] text-[19px] md:pr-20'>{items.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Summary