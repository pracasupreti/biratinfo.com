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
        <section className="w-full px-4 sm:px-6 lg:px-20 py-10 flex flex-col lg:flex-row gap-16">
            <div className="flex flex-col text-center items-center lg:items-start lg:text-left lg:w-1/2 gap-4">
                <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat rounded-2xl bg-[url('/images/homepage/SummaryImage1.webp')]" />
                <p className="text-[#939393] font-orienta text-base sm:text-lg font-[700]">Politics</p>
                <Link href={''} className="text-text-color font-ibm_plex_serif font-bold text-xl sm:text-2xl lg:text-3xl cursor-pointer">
                    Relief on China&apos;s factory floors as US tariffs put on hold
                </Link>
                <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm sm:text-base lg:text-lg cursor-pointer">
                    There&apos;s a vast empty space in the middle of the factory floor in Foshan in southern China where workers should be welding high-end air fryers for the US market. Derek Wang says his American customers were wowed by his air fryer models.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-14 lg:w-1/2 items-end h-full">
                {summary.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 group md:items-center lg:items-end">
                        <div className="relative w-full aspect-[3/2] sm:max-h-[200px]  sm:max-w-[350px] overflow-hidden md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className='flex flex-col gap-1 h-full'>
                            <div className="text-[#939393] font-orienta text-sm font-[700]">{item.minititle}</div>
                            <h3 className="text-text-color font-ibm_plex_serif font-semibold text-base sm:text-lg md:max-w-[350px] max-w-full cursor-pointer text-wrap">
                                {item.title}
                            </h3>
                            <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm md:max-w-[350px] max-w-full">
                                {item.description}
                            </p>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    )
}

export default Summary
