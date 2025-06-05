'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Summary() {
    const summary = [
        {
            minititle: 'Innovation',
            title: 'Will this woman be the first Briton to walk on the Moon?',
            description: 'There\'s a vast empty space in the middle of the factory floor in Foshan in ...',
            imageUrl: '/images/homepage/SummaryImage2.webp'
        },
        {
            minititle: 'Health (Advertorial)',
            title: 'Cancer patient in clinical trial worries she may lose crucial time',
            description: 'With the future of her cancer treatment in limbo, Natalie Phelps doesn’t know ...',
            imageUrl: '/images/homepage/SummaryImage3.webp'
        },
        {
            minititle: 'Economy',
            title: 'Probe launched into Aviva\'s £3.7bn takeover of Direct Line',
            description: 'Aviva\'s planned takeover of Direct Line is to be reviewed by the UK\'s competition ...',
            imageUrl: '/images/homepage/SummaryImage5.webp'
        },
        {
            minititle: 'Sports',
            title: 'Indiana Pacers rally to eliminate top-seeded Cleveland Cavaliers',
            description: 'The Indiana Pacers fought back from a 19-point, second-quarter deficit to ...',
            imageUrl: '/images/homepage/SummaryImage4.webp'
        },
    ]

    return (
        <section className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-8xl mx-auto md:mx-16 lg:mx-24 flex flex-col lg:flex-row gap-12 items-stretch">
                {/* Left Column - Featured Story */}
                <div className="flex-1 flex flex-col gap-6 h-full">
                    <div className="w-full aspect-[3/2] relative rounded-2xl overflow-hidden">
                        <Image
                            src="/images/homepage/SummaryImage1.webp"
                            alt="Featured politics story"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-text-color font-orienta text-base sm:text-lg font-[700]">Politics</p>
                        <Link
                            href={'/singlepage'}
                            className="text-text-color font-ibm_plex_serif font-bold text-2xl lg:text-4xl hover:underline"
                        >
                            Relief on China&apos;s factory floors as US tariffs put on hold
                        </Link>
                        <p className="text-[#808080] font-ibm_plex_serif font-medium text-base lg:text-xl line-clamp-3">
                            There&apos;s a vast empty space in the middle of the factory floor in Foshan in southern China where workers should be welding high-end air fryers for the US market. Derek Wang says his American customers were wowed by his air fryer models.
                        </p>
                    </div>
                </div>

                {/* Right Column - Grid Items */}
                <div className="flex-1 grid sm:grid-cols-2 gap-8 h-full">
                    {summary.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4 group h-full">
                            <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden md:group-hover:translate-y-[-10px] md:transition md:duration-300">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className="text-text-color font-orienta text-lg font-[700]">{item.minititle}</p>
                                <Link
                                    href={'/singlepage'}
                                    className="text-text-color font-ibm_plex_serif font-semibold text-xl hover:underline line-clamp-2"
                                >
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Summary
