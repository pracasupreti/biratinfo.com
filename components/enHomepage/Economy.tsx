import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function Economy() {
    const economy = [
        {
            title: 'Jaguar says it has no plans to build cars in the US',
            description: 'UK-based carmaker Jaguar Land Rover has said it does not intend to produce vehicles in the US, as President Donald Trump\'s tariffs impact the motor industry.',
            imageUrl: '/images/homepage/EconomyImage1.webp',
            author: 'Peter Hoskins',
            publishedDate: '15 May, 2025'
        },
        {
            title: 'Trump touts \'record\' Boeing-Qatar Airways deal',
            description: 'Qatar Airways has agreed to buy up to 210 jets from American manufacturing giant Boeing, according to US President Donald Trump, who announced the $96bn (£72.4bn) order.',
            imageUrl: '/images/homepage/EconomyImage2.webp',
            author: 'Natalie Sherman',
            publishedDate: '15 May, 2025'
        },
        {
            title: 'UK hits back at claims US tariff deal bad for China',
            description: 'The UK government has hit back at suggestions the tariff agreement it reached with the US last week could be damaging to China.',
            imageUrl: '/images/homepage/EconomyImage3.webp',
            author: 'Karen Hoggan',
            publishedDate: '15 May, 2025'
        },
        {
            title: 'Nissan to cut 11,000 more jobs and shut seven factories',
            description: 'Japanese carmaker Nissan has said it will cut another 11,000 jobs globally and shut seven factories as it shakes up the business.',
            imageUrl: '/images/homepage/EconomyImage4.webp',
            author: 'Mariko Oi & Tom Espiner',
            publishedDate: '15 May, 2025'
        },
    ]

    return (
        <section className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-8xl mx-auto md:mx-16 lg:mx-24 flex flex-col gap-12">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <p className="text-text-color font-orienta text-[20px] font-[700]">Economy</p>
                    <div className="w-full h-[3px] bg-[#ebebeb]" />
                </div>

                {/* Articles */}
                <div className="flex flex-col gap-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                        {economy.map((item, index) => (
                            <div key={index} className="flex flex-col lg:flex-row gap-6 group">
                                <div className="w-full lg:w-[40%] aspect-[3/2] relative md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-col gap-4 lg:w-[60%]">
                                    <p className="text-text-color font-ibm_plex_serif font-bold text-[18px] md:text-[20px] leading-snug cursor-pointer line-clamp-2 hover:underline">
                                        {item.title}
                                    </p>
                                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-lg line-clamp-2">
                                        {item.description}
                                    </p>
                                    <p className="text-[#808080] font-roboto font-medium text-xl flex items-center gap-x-2">
                                        <span>{item.author}</span>
                                        <span>·</span>
                                        <span>{item.publishedDate}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full max-w-[344px] h-[42px] bg-white border border-[#c9c9c9] text-[#939393] font-roboto font-semibold text-[20px] text-center mx-auto hover:bg-gray-50 transition-colors">
                        Browse More
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Economy
