import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

function Society() {
    const Society1 = [
        {
            title: '$3B Raised, 500M lives impacted: Inside Leapfrog Investment\'s Bold Vision ',
            description: 'Today, I\'m joined by Dr. Andy Kuper, Founder and CEO of Leapfrog Investment, a pioneering firm that has reshaped how global capital can drive profit with purpose.',
            imageUrl: '/images/homepage/SocietyImage1.png'
        },
        {
            title: '3B Raised, 500M lives impacted: Inside Leapfrog Investment\'s Bold Vision ',
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
            description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same',
            imageUrl: '/images/homepage/SocietyImage7.png'
        },
        {
            description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same',
            imageUrl: '/images/homepage/SocietyImage6.png'
        },
        {
            description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same ',
            imageUrl: '/images/homepage/SocietyImage4.png'
        },
        {
            description: 'The Snowflake breaches are exposing the limits of cloud security’s shared-responsibility model',
            imageUrl: '/images/homepage/SocietyImage5.png'
        },
    ]

    return (
        <div className='flex flex-col gap-16 pb-10'>
            <div className='flex flex-col gap-2 px-4 sm:px-10 lg:px-20'>
                <p className='text-[#939393] font-orienta text-[20px]'>Society</p>
                <div className='w-full h-[3px] bg-[#ebebeb]' />
            </div>

            <div className='grid gap-10 px-4 sm:px-10 lg:px-20 md:grid-cols-2 lg:grid-cols-3'>
                {Society1.map((item, index) => (
                    <div className='flex flex-col gap-6' key={index}>
                        <div className='w-full aspect-[16/9] relative'>
                            <Image
                                src={item.imageUrl}
                                alt=''
                                fill
                                className='object-cover rounded-md'
                            />
                        </div>
                        <p className='font-roboto font-[400] text-[20px] text-black'>{item.title}</p>
                        <p className='font-inter font-[500] text-[14px] text-[#808080]'>{item.description}</p>
                        <div className='flex items-center gap-4'>
                            <div className='h-[27px] w-[27px] rounded-full bg-[#808080]' />
                            <span className='font-inter font-[500] text-[16px] text-[#808080]'>Grant Trant</span>
                        </div>
                    </div>
                ))}
            </div>


            <div className='flex flex-col gap-20 px-4 sm:px-10 lg:px-20'>
                <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
                    {Society2.map((item, index) => (
                        <div key={index} className='flex flex-col gap-4'>
                            <div className='w-full aspect-[3/2] relative'>
                                <Image
                                    src={item.imageUrl}
                                    alt=''
                                    fill
                                    className='object-cover rounded-md'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-black font-ibm_plex_serif font-[700] text-[18px]'>{item.description}</p>
                                <p className='text-[#808080] font-roboto font-[500] text-[13px] flex items-center gap-x-2'>
                                    <span>TOM KRAZIT</span>
                                    <span>.</span>
                                    <span>FEB 18, 2025</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Button className='w-[80%] sm:w-[344px] h-[42px] bg-white border border-[#c9c9c9] text-[#939393] font-roboto font-[600] text-[18px] mx-auto'>
                    Browse More
                </Button>
            </div>
        </div>
    )
}

export default Society
