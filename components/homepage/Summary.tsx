import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Summary() {
    const summary = [
        {
            title: 'Society',
            description: 'After becoming a parent, I developed an intense fear of dying',
            imageUrl: '/images/homepage/SummaryImage2.png'
        },
        {
            title: 'Health (Advertorial)',
            description: 'Should I tell the braless friend of a friend that her breasts wobble?',
            imageUrl: '/images/homepage/SummaryImage5.png'
        },
        {
            title: 'Startups',
            description: 'The shoes Rebecca Harding has worn to death — and what she’ll buy next',
            imageUrl: '/images/homepage/SummaryImage3.png'
        },
        {
            title: 'Economy',
            description: 'Confused about skincare trends? This is what you need to know',
            imageUrl: '/images/homepage/SummaryImage4.png'
        },
    ]

    return (
        <section className="w-full px-4 sm:px-6 lg:px-20 py-10 flex flex-col lg:flex-row gap-16">
            <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:w-1/2 gap-4">
                <div className="w-full h-[240px] sm:h-[320px] lg:h-[448px] bg-[url('/images/homepage/SummaryImage1.png')] bg-cover bg-center" />
                <p className="text-[#939393] font-orienta text-base sm:text-lg">Politics</p>
                <Link href={''} className="text-black font-ibm_plex_serif font-bold text-xl sm:text-2xl lg:text-3xl cursor-pointer">
                    Self-care for four-year-olds? The rise of pre-teen beauty therapies
                </Link>
                <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm sm:text-base lg:text-lg cursor-pointer">
                    As the “get ready with me” trend goes into overdrive on TikTok,
                    some skincare therapists are sounding warnings about the
                    potential for long-term damage.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-14 xl:gap-y-6 lg:w-1/2">
                {summary.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3">
                        <div className="relative w-full aspect-[3/2] sm:max-h-[200px] sm:max-w-[350px] overflow-hidden md:hover:translate-y-[-10px] md:transition md:duration-400">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-[#939393] font-orienta text-sm">{item.title}</p>
                        <h3 className="text-black font-ibm_plex_serif font-semibold text-base sm:text-lg max-w-[350px] cursor-pointer group">
                            {item.description}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Summary
