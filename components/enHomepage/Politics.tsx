'use client'
import React from 'react'
import Image from 'next/image'

function Politics() {
    const Politics = [
        {
            title: 'Putin not on Kremlin list of officials attending Ukraine peace talks in Turkey',
            description: 'Russian President Vladimir Putin is not among the names listed by the Kremlin as being due to attend peace talks on the war in Ukraine in Istanbul on ...',
            imageUrl: '/images/homepage/PoliticsImage2.webp',
            author: 'Tom Bateman',
            publishedDate: '15 May, 2025',
        },
        {
            title: 'Why India could not stop IMF bailout to Pakistan',
            description: 'Last week the International Monetary Fund (IMF) approved a $1bn (£756m) bailout to Pakistan – a move that drew sharp disapproval from India  ...',
            imageUrl: '/images/homepage/PoliticsImage3.webp',
            author: 'Nikhil Inamdar',
            publishedDate: '15 May, 2025',
        },
        {
            title: 'Mark Carney says Canadians are not \'impressed\' by UK\'s invite to Trump',
            description: 'Canadian Prime Minister Mark Carney has said Canadians were not "impressed" by the UK government\'s invitation to US President Donald Trump for a second state visit ...',
            imageUrl: '/images/homepage/PoliticsImage4.webp',
            author: 'Ana Faguy',
            publishedDate: '15 May, 2025',
        },
    ]

    return (
        <div className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-8xl mx-auto md:mx-16 lg:mx-24 flex flex-col gap-12">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <p className="text-text-color font-orienta text-xl font-[700]">Politics</p>
                    <div className="w-full h-[3px] bg-[#ebebeb]" />
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* Main article - Left */}
                    <div className="flex-1 flex flex-col gap-5 justify-between">
                        <div>
                            <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat bg-[url('/images/homepage/PoliticsImage1.webp')] rounded-xl" />
                            <p className="font-ibm_plex_serif font-bold text-2xl lg:text-4xl cursor-pointer text-text-color mt-4 hover:underline">
                                Kennedy Clashes With Top Democrat Who Accused Him of &apos;Destroying&apos; Health Agencies
                            </p>
                            <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm sm:text-base lg:text-xl mt-2">
                                Health Secretary Robert F. Kennedy Jr., whose drastic overhaul of the federal health apparatus has left scientists and patients reeling, clashed on Wednesday with a senior House Democrat.
                            </p>
                        </div>
                        <p className="text-[#808080] font-roboto text-xl flex items-center gap-2">
                            <span>Sheryl Gay Stolberg</span>
                            <span>·</span>
                            <span>14 May, 2025</span>
                        </p>
                    </div>

                    {/* Other articles - Right */}
                    <div className="flex-1 flex flex-col justify-between gap-10 md:gap-6 lg:gap-4">
                        {Politics.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4 group">
                                <div className="relative w-full sm:w-[40%] aspect-[7/6] overflow-hidden md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl">
                                    <Image
                                        src={item.imageUrl}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 sm:w-[60%]">
                                    <p className="font-ibm_plex_serif font-semibold text-xl cursor-pointer text-text-color hover:underline line-clamp-2">
                                        {item.title}
                                    </p>
                                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-lg line-clamp-2">
                                        {item.description}
                                    </p>
                                    <p className="text-[#808080] font-roboto text-xl flex items-center gap-2 mt-2">
                                        <span>{item.author}</span>
                                        <span>·</span>
                                        <span>{item.publishedDate}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Politics
