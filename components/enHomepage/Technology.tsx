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

    return (
        <div className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                    <p className="text-[#939393] font-orienta text-[20px] font-[700]">Innovation</p>
                    <div className="w-full h-[3px] bg-[#ebebeb]" />
                </div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {Technology.map((item, index) => (
                        <div className="flex flex-col gap-6 group" key={index}>
                            <div className="w-full aspect-[16/9] relative md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <p className="font-ibm_plex_serif font-medium text-[20px] cursor-pointer text-text-color line-clamp-1 hover:underline">
                                {item.title}
                            </p>
                            <p className="font-ibm_plex_serif font-[500] text-[14px] text-[#808080] line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="h-[27px] w-[27px] rounded-full">
                                    <Avatar>
                                        <AvatarImage src="/images/homepage/author.webp" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <span className="font-inter font-[500] text-[16px] text-[#808080]">
                                    {item.author}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Technology
