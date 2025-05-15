import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function Technology() {
    const Technology = [
        {
            title: 'Scientists in a race to discover why our Universe exists',
            description: 'Inside a laboratory of South Dakota, scientists are searching for the answer to one of science\'s biggest questions.',
            imageUrl: '/images/homepage/TechnologyImage1.webp',
            author: 'Pallab Ghosh',
        },
        {
            title: 'How to avoid a puncture on the Moon',
            description: 'Going back to the Moon after half a century, and then to Mars, literally means reinventing the wheel.',
            imageUrl: '/images/homepage/TechnologyImage2.webp',
            author: 'Padraig Belton',

        },
        {
            title: 'New centre launches to tackle digital threats',
            description: 'A university is set to launch a new centre for research into cyber security and artificial intelligence (AI).',
            imageUrl: '/images/homepage/TechnologyImage3.webp',
            author: 'Richard Price',
        }
    ]

    // const Society2 = [
    //     {
    //         description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same',
    //         imageUrl: '/images/homepage/SocietyImage7.png'
    //     },
    //     {
    //         description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same',
    //         imageUrl: '/images/homepage/SocietyImage6.png'
    //     },
    //     {
    //         description: 'A very basic error caused the Crowd Strike outage. Windows security may never be the same ',
    //         imageUrl: '/images/homepage/SocietyImage4.png'
    //     },
    //     {
    //         description: 'The Snowflake breaches are exposing the limits of cloud security’s shared-responsibility model',
    //         imageUrl: '/images/homepage/SocietyImage5.png'
    //     },
    // ]

    return (
        <div className='flex flex-col gap-12 pb-10'>
            <div className='flex flex-col gap-2 px-4 sm:px-10 lg:px-20'>
                <p className='text-[#939393] font-orienta text-[20px] font-[700]'>Innovation</p>
                <div className='w-full h-[3px] bg-[#ebebeb]' />
            </div>

            <div className='grid gap-10 px-4 sm:px-10 lg:px-20 md:grid-cols-2 lg:grid-cols-3'>
                {Technology.map((item, index) => (
                    <div className='flex flex-col gap-6 group' key={index}>
                        <div className='w-full aspect-[16/9] relative md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl overflow-hidden'>
                            <Image
                                src={item.imageUrl}
                                alt=''
                                fill
                                className='object-cover'
                            />
                        </div>
                        <p className='font-roboto font-[400] text-[20px] cursor-pointer text-text-color'>{item.title}</p>
                        <p className='font-inter font-[500] text-[14px] text-[#808080]'>{item.description}</p>
                        <div className='flex items-center gap-4'>
                            <div className='h-[27px] w-[27px] rounded-full'><Avatar>
                                <AvatarImage src="/images/homepage/author.webp" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar></div>
                            <span className='font-inter font-[500] text-[16px] text-[#808080]'>{item.author}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 
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
            </div> */}
        </div>
    )
}

export default Technology
