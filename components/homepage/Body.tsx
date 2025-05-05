import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

function Body() {
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

    const Politics = [
        {
            description: 'Canva choose its generative AI tools by letting its employee try the all. It’s argument for consumption-based pricing ',
            imageUrl: '/images/homepage/PoliticsImage2.png'
        },
        {
            description: 'Should I tell the braless friend of a friend that her breasts wobble?',
            imageUrl: '/images/homepage/PoliticsImage3.png'
        },
        {
            description: 'The shies Rebecca Harding  has worn to death-and what she’ll buy next',
            imageUrl: '/images/homepage/PoliticsImage4.png'
        },
    ]

    const Society1 = [
        {
            title: '$3B Raised, 500M lives impacted: Inside Leapfrog Investment\'s Bold Vision ',
            description: 'Today, I\'m joined by Dr. Andy Kuper, Founder and CEO of Leapfrog Investment, a pioneering firm that has reshaped how global capital can drive profit with purpose.',
            imageUrl: '/images/homepage/SocietyImage1.png'
        },
        {
            title: 'Gratitude Railroad: From Wall Street to Impact Investing ',
            description: 'Today, I\'m joined by Dr. Andy Kuper, Founderand CEO of Leapfrog Investment, a pioneering firm that has reshaped how global capital can drive profit with purpose.',
            imageUrl: '/images/homepage/SocietyImage2.png'
        },
        {
            title: 'Realize Impact: Innovating impact Investing Through Donor Advised Funds',
            description: 'Today, I\'m joined by Dr. Andy Kuper, Founder and CEO of Leapfrog Investment, a pioneering firm that has reshaped how global capital can drive profit with purpose.',
            imageUrl: '/images/homepage/SocietyImage3.png'
        }
    ]

    const Society2 = [
        {
            description: 'Wiz is a multicloud security rocket ship. Now it works for a cloud provider',
            imageUrl: '/images/homepage/SocietyImage7.png'
        },
        {
            description: 'Post-quantum security tools are here. Do enterprise really need them now?',
            imageUrl: '/images/homepage/SocietyImage6.png'
        },
        {
            description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same ',
            imageUrl: '/images/homepage/SocietyImage4.png'
        },
        {
            description: 'The Snowflake breaches are ecposing the limits of cloud security’s shared-responsibility model',
            imageUrl: '/images/homepage/SocietyImage5.png'
        },
    ]


    return (
        <div className='md:pt-14 pt-10'>
            {/* SUMMARY */}
            <div className='md:flex-row flex flex-col px-12 md:px-20 pb-10'>
                <div className='flex flex-col text-center items-center justify-center gap-5'>
                    <div className='md:w-[673px] md:h-[448px] w-[373px] h-[248px] bg-[url(/images/homepage/SummaryImage1.png)] bg-cover bg-no-repeat bg-center' />
                    <p className='text-[#939393] font-orienta text-[20px]'>Politics</p>
                    <p className='text-black font-ibm_plex_serif font-[700] text-[30px] px-48'>Self-care for four-years-old's? The rise
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


            {/* POLITICS */}
            <div className='flex flex-col gap-16 pb-10'>
                <div className='flex flex-col gap-2'>
                    <p className='text-[#939393] font-orienta text-[20px] pl-20'>Politics</p>
                    <div className='w-full h-[3px] bg-[#ebebeb]' />
                </div>
                <div className='md:flex-row flex flex-col px-20 md:px-60 gap-20'>
                    <div className='flex flex-col items-start gap-5 md:w-[673px] w-[373px]'>
                        <div className='md:w-[673px] md:h-[448px] w-[373px] h-[248px] bg-[url(/images/homepage/PoliticsImage1.png)] bg-cover bg-no-repeat bg-center' />
                        <p className='text-black font-ibm_plex_serif font-[700] text-[30px] '>How Liberty Mutual was able to jump into
                            generative AI thanks to a clear data strategy
                            and FinOps</p>
                        <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                            <span>TOM KRAZIT</span>
                            <span>.</span>
                            <span>FEB 18, 2025</span>
                        </p>
                    </div>
                    <div>
                        <div className='flex flex-col gap-y-12'>
                            {Politics.map((items, index) =>
                                <div key={index} className='flex gap-4 '>
                                    <div className='min-w-[309px] h-[174px] relative'>
                                        <Image
                                            src={items.imageUrl}
                                            alt=''
                                            fill
                                            objectFit='contain'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p className='text-black font-ibm_plex_serif font-[700] text-[20px] '>{items.description}</p>
                                        <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                                            <span>TOM KRAZIT</span>
                                            <span>.</span>
                                            <span>FEB 18, 2025</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* SOCIETY */}
            <div className='flex flex-col gap-16 pb-10'>
                <div className='flex flex-col gap-2'>
                    <p className='text-[#939393] font-orienta text-[20px] pl-20'>Society</p>
                    <div className='w-full h-[3px] bg-[#ebebeb]' />
                </div>
                <div className='flex justify-evenly'>
                    {Society1.map((items, index) =>
                        <div className='flex flex-col gap-6' key={index}>

                            <div className='w-[417px] h-[237px] relative'>
                                <Image
                                    src={items.imageUrl}
                                    alt=''
                                    fill
                                    objectFit='contain'
                                />
                            </div>
                            <p className='font-roboto font-[400] text-[22px] text-black max-w-[339px] max-h-[77px]'>{items.title}</p>
                            <p className='font-inter font-[500] text-[14px] text-[#808080] max-w-[339px]'>{items.description}</p>
                            <div className='flex items-center gap-4'>
                                <div className='h-[27px] w-[27px] rounded-full bg-[#808080]' />
                                <span className='font-inter font-[500] text-[18px] text-[#808080]'>Grant Trant</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-20'>
                    <div className='flex gap-y-12 items-start justify-evenly'>
                        {Society2.map((items, index) =>
                            <div key={index} className='flex flex-col gap-4'>
                                <div className='min-w-[285px] h-[186px] relative'>
                                    <Image
                                        src={items.imageUrl}
                                        alt=''
                                        fill
                                        objectFit='contain'
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <p className='text-black font-ibm_plex_serif font-[700] text-[20px] max-w-[295px] max-h-[150px] '>{items.description}</p>
                                    <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                                        <span>TOM KRAZIT</span>
                                        <span>.</span>
                                        <span>FEB 18, 2025</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Button className='w-[344px] h-[42px] bg-white border-1 border-[#c9c9c9] text-[#939393] font-roboto font-[600] text-[20px] text-center mx-auto'>Browse More</Button>
                </div>
            </div>
            {/* ECONOMY */}
            <div>
                <div className='flex flex-col gap-2'>
                    <p className='text-[#939393] font-orienta text-[20px] pl-20'>Economy</p>
                    <div className='w-full h-[3px] bg-[#ebebeb]' />
                </div>
            </div>
        </div>
    )
}

export default Body