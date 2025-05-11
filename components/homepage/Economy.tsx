import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function Economy() {
    const economy = [
        {
            description: 'Pinecone’s new serverless architecture hopes to make the vector database more versatile',
            imageUrl: '/images/homepage/Economy2.png',
        },
        {
            description: 'Pinecone’s new serverless architecture hopes to make the vector database more versatile',
            imageUrl: '/images/homepage/Economy3.png',
        },
        {
            description: 'Pinecone’s new serverless architecture hopes to make the vector database more versatile',
            imageUrl: '/images/homepage/Economy1.png',
        },
        {
            description: 'Pinecone’s new serverless architecture hopes to make the vector database more versatile',
            imageUrl: '/images/homepage/Economy4.png',
        },
    ]

    return (
        <section className="flex flex-col gap-16 pb-10 px-4 sm:px-8 md:px-20">
            <div className="flex flex-col gap-2 max-w-screen-4xl w-full mx-auto">
                <p className="text-[#939393] font-orienta text-[20px]">Economy</p>
                <div className="w-full h-[3px] bg-[#ebebeb]" />
            </div>

            <div className="flex flex-col gap-20 max-w-screen-2xl w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                    {economy.map((item, index) => (
                        <div key={index} className="flex flex-col lg:flex-row gap-6">
                            <div className="w-full aspect-[16/9] relative">
                                <Image
                                    src={item.imageUrl}
                                    alt=""
                                    fill
                                    className="object-contain rounded-md"
                                />
                            </div>

                            <div className="flex flex-col gap-4 w-full" >
                                <p className="text-black font-ibm_plex_serif font-bold text-[18px] md:text-[20px] leading-snug md:mt-1">
                                    {item.description}
                                </p>
                                <p className="text-[#808080] font-roboto font-medium text-[13px] flex items-center gap-x-2">
                                    <span>TOM KRAZIT</span>
                                    <span>.</span>
                                    <span>FEB 18, 2025</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Button className="w-full max-w-[344px] h-[42px] bg-white border border-[#c9c9c9] text-[#939393] font-roboto font-semibold text-[20px] text-center mx-auto">
                    Browse More
                </Button>
            </div>
        </section>
    )
}

export default Economy
