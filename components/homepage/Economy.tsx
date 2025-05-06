import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function Economy() {
    const Economy = [
        {
            description: 'Pinecone’s new serverless architecture hopes to make the vector database more versatile',
            imageUrl: '/images/homepage/Economy2.png'
        },
        {
            description: 'Ready or not, here come the AI agents',
            imageUrl: '/images/homepage/Economy3.png'
        },
        {
            description: 'Hudi’s backers could have the missing piece in the push for data format unity',
            imageUrl: '/images/homepage/Economy1.png'
        },
        {
            description: 'Why using generative AI server to replace junior employee could backfire ',
            imageUrl: '/images/homepage/Economy4.png'
        },
    ]
    return (
        <div className='flex flex-col gap-16 pb-10'>
            <div className='flex flex-col gap-2'>
                <p className='text-[#939393] font-orienta text-[20px] pl-20'>Economy</p>
                <div className='w-full h-[3px] bg-[#ebebeb]' />
            </div>
            <div className='flex flex-col gap-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24 mx-auto'>
                    {Economy.map((items, index) =>
                        <div key={index} className='flex gap-4'>
                            <div className='min-w-[318px] h-[165px] relative'>
                                <Image
                                    src={items.imageUrl}
                                    alt=''
                                    fill
                                    objectFit='contain'
                                />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <p className='text-black font-ibm_plex_serif font-[700] text-[20px] max-w-[309px] max-h-[105px] '>{items.description}</p>
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
    )
}

export default Economy