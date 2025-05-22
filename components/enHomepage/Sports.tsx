import React from 'react'
import Image from 'next/image'

function Sports() {
    const Sports = [
        {
            title: 'Bologna edged out AC Milan to win the Coppa Italia, their first major trophy since 1974',
            description: 'Dan Ndoye scored the only goal in Rome\'s Stadio Olimpico, latching on to a loose ball in the box before lashing a shot into the back of the net.',
            imageUrl: '/images/homepage/SportsImage2.webp',
            author: 'Sami Mokbel',
            publishedDate: '15 May, 2025'
        },
        {
            title: 'Real Madrid against Mallorca forced Barcelona to wait another day at least for La Liga title glory',
            description: 'Hansi Flick\'s side were seconds away from being confirmed as champions without playing, only for Madrid to score with practically the last kick of the game at the Bernabeu.',
            imageUrl: '/images/homepage/SportsImage3.webp',
            author: 'Sami Mokbel',
            publishedDate: '15 May, 2025'
        },
        {
            title: 'Ajax gifted top spot in the Eredivisie to PSV on the penultimate matchday of the Eredivisie season',
            description: 'Amsterdam giants Ajax, captained by England midfielder Jordan Henderson, were nine points clear at the top in mid-April with five games to go.',
            imageUrl: '/images/homepage/SportsImage4.webp',
            author: 'Sami Mokbel',
            publishedDate: '15 May, 2025'
        },
    ]

    return (
        <div className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                    <p className="text-[#939393] font-orienta text-xl font-[700]">Sports</p>
                    <div className="w-full h-[3px] bg-[#ebebeb]" />
                </div>


                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* COLUMN-1 */}
                    <div className="flex-1 flex flex-col gap-5 h-full justify-between">
                        <div>
                            <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat bg-[url(/images/homepage/SportsImage1.webp)] rounded-xl" />
                            <p className="font-ibm_plex_serif font-bold text-2xl lg:text-3xl cursor-pointer text-text-color mt-4 hover:underline">
                                Forest&apos;s Awoniyi out of coma after surgery
                            </p>
                            <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm sm:text-base lg:text-lg mt-2">
                                Nottingham Forest forward Taiwo Awoniyi has woken from an induced coma after having surgery to repair a serious abdominal injury.
                            </p>
                        </div>
                        <p className="text-[#808080] font-roboto text-sm flex items-center gap-2">
                            <span>Sami Mokbel</span>
                            <span>·</span>
                            <span>15 May, 2025</span>
                        </p>
                    </div>

                    {/* COLUMN-2 */}
                    <div className="flex-1 flex flex-col gap-10 md:gap-6 lg:gap-4 h-full justify-between">
                        {Sports.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4 group">
                                <div className="relative w-full sm:w-[40%] aspect-[3/2] overflow-hidden md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl">
                                    <Image
                                        src={item.imageUrl}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 sm:w-[60%]">
                                    <p className="font-ibm_plex_serif font-semibold text-lg cursor-pointer text-text-color hover:underline">{item.title}</p>
                                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm">
                                        {item.description}
                                    </p>
                                    <p className="text-[#808080] font-roboto text-sm mt-2 flex items-center gap-2">
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

export default Sports